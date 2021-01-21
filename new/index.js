function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    console.log(new.target);
    return new String("aaa");
}


let person1 = mynew(Person, 1, 2, 3);
let person2 = new Person(1, 2, 3);
console.log(person1);
console.log(person2);

function mynew() {
    let args = Array.prototype.slice.call(arguments)
    let originFn = args.shift();
    let o = {};
    o.__proto__ = originFn.prototype;
    let result = originFn.apply(o, args);
    
    return result instanceof Object ? result : o;
}

console.log(window.name);
