var express = require('express');
// var router = express.Router();
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, '/public/')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
	// console.log(req.query.id);
    res.sendFile(path.join(__dirname + '/views/index.html'));
    // res.redirect('/image');
});

app.get('/image', function(req, res) {
	// document.write("<h1>ALas</h1>");
	res.sendFile(path.join(__dirname + '/views/index.html'));
	setTimeout(function(){
		console.log("fpit");
	var img = fs.readFileSync(path.join(__dirname, '/public/images/client-logo.png'));
    // res.writeHead(200, {'Content-Type': 'image/png'	 });
    res.end(img, 'binary');},5000);
	
});

app.get('/', function(req, res) {
	
    res.sendFile(path.join(__dirname + '/views/index.html'));
    // res.redirect('/image');
});

// module.exports = router;

app.listen(3000);
