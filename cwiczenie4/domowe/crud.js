/* eslint-disable no-restricted-syntax */
var http = require("http");
var url = require("url");
const fs = require('fs');
const Sequelize = require("sequelize")
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'lol.sqlite',
});
var exports = module.exports = {};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Model = Sequelize.Model;
class Subject extends Model {}
Subject.init({
  // attributes
  subject: {
    type: Sequelize.STRING
  },
  student: {
    type: Sequelize.STRING
  }

}, {
  sequelize,
  modelName: 'subject'
  // options
});

class Teacher extends Model {}
Teacher.init({
  // attributes
  teacher: {
    type: Sequelize.STRING
  },
  student: {
    type: Sequelize.STRING
  },
  grade: {
    type: Sequelize.STRING
  }

}, {
  sequelize,
  modelName: 'teacher'
  // options
});

sequelize.sync();

function createTableSubject(response, subject) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<table style=border: 1px solid black;>');
  response.write('<tr>');
  response.write('<th>');
  response.write(subject[0].subject);
  response.write('</th>');
  response.write('</tr>');
  for (const student of subject) {
    response.write('<tr>');
    response.write('<td>');
    response.write(student.student);
    response.write('</td>');
    response.write('</tr>');
  }
  response.write('</table>');
}

function createTableTeacher(response, teacher) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<table style=border: 1px solid black;>');
  response.write('<tr>');
  response.write('<th>');
  response.write(teacher[0].teacher);
  response.write('</th>');
  response.write('</tr>');
  for (const student of teacher) {
    response.write('<tr>');
    response.write('<td>');
    response.write(student.student);
    response.write('</td>');
    response.write('<td>');
    response.write(student.grade);
    response.write('</td>');
    response.write('</tr>');
  }
  response.write('</table>');
}

exports.addStudent = function addStudent(subject, student){
  Subject.create({ subject: subject, student: student}).then(studentid => {
    console.log("Student id :", studentid.id);
  });
}

function readSubject(name, response){
  Subject.findAll({where : {subject: name}}).then(subjects => {
    console.log("All subjects:", JSON.stringify(subjects, null, 4));
    createTableSubject(response, subjects);
    response.end();
  });

}

exports.deleteStudent = function deleteStudent(subject, student){
  Subject.destroy({
    where: {
      subject: subject,
      student: student
    }
  }).then(() => {
    console.log("Done");
  });
  return true;
}

exports.updateStudent = function updateStudent(student, newStudent){
  Subject.update({ student: newStudent }, {
    where: {
      student: student
    }
  }).then(() => {
    console.log("Done");
  });
  Teacher.update({ student: newStudent }, {
    where: {
      student: student
    }
  }).then(() => {
    console.log("Done");
  });
}

function crud(name, option, table, response){
  if(table == "SUBJECT"){
    crudSubject(name, option, response);
  }
  else if(table == "TEACHER"){
    crudTeacher(name, option, response);
  }
}

function crudSubject(name, option, response){
  if(option == "CREATE"){
    nametoken = name.split(" | ");
    addStudent(nametoken[0], nametoken[1]);
  }
  else if(option == "READ"){
    readSubject(name, response);
  }
  else if(option == "UPDATE"){
    nametoken = name.split(" | ");
    updateStudent(nametoken[0], nametoken[1]);
  }
  else if(option == "DELETE"){
    nametoken = name.split(" | ");
    deleteStudent(nametoken[0], nametoken[1]);
  }
}

exports.addGrade = function addGrade(teacher, student, grade){
  Teacher.create({ teacher: teacher, student: student, grade: grade}).then(gradeid => {
    console.log("Grade id :", gradeid.id);
  });
}

function readTeacher(teacher, response){
  Teacher.findAll({where : {teacher: teacher}}).then(teachers => {
    console.log("All grades:", JSON.stringify(teachers, null, 4));
    createTableTeacher(response, teachers);
    response.end();
  });

}

exports.deleteGrade = function deleteGrade(teacher, student, grade){
  Teacher.destroy({
    where: {
      teacher: teacher,
      student: student,
      grade: grade
    },
    limit: 1
  }).then(() => {
    console.log("Done");
  });
  return true;
}

exports.updateGrade = function updateGrade(teacher, student, grade, newGrade){
  Teacher.update({ grade: newGrade }, {
    where: {
      teacher: teacher,
      student: student,
      grade: grade
    },
    limit: 1
  }).then(() => {
    console.log("Done");
  });
}


function crudTeacher(name, option, response){
  if(option == "CREATE"){
    nametoken = name.split(" | ");
    addGrade(nametoken[0], nametoken[1], nametoken[2]);
  }
  else if(option == "READ"){
    readTeacher(name, response);
  }
  else if(option == "UPDATE"){
    nametoken = name.split(" | ");
    updateGrade(nametoken[0], nametoken[1], nametoken[2], nametoken[3]);
  }
  else if(option == "DELETE"){
    nametoken = name.split(" | ");
    deleteGrade(nametoken[0], nametoken[1], nametoken[2]);
  }
}


 




// // Find all users
// User.findAll().then(users => {
//   console.log("All users:", JSON.stringify(users, null, 4));
// });

// Create a new user
// // Delete everyone named "Jane"

// // Change everyone without a last name to "Doe"


function reload(response){
  console.log("Creating a response header")
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
        //and now we put an HTML form in the body of the answer
        console.log("Creating a response body")
        response.write('<form method="GET" action="/submit">');
        response.write('<input name="name">');
        response.write('<select name="table">');
        response.write('<option value="SUBJECT">SUBJECT</option>');
        response.write('<option value="TEACHER">TEACHER</option>');
        response.write('</select>');
        response.write('<select name="option">');
        response.write('<option value="CREATE">CREATE</option>');
        response.write('<option value="READ">READ</option>');
        response.write('<option value="UPDATE">UPDATE</option>');
        response.write('<option value="DELETE">DELETE</option>');
        response.write('</select>');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        console.log("Sending a response")
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
        var name=url_parts.query['name']; //Read the contents of the field (form) named 'name'
        var option = url_parts.query['option'];
        var table = url_parts.query['table'];
        console.log("Creating a response header")
        console.log("Creating the body of the response")
        crud(name, option, table, response); //Place given data (here: 'Hello' text) in the body of the answer
        console.log("Sending a response")
        if(option != "READ"){
          reload(response);
          response.end();
        } 
        
          
    }
    else { //Generating the form
        console.log("Creating a response header")
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Creating a repsonse header - we inform the browser that the body of the response will be HTML text
        //and now we put an HTML form in the body of the answer
        console.log("Creating a response body")
        response.write('<form method="GET" action="/submit">');
        response.write('<input name="name">');
        response.write('<select name="table">');
        response.write('<option value="SUBJECT">SUBJECT</option>');
        response.write('<option value="TEACHER">TEACHER</option>');
        response.write('</select>');
        response.write('<select name="option">');
        response.write('<option value="CREATE">CREATE</option>');
        response.write('<option value="READ">READ</option>');
        response.write('<option value="UPDATE">UPDATE</option>');
        response.write('<option value="DELETE">DELETE</option>');
        response.write('</select>');
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

