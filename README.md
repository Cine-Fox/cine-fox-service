# Cine Fox

## Overview

Cine Fox is mainly used to build cinema machines that are easy to use right out of the box. Users only need a few connections to make them easy to use. The operation method mainly relies on your mobile phone.

> [!WARNING]
> **So far, Cine Fox only supports Pi5**

## Functions
- Change ISO, FPS, SHUTTER, WB from monitor
- Start/Stop record from monitor
- Get Pi's CPU detail from monitor
- Get Image Sensor detail from monitor
- Get SSD detail from monitor
- Coming...

## Getting Start

### Hardware Prepare

> [!TIP]
> This is my hardware list:
> - Pi 5: Pi 5 and some heat sink
> - Power Manager: 👇 I have tried all three below, you can refer to it and choose one of them 
>    1. (⭐Recommend) Geekworm X735 V3.0 & Momentary switch  💴[Buy](https://geekworm.com/collections/nas-storage/products/raspberry-pi-x735-safe-shutdown-auto-cooling-expansion-board) 📕[Wiki](https://wiki.geekworm.com/X735)
>
>    2. 52Pi EP-0104 💴[Buy](https://www.amazon.com/GeeekPi-Raspberry-DockerPi-Shutdown-Expansion/dp/B07TC31Y92/ref=sr_1_1?crid=3BH7E288EQF2T&dib=eyJ2IjoiMSJ9.w1rSmfir75dtcff-mcZGKg.yyfrdIMeTey91KaF5MaiwC1iXdwqiXFQGO8RvpR6M6A&dib_tag=se&keywords=dockerpi+power&qid=1715139745&sprefix=dockerpi+power%2Caps%2C337&sr=8-1) 📕[Wiki](https://wiki.52pi.com/index.php/EP-0104)
>
>    3. Some dc-dc converter 💴[Buy](https://spotpear.com/index.php/index/product/detail/id/1472.html)
> - Image Sensor: StarlightEye 📕[Wiki](https://github.com/will127534/StarlightEye) (Opensource Camera module, you can also make it by yourself)
> - Lenses: Hikrobot MVL-KF1624M-25MP 💴[Buy](https://www.hikrobotics.com/en/machinevision/productdetail?id=5780&pageNumber=1&pageSize=50)
> - Phone: Android/iOS Mobile Phone
> - Battery: SmallRig VB50 💴[Buy](https://www.smallrig.com/SmallRig-VB50-mini-V-Mount-Battery-3579.html)
> - Pi5 CFE HAT: 📕[Wiki](https://github.com/Cine-Fox/RPI5-CFE-Hat) (Opensource hardware, you can also make it by yourself)
> - DIY CFE TypeB Card (Samsung 970evoPlus 2T + JEYI 2280 DIY CFE TypeB Card Shell)

### Software Installation

1. Flash [cinepi-sdk](/getting-start.md) to your micro-sd card
2. run `run-raw.sh`
3. Download cine-fox [Here](https://github.com/Cine-Fox/cine-fox-controller/releases)
4. `chmod 777 cine-fox`
5. `./cine-fox`
6. open your browser and type `<your-pi-ip>:5678/web`

### Run it when boot
[Here](service/README.md)

### Use apk
[Here](https://github.com/Cine-Fox/cine-fox-apk)
