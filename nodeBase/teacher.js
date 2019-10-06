var User = require('./user.js');

function Teacher(id, name, age) {
    User.apply(this, [id, name, age]);

    this.teach = function() {
        console.log(this.name + "讲课");
    }
}

var tracher = new Teacher(1, 'name', 18);
tracher.teach();