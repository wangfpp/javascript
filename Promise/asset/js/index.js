// let p = new ZkPromise((resolve, reject) => {
//         // reject(1111);
//         setTimeout(() => {
//             resolve(111);
//         }, 2000)
// })
// .then(
//     res => {
//         console.log(res);
//     },
//     err => {
//         console.log(err);
        
//     }
// )
// .then(res => {
//     console.log("Second promise resolve:" + res);
// }, err => {
//     console.log("Second promise reject:" + err);
// })

// console.log(p);

let p = new ZkPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("aaa");
    }, 3000);
})
let p2 = new ZkPromise((resolve, reject) => {
    setTimeout(() => {
        reject("111");
    }, 50);
})

let p3 = new ZkPromise((resolve, reject) => {
    setTimeout(() => {
        reject(1000);
    }, 100);
})
// setTimeout(() => {console.log(p)}, 3000);
ZkPromise.race([p, p2, p3]).then(res => {
    console.log(res);
}, err => {
    console.log(err);
})


// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111);
//     }, 2000);
// }).then(res => {
//     console.log("原生promise正确回调:" + res);
// }, err => {
//     console.log("原生promise错误回调:" + err);
//     // return new Promise()
// }).then(res => {
//     console.log("第二层 reslve:" + res);
// }, err => {
//     console.log("第二层rekject" + err);
// })