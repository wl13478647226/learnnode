var fs = require('fs');

var path = './font-end-automation/resource';

fs.watch(path, function(event, file) {
    fs.readdir(path, function(err, filelist) {
        var arr = [];

        filelist.forEach(function(f) {
            var info = fs.statSync(path + '/' + f);

            if (info.mode == 33206) {
                arr.push(path + '/' + f);
            }
        })

        // 读取数组中的文件内容，并合并
        var content = '';
        arr.forEach(function(item) {
            var c = fs.readFileSync(item);
            content += c.toString() + '\n';
        });

        console.log(content);

        fs.writeFileSync('./font-end-automation/wl/js/index.js', content);
    });
});