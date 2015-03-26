//script to manually commssion green bean connect
//node manualCommission.js --ssid=1stbuild --ssid_password=firstbuild --url=https://firstbuild-sandbox.firebaseio.com/ --token=

//no error handling

var http = require('http');
var querystring = require('querystring')
var argv = require('minimist')(process.argv.slice(2));

commission(argv.url, argv.token, argv.ssid, argv.ssid_password)

function commission(firebaseUrl, firebaseToken, ssidToConnect, ssidPassphrase)
{
	console.log("ssid: " + ssidToConnect);
	console.log("ssid_password: " + ssidPassphrase);
	console.log("firebase url: " + firebaseUrl);
	console.log("firebase token: " + firebaseToken);

	console.log("posting token and url...")

	var authDataString = JSON.stringify({"token" : firebaseToken, "url" : firebaseUrl});
	var ssidDataString = JSON.stringify({"ssid" : ssidToConnect, "passphrase" : ssidPassphrase});

	var authOptions = {hostname: '192.168.10.1',port: 80,path: '/auth',method: 'POST',headers: {'Content-Type': 'application/json'}};
	var ssidOptions = {hostname: '192.168.10.1',port: 80,path: '/networks',method: 'POST',headers: {'Content-Type': 'application/json'}};

	var ssidReq = http.request(ssidOptions, function(res) {
	  console.log('SSID POST: ' + res.statusCode);
	  res.on('data', function (chunk) {
	    console.log("BODY: " + chunk);
	  });
	});

	var authReq = http.request(authOptions, function(res) {
	  console.log('AUTH POST: ' + res.statusCode);
	  res.on('data', function (chunk) {
	    ssidReq.write(ssidDataString);
		ssidReq.end();
	  });
	});

	// write data to request body
	authReq.write(authDataString);
	authReq.end();
	
}