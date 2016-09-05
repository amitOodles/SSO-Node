var express = require('express');
// var router = express.Router();
var app = express();
var path = require('path');
var fs = require('fs');

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '/public/')));

// viewed at http://localhost:8080
app.get('/img', function(req, res) {
	var age = req.query.age;
	var cses = req.query.cses;
	var thp = req.query.thp;
	var fy = req.query.fy;
    res.render(path.join(__dirname + '/views/index.ejs'),{
    	age : age,
    	cses : cses,
    	thp : thp,
    	fy : fy
    });
    // res.sendFile(path.join(__dirname + '/views/index.html'));
    // res.redirect('/image');
});

app.get('/image', function(req, res) {
	// document.write("<h1>ALas</h1>");
	// res.sendFile(path.join(__dirname + '/views/index.html'));
	// setTimeout(function(){
		console.log(__dirname);
	var img = fs.readFileSync('/home/amit/Downloads/SSO-Calculation.png');
	fs.unlink('/home/amit/Downloads/SSO-Calculation.png');
    res.writeHead(200, {'Content-Type': 'image/png'	 });
    res.end(img, 'binary');
// },5000);
	
});

app.get('/', function(req, res) {
	
    res.sendFile(path.join(__dirname + '/views/index1.html'));
    // res.redirect('/image');
});

// module.exports = router;

app.listen(3000);
