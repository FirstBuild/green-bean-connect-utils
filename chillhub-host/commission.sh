#!/bin/bash

if [ -z "$1" ]; then
	echo "usage: sh commission.sh SSID passphrase"
	exit 1
fi

if [ -z "$2" ]; then
	echo "usage: sh commission.sh ssid PASSPHRASE"
	exit 1
fi

curl -X POST -H "Content-Type: application/json" -d '{"ssid":"'"$1"'", "passphrase": "'"$2"'"}' http://192.168.10.1/networks
