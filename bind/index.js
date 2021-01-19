if(!Function.prototype.mybind) {
    Function.prototype.mybind = function() {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 1);
        var curr_fn = this;
        var bind_this = arguments[0];
        return function() {
            console.log(arguments);
            var concat_args = args.concat(Object.values(arguments));
            console.log(concat_args);
            return curr_fn.apply(bind_this, concat_args);
        }
    }
}


var obj = {
    a: 1,
    sayname: function(val) {
        console.log(this.a);
        console.log(val);
    }
}

var fn = obj.sayname
fn.mybind(obj, "222", 333)(100, 200)