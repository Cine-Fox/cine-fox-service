package control

import (
	"cine-fox-controller/i2c"
	"cine-fox-controller/redis"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
	"time"
)

const (
	mediaDir    = "/media/RAW"
	mediaPrefix = "lost+found"
)

var (
	lastTotalUser    uint64
	lastTotalUserLow uint64
	lastTotalSys     uint64
	lastTotalIdle    uint64
)

var upGrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Connection struct {
	conn       *websocket.Conn
	writeQueue chan []byte
}

type RenameMsg struct {
	OldName string `json:"oldName"`
	NewName string `json:"newName"`
}

type WsMessage struct {
	MsgType   string `json:"msgType"`
	MsgDetail string `json:"msgDetail"`
}

func (c *Connection) writePump(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("send system exit")
			return
		case message := <-c.writeQueue:
			err := c.conn.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				log.Println("Write error:", err)
				break
			}
		}
	}
}

func (c *Connection) WriteMessage(message []byte) {
	c.writeQueue <- message
}

func getSensor() string {
	output, err := exec.Command("rpicam-raw", "--list-camera").CombinedOutput()
	if err != nil {
		return "??"
	}

	lines := strings.Split(string(output), "\n")

	for _, line := range lines {
		re := regexp.MustCompile(`imx\d\d\d`)
		match := re.FindString(line)
		if match != "" {
			return strings.ToUpper(match)
		} else {
			continue
		}
	}
	return "??"
}

func getFileSystems() string {
	output, err := exec.Command("df", "-h", mediaDir).Output()
	if err != nil {
		return "0"
	}

	lines := strings.Split(string(output), "\n")

	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) == 6 && fields[0] != "Filesystem" {
			return strings.ReplaceAll(fields[4], "%", "")
		}
	}
	return "0"
}

func getCPUTemperature() float64 {
	data, err := os.ReadFile("/sys/class/thermal/thermal_zone0/temp")
	if err != nil {
		fmt.Println("Failed to open temperature file:", err)
		return -1.0
	}

	tempStr := strings.TrimSpace(string(data))
	tempMilliDegrees, err := strconv.Atoi(tempStr)
	if err != nil {
		fmt.Println("Failed to parse temperature:", err)
		return -1.0
	}

	return float64(tempMilliDegrees) / 1000.0
}

func getCpuUtil() float64 {
	var percent float64

	content, err := os.ReadFile("/proc/stat")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return -1.0
	}

	lines := strings.Split(string(content), "\n")
	for _, line := range lines {
		if strings.HasPrefix(line, "cpu ") {
			fields := strings.Fields(line)
			totalUser, _ := strconv.ParseUint(fields[1], 10, 64)
			totalUserLow, _ := strconv.ParseUint(fields[2], 10, 64)
			totalSys, _ := strconv.ParseUint(fields[3], 10, 64)
			totalIdle, _ := strconv.ParseUint(fields[4], 10, 64)

			if totalUser < lastTotalUser || totalUserLow < lastTotalUserLow ||
				totalSys < lastTotalSys || totalIdle < lastTotalIdle {
				percent = -1.0
			} else {
				total := (totalUser - lastTotalUser) + (totalUserLow - lastTotalUserLow) +
					(totalSys - lastTotalSys)
				totalIdleDiff := totalIdle - lastTotalIdle
				percent = float64(total) / float64(total+totalIdleDiff)
			}

			lastTotalUser = totalUser
			lastTotalUserLow = totalUserLow
			lastTotalSys = totalSys
			lastTotalIdle = totalIdle
			break
		}
	}

	return percent * 100
}

func getFileNameList() []string {
	var fileNames []string
	files, err := os.ReadDir(mediaDir)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("files:", files)
	for _, file := range files {
		if !strings.Contains(file.Name(), mediaPrefix) {
			fileNames = append(fileNames, file.Name())
		}
	}
	fmt.Println("fileNames:", fileNames)
	return fileNames
}

func getFileList() string {
	fileNamesStr := "[" + formatFileNamesReverse(getFileNameList()) + "]"
	return fileNamesStr
}

