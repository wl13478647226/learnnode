// 搭建HTTP服务器，需要HTTP模块

var http = require('http');

// 通过http模块下的createServer方法创建web服务器对象
var server = http.createServer();

// 监听错误
server.on('error', function(err) {
    console.log(err);
});
// 正常监听状态
server.on('listening', function() {
    console.log('listening...');
});

// 监听请求事件
server.on('request', function(req, res) {
    console.log('有客户端请求！');
    console.log(req.headers);

    // 写入头部信息
    res.setHeader('wl', 'nice');

    res.writeHead(200, 'wl', {
        'content-type': 'text/plain;chartset=utf-8',
    });

    // 写入主体信息
    res.write('<h1>hello world</h1>');

    // 结束
    res.end();
});

server.listen(8080, 'localhost', function() {

});

console.log(server.address()); // { address: '::', family: 'IPv6', port: 56472 }