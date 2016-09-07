var express = require('express');
// var router = express.Router();
var app = express();
var path = require('path');
var fs = require('fs');
// var bodyParser = require('body-parser');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var type = upload.single('file');

var webshot = require('webshot');

var webshotOptions = {
  // screenSize: {
  //   width: 768
  // , height: 510
  // },
	shotSize: {
    width: 610
  , height: 500
  }
};

 


// app.use(bodyParser({uploadDir:'/home/amit/Downloads'}));


app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '/public/')));

// app.post('/upload', function (req, res) {
//     var tempPath = req.files.file.path,
//         targetPath = path.resolve('/home/amit/Downloads/a.png');
//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//         fs.rename(tempPath, targetPath, function(err) {
//             if (err) throw err;
//             console.log("Upload completed!");
//         });
//     } else {
//         fs.unlink(tempPath, function () {
//             if (err) throw err;
//             console.error("Only .png files are allowed!");
//         });
//     }
//     // ...
// });

// app.post('/profile', type, function (req, res, next) {
// 	var name= req.file.filename + '.png';
// 	console.log(req.file);
// 	console.log(req);
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//    var tmp_path = req.file.path,
//        target_path = 'uploads/' + name;
//        // targetPath = path.resolve('/home/amit/Downloads/a.png');

//        var src = fs.createReadStream(tmp_path);
//   var dest = fs.createWriteStream(target_path);
//   src.pipe(dest);
//   src.on('end', function() {
   
//    res.end(name);

  
//  //   var img = fs.readFileSync('uploads/' + name);
// 	// fs.unlink('uploads/' + name);
//  //    res.writeHead(200, {'Content-Type': 'image/png'	 });
//  //    res.end(img, 'binary');

//   });
//   src.on('error', function(err) { res.render('error'); });  
//    console.log("Upload completed!");

//     // if (path.extname(req.file.name).toLowerCase() === '.png') {
//         // fs.rename(tempPath, targetPath, function(err) {
//             // if (err) throw err;
//             // console.log("Upload completed!");
//         });
    // }
     // else {
    //     fs.unlink(tempPath, function () {
    //         if (err) throw err;
    //         console.error("Only .png files are allowed!");
    //     });
    // }

// })

// app.get('/getImage', function(req, res) {
// 	var name = req.query.fileName;
// 	   var img = fs.readFileSync('uploads/' + name);
// 	fs.unlink('uploads/' + name);
// 	// console.log(name.slice(0,-4));
// 	fs.unlink('uploads/' + name.slice(0,-4));
//     res.writeHead(200, {'Content-Type': 'image/png'	 });
//     res.end(img, 'binary');
// });


// viewed at http://localhost:8080
app.get('/query', function(req, res) {
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

// app.get('/image', function(req, res) {
// 		console.log(__dirname);
// 	var img = fs.readFileSync('/home/amit/Downloads/SSO-Calculation.png');
// 	fs.unlink('/home/amit/Downloads/SSO-Calculation.png');
//     res.writeHead(200, {'Content-Type': 'image/png'	 });
//     res.end(img, 'binary');
// });

// app.post('/image', function(req, res) {
// 	console.log(req);
// 	fs.writeFile('newImage', req.files, function (err) {
//   if (err) throw err;
//   console.log("It's saved");
// });
// });

app.get('/', function(req, res) {
	
    res.sendFile(path.join(__dirname + '/views/index1.html'));
    // res.redirect('/image');
});

app.get('/webshot', function(req, res){

// var renderStream = webshot('http://localhost:3000/query?fy=2020&age=25&cses=60000&thp=3000');
// var file = fs.createWriteStream('uploads/' + name, {encoding: 'binary'});
 
// renderStream.on('data', function(data) {
//   file.write(data.toString('binary'), 'binary');
// });

    var ageWs = req.query.age;
	var csesWs = req.query.cses;
	var thpWs = req.query.thp;
	var fyWs = req.query.fy;

	var queryStringWs = "query?fy=" + fyWs + "&age=" + ageWs + "&cses=" + csesWs +"&thp=" + thpWs; 	
	
	var timeS= new Date;
	var name= timeS.getTime() + ".png";

    // webshot('http://localhost:3000/query?fy=2020&age=25&cses=60000&thp=3000','uploads/' + name,function(err){
    // 	// res.write("error saving");
    // });

	// var end = Date.now() + 10000;
	// console.log(end);
	// while (Date.now() < end);

	function f1(){
		webshot('http://localhost:3000/' + queryStringWs,'uploads/' + name, webshotOptions,function(err){
    	// res.write("error saving");
    	});
	}

	function f2(){
		var img = fs.readFileSync('uploads/' + name);
    console.log('uploads/' + name);
	fs.unlink('uploads/' + name);
    res.writeHead(200, {'Content-Type': 'image/png'	 });
    res.end(img, 'binary');
	}

	f1();

	setTimeout(f2,15000);

	

});

// module.exports = router;

app.listen(3000);
