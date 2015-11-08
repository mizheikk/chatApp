var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('port', (process.env.PORT || 3000));

app.get('/',  function(req, res, next){
  res.sendFile('public/index.html');
});

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server started at http://localhost:%s', port);
});
