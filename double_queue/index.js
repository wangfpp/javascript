class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    /**
     * @description 向双端队列的前端添加新的元素
     * @param {Any} element 插入的元素
     * @returns 返回队列的原元素个数
     */
    addFront(...args) {
        let len = args.length;
        if (this.isEmpty()) {
            if (len > 1) {
                this.addBack(args[0]);
                if (this.lowestCount > 0) {
                    for(let i = this.count; i > 0; i--) {
                        this.items[i] = this.items[i - len - 1];
                        this.count++;
                    }
                    this.lowestCount = 0;
                }
            } else {
                this.addBack(args);
            }
        } else if (this.lowestCount > 0) {
            if (len > 1) {
                this.addBack(args[0]);
                if (this.lowestCount > 0) {
                    for(let i = this.count; i > 0; i--) {
                        this.items[i] = this.items[i - len - 1];
                        this.count++;
                    }
                    this.lowestCount = 0;
                }
            } else {
                this.addBack(args);
            }
        } else {
            for(let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - len - 1];
                this.count++;
            }
        }
    }

    /**
     * @description 向双端队列的后端添加新的元素
     * @param  {...any} args 插入的元素
     * * @returns 返回队列的原元素个数
     */
    addBack(...args) {
        for(let i = 0; i < args.length; i++) {
            this.items[this.count] = args[i];
            this.count++;
        }
        return this.count;
    }

    /**
     * @description 从双端队列的前端移除一个元素
     * @returns 返回移除的元素
     */
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        let result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    /**
     * @description 从双端队列的后端移除一个元素
     * @returns 返回移除的元素
     */
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        let result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    /**
     *@description 查询双端队列前端的元素 
     */
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    /**
     * @description 返回双端队列后端的第一个元素
     */
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }

    /**
     * @description 队列是否是空队列
     * @returns 是否是空队列 是返回true 反之false
     */
    isEmpty() {
        return !this.size;
    }

    /**
     * @description 清空队列
     */
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    /**
     * @description 队列的元素个数
     */
    get size() {
        return this.count - this.lowestCount;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objStr = `${this.items[this.lowestCount]}`;
        for(let i = this.lowestCount + 1; i < this.count; i++) {
            objStr += `,${this.items[i]}`;
        }
        return objStr;
    }
}

let deque = new Deque();
var arr = ['a', 'b', 'c'];
deque.addBack(1, 2, 3, 4, arr);
deque.removeFront();
deque.removeFront();
deque.addFront('s')
console.log(deque)