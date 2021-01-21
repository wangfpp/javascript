// 一: 箭头函数的this指向声明时所在的环境
let btnNode = document.getElementById('btn');
var name = "我在全局"; // 这里使用let是不可以的
var obj = {
    name: "wangfpp",
    sayName: _ => {
        console.log(this);
        console.log(this.name);
    }
}

obj.sayName(); // 这里打印window  "我在全局" 颠覆了认知了阿

// 再看一个例子
btnNode.addEventListener('click', () => {
    console.log(this); // 点击打印window 又一次的打击
})
/**
 *  解析  箭头函数根本没有this 它所指向的this是在声明箭头函数是所在的Context
 *  但是这里有两种特殊情况
 *  1. 对象不构成单独的作用域环境  作用域有两种(全局作用域和函数作用域)
 *  2. 点击事件需要动态this也不应使用箭头函数
 */


 // 二: 箭头函数的this是不变的?
function arrowFn() {
    (() => {
        console.log(this.name);
    })();
}

arrowFn(); //我在全局
arrowFn.call({name: "猜到了吗"}); // 猜到了吗 
arrowFn.apply({name: "还不相信"}); // 还不相信

// 上面的结果显示箭头函数的this到底变化没? 
/**
 * 解析:
 * 1. 函数体内的this对象就是定义时所在的对象,而不是使用时所在的对象
 * 2. 不可以当作构造函数,也就是说不可以使用new关键字 否则会抛出一个错误
 * 3. 不可以使用arguments对象,该对象在函数体内不存在,如果使用可以使用rset参数代替 ...args arguments super new.target都不存在
 * 4. 不可以使用yield 因此箭头函数不能用作Generator函数
 * 5. 由于箭头函数没有自己的this当然就不能使用call apllpy bind等函数
 */


// let length = 10;
// function fn() {
//     console.log(this);
// 	console.info(this.length)
// }
// fn();
// let Person = {
// 	length: 5,
// 	say: function() {
//         fn();
// 		arguments[0](1);
// 	}
// }
// Person.say(fn);

