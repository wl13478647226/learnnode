1、nodejs
    包括：  ECMAScript
            OS
            net
            database

2、NodeJs 和 JavaScript的异同
    相同点：
        ECMAScript
        语法结构、数据类型
        内置对象、方法

        var a = 100;
        console.log(a);

        var d = new Date();
        console.log(d.getFullYear());
        console.log(d.getMonth() + 1);

        var arr = [1, 2, 3];
        arr.push(4);
        console.log(arr);

        function Person(name) {
            this.name = name;
        }
        Person.prototype.run = function() {
            console.log(this.name + 'running');
        }
        var pel = new Person('leo');
        pel.run();

    不同点：顶层对象
        javascript：window
        nodejs: global

3、模块
    一个文件就是一个模块
    每个模块都有自己的作用域

    var c = 100; // c 只属于当前模块下的变量，而不属于global
    console.log(global.c); // undefined

    定义全局变量
    global.a = 200;
    console.log(global.a); // 200

4、__filename
    当前文件解析后的绝对路径
    __filename 为当前模块的局部变量

    console.log(__filename); // c:\wamp64\www\learnnode\module\模块作用域.js

5、模块加载系统
    require('模块');
    模块路径可以是绝对路径，也可以是相对路径

    require('./1.js'); // 相对路径
    require('1.js'); // 此路径加载node的核心模块，或者是node_modules内部的模块

    文件查找优先级：
        1.首先按照文件名称查找
        2.如果没有找到，则会在文件名称后加上.js后缀，继续查找
        3.如果没有找到，则会在文件名称后加上.json后缀，继续查找
        4.如果没有找到，则会在文件名称后加上.node后缀，继续查找

        文件名称 -> .js -> .json -> .node

6、访问模块中的变量
    在一个模块中通过var定义的变量，其作用域范围是当前模块，外部不能直接访问

    一个模块访问另一个模块中变量的方法：
        1.把变量定义为global对象的属性，不推荐
        2.使用模块对象 module， module是局部变量，保存当前模块的信息

    console.log(module);
    /**
    * Module {
        id: '.',
        exports: {},
        parent: null,
        filename: 'c:\\wamp64\\www\\learnnode\\module\\2.js',
        loaded: false,
        children: [],
        paths:
        [ 'c:\\wamp64\\www\\learnnode\\module\\node_modules',
        'c:\\wamp64\\www\\learnnode\\node_modules',
        'c:\\wamp64\\www\\node_modules',
        'c:\\wamp64\\node_modules',
        'c:\\node_modules' ] 
    }
    */
    module对象中的子对象exports，可以将模块中的局部变量暴露给外部访问

        module.exports.a = a;

    require() 方法的返回值是引入文件模块中的module.exports对象，通过此返回值就可以访问引入文件中的变量

        var ex = require('./2.js');
        console.log(ex.a);

    在模块作用域中，还有一个内置的模块对象--exports， 它其实就是module.exports，两者指向同一内存区域

        console.log(exports === module.exports); // true

    当exports重新赋值时，module.exports没有发生改变，require() 的返回值是module.exports的值

        exports = [1, 2, 3];
        console.log(exports);           // [ 1, 2, 3 ]
        console.log(module.exports);    // { a: 100 }

    当module.exports重新赋值时，exports没有发生改变，require() 的返回值是module.exports的值

        module.exports = [1, 2, 3];
        console.log(exports);   // { a: 100 }

    所以在使用module.exports和exports时，在两者上添加属性，不建议对其重新赋值

