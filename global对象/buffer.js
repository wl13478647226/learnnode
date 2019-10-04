// 创建Buffer对象，并为这个对象分配大小
// 当我们为一个Buffer对象分配空间大小以后，其长度是固定的，不可以更改
// var bf = new Buffer(5);

// console.log(bf); // <Buffer 00 00 00 00 00>

// bf[0] = 1;
// bf[6] = 2;

// console.log(bf); // <Buffer 01 00 00 00 00>

// var bf = new Buffer([1, 2, 3]);

// console.log(bf); //<Buffer 01 02 03>

// var bf1 = new Buffer('123', 'utf-8');

// console.log(bf1); // <Buffer 31 32 33>
// console.log(bf1[1]); // 50
// console.log(bf1[1].toString(16)); // 32
// console.log(String.fromCharCode(bf1[1])); // 2

// var str1 = new Buffer('hank');
// var str2 = new Buffer('你好');

// console.log(str1.length); // 4
// console.log(str2.length); // 6

// var str = '你好';
// console.log(str.length); // 2

// var buf = new Buffer('123');
// console.log(buf.toString('utf-8', 1)); // 23
// console.log(buf.toJSON()); // { type: 'Buffer', data: [ 49, 50, 51 ] }  此时数据是二进制

// var list = [new Buffer('123'), new Buffer('456')];
// var newbuf = Buffer.concat(list);
// console.log(newbuf); // <Buffer 31 32 33 34 35 36>

var buf = Buffer.from('123');
console.log(buf);