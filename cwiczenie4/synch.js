const fs = require('fs');

const path = process.argv[2];
const file = fs.statSync(path);

// eslint-disable-next-line no-shadow
function check(file) {
  if (file.isFile()) {
    console.log("It's a file");
    const buffer = fs.readFileSync(path);
    console.log(buffer.toString());
    return "It's a file";
  } if (file.isDirectory()) {
    console.log("It's a directory");
    return "It's a directory";
  }
  console.log("It's not a file nor a directory");
  return "It's not a file nor a directory";
}

check(file);
