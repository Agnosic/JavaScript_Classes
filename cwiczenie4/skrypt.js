const modul = require('./module');

const p = new modul.Operation(parseInt(process.argv[2], 10), parseInt(process.argv[3], 10));
console.log(p.sum());
