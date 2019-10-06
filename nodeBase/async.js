const async = require('async');

function exec() {
    // 串行无关联
    async.series({
            one: function(done) {
                done(null, 'one完毕');
                //done('null', 'one完毕'); // 当第一个参数不是null时，以下代码将不会执行，直接跳入回调函数中
            },
            two: function(done) {
                let i = 0;
                setInterval(function() {
                    console.log(123);
                    i++;
                    if (i >= 3) {
                        clearInterval(this);
                        done(null, 'two完毕'); // 只有done函数被调用时，two函数才会被认为执行结束，才可以继续向下执行
                    }
                }, 1000);

            }
        },
        function(err, result) { // 回调函数，参数为错误、执行结果，分别对应done函数的第一个参数、第二个参数
            console.log(err);
            console.log(result);
        }
    )
}
// exec();
/**
 * null
{ one: 'one完毕', two: 'two完毕' }
主进程执行完毕！
 */
/**
 * null
{ one: 'one完毕' }
主进程执行完毕！
 */

function exec2() {
    // 并行无关联
    async.parallel({
            one: function(done) {
                console.log(345);
                let i = 0;
                //done(null, 'one完毕');
                // done('null', 'one完毕'); // 当第一个参数不是null时，以下代码将不会执行，直接跳入回调函数中
                setInterval(function() {
                    console.log(456);
                    i++;
                    if (i >= 3) {
                        clearInterval(this);
                        done('null', 'one完毕'); // 只有done函数被调用时，two函数才会被认为执行结束，才可以继续向下执行
                    }
                }, 1000);
            },
            two: function(done) {
                let i = 0;
                setInterval(function() {
                    console.log(123);
                    i++;
                    if (i >= 3) {
                        clearInterval(this);
                        done(null, 'two完毕'); // 只有done函数被调用时，two函数才会被认为执行结束，才可以继续向下执行
                    }
                }, 1000);

            }
        },
        function(err, result) { // 回调函数，参数为错误、执行结果，分别对应done函数的第一个参数、第二个参数
            console.log(err);
            console.log(result);
        }
    )
}
// exec2();
/**
 * 345
主进程执行完毕！
456
123
456
123
456
null
{ one: 'one完毕' }
123
 */

function exec3() {
    // 串行有关联
    async.waterfall(
        [
            function one(done) {
                console.log(345);
                let i = 0;
                //done(null, 'one完毕');
                // done('null', 'one完毕'); 
                setInterval(function() {
                    console.log(456);
                    i++;
                    if (i >= 3) {
                        clearInterval(this);
                        done(null, 'one完毕');
                    }
                }, 1000);
            },
            function two(prevalue, done) {
                let i = 0;
                setInterval(function() {
                    console.log(123);
                    i++;
                    if (i >= 3) {
                        clearInterval(this);
                        done(null, prevalue + ':two完毕');
                    }
                }, 1000);

            }
        ],
        function(err, result) {
            console.log(err);
            console.log(result);
        }
    )
}
exec3();
/**
 * 345
主进程执行完毕！
456
456
456
123
123
123
null
one完毕:two完毕
 */
console.log('主进程执行完毕！');