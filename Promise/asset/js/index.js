let p = new ZkPromise((resolve, reject) => {
        // reject(1111);
        setTimeout(() => {
            resolve(111);
        }, 2000)
})
.then(
    res => {
        let p2 = p.then(res => {
            return p2;
        })
    },
    err => {
        console.log(aaa);
        
    }
)
.then(res => {
    console.log("Second promise resolve:" + res);
}, err => {
    console.log("Second promise reject:" + err);
})

console.log(p);



// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111);
//     }, 2000);
// }).then(res => {
//     console.log("原生promise正确回调:" + res);
//     let p3 = p2.then(res => {
//         return p3;
//     })
// }, err => {
//     console.log("原生promise错误回调:" + err);
//     // return new Promise()
// }).then(res => {
//     console.log("第二层 reslve:" + res);
// }, err => {
//     console.log("第二层rekject" + err);
// })