// 当前项目（包）的入口文件

// 加载http模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const urlModule = require('url');

http.createServer(function(request, response) {

    // 设计路由
    // get 请求
    // / 或 /index --> 新闻列表

    // /item --> 新闻详情

    // /submit --> 添加新闻页面

    // /add  --> 将提交的数据保存在data.json文件中

    // post 请求
    // /add  --> 将提交的数据保存在data.json文件中

    let url = request.url.toLowerCase();
    let method = request.method.toLowerCase();

    // 读取非静态文件
    function readDynamicFile(filePath) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                throw err;
            }

            response.end(data);
        });
    }

    // 读取静态文件
    function readStaticFile(filePath, url) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                response.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                response.end(data);
                return;
            }
            response.setHeader('content-type', mime.getType(url));
            response.end(data);
        });
    }

    // 将render函数挂载到response对象上， 可以通过response.render()来访问, 方便后续其他文件使用
    response.render = function(filePath, url) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                response.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                response.end(data);
                return;
            }
            response.setHeader('content-type', mime.getType(url));
            response.end(data);
        });
    }

    // 解析请求URL  urlModule.parse的第二个参数为true时 query属性值为一个对象 -- 获取get提交过来的数据
    let urlObject = urlModule.parse(request.url, true);

    // console.log(urlObject);

    // 根据路由显示页面
    if ((url === '/' || url === '/index') && method === 'get') {
        // 读取index.html文件
        let filePath = path.join(__dirname, 'views', 'index.html');
        response.setHeader('content-type', 'text/html;charset=utf-8');
        readDynamicFile(filePath);

    } else if (url === '/submit' && method === 'get') {
        // 读取submit.html文件
        let filePath = path.join(__dirname, 'views', 'submit.html');
        response.setHeader('content-type', 'text/html;charset=utf-8');
        readDynamicFile(filePath);
    } else if (url === '/item' && method === 'get') {
        // 读取item.html文件
        let filePath = path.join(__dirname, 'views', 'item.html');
        response.setHeader('content-type', 'text/html;charset=utf-8');
        readDynamicFile(filePath);
    } else if (url.startsWith('/add') && method === 'get') {
        // 读取add.html文件
        let list = [];

        // 读取文件中的数据，然后追加新提交的数据
        fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function(err, data) {
            // 第一次访问时，data.json文件不存在，而不是读取文件异常, 只有读取异常时才会抛出异常
            if (err && err.code !== 'ENOENT') {
                throw err;
            }

            // 没有读取到数据时--（data.json文件不存在） data === undefined
            // console.log(data);  // undefined
            list = JSON.parse(data || '[]');

            // 获取 get 提交的数据 使用 url模块
            // let dataTitle = urlObject.query.title;
            // let dataText = urlObject.query.text;
            // list.push(dataTitle, dataText);

            list.push(urlObject.query);

            // 把数据写入到json文件
            fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function(err) {
                if (err) {
                    response.writeHead(200, 'Save Failed', {
                        'Content-Type': 'text/html;charset=utf-8'
                    });
                    response.end('保存数据失败');
                    return;
                }

                // 设置响应报文头，重定向
                response.writeHead(302, 'Found', {
                    'Content-Type': 'text/html;charset=utf-8',
                    'Location': '/'
                });
                response.end('保存数据成功');
            });
        });



    } else if (url === '/add' && method === 'post') {
        // 读取add.html文件
    } else if (url.startsWith('/resources') && method === 'get') {
        // 读取静态资源  -- 以'/resources'开头，请求静态资源

        let staticFilePath = path.join(__dirname, url);

        readStaticFile(staticFilePath, url);
    } else {
        // 404文件
        response.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html; charset=utf-8'
        });

        response.end('404, Page Not Found.');
    }

}).listen(8080, function() {
    console.log('http://localhost:8080');
});

// 封装 文件读取
function render(filePath, response) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            throw err;
        }

        response.end(data);
    });
}