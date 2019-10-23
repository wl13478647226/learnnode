const express = require('express');
const path = require('path');
let config = require('./config.js');
let router = require('./router.js');

// 创建APP对象（类似于创建一个server对象）
let app = express();

// 注册路由
app.use(router);

// 启动服务
app.listen(config.port, function() {
    console.log('http://localhost:' + config.port);
})