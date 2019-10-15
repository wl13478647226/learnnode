const http = require('http');

http.createServer(function(request, response) {

    // console.log(request.headers);  // 返回请求报文头对象
    // { 
    //     host: 'localhost:8080',
    //     connection: 'keep-alive',
    //     'upgrade-insecure-requests': '1',
    //     'user-agent':
    //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
    //     'sec-fetch-mode': 'navigate',
    //     accept:
    //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    //     'sec-fetch-site': 'none',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    // }

    // console.log(request.rawHeaders);     // 返回请求报文头数组，奇数行是键，偶数行是值
    // [ 
    //     'Host',
    //     'localhost:8080',
    //     'Connection',
    //     'keep-alive',
    //     'Cache-Control',
    //     'max-age=0',
    //     'Upgrade-Insecure-Requests',
    //     '1',
    //     'User-Agent',
    //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
    //     'Sec-Fetch-Mode',
    //     'navigate',
    //     'Sec-Fetch-User',
    //     '?1',
    //     'Accept',
    //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    //     'Sec-Fetch-Site',
    //     'none',
    //     'Accept-Encoding',
    //     'gzip, deflate, br',
    //     'Accept-Language',
    //     'zh-CN,zh;q=0.9,en;q=0.8' 
    // ]

    // console.log(request.httpVersion); // 获取请求客户端的HTTP版本号
    // 1.1

    // console.log(request.method);
    // GET
    // console.log(request.url);
    // /

    response.statusCode = 200;
    response.statusMessage = 'success';

    response.setHeader('content-type', 'text/html; charset=utf-8');

    response.writeHead(404, 'not found', {
        'Content-type': 'text/html; charset=utf-8'
    });

    response.write('123');

    // response.setHeader('content-type', 'text/html; charset=utf-8');
    // 此时系统会默认设置响应报文头，与刚设置的响应报文头重复，报错

    response.end('over');
}).listen(8080, function() {
    console.log('http://localhost:8080');
})