7、global对象
    属性： __filename: 当前文件解析后的绝对路径, 该属性不是全局变量，属于当前文件（模块）的局部作用域
          __dirname: 当前文件所在目录解析后的绝对路径, 该属性不是全局变量，属于当前文件（模块）的局部作用域

          console.log(global.__filename); // undefined
          console.log(__filename); // c:\wamp64\www\learnnode\global对象\__filename.js
          console.log(__dirname); // c:\wamp64\www\learnnode\global对象

    方法：
        setTimeout()
        setInterval()
        clearTimeout()
        clearInterval()

    对象：
        process对象
            process对象是一个全局对象，通过该对象的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制

            process.argv: 一个包含命令行参数的数组
                第一个元素是node执行程序
                第二个元素是js文件名称
                接下来的元素依次是命令行传入的参数

                console.log(process.argv);
                /**
                * [ 'C:\\Program Files\\nodejs\\node.exe',
                'c:\\wamp64\\www\\learnnode\\global对象\\process.js' ]
                */

                $ node process.js a=1 b=3
                [ 'C:\\Program Files\\nodejs\\node.exe',
                'C:\\wamp64\\www\\learnnode\\global对象\\process.js',
                'a=1',
                'b=3' ]

            process.execPath：返回启动 Node.js 进程的可执行文件的绝对路径名
                process.argv的第一个元素

            process.env: 返回环境信息

            process.version: 返回 Node.js 的版本信息

                console.log(process.version);  // v10.16.3

            process.versions: 返回一个对象，此对象列出了Node.js和其依赖的版本信息

                console.log(process.versions);
                // { http_parser: '2.8.0',
                //   node: '10.16.3',
                //   v8: '6.8.275.32-node.54',
                //   uv: '1.28.0',
                //   zlib: '1.2.11',
                //   brotli: '1.0.7',
                //   ares: '1.15.0',
                //   modules: '64',
                //   nghttp2: '1.39.2',
                //   napi: '4',
                //   openssl: '1.1.1c',
                //   icu: '64.2',
                //   unicode: '12.1',
                //   cldr: '35.1',
                //   tz: '2019a' 
                // }

            process.pid: 返回当前程序运行时进程的 PID

            process.title: 返回当前进程标题（即返回 ps 的当前值）

                console.log(process.title); // C:\WINDOWS\system32\cmd.exe

            process.exit() 退出当前程序

            process.platform: 返回字符串，标识 Node.js 进程运行其上的操作系统平台
                console.log(process.platform);  // win32

            process.cwd() 返回 Node.js 进程的当前工作目录
                console.log(process.cwd()); // c:\wamp64\www\learnnode

            process.memoryUsage()  返回 Node.js 进程的内存使用情况的对象，该对象每个属性值的单位为字节。

                console.log(process.memoryUsage());
                // { rss: 20475904,
                //     heapTotal: 6537216,
                //     heapUsed: 4051216,
                //     external: 12836 
                // }

            process.kill(pid [,signal]) 结束进程或向进程发送信息


            标准输入输出：IO操作

            process.stdin: 标准输入流

            process.stdout: 标准输出流
                function Log(data) {
                    process.stdout.write(data);
                }

                Log('hello');   // hello

                // 默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流
                process.stdin.resume();
                var a;
                var b;
                process.stdout.write('输入a值');

                // 监听用户输入数据
                process.stdin.on('data', function(chunk) {
                    if (!a) {
                        a = Number(chunk);
                        process.stdout.write('输入b值');
                    } else {
                        b = Number(chunk);
                        console.log(chunk); // 此时chunk就是Buffer
                    }
                    process.stdout.write(a + b);
                });


        Buffer类
            一个用于操作二进制数据的类
            操作文件和网络数据，就是操作二进制数据流，Buffer就是操作这些数据的全局类

            创建Buffer对象，并为这个对象分配大小
            当我们为一个Buffer对象分配空间大小以后，其长度是固定的，不可以更改
                var bf = new Buffer(5);

                console.log(bf); // <Buffer 00 00 00 00 00>

                bf[0] = 1;
                bf[6] = 2;

                console.log(bf); // <Buffer 01 00 00 00 00>

                var bf = new Buffer([1, 2, 3]);

                console.log(bf); //<Buffer 01 02 03>
                
                创建字符串Buffer，第二个参数为字符编码
                var bf1 = new Buffer('123', 'utf-8');

                console.log(bf1); // <Buffer 31 32 33>
                console.log(bf1[1]); // 50--二进制
                console.log(bf1[1].toString(16)); // 32--十六进制
                console.log(String.fromCharCode(bf1[1])); // 2

            buf.length  --指Buffer内容的字节长度，与字符串的length属性不同

                var str1 = new Buffer('hank');
                var str2 = new Buffer('你好');

                console.log(str1.length); // 4
                console.log(str2.length); // 6

                var str = '你好';
                console.log(str.length); // 2

            buf[index]  获取或设置在指定index索引位置的8位字节内容

            写入字符串
            buf.write(string[, offset[, length]][, encoding])
                根据 encoding 指定的字符编码将 string 写入到 buf 中的 offset 位置。 length 参数是要写入的字节数

            buf.toString([encoding[, start[, end]]])
                根据 encoding 指定的字符编码将 buf 解码成字符串。 传入 start 和 end 可以只解码 buf 的子集。start 和 end 指字节位置

                var buf = new Buffer('123');
                console.log(buf.toString('utf-8', 1)); // 23

            buf.toJSON()
                返回 buf 的 JSON 格式。 当字符串化 Buffer 实例时，JSON.stringify() 会调用该函数。

                var buf = new Buffer('123');
                console.log(buf.toJSON()); // { type: 'Buffer', data: [ 49, 50, 51 ] }  此时数据是二进制


            buf.slice([start[, end]])
                返回一个新的 Buffer，它引用与原始的 Buffer 相同的内存，但是由 start 和 end 索引进行偏移和裁剪。不包括结束位置

            buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
                拷贝 buf 中某个区域的数据到 target 中的某个区域，即使 target 的内存区域与 buf 的重叠。
                返回: <integer> 拷贝的字节数。

            类方法、静态方法
                Buffer.isEncoding(encoding)
                    如果 encoding 是支持的字符编码，则返回 true，否则返回 false。

                Buffer.isBuffer(obj)
                    如果 obj 是一个 Buffer，则返回 true，否则返回 false。

                Buffer.byteLength(string[, encoding])
                    返回字符串的实际字节长度。 与 String.prototype.length 不同，后者返回字符串的字符数。

                Buffer.concat(list[, totalLength])
                    list <Buffer[]> | <Uint8Array[]> 要合并的 Buffer 数组或 Uint8Array 数组。
                    totalLength <integer> 合并后 list 中的 Buffer 实例的总长度。
                    返回: <Buffer>

                    返回一个合并了 list 中所有 Buffer 实例的新 Buffer。

                    如果 list 中没有元素、或 totalLength 为 0，则返回一个长度为 0 的 Buffer。

                    如果没有提供 totalLength，则计算 list 中的 Buffer 实例的总长度。 但是这会导致执行额外的循环用于计算 totalLength，因此如果已知长度，则明确提供长度会更快。

                    如果提供了 totalLength，则会强制转换为无符号整数。 如果 list 中的 Buffer 合并后的总长度大于 totalLength，则结果会被截断到 totalLength 的长度。

                    var list = [new Buffer('123'), new Buffer('456')];
                    var newbuf = Buffer.concat(list);
                    console.log(newbuf); // <Buffer 31 32 33 34 35 36>

                Buffer.from(string[, encoding])
                    创建一个包含 string 的新 Buffer。 encoding 参数指定 string 的字符编码。

                Buffer.alloc(size[, fill[, encoding]])
                    分配一个大小为 size 字节的新 Buffer。 如果 fill 为 undefined，则用零填充 Buffer。

                    fill <string> | <Buffer> | <Uint8Array> | <integer> 用于预填充新 Buffer 的值。默认值: 0。

                Buffer.allocUnsafe(size)
                    创建一个大小为 size 字节的新 Buffer。
                    以这种方式创建的 Buffer 实例的底层内存是未初始化的。新创建的 Buffer 的内容是未知的，可能包含敏感数据。 使用 Buffer.alloc() 可以创建以零初始化的 Buffer 实例。


