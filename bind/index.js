if(!Function.prototype.mybind) {
    Function.prototype.mybind = function() {
        /**
         * 1.　拿到当前的执行函数
         * 2.　拿到需要绑定的this
         * 3. 　拿到参数列表
         */
        var args = Array.prototype.slice.call(arguments);
        var bind_this = args.shift();
        var curr_this = this;
        return function() {
            var concat_args = args.concat(Object.values(arguments));
            // 这里加return函数可能有返回值
            return curr_this.apply(bind_this, concat_args);
        }
    }
}


var obj = {
    a: 1,
    sayname: function(val) {
        return function(name) {
            console.log(val, name);
            console.log(`my name is :${name}, i have number: ${val}`)
        }
    }
}

var fn = obj.sayname
var result = fn.mybind(obj, "222")()("wangfpp");
console.log(result);
