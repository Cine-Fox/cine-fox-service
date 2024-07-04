package preview

import (
	"fmt"
	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"image/jpeg"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
)

const (
	mediaDir = "/media/RAW"
)

var mutex = &sync.Mutex{}

func ThumbnailContext(c *gin.Context) {

	mutex.Lock()
	defer mutex.Unlock()

	inputFolder := c.Param("folder")

	dirPath := mediaDir + "/" + inputFolder + "/thumbnails"

	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		generateImage(mediaDir + "/" + inputFolder)
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
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

	generateMP4(thumbnailsFolder)

	err = deleteFilesWithSuffix(thumbnailsFolder, ".jpg")
	if err != nil {
		fmt.Println("Error deleting files:", err)
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

func generateMP4(inputFolder string) {
	cmd := exec.Command("ffmpeg", "-framerate", "24", "-pattern_type", "glob", "-i", inputFolder+"/*.jpg", "-c:v", "libxvid", "-b:v", "2M", inputFolder+"/output.mp4")

	output, err := cmd.CombinedOutput()

	if err != nil {
		fmt.Println("fail:", err)
		return
	}

	fmt.Println("output:")
	fmt.Println(string(output))
}

func deleteFilesWithSuffix(dirPath, suffix string) error {
	err := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.HasSuffix(info.Name(), suffix) {
			err := os.Remove(path)
			if err != nil {
				return fmt.Errorf("error deleting file %s: %w", path, err)
			}
		}
		return nil
	})

	if err != nil {
		return fmt.Errorf("error walking the path %s: %w", dirPath, err)
	}

	return nil
}
