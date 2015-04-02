var fs = require('fs');

function data(email, password) {
  var Firebase = require('firebase');
  var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com');
  var credentials = { email: email, password: password };

  ref.authWithPassword(credentials, function(err, auth) {
    if (err) {
      console.error('Failed to login with credentials:', err);
    }
    else if (auth) {
      ref.child('users').child(auth.uid).once('value', function(snapshot) {
        console.log(JSON.stringify(snapshot.val(), null, 2));
      });
    }
    else {
      console.error('Failed to login with credentials!');
      console.error('Make sure you entered your email and password correctly.');
    }
  });
}

fs.exists('./node_modules/firebase', function(exists) {
  if (exists) {
    if (process.argv.length == 4) {
      data(process.argv[2], process.argv[3]);
    }
    else {
      console.error('usage: node sandbox-data.js <email> <password>');
    }
  }
  else {
    console.error('Could not find firebase package!');
    console.error('Did you run `npm install firebase`?');
  }
});
