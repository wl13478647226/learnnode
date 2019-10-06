var mysql = require('mysql');

// 创建MySQL连接对象
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node',
    port: '3306'
});

// 尝试连接
connection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('connection successed!');
});

// 插入数据
let userAddSql = 'insert into user (uname, pwd) values (?,?)';
let userAddParam = ['wl', '1234567890'];
connection.query(userAddSql, userAddParam, function(err, result) {
    if (err) {
        console.log('insert err:' + err.message);
        return;
    }

    console.log('insert success!');
    console.log(result);
    /**
     * OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 2,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        }
     */
});

// 查询数据
let userQuerySql = 'select * from user';
connection.query(userQuerySql, function(err, result, fields) {
    if (err) {
        console.log('query err:' + err.message);
        return;
    }

    console.log('first user name:' + result[0].uname);
});

// 删除 -- delete
// 修改 -- update

// 关闭连接
connection.end(function(err) {
    if (err) {
        console.log(err.toString());
        return;
    }
    console.log('connection closed');
});