const fs = require('fs');
const path = require('path');

var filename = path.join(__dirname, 'abc/abc.txt');

// fs.writeFile(filename, '大家好', 'utf8', function(err) {
//     if (err) {
//         console.log(err.name); // Error
//         console.log(err.message); // ENOENT: no such file or directory, open 'c:\wamp64\www\learnnode\aliyun\exception\abc\abc.txt'
//         console.log(err.code); // ENOENT
//         throw err;
//     }
//     console.log('ok');
// })

try {
    fs.writeFile(filename, '大家好666', 'utf8', function(err) {
        console.log('ok');
    });
} catch (e) {
    console.log('出错了');
}