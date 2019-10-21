// 入口文件

const express = require('express');

// 创建APP对象（类似于创建一个server对象）
let app = express();

// 注册路由
// 通过中间件监听指定路由的请求
app.get('/index', function(req, res) {
    res.send('Hello World');
});

app.get('/', function(req, res) {
    res.send('Index');
});

app.post('/', function(req, res) {
    res.send('Post');
});

// 请求路径以/index开头，并且接受任何方法（post/get/put/delete...）
app.use('/index', function(req, res) {
    res.send('use');
});

// 请求路径pathname必须严格等于（===） /index, 但请求方法不限
app.all('/index', function(req, res) {
    res.send('all');
});

// 启动服务
app.listen(8080, function() {
    console.log('http://localhost:8080');
})