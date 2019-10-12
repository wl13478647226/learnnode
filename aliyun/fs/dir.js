// console.log(__dirname);
// console.log(__filename);

const fs = require('fs');

var dir = __filename + '\\';

fs.readFile(dir + 'hello.text', function(err, data) {
    if (err) {
        console.log("err name:" + err.name + ", err message:" + "err.message");
    } else {
        console.log(data); // data 为Buffer类型（字节数组）
        // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 2c 20 21 21 21>

        console.log(data.toString('utf8')); // 默认编码也是utf8
        // Hello World, !!!
    }
})