/*
 * @Author: wangfpp 
 * @Date: 2021-04-14 17:26:10 
 * @Last Modified by: 
 * @Last Modified time: 2021-04-14 17:49:03
 * @description: 数据结构 Stack栈 LIFO Last input First output
 */

// 栈是一种遵从后进先出原则的有序集合,新添加或待删除的元素都保存在栈的同一端,称作栈顶,
// 另一端就叫栈底 在栈里新元素都靠近栈顶旧元素都接近栈底

class Stack{
    constructor() {
        this.items = [];
    }
    /**
     * @description 把数据插入栈
     * @param  {...any} args 
     * @returns Number 栈的长度
     */
    push(...args) {
        return this.items.push(...args);
    }

    /**
     * @description 从栈中取出一个元素
     * @return 返回取出的元素
     */
    pop() {
        return this.items.pop();
    }

    /**
     * @description 返回栈顶元素
     * @return Any
     */
    peek() {
        let len = this.items.length;
        return this.items[len - 1];
    }

    /**
     * @description 栈是否为空
     * @return Boolean true为空 false反之
     */
    isEmpty() {
        return !this.items.length;
    }

    /**
     * @description 清除栈中的所有元素
     */
    clear() {
        this.items = [];
    }

    /**
     * @description 计算栈的元素个数
     * @returns Number 元素个数
     */
    get size() {
        return this.items.length;
    }
}

let stack = new Stack();
stack.push(1, 2, 3, 6, 9);
stack.pop();
console.log(stack, stack.size);