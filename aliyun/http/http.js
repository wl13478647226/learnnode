const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// 创建HTTP服务对象
// var server = http.createServer();

// // 监听用户请求事件（request事件）
// server.on('request', function(request, response) {
//     console.log(request.path);

//     response.setHeader('Content-Type', 'text/plain; charset=utf-8');
//     response.write('hello');

//     response.end();
// });

// // 启动服务，监听端口
// server.listen(8080, function() {
//     console.log('服务已启动，请访问：http://localhost:8080');
// })



http.createServer(function(request, response) {

    var requestUrl = url.parse(request.url);

    function readFileCallback(err, data) {
        if (err) {
            console.log('err name:' + err.name);
            response.end();
        } else {
            response.write(data); // 此时data是Buffer（二进制字节数组）
            response.end();
        }
    }

    if (requestUrl.pathname === '/login') {
        var filename = path.join(__dirname, 'login.html');
        response.setHeader('Content-Type', 'text/html; charset=utf-8');

        fs.readFile(filename, readFileCallback);
    } else if (requestUrl.pathname === '/03.jpg') {
        var filename = path.join(__dirname, '03.jpg');
        response.setHeader('Content-Type', 'image/jpeg; charset=utf-8');

        fs.readFile(filename, readFileCallback);
    } else if (requestUrl.pathname === '/login.css') {
        var filename = path.join(__dirname, 'login.css');
        response.setHeader('Content-Type', 'text/css; charset=utf-8');

        fs.readFile(filename, readFileCallback);
    }

}).listen(8080, function() {
    console.log('服务已启动，请访问：http://localhost:8080');
});