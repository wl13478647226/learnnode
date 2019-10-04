var http = require('http');
var fs = require('fs');
var url = require('url');
const querystring = require('querystring');

var server = http.createServer();

var htmlDir = __dirname + '/html';

server.on('request', function(req, res) {
    var urlString = url.parse(req.url);

    switch (urlString.pathname) {
        case '/':
            // 首页
            sendData(htmlDir + '/index.html', res, req);
            break;

        case '/user':
            // 用户
            sendData(htmlDir + '/user.html', res, req);
            break;

        case '/login':
            // 登录
            sendData(htmlDir + '/login.html', res, req);
            break;

        case '/login/check':
            // 登录验证

            // console.log(req.method);
            // console.log(querystring.parse(urlString.query));

            if (req.method.toUpperCase() == "POST") {
                var str = '';
                req.on('data', function(chunk) {
                    str += chunk;
                });

                req.on('end', function() {
                    console.log(str);
                    console.log(querystring.parse(str));
                });
            }

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

function sendData(file, res, req) {
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>页面不存在</h1>');
        } else {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(data);
        }
    });
}

server.listen(8080, 'localhost');