### Manually Commission your Green Bean Connect Kit and Connect to Firebase

```
git clone https://github.com/FirstBuild/green-bean-connect-utils
cd green-bean-connect-utils/configuration
npm install
```

If you want to use something other than FirstBuild's firebase sandbox, edit generateFirebaseLoginAndToken:
```
var ref = new Firebase('https://firstbuild-sandbox.firebaseio.com/'); //<---change to url you want
```

Finally, run

```
node generateFirebaseLoginAndToken
```


This will create a new user in the firebase you specified and generate a firebase file. with credentials. By default it creates a make believe user, so modify if you would like to create with a valid email. Simple login must be enabled on the firebase instance you are using (it is on FirstBuild sandbox). Now that you have the information necessary to setup your Green Bean Connect Perform the next steps:


1. Press and release the black button on the top of the box, the LED should be blinking. This indicates it is in access point mode. 
2. On your development computer connect to the Green Bean Connect Kit's Wifi (ChillHub-XXXX). The passphrase was supplied with the unit.
3. After you are connected, run: 
```
node manualCommission.js --ssid={your site's wifi network}--ssid_password={your site's wifi password} --url=https://firstbuild-sandbox.firebaseio.com/ --token={token generated in firebase config file}
```
4. The light will eventually become solid and the Green Bean Connect Kit will connect to firebase.
