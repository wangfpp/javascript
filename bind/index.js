if(!Function.prototype.mybind){
    (function() {
        Function.prototype.mybind = function(context) {
            /**
             * 1.　拿到当前的执行函数
             * 2.　拿到需要绑定的this
             * 3. 　拿到参数列表
             */
            if (typeof this !== "function" ) {
                throw TypeError("类型错误");
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var curr_this = this;
            let newfn =  function() {
                var concat_args = args.concat(Object.values(arguments));
                if (this instanceof newfn) {
                    //　使用new的情况
                    return curr_this.apply(this, concat_args);
                } else {
                    // 这里加return函数可能有返回值
                     return curr_this.apply(context, concat_args);
                }
            }
            var o = function() {};
            o.prototype = curr_this.prototype;
            newfn.prototype = new o();
            newfn.prototype.constructor = o.prototype;
            return newfn;
        }
    })();
} 


var obj = {
    a: 1,
    name: "wangfpp",
    sayname: function(val) {
        return function(name) {
            console.log(val, name);
            console.log(`my name is :${name}, i have number: ${val}`)
        }
    }
}
function Person(name) {
    console.log(this);
    console.log(name);
    console.log(this.name);
}

Person.prototype.name = "哈哈哈";

var fn = Person.mybind(obj);
var a = new fn;
console.log(a);
