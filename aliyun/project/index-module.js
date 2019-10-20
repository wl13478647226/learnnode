// 模块一：负责启动服务
// 模块二：负责扩展req 和 res 对象
// 模块三：路由判断
// 模块四：业务模块--处理具体路由
// 模块五：数据操作--数据库操作
// 模块六：配置信息

// 加载http模块
const http = require('http');
let context = require('./modules/context.js');
let router = require('./modules/router.js');
let config = require('./modules/config.js'); // json文件不需要配置module.exports


http.createServer(function(req, res) {

    // 调用context模块，并将req, res参数传入模块
    context(req, res);

    // 调用路由
    router(req, res);


}).listen(config.port, function() {
    console.log('http://localhost:' + config.port);
});