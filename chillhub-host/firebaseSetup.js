
var Firebase = require('firebase');
var uuid = require('node-uuid');
var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com/');
var fs = require('fs')

var user = uuid.v1() + "@firebase.com";
var password = uuid.v1();

console.log("attempt to create user: ", user);

ref.createUser({
    email: user,
    password: password
}, function(error, userData) {
    if (error) {
        switch (error.code) {
            case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
            case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
            default:
                console.log("Error creating user:", error);
        }
        process.exit();
    } else {
        ref.authWithPassword({
            "email": user,
            "password": password
        }, function(error, authData) {
            if (error) {
                console.log("Firebase login failed", error);
                process.exit();
            } else {
                console.log("Successfully created user account with uid:", authData.uid, " user: ", user, " password: ", password, " token: ", authData.token);
                fs.writeFile("chillhub.json", '{"uuid":"dummy","passphrase":"passphrase","firebaseUrl":"https://firstbuild-sandbox.firebaseio.com/","token":"' + authData.token + '"}\r\n', function(err) {
                    if (err) {
                        console.log("Unable to create chillhub.json");
                        process.exit();
                    } else {
                        console.log("Successfully created chillhub.json");
                        process.exit();
                    }
                });
            }
        });

    }
});

