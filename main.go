package main

import (
	"cine-fox-controller/control"
	"cine-fox-controller/i2c"
	"cine-fox-controller/preview"
	"embed"
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/fs"
	"log"
	"net/http"
)

const (
	mediaDir = "/media/RAW"
)

//go:embed web/dist
var staticFS embed.FS

func main() {
	cfeHat := flag.Bool("cfe-hat", true, "enable or disable cfe hat")

	flag.Parse()

	fmt.Println("--cfe-hat:", *cfeHat)

	if *cfeHat {
		go i2c.StartListenCFEHat()
	}

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	r.GET("/control", control.ControllerContext)
	r.GET("/preview/:folder", preview.ThumbnailContext)
	r.GET("/video/:folder", preview.VideoContext)

	dist, err := fs.Sub(staticFS, "web/dist")
	if err != nil {
		log.Println("dist file server error")
		return
	}

	r.StaticFS("/web", http.FS(dist))

	log.Println("Server started on :5678")

	err = r.Run(":5678")
	if err != nil {
		log.Println(err)
	}
}
