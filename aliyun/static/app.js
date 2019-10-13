const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

http.createServer(function(request, response) {
    // 获取请求路径
    var requestUrl = url.parse(request.url).pathname;

    // 设置静态资源路径
    var staticPath = path.join(__dirname, 'public');

    // 拼接请求静态资源文件路径
    var staticFileName = path.join(staticPath, requestUrl);

    function readFileCallback(err, data) {
        if (err) {
            response.end('文件不存在 404');
        } else {
            response.write(data); // 此时data是Buffer（二进制字节数组）
            response.end();
        }
    }

    // 根据文件后缀设置Content-Type
    // var isStatic = requestUrl.lastIndexOf(".")
    // if (isStatic < 0) {
    //     response.setHeader('Content-Type', 'text/html; charset=utf-8');
    // } else {
    //     var suffix = requestUrl.substring(isStatic + 1);
    //     if (suffix === 'css') {
    //         response.setHeader('Content-Type', 'text/css; charset=utf-8');
    //     } else if (suffix === 'js') {
    //         response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    //     } else if (suffix === 'jpg' || suffix === 'jpeg') {
    //         response.setHeader('Content-Type', 'image/jpeg; charset=utf-8');
    //     } else if (suffix === 'png') {
    //         response.setHeader('Content-Type', 'image/png; charset=utf-8');
    //     } else if (suffix === 'gif') {
    //         response.setHeader('Content-Type', 'image/gif; charset=utf-8');
    //     }
    // }

    // 根据插件mime设置Content-Type
    response.setHeader('Content-Type', mime.getType(staticFileName));

    fs.readFile(staticFileName, readFileCallback);

}).listen(8080, function() {
    console.log('服务已启动，请访问：http://localhost:8080');
});