### Manually Commission your Green Bean Connect Kit and Connect to Firebase

1. git clone https://github.com/FirstBuild/green-bean-connect-utils
2. cd configuration
3. npm install
4. node generateFirebaseLoginAndToken (modify firebase url if you don't want to use FirstBuild's sandbox)

This will create a new user in the firebase you specified and generate a firebase file. with credentials. Simple login must be enabled on the firebase instance you are using (it is on FirstBuild sandbox). Now that you have the information necessary to setup your Green Bean Connect Perform the next steps:


1. Press and release the black button on the top of the box, the LED should be blinking. This indicates it is in access point mode. 
2. On your development computer connect to the Green Bean Connect Kit's Wifi (ChillHub-XXXX). The passphrase was supplied with the unit.
3. After you are connected run: node manualCommission.js --ssid={your site's wifi network}--ssid_password={your site's wifi password} --url=https://firstbuild-sandbox.firebaseio.com/ --token={token generated in firebase config file}
4. The light will eventually become solid and the Green Bean Connect Kit will connect to firebase.
