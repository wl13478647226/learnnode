// 业务逻辑

const fs = require('fs');
const path = require('path');
const querystring = require('querystring'); // 解析和格式化 URL 查询字符串
let config = require('./config.js');

module.exports = {
    'index': function(req, res) {
        // 读取data.json文件， 转为list数组
        readNewsData(function(list_news) {
            // 读取index.html文件
            let filePath = path.join(config.viewPath, 'index.html');

            // 在服务器端使用模板引擎，将list中的数据与index文件结合
            res.render(filePath, { list: list_news });
        });
    },
    'submit': function(req, res) {
        // 读取submit.html文件
        let filePath = path.join(config.viewPath, 'submit.html');
        res.render(filePath);
    },
    'item': function(req, res) {
        // 获取新闻id
        let news_id = req.query.id;

        // 根据id读取data.json文件
        readNewsData(function(list) {
            let currentnews = list.filter(function(item) {
                return Number(item.id) === Number(news_id);
            });

            if (currentnews.length > 0) {
                // 使用模板引擎渲染
                let filePath = path.join(config.viewPath, 'details.html');
                res.render(filePath, { news: currentnews });
            } else {
                res.end('No Such Item');
            }
        });
    },
    'addGet': function(req, res) {
        // 读取文件中的数据，然后追加新提交的数据
        readNewsData(function(list) {
            // 为新闻添加id属性
            req.query.id = list.length;

            list.push(req.query);

            // 把数据写入到json文件
            writeNewsData(list, function() {
                // 设置响应报文头，重定向
                res.writeHead(302, 'Found', {
                    'Content-Type': 'text/html;charset=utf-8',
                    'Location': '/'
                });
                res.end('保存数据成功');
            });

        });
    },
    'addPost': function(req, res) {
        // 读取文件中的数据，然后追加新提交的数据
        readNewsData(function(list) {
            // 读取post提交的数据
            postBodyData(req, function(postObject) {
                // 为新闻添加id属性
                postObject.id = list.length;

                list.push(postObject);

                // 把数据写入到json文件
                writeNewsData(list, function() {
                    // 设置响应报文头，重定向
                    res.writeHead(302, 'Found', {
                        'Content-Type': 'text/html;charset=utf-8',
                        'Location': '/'
                    });
                    res.end('保存数据成功');
                });
            });

        });
    },
    'resources': function(req, res) {
        // 读取静态资源  -- 以'/resources'开头，请求静态资源

        let staticFilePath = path.join(__dirname, '../', req.pathname);

        res.render(staticFilePath);
    },
    'notFound': function(req, res) {
        // 404文件
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end('404, Page Not Found.');
    },
}

// 封装读取data.json的函数
function readNewsData(callback) {
    // 异步操作的返回值通过回调函数获取
    fs.readFile(config.dataPath, 'utf8', function(err, data) {
        // 第一次访问时，data.json文件不存在，而不是读取文件异常, 只有读取异常时才会抛出异常
        if (err && err.code !== 'ENOENT') {
            throw err;
        }

        // 没有读取到数据时--（data.json文件不存在） data === undefined
        // console.log(data);  // undefined
        let list = JSON.parse(data || '[]');

        // 通过回调函数callback，将读取到的数据传递出去
        callback(list);
    });
}

// 封装写入data.json的函数
function writeNewsData(list, callback) {
    fs.writeFile(config.dataPath, JSON.stringify(list), function(err) {
        if (err) {
            throw err;
        }

        // 写入数据完毕后的操作
        callback();
    });
}

// 封装获取post提交数据的方法
function postBodyData(req, callback) {
    // post提交数据，数据量大时，会分多次提交
    // 每次提交数据会触发req data事件，当数据提交完毕时会触发req end事件
    let array = []; // 保存被提交数据
    req.on('data', function(chunk) {
        // chunk -- Buffer对象，为本次提交的数据
        array.push(chunk);
    });

    req.on('end', function() {
        // 将array中的多个Buffer转换为一个Buffer对象
        let postBuffer = Buffer.concat(array);
        // 转字符串
        let postStr = postBuffer.toString('utf8');
        // 查询字符串转对象
        let postObject = querystring.parse(postStr);


        // 将post数据传递出去
        callback(postObject);

    });
}