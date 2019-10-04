var fs = require('fs');

// fs.open('./FileSystem/1.txt', 'r', function(err, fd) {
//     console.log(err);
//     /**
//      * { [Error: ENOENT: no such file or directory, open 'c:\wamp64\www\learnnode\1.txt']
//         errno: -4058,
//         code: 'ENOENT',
//         syscall: 'open',
//         path: 'c:\\wamp64\\www\\learnnode\\1.txt' 
//         }
//      */
//     if (err) {
//         console.log('打开文件失败！');
//     }
//     console.log(fd); // 3
// });

// var fd = fs.openSync('./FileSystem/1.txt', 'r');

// console.log(fd); // 3

// fs.open('./FileSystem/1.txt', 'r', function(err, fd) {

//     if (err) {
//         console.log('打开文件失败！');
//     } else {
//         var buf = new Buffer(10);
//         console.log(buf);
//         fs.read(fd, buf, 2, 4, 1, function(err, bytesRead, buffer) {
//             console.log(buf);
//             console.log(err); // null
//             console.log(bytesRead); // 4
//             console.log(buffer);
//         });
//     }
// });

// fs.open('./FileSystem/1.txt', 'r+', function(err, fd) {

//     if (err) {
//         console.log('打开文件失败！');
//     } else {
//         var buf = Buffer.from('123');

//         fs.write(fd, buf, 0, 3, 2, function(err, bytesWritten, buffer) {
//             console.log(bytesWritten); // 3
//         })
//     }
// });

// fs.open('./FileSystem/1.txt', 'r+', function(err, fd) {

//     if (err) {
//         console.log('打开文件失败！');
//     } else {

//         fs.write(fd, '123', 0, function(err, written, buffer) {
//             console.log(written); // 3
//         })

//         fs.close(fd, function() {
//             console.log('文件关闭');
//         })
//     }
// });

// fs.writeFile('./FileSystem/2.txt', '123', function(err) {
//     console.log(err); // null
// });

// fs.appendFile('./FileSystem/2.txt', 'hello', function(err) {
//     console.log(err); // null
// });

// fs.stat('./FileSystem/2.txt', function(err, stats) {
//     console.log(err);
//     console.log(stats);
// });


// 异步模式
// fs.exists('./FileSystem/3.txt', function(isExists) {
//     if (!isExists) {
//         fs.writeFile('./FileSystem/3.txt', 'hello', function(err) {
//             if (err) {
//                 console.log('出错');
//             } else {
//                 console.log('创建新文件成功');
//             }
//         })
//     } else {
//         fs.appendFile('./FileSystem/3.txt', '123', function(err) {
//             if (err) {
//                 console.log('追加新内容失败');
//             } else {
//                 console.log('追加新内容成功');
//             }
//         })
//     }
// });

// // 同步模式
// if (!fs.existsSync('./FileSystem/4.txt')) {
//     if (fs.writeFileSync('./FileSystem/4.txt', '434543') === undefined) {
//         console.log('创建新文件成功');
//     } else {
//         console.log('出错');
//     }
// } else {
//     fs.appendFileSync('./FileSystem/4.txt', 'dsdfgserf');
//     console.log('追加新内容成功');
// }

// fs.readFile('./FileSystem/4.txt', function(err, data) {
//     if (err) {
//         console.log('读取文件失败');
//     } else {
//         console.log(data.toString());
//     }
// });

// fs.unlink('./FileSystem/4.txt', function(err) {
//     if (err) {
//         console.log('删除失败');
//     } else {
//         console.log('删除成功');
//     }
// })

// fs.rename('./FileSystem/3.txt', './FileSystem/4.txt', function(err) {
//     if (err) {
//         console.log('重命名失败');
//     } else {
//         console.log('重命名成功');
//     }
// })

// fs.stat('./FileSystem/4.txt', function(err, stats) {
//     if (err) {
//         console.log('读取信息失败');
//     } else {
//         console.log(stats);
//     }
// });

// fs.watch('./FileSystem/4.txt', function(event, filename) {
//     console.log(event);
//     if (filename) {
//         console.log(filename + '发生了改变');
//     }
// });

// fs.mkdir('./FileSystem/dir', function(err) {
//     console.log(err); // null
// });

// fs.rmdir('./FileSystem/dir', function(err) {
//     console.log(err); // null
// });

fs.readdir('./FileSystem', function(err, filelist) {
    if (!err) {
        console.log(filelist); // [ '1.txt', '2.txt', '4.txt', 'fs.js' ]
        filelist.forEach(function(file) {

            fs.stat('./FileSystem/' + file, function(err, stats) {
                if (!err) {
                    switch (stats.mode) {
                        case 33206:
                            console.log('这是文件');
                            break;
                        case 16822:
                            console.loh('这是文件夹');
                            break;
                    }
                }
            });
        });
    }
})