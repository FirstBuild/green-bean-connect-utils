var express = require('express');
var app = express();

var OAUTH_REDIRECT_URL = 'https://accounts.google.com/o/oauth2/auth'
  + '?scope=profile'
  + '&response_type=token'
  + '&redirect_uri=http://localhost/auth/google'
  + '&state=google'
  + '&client_id=523108828656-4ci5asom1j8o02mmjujv6bm616l7vogs'
    + '.apps.googleusercontent.com';

app.get('/', function(req, res) {
  res.redirect(OAUTH_REDIRECT_URL);
});

app.use(express.static('public'));
app.listen(80);