func formatFileNamesReverse(fileNames []string) string {
	result := ""
	for i := len(fileNames) - 1; i >= 0; i-- {
		if i < len(fileNames)-1 {
			result += ", "
		}
		result += fmt.Sprintf(`"%s"`, fileNames[i])
	}
	return result
}

func ContainsString(arr []string, target string) bool {
	for _, s := range arr {
		if s == target {
			return true
		}
	}
	return false
}

func renameFiles(oldName, newName string) {
	if ContainsString(getFileNameList(), newName) {
		newName += "_1"
	}
	err := os.Rename(mediaDir+"/"+oldName, mediaDir+"/"+newName)
	if err != nil {
		log.Println(err)
	}
	fmt.Printf("File %s renamed to %s\n", oldName, newName)
}

func deleteFiles(fileName string) {
	err := os.RemoveAll(mediaDir + "/" + fileName)
	if err != nil {
		log.Println(err)
	}
	fmt.Printf("File %s deleted\n", fileName)
}

func sendFileList(wc *Connection) {
	b := &WsMessage{
		MsgType:   "list",
		MsgDetail: getFileList(),
	}
	r, _ := json.Marshal(b)
	wc.WriteMessage(r)
}

func sendRenameFiles(renameMsg RenameMsg, wc *Connection) {
	renameFiles(renameMsg.OldName, renameMsg.NewName)
	sendFileList(wc)
}

func sendDeleteFiles(fileName string, wc *Connection) {
	deleteFiles(fileName)
	sendFileList(wc)
}

func sendInitData(rdb *redis.FoxRedisClient, wc *Connection) {
	keys := []string{"iso", "fps", "sht", "awb", "cg_rb", "is_recording", "lv_zoom"}
	for _, v := range keys {
		m := &WsMessage{
			MsgType:   v,
			MsgDetail: rdb.GetValue(v),
		}
		r, _ := json.Marshal(m)
		wc.WriteMessage(r)
	}

	s := &WsMessage{
		MsgType:   "sensor",
		MsgDetail: getSensor(),
	}
	r, _ := json.Marshal(s)
	wc.WriteMessage(r)
}

func sendSystemData(ctx context.Context, wc *Connection) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("send system exit")
			return
		default:
			cpu := &WsMessage{
				MsgType:   "cpu",
				MsgDetail: strconv.FormatFloat(getCpuUtil(), 'f', 1, 64),
			}
			r, _ := json.Marshal(cpu)
			wc.WriteMessage(r)

			cpuTem := &WsMessage{
				MsgType:   "cpuTem",
				MsgDetail: strconv.FormatFloat(getCPUTemperature(), 'f', 1, 64),
			}
			r, _ = json.Marshal(cpuTem)
			wc.WriteMessage(r)

			ssd := &WsMessage{
				MsgType:   "ssd",
				MsgDetail: getFileSystems(),
			}
			r, _ = json.Marshal(ssd)
			wc.WriteMessage(r)

		}
		time.Sleep(time.Second)
	}
}

func ControllerContext(c *gin.Context) {
	conn, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	wc := &Connection{
		conn:       conn,
		writeQueue: make(chan []byte, 256), // buffered channel
	}

	rdb := redis.CreateConnect()

	ctx, cancel := context.WithCancel(context.Background())

	go wc.writePump(ctx)

	defer func() {
		wc.conn.Close()
	}()

	sendInitData(rdb, wc)

	go sendSystemData(ctx, wc)

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			cancel()
			log.Println("Read error:", err)
			break
		}
		log.Printf("Received message: %s\n", message)

		s := &WsMessage{}
		err = json.Unmarshal(message, s)
		if err != nil {
			log.Println(err)
		}

		switch s.MsgType {
		case "list":
			sendFileList(wc)
		case "rename":
			re := &RenameMsg{}
			err = json.Unmarshal([]byte(s.MsgDetail), re)
			if err != nil {
				log.Println(err)
			}
			sendRenameFiles(*re, wc)
		case "delete":
			sendDeleteFiles(s.MsgDetail, wc)
		case "unmount":
			i2c.UnmountPCIe()
			time.Sleep(500 * time.Millisecond)
			sendFileList(wc)
		default:
			rdb.SetAndPublish(s.MsgType, s.MsgDetail)
		}
	}
}
