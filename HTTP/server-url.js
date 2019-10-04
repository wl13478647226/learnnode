var http = require('http');
var server = http.createServer();

const url = require('url');

var urlstr = url.parse('http://www.baidu.com:8080/a/index.html?b=2#p=1');
console.log(urlstr);
/**
 * Url {
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'www.baidu.com:8080',
        port: '8080',
        hostname: 'www.baidu.com',
        hash: '#p=1',
        search: '?b=2',
        query: 'b=2',
        pathname: '/a/index.html',
        path: '/a/index.html?b=2',
        href: 'http://www.baidu.com:8080/a/index.html?b=2#p=1' 
    }
 */

server.on('request', function(req, res) {
    var urlString = url.parse(req.url);

    // console.log(urlString);
    /**
     *  Url {
            protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: null,
            query: null,
            pathname: '/',
            path: '/',
            href: '/' 
        }
     */

    switch (urlString.pathname) {
        case '/':
            // 首页
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end('<h1>首页</h1>');
            break;

        case '/user':
            // 用户
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>用户</h1>');
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

server.listen(8080, 'localhost');