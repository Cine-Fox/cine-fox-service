package i2c

import (
	"fmt"
	"golang.org/x/exp/io/i2c"
	"log"
)

const (
	IRFilterAddress = 0x34
)

type IRFilter struct {
	dev *i2c.Device
}

func NewIRFilter() *IRFilter {
	d, err := i2c.Open(&i2c.Devfs{Dev: "/dev/i2c-4"}, IRFilterAddress)
	if err != nil {
		log.Printf("Failed to open I2C device: %v", err)
		return nil
	}
	return &IRFilter{dev: d}
}

func (i *IRFilter) Enable() error {
	if err := i.dev.Write([]byte{0x01}); err != nil {
		return fmt.Errorf("failed to write address: %v", err)
	}
	return nil
}

func (i *IRFilter) Disable() error {
	if err := i.dev.Write([]byte{0x00}); err != nil {
		return fmt.Errorf("failed to write address: %v", err)
	}
	return nil
}
