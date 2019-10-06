var fs = require('fs');

function getRecall(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });

    function recall(data) {
        res.write(data);
        res.end('');
    }

    return recall;
}

module.exports = {
    readImg: function(path, res) {
        fs.readFile(path, 'binary', function(err, file) {
            if (err) {
                console.log(err);
                res.end('文件不存在');
            } else {
                console.log('输出文件');

                res.write(file, 'binary');

                res.end();
            }
        })
    },

    readfile: function(path, recall) {
        fs.readFile(path, function(err, file) {
            if (err) {
                console.log(err);
                return;
            } else {
                recall(file);
            }
        });
    }
}