// 设置路由
let handler = require('./handler.js');

module.exports = function(req, res) {

    // 根据路由显示页面
    if ((req.pathname === '/' || req.pathname === '/index') && req.method === 'get') {

        handler.index(req, res);

    } else if (req.pathname === '/submit' && req.method === 'get') {
        handler.submit(req, res);
    } else if (req.pathname === '/item' && req.method === 'get') {

        handler.item(req, res);

    } else if (req.pathname === '/add' && req.method === 'get') {

        handler.addGet(req, res);

    } else if (req.pathname === '/add' && req.method === 'post') {

        handler.addPost(req, res);

    } else if (req.url.startsWith('/resources') && req.method === 'get') {
        handler.resources(req, res);
    } else {
        handler.notFound(req, res);
    }
}