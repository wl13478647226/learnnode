var http = require('http');
var router = require('./router');
var url = require('url');

http.createServer(function(req, res) {
    var urlString = url.parse(req.url);

    if (urlString.pathname !== '/favicon.ico') {
        var pathname = urlString.pathname.replace(/\//, '');

        router[pathname](req, res);
    }

}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');