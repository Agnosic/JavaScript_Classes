const expect = require('chai').expect;
const fs = require('fs');


function check(file) {
  if (file.isFile()) {
    console.log("It's a file");
    //const buffer = fs.readFileSync(path);
    //console.log(buffer.toString());
    return "It's a file";
  } if (file.isDirectory()) {
    console.log("It's a directory");
    return "It's a directory";
  }
  console.log("It's not a file nor a directory");
  return "It's not a file nor a directory";
}

describe('The check(file) method', function() {
  it('Returns "Its a directory" for ./test', function() {
    let path = "./test";
    let file = fs.statSync(path);
    expect(check(file)).to.equal("It's a directory");
  });
  it('Returns "Its a file" for ./skrypt.js', function() {
    let path = "skrypt.js";
    let file = fs.statSync(path);
    expect(check(file)).to.equal("It's a file");
  });
});
