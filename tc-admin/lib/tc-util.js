/**
 * P: TcUtil, some utils for application
 */
var TcUtil = {};

TcUtil.extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
        for (var prop in source) {
            target[prop] = source[prop]
        }
    });

    return target;
};

TcUtil.log = function(exp, msg) {
    console.log("=========================")
    if (msg !== undefined) {
        console.log(msg)
    }
    console.log(exp);
};

TcUtil.debug = function(exc) {
    console.log("=========================")
    console.log(exc)
    var stack = new Error().stack;
    console.log(stack);
};


TcUtil.clone = function(obj) {
    if (null === obj || obj instanceof Object) {
        return obj;
    }
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = TcUtil.clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = TcUtil.clone(obj[attr]);
        }
        return copy;
    }
};

module.exports = TcUtil;