/* eslint-disable no-restricted-syntax */
var http = require("http");
var url = require("url");
const fs = require('fs');

var przedmioty = [];


function parseData(data, lastname) {
  const lines = data.split(/\r?\n/);
  for (const line of lines) {
    const linesplit = line.split(' ');
    if (lastname === linesplit[1]) {
      for (let j in przedmioty) {
        if (przedmioty[j].przedmiot === linesplit[2]) {
          for (let i = 3; i < linesplit.length; i++) {
            przedmioty[j].oceny.push(linesplit[i]);
          }
          return;
        }
      }
      const przedmiot = {
        przedmiot: linesplit[2],
        oceny: [linesplit[3]],
      };
      for (let i = 4; i < linesplit.length; i++) {
        przedmiot.oceny.push(linesplit[i]);
      }
      przedmioty.push(przedmiot);
    }
  }
}

function createTable(response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  for (const przedmiot of przedmioty) {
    response.write('<table style=border: 1px solid black;>');
    response.write('<tr>');
    response.write('<th>');
    response.write(przedmiot.przedmiot);
    response.write('</th>');
    response.write('</tr>');
    for (let ocena of przedmiot.oceny) {
      response.write('<tr>');
      response.write('<td>');
      response.write(ocena);
      response.write('</td>');
      response.write('</tr>');
    }
    response.write('</table>');
    response.write('<br>');
  }
}



function checkHTML(lastname, response) {
  fs.readFile('zadanie', 'utf8', (err, data) => {
    if (!err) {
      parseData(data, lastname);
      createTable(response);
    } else {
      console.log(err);
    }
    return response.end();
  });
}

function checkJSON(lastname, response) {
  fs.readFile('zadanie', 'utf8', (err, data) => {
    if (!err) {
      parseData(data, lastname);
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.write(JSON.stringify(przedmioty));
    } else {
      console.log(err);
    }
    return response.end();
  });
}

function check(lastname, listoption, response) {
  if (listoption === "HTML") {
    checkHTML(lastname, response);
  } else if (listoption === "JSON") {
    checkJSON(lastname, response);
  }
}



http.createServer(function(request, response) {
    /*
      ,,request'' - input stream - contains data received from the browser, e.g. encoded contents of HTML form fields
       
      ,,response'' - output stream - put in it data that you want to send back to the browser.
         The answer sent by this stream must consist of two parts: the header and the body.
         The header contains, among others, information about the type (MIME) of data contained in the body.
         The body contains the correct data, e.g. a form definition.
 
    */
    console.log("--------------------------------------")
    console.log("The relative URL of the current request: "+request.url+"\n")
    var url_parts = url.parse(request.url,true); //parsing (relative) URL
     
    if(url_parts.pathname == '/submit') { //Processing the form content, if the relative URL is '/ submit'
        var lastname=url_parts.query['name']; //Read the contents of the field (form) named 'name'
        var listoption = url_parts.query['list'];
        console.log("Creating a response header")
        console.log("Creating the body of the response")
        check(lastname, listoption, response); //Place given data (here: 'Hello' text) in the body of the answer
        console.log("Sending a response")
        przedmioty = [];
    }
    else { //Generating the form
        console.log("Creating a response header")
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
        //and now we put an HTML form in the body of the answer
        console.log("Creating a response body")
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="name">Give your student lastname</label>');
        response.write('<input name="name">');
        response.write('<select name="list">');
        response.write('<option value="HTML">HTML</option>');
        response.write('<option value="JSON">JSON</option>');
        response.write('</select>')
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        response.end();  //The end of the response - send it to the browser
        console.log("Sending a response")
    } 
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");


// Nazwisko studenda JSON/HTML 
// SUBMIT 

// co przedmiot to tabelka
// | Ilczuk | 5 | 3 | 2 | 1 |
// struktura obiektowa, pozniej serializacja
// DOM budowac. Tam jest juz serializer.
//Stringify

