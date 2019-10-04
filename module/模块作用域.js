var c = 100; // c 只属于当前模块下的变量，而不属于global
console.log(global.c); // undefined

global.a = 200;
console.log(global.a); // 200

console.log(__filename); // c:\wamp64\www\learnnode\module\模块作用域.js