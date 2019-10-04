var a = 100;

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

module.exports.a = a;
console.log(module);

console.log(exports); // { a: 100 }

console.log(exports === module.exports); // true

// exports = [1, 2, 3];
// console.log(exports);           // [ 1, 2, 3 ]
// console.log(module.exports);    // { a: 100 }

module.exports = [1, 2, 3];
console.log(exports); // { a: 100 }