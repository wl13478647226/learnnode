// 创建router对象（router 对象既是一个对象，也是一个函数）
const express = require('express');
let router = express.Router();
let handler = require('./handler.js');
const path = require('path');

// 通过router对象挂载路由
router.get('/index', handler.index);

router.get('/', handler.getData);

router.post('/', handler.postData);

// 设置静态资源路由
router.use('/public', express.static(path.join(__dirname, 'public')));

// 返回router对象

module.exports = router;