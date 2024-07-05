package preview

import (
	"context"
	"fmt"
	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"image/jpeg"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const (
	mediaDir = "/media/RAW"
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

func (c *Connection) writePump(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("send system exit")
			return
		case message := <-c.writeQueue:
			err := c.conn.WriteMessage(websocket.BinaryMessage, message)
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

func ThumbnailContext(c *gin.Context) {

	conn, err := upGrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	wc := &Connection{
		conn:       conn,
		writeQueue: make(chan []byte, 256), // buffered channel
	}

	ctx, cancel := context.WithCancel(context.Background())

	go wc.writePump(ctx)

	defer func() {
		wc.conn.Close()
	}()

	inputFolder := c.Param("folder")

	dirPath := mediaDir + "/" + inputFolder + "/thumbnails"

	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		generateImage(mediaDir + "/" + inputFolder)
	}

	go sendImage(dirPath, wc, ctx)

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			cancel()
			log.Println("Read error:", err)
			break
		}
		log.Printf("Received message: %s\n", message)
	}
}

func generateImage(inputFolder string) {
	thumbnailsFolder := filepath.Join(inputFolder, "thumbnails")
	err := os.MkdirAll(thumbnailsFolder, 0755)
	if err != nil {
		log.Printf("Error creating thumbnails directory: %v", err)
		return
	}

	err = filepath.Walk(inputFolder, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(info.Name()) == ".dng" {
			err := processDNGFile(path, thumbnailsFolder)
			if err != nil {
				log.Printf("Error processing file %s: %v", path, err)
			}
		}
		return nil
	})

	if err != nil {
		log.Printf("Error walking through folder %s: %v", inputFolder, err)
	}
}

func processDNGFile(inputFile string, thumbnailsFolder string) error {
	file, err := os.Open(inputFile)
	if err != nil {
		return fmt.Errorf("error opening file %s: %v", inputFile, err)
	}
	defer file.Close()

	img, err := imaging.Decode(file)
	if err != nil {
		return fmt.Errorf("error decoding image %s: %v", inputFile, err)
	}

	thumbnail := imaging.Thumbnail(img, 640, 360, imaging.Lanczos)

	outputFilename := filepath.Join(thumbnailsFolder, strings.TrimSuffix(filepath.Base(inputFile), ".dng")+".jpg")
	outFile, err := os.Create(outputFilename)
	if err != nil {
		return fmt.Errorf("error creating file %s: %v", outputFilename, err)
	}
	defer outFile.Close()

	jpegOptions := &jpeg.Options{Quality: 70}
	err = jpeg.Encode(outFile, thumbnail, jpegOptions)
	if err != nil {
		return fmt.Errorf("error encoding thumbnail %s: %v", inputFile, err)
	}

	return nil
}

func sendImage(inputFolder string, wc *Connection, ctx context.Context) {
	files, err := os.ReadDir(inputFolder)
	if err != nil {
		fmt.Println(err)
		return
	}

	for _, inputFile := range files {
		select {
		case <-ctx.Done():
			fmt.Println("send image exit")
			return
		default:
			imagePath := filepath.Join(inputFolder, inputFile.Name())
			file, err := os.ReadFile(imagePath)
			if err != nil {
				log.Printf("Error opening file %s: %v", inputFile, err)
				continue
			}

			wc.WriteMessage(file)

			time.Sleep(time.Second / 24)
		}
	}
	wc.conn.Close()
}
