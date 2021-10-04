var fs = require('fs');
// Synchronous Read
var data = fs.readFileSync('test.txt');
console.log("Synchronous read: " + data.toString());
console.log("Program Ended");
