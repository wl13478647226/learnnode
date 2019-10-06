var OptPool = require('./mysql-pool');

var optPool = new OptPool();
var pool = optPool.getPool();

// 从连接池中获取一个连接
pool.getConnection(function(err, conn) {
    if (err) {
        console.log('connection err:' + err.message);
        return;
    }

    // 插入数据
    let userAddSql = 'insert into user (uname, pwd) values (?,?)';
    let userAddParam = ['wl', '1234567890'];
    conn.query(userAddSql, userAddParam, function(err, result) {
        if (err) {
            console.log('insert err:' + err.message);
            return;
        }

        console.log('insert success!');
        console.log(result);
        // conn.release(); // 释放连接进入连接池
    });

    // 查询数据
    let userQuerySql = 'select * from user';
    conn.query(userQuerySql, function(err, result, fields) {
        if (err) {
            console.log('query err:' + err.message);
            return;
        }

        console.log('first user name:' + result[0].uname);
    });

    conn.release();
});