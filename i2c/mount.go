package i2c

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"golang.org/x/exp/io/i2c"
)

/**
  Get value from CFE Hat, see more from https://github.com/Cine-Fox/RPI5-CFE-Hat/blob/main/Software/automount.py
*/

var (
	mounted          = false
	deviceNode       = ""
	bus              *i2c.Device
	lastInsertButton bool
	lastEjectButton  bool
)

const cfeAddress = 0x34

func openI2c() {
	var err error
	bus, err = i2c.Open(&i2c.Devfs{Dev: "/dev/i2c-1"}, cfeAddress)
	if err != nil {
		log.Printf("Failed to open I2C device: %v", err)
	}
}

func readButtons() (bool, bool) {

	data := make([]byte, 1)
	for {
		err := bus.Read(data)
		if err != nil {
			fmt.Printf("Error reading from I2C bus: %s\n", err)
			return false, false
		}

		// Check if data is not equal to 0x69
		if data[0] != 0x69 {
			break
		}

		time.Sleep(100 * time.Millisecond)
	}

	// Calculate button states from data
	ejectButton := data[0]&0x02 == 0x02
	insertButton := data[0]&0x01 == 0x01

	return insertButton, ejectButton
}

func writeLED(data byte) {
	if err := bus.Write([]byte{data}); err != nil {
		fmt.Printf("Error writing to I2C bus: %s\n", err)
		return
	}
}

func UnmountPCIe() {
	fmt.Println("Unmounting PCIe device")
	cmd := exec.Command("sudo", "umount", "/media/RAW")
	if err := cmd.Run(); err != nil {
		fmt.Printf("Error unmounting PCIe device: %s\n", err)
	}

	NVMePort := checkForDevice("Non-Volatile memory controller")
	fmt.Printf("NVMe Device found: %s\n", NVMePort)

	if NVMePort != "" {
		cmd := exec.Command("sudo", "bash", "-c", fmt.Sprintf("echo 1 >/sys/bus/pci/devices/%s/remove", NVMePort))
		if err := cmd.Run(); err != nil {
			fmt.Printf("Error removing NVMe device: %s\n", err)
		}
	}

	writeLED(0)
	mounted = false
	deviceNode = ""
}

func mountPCIe() {
	fmt.Println("Mounting PCIe device")
	time.Sleep(500 * time.Millisecond)

	// Check if the driver exists
	if _, err := os.Stat("/sys/devices/platform/axi/1000110000.pcie/driver"); err == nil {
		fmt.Println("1000110000.pcie driver exists, trying rescan")
		cmd := exec.Command("sudo", "bash", "-c", "echo 1 >/sys/bus/pci/rescan")
		err := cmd.Run()
		if err != nil {
			fmt.Println("Error during rescan:", err)
		}
	} else {
		fmt.Println("1000110000.pcie driver has not loaded, binding the driver")
		cmd := exec.Command("sudo", "bash", "-c", "echo 1000110000.pcie > /sys/bus/platform/drivers/brcm-pcie/bind")
		err := cmd.Run()
		if err != nil {
			fmt.Println("Error binding the driver:", err)
		}
	}

	time.Sleep(500 * time.Millisecond)

	// Check if the device is mounted
	deviceNode = checkForDevice("Non-Volatile memory controller")
	fmt.Println("deviceNode:", deviceNode)
	// Mount the NVMe drive if it's found
	if deviceNode != "" {
		mountLastPartition(deviceNode)
		writeLED(1)
		mounted = true
	}
	auth()
}

func auth() {
	cmd := exec.Command("chmod", "777", "/media/RAW")
	_, err := cmd.Output()
	if err != nil {
		fmt.Printf("Auth: %s\n", err)
		return
	}
}

func checkForDevice(deviceName string) string {
	cmd := exec.Command("lspci", "-mm")
	output, err := cmd.Output()
	if err != nil {
		fmt.Printf("An error occurred while running the lspci command: %s\n", err)
		return ""
	}

	lines := strings.Split(string(output), "\n")

	for _, line := range lines {
		if strings.Contains(line, deviceName) {
			fields := strings.Fields(line)
			if len(fields[0]) <= 7 {
				return "0000:" + fields[0]
			}
			return fields[0]
		}
	}

	return ""
}

func mountLastPartition(deviceNode string) {
	// List all partitions for the given device and get the last partition number
	partitions, err := filepath.Glob(fmt.Sprintf("/dev/nvme%sn1p*", string(deviceNode[len(deviceNode)-1])))
	if err != nil {
		fmt.Printf("Error listing partitions for device %s: %s\n", deviceNode, err)
		return
	}

	fmt.Println("partitions:", partitions)

	if len(partitions) == 0 {
		fmt.Printf("No partitions found for device %s\n", deviceNode)
		return
	}

	lastPartition := partitions[len(partitions)-1]

	devicePath := lastPartition
	mountPath := "/media/RAW"

	fsType := getFilesystemType(devicePath)
	fmt.Println("fsType:", fsType)
	if fsType == "" {
		fmt.Printf("Could not determine the filesystem type of %s\n", devicePath)
		return
	}

	cmd := exec.Command("sudo", "mkdir", "-p", mountPath)
	if err := cmd.Run(); err != nil {
		fmt.Printf("Error creating mount point %s: %s\n", mountPath, err)
		return
	}

	fmt.Printf("NVMe device %s found, attempting to mount partition %s...\n", deviceNode, devicePath)

	switch fsType {
	case "ntfs":
		cmd := exec.Command("sudo", "mount", "-t", "ntfs3", "-o", "uid=1000,gid=1000", devicePath, mountPath)
		if err := cmd.Run(); err != nil {
			fmt.Printf("Error mounting partition %s: %s\n", devicePath, err)
			return
		}
	case "ext4":
		cmd := exec.Command("sudo", "mount", "-t", "ext4", devicePath, mountPath)
		if err := cmd.Run(); err != nil {
			fmt.Printf("Error mounting partition %s: %s\n", devicePath, err)
			return
		}
	case "exfat":
		cmd := exec.Command("sudo", "mount", "-t", "exfat", "-o", "uid=1000,gid=1000", devicePath, mountPath)
		if err := cmd.Run(); err != nil {
			fmt.Printf("Error mounting partition %s: %s\n", devicePath, err)
			return
		}
	default:
		fmt.Printf("Unsupported filesystem type %s\n", fsType)
		return
	}

	fmt.Printf("NVMe device %s partition %s has been mounted at %s\n", deviceNode, devicePath, mountPath)
}

func getFilesystemType(devicePath string) string {
	cmd := exec.Command("sudo", "blkid", "-s", "TYPE", "-o", "value", devicePath)
	output, err := cmd.Output()
	if err != nil {
		fmt.Printf("Error determining filesystem type of %s: %s\n", devicePath, err)
		return ""
	}
	result := strings.TrimSpace(string(output))
	return result
}

func StartListenCFEHat() {
	openI2c()
	defer bus.Close()
	lastInsertButton = false
	lastEjectButton = false

	insertButton, ejectButton := readButtons()
	if !insertButton && !mounted {
		mountPCIe()
	}
	lastInsertButton = insertButton
	lastEjectButton = ejectButton

	for {
		insertButton, ejectButton := readButtons()
		if lastInsertButton && !insertButton && !mounted {
			mountPCIe()
		}
		if lastEjectButton && !ejectButton {
			UnmountPCIe()
		}
		lastInsertButton = insertButton
		lastEjectButton = ejectButton
		time.Sleep(100 * time.Millisecond)
	}
}
