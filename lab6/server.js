var http = require ("http");
var url = require ("url");
var fs = require ("fs");
var qs = require("querystring");
var file = 'form.html';
  
http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url_parts = url.parse (request.url, true);  // parsing (relative) URL
    if (url_parts.pathname == '/submit' && request.method == 'POST') { // Processing the form content, if the relative URL is '/ submit'
    console.log('submit');
      var body='';
            request.on('data', function (data) {
                body +=data;
            });
            request.on('end',function(){
                var POST =  qs.parse(body);
                var powitanie = 'Witaj ' + POST['imie'];
                response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"}); 
                response.write(powitanie); 
                response.end(); 
                console.log("Serwer wysłał do przeglądarki tekst: '"+powitanie+"'");
            }); 
    }
    else if (url_parts.pathname == '/submit') {  // Processing the form content, if the relative URL is '/ submit'
      var welcome = "Witaj " + url_parts.query['imie'];
      console.log("imie: " + url_parts.query['imie'])
      response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"}); 
      response.write(welcome); // Data (response) that we want to send to a web browser
      response.end(); // Sending the answer
      console.log("The server sent the '"+welcome+"' text to the browser"); 
    }
    else { // Sending, to the browser, the contents of a file (an HTML document) with the name contained in the variable 'file'
        fs.stat(file, function (err,stats) {
          if (err == null) { // If the file exists
              fs.readFile (file, function (err, data) { // Read it content
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.write(data);   // Send the content to the web browser
                response.end();
              });
          }
          else { // If the file does not exists
              response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
              response.write('The ' + file + ' file does not exist');
              response.end();
          } //else
        }); //fs.stat
    } //else
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");