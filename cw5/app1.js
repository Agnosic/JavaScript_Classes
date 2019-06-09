// No use of the template system
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;

function sum(x, y){
    return x + y;
}
 
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack - each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory
 

app.get('/add/:x/:y', (req, res) => {
    let x1 = parseInt(req.params.x);
    let y1 = parseInt(req.params.y);
    res.send('<p>' + x1 + ' + ' + y1 + ' = ' + sum(x1, y1) + '</p>');
});

app.get('/add', (req, res) => {
    res.send('<p>' + x + ' + ' + y + ' = ' + sum(x, y) + '</p>');
});



// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send('<p>' + x + ' + ' + y + ' = ' + sum(x, y) + '</p>'); // Send a response to the browser
}

)
 
// The application is to listen on port number 3000
app.listen(3000, function () {           
    console.log('The application is available on port 3000');
});