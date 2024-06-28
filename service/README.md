# Add as system service

1. copy service files into pi
2. Run command
```shell
sudo mv cine-fox.service /lib/systemd/system/cine-fox.service
sudo chmod 777 /lib/systemd/system/cine-fox.service
sudo systemctl enable cine-fox.service
```
3. do the same thing with `cinepi-raw.service`
4. reboot
