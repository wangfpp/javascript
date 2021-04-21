/*
 * @Author: wangfpp 
 * @Date: 2021-04-14 17:51:22 
 * @Last Modified by: 
 * @Last Modified time: 2021-04-14 18:07:35
 * @description: 字典类型的栈结构
 */

// push(element(s))：添加一个（或几个）新元素到栈顶。
//  pop()：移除栈顶的元素，同时返回被移除的元素。
//  peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。
//  isEmpty()：如果栈里没有任何元素就返回 true，否则返回 false。
//  clear()：移除栈里的所有元素。
//  size()：返回栈里的元素个数。该方法和数组的 length 属性很类似。
class Stack {
    constructor() {
        this._init();
    }

    _init() {
        this.items = {};
        this.count = 0;
    }

    push(item) {
        this.items[this.count] = item;
        this.count++;
    }

    isEmpty() {
        return !this.count;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        let result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }

    toString() {
        if(this.isEmpty()) {
            return "";
        }
        let objStr = this.items[0];
        for(let i = 1; i < this.size; i++) {
            objStr += `,${this.items[i]}`;
        }
        return objStr;
    }

    clear() {
        this._init();
    }

    get size() {
        return this.count;
    }
}
let stack = new Stack();
stack.push(1);
stack.push({a: 1});
console.log(stack, stack.size)
// stack.pop();
stack.peek();
console.log(stack, stack.size, stack.toString())
console.log(Object.getOwnPropertyNames(stack))