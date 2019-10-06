var http = require('http');
var url = require('url');
var router = require('./router');

function throwException(flag) {
    if (flag == 0) {
        throw '这是一个异常';
    } else {
        return flag;
    }
}

http.createServer(function(req, res) {
    var urlString = url.parse(req.url);

    if (urlString.pathname !== '/favicon.ico') {
        var pathname = urlString.pathname.replace(/\//, '');

        try {
            // router[pathname](req, res);
            var data = throwException(0);
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data.toString);
        } catch (err) {
            console.log(err);

            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });

            res.write(err.toString());
            res.end();
        }

    }

}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');