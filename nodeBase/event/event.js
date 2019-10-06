var http = require('http');

var UserBean = require('./UserBean');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });

    if (req.url !== '/favicon.ico') {
        user = new UserBean();

        // 注册监听
        user.eventEmit.once('zhuceSuc', function(uname, pwd) {
            res.write('注册成功');
            console.log('user name:' + uname);
            console.log('password:' + pwd);

            user.login(req, res);
            res.end();
        });

        user.zhuce(req, res);
    }
}).listen(8080);

console.log('Server runnung at http://127.0.0.1:8080');