//Source: https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
 
// This agent refers to PORT where program is runninng.
 
var server = supertest.agent("http://localhost:3000");
 
// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
});


describe('GET /add in source code', () => {
      it('1 + 2 = 3', function(done) {
            server
            .get("/add")
            .expect('Content-Type', /html/)
            .expect(200, done)
            .expect("<p>1 + 2 = 3</p>")
      });
});

describe('GET /add/:x/:y', () => {
      it('3 + 4 = 7', function(done) {
            server
            .get("/add/3/4")
            .expect('Content-Type', /html/)
            .expect(200, done)
            .expect("<p>3 + 4 = 7</p>")
      });
});