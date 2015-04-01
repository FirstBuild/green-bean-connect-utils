// installation:
// $ npm install firebase

// usage:
// $ node sandbox-data.js <email> <password>

var Firebase = require('firebase');
var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com');
var credentials = { email: process.argv[2], password: process.argv[3] };

ref.authWithPassword(credentials, function(err, auth) {
  ref.child('users').child(auth.uid).once('value', function(snapshot) {
    console.log(JSON.stringify(snapshot.val(), null, 2));
  });
});
