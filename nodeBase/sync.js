var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();

var htmlDir = __dirname + '/html';

server.on('request', function(req, res) {
    var urlString = url.parse(req.url);

    function callback(req, res) {
        res.writeHead(200, {
            'content-type': 'text/html;charset=utf-8'
        });
        res.end(data);
    }

    switch (urlString.pathname) {
        case '/':
            // 首页
            sendData(htmlDir + '/index.html', res, req, callback);
            break;

        case '/user':
            // 用户
            sendData(htmlDir + '/user.html', res, req, callback);
            break;

        case '/login':
            // 登录
            sendData(htmlDir + '/login.html', res, req, callback);
            break;

        default:
            // 其他
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>页面不存在</h1>');
            break;
    }
});

// 异步闭包回调
function sendData(file, res, req, callback) {
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>页面不存在</h1>');
        } else {
            callback(req, res);
        }
    });
}



server.listen(8080, 'localhost');