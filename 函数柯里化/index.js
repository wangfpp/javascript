function add(...args) {
    return args.reduce((pre, next) => {
        return pre + next;
    }, 0)
}

function curryAdd(fn) {
    let args = Array.prototype.slice.call(arguments, 1);
    let arr = [...args];
    return function () {
        let innerArgs = [...arguments];
        arr = [...arr, ...innerArgs];
        if (innerArgs.length) {
            return curryAdd.call(this, fn, ...arr);
        } else {
            return fn(...arr)
        }
    }
}
let sum = curryAdd(add,10)(1)(2,3)(3, 4, 5)();