8、File System -- 文件系统模块
    需要使用require('fs')导入后使用
    该模块提供了操作文件的API

    方法：
        fs.open(path[, flags[, mode]], callback)
            path: 要打开的文件路径
            flags：打开文件的方式 读、写
            mode: 设置文件的模式  读、写、执行--- 4、2、1   在windows下无效
            callback：回调函数
                err: 文件打开失败的错误保存在err里面，如果成功err为null
                fd: 被打开文件的标识

            异步打开一个文件, 所有后续文件操作需要写在回到函数内


            var fs = require('fs');

            fs.open('./FileSystem/1.txt', 'r', function(err, fd) {
                console.log(err);
                /**
                * { [Error: ENOENT: no such file or directory, open 'c:\wamp64\www\learnnode\1.txt']
                    errno: -4058,
                    code: 'ENOENT',
                    syscall: 'open',
                    path: 'c:\\wamp64\\www\\learnnode\\1.txt' 
                    }
                */
                if (err) {
                    console.log('打开文件失败！');
                }
                console.log(fd); // 3
            });


        fs.openSync(path[, flags, mode])
            同步打开文件，阻塞后续代码执行

            返回表示文件描述符的整数。通过此整数对文件进行操作

            var fd = fs.openSync('./FileSystem/1.txt', 'r'); // 打开失败返回错误信息

            console.log(fd); // 3 

        fs.read(fd, buffer, offset, length, position, callback)
            从 fd 指定的文件中读取数据。

            buffer 是数据将写入的缓冲区。

            offset 是 buffer 中开始写入的偏移量。

            length 是一个整数，指定要读取的字节数。

            position 参数指定从文件中开始读取的位置。 如果 position 为 null，则从当前文件位置读取数据，并更新文件位置。 如果 position 是整数，则文件位置将保持不变。

            回调有三个参数 (err, bytesRead, buffer)。
                err: 读取失败时的错误信息
                bytesRead：读取文件的字节数
                buffer：是数据将写入的缓冲区，与上面的buffer指代同一区域

            fs.open('./FileSystem/1.txt', 'r', function(err, fd) {

                if (err) {
                    console.log('打开文件失败！');
                } else {
                    var buf = new Buffer(10);
                    console.log(buf);
                    fs.read(fd, buf, 2, 4, 1, function(err, bytesRead, buffer) {
                        console.log(buf);
                        console.log(err); // null
                        console.log(bytesRead); // 4
                        console.log(buffer);
                    });
                }
            });

        fs.readSync(fd, buffer, offset, length, position)
            返回 bytesRead 的数量。
            同步读取文件

        fs.write(fd, buffer[, offset[, length[, position]]], callback)
            将 buffer 写入到 fd 指定的文件。

            offset 决定 buffer 中要被写入的部位， length 是一个整数，指定要写入的字节数。

            position 指定文件开头的偏移量（数据应该被写入的位置）。 如果 typeof position !== 'number'，则数据会被写入当前的位置。

            回调有三个参数 (err, bytesWritten, buffer)，其中 bytesWritten 指定 buffer 中被写入的字节数。

            在同一个文件上多次使用 fs.write() 且不等待回调是不安全的。


            fs.open('./FileSystem/1.txt', 'r+', function(err, fd) {

                if (err) {
                    console.log('打开文件失败！');
                } else {
                    var buf = Buffer.from('123');

                    fs.write(fd, buf, 0, 3, 2, function(err, bytesWritten, buffer) {
                        console.log(bytesWritten); // 3
                    })
                }
            });

        fs.writeSync(fd, buffer[, offset[, length[, position]]])
            同步写入数据
            返回: <number> 写入的字节数。


        fs.write(fd, string[, position[, encoding]], callback)
            将 string 写入到 fd 指定的文件。 如果 string 不是一个字符串，则该值会被强制转换为字符串。

            position 指定文件开头的偏移量（数据应该被写入的位置）。 如果 typeof position !== 'number'，则数据会被写入当前的位置。

            encoding 是期望的字符串编码。

            回调会接收到参数 (err, written, string)，其中 written 指定传入的字符串中被要求写入的字节数。 被写入的字节数不一定与被写入的字符串字符数相同。

            在同一个文件上多次使用 fs.write() 且不等待回调是不安全的。

            fs.open('./FileSystem/1.txt', 'r+', function(err, fd) {

                if (err) {
                    console.log('打开文件失败！');
                } else {

                    fs.write(fd, '123', 0, function(err, written, buffer) {
                        console.log(written); // 3
                    })
                }
            });


        fs.writeSync(fd, string[, position[, encoding]])
            同步写入数据
            返回: <number> 写入的字节数。


        fs.close(fd, callback)
            关闭文件，callback 无参数

        fs.closeSync(fd)
            关闭文件，返回 undefined。
            同步关闭


        fs.writeFile(file, data[, options], callback)
            文件不存在创建，文件存在覆盖

            file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
            data <string> | <Buffer> | <TypedArray> | <DataView>
            options <Object> | <string>
                encoding <string> | <null> 默认值: 'utf8'。
                mode <integer> 默认值: 0o666。
                flag <string> 参阅支持的文件系统标志。默认值: 'w'。
            callback <Function>
                err <Error>

            当 file 是一个文件名时，异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 data 可以是字符串或 buffer。

            当 file 是一个文件描述符时，行为类似于直接调用 fs.write()（建议使用）。

            如果 data 是一个 buffer，则 encoding 选项会被忽略。

            如果 options 是一个字符串，则它指定字符编码：
                fs.writeFile('文件.txt', 'Node.js中文网', 'utf8', callback);

            fs.writeFile('./FileSystem/2.txt', 'hello', function(err) {
                console.log(err); // null
            });

        fs.writeFileSync(file, data[, options])
            返回 undefined
            同步写文件、创建文件

        fs.appendFile(path, data[, options], callback)
            path <string> | <Buffer> | <URL> | <number> 文件名或文件描述符。
            data <string> | <Buffer>
            options <Object> | <string>
                encoding <string> | <null> 默认值: 'utf8'。
                mode <integer> 默认值: 0o666。
                flag <string> 参阅支持的文件系统标志。默认值: 'a'。
            callback <Function>
                err <Error>
            异步地将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer

            fs.appendFile('./FileSystem/2.txt', 'hello', function(err) {
                console.log(err); // null
            });

        fs.appendFileSync(path, data[, options])
            同步地将数据追加到文件，如果文件尚不存在则创建该文件


        // 异步模式
        fs.exists('./FileSystem/3.txt', function(isExists) {
            if (!isExists) {
                fs.writeFile('./FileSystem/3.txt', 'hello', function(err) {
                    if (err) {
                        console.log('出错');
                    } else {
                        console.log('创建新文件成功');
                    }
                })
            } else {
                fs.appendFile('./FileSystem/3.txt', '123', function(err) {
                    if (err) {
                        console.log('追加新内容失败');
                    } else {
                        console.log('追加新内容成功');
                    }
                })
            }
        });

        // 同步模式
        if (!fs.existsSync('./FileSystem/4.txt')) {
            if (fs.writeFileSync('./FileSystem/4.txt', '434543') === undefined) {
                console.log('创建新文件成功');
            } else {
                console.log('出错');
            }
        } else {
            fs.appendFileSync('./FileSystem/4.txt', 'dsdfgserf');
            console.log('追加新内容成功');
        }

        fs.access(path[, mode], callback)
            path <string> | <Buffer> | <URL>
            mode <integer> 默认值: fs.constants.F_OK。
            callback <Function>
                err <Error>

            测试用户对 path 指定的文件或目录的权限。 mode 参数是一个可选的整数，指定要执行的可访问性检查。 mode 可选的值参阅文件可访问性的常量。 可以创建由两个或更多个值按位或组成的掩码（例如 fs.constants.W_OK | fs.constants.R_OK）。

            最后一个参数 callback 是一个回调函数，调用时将传入可能的错误参数。 如果可访问性检查失败，则错误参数将是 Error 对象。

            不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。

            写入（推荐）
                fs.open('myfile', 'wx', (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                    console.error('myfile 已存在');
                    return;
                    }

                    throw err;
                }

                writeMyData(fd);
                });

            读取（推荐）
                fs.open('myfile', 'r', (err, fd) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                    console.error('myfile 不存在');
                    return;
                    }

                    throw err;
                }

                readMyData(fd);
                });

        fs.readFile(path[, options], callback)
            path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
            options <Object> | <string>
                encoding <string> | <null> 默认值: null。
                flag <string> 参阅支持的文件系统标志。默认值: 'r'。
            callback <Function>
                err <Error>
                data <string> | <Buffer>

            异步地读取文件的全部内容。

            fs.readFile('./FileSystem/4.txt', function(err, data) {
                if (err) {
                    console.log('读取文件失败');
                } else {
                    console.log(data.toString());
                }
            });

        fs.readFileSync(path[, options])
            返回: <string> | <Buffer>
            返回 path 的内容。
            同步读取文件

        fs.unlink(path, callback)
            path <string> | <Buffer> | <URL>
            callback <Function>
                err <Error>

            异步地删除文件或符号链接。 除了可能的异常，完成回调没有其他参数。

            fs.unlink() 不能用于目录。 要删除目录，则使用 fs.rmdir()。

            fs.unlink('./FileSystem/4.txt', function(err) {
                if (err) {
                    console.log('删除失败');
                } else {
                    console.log('删除成功');
                }
            })

        fs.unlinkSync(path)
            返回 undefined。
            同步删除文件

        fs.rename(oldPath, newPath, callback)
            oldPath <string> | <Buffer> | <URL>
            newPath <string> | <Buffer> | <URL>
            callback <Function>
                err <Error>

            异步地将 oldPath 上的文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。 除了可能的异常，完成回调没有其他参数。

            fs.rename('./FileSystem/3.txt', './FileSystem/4.txt', function(err) {
                if (err) {
                    console.log('重命名失败');
                } else {
                    console.log('重命名成功');
                }
            })

        fs.renameSync(oldPath, newPath)
            返回 undefined。

        fs.stat(path[, options], callback)
            读取文件信息

            path <string> | <Buffer> | <URL>
            options <Object>
                bigint <boolean> 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false。
            callback <Function>
                err <Error>
                stats <fs.Stats>

            回调有两个参数 (err, stats)，其中 stats 是一个 fs.Stats 对象。

            fs.stat('./FileSystem/4.txt', function(err, stats) {
                if (err) {
                    console.log('读取信息失败');
                } else {
                    console.log(stats);
                }
            });

        fs.statSync(path[, options])
            返回: <fs.Stats>

        fs.watch(filename[, options][, listener])
            filename <string> | <Buffer> | <URL>
            options <string> | <Object>
                persistent <boolean> 指示如果文件已正被监视，进程是否应继续运行。默认值: true。
                recursive <boolean> 指示应该监视所有子目录，还是仅监视当前目录。这适用于监视目录时，并且仅适用于受支持的平台（参阅注意事项）。默认值: false。
                encoding <string> 指定用于传给监听器的文件名的字符编码。默认值: 'utf8'。
            listener <Function> | <undefined> 默认值: undefined。
                eventType <string>
                filename <string> | <Buffer>

            监视 filename 的更改，其中 filename 是文件或目录。

            第二个参数是可选的。 如果 options 传入字符串，则它指定 encoding。 否则， options 应传入对象。

            监听器回调有两个参数 (eventType, filename)。 eventType 是 'rename' 或 'change'， filename 是触发事件的文件的名称。

            在大多数平台上，每当文件名在目录中出现或消失时，就会触发 'rename' 事件。

            fs.watch('./FileSystem/4.txt', function(event, filename) {
                console.log(event);
                if (filename) {
                    console.log(filename + '发生了改变');
                }
            });


        文件夹操作：

        fs.mkdir(path[, options], callback)
            path <string> | <Buffer> | <URL>
            options <Object> | <integer>
                recursive <boolean> 默认值: false。
                mode <integer> Windows 上不支持。默认值: 0o777。
            callback <Function>
                err <Error>

            异步地创建目录。 除了可能的异常，完成回调没有其他参数。

            fs.mkdir('./FileSystem/dir', function(err) {
                console.log(err); // null
            });

        fs.mkdirSync(path[, options])
            同步地创建目录。 返回 undefined。

        fs.rmdir(path[, options], callback)
            path <string> | <Buffer> | <URL>
            options <Object>
                emfileWait <integer> 如果遇到 EMFILE 错误，则 Node.js 将会在每次尝试时以 1 毫秒的线性回退重试该操作，直到超时持续时间超过此限制。 如果 recursive 选项不为 true，则忽略此选项。默认值: 1000。
                maxBusyTries <integer> 如果遇到 EBUSY、 ENOTEMPTY 或 EPERM 错误，则 Node.js 将会在每次尝试时以 100 毫秒的线性回退等待重试该操作。 此选项代表重试的次数。如果 recursive 选项不为 true，则忽略此选项。默认值: 3。
                recursive <boolean> 如果为 true，则执行递归的目录删除。在递归模式中，如果 path 不存在则不报告错误，并且在失败时重试操作。默认值: false。
            callback <Function>
                err <Error>

            删除目录

            fs.rmdir('./FileSystem/dir', function(err) {
                console.log(err); // null
            });

        fs.rmdirSync(path[, options])
            返回 undefined。

        fs.readdir(path[, options], callback)
            path <string> | <Buffer> | <URL>
            options <string> | <Object>
                encoding <string> 默认值: 'utf8'。
                withFileTypes <boolean> 默认值: false。
            callback <Function>
                err <Error>
                files <string[]> | <Buffer[]> | <fs.Dirent[]>

            读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中的文件名的数组（不包括 '.' 和 '..'）。

            fs.readdir('./FileSystem', function(err, filelist) {
                if (!err) {
                    console.log(filelist); // [ '1.txt', '2.txt', '4.txt', 'fs.js' ]
                }
            })

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

        fs.readdirSync(path[, options])
            返回: <string[]> | <Buffer[]> | <fs.Dirent[]>


