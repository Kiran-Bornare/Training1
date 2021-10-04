var fs = require('fs');
fs.appendFile('test.txt', 'Hello Node JS!', function (err) {
if (err) throw err;
console.log('File Content Updated!');
});