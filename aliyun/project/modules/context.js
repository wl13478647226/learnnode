// 扩展request对象和response对象

// 1、request.query：获取get提交的query值
// 2、request.pathname: 获取请求pathname
// 3、request.method: 获取请求method
// 4、response.render: 服务端模板渲染

const url = require('url');
const _ = require('underscore'); // 模板引擎 （工具函数库，可以用在服务器端和浏览器端）
const fs = require('fs');
const mime = require('mime');

// 通过对外暴露函数，将request和response以参数的形式传入本模块
module.exports = function(request, response) {
    // 1、request.query：获取get提交的query值
    let urlObj = url.parse(request.url.toLowerCase(), true)
    request.query = urlObj.query;

    // 2、request.pathname: 获取请求pathname
    request.pathname = urlObj.pathname;

    // 3、request.method: 获取请求method
    request.method = request.method.toLowerCase();

    // 4、response.render: 服务端模板渲染
    // 读取并使用数据渲染模板文件
    response.render = function(filePath, tplData) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                response.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                response.end('404, not found');
                return;
            }

            if (tplData) {
                // 如果传递了模板函数，就进行模板替换
                data = _.template(data.toString('utf8'))(tplData);
            }

            response.setHeader('content-type', mime.getType(filePath));
            response.end(data);
        });
    }
}