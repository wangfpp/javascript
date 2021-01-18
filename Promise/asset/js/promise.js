class ZkPromise {
    /**
     * @param {Function} exector Promise的执行体 内部含有resolve reject两个函数 
     */
    // 给Promise传递一个函数exector 这个函数内部有两个参数  两个参数分别是resolve reject两个函数
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(exector) {
        this.status = ZkPromise.PENDING;
        this.value = null;
        this.reason = null;
        this.pendingTask = [];
        // try为了捕获在Promise内的代码错误捕获到错误后直接执行reject
        try {
            exector(this.resolve.bind(this), this.reject.bind(this));
        } catch(err) {
            this.reject(err);
        }
    }

    resolve(value) {
        if (this.status === ZkPromise.PENDING) {
            this.status = ZkPromise.FULFILLED;
            this.value = value;
            this.pendingTask.forEach(task => {
                let { onFulfilled } = task;
                setTimeout(() => {
                    onFulfilled(value);
                })
            })
        }
    }

    reject(reason) {
        if (this.status === ZkPromise.PENDING) {
            this.status = ZkPromise.REJECTED;
            this.value = reason;
            this.pendingTask.forEach(task => {
                let { onRejected } = task;
                setTimeout(() => {
                    onRejected(reason);
                })
            })
        }
    }

    then(onFulfilled, onRejected) {
        // 以下的两个判断解决 then内的方法可以不传
        // 重新学习一下typeof !!!!!
        if (typeof onFulfilled  !== "function"){
            onFulfilled = () => this.value
            // 返回this.value 解决then的穿透 可以组成往下传递上层的值
        }
        if (typeof onRejected  !== "function"){
            onRejected = () => this.value;
        }
        // 这里加一个返回Promise是为了解决链式调用的返回
        let resultPromise = new ZkPromise((resolve, reject) => {
            // Pending 时有异步任务需要把任务存储 在resolve和reject中再去执行具体任务
            if (this.status === ZkPromise.PENDING) {
                this.pendingTask.push({
                    onFulfilled: value => {
                        try{
                            let result = onFulfilled(value);
                            this.resolveResult(resultPromise, result, resolve, reject);
                        } catch(err) {
                            reject(err);
                        }
                    },
                    onRejected: reason => {
                        try{
                            let result = onRejected(reason);
                            this.resolveResult(resultPromise, result, resolve, reject);
                        } catch(err) {
                            reject(err);
                        }
                    }
                })
            }

            // 要解决onFulfilled 和onRejected中的代码错误捕获
            // setTimeout 解决异步事件输出
            if (this.status === ZkPromise.FULFILLED) {
                setTimeout(() => {
                    try{
                        let result = onFulfilled(this.value);
                        this.resolveResult(resultPromise, result, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            }
            if(this.status === ZkPromise.REJECTED) {
                setTimeout(() => {
                    try{
                        let result = onRejected(this.value);
                        this.resolveResult(resultPromise, result, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            }
        })
        return resultPromise;
    }
    resolveResult(originPromise, result, resolve, reject) {
        if (originPromise === result) {
            throw TypeError("Chaining cycle detected for promise #<Promise>");
        } else {
            try {
                if (result instanceof ZkPromise) {
                    result.then(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                } else {
                    resolve(result);
                }
                // 上一个Promise不管是resolve还是reject只要有返回值则进入第二个Promise的resolve
            } catch (err) {
                reject(err);
            }
        }
        
    }
    static resolve(value) {
        return new ZkPromise((resolve, reject) => {
            if(value instanceof ZkPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }

    static reject(value) {
        return new ZkPromise((resolve, reject) => {
            if(value instanceof ZkPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }

    static all(promises) {
        let map = {};
        return new ZkPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(res => {
                    map[index] = res; // 这里保证输出的顺序
                    if (Object.keys(map).length === promises.length) {
                        resolve(Object.values(map));
                    }
                }, err => {
                    reject(err);
                })
            })
        })
    }
    
    static race(promises) {
        return new ZkPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            })
        })
    }
}
ZkPromise.defer = ZkPromise.deferred = function() {
    let df = {};
    df.promise = new ZkPromise((resolve, reject) => {
        df.resolve = resolve;
        df.reject = reject;
    })
    return df;
}
module.exports = ZkPromise;
