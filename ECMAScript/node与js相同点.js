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