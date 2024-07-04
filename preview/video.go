package preview

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func VideoContext(c *gin.Context) {

	inputFolder := c.Param("folder")

	dirPath := mediaDir + "/" + inputFolder + "/thumbnails/output.mp4"

	_, err := os.Stat(dirPath)
	if os.IsNotExist(err) {
		fmt.Println(dirPath)
		c.Status(http.StatusNotFound)
		return
	}

	c.Header("Content-Type", "video/mp4")
	c.File(dirPath)

}