9、前端项目自动化
    项目构建
        var projectData = {
            'name': 'wl',
            'fileData': [{
                    'name': 'css',
                    'type': 'dir'
                },
                {
                    'name': 'js',
                    'type': 'dir'
                },
                {
                    'name': 'images',
                    'type': 'dir'
                },
                {
                    'name': 'index.html',
                    'type': 'file',
                    'content': '<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\t\t<h1>\n\t</h1>\n\t</body>\n</html>',
                }
            ]
        };

        var fs = require('fs');

        if (projectData) {
            var path = 'font-end-automation';
            fs.mkdirSync(path + '/' + projectData.name);

            var fileData = projectData.fileData;

            if (fileData && Array.isArray(fileData)) {
                fileData.forEach(function(f) {
                    f.path = path + '/' + projectData.name + '/' + f.name;

                    f.content = f.content || '';

                    switch (f.type) {
                        case 'dir':
                            fs.mkdirSync(f.path);
                            break;

                        case 'file':
                            fs.writeFileSync(f.path, f.content);
                            break;

                        default:
                            break;
                    }
                });
            }
        }

    文件合并：
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

10、Web开发
    http模块搭建web服务
        搭建HTTP服务器，需要HTTP模块
        var http = require('http');

        通过http模块下的createServer方法创建web服务器对象
            var server = http.createServer();
            http.createServer([options][, requestlistener])

            options <Object>
                IncomingMessage <http.IncomingMessage> 指定要使用的 IncomingMessage 类。用于扩展原始的 IncomingMessage。默认值: IncomingMessage。
                ServerResponse <http.ServerResponse> 指定要使用的 ServerResponse 类。用于扩展原始 ServerResponse。默认值: ServerResponse。
            requestListener <Function>

            返回: <http.Server>

            requestListener 是一个自动添加到 'request' 事件的函数。

        server.listen([port[, host[, backlog]]][, callback]) 
            监听客户端连接请求，只有调用了listen方法后，服务器才开始工作

            这个函数是异步的。当服务器开始监听时，会触发 'listening' 事件。 最后一个参数 callback 将被添加为 'listening' 事件的监听器。

            所有的 listen() 方法都可以使用一个 backlog 参数来指定待连接队列的最大长度。

        server.address()
            服务器地址信息
            { address: '::', family: 'IPv6', port: 56472 }

        server.on(event, function(){});
            事件监听

            // 监听错误
            server.on('error', function(err) {
                console.log(err);
            });
            // 正常监听状态
            server.on('listening', function() {
                console.log('listening...');
            });

            // 监听请求事件
            server.on('request', function(request, response) {
                console.log('有客户端请求！');
            });

                request <http.IncomingMessage>
                    httpVersion
                    headers
                    url
                    method
                response <http.ServerResponse>
                    response.write(chunk[, encoding][, callback])

                        chunk <string> | <Buffer>
                        encoding <string> 默认值: 'utf8'。
                        callback <Function>
                        返回: <boolean>

                        chunk 可以是字符串或 buffer。 如果 chunk 是一个字符串，则第二个参数指定如何将其编码为字节流。 当刷新此数据块时将调用 callback。

                    response.end([data[, encoding]][, callback])

                        data <string> | <Buffer>
                        encoding <string>
                        callback <Function>
                        返回: <this>
                        此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 response.end() 方法。

                        如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)。

                        如果指定了 callback，则当响应流完成时将调用它。

                        end方法放在write方法之后调用

                    response.statusCode
                        response.statusCode = 404;
                        响应头发送到客户端后，此属性表示已发送的状态码。

                    response.setHeader(name, value)
                        为隐式响应头设置单个响应头的值。 如果此响应头已存在于待发送的响应头中，则其值将被替换。 在这里可以使用字符串数组来发送具有相同名称的多个响应头。 非字符串值将被原样保存。 因此 response.getHeader() 可能返回非字符串值。 但是非字符串值将转换为字符串以进行网络传输。

                        response.setHeader('Content-Type', 'text/html');
                        response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

                    response.writeHead(statusCode[, statusMessage][, headers])
                        statusCode <number>
                        statusMessage <string>
                        headers <Object>
                        返回: <http.ServerResponse>
                        向请求发送响应头。 状态码是一个 3 位的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 可以可选地将用户可读的 statusMessage 作为第二个参数。

                        返回对 ServerResponse 的引用，以便可以链式调用。
                            const body = 'hello world';
                            response
                                .writeHead(200, {
                                    'Content-Length': Buffer.byteLength(body),
                                    'Content-Type': 'text/plain'
                                })
                                .end(body);

                        此方法只能在消息上调用一次，并且必须在调用 response.end() 之前调用。

                        当使用 response.setHeader() 设置响应头时，则与传给 response.writeHead() 的任何响应头合并，且 response.writeHead() 的优先。

                每次有请求时都会触发。 每个连接可能有多个请求（在 HTTP Keep-Alive 连接的情况下）

    url
        const url = require('url');

        var urlstr = url.parse('http://www.baidu.com:8080/a/index.html?b=2#p=1');
        console.log(urlstr);
        Url {
                protocol: 'http:',
                slashes: true,
                auth: null,
                host: 'www.baidu.com:8080',
                port: '8080',
                hostname: 'www.baidu.com',
                hash: '#p=1',
                search: '?b=2',
                query: 'b=2',
                pathname: '/a/index.html',
                path: '/a/index.html?b=2',
                href: 'http://www.baidu.com:8080/a/index.html?b=2#p=1' 
            }

        server.on('request', function(req, res) {
            var urlString = url.parse(req.url);

            switch (urlString.pathname) {
                case '/':
                    // 首页
                    res.writeHead(200, {
                        'Content-Type': 'text/html;charset=utf-8'
                    });
                    res.end('<h1>首页</h1>');
                    break;

                case '/user':
                    // 用户
                    res.writeHead(200, {
                        'content-type': 'text/html;charset=utf-8'
                    });
                    res.end('<h1>用户</h1>');
                    break;

                default:
                    // 其他
                    res.writeHead(404, {
                        'content-type': 'text/html;charset=utf-8'
                    });
                    res.end('<h1>页面不存在</h1>');
                    break;
            }

        });

        GET方法发送数据通过URL中的query

            var urlString = url.parse(req.url);
            querystring.parse(urlString.query);

        POST方法发送数据会被写入缓冲区中，需要通过request的data事件和end事件进行数据拼接处理 

            if (req.method.toUpperCase() == "POST") {
                var str = '';
                req.on('data', function(chunk) {
                    str += chunk;
                });

                req.on('end', function() {
                    console.log(str);               // username=liang.wang&password=123
                    console.log(querystring.parse(str)); // { username: 'liang.wang', password: '123' }
                });
            }
                
