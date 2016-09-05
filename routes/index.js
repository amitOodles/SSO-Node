var express = require('express');
var router = express.Router();
var path = require('path');
var app= express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw', function(req, res, next) {
  res.render('helloWorld', { title: 'hello world' });
});

console.log("helllllllaoo");
app.get('/hwo', function(req, res, next) {
  res.sendFile(path.join(__dirname + '.../public/' + 'index.html'));
});

module.exports = router;
