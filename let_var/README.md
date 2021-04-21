### Javascript var let const 的区别

| 类型 | 作用域类型 | 变量提升 | 是否可重复声明 | 是否可更改 | 是否能挂载全局 |
| :----: | :----------: | :--------: | :--------------: | :----------: | :--------------: |
| var  | 函数作用域 | 有变量提升 | 是   | 是   | 是   |
| let  | 块级作用域 | 无变量提升 | 否  | 是   | 否   |
| const  | 块级作用域 | 无变量提升 | 否   | 复杂类型可修改 简单类型不可   | 否   |


#### 变量提升
使用var声明的变量会自动提升到函数作用域的顶部

```javascript
function test() {
    console.log(age); // undefined
    var age = 26;
}
// function test() {
//   var age;
//   console.log(age); // undefined
//   age = 26;
// }
test();
```

#### const声明的变量是否可更改
const声明的简单数据类型(Number String Boolean Null Undefined Symbol)不可修改
复杂的数据类型是可以修改的 指向的是引用的地址 如(Array Object Date)