11、异常处理
    同步异常处理：
        try {
            router[pathname](req, res);
        } catch (err) {
            console.log(err);

            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });

            res.write(err.toString());
            res.end();
        }

    异步异常处理：
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

    抛出异常：
        function throwException(flag) {
            if (flag == 0) {
                throw '这是一个异常';
            } else {
                return flag;
            }
        }

        try {
            var data = throwException(0);
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data.toString);
        } catch (err) {
            console.log(err);

            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });

            res.write(err.toString());
            res.end();
        }

12、异步流程控制对象async
    1.串行无关联：async.series
    2.并行无关联：async.parallel
    3.串行有关联：async.waterfall -- 可以传参, 将上一个过程的执行结果传递给下一个过程
    4.parallelLimit: parallelLimit函数与parallel类似，但是多一个参数limit，限制同时并发数

    setInterval(function(){
        clearInterval(this);
    }, 1000);

    const async = require('async');

    function exec() {
        // 串行无关联, one/two函数按顺序执行
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
    exec();
    console.log('主进程执行完毕！');

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
                    // done('null', 'one完毕'); 
                    setInterval(function() {
                        console.log(456);
                        i++;
                        if (i >= 3) {
                            clearInterval(this);
                            done('null', 'one完毕'); // 当第一个参数非null时，会阻止two函数的执行
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
                            done(null, 'two完毕'); 
                        }
                    }, 1000);

                }
            },
            function(err, result) { 
                console.log(err);
                console.log(result);
            }
        )
    }
    exec2();
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

