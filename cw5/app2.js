// Application using the 'Pug' template systemlikacja z wykorzystaniem systemu szablonów 'Pug'
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;
 
function sum(x, y){
    return x + y;
}

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          //Use the 'Pug' template system
 
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack - every request will be logged in the console in the 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory
 

app.get('/add/:x/:y', (req, res) => {
    res.render('index', {pretty:true}, function(err, html){
        let x1 = parseInt(req.params.x);
        let y1 = parseInt(req.params.y);
        res.send('<p>' + x1 + ' + ' + y1 + ' = ' + sum(x1, y1) + '</p>');
    }); //
});

app.get('/add', (req, res) => {
    res.render('index', {pretty:true}, function(err, html){
        res.send('<p>' + x + ' + ' + y + ' = ' + sum(x, y) + '</p>');
    }); //
});



// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', {pretty:true}, function(err, html){
        res.send('<p>' + x + ' + ' + y + ' = ' + sum(x, y) + '</p>');
    }); // Render the 'index' view in 'pretty' mode - the resulting HTML code will be indented - the 'pretty' option has the 'deprecated' status - in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});
 
// The application is to listen on port number 3000
app.listen(3000, function () {                  
    console.log('The application is available on port 3000');
});

