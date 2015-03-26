// generates a chillhub.json configuration file 
// this file needs to be copied to /root/chillhub.json ( you can also use the output of this for manualCommission.js)
// change firebase url, user and password if you wish
// NOTE: the firebase username and password is stored in this json

var Firebase = require('firebase');
var uuid = require('node-uuid');
var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com/');
var fs = require('fs');
var generatePassword = require('password-generator');
var Moniker = require('moniker');

generate();

function generate() {

    var firebasePassword = generatePassword(8, true);
    var accessPointUUID = uuid.v1();
    var accessPointPassword = generatePassword(8, true);
    var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
    var shortName = names.choose();
    var user = shortName + "@firebase.com";

    console.log("attempt to create user: ", user);
    ref.createUser({
        email: user,
        password: firebasePassword
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
                "password": firebasePassword
            }, function(error, authData) {
                if (error) {
                    console.log("Firebase login failed", error);
                    process.exit();
                } else {
                    console.log("Successfully created user account with uid:", authData.uid, " user: ", user, " password: ", firebasePassword, " token: ", authData.token);
                    fs.writeFile("chillhub.json" + "." + shortName, '{"uuid":"' + accessPointUUID + '", "passphrase":"' + accessPointPassword +'", "firebaseUrl":"https://firstbuild-sandbox.firebaseio.com/","token":"' + authData.token + '", "firebaseUsername":"' + user+ '","firebasePassword":"' + firebasePassword + '"}\r\n', function(err) {
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
}





