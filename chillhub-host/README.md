# ChillHub Host Configuration

These are instructions for installing ChillHub components on a fresh Raspberry Pi Model B.

## Install Arch Linux on SD Card

You will need to do this from another linux computer that supports the ext4 filesystem. Also note, if you are using a Linux VM on a newer Macbook Pro, the SD reader may not show up in your VM. The easiest workaround for this is to just use a USB sd card reader. 

___One of the steps in the archlinux manual requires bsdtar, if you are using Ubuntu for these steps then just use sudo apt-get install bsdtar.___

Raspberry Pi v2:
http://archlinuxarm.org/platforms/armv7/broadcom/raspberry-pi-2

Raspberry Pi v1:
http://archlinuxarm.org/platforms/armv6/raspberry-pi

#### *optional* Wireless Pre-Config 
It is recommended that you use a wired connection, but proceed with the following if you don't...

If you do not have access to an ethernet connection for your pi, then follow these steps to add the necessary wireless packages. This assumes you are using the OURLINK wireless dongle. Other adapters should work however. A network connection is required to install the packages necessary to run the ChillHub install scripts.

1. download wireless_tools, libnl, and wpa_supplicant from http://mirror.archlinuxarm.org/armv7h/core/ (armv6h for raspberry pi version 1)
2. copy the above download items to your dos partition on the sd card. You'll need to re-insert the sd card into your computer if you ejected and unmounted while install arch onto the sd card
3. eject the SD card and place it into the pi
4. after booting and logging in install the above packages:
  1. ```cd /boot```
  2. ```pacman -U libnl-XX.tar.xz```
  3. ```pacman -U wpa_supplicant-XX.tar.xz```
  4. ```pacman -U wireless_tools-XX.tar.xz```
5. Run: ```ip link set wlan0 up```
6. Run: ```wpa_supplicant -B -D nl80211,wext -i wlan0 -c <(wpa_passphrase "yourssid" "yourpassword")```
7. Run: ```dhcpcd wlan0```

You should now have wireless internet access to complete the next steps.

## Setup ChillHub 
After arch is running boot your pi and run the following:

#### setup base rpi packages

1. ```pacman -Syu``` (updates pacman package system and any packages from the image above)
2. ```pacman -S git``` (install git)
3. ```cd /root; git clone https://github.com/firstbuild/chillhub-host```
4. ```cd chillhub-host; sh install``` (choose option 1)

#### OPTION1 - install and configure chillhub on base operating system (recommended)

1.  ```cd /root/chillhub-host; sh install``` (choose option 3)

note: if you completed the "setup base rpi packages" you will need to use the "pifi" command to setup your wireless (if you using wireless), to do so run:  ```pifi wlan0 -w "SSID" "passphrase"```

The ChillHub firmware is now installed. To run it (need to restart after each pi reboot):

1. ```cd /root/chillhub-firmware```
2. ```node chillhub```


#### OPTION2 - install and configure chillhub in docker containers 

1.  ```cd /root/chillhub-host; sh install``` (choose option 2)
2.  This will reboot the pi after docker has installed, *repeat the step above when you log back in*. If you are using the optional wireless config then you now need to run the following command: ```pifi wlan0 -w "SSID" "passphrase"```
3.  wait (this takes over an hour)
4.  After installation is finally complete, reboot
5. Generate chillhub config file: ```cd /root; curl -sL http://bit.ly/18TxiZJ |sh``` <--- yeah, not generally recommended to do this sort of thing. The file you want to run is create-json.sh. Feel free to download and run this manually.  



