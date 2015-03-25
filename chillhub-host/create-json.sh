#!/bin/bash
pacman -S --noconfirm pwgen
echo "{\"uuid\":\"`uuidgen`\",\"passphrase\":\"`pwgen -B`\",\"firebaseUrl\":\"\",\"token\":\"\"}" > chillhub.json 
