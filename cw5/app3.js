// No use of the template system
var express = require('express'),
    logger = require('morgan');
var app = express();
const fs = require("fs")
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);


 
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack - each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory
 

app.get('/sum/:file', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + "/" + req.params.file);
    let data = JSON.parse(rawdata);
    console.log(data);
    res.send("<p>" + eval(data.sum) + "</p>");
});

app.get('/diff/:file', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + "/" + req.params.file);
    let data = JSON.parse(rawdata);
    console.log(data);
    res.send("<p>" + eval(data.diff) + "</p>");
});

app.get('/div/:file', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + "/" + req.params.file);
    let data = JSON.parse(rawdata);
    console.log(data);
    res.send("<p>" + eval(data.div) + "</p>");
});

app.get('/mul/:file', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + "/" + req.params.file);
    let data = JSON.parse(rawdata);
    console.log(data);
    res.send("<p>" + eval(data.mul) + "</p>");
});




// Route definitions


 
// The application is to listen on port number 3000
app.listen(3000, function () {           
    console.log('The application is available on port 3000');
});