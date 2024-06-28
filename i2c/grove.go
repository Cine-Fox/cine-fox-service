package i2c

import (
	"fmt"
	"golang.org/x/exp/io/i2c"
	"log"
	"time"
)

/**
  Get value from SeeedStudio Pi Grove Base Hat
*/

const (
	adcAddress = 0x08
)

func getAngerValue() {
	dev, err := i2c.Open(&i2c.Devfs{Dev: "/dev/i2c-1"}, adcAddress)
	if err != nil {
		log.Printf("Failed to open I2C device: %v", err)
	}
	defer dev.Close()

	for {
		value, err := readRegister(dev, 0x30+2)
		if err != nil {
			log.Fatalf("Failed to read value: %v", err)
		}

		fmt.Printf("Value: %d\n", value)
		time.Sleep(time.Second)
	}
}

func readRegister(dev *i2c.Device, reg byte) (uint16, error) {
	if err := dev.Write([]byte{reg}); err != nil {
		return 0, fmt.Errorf("failed to write register address: %v", err)
	}

	var data [2]byte
	if err := dev.Read(data[:]); err != nil {
		return 0, fmt.Errorf("failed to read data: %v", err)
	}

	value := uint16(data[0]) | uint16(data[1])<<8

	return value, nil
}
