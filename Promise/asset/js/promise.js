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
        }
    }

    reject(reason) {
        if (this.status === ZkPromise.PENDING) {
            this.status = ZkPromise.REJECTED;
            this.value = reason;
        }
    }
    then(onFulfilled, onRejected) {
        console.log(this);
       
        // 以下的两个判断解决 then内的方法可以不传
        // 重新学习一下typeof !!!!!
        if (typeof onFulfilled  !== "function"){
            onFulfilled = this.noop
        }
        if (typeof onRejected  !== "function"){
            onRejected = this.noop
        }
        if (this.status === ZkPromise.FULFILLED) {
            onFulfilled(this.value);
        }
        if(this.status === ZkPromise.REJECTED) {
            onRejected(this.value);
        }
    }
    noop() {}
}
