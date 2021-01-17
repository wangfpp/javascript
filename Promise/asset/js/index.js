new ZkPromise((resolve, reject) => {
    resolve("aaaa");
    // reject(aaa)
}).then(res => {
    console.log("Promise Resolve:" + res);
})

// console.log(p);