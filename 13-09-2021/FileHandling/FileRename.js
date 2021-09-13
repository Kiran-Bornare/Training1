var fs = require('fs');
fs.rename('demo1.txt', 'demo.txt', function (err) {
if (err) throw err;
console.log('File Renamed!');
});