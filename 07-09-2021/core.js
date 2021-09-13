var http = require("http");
http.createServer(function (request,response) {
    response.writeHead(200 ,{'content-Type':'text/plain'});
    response.end('welcome node js \n');
}).listen(8081);
console.log('server running at http://127.0.0.1:8081/');