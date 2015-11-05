// Copyright 2014 Cognitect. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide("com.cognitect.transit.eq");
goog.require("com.cognitect.transit.util");

goog.scope(function() {

var eq   = com.cognitect.transit.eq,
    util = com.cognitect.transit.util;

/**
 * @const
 * @type {string}
 */
eq.hashCodeProperty = "transit$hashCode$";

/**
 * @type {number}
 */
eq.hashCodeCounter = 1;

eq.equals = function (x, y) {
    if(x == null) {
        return y == null;
    } else if(x === y) {
        return true;
    } else if(typeof x === "object") {
        if(util.isArray(x)) {
            if(util.isArray(y)) {
                if(x.length === y.length) {
                    for(var i = 0; i < x.length; i++) {
                        if(!eq.equals(x[i], y[i])) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if(x.com$cognitect$transit$equals) {
            return x.com$cognitect$transit$equals(y);
        } else if((y != null) && (typeof y === "object")) {
            if(y.com$cognitect$transit$equals) {
                return y.com$cognitect$transit$equals(x);
            } else {
                var xklen = 0,
                    yklen = util.objectKeys(y).length;
                for(var p in x) {
                    if(!x.hasOwnProperty(p)) continue;
                    xklen++;
                    if(!y.hasOwnProperty(p)) {
                        return false;
                    } else {
                        if(!eq.equals(x[p], y[p])) {
                            return false;
                        }
                    }
                }
                return xklen === yklen;
            }
        } else {
            return false;
        }
    } else {
        return false
    }
};

eq.hashCombine = function(seed, hash) {
    return seed ^ (hash + 0x9e3779b9 + (seed << 6) + (seed >> 2));
};

eq.stringCodeCache     = {};
eq.stringCodeCacheSize = 0;

/**
 * @const
 * @type {number}
 */
eq.STR_CACHE_MAX       = 256;

eq.hashString = function(str) {
    // a la goog.string.HashCode
    // http://docs.closure-library.googlecode.com/git/local_closure_goog_string_string.js.source.html#line1206
    var cached = eq.stringCodeCache[str];
    if(cached != null) {
        return cached;
    }
    var code = 0;
    for (var i = 0; i < str.length; ++i) {
        code = 31 * code + str.charCodeAt(i);
        code %= 0x100000000;
    }
    eq.stringCodeCacheSize++;
    if(eq.stringCodeCacheSize >= eq.STR_CACHE_MAX) {
        eq.stringCodeCache = {};
        eq.stringCodeCacheSize = 1;
    }
    eq.stringCodeCache[str] = code;
    return code;
};

eq.hashMapLike = function(m) {
    var code = 0;
    // ES6 Map-like case
    if(m.forEach != null) {
        m.forEach(function(val, key, m) {
            code = (code + (eq.hashCode(key) ^ eq.hashCode(val))) % 4503599627370496;
        });
    } else {
        // JS Object case
        var keys = util.objectKeys(m);
        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var val = m[key];
            code = (code + (eq.hashCode(key) ^ eq.hashCode(val))) % 4503599627370496;
        }
    }
    return code;
};

eq.hashArrayLike = function(arr) {
    var code = 0;
    if(util.isArray(arr)) {
        for(var i = 0; i < arr.length; i++) {
            code = eq.hashCombine(code, eq.hashCode(arr[i]));
        }
    } else if(arr.forEach) {
        arr.forEach(function(x, i) {
            code = eq.hashCombine(code, eq.hashCode(x));
        });
    }
    return code;
};

eq.hashCode = function(x) {
    if(x == null) {
        return 0;
    } else {
        switch(typeof x) {
        case 'number':
            return x;
            break;
        case 'boolean':
            return x === true ? 1 : 0;
            break;
        case 'string':
            return eq.hashString(x);
            break;
        case 'function':
            var code = x[eq.hashCodeProperty];
            if(code) {
                return code;
            } else {
                code = eq.hashCodeCounter;
                if(typeof Object.defineProperty != "undefined") {
                    Object.defineProperty(x, eq.hashCodeProperty, {
                        value: code,
                        enumerable: false
                    });
                } else {
                    x[eq.hashCodeProperty] = code;
                }
                eq.hashCodeCounter++;    
                return code;
            }
            break;
        default:
            if(x instanceof Date) {
                return x.valueOf();
            } else if(util.isArray(x)) {
                return eq.hashArrayLike(x);
            } if(x.com$cognitect$transit$hashCode) {
                return x.com$cognitect$transit$hashCode();
            } else {
                return eq.hashMapLike(x);
            }
            break;
        }
    }
}

eq.extendToEQ = function(obj, opts) {
    obj.com$cognitect$transit$hashCode = opts["hashCode"];
    obj.com$cognitect$transit$equals = opts["equals"];
    return obj;
}

});
