// 业务模块
const path = require('path');

module.exports = {
    index: function(req, res) {
        // 处理index请求
        res.send('index');
    },
    getData: function(req, res) {
        // 处理get请求
        // sendFile() 不可以处理模板数据
        // res.sendFile(path.join(__dirname, 'views', 'submit.html'), function(err) {
        //     if (err) {
        //         throw err;
        //     }
        // })

        // render() 处理模板-- 默认不可以使用，需要模板引擎
        res.render(path.join(__dirname, 'views', 'submit.html'));
    },
    postData: function(req, res) {
        // 处理post请求
    }
}