13、连接MySQL
    npm install mysql

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

14、mysql连接池
    npm install -g node-mysql

    // mysql-pool.js 文件
    const mysql = require('mysql');

    function OptPool() {
        this.flag = true; // 是否连接过

        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node',
            port: '3306'
        });

        this.getPool = function() {
            if (this.flag) {
                // 监听connection事件
                this.pool.on('connection', function(connection) {
                    connection.query('SET SESSION auto_increment_increment=1');

                    this.flag = false;
                });
            }

            return this.pool;
        }
    }

    module.exports = OptPool;


    // 调用连接池
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

15、事件机制
    const EventEmitter = require('events');

    EventEmitter 类
        emitter.addListener(eventName, listener)
        emitter.removeListener(eventName, listener)
        emitter.on(eventName, listener)
        emitter.off(eventName, listener)
        emitter.once(eventName, listener)
        emitter.prependListener(eventName, listener)
        emitter.prependOnceListener(eventName, listener)
        emitter.removeAllListeners([eventName])
        emitter.setMaxListeners(n)
        emitter.listeners(eventName)
            返回名为 eventName 的事件的监听器数组的副本。
        emitter.emit(eventName[, ...args])
            按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数。

            如果事件有监听器，则返回 true，否则返回 false。

        // 事件类--抛出事件
        var events = require('events');

        function UserBean() {
            this.eventEmit = new events.EventEmitter();

            this.zhuce = function(req, res) {
                console.log('注册');
                req['uname'] = 'aa';
                req['pwd'] = 'bb';
                // 抛出事件消息
                this.eventEmit.emit('zhuceSuc', 'aa', 'bb');
            }

            this.login = function(req, res) {
                console.log('登录');
                res.write('用户名：' + req['uname']);
                res.write('密码：' + req['pwd']);
                res.write('登录');
            }
        }

        module.exports = UserBean;


        // 事件类--监听事件
        var http = require('http');

        var UserBean = require('./UserBean');

        http.createServer(function(req, res) {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });

            if (req.url !== '/favicon.ico') {
                user = new UserBean();

                // 注册监听
                user.eventEmit.once('zhuceSuc', function(uname, pwd) {
                    res.write('注册成功');
                    console.log('user name:' + uname);
                    console.log('password:' + pwd);

                    user.login(req, res);
                    res.end();
                });

                user.zhuce(req, res);
            }
        }).listen(8080);

        console.log('Server runnung at http://127.0.0.1:8080');

17、浏览器的组成
    人机交互部分（UI）
    网络请求部分（Socket）
    Javascript引擎部分（解析执行javascript） -- chrome V8
    渲染引擎部分（渲染HTML、CSS等）
    数据存储部分（cookie、HTML5中的本地存储LocalStorage、SessionStorage）

18、主流渲染引擎
    渲染引擎 又叫 排版引擎 或 浏览器内核

    主流的 渲染引擎 有：
        chrome浏览器： Blink引擎（webkit的一个分支）
        Safari浏览器：webkit引擎
        Firefox浏览器：Gecko引擎
        opera浏览器：Blink引擎
        Internet Explorer 浏览器：Trident引擎
        Microsoft Edge浏览器：EdgeHTML引擎（Trident的一个分支）

19、浏览器工作原理
    解析HTML构建DOM树
    解析CSS规则构建CSS树

    DOM树 + CSS树  =  Render tree -> Layout of the render tree -> painting the render tree

    Render tree 中不包含不需要显示的元素（header、display：none 的元素 等）

    layout/reflow

20、请求报文、响应报文
    请求行  （方法、HTTP协议/版本号）                        响应行  （HTTP协议、状态码、解释信息）
    请求头                                                  响应头
    empty line                                              empty line
    请求体                                                  响应体

21、C/S (Client/Server)     客户端服务器
    B/S (Browser/Server)    浏览器服务器

22、node.js 是什么
    node.js是一个开发平台
    开发平台：有对应的编程语言、有语言运行时、又能实现特定功能的API（SDK：Software Development Kit）
    node.js 平台是基于Chrome V8 Javascript 引擎构建 -- 语言运行时
    基于node.js 可以开发控制台程序（命令行程序、CLI程序）、桌面应用程序（GUI）（借助node-webkit、electron等框架实现）、Web应用程序（网站）

    node.js 全栈开发技术栈： MEAN  -- MongoDB Express Angular Node.js 

