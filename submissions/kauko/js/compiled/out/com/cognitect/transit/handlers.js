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

goog.provide("com.cognitect.transit.handlers");
goog.require("com.cognitect.transit.util");
goog.require("com.cognitect.transit.types");
goog.require("goog.math.Long");

goog.scope(function() {

var handlers = com.cognitect.transit.handlers,
    util     = com.cognitect.transit.util,
    types    = com.cognitect.transit.types,
    Long     = goog.math.Long;

handlers.ctorGuid = 0;

/**
 * @const
 * @type {string}
 */
handlers.ctorGuidProperty = "transit$guid$" + util.randomUUID();

handlers.typeTag = function(ctor) {
    if(ctor == null) {
        return "null";
    } else if(ctor === String) {
        return "string";
    } else if(ctor === Boolean) {
        return "boolean";
    } else if(ctor === Number) {
        return "number";
    } else if(ctor === Array) {
        return "array";
    } else if(ctor === Object) {
        return "map";
    } else {
        var tag = ctor[handlers.ctorGuidProperty];
        if(tag == null) {
            if(typeof Object.defineProperty != "undefined") {
                tag = ++handlers.ctorGuid;
                Object.defineProperty(ctor, handlers.ctorGuidProperty, {
                    value: tag,
                    enumerable: false
                });
            } else {
                ctor[handlers.ctorGuidProperty] = tag = ++handlers.ctorGuid;
            }
        }
        return tag;
    }
};

handlers.constructor = function(x) {
    if(x == null) {
        return null;
    } else {
        return x.constructor;
    }
};

handlers.padZeros = function(n,m) {
    var s = n.toString();
    for(var i = s.length; i < m; i++) {
        s = "0"+s;
    }
    return s;
};

handlers.stringableKeys = function(m) {
    var stringable = false,
    ks = util.objectKeys(m);

    for(var i = 0; i < ks.length; i++) {
    }

    return true;
};

/**
 * @constructor
 */
handlers.NilHandler = function(){};
handlers.NilHandler.prototype.tag = function(v) { return "_"; };
handlers.NilHandler.prototype.rep = function(v) { return null; };
handlers.NilHandler.prototype.stringRep = function(v) { return "null"; };

/**
 * @constructor
 */
handlers.StringHandler = function(){};
handlers.StringHandler.prototype.tag = function(v) { return "s"; };
handlers.StringHandler.prototype.rep = function(v) { return v; };
handlers.StringHandler.prototype.stringRep = function(v) { return v; };

/**
 * @constructor
 */
handlers.NumberHandler = function(){};
handlers.NumberHandler.prototype.tag = function(v) { return "i"; };
handlers.NumberHandler.prototype.rep = function(v) { return v; };
handlers.NumberHandler.prototype.stringRep = function(v) { return v.toString(); };

/**
 * @constructor
 */
handlers.IntegerHandler = function(){};
handlers.IntegerHandler.prototype.tag = function(v) { return "i"; };
handlers.IntegerHandler.prototype.rep = function(v) { return v.toString(); };
handlers.IntegerHandler.prototype.stringRep = function(v) { return v.toString(); };

/**
 * @constructor
 */
handlers.BooleanHandler = function(){};
handlers.BooleanHandler.prototype.tag = function(v) { return "?"; };
handlers.BooleanHandler.prototype.rep = function(v) { return v; };
handlers.BooleanHandler.prototype.stringRep = function(v) { return v.toString(); };

/**
 * @constructor
 */
handlers.ArrayHandler = function(){};
handlers.ArrayHandler.prototype.tag = function(v) { return "array"; };
handlers.ArrayHandler.prototype.rep = function(v) { return v; };
handlers.ArrayHandler.prototype.stringRep = function(v) { return null; };

/**
 * @constructor
 */
handlers.MapHandler = function(){};
handlers.MapHandler.prototype.tag = function(v) { return "map"; };
handlers.MapHandler.prototype.rep = function(v) { return v; };
handlers.MapHandler.prototype.stringRep = function(v) { return null; };

/**
 * @constructor
 */
handlers.VerboseDateHandler = function(){};
handlers.VerboseDateHandler.prototype.tag = function(v) { return "t"; };
handlers.VerboseDateHandler.prototype.rep = function(v) {
    return v.getUTCFullYear()+"-"+handlers.padZeros(v.getUTCMonth()+1,2)+"-"+
           handlers.padZeros(v.getUTCDate(),2)+"T"+handlers.padZeros(v.getUTCHours(),2)+":"+
           handlers.padZeros(v.getUTCMinutes(),2)+":"+handlers.padZeros(v.getUTCSeconds(),2)+"."+
           handlers.padZeros(v.getUTCMilliseconds(),3)+"Z";
};
handlers.VerboseDateHandler.prototype.stringRep = function(v, h) {
    return h.rep(v);
};

/**
 * @constructor
 */
handlers.DateHandler = function(){};
handlers.DateHandler.prototype.tag = function(v) { return "m"; };
handlers.DateHandler.prototype.rep = function(v) { return v.valueOf(); };
handlers.DateHandler.prototype.stringRep = function(v) { return v.valueOf().toString(); };
handlers.DateHandler.prototype.getVerboseHandler = function(v) {
    return new handlers.VerboseDateHandler();
};

/**
 * @constructor
 */
handlers.UUIDHandler = function(){};
handlers.UUIDHandler.prototype.tag = function(v) { return "u"; };
handlers.UUIDHandler.prototype.rep = function(v) { return v.toString(); };
handlers.UUIDHandler.prototype.stringRep = function(v) { return v.toString(); };

/**
 * @constructor
 */
handlers.KeywordHandler = function(){};
handlers.KeywordHandler.prototype.tag = function(v) { return ":"; };
handlers.KeywordHandler.prototype.rep = function(v) { return v.name; }; // NOTE: should be fqn
handlers.KeywordHandler.prototype.stringRep = function(v, h) { return h.rep(v); };

/**
 * @constructor
 */
handlers.SymbolHandler = function(){};
handlers.SymbolHandler.prototype.tag = function(v) { return "$"; };
handlers.SymbolHandler.prototype.rep = function(v) { return v.name; }; // NOTE: should be str
handlers.SymbolHandler.prototype.stringRep = function(v, h) { return h.rep(v); };

/**
 * @constructor
 */
handlers.TaggedHandler = function(){};
handlers.TaggedHandler.prototype.tag = function(v) { return v.tag; };
handlers.TaggedHandler.prototype.rep = function(v) { return v.rep; };
handlers.TaggedHandler.prototype.stringRep = function(v, h) { return null; };

/**
 * @constructor
 */
handlers.TransitSetHandler = function(){};
handlers.TransitSetHandler.prototype.tag = function(v) { return "set"; };
handlers.TransitSetHandler.prototype.rep = function(v) {
    var arr = [];
    v.forEach(function(key, set) {
        arr.push(key);
    });
    return types.taggedValue("array", arr);
};
handlers.TransitSetHandler.prototype.stringRep = function(v, h) { return null; };

/**
 * @constructor
 */
handlers.TransitArrayMapHandler = function(){};
handlers.TransitArrayMapHandler.prototype.tag = function(v) { return "map"; };
handlers.TransitArrayMapHandler.prototype.rep = function(v) { return v; };
handlers.TransitArrayMapHandler.prototype.stringRep = function(v, h) { return null; };

/**
 * @constructor
 */
handlers.TransitMapHandler = function(){};
handlers.TransitMapHandler.prototype.tag = function(v) { return "map"; };
handlers.TransitMapHandler.prototype.rep = function(v) { return v; };
handlers.TransitMapHandler.prototype.stringRep = function(v, h) { return null; };

/**
 * @constructor
 */
handlers.BufferHandler = function() {};
handlers.BufferHandler.prototype.tag = function(v) { return "b"; };
handlers.BufferHandler.prototype.rep = function(v) { return v.toString("base64"); };
handlers.BufferHandler.prototype.stringRep = function(v, h) { return null; };

/**
 * @constructor
 */
handlers.Uint8ArrayHandler = function() {};
handlers.Uint8ArrayHandler.prototype.tag = function(v) { return "b"; };
handlers.Uint8ArrayHandler.prototype.rep = function(v) { return util.Uint8ToBase64(v); };
handlers.Uint8ArrayHandler.prototype.stringRep = function(v, h) { return null; };

handlers.defaultHandlers = function(hs) {
    hs.set(null, new handlers.NilHandler());
    hs.set(String, new handlers.StringHandler());
    hs.set(Number, new handlers.NumberHandler());
    hs.set(Long, new handlers.IntegerHandler());
    hs.set(Boolean, new handlers.BooleanHandler());
    hs.set(Array, new handlers.ArrayHandler());
    hs.set(Object, new handlers.MapHandler());
    hs.set(Date, new handlers.DateHandler());
    hs.set(types.UUID, new handlers.UUIDHandler());
    hs.set(types.Keyword, new handlers.KeywordHandler());
    hs.set(types.Symbol, new handlers.SymbolHandler());
    hs.set(types.TaggedValue, new handlers.TaggedHandler());
    hs.set(types.TransitSet, new handlers.TransitSetHandler());
    hs.set(types.TransitArrayMap, new handlers.TransitArrayMapHandler());
    hs.set(types.TransitMap, new handlers.TransitMapHandler());

    if(typeof Buffer != "undefined") {
        hs.set(Buffer, new handlers.BufferHandler());
    }

    if(typeof Uint8Array != "undefined") {
        hs.set(Uint8Array, new handlers.Uint8ArrayHandler());
    }

    return hs;
};

/**
 * @constructor
 */
handlers.Handlers = function() {
    this.handlers = {};
    handlers.defaultHandlers(this);
};

handlers.Handlers.prototype.get = function(ctor) {
    var h = null;
    if(typeof ctor === "string") {
        h = this.handlers[ctor];
    } else {
        h = this.handlers[handlers.typeTag(ctor)];
    }
    if(h != null) {
        return h;
    } else {
        return this.handlers["default"];
    }
};
handlers.Handlers.prototype["get"] = handlers.Handlers.prototype.get;

handlers.validTag = function(tag) {
    switch(tag) {
        case "null":
        case "string":
        case "boolean":
        case "number":
        case "array":
        case "map":
        return false;
        break;
    }
    return true;
};

handlers.Handlers.prototype.set = function(ctor, handler) {
    if(typeof ctor === "string" && handlers.validTag(ctor)) {
        this.handlers[ctor] = handler;
    } else {
        this.handlers[handlers.typeTag(ctor)] = handler;
    }
};

});    
