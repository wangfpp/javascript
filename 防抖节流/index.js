/**
    *防抖函数的几个关键点 
    * 1. 连续的事件触发需要清空定时器
    * 2. 返回的函数不能使用箭头函数 箭头函数找不到其真实的this
    * 3. 
    **/


/**
 * @description 防抖函数
 * @param { Function } fn 需要防抖的函数
 * @param { Number } wait 间隔的时间
 * @param { Boolean } immediate 首次触发是否立即执行
 * @return Function
 * */
function debounce(fn, wait, immediate = false) {
    let timeout;
    wait = wait || 300;
    let resultFn =  function() {
        let context = this;
        let after = function(args) {
            fn.apply(context, args);
        }
        if (immediate && !timeout) {
            after(arguments);
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            after(arguments);
        }, wait);
    }
    // 取消防抖 不再计时
    resultFn.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return resultFn;
}


/**
 * @description 节流函数 每隔一段时间触发一次函数 
 * @param { Function } fn 要触发的函数
 * @param { Number } wait 间隔的时间
 * @param { Object } option 配置参数
 **/

 /***
  * 自测 true true  通过
  *     true false 通过
  *     false false 
  *     false true  通过
  */
function throttle(fn, wait, option={start: true, end: true}) {
    let init_time = 0, timeout; 
    let { start, end } = option;
    let resultFn = function() {
        let context = this;
        let args = arguments;
        let later = function() {
            fn.apply(context, args);
        }
        let cancelEnd = function() {
            if (end) {
                timeout = setTimeout(() => {
                    later();
                    clearTimeout(timeout);
                }, wait)
            } else {
                clearTimeout(timeout);
            }
        }
        current_time = new Date().getTime();
        if (current_time - init_time > wait) {
            init_time = current_time;
            if (start) {
                if (!timeout) {
                    later();
                }
                cancelEnd();
            } else {
                cancelEnd();
            }
        }
    }
    resultFn.cancel = function() {
        init_time = 0;
        clearTimeout(timeout);
        timeout = null;
    }
    return resultFn
}