23、node.js 特点
    事件驱动（事件触发，执行回调函数）
    非阻塞 I/O 模型（当执行 I/O 操作时， 不会阻塞线程）
    单线程
    开源库生态系统 -- npm

24、node.js 开发Web应用程序 和 PHP、Java等传统模式开发Web应用程序的区别
    传统模式：有Web容器 -- Apache（解析HTTP报文、监听端口）
            Apache可以处理静态资源
            php/java处理动态资源

    Node.js: 没有Web容器，node本身带有HTTP服务器（可以解析HTTP报文、可以监听端口）
            node处理静态资源、动态资源

25、REPL介绍
    REPL： Read-Eval-Print-Loop（交互式解释器）
    R 读取 -- 读取用户输入，解释输入了javascript数据结构并存储在内存中
    E 执行 -- 执行输入的数据结构
    P 打印 -- 输出结构
    L 循环 -- 循环操作以上步骤直到用户两次按下 Ctrl-c 退出

    字符串 includes 方法
        'asdsdf'.includes('d');  // true

    退出node执行环境
        To exit, press ^C again or type .exit

26、javascript文件命名规则
    不要用中文
    不要包含空格
    不要出现node关键字
    建议以‘-’分割单词

27、文件读写
    node模块：
        process 模块使用时无需通过require()函数来加载模块， 可以直接使用 -- process 是全局模块
        fs 模块， 在使用时必须通过require()函数加载模块， 方可使用  

        Global 下的即是全局模块， 不需要require()加载

    文件写入
        var msg = "Hello World, !!!";
        fs.writeFile('./hello.text', msg, function(err) {
            // err === null -> 写文件成功
            if (err) {
                console.log("err name:" + err.name + ", err message:" + "err.message");
            } else {
                console.log("写入成功！！")
            }
        })

    文件读取
        在读取文件时，传递编码参数，回调函数中获取到的data就为相应编码的数据
        fs.readFile('./hello.text', function(err, data) {
            if (err) {
                console.log("err name:" + err.name + ", err message:" + "err.message");
            } else {
                console.log(data); // data 为Buffer类型（字节数组）
                // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 2c 20 21 21 21>

                console.log(data.toString('utf8')); // 默认编码也是utf8
                // Hello World, !!!
            }
        })

    创建目录
    var path = require('path');
    var dirpath = path.join(__dirname, 'test');

    fs.mkdir(dirpath, function(err) {
        if (err) {
            console.log("err name:" + err.name + ", err message:" + "err.message");
        } else {
            console.log('创建目录成功');
        }
    })

28、node单线程异步，IO非阻塞
    Call Stack  执行当前程序
    Web Apis / Node Apis   执行异步，非阻塞IO
    Callback Queue  将异步加入队列，等待Call Stack为空时加入栈 -- 单线程

29、__dirname 、__filename
    文件的相对路径（./）是参照node执行命令所在的路径，而不是参照代码所在文件的路径

    解决：
        __dirname ：当前正在执行的js文件所在的目录
        __filename ： 当前正在执行的js文件的完整路径

        两者不是全局变量，在不同文件（模块）中是不同的

30、path
    用于跨平台的路径拼接
    var path = require('path');
    var filename = path.join(__dirname, 'hello.txt');

31、http server
    const http = require('http');

    // 创建HTTP服务对象
    var server = http.createServer();

    // 监听用户请求事件（request事件）
    server.on('request', function(request, response) {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.write('hello');

        response.end();
    });

    // 启动服务，监听端口
    server.listen(8080, function() {
        console.log('服务已启动，请访问：http://localhost:8080');
    })


    const url = require('url');

    // 创建HTTP服务对象
    http.createServer(function(request, response) {

        // 获取请求URL  request.url
        console.log(request.url);
        console.log(url.parse(request.url));

        response.end();
    }).listen(8080, function() {
        console.log('服务已启动，请访问：http://localhost:8080');
    });

    
    // 根据不同请求返回不同文件
    const http = require('http');
    const url = require('url');
    const fs = require('fs');
    const path = require('path');
    http.createServer(function(request, response) {

        // 获取请求URL  request.url
        // console.log(request.url);
        // console.log(url.parse(request.url));
        var requestUrl = url.parse(request.url);
        response.setHeader('Content-Type', 'text/html; charset=utf-8');

        if (requestUrl.pathname === '/login') {
            var filename = path.join(__dirname, 'login.html');
            fs.readFile(filename, function(err, data) {
                if (err) {
                    console.log('err name:' + err.name);
                } else {
                    response.write(data); // 此时data是Buffer（二进制字节数组）
                    response.end();
                }
            });
        }

    }).listen(8080, function() {
        console.log('服务已启动，请访问：http://localhost:8080');
    });

    http 请求静态资源（图片/CSS）
        http.createServer(function(request, response) {

            var requestUrl = url.parse(request.url);

            function readFileCallback(err, data) {
                if (err) {
                    console.log('err name:' + err.name);
                    response.end();
                } else {
                    response.write(data); // 此时data是Buffer（二进制字节数组）
                    response.end();
                }
            }

            if (requestUrl.pathname === '/login') {
                var filename = path.join(__dirname, 'login.html');
                response.setHeader('Content-Type', 'text/html; charset=utf-8');

                fs.readFile(filename, readFileCallback);
            } else if (requestUrl.pathname === '/03.jpg') {
                var filename = path.join(__dirname, '03.jpg');
                response.setHeader('Content-Type', 'image/jpeg; charset=utf-8');

                fs.readFile(filename, readFileCallback);
            } else if (requestUrl.pathname === '/login.css') {
                var filename = path.join(__dirname, 'login.css');
                response.setHeader('Content-Type', 'text/css; charset=utf-8');

                fs.readFile(filename, readFileCallback);
            }

        }).listen(8080, function() {
            console.log('服务已启动，请访问：http://localhost:8080');
        });

32、try-catch 不能捕获异步异常
    异步操作，可以通过错误号（err.code）进行异步处理
    err:
        const fs = require('fs');
        const path = require('path');

        var filename = path.join(__dirname, 'abc/abc.txt');

        fs.writeFile(filename, '大家好', 'utf8', function(err) {
            if (err) {
                console.log(err.name); // Error
                console.log(err.message); // ENOENT: no such file or directory, open 'c:\wamp64\www\learnnode\aliyun\exception\abc\abc.txt'
                console.log(err.code); // ENOENT
                throw err;
            }
            console.log('ok');
        })

    try-catch 不能捕获异步异常
        try {
            fs.writeFile(filename, '大家好666', 'utf8', function(err) {
                console.log('ok');
            });
        } catch (e) {
            console.log('出错了');
        }

