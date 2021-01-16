### 防抖和节流


#### 防抖函数
在连续触发事件的过程中不执行响应的逻辑,只有停止触发后一定时间才触发函数

1. 连续触发不执行响应逻辑
2. 停止触发后一段时间才执行
3. 执行过程中的this指向问题


```javascript
setTimeout(fn, wait) // 停止一段时间才触发函数
// 如果连续触发则清空上次的setTimeout
return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fn();
    }, wait)
}

// this指向问题
return function() {
    let context = this,
    args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fn.apply(context, args);
    }, wait)
}
```


#### 节流函数
连续触发事件的情况下每隔一定时间才触发一次事件,减少网络请求

1. 连续触发的事件
2. 每隔一定时间触发一次
   
```javascript
let time = 0;
return function() {
    let context = this,
    args = arguments;
    let now = new Date().getTime();
    if (now - time > wait) {
        time = now;
        fn.apply(context, args);
    }
}
```