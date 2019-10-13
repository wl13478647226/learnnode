// 文件操作

const fs = require('fs');

// 文件写入

// var msg = "Hello World, !!!";
// fs.writeFile('./hello.text', msg, function(err) {
//     // err === null -> 写文件成功
//     if (err) {
//         console.log("err name:" + err.name + ", err message:" + "err.message");
//     } else {
//         console.log("写入成功！！")
//     }
// })

// 文件读取

// fs.readFile('./hello.text', function(err, data) {
//     if (err) {
//         console.log("err name:" + err.name + ", err message:" + "err.message");
//     } else {
//         console.log(data); // data 为Buffer类型（字节数组）
//         // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 2c 20 21 21 21>

//         console.log(data.toString('utf8')); // 默认编码也是utf8
//         // Hello World, !!!
//     }
// })

// 创建目录
var path = require('path');
var dirpath = path.join(__dirname, 'test');

fs.mkdir(dirpath, function(err) {
    if (err) {
        console.log("err name:" + err.name + ", err message:" + "err.message");
    } else {
        console.log('创建目录成功');
    }
})