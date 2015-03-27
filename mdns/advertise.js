//simple helper node script for advertising services
//to find use:
//	osx: dns-sd -L ChillHub-0ec5e4d0 _http._tcp (replace with service name that you need)
//linux: avahi-browse _http._tcp
var config = require('/root/chillhub.json');

var advertiseName = "ChillHub-" + config.uuid.substring(0,8);

console.log(advertiseName);

var mdns = require('mdns');
var options = { name: advertiseName }
// advertise a http server on port 4321
var ad = mdns.createAdvertisement(mdns.tcp('http'), 80, options);
ad.start();
