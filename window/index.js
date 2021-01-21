let name = "你猜到了吗?";
let dict = {
    name: "wangfpp",
    sayName: _ => {
        console.log(this.name);
    }
}

dict.sayName(); // ""

/**
 * 解析:
 * 
 * 1. let const 声明的变量不会挂载到window上
 * 2. 对象内不具有作用域 所以this指向window
 * 3. window也是对象默认有个name属性为"" 并且时String
 */

let myWin = window.open("../new/index.html", "aaa", null, true);
console.log(window.name);
