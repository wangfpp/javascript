/*
 * @Author: wangfpp 
 * @Date: 2021-04-15 08:40:21 
 * @Last Modified by: 
 * @Last Modified time: 2021-04-16 18:46:03
 * @description: 实现队列数据结构
 */


class Queue {
    constructor() {
        this._init();
    }

    _init() {
        this.items = [];
        this.count = 0;
        this.lowestCount = 0;
    }

    /**
     * @description 向队列中添加一个或多个元素
     * @param  {...any} args 添加的元素 一个或多个
     * @returns Number 返回插入后的队列的个数
     */
    enqueue(...args) {
        args.forEach(item => {
            this.items[this.count] = item;
            this.count++
        })
        return this.count;
    }

    /**
     * @description 从队列中移除第一项
     * @returns Any 返回移除的项
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        let result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        this.count--;
        return result;
    }

    /**
     * @description 返回队列中的第一个元素
     * @returns Any 队列中的第一个元素
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    /**
     * @description 队列是否为空
     * @returns Boolean true为空 false 反之
     */
    isEmpty() {
        return !this.count;
    }

    clear() {
        this._init();
    }

    toString() {
        if (this.isEmpty()) {
            return "";
        }
        let strObj = `${this.items[this.lowestCount]}`;
        for(let i = 1; i < this.size; i++) {
            strObj += `,${this.items[i]}`;
        }
        return strObj;
    }

    /**
     * @description 计算队列中的元素个数
     * @returns Number 队列的元素个数
     */
    get size() {
        return this.count;
    }
}

let queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.isEmpty(), queue.size);
console.log(queue.toString());
queue.dequeue()
console.log(queue.peek());
console.log(queue.isEmpty(), queue.size);
console.log(queue.toString());