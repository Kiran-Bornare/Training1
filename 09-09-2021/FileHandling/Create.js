var fs = require('fs');
fs.writeFile('test.txt', 'Hello Word!', function (err) {
if (err) throw err;
console.log('File Created!');
});
