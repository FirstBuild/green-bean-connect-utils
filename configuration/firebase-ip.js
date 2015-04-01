// installation:
// $ npm install firebase

// usage:
// $ node firebase-ip.js

var os = require('os');
var Firebase = require('firebase');
var chillhub = require('./chillhub.json');
var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com');

function ip_address(interface) {
  var items = os.networkInterfaces()[interface] || [];

  return items
    .filter(function(item) {
      return item.family.toLowerCase() == 'ipv4';
    })
    .map(function(item) {
      return item.address;
    })
    .shift();
}

ref.authWithCustomToken(chillhub.token, function(err, auth) {
  if (err) return console.error(err);

  var content = { ip_address: ip_address('wlan0') || null };

  ref.child('users').child(auth.uid)
    .child('devices').child('chillhubs').child(chillhub.uuid)
    .update(content, function(err) {
      process.exit(0);
    });
});
