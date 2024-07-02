package preview

import (
	"bytes"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"image/jpeg"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/disintegration/imaging"
	"github.com/gorilla/websocket"
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

	go sendImage(mediaDir+"/"+inputFolder, wc, ctx)

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

func getDNGFiles(folder string) ([]string, error) {
	var dngFiles []string

	err := filepath.Walk(folder, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(info.Name()) == ".dng" {
			dngFiles = append(dngFiles, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return dngFiles, nil
}

func sendImage(inputFolder string, wc *Connection, ctx context.Context) {
	dngFiles, err := getDNGFiles(inputFolder)
	if err != nil {
		log.Printf("Error reading DNG files: %v", err)
	}

	for _, inputFile := range dngFiles {
		select {
		case <-ctx.Done():
			fmt.Println("send image exit")
			return
		default:
			file, err := os.Open(inputFile)
			if err != nil {
				log.Printf("Error opening file %s: %v", inputFile, err)
				continue
			}
			defer file.Close()

			img, err := imaging.Decode(file)
			if err != nil {
				log.Printf("Error decoding image %s: %v", inputFile, err)
				continue
			}

			thumbnail := imaging.Thumbnail(img, 640, 360, imaging.Lanczos)

			buf := new(bytes.Buffer)

			o := &jpeg.Options{Quality: 50}

			err = jpeg.Encode(buf, thumbnail, o)
			if err != nil {
				log.Printf("Error encoding thumbnail %s: %v", inputFile, err)
				continue
			}

			wc.WriteMessage(buf.Bytes())

			time.Sleep(time.Second / 24)
		}
	}
}
