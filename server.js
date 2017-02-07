var express = require('express');
// var router = express.Router();
var app = express();
var path = require('path');
var fs = require('fs');
// var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var type = upload.single('file');

var webshot = require('webshot');

var webshotOptions = {
    // screenSize: {
    //   width: 768
    // , height: 510
    // },
    shotSize: {
        width: 610,
        height: 500
    }
};




// app.use(bodyParser({uploadDir:'/home/amit/Downloads'}));


app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '/public/')));


// viewed at http://localhost:8080
app.get('/query', function(req, res) {
    var age = req.query.age;
    var cses = req.query.cses;
    var thp = req.query.thp;
    var fy = req.query.fy;
    res.render(path.join(__dirname + '/views/index.ejs'), {
        age: age,
        cses: cses,
        thp: thp,
        fy: fy
    });
    // res.sendFile(path.join(__dirname + '/views/index.html'));
    // res.redirect('/image');
});


app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/views/index1.html'));
    // res.redirect('/image');
});

app.get('/webshot', function(req, res, callback) {
    var ageWs = req.query.age;
    var csesWs = req.query.cses;
    var thpWs = req.query.thp;
    var fyWs = req.query.fy;

    var queryStringWs = "query?fy=" + fyWs + "&age=" + ageWs + "&cses=" + csesWs + "&thp=" + thpWs;

    var timeS = new Date;
    var name = timeS.getTime() + ".png";

    // var end = Date.now() + 10000;
    // console.log(end);
    // while (Date.now() < end);

    function f1() {
        webshot('http://180.151.85.194:3000/' + queryStringWs, '../../calculators/incomeTaxCalculator/uploads/' + name, webshotOptions, function(err, data) {
            // res.write("error saving");

            if (err) {
                console.log("error is", err);
                var resErr = new Error("Unable to generate SSO chart");
                resErr.status = 400;
                console.log("error occured", resErr);
                callback(resErr);
            } else {
                var img = fs.readFileSync('../../calculators/incomeTaxCalculator/uploads/' + name);
                console.log('uploads/' + name);
                fs.unlink('uploads/' + name);
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(img, 'binary');
            }


        });
    }

    f1();

    // function waitUntilFileExists(path, callback) {
    //    fs.exists(path, function(exists) {
    //    if (!exists) {
    //      waitUntilFileExists(path, callback);
    //    } else {
    //      setTimeout(callback,4000);
    //    } 
    //    });
    // }

    //    waitUntilFileExists('uploads/' + name,function(){
    // var img = fs.readFileSync('uploads/' + name);
    //    console.log('uploads/' + name);
    // fs.unlink('uploads/' + name);
    //    res.writeHead(200, {'Content-Type': 'image/png'  });
    //    res.end(img, 'binary');
    // }); 



});

app.get('/getImage', function(req, res) {
    var name = req.query.name;
    var img = fs.readFileSync('uploads/' + name);
    console.log('uploads/' + name);
    fs.unlink('uploads/' + name);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img, 'binary');
});

// module.exports = router;

app.listen(3000);
