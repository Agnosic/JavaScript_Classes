var supertest = require("supertest");
// var chai = require("chai");
// chai.use(require('chai-json'));
// This agent refers to PORT where program is runninng.
 
var server = supertest.agent("http://localhost:3000");

describe('GET /', function() {

    // it('file to be a json file', function(done) {
    //     expect(__dirname + "/" + "data.json").to.be.a.jsonFile();
    //  });
    it('/sum/data.json', function(done) {
       server
       .get('/sum/data.json')
       .expect('Content-Type', /html/)
       .expect(200, done)
       .expect("<p>" + 6 + "</p>");
    });

    it('/diff/data.json', function(done) {
        server
        .get('/diff/data.json')
        .expect('Content-Type', /html/)
        .expect(200, done)
        .expect("<p>" + 2 + "</p>");
     });

    it('/div/data.json', function(done) {
        server
        .get('/div/data.json')
        .expect('Content-Type', /html/)
        .expect(200, done)
        .expect("<p>" + 2 + "</p>");
    });

    it('/mul/data.json', function(done) {
        server
        .get('/mul/data.json')
        .expect('Content-Type', /html/)
        .expect(200, done)
        .expect("<p>" + 8 + "</p>");
    });
});