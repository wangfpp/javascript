const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class ZkPromise {
    /**
     * Promise 传递一个执行体
     * @param {Function} exector 
     */
    constructor(exector) {
        this.status = PENDING;
        this.value = null;
        this.allTask = [];　// pending时存放所有的异步任务
        try {
            exector(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            // 捕获在Promise执行体中的异常
            this.reject(error);
        }
    }
    
    /**
     * 解决状态　修改状态和终值
     * @param {Any} value 提供的值
     */
    resolve(value) {
        if(this.status === PENDING){
            this.value = value;
            this.status = FULFILLED;
            this.allTask.forEach(item => {
                let { onFulfilled } = item;
                onFulfilled(value);
            })
        }
    }
    /**
     * 拒绝状态　修改状态指明据因
     * @param {Any} reason 据因
     */
    reject(reason) {
        if(this.status === PENDING){
            this.reason = reason;
            this.status = REJECTED;
            this.allTask.forEach(item => {
                let { onRejected } = item;
                onRejected(reason);
            })
        }
    }
    /**
     * then返回一个Promise　可链式调用(递归)
     * @param {Function | null} onFulfilled resolve后执行的函数
     * @param {Function | null } onRejected reject后执行的函数
     */
    then(onFulfilled, onRejected) {
        /**
         * 接收终值的两个函数参数时可选的
         */
        if(typeof onFulfilled !== "function") {
            onFulfilled = _ => this.value;
        }

        if(typeof onRejected !== "function") {
            onRejected = _ => {
                throw this.reason;
            };
        }

        /**
         * settimeout时为了解决promise2使用时promise未赋值　利用EventLoop
         */
        let promise2 = new Promise((resolve, reject) => {
            if(this.status === PENDING) {
                this.allTask.push({
                    onFulfilled: value => {
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(value);
                                this.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        })
                    },
                    onRejected: reason => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(reason);
                                this.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }
                })
            }
    
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
    
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
        })
        return promise2;
    }
    resolvePromise(promise2, x, resolve, reject){
        if (promise2 === x) {
            return reject(TypeError("cicle"));
        }
        if ((typeof x === "object" && x !== null) || typeof x === "function") {
            let called = false;
            try {
                let then = x.then;
                if (typeof then === "function") {
                    then.call(x, 
                        y => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        r => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    if (called) return;
                    called = true;
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                            called = true;
                reject(error);
            }
        } else {
            resolve(x);
        }
    }
}

/**
 * 测试
 */
ZkPromise.defer = ZkPromise.deferred = function() {
    let df = {};
    df.promise = new ZkPromise((resolve, reject) => {
        df.resolve = resolve;
        df.reject = reject;
    })
    return df;
}
// module.exports = ZkPromise;