33、模拟Apache服务器--返回静态资源

    const http = require('http');
    const url = require('url');
    const fs = require('fs');
    const path = require('path');
    const mime = require('mime');

    http.createServer(function(request, response) {
        // 获取请求路径
        var requestUrl = url.parse(request.url).pathname;

        // 设置静态资源路径
        var staticPath = path.join(__dirname, 'public');

        // 拼接请求静态资源文件路径
        var staticFileName = path.join(staticPath, requestUrl);

        function readFileCallback(err, data) {
            if (err) {
                response.end('文件不存在 404');
            } else {
                response.write(data); // 此时data是Buffer（二进制字节数组）
                response.end();
            }
        }

        // 根据文件后缀设置Content-Type
        // var isStatic = requestUrl.lastIndexOf(".")
        // if (isStatic < 0) {
        //     response.setHeader('Content-Type', 'text/html; charset=utf-8');
        // } else {
        //     var suffix = requestUrl.substring(isStatic + 1);
        //     if (suffix === 'css') {
        //         response.setHeader('Content-Type', 'text/css; charset=utf-8');
        //     } else if (suffix === 'js') {
        //         response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        //     } else if (suffix === 'jpg' || suffix === 'jpeg') {
        //         response.setHeader('Content-Type', 'image/jpeg; charset=utf-8');
        //     } else if (suffix === 'png') {
        //         response.setHeader('Content-Type', 'image/png; charset=utf-8');
        //     } else if (suffix === 'gif') {
        //         response.setHeader('Content-Type', 'image/gif; charset=utf-8');
        //     }
        // }

        // 根据插件mime设置Content-Type
        response.setHeader('Content-Type', mime.getType(staticFileName));

        fs.readFile(staticFileName, readFileCallback);

    }).listen(8080, function() {
        console.log('服务已启动，请访问：http://localhost:8080');
    });

34、对于服务器来说请求URL就是一个标识符，服务器中不一定会有相应的文件
    
    HTML页面中：
        './' -- 相对路径： 相对于当前URL的路径（不包括最后的文件名）做相对定位
        '/' -- 绝对路径：相对于域名做相对定位

35、request对象 和 response对象

    request：解析HTTP请求报文 -- http.IncomingMessage 类
    response：返回响应报文 -- http.ServerResponse 类

    request对象常用成员：
        request.headers -- 请求报文头
        request.rawHeaders  -- 原生的请求报文头
        request.httpVersion
        request.method
        request.url

        // console.log(request.headers);  // 返回请求报文头对象
        // { 
        //     host: 'localhost:8080',
        //     connection: 'keep-alive',
        //     'upgrade-insecure-requests': '1',
        //     'user-agent':
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        //     'sec-fetch-mode': 'navigate',
        //     accept:
        //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        //     'sec-fetch-site': 'none',
        //     'accept-encoding': 'gzip, deflate, br',
        //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
        // }

        // console.log(request.rawHeaders);     // 返回请求报文头数组，奇数行是键，偶数行是值
        // [ 
        //     'Host',
        //     'localhost:8080',
        //     'Connection',
        //     'keep-alive',
        //     'Cache-Control',
        //     'max-age=0',
        //     'Upgrade-Insecure-Requests',
        //     '1',
        //     'User-Agent',
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        //     'Sec-Fetch-Mode',
        //     'navigate',
        //     'Sec-Fetch-User',
        //     '?1',
        //     'Accept',
        //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        //     'Sec-Fetch-Site',
        //     'none',
        //     'Accept-Encoding',
        //     'gzip, deflate, br',
        //     'Accept-Language',
        //     'zh-CN,zh;q=0.9,en;q=0.8' 
        // ]

        // console.log(request.httpVersion); // 获取请求客户端的HTTP版本号
        // 1.1

        // console.log(request.method); // 请求方法
        // GET

        // console.log(request.url); // 请求路径，不包含域名、端口、协议
        // /

    response对象的常用成员：

        response.write(data)  -- 返回数据 data 可以是字符串或Buffer
        response.end([data])   -- 响应头和响应主体已发送  data 可以是字符串或Buffer
        response.setHeader('','')   -- 设置响应报文头，在end() 和 write() 之前使用, 否则将报错
        response.statusCode     -- 设置响应状态码   放在setHeader() 前后
        response.statusMessage  -- 设置响应状态信息 放在setHeader() 前后
        response.writeHead()   -- 写入响应头
            response.writeHead(404, 'not found', {      // 状态码，消息，响应头
                'Content-type': 'text/html; charset=utf-8'
            })

            response.statusCode = 200;
            response.statusMessage = 'success';

            response.setHeader('content-type', 'text/html; charset=utf-8');

            response.writeHead(404, 'not found', {
                'Content-type': 'text/html; charset=utf-8'
            });

            writeHead() 放在setHeader/statusMessage/statusCode之后使用，否则会报错
                        同时优先执行writeHead内的信息
                        当没有writeHead方法时，系统会默认调用此方法，并将设置信息放在该方法中写入

36、NPM（node packge manager）
    nvm list
    nvm use 
    node -v
    npm -v
    npm install npm@latest -g
    npm install 包名  --本地安装    项目中使用的包一定要执行一次本地安装
    npm install 包名 -g   --全局安装  （意味着该包可以以命令行工具的形式使用）
    npm version
    npm init    初始化package.json文件
    npm init -y     一步生成package.json文件

37、模块（Modules）和包（Packages）的区别

    模块可以是任何一个文件或目录，只要能被node.js通过require()加载即可

    包是一个文件或目录必须有一个package.json文件来描述，就可以是一个包

38、package.json/package-lock.json 文件
    package.json：包描述文件或项目描述文件
        元数据：
            name       必须有
            version     必须有
            description
            author
            main
            dependencies

        项目目录使用小写字母，不要使用大写字母和中文
    
    package-lock.json：快速下载安装
        元数据：
            包名
            仓库地址
            hash校验码

39、项目：新闻列表

40、node.js模块
    require加载模块是同步的
    
    模块：内置模块（fs/http/url/path）、文件模块（.js/.json/.node--c/c++编写的模块）、自定义模块（第三方模块）