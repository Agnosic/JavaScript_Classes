var http = require("http");
var url = require("url");
const fs = require('fs');
var chai = require("chai");
var expect = chai.expect;
const Sequelize = require("sequelize")
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'lol.sqlite',
});
var crud = require("../crud");

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
console.log(2)
  
describe('The addStudent() method', function() {
  it('Returns true for contains new student', function() {
    crud.addStudent("lol", "moze");
    Subject.count({where : {subject: "lol", student: "moze"}}).then(count => {
      expect(count).to.not.equal(0);
    });
  });
  
});
describe('The deleteStudent() method', function() {
  it('Returns true for not containing new student', function() {
    crud.addStudent("lol", "moxxre");
    let value = crud.deleteStudent("lol","moxxre");
    expect(value).to.equal(true);
  });
  
});
describe('The updateStudent() method', function() {
  it('Returns true for contains updated student', function() {
    crud.addStudent("lol", "mozze");
    crud.updateStudent("mozze", "das");
    Subject.count({where : {subject: "lol", student: "das"}}).then(count => {
      expect(count).to.not.equal(0);
    });
  });
  
 });
 describe('The addGrade() method', function() {
  it('Returns true for contains new grade', function() {
    crud.addGrade("Donald", "Jna", "3");
    Teacher.count({where : {teacher: "Donald", student: "Jna", grade: "3"}}).then(count => {
      expect(count).to.not.equal(0);
    });
  });
  
});
describe('The deleteStudent() method', function() {
  it('Returns true for not containing new grade', function() {
    crud.addGrade("Donald", "Jnaa", "3");
    let value = crud.deleteGrade("Donald", "Jnaa", "3");
    expect(value).to.equal(true);
  });
  
});
describe('The updateStudent() method', function() {
  it('Returns true for contains updated grade', function() {
    crud.addGrade("Donald", "Jnxa", "3");
    crud.updateGrade("Donald", "Jnxa", "3", "4");
    Teacher.count({where : {teacher: "Donald", student: "Jnxa", grade: "4"}}).then(count => {
      expect(count).to.not.equal(0);
    });
  });
  
 });

// crud.addStudent("lol", "moze");
// crud.readSubject("lol");