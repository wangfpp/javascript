function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    return {
        a: 1
    }
}


let person1 = mynew(Person, 1, 2, 3);
console.log(person1);


function mynew() {
    let args = Array.prototype.slice.call(arguments)
    let originFn = args.shift();
    let o = {};
    o.__proto__ = originFn.prototype;
    let result = originFn.apply(o, ...arguments);
    return result instanceof Object ? result : o;
}