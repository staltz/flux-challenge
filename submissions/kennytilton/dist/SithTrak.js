var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, d, e) {
  c != Array.prototype && c != Object.prototype && (c[d] = e.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var c = 0;
  return function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + c++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var c = $jscomp.global.Symbol.iterator;
  c || (c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[c] && $jscomp.defineProperty(Array.prototype, c, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(c) {
  var d = 0;
  return $jscomp.iteratorPrototype(function() {
    return d < c.length ? {done:!1, value:c[d++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(c) {
  $jscomp.initSymbolIterator();
  c = {next:c};
  c[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return c;
};
$jscomp.makeIterator = function(c) {
  $jscomp.initSymbolIterator();
  var d = c[Symbol.iterator];
  return d ? d.call(c) : $jscomp.arrayIterator(c);
};
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(c) {
  var d = function() {
  };
  d.prototype = c;
  return new d;
};
$jscomp.underscoreProtoCanBeSet = function() {
  var c = {a:!0}, d = {};
  try {
    return d.__proto__ = c, d.a;
  } catch (e) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(c, d) {
  c.__proto__ = d;
  if (c.__proto__ !== d) {
    throw new TypeError(c + " is not extensible");
  }
  return c;
} : null;
$jscomp.inherits = function(c, d) {
  c.prototype = $jscomp.objectCreate(d.prototype);
  c.prototype.constructor = c;
  if ($jscomp.setPrototypeOf) {
    var e = $jscomp.setPrototypeOf;
    e(c, d);
  } else {
    for (e in d) {
      if ("prototype" != e) {
        if (Object.defineProperties) {
          var f = Object.getOwnPropertyDescriptor(d, e);
          f && Object.defineProperty(c, e, f);
        } else {
          c[e] = d[e];
        }
      }
    }
  }
  c.superClass_ = d.prototype;
};
$jscomp.arrayFromIterator = function(c) {
  for (var d, e = []; !(d = c.next()).done;) {
    e.push(d.value);
  }
  return e;
};
$jscomp.arrayFromIterable = function(c) {
  return c instanceof Array ? c : $jscomp.arrayFromIterator($jscomp.makeIterator(c));
};
$jscomp.polyfill = function(c, d, e, f) {
  if (d) {
    e = $jscomp.global;
    c = c.split(".");
    for (f = 0; f < c.length - 1; f++) {
      var g = c[f];
      g in e || (e[g] = {});
      e = e[g];
    }
    c = c[c.length - 1];
    f = e[c];
    d = d(f);
    d != f && null != d && $jscomp.defineProperty(e, c, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("Array.from", function(c) {
  return c ? c : function(c, e, f) {
    $jscomp.initSymbolIterator();
    e = null != e ? e : function(c) {
      return c;
    };
    var d = [], h = c[Symbol.iterator];
    if ("function" == typeof h) {
      for (c = h.call(c); !(h = c.next()).done;) {
        d.push(e.call(f, h.value));
      }
    } else {
      h = c.length;
      for (var k = 0; k < h; k++) {
        d.push(e.call(f, c[k]));
      }
    }
    return d;
  };
}, "es6", "es3");
$jscomp.iteratorFromArray = function(c, d) {
  $jscomp.initSymbolIterator();
  c instanceof String && (c += "");
  var e = 0, f = {next:function() {
    if (e < c.length) {
      var g = e++;
      return {value:d(g, c[g]), done:!1};
    }
    f.next = function() {
      return {done:!0, value:void 0};
    };
    return f.next();
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
};
$jscomp.polyfill("Array.prototype.keys", function(c) {
  return c ? c : function() {
    return $jscomp.iteratorFromArray(this, function(c) {
      return c;
    });
  };
}, "es6", "es3");
$jscomp.checkStringArgs = function(c, d, e) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + e + " must not be null or undefined");
  }
  if (d instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, e) {
    var d = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var g = d.length, h = c.length;
    e = Math.max(0, Math.min(e | 0, d.length));
    for (var k = 0; k < h && e < g;) {
      if (d[e++] != c[k++]) {
        return !1;
      }
    }
    return k >= h;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(c) {
  return c ? c : function(c, e) {
    return c === e ? 0 !== c || 1 / c === 1 / e : c !== c && e !== e;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(c) {
  return c ? c : function(c, e) {
    var d = this;
    d instanceof String && (d = String(d));
    var g = d.length;
    e = e || 0;
    for (0 > e && (e = Math.max(e + g, 0)); e < g; e++) {
      var h = d[e];
      if (h === c || Object.is(h, c)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(c) {
  return c ? c : function(c, e) {
    return -1 !== $jscomp.checkStringArgs(this, c, "includes").indexOf(c, e || 0);
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.entries", function(c) {
  return c ? c : function() {
    return $jscomp.iteratorFromArray(this, function(c, e) {
      return [c, e];
    });
  };
}, "es6", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var c = {}, d = Object.create(new $jscomp.global.Proxy(c, {get:function(e, f, g) {
      return e == c && "q" == f && g == d;
    }}));
    return !0 === d.q;
  } catch (e) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(c, d) {
  return Object.prototype.hasOwnProperty.call(c, d);
};
$jscomp.polyfill("WeakMap", function(c) {
  function d() {
    if (!c || !Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({}), e = Object.seal({}), f = new c([[d, 2], [e, 3]]);
      if (2 != f.get(d) || 3 != f.get(e)) {
        return !1;
      }
      f.delete(d);
      f.set(e, 4);
      return !f.has(d) && 4 == f.get(e);
    } catch (r) {
      return !1;
    }
  }
  function e(c) {
    $jscomp.owns(c, g) || $jscomp.defineProperty(c, g, {value:{}});
  }
  function f(c) {
    var d = Object[c];
    d && (Object[c] = function(c) {
      e(c);
      return d(c);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (c && $jscomp.ES6_CONFORMANCE) {
      return c;
    }
  } else {
    if (d()) {
      return c;
    }
  }
  var g = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var h = 0, k = function(c) {
    this.id_ = (h += Math.random() + 1).toString();
    if (c) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      c = $jscomp.makeIterator(c);
      for (var d; !(d = c.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  k.prototype.set = function(c, d) {
    e(c);
    if (!$jscomp.owns(c, g)) {
      throw Error("WeakMap key fail: " + c);
    }
    c[g][this.id_] = d;
    return this;
  };
  k.prototype.get = function(c) {
    return $jscomp.owns(c, g) ? c[g][this.id_] : void 0;
  };
  k.prototype.has = function(c) {
    return $jscomp.owns(c, g) && $jscomp.owns(c[g], this.id_);
  };
  k.prototype.delete = function(c) {
    return $jscomp.owns(c, g) && $jscomp.owns(c[g], this.id_) ? delete c[g][this.id_] : !1;
  };
  return k;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(c) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !c || "function" != typeof c || !c.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), e = new c($jscomp.makeIterator([[d, "s"]]));
      if ("s" != e.get(d) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var f = e.entries(), g = f.next();
      if (g.done || g.value[0] != d || "s" != g.value[1]) {
        return !1;
      }
      g = f.next();
      return g.done || 4 != g.value[0].x || "t" != g.value[1] || !f.next().done ? !1 : !0;
    } catch (v) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (c && $jscomp.ES6_CONFORMANCE) {
      return c;
    }
  } else {
    if (d()) {
      return c;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var e = new WeakMap, f = function(c) {
    this.data_ = {};
    this.head_ = k();
    this.size = 0;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var d; !(d = c.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  f.prototype.set = function(c, d) {
    var e = g(this, c);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = d : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:c, value:d}, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(c) {
    c = g(this, c);
    return c.entry && c.list ? (c.list.splice(c.index, 1), c.list.length || delete this.data_[c.id], c.entry.previous.next = c.entry.next, c.entry.next.previous = c.entry.previous, c.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = k();
    this.size = 0;
  };
  f.prototype.has = function(c) {
    return !!g(this, c).entry;
  };
  f.prototype.get = function(c) {
    return (c = g(this, c).entry) && c.value;
  };
  f.prototype.entries = function() {
    return h(this, function(c) {
      return [c.key, c.value];
    });
  };
  f.prototype.keys = function() {
    return h(this, function(c) {
      return c.key;
    });
  };
  f.prototype.values = function() {
    return h(this, function(c) {
      return c.value;
    });
  };
  f.prototype.forEach = function(c, d) {
    for (var e = this.entries(), f; !(f = e.next()).done;) {
      f = f.value, c.call(d, f[1], f[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var g = function(c, d) {
    var f = d && typeof d;
    "object" == f || "function" == f ? e.has(d) ? f = e.get(d) : (f = "" + ++l, e.set(d, f)) : f = "p_" + d;
    var g = c.data_[f];
    if (g && $jscomp.owns(c.data_, f)) {
      for (c = 0; c < g.length; c++) {
        var h = g[c];
        if (d !== d && h.key !== h.key || d === h.key) {
          return {id:f, list:g, index:c, entry:h};
        }
      }
    }
    return {id:f, list:g, index:-1, entry:void 0};
  }, h = function(c, d) {
    var e = c.head_;
    return $jscomp.iteratorPrototype(function() {
      if (e) {
        for (; e.head != c.head_;) {
          e = e.previous;
        }
        for (; e.next != e.head;) {
          return e = e.next, {done:!1, value:d(e)};
        }
        e = null;
      }
      return {done:!0, value:void 0};
    });
  }, k = function() {
    var c = {};
    return c.previous = c.next = c.head = c;
  }, l = 0;
  return f;
}, "es6", "es3");
$jscomp.polyfill("Set", function(c) {
  function d() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !c || "function" != typeof c || !c.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), e = new c($jscomp.makeIterator([d]));
      if (!e.has(d) || 1 != e.size || e.add(d) != e || 1 != e.size || e.add({x:4}) != e || 2 != e.size) {
        return !1;
      }
      var h = e.entries(), k = h.next();
      if (k.done || k.value[0] != d || k.value[1] != d) {
        return !1;
      }
      k = h.next();
      return k.done || k.value[0] == d || 4 != k.value[0].x || k.value[1] != k.value[0] ? !1 : h.next().done;
    } catch (l) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (c && $jscomp.ES6_CONFORMANCE) {
      return c;
    }
  } else {
    if (d()) {
      return c;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var e = function(c) {
    this.map_ = new Map;
    if (c) {
      c = $jscomp.makeIterator(c);
      for (var d; !(d = c.next()).done;) {
        this.add(d.value);
      }
    }
    this.size = this.map_.size;
  };
  e.prototype.add = function(c) {
    this.map_.set(c, c);
    this.size = this.map_.size;
    return this;
  };
  e.prototype.delete = function(c) {
    c = this.map_.delete(c);
    this.size = this.map_.size;
    return c;
  };
  e.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  e.prototype.has = function(c) {
    return this.map_.has(c);
  };
  e.prototype.entries = function() {
    return this.map_.entries();
  };
  e.prototype.values = function() {
    return this.map_.values();
  };
  e.prototype.keys = e.prototype.values;
  e.prototype[Symbol.iterator] = e.prototype.values;
  e.prototype.forEach = function(c, d) {
    var e = this;
    this.map_.forEach(function(f) {
      return c.call(d, f, f, e);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.values", function(c) {
  return c ? c : function() {
    return $jscomp.iteratorFromArray(this, function(c, e) {
      return e;
    });
  };
}, "es8", "es3");
$jscomp.findInternal = function(c, d, e) {
  c instanceof String && (c = String(c));
  for (var f = c.length, g = 0; g < f; g++) {
    var h = c[g];
    if (d.call(e, h, g, c)) {
      return {i:g, v:h};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.findIndex", function(c) {
  return c ? c : function(c, e) {
    return $jscomp.findInternal(this, c, e).i;
  };
}, "es6", "es3");
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(c, d) {
  for (var e = 1; e < arguments.length; e++) {
    var f = arguments[e];
    if (f) {
      for (var g in f) {
        $jscomp.owns(f, g) && (c[g] = f[g]);
      }
    }
  }
  return c;
};
$jscomp.polyfill("Object.assign", function(c) {
  return c || $jscomp.assign;
}, "es6", "es3");
$jscomp.polyfill("String.prototype.repeat", function(c) {
  return c ? c : function(c) {
    var d = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > c || 1342177279 < c) {
      throw new RangeError("Invalid count value");
    }
    c |= 0;
    for (var f = ""; c;) {
      if (c & 1 && (f += d), c >>>= 1) {
        d += d;
      }
    }
    return f;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.find", function(c) {
  return c ? c : function(c, e) {
    return $jscomp.findInternal(this, c, e).v;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(c) {
  return c ? c : function(c, e) {
    var d = $jscomp.checkStringArgs(this, c, "endsWith");
    c += "";
    void 0 === e && (e = d.length);
    e = Math.max(0, Math.min(e | 0, d.length));
    for (var g = c.length; 0 < g && 0 < e;) {
      if (d[--e] != c[--g]) {
        return !1;
      }
    }
    return 0 >= g;
  };
}, "es6", "es3");
var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(c) {
  return void 0 !== c;
};
goog.isString = function(c) {
  return "string" == typeof c;
};
goog.isBoolean = function(c) {
  return "boolean" == typeof c;
};
goog.isNumber = function(c) {
  return "number" == typeof c;
};
goog.exportPath_ = function(c, d, e) {
  c = c.split(".");
  e = e || goog.global;
  c[0] in e || "undefined" == typeof e.execScript || e.execScript("var " + c[0]);
  for (var f; c.length && (f = c.shift());) {
    !c.length && goog.isDef(d) ? e[f] = d : e = e[f] && e[f] !== Object.prototype[f] ? e[f] : e[f] = {};
  }
};
goog.define = function(c, d) {
  if (!COMPILED) {
    var e = goog.global.CLOSURE_UNCOMPILED_DEFINES, f = goog.global.CLOSURE_DEFINES;
    e && void 0 === e.nodeType && Object.prototype.hasOwnProperty.call(e, c) ? d = e[c] : f && void 0 === f.nodeType && Object.prototype.hasOwnProperty.call(f, c) && (d = f[c]);
  }
  goog.exportPath_(c, d);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(c) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide can not be used within a module.");
  }
  if (!COMPILED && goog.isProvided_(c)) {
    throw Error('Namespace "' + c + '" already declared.');
  }
  goog.constructNamespace_(c);
};
goog.constructNamespace_ = function(c, d) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[c];
    for (var e = c; (e = e.substring(0, e.lastIndexOf("."))) && !goog.getObjectByName(e);) {
      goog.implicitNamespaces_[e] = !0;
    }
  }
  goog.exportPath_(c, d);
};
goog.getScriptNonce = function() {
  null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document) || "");
  return goog.cspNonce_;
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function(c) {
  return (c = c.querySelector("script[nonce]")) && (c = c.nonce || c.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(c) ? c : null;
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(c) {
  if (!goog.isString(c) || !c || -1 == c.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw Error("Module " + c + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = c;
  if (!COMPILED) {
    if (goog.isProvided_(c)) {
      throw Error('Namespace "' + c + '" already declared.');
    }
    delete goog.implicitNamespaces_[c];
  }
};
goog.module.get = function(c) {
  if (!COMPILED && c in goog.loadedModules_) {
    if (goog.loadedModules_[c].type != goog.ModuleType.GOOG) {
      throw Error("Can only goog.module.get for goog.modules.");
    }
    if (goog.loadedModules_[c].moduleId != c) {
      throw Error("Cannot goog.module.get by path.");
    }
  }
  return goog.module.getInternal_(c);
};
goog.module.getInternal_ = function(c) {
  if (!COMPILED) {
    if (c in goog.loadedModules_) {
      return goog.loadedModules_[c].exports;
    }
    if (!goog.implicitNamespaces_[c]) {
      return c = goog.getObjectByName(c), null != c ? c : null;
    }
  }
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
};
goog.getModulePath_ = function() {
  return goog.moduleLoaderState_ && goog.moduleLoaderState_.path;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInGoogModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(c) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw c = c || "", Error("Importing test-only code into non-debug environment" + (c ? ": " + c : "."));
  }
};
goog.forwardDeclare = function(c) {
};
COMPILED || (goog.isProvided_ = function(c) {
  return c in goog.loadedModules_ || !goog.implicitNamespaces_[c] && goog.isDefAndNotNull(goog.getObjectByName(c));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(c, d) {
  c = c.split(".");
  d = d || goog.global;
  for (var e = 0; e < c.length; e++) {
    if (d = d[c[e]], !goog.isDefAndNotNull(d)) {
      return null;
    }
  }
  return d;
};
goog.globalize = function(c, d) {
  d = d || goog.global;
  for (var e in c) {
    d[e] = c[e];
  }
};
goog.addDependency = function(c, d, e, f) {
  !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(c, d, e, f);
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(c) {
  goog.global.console && goog.global.console.error(c);
};
goog.isPath_ = function(c) {
  return 0 == c.indexOf("./") || 0 == c.indexOf("../");
};
goog.require = function(c) {
  if (goog.isPath_(c)) {
    if (goog.isInGoogModuleLoader_()) {
      if (!goog.getModulePath_()) {
        throw Error("Current module has no path information. Was it loaded via goog.loadModule without a path argument?");
      }
      c = goog.normalizePath_(goog.getModulePath_() + "/../" + c);
    } else {
      throw Error("Cannot require by path outside of goog.modules.");
    }
  }
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(c);
    if (goog.isProvided_(c)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(c);
      }
    } else {
      if (goog.ENABLE_DEBUG_LOADER) {
        var d = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;
        try {
          goog.debugLoader_.load_(c);
        } finally {
          goog.moduleLoaderState_ = d;
        }
      }
    }
    return null;
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(c) {
  c.instance_ = void 0;
  c.getInstance = function() {
    if (c.instance_) {
      return c.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = c);
    return c.instance_ = new c;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
  if (null == goog.hasBadLetScoping) {
    try {
      var c = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
    } catch (d) {
      c = !1;
    }
    goog.hasBadLetScoping = c;
  }
  return goog.hasBadLetScoping;
};
goog.workaroundSafari10EvalBug = function(c) {
  return "(function(){" + c + "\n;})();\n";
};
goog.loadModule = function(c, d) {
  var e = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, type:goog.ModuleType.GOOG, path:d};
    if (goog.isFunction(c)) {
      var f = c.call(void 0, {});
    } else {
      if (goog.isString(c)) {
        goog.useSafari10Workaround() && (c = goog.workaroundSafari10EvalBug(c)), f = goog.loadModuleFromSource_.call(void 0, c);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var g = goog.moduleLoaderState_.moduleName;
    if (goog.isString(g) && g) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(g, f) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof f && null != f && Object.seal(f);
      var h = {exports:f, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
      goog.loadedModules_[g] = h;
      d && (goog.loadedModules_[d] = h);
    } else {
      throw Error('Invalid module name "' + g + '"');
    }
  } finally {
    goog.moduleLoaderState_ = e;
  }
};
goog.loadModuleFromSource_ = function(c) {
  eval(c);
  return {};
};
goog.normalizePath_ = function(c) {
  c = c.split("/");
  for (var d = 0; d < c.length;) {
    "." == c[d] ? c.splice(d, 1) : d && ".." == c[d] && c[d - 1] && ".." != c[d - 1] ? c.splice(--d, 2) : d++;
  }
  return c.join("/");
};
goog.loadFileSync_ = function(c) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(c);
  }
  try {
    var d = new goog.global.XMLHttpRequest;
    d.open("get", c, !1);
    d.send();
    return 0 == d.status || 200 == d.status ? d.responseText : null;
  } catch (e) {
    return null;
  }
};
goog.transpile_ = function(c, d) {
  var e = goog.global.$jscomp;
  e || (goog.global.$jscomp = e = {});
  var f = e.transpile;
  if (!f) {
    var g = goog.basePath + goog.TRANSPILER, h = goog.loadFileSync_(g);
    if (h) {
      (function() {
        eval(h + "\n//# sourceURL=" + g);
      }).call(goog.global);
      if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) {
        throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
      }
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      e = goog.global.$jscomp;
      f = e.transpile;
    }
  }
  f || (f = e.transpile = function(c, d) {
    goog.logToConsole_(d + " requires transpilation but no transpiler was found.");
    return c;
  });
  return f(c, d);
};
goog.typeOf = function(c) {
  var d = typeof c;
  if ("object" == d) {
    if (c) {
      if (c instanceof Array) {
        return "array";
      }
      if (c instanceof Object) {
        return d;
      }
      var e = Object.prototype.toString.call(c);
      if ("[object Window]" == e) {
        return "object";
      }
      if ("[object Array]" == e || "number" == typeof c.length && "undefined" != typeof c.splice && "undefined" != typeof c.propertyIsEnumerable && !c.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == e || "undefined" != typeof c.call && "undefined" != typeof c.propertyIsEnumerable && !c.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == d && "undefined" == typeof c.call) {
      return "object";
    }
  }
  return d;
};
goog.isNull = function(c) {
  return null === c;
};
goog.isDefAndNotNull = function(c) {
  return null != c;
};
goog.isArray = function(c) {
  return "array" == goog.typeOf(c);
};
goog.isArrayLike = function(c) {
  var d = goog.typeOf(c);
  return "array" == d || "object" == d && "number" == typeof c.length;
};
goog.isDateLike = function(c) {
  return goog.isObject(c) && "function" == typeof c.getFullYear;
};
goog.isFunction = function(c) {
  return "function" == goog.typeOf(c);
};
goog.isObject = function(c) {
  var d = typeof c;
  return "object" == d && null != c || "function" == d;
};
goog.getUid = function(c) {
  return c[goog.UID_PROPERTY_] || (c[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(c) {
  return !!c[goog.UID_PROPERTY_];
};
goog.removeUid = function(c) {
  null !== c && "removeAttribute" in c && c.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete c[goog.UID_PROPERTY_];
  } catch (d) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(c) {
  var d = goog.typeOf(c);
  if ("object" == d || "array" == d) {
    if ("function" === typeof c.clone) {
      return c.clone();
    }
    d = "array" == d ? [] : {};
    for (var e in c) {
      d[e] = goog.cloneObject(c[e]);
    }
    return d;
  }
  return c;
};
goog.bindNative_ = function(c, d, e) {
  return c.call.apply(c.bind, arguments);
};
goog.bindJs_ = function(c, d, e) {
  if (!c) {
    throw Error();
  }
  if (2 < arguments.length) {
    var f = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, f);
      return c.apply(d, e);
    };
  }
  return function() {
    return c.apply(d, arguments);
  };
};
goog.bind = function(c, d, e) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(c, d) {
  var e = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = e.slice();
    d.push.apply(d, arguments);
    return c.apply(this, d);
  };
};
goog.mixin = function(c, d) {
  for (var e in d) {
    c[e] = d[e];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(c) {
  if (goog.global.execScript) {
    goog.global.execScript(c, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        try {
          goog.global.eval("var _evalTest_ = 1;");
        } catch (f) {
        }
        if ("undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch (f) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(c);
      } else {
        var d = goog.global.document, e = d.createElement("SCRIPT");
        e.type = "text/javascript";
        e.defer = !1;
        e.appendChild(d.createTextNode(c));
        d.head.appendChild(e);
        d.head.removeChild(e);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(c, d) {
  if ("." == String(c).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + c);
  }
  var e = function(c) {
    return goog.cssNameMapping_[c] || c;
  }, f = function(c) {
    c = c.split("-");
    for (var d = [], f = 0; f < c.length; f++) {
      d.push(e(c[f]));
    }
    return d.join("-");
  };
  f = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? e : f : function(c) {
    return c;
  };
  c = d ? c + "-" + f(d) : f(c);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(c) : c;
};
goog.setCssNameMapping = function(c, d) {
  goog.cssNameMapping_ = c;
  goog.cssNameMappingStyle_ = d;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(c, d) {
  d && (c = c.replace(/\{\$([^}]+)}/g, function(c, f) {
    return null != d && f in d ? d[f] : c;
  }));
  return c;
};
goog.getMsgWithFallback = function(c, d) {
  return c;
};
goog.exportSymbol = function(c, d, e) {
  goog.exportPath_(c, d, e);
};
goog.exportProperty = function(c, d, e) {
  c[d] = e;
};
goog.inherits = function(c, d) {
  function e() {
  }
  e.prototype = d.prototype;
  c.superClass_ = d.prototype;
  c.prototype = new e;
  c.prototype.constructor = c;
  c.base = function(c, e, h) {
    for (var f = Array(arguments.length - 2), g = 2; g < arguments.length; g++) {
      f[g - 2] = arguments[g];
    }
    return d.prototype[e].apply(c, f);
  };
};
goog.base = function(c, d, e) {
  var f = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !f) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if ("undefined" !== typeof f.superClass_) {
    for (var g = Array(arguments.length - 1), h = 1; h < arguments.length; h++) {
      g[h - 1] = arguments[h];
    }
    return f.superClass_.constructor.apply(c, g);
  }
  if ("string" != typeof d && "symbol" != typeof d) {
    throw Error("method names provided to goog.base must be a string or a symbol");
  }
  g = Array(arguments.length - 2);
  for (h = 2; h < arguments.length; h++) {
    g[h - 2] = arguments[h];
  }
  h = !1;
  for (var k = c.constructor; k; k = k.superClass_ && k.superClass_.constructor) {
    if (k.prototype[d] === f) {
      h = !0;
    } else {
      if (h) {
        return k.prototype[d].apply(c, g);
      }
    }
  }
  if (c[d] === f) {
    return c.constructor.prototype[d].apply(c, g);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(c) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  c.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(c, d) {
  var e = d.constructor, f = d.statics;
  e && e != Object.prototype.constructor || (e = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  e = goog.defineClass.createSealingConstructor_(e, c);
  c && goog.inherits(e, c);
  delete d.constructor;
  delete d.statics;
  goog.defineClass.applyProperties_(e.prototype, d);
  null != f && (f instanceof Function ? f(e) : goog.defineClass.applyProperties_(e, f));
  return e;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(c, d) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return c;
  }
  var e = !goog.defineClass.isUnsealable_(d), f = function() {
    var d = c.apply(this, arguments) || this;
    d[goog.UID_PROPERTY_] = d[goog.UID_PROPERTY_];
    this.constructor === f && e && Object.seal instanceof Function && Object.seal(d);
    return d;
  };
  return f;
};
goog.defineClass.isUnsealable_ = function(c) {
  return c && c.prototype && c.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(c, d) {
  for (var e in d) {
    Object.prototype.hasOwnProperty.call(d, e) && (c[e] = d[e]);
  }
  for (var f = 0; f < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; f++) {
    e = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, e) && (c[e] = d[e]);
  }
};
goog.tagUnsealableClass = function(c) {
  !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (c.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
!COMPILED && goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function() {
  var c = goog.global.document;
  return null != c && "write" in c;
}, goog.isDocumentLoading_ = function() {
  var c = goog.global.document;
  return c.attachEvent ? "complete" != c.readyState : "loading" == c.readyState;
}, goog.findBasePath_ = function() {
  if (goog.isDef(goog.global.CLOSURE_BASE_PATH) && goog.isString(goog.global.CLOSURE_BASE_PATH)) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      var c = goog.global.document, d = c.currentScript;
      c = d ? [d] : c.getElementsByTagName("SCRIPT");
      for (d = c.length - 1; 0 <= d; --d) {
        var e = c[d].src, f = e.lastIndexOf("?");
        f = -1 == f ? e.length : f;
        if ("base.js" == e.substr(f - 7, 7)) {
          goog.basePath = e.substr(0, f - 7);
          break;
        }
      }
    }
  }
}, goog.findBasePath_(), goog.Transpiler = function() {
  this.requiresTranspilation_ = null;
}, goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
  function c(c, d) {
    f ? e[c] = !0 : d() ? e[c] = !1 : f = e[c] = !0;
  }
  function d(c) {
    try {
      return !!eval(c);
    } catch (k) {
      return !1;
    }
  }
  var e = {es3:!1}, f = !1, g = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
  c("es5", function() {
    return d("[1,].length==1");
  });
  c("es6", function() {
    var c = g.match(/Edge\/(\d+)(\.\d)*/i);
    return c && 15 > Number(c[1]) ? !1 : d('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
  });
  c("es6-impl", function() {
    return !0;
  });
  c("es7", function() {
    return d("2 ** 2 == 4");
  });
  c("es8", function() {
    return d("async () => 1, true");
  });
  c("es9", function() {
    return d("({...rest} = {}), true");
  });
  c("es_next", function() {
    return d("({...rest} = {}), true");
  });
  return e;
}, goog.Transpiler.prototype.needsTranspile = function(c, d) {
  if ("always" == goog.TRANSPILE) {
    return !0;
  }
  if ("never" == goog.TRANSPILE) {
    return !1;
  }
  this.requiresTranspilation_ || (this.requiresTranspilation_ = this.createRequiresTranspilation_());
  if (c in this.requiresTranspilation_) {
    return this.requiresTranspilation_[c];
  }
  throw Error("Unknown language mode: " + c);
}, goog.Transpiler.prototype.transpile = function(c, d) {
  return goog.transpile_(c, d);
}, goog.transpiler_ = new goog.Transpiler, goog.protectScriptTag_ = function(c) {
  return c.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
}, goog.DebugLoader_ = function() {
  this.dependencies_ = {};
  this.idToPath_ = {};
  this.written_ = {};
  this.loadingDeps_ = [];
  this.depsToLoad_ = [];
  this.paused_ = !1;
  this.factory_ = new goog.DependencyFactory(goog.transpiler_);
  this.deferredCallbacks_ = {};
  this.deferredQueue_ = [];
}, goog.DebugLoader_.prototype.bootstrap = function(c, d) {
  function e() {
    f && (goog.global.setTimeout(f, 0), f = null);
  }
  var f = d;
  if (c.length) {
    d = [];
    for (var g = 0; g < c.length; g++) {
      var h = this.getPathFromDeps_(c[g]);
      if (!h) {
        throw Error("Unregonized namespace: " + c[g]);
      }
      d.push(this.dependencies_[h]);
    }
    h = goog.require;
    var k = 0;
    for (g = 0; g < c.length; g++) {
      h(c[g]), d[g].onLoad(function() {
        ++k == c.length && e();
      });
    }
  } else {
    e();
  }
}, goog.DebugLoader_.prototype.loadClosureDeps = function() {
  this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}, !1));
  this.loadDeps_();
}, goog.DebugLoader_.prototype.requested = function(c, d) {
  (c = this.getPathFromDeps_(c)) && (d || this.areDepsLoaded_(this.dependencies_[c].requires)) && (d = this.deferredCallbacks_[c]) && (delete this.deferredCallbacks_[c], d());
}, goog.DebugLoader_.prototype.setDependencyFactory = function(c) {
  this.factory_ = c;
}, goog.DebugLoader_.prototype.load_ = function(c) {
  if (this.getPathFromDeps_(c)) {
    var d = this, e = [], f = function(c) {
      var g = d.getPathFromDeps_(c);
      if (!g) {
        throw Error("Bad dependency path or symbol: " + c);
      }
      if (!d.written_[g]) {
        d.written_[g] = !0;
        c = d.dependencies_[g];
        for (g = 0; g < c.requires.length; g++) {
          goog.isProvided_(c.requires[g]) || f(c.requires[g]);
        }
        e.push(c);
      }
    };
    f(c);
    c = !!this.depsToLoad_.length;
    this.depsToLoad_ = this.depsToLoad_.concat(e);
    this.paused_ || c || this.loadDeps_();
  } else {
    throw c = "goog.require could not find: " + c, goog.logToConsole_(c), Error(c);
  }
}, goog.DebugLoader_.prototype.loadDeps_ = function() {
  for (var c = this, d = this.paused_; this.depsToLoad_.length && !d;) {
    (function() {
      var e = !1, f = c.depsToLoad_.shift(), g = !1;
      c.loading_(f);
      var h = {pause:function() {
        if (e) {
          throw Error("Cannot call pause after the call to load.");
        }
        d = !0;
      }, resume:function() {
        e ? c.resume_() : d = !1;
      }, loaded:function() {
        if (g) {
          throw Error("Double call to loaded.");
        }
        g = !0;
        c.loaded_(f);
      }, pending:function() {
        for (var d = [], e = 0; e < c.loadingDeps_.length; e++) {
          d.push(c.loadingDeps_[e]);
        }
        return d;
      }, setModuleState:function(c, d) {
        goog.moduleLoaderState_ = {path:c, type:d, moduleName:"", declareLegacyNamespace:!1};
      }, registerEs6ModuleExports:function(c, d) {
        goog.loadedModules_[c] = {exports:d, type:goog.ModuleType.ES6, moduleId:""};
      }, registerGoogModuleExports:function(c, d) {
        goog.loadedModules_[c] = {exports:d, type:goog.ModuleType.GOOG, moduleId:c};
      }, clearModuleState:function() {
        goog.moduleLoaderState_ = null;
      }, defer:function(d) {
        if (e) {
          throw Error("Cannot register with defer after the call to load.");
        }
        c.defer_(f, d);
      }, areDepsLoaded:function() {
        return c.areDepsLoaded_(f.requires);
      }};
      try {
        f.load(h);
      } finally {
        e = !0;
      }
    })();
  }
  d && this.pause_();
}, goog.DebugLoader_.prototype.pause_ = function() {
  this.paused_ = !0;
}, goog.DebugLoader_.prototype.resume_ = function() {
  this.paused_ && (this.paused_ = !1, this.loadDeps_());
}, goog.DebugLoader_.prototype.loading_ = function(c) {
  this.loadingDeps_.push(c);
}, goog.DebugLoader_.prototype.loaded_ = function(c) {
  for (var d = 0; d < this.loadingDeps_.length; d++) {
    if (this.loadingDeps_[d] == c) {
      this.loadingDeps_.splice(d, 1);
      break;
    }
  }
  for (d = 0; d < this.deferredQueue_.length; d++) {
    if (this.deferredQueue_[d] == c.path) {
      this.deferredQueue_.splice(d, 1);
      break;
    }
  }
  if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
    for (; this.deferredQueue_.length;) {
      this.requested(this.deferredQueue_.shift(), !0);
    }
  }
  c.loaded();
}, goog.DebugLoader_.prototype.areDepsLoaded_ = function(c) {
  for (var d = 0; d < c.length; d++) {
    var e = this.getPathFromDeps_(c[d]);
    if (!e || !(e in this.deferredCallbacks_ || goog.isProvided_(c[d]))) {
      return !1;
    }
  }
  return !0;
}, goog.DebugLoader_.prototype.getPathFromDeps_ = function(c) {
  return c in this.idToPath_ ? this.idToPath_[c] : c in this.dependencies_ ? c : null;
}, goog.DebugLoader_.prototype.defer_ = function(c, d) {
  this.deferredCallbacks_[c.path] = d;
  this.deferredQueue_.push(c.path);
}, goog.LoadController = function() {
}, goog.LoadController.prototype.pause = function() {
}, goog.LoadController.prototype.resume = function() {
}, goog.LoadController.prototype.loaded = function() {
}, goog.LoadController.prototype.pending = function() {
}, goog.LoadController.prototype.registerEs6ModuleExports = function(c, d) {
}, goog.LoadController.prototype.setModuleState = function(c, d) {
}, goog.LoadController.prototype.clearModuleState = function() {
}, goog.LoadController.prototype.defer = function(c) {
}, goog.LoadController.prototype.areDepsLoaded = function() {
}, goog.Dependency = function(c, d, e, f, g) {
  this.path = c;
  this.relativePath = d;
  this.provides = e;
  this.requires = f;
  this.loadFlags = g;
  this.loaded_ = !1;
  this.loadCallbacks_ = [];
}, goog.Dependency.prototype.onLoad = function(c) {
  this.loaded_ ? c() : this.loadCallbacks_.push(c);
}, goog.Dependency.prototype.loaded = function() {
  this.loaded_ = !0;
  var c = this.loadCallbacks_;
  this.loadCallbacks_ = [];
  for (var d = 0; d < c.length; d++) {
    c[d]();
  }
}, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function(c) {
  var d = Math.random().toString(32);
  goog.Dependency.callbackMap_[d] = c;
  return d;
}, goog.Dependency.unregisterCallback_ = function(c) {
  delete goog.Dependency.callbackMap_[c];
}, goog.Dependency.callback_ = function(c, d) {
  if (c in goog.Dependency.callbackMap_) {
    for (var e = goog.Dependency.callbackMap_[c], f = [], g = 1; g < arguments.length; g++) {
      f.push(arguments[g]);
    }
    e.apply(void 0, f);
  } else {
    throw Error("Callback key " + c + " does not exist (was base.js loaded more than once?).");
  }
}, goog.Dependency.prototype.load = function(c) {
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? c.loaded() : c.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var d = goog.global.document;
      if ("complete" == d.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
        if (/\bdeps.js$/.test(this.path)) {
          c.loaded();
          return;
        }
        throw Error('Cannot write "' + this.path + '" after document load');
      }
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
        var e = goog.Dependency.registerCallback_(function(d) {
          goog.DebugLoader_.IS_OLD_IE_ && "complete" != d.readyState || (goog.Dependency.unregisterCallback_(e), c.loaded());
        });
        d.write('<script src="' + this.path + '" ' + (goog.DebugLoader_.IS_OLD_IE_ ? "onreadystatechange" : "onload") + "=\"goog.Dependency.callback_('" + e + '\', this)" type="text/javascript" ' + (goog.Dependency.defer_ ? "defer" : "") + ">\x3c/script>");
      } else {
        var f = d.createElement("script");
        f.defer = goog.Dependency.defer_;
        f.async = !1;
        f.type = "text/javascript";
        var g = goog.getScriptNonce();
        g && (f.nonce = g);
        goog.DebugLoader_.IS_OLD_IE_ ? (c.pause(), f.onreadystatechange = function() {
          if ("loaded" == f.readyState || "complete" == f.readyState) {
            c.loaded(), c.resume();
          }
        }) : f.onload = function() {
          f.onload = null;
          c.loaded();
        };
        f.src = this.path;
        d.head.appendChild(f);
      }
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or seting CLOSURE_NO_DEPS to true."), c.loaded()) : c.pause();
    }
  }
}, goog.Es6ModuleDependency = function(c, d, e, f) {
  goog.Dependency.call(this, c, d, [], e, f);
}, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function(c) {
  function d(c, d) {
    d ? f.write('<script type="module" crossorigin>' + d + "\x3c/script>") : f.write('<script type="module" crossorigin src="' + c + '">\x3c/script>');
  }
  function e(c, d) {
    var e = f.createElement("script");
    e.defer = !0;
    e.async = !1;
    e.type = "module";
    e.setAttribute("crossorigin", !0);
    var g = goog.getScriptNonce();
    g && (e.nonce = g);
    d ? e.textContent = d : e.src = c;
    f.head.appendChild(e);
  }
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? c.loaded() : c.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var f = goog.global.document, g = this;
      if (goog.isDocumentLoading_()) {
        var h = d;
        goog.Dependency.defer_ = !0;
      } else {
        h = e;
      }
      var k = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(k);
        c.setModuleState(g.path, goog.ModuleType.ES6);
      });
      h(void 0, 'goog.Dependency.callback_("' + k + '")');
      h(this.path, void 0);
      var l = goog.Dependency.registerCallback_(function(d) {
        goog.Dependency.unregisterCallback_(l);
        c.registerEs6ModuleExports(g.path, d);
      });
      h(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + l + '", m)');
      var m = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(m);
        c.clearModuleState();
        c.loaded();
      });
      h(void 0, 'goog.Dependency.callback_("' + m + '")');
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), c.pause();
    }
  }
}, goog.TransformedDependency = function(c, d, e, f, g) {
  goog.Dependency.call(this, c, d, e, f, g);
  this.contents_ = null;
}, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function(c) {
  if (!goog.global.CLOSURE_IMPORT_SCRIPT && goog.inHtmlDocument_() && goog.isDocumentLoading_()) {
    var d = goog.global.document, e = this, f = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_(f);
      e.loadImpl_(c);
    });
    d.write('<script type="text/javascript">' + goog.protectScriptTag_('goog.Dependency.callback_("' + f + '");') + "\x3c/script>");
  } else {
    this.loadImpl_(c);
  }
}, goog.TransformedDependency.prototype.loadImpl_ = function(c) {
  function d(d) {
    if (e.contents_) {
      f && c.setModuleState(e.path, goog.ModuleType.ES6);
      try {
        var g = e.contents_;
        e.contents_ = null;
        d ? goog.globalEval(g) : goog.global.document.write('<script type="text/javascript">' + goog.protectScriptTag_(g) + "\x3c/script>");
      } finally {
        f && c.clearModuleState();
      }
      f && goog.global.$jscomp.require.ensure([e.path], function() {
        c.registerEs6ModuleExports(e.path, goog.global.$jscomp.require(e.path));
      });
      c.loaded();
    }
  }
  if (this.contents_ = goog.loadFileSync_(this.path)) {
    if (this.contents_ = this.transform(this.contents_)) {
      this.contents_ += "\n//# sourceURL=" + this.path;
    }
  }
  if (this.contents_) {
    if (goog.global.CLOSURE_IMPORT_SCRIPT) {
      goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, c.loaded()) : c.pause();
    } else {
      var e = this, f = this.loadFlags.module == goog.ModuleType.ES6;
      if (1 < c.pending().length && goog.DebugLoader_.IS_OLD_IE_) {
        c.defer(function() {
          d(!0);
        });
      } else {
        if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_()) {
          var g = goog.global.document;
          c.pause();
          var h = g.onreadystatechange;
          g.onreadystatechange = function() {
            if (g.attachEvent ? "complete" == g.readyState : "interactive" == g.readyState) {
              g.onreadystatechange = h, d(!0), c.resume();
            }
            goog.isFunction(h) && h.apply(void 0, arguments);
          };
        } else {
          d(goog.DebugLoader_.IS_OLD_IE_ || !goog.inHtmlDocument_() || !goog.isDocumentLoading_());
        }
      }
    }
  } else {
    c.pause();
  }
}, goog.TransformedDependency.prototype.transform = function(c) {
}, goog.TranspiledDependency = function(c, d, e, f, g, h) {
  goog.TransformedDependency.call(this, c, d, e, f, g);
  this.transpiler = h;
}, goog.inherits(goog.TranspiledDependency, goog.TransformedDependency), goog.TranspiledDependency.prototype.transform = function(c) {
  return this.transpiler.transpile(c, this.path);
}, goog.GoogModuleDependency = function(c, d, e, f, g, h, k) {
  goog.TransformedDependency.call(this, c, d, e, f, g);
  this.needsTranspile_ = h;
  this.transpiler_ = k;
}, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function(c) {
  this.needsTranspile_ && (c = this.transpiler_.transpile(c, this.path));
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(c + "\n//# sourceURL=" + this.path + "\n") + ', "' + this.path + '");' : 'goog.loadModule(function(exports) {"use strict";' + c + '\n;return exports}, "' + this.path + '");\n//# sourceURL=' + this.path + "\n";
}, goog.DebugLoader_.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.DebugLoader_.prototype.addDependency = function(c, d, e, f) {
  d = d || [];
  c = c.replace(/\\/g, "/");
  var g = goog.normalizePath_(goog.basePath + c);
  f && "boolean" !== typeof f || (f = f ? {module:goog.ModuleType.GOOG} : {});
  e = this.factory_.createDependency(g, c, d, e, f, goog.transpiler_.needsTranspile(f.lang || "es3", f.module));
  this.dependencies_[g] = e;
  for (e = 0; e < d.length; e++) {
    this.idToPath_[d[e]] = g;
  }
  this.idToPath_[c] = g;
}, goog.DependencyFactory = function(c) {
  this.transpiler = c;
}, goog.DependencyFactory.prototype.createDependency = function(c, d, e, f, g, h) {
  if (g.module == goog.ModuleType.ES6) {
    throw Error("ES6 modules are not currently supported by the debug loader.");
  }
  return g.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(c, d, e, f, g, h, this.transpiler) : h ? new goog.TranspiledDependency(c, d, e, f, g, this.transpiler) : g.module == goog.ModuleType.ES6 ? new goog.Es6ModuleDependency(c, d, f, g) : new goog.Dependency(c, d, e, f, g);
}, goog.debugLoader_ = new goog.DebugLoader_, goog.loadClosureDeps = function() {
  goog.debugLoader_.loadClosureDeps();
}, goog.setDependencyFactory = function(c) {
  goog.debugLoader_.setDependencyFactory(c);
}, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function(c, d) {
  goog.debugLoader_.bootstrap(c, d);
});
var Matrix = {Cells:{}};
function clg(c) {
  for (var d = [], e = 0; e < arguments.length; ++e) {
    d[e - 0] = arguments[e];
  }
  console.log(Array.from(d).join(","));
}
window.clg = clg;
function ast(c, d, e) {
  for (var f = [], g = 2; g < arguments.length; ++g) {
    f[g - 2] = arguments[g];
  }
  console.assert.apply(console, [c, void 0 === d ? "anon" : d].concat($jscomp.arrayFromIterable(f)));
}
window.ast = ast;
function find(c, d) {
  if (-1 !== d.indexOf(c)) {
    return c;
  }
}
function eko(c, d) {
  console.log("eko <" + c + "> = " + d.toString());
  return d;
}
function xor(c, d) {
  return c ? !d : d;
}
window.xor = xor;
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function(c) {
    return (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}
window.uuidv4 = uuidv4;
function localStorageLoad(c) {
  var d = Object.keys(window.localStorage || {}), e = [], f = d.length;
  for (clg("lsl sees keys" + d); f--;) {
    d[f].startsWith(c) && e.push(JSON.parse(window.localStorage.getItem(d[f]) || ""));
  }
  return e;
}
function isString(c) {
  return "string" === typeof c;
}
Storage.prototype.setObject = function(c, d) {
  this.setItem(c, JSON.stringify(d));
};
Storage.prototype.getObject = function(c) {
  return (c = this.getItem(c)) && JSON.parse(c);
};
var MISSING = {}, QUEUE_COMPACT_SIZE = 500;
function define(c, d) {
  for (var e in d) {
    var f = Object.getOwnPropertyDescriptor(d, e);
    f.enumerable = !1;
    Object.defineProperty(c, e, f);
  }
}
var ArrayQueue = function() {
  this._head = this.size = 0;
  this._items = [];
};
ArrayQueue.prototype.emptyp = function() {
  return 0 === this.size;
};
ArrayQueue.prototype.push = function(c) {
  this._items.push(c);
  return ++this.size;
};
ArrayQueue.prototype.shift = function() {
  if (this.size) {
    var c = this._items[this._head];
    this._head === QUEUE_COMPACT_SIZE ? (this._items = this._items.slice(this._head + 1), this._head = 0, this.size--) : this._items[this._head++] = MISSING;
    return c;
  }
};
ArrayQueue.prototype.clear = function() {
  this._head = this.size = 0;
  this._items.length = 0;
};
ArrayQueue.prototype.forEach = function(c, d) {
  if (this.size) {
    for (var e = this._head, f = 0; e < this._items.length; e++) {
      var g = this._items[e];
      g !== MISSING && c.call(d, g, f++, this);
    }
  }
};
var Stack = function() {
  var c = function() {
    var c = [];
    return [function() {
      return c.push.apply(c, arguments);
    }, function() {
      return c.pop.apply(c, arguments);
    }, function() {
      return c.length;
    }, function(d) {
      return c.length = d;
    }, function() {
      return c[c.length - 1];
    }, function(d) {
      return c.includes(d);
    }, function() {
      return c;
    }];
  }();
  this.push = c[0];
  this.pop = c[1];
  this.getLength = c[2];
  this.setLength = c[3];
  this.peek = c[4];
  this.includes = c[5];
  this.elts = c[6];
  this.push.apply(this, arguments);
};
Array.prototype.somex = function(c) {
  for (var d = $jscomp.makeIterator(this.entries()), e = d.next(); !e.done; e = d.next()) {
    var f = $jscomp.makeIterator(e.value);
    e = f.next().value;
    f = f.next().value;
    if (e = c(e, f)) {
      return e;
    }
  }
  return null;
};
var causation = new Stack, callStack = new Stack, depender = null, gNotToBe = !1, gCPropDepth = 0, gCDebug = !1, gStop = !1, ppulse = 0;
function gpulse() {
  return ppulse;
}
var gPar = null, onePulsep = !1, dpLogp = !1;
function dataPulseNext(c) {
  onePulsep || (dpLogp && clg("dpnext " + (void 0 === c ? "anon" : c)), ppulse += 1);
  return ppulse;
}
function cellsReset(c) {
  c = void 0 === c ? {} : c;
  gCDebug = c.debug;
  clientQHandler = c.clientQHandler;
  cellsInit();
}
function cellsInit() {
  ppulse = 0;
}
var deferChanges = !1, clientQHandler = null, gCustomPropagator = null, gWithinIntegrity = !1, gSlotObserver = {};
function gSlotObserverDef(c, d) {
  gSlotObserver[c] && clg("gSlotObserverDef overwriting $(slot) observer");
  gSlotObserver[c] = d;
}
var qNotify = new ArrayQueue, qAwaken = new ArrayQueue;
window.qAwaken = qAwaken;
var qClient = new ArrayQueue, qEphemReset = new ArrayQueue, qChange = new ArrayQueue;
function ufbAdd(c, d) {
  c.push(d);
}
function withoutCDependency(c) {
  return function(d) {
    var e = depender;
    depender = null;
    try {
      return c(d);
    } finally {
      depender = e;
    }
  };
}
function withoutIntegrity(c) {
  var d = gWithinIntegrity, e = deferChanges;
  try {
    deferChanges = gWithinIntegrity = !1, c();
  } finally {
    gWithinIntegrity = d, deferChanges = e;
  }
}
function withIntegrity(c, d, e) {
  if (!gStop) {
    if (gWithinIntegrity) {
      if (c) {
        return ufbAdd(c, [d, e]), "deferred-to-ufb";
      }
      e(c, d);
    } else {
      var f = gWithinIntegrity, g = deferChanges;
      gWithinIntegrity = !0;
      deferChanges = !1;
      try {
        gpulse() && c !== qChange || dataPulseNext("cwi");
        var h = e(c, d);
        finBiz(qNotify);
        return h;
      } finally {
        gWithinIntegrity = f, deferChanges = g;
      }
    }
  }
}
window.withIntegrity = withIntegrity;
function withChg(c, d) {
  withIntegrity(qChange, c, d);
}
window.withChg = withChg;
function finBiz(c) {
  for (; c;) {
    switch(c) {
      case qNotify:
        qDo("notify", c);
        qDo("awaken", qAwaken);
        c = qNotify.emptyp() ? qClient : qNotify;
        break;
      case qClient:
        (clientQHandler || qDo)("client", c);
        c = qClient.emptyp() ? qEphemReset : qClient;
        break;
      case qEphemReset:
        qDo("reset empheral", c);
        c = qChange;
        break;
      case qChange:
        if (c = c.shift()) {
          var d = $jscomp.makeIterator(c);
          c = d.next().value;
          d = d.next().value;
          dataPulseNext("change");
          d("change", c);
          c = qNotify;
        } else {
          c = null;
        }
        break;
      default:
        throw "finBiz sees invalid q: " + c.toString();
    }
  }
}
function qDo(c, d) {
  d.forEach(function(d) {
    var e = $jscomp.makeIterator(d);
    d = e.next().value;
    e = e.next().value;
    e(c, d);
  });
  d.clear();
}
$jscomp.initSymbol();
var kUnbound = Symbol("unbound"), kUncurrent = "uncurrent", kValid = "valid", kAwake = "c-awake", kQuiesced = "c-quiesced", kNascent = "nascent", kOptimizedAwayp = "optimized-away", kOptimizeWhenValued = "optimize-when-valued", kOnceAsked = "lazy-once-asked", kUntilAsked = "lazy-until-asked", kAlways = "lazy-always", kObserverUnresolved = "kObserverUnresolved", Cell = function(c, d, e, f, g, h, k) {
  k = void 0 === k ? !e : k;
  this.name = void 0 === h ? "anon" : h;
  this.md = null;
  this.pulseObserved = this.pulseLastChanged = this.pulse = -1;
  this.lazy = null;
  this.callers = new Set;
  this.useds = new Set;
  this.ephemeralp = f;
  this.inputp = e;
  this.observer = g;
  this.optimize = k;
  this.quiesceWith = null;
  this.synapticp = this.slotOwning = !1;
  d ? (this.rule = d, this.pv = kUnbound, this.state = kNascent, this.others = {}) : (this.pv = c, this.state = kValid);
  Object.defineProperty(this, "v", {enumerable:!0, get:this.slotValue, set:this.slotValueSet});
};
Cell.prototype.mx = function() {
  return this.md;
};
Cell.prototype.optimizedAwayp = function() {
  return this.state === kOptimizedAwayp;
};
Cell.prototype.unboundp = function() {
  return this.pv === kUnbound;
};
Cell.prototype.uncurrentp = function() {
  return this.pv === kUncurrent;
};
Cell.prototype.validp = function() {
  return !(this.unboundp() || this.uncurrentp());
};
Cell.prototype.valueState = function() {
  return this.unboundp() ? kUnbound : this.uncurrentp() ? kUncurrent : kValid;
};
Cell.prototype.valueChangedp = function(c, d) {
  return c !== d;
};
Cell.prototype.currentp = function() {
  return this.pulse >= gpulse();
};
Cell.prototype.pulseUpdate = function(c) {
  this.optimizedAwayp() || (ast(gpulse() >= this.pulse), this.pulse = gpulse());
};
Cell.prototype.awaken = function() {
  this.rule ? this.currentp() || this.calcNSet("c-awaken") : gpulse() > this.pulseObserved && (this.observe(kUnbound, "awaken"), this.ephemeralReset());
};
Cell.prototype.slotValue = function() {
  var c = void 0, d = this;
  withIntegrity(null, null, function() {
    var e = d.pv;
    c = d.ensureValueIsCurrent("c-read", null);
    !d.md && d.state === kNascent && gpulse() > d.pulseObserved && (d.state = kAwake, d.observe(e, "cget"), d.ephemeralReset());
  });
  depender && depender.recordDependency(this);
  return c;
};
Cell.prototype.slotValueSet = function(c) {
  var d = this;
  if (deferChanges) {
    debugger;
    throw "Assign to " + this.name + " must be deferred by wrapping it in WITH-INTEGRITY";
  }
  find(this.lazy, [kOnceAsked, kAlways, !0]) ? this.valueAssume(c, null) : withChg(this.name, function() {
    d.valueAssume(c, null);
  });
};
Cell.prototype.recordDependency = function(c) {
  c.optimizedAwayp() || (this.useds.add(c), ast(0 < this.useds.size), c.callerEnsure(this));
};
Cell.prototype.callerEnsure = function(c) {
  this.callers.add(c);
};
Cell.prototype.callerDrop = function(c) {
  this.callers.delete(c);
};
Cell.prototype.ensureValueIsCurrent = function(c, d) {
  if (gNotToBe) {
    return this.validp() ? this.pv : null;
  }
  if (this.currentp()) {
    return this.pv;
  }
  if (!this.inputp || !this.validp() || this.rule && this.optimize === kOptimizeWhenValued && null === this.pv) {
    if (this.md && this.md.mDeadp()) {
      throw "evic: read of dead " + this.name + " of " + this.md.name;
    }
    c = !1;
    if (this.validp()) {
      for (var e = $jscomp.makeIterator(this.useds.values()), f = e.next(); !f.done; f = e.next()) {
        if (f = f.value, f.ensureValueIsCurrent("nested", this), f.pulseLastChanged > this.pulse) {
          c = !0;
          break;
        }
      }
    } else {
      c = !0;
    }
    c ? this.currentp() || this.calcNSet("evic", d) : this.pulseUpdate("valid-uninfluence");
  }
  return this.pv;
};
Cell.prototype.calcNSet = function(c, d) {
  if (callStack.includes(this)) {
    callStack.elts();
    clg("cyclic dependency: about to calculate " + this.name + " already calculating");
    debugger;
  }
  c = this.calcNLink();
  clbug(this, "rawval", c);
  if (!this.optimizedAwayp()) {
    return clbug(this, "assuming ", c, this.useds.size), this.valueAssume(c, null);
  }
};
Cell.prototype.calcNLink = function() {
  var c = depender, d = deferChanges;
  depender = this;
  deferChanges = !0;
  try {
    return callStack.push(this), this.unlinkFromUsed("pre-rule-clear"), this.rule(this);
  } finally {
    callStack.pop(), depender = c, deferChanges = d;
  }
};
Cell.prototype.valueAssume = function(c, d) {
  var e = this, f = this;
  withoutCDependency(function() {
    var g = f.pv, h = f.valueState();
    f.pv = c;
    f.state = kAwake;
    f.md && !f.synapticp && mdSlotValueStore(f.md, f.name, c);
    f.pulseUpdate("sv-assume");
    if ("propagate" === d || -1 === [kValid, kUncurrent].indexOf(h) || f.valueChangedp(c, g)) {
      h = f.rule ? f.optimize : null, h === kOptimizeWhenValued ? f.pv && (f.unlinkFromUsed("opti-when"), e.optimizeAwayMaybe(g)) : h && f.optimizeAwayMaybe(g), "no-propagate" === d || f.optimizedAwayp() || f.propagate(g, f.callers);
    }
  })();
  return c;
};
Cell.prototype.propagate = function(c, d) {
  if (onePulsep) {
    gCustomPropagator && gCustomPropagator(this, c);
  } else {
    this.pulseLastChanged = gpulse();
    var e = depender, f = callStack, g = gCPropDepth, h = deferChanges;
    try {
      this.propagateToCallers(d), (gpulse() > this.pulseObserved || find(this.lazy, [kOnceAsked, kAlways, !0])) && this.observe(c, "propagate"), this.ephemeralReset();
    } finally {
      depender = e, callStack = f, gCPropDepth = g, deferChanges = h;
    }
  }
};
Cell.prototype.propagateToCallers = function(c) {
  if (c.size) {
    var d = this;
    withIntegrity(qNotify, d, function() {
      causation.push(d);
      try {
        for (var e = $jscomp.makeIterator(c.values()), f = e.next(); !f.done; f = e.next()) {
          var g = f.value;
          g.state === kQuiesced || g.currentp() || find(g.lazy, [!0, kAlways, kOnceAsked]) || !g.useds.has(d) || g.calcNSet("propagate");
        }
      } finally {
        causation.pop();
      }
    });
  }
};
Cell.prototype.observerResolve = function() {
  !this.observer && this.md && (this.observer = this.md.slotObserverResolve(this.name));
  return this.observer === kObserverUnresolved ? null : this.observer;
};
Cell.prototype.observe = function(c, d) {
  (d = this.observerResolve()) && d(this.name, this.md, this.pv, c, this);
};
Cell.prototype.ephemeralReset = function() {
  if (this.ephemeralp) {
    var c = this;
    withIntegrity(qEphemReset, this, function() {
      c.pv = null;
    });
  }
};
Cell.prototype.unlinkFromUsed = function(c) {
  c = $jscomp.makeIterator(this.useds.values());
  for (var d = c.next(); !d.done; d = c.next()) {
    d.value.callerDrop(this);
  }
  this.useds.clear();
};
Cell.prototype.mdCellFlush = function() {
};
Cell.prototype.optimizeAwayMaybe = function(c) {
  if (this.rule && !this.useds.size && this.optimize && !this.optimizedAwayp() && this.validp() && !this.synapticp && !this.inputp) {
    this.state = kOptimizedAwayp;
    this.observe(c, "optimized-away");
    this.md && this.mdCellFlush();
    c = $jscomp.makeIterator(this.callers.values());
    for (var d = c.next(); !d.done; d = c.next()) {
      d = d.value, this.callerDrop(d), d.ensureValueIsCurrent("opti-used", this);
    }
  }
};
Cell.prototype.quiesce = function() {
  this.quiesceWith && (clg("quiescing!"), this.quiesceWith(this));
  this.unlinkFromCallers();
  this.unlinkFromUsed("quiesce");
};
Cell.prototype.unlinkFromCallers = function() {
  this.state = kUncurrent;
  for (var c = $jscomp.makeIterator(this.callers.values()), d = c.next(); !d.done; d = c.next()) {
    this.callerDrop(d.value);
  }
  this.callers.clear();
};
Cell.prototype.kidValuesKids = function() {
  var c = this, d = c.md, e = c.pv === kUnbound ? [] : c.pv;
  if (d.kidValues.length > aDistinct(d.kidValues).length) {
    throw "Duplicate IDs not allowed in kidValues: " + d.kidValues.join();
  }
  return d.kidValues.map(function(f) {
    var g = e.findIndex(function(d) {
      return c.md.kidKey(d) === f;
    });
    return -1 === g ? d.kidFactory(c, f) : e[g];
  });
};
Cell.prototype.fm = function(c, d, e) {
  if (c) {
    if (!this.md) {
      throw "Family search attempted from Cell " + this + " lacking md (s/b a Model)";
    }
    return this.md.fm(c, d, e);
  }
};
Cell.prototype.fmUp = function(c, d, e) {
  if (!this.md) {
    throw "fmUp search attempted from Cell " + this + " lacking md (s/b a Model)";
  }
  return this.md.fmUp(c, d, e);
};
Cell.prototype.fmDown = function(c, d, e) {
  if (!this.md) {
    throw "fmDown search attempted from Cell " + this + " lacking md (s/b a Model)";
  }
  return this.md.fmDown(c, e, d);
};
function aDistinct(c) {
  return c.filter(function(c, e, f) {
    return f.indexOf(c) === e;
  });
}
window.Cell = Cell;
Cell.prototype.mx = Cell.prototype.mx;
function mdSlotValueStore(c, d, e) {
}
function clbug(c, d) {
  for (var e = [], f = 1; f < arguments.length; ++f) {
    e[f - 1] = arguments[f];
  }
  c.bug && console.log("clbug> " + c.name + ":" + c.useds.size + ":" + Array.from(e).join(","));
}
function cF(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, c, !1, !1, null), d);
}
window.cF = cF;
function cF1(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, function(d) {
    return withoutCDependency(c)(d);
  }, !1, !1, null), d);
}
function cF_(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, c, !1, !1, null), {lazy:!0}, d);
}
function c_F(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, c, !1, !1, null), {lazy:kUntilAsked}, d);
}
function cFI(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, c, !0, !1, null), d);
}
window.cFI = cFI;
function cI(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(c, null, !0, !1, null), d);
}
window.cI = cI;
function cIe(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(c, null, !0, !0, null), d);
}
function obsDbg(c, d, e, f, g) {
  console.log("obsDbg! " + c + " " + (d ? d.name || d.id : "noMd") + " useds=" + g.useds.size + " new=" + e + " prior=" + (f === kUnbound ? "unbound" : f));
}
function XobsDbg(c, d, e, f, g) {
}
;Matrix.Model = {};
function allArgs(c) {
  return Array.apply(null, c).slice(0);
}
window.allArgs = allArgs;
function cdrArgs(c) {
  return Array.apply(null, c).slice(1);
}
window.cdrArgs = cdrArgs;
function cddrArgs(c) {
  return Array.apply(null, c).slice(2);
}
window.cddrArgs = cddrArgs;
var kAwakening = "md-awakening", kDoomed = "md-doomed", kDead = "md-dead", sid = 0;
window.sid = sid;
var Model = function(c, d, e, f) {
  var g = this;
  f = void 0 === f ? !0 : f;
  this.par = c || gPar;
  this.sid = ++sid;
  this.name = d;
  this.kids = this.mdType = null;
  this.cells = {};
  this.slotObservers = [];
  this.others = {};
  this.state = kNascent;
  this.awakenOnInitp = this.doomed = !1;
  this.adoptCt = 0;
  c = {};
  for (var h in e) {
    c.slot$13 = h, e.hasOwnProperty(c.slot$13) ? (c.value = e[c.slot$13], c.value instanceof Cell ? (c.value.name = c.slot$13, c.value.md = this, this.cells[c.slot$13] = c.value, Object.defineProperty(this, c.slot$13, {enumerable:!0, get:function(c) {
      return function() {
        return c.value.slotValue();
      };
    }(c), set:function(c) {
      return function(d) {
        return c.value.slotValueSet(d);
      };
    }(c)})) : Object.defineProperty(this, c.slot$13, {enumerable:!0, get:function(c) {
      return function() {
        return c.value;
      };
    }(c), set:function(c) {
      return function(e) {
        debugger;
        throw "Slot " + c.slot$13 + " of " + d + " cannot be set to " + e + " because it is not mediated by an input Cell";
      };
    }(c)})) : clg("DBG: yep, islot not hasown ", c.slot$13), c = {value:c.value, slot$13:c.slot$13};
  }
  f && (this.awakenOnInitp ? this.awaken() : withIntegrity(qAwaken, this, function(c) {
    g.awaken();
  }));
};
Model.cname = function() {
  return "Model";
};
Model.prototype.dbg = function() {
  return "MD " + this.mdType + ":" + (this.name || this.sid);
};
Model.prototype.awaken = function() {
  if (this.state !== kNascent) {
    return this;
  }
  this.state = kAwakening;
  for (var c in this.cells) {
    var d = this.cells[c];
    console.assert(d.md, "No md for cell " + d.name + " at md awaken");
    find(d.lazy, [!0, kAlways, kUntilAsked]) || d.awaken();
  }
  this.state = kAwake;
  return this;
};
Model.prototype.slotObserverResolve = function(c) {
  return null;
};
Model.prototype.fmd = function(c, d, e) {
  return this.fm(c, Object.assign({mep:!1, upp:!1, insidep:!0}, e), d);
};
Model.prototype.fm = function(c, d, e) {
  var f = null;
  if (e) {
    var g = this.others[e];
    if (g) {
      return g;
    }
  }
  d = Object.assign({mep:!1, mustp:!0, insidep:!1, upp:!0, wocd:!0}, d);
  g = depender;
  depender = d.wocd ? null : depender;
  try {
    var h = this.fmTv(c, d);
    if (h) {
      f = this.others[e] = h;
    } else {
      if (d.mustp) {
        throw "fget failed what = " + c.toString() + ", id " + this.sid + ", where = " + this.name;
      }
    }
  } finally {
    depender = g;
  }
  return f;
};
Model.prototype.fmUp = function(c, d, e) {
  return this.fm(c, Object.assign({upp:!0, mep:!1}, d), e);
};
Model.prototype.fmDown = function(c, d, e) {
  return this.fm(c, Object.assign({upp:!1, insidep:!0, mep:!1}, d), e);
};
Model.prototype.fmatch = function(c) {
  return "function" === typeof c && c(this) || "string" === typeof c && this.name === c || this === c ? this : null;
};
Model.prototype.fmTv = function(c, d) {
  return d.mep && this.fmatch(c) || d.insidep && this.kids && this.kids.somex(function(e, f) {
    if (e = f !== d.skip && f.fmTv(c, Object.assign({}, d, {upp:!1, mep:!0}))) {
      return e;
    }
  }) || d.upp && this.par && this.par.fmTv(c, Object.assign({}, d, {mep:!0, insidep:!0, skip:this}));
};
Model.prototype.mDeadp = function() {
  return this.state === kDead;
};
window.Model = Model;
Model.prototype.awaken = Model.prototype.awaken;
var isModel = function(c) {
  return c instanceof Model;
};
function mkm(c, d, e, f, g) {
  f = void 0 === f ? null : f;
  g = void 0 === g ? "Model" : g;
  e = Object.assign({}, e, f ? {kids:cKids(f)} : null);
  c = new window[g](c, d, e);
  if (!isModel(c)) {
    throw "mkm made not-modelp";
  }
  return c;
}
window.mkm = mkm;
function mkmu(c, d, e, f, g) {
  f = void 0 === f ? null : f;
  g = void 0 === g ? "Model" : g;
  e = Object.assign({}, e, f ? {kids:cKids(f)} : null);
  c = new window[g](c, d, e, !1);
  if (!isModel(c)) {
    throw "mkm made not-modelp";
  }
  return c;
}
window.mkmu = mkmu;
function pkdFlat(c, d) {
  d = void 0 === d ? [] : d;
  for (var e = 0; e < c.length; ++e) {
    null != c[e] && (c[e] instanceof Array ? pkdFlat(c[e], d) : d.push(c[e]));
  }
  return d;
}
function cKids(c, d) {
  d = void 0 === d ? {} : d;
  return Object.assign(new Cell(null, function(d) {
    if (!isModel(d.md)) {
      throw "ckids c.md not model";
    }
    d = kfExpand(d, c);
    return d instanceof Array ? pkdFlat(d) : [d];
  }, !1, !1, null), d);
}
window.cKids = cKids;
var kfExpandFinal = function(c) {
  return null === c || isString(c) || isModel(c) || c instanceof Array && c.every(kfExpandFinal);
};
function kfExpand(c, d) {
  if (kfExpandFinal(d)) {
    return d;
  }
  if ("function" === typeof d) {
    return kfExpand(c, d(c));
  }
  if (d instanceof Array) {
    return kfExpand(c, d.map(function(d) {
      return kfExpand(c, d);
    }));
  }
  clg("expand bad kf", d, null === d, typeof d);
  debugger;
}
;Matrix.mxWeb = {};
var mxDom = [], domLogging = !1;
window.domLogging = domLogging;
function domlog(c) {
  for (var d = [], e = 0; e < arguments.length; ++e) {
    d[e - 0] = arguments[e];
  }
  domLogging && console.log("domlog> ", Array.from(d).join(","));
}
function dom2mx(c, d) {
  var e = mxDom[c.id];
  if (!e && (void 0 === d || d)) {
    throw "dom2mx cannot find mxDom for with dom.sid " + c.sid + ", dom.id " + c.id;
  }
  return e;
}
function obsContent(c, d, e, f, g) {
  f !== kUnbound && (ast(d.dom, "Tag obs Content"), domlog("content", e, f), d.dom.innerHTML = e);
}
function notToBe(c) {
  c.cleanUp && c.cleanUp(c);
  c.state = kDoomed;
  if (c.kids) {
    for (var d = $jscomp.makeIterator(c.kids), e = d.next(); !e.done; e = d.next()) {
      notToBe(e.value);
    }
  }
  for (var f in c.cells) {
    c.cells[f].quiesce();
  }
  c.state = kDead;
}
function obsKids(c, d, e, f, g) {
  if (f !== kUnbound) {
    c = d.dom;
    d = document.createDocumentFragment();
    ast(c);
    g = $jscomp.makeIterator(f);
    for (var h = g.next(); !h.done; h = g.next()) {
      h = h.value, find(h, e) || (domlog("dropping DOM", h.tag), notToBe(h));
    }
    e = $jscomp.makeIterator(e);
    for (g = e.next(); !g.done; g = e.next()) {
      if (g = g.value, find(g, f)) {
        if (g.dom.parentNode !== c) {
          throw "newk dom parent not = parent";
        }
        d.appendChild(c.removeChild(g.dom));
      } else {
        h = document.createElement("div"), domlog("building new DOM", g.tag), h.innerHTML = Tag.toHTML(g), g = g.domCache = h.removeChild(h.firstChild), d.appendChild(g);
      }
    }
    c.innerHTML = null;
    c.appendChild(d);
  }
}
function obsDisabled(c, d, e, f, g) {
  f !== kUnbound && (domlog("disabled", e, f), d.dom.disabled = !!e);
}
function obsHidden(c, d, e, f, g) {
  f !== kUnbound && (e ? d.dom.setAttribute("hidden", "") : d.dom.removeAttribute("hidden"));
}
function obsClass(c, d, e, f, g) {
  f !== kUnbound && (domlog("className", e, f), d.dom.className = e ? isString(e) ? e : e.join(" ") : "");
}
function obsStyleProperty(c, d, e, f, g) {
  f !== kUnbound && (c = c.replace("_", "-"), d.tag.dom.style[c] = e);
}
function obsTagEventHandler(c, d, e, f, g) {
  f !== kUnbound && (d.dom[c] = e);
}
var AttrAliases = new Map([["class", "className"]]);
function obsAttrGlobal(c, d, e, f, g) {
  f !== kUnbound && (g = AttrAliases.get(c) || c, domlog("attr global", c, e, f), d.dom[g] = e);
}
function obsStyleAttr(c, d, e, f, g) {
  f !== kUnbound && (c = tagStyleString(d), d.dom.style = c);
}
var TagSession = function(c, d, e) {
  var f = Object.assign({sid:++sid}, e);
  Model.call(this, c, d || e.name, f, !0);
  this.routes || (this.routes = e.routes);
};
$jscomp.inherits(TagSession, Model);
TagSession.make = function(c, d, e) {
  c = new TagSession(c, d, e);
  c.awakenOnInitp ? c.awaken() : withIntegrity(qAwaken, c, function(c) {
    clg("awakening tag session!!!", c.name);
    c.awaken();
    return null;
  });
};
TagSession.cname = function() {
  return "TagSession";
};
TagSession.prototype.init = function() {
  this.routes && Router(this.routes).init();
};
window.TagSession = TagSession;
goog.exportSymbol("mxwebtagsession", TagSession);
var Tag = function(c, d, e, f) {
  var g = Object.assign({}, e, f);
  delete g.id;
  Model.call(this, c, d || f.name, g, !1);
  var h = this;
  this.sid = ++sid;
  if (void 0 === e) {
    debugger;
  }
  this.id = e.id ? e.id : e.id = this.sid;
  this.callbacks = new Map;
  this.attrKeys = [];
  for (var k in e) {
    this.attrKeys.push(k);
  }
  mxDom[this.id] = this;
  this.domCache = null;
  Object.defineProperty(this, "dom", {enumerable:!0, get:function() {
    if (null === h.domCache && (h.domCache = document.getElementById(h.id), ast(h.domCache, "Unable to locate DOM for Tag via Tag.id " + h.id), !h.domCache)) {
      throw clg("no dom", d), "Tag unanble find DOM";
    }
    return h.domCache;
  }});
  this.awakenOnInitp ? this.awaken() : withIntegrity(qAwaken, this, function(c) {
    h.awaken();
  });
};
$jscomp.inherits(Tag, Model);
Tag.prototype.dbg = function() {
  return "tag " + this.tag + " nm=" + this.name + " id=" + this.id + " ";
};
Tag.cname = function() {
  return "Tag";
};
Tag.isTagKid = function(c) {
  return isString(c) || c instanceof Function || c instanceof Array;
};
Tag.prototype.tagToHTML = function() {
  var c = this.tag, d = tagAttrsBuild(this), e = tagStyleBuild(this);
  d = "id=" + this.id + " " + d + " " + e;
  ast(c);
  return "<" + c + " " + d + ">" + (this.content || this.kidsToHTML()) + "</" + c + ">";
};
Tag.toHTML = function(c) {
  return isString(c) ? c : Array.isArray(c) ? c.reduce(function(c, e) {
    return c + Tag.toHTML(e);
  }, "") : "function" === typeof c ? c().tagToHTML() : c.tagToHTML();
};
Tag.prototype.kidsToHTML = function() {
  return this.kids ? this.kids.reduce(function(c, d) {
    return c + Tag.toHTML(d);
  }, "") : "";
};
Tag.prototype.slotObserverResolve = function(c) {
  var d = this.slotObservers[c];
  d || (d = "content" === c ? obsContent : "kids" === c ? obsKids : "disabled" === c ? obsDisabled : "hidden" === c ? obsHidden : "class" === c ? obsClass : "style" === c ? obsStyleAttr : TagEvents.has(c) ? obsTagEventHandler : TagAttributesGlobal.has(c) ? obsAttrGlobal : kObserverUnresolved, this.slotObservers[c] = d);
  return d;
};
Tag.prototype.fmTag = function(c, d) {
  return this.fmUp(function(d) {
    return d.tag === c;
  }, {}, d);
};
window.Tag = Tag;
function tag2html(c) {
  return Tag.toHTML(c);
}
window.tag2html = tag2html;
goog.exportSymbol("tag2html", tag2html);
var isTag = function(c) {
  return c instanceof Tag;
}, TagAttributesGlobal = new Set("accesskey autofocus checked class content contenteditable contextmenu dir draggable dropzone for hidden href id itemid itemprop itemref itemscope itemtype lang spellcheck src style tabindex title translate type viewBox fill d".split(" ")), TagEvents = new Set("onabort onautocomplete onautocompleteerror onblur oncancel oncanplay oncanplaythrough onchange onclick onclose oncontextmenu oncuechange ondblclick ondrag ondragend ondragenter ondragexit ondragleave ondragover ondragstart ondrop ondurationchange onemptied onended onerror onfocus oninput oninvalid onkeydown onkeypress onkeyup onload onloadeddata onloadedmetadata onloadstart onmousedown onmouseenter onmouseleave onmousemove onmouseout onmouseover onmouseup onmousewheel onpause onplay onplaying onprogress onratechange onreset onresize onscroll onseeked onseeking onselect onshow onsort onstalled onsubmit onsuspend ontimeupdate ontoggle onvolumechange onwaiting".split(" "));
function tagEventHandler(c, d) {
  var e = dom2mx(c.target);
  e.callbacks.get(d)(e, c, d);
}
function tagAttrsBuild(c) {
  var d = "";
  c.attrKeys.forEach(function(e) {
    if (TagEvents.has(e)) {
      c[e] instanceof Function || (clg("bingo event!!!!!!!!!! " + e), clg("bingo event handler!!!!!!!!!! " + c[e])), ast(c[e] instanceof Function, "tagattrsbuild handler not fn"), c.callbacks.set(e, c[e]), d += " " + e + "=\"tagEventHandler(event, '" + e + "')\"";
    } else {
      switch(e) {
        case "disabled":
        case "autofocus":
        case "hidden":
        case "checked":
          c[e] && (d += " " + e);
          break;
        case "value":
          d += " " + e + '="' + c[e] + '"';
          break;
        case "placeholder":
          d += " " + e + '="' + c[e] + '"';
          break;
        case "style":
          d += tagStyleBuild(c);
          break;
        case "class":
          c[e] && (d += ' class="' + (isString(c[e]) ? c[e] : c[e].filter(function(c) {
            return null !== c && void 0 !== c;
          }).join(" ")) + '"');
          break;
        default:
          c[e] && (TagAttributesGlobal.has(e) ? d += " " + e + '="' + c[e] + '"' : clg("unknown attribute prop", e));
      }
    }
  });
  return d;
}
function tag(c, d, e, f) {
  if (1 === f.length && isString(f[0])) {
    if (d.content) {
      throw "tag " + c + "has one string child " + f[0] + " but also content " + d.content;
    }
    d.content = f[0];
    f = null;
  }
  if (e) {
    for (var g in d || {}) {
      e.hasOwnProperty(g) && clg("WARNING: duplicate key " + g + " in tag " + c);
    }
  }
  if (d) {
    for (var h in e || {}) {
      d.hasOwnProperty(h) && clg("WARNING: duplicate key " + h + " in tag " + c);
    }
  }
  return function(g) {
    var h = e || {}, k = Object.assign({}, {tag:c}, f ? {kids:cKids(f)} : null, h);
    return new Tag(g ? g.md : null, h.name || c, d, k);
  };
}
function genTagEx(c) {
  window[c] = function() {
    return Tag.isTagKid(arguments[0]) ? tag(c, {}, {}, allArgs(arguments)) : Tag.isTagKid(arguments[1]) ? tag(c, arguments[0] || {}, {}, cdrArgs(arguments)) : tag(c, arguments[0] || {}, arguments[1] || {}, cddrArgs(arguments));
  };
}
var a, abbr, acronym, address, applet, area, article, aside, audio, b, base, basefont, bdi, bdo, bgsound, big, blink, blockquote, body, br, button, canvas, caption, center, cite, code, col, colgroup, command, content, data, datalist, dd, del, details, dfn, dialog, dir, div, dl, dt, element, em, embed, fieldset, figcaption, figure, font, footer, form, frame, frameset, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, image, img, input, ins, isindex, kbd, keygen, label, legend, li, 
link, listing, main, map, mark, marquee, menu, menuitem, meta, meter, multicol, nav, nextid, nobr, noembed, noframes, noscript, object, ol, optgroup, option, output, p, param, path, picture, plaintext, pre, progress, q, rp, rt, rtc, ruby, s, samp, script, section, select, shadow, slot, small, source, spacer, span, strike, strong, style, sub, summary, sup, svg, table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, tt, u, ul, mxwvar, video, wbr, xmp, tagNames = "a abbr acronym address applet area article aside audio b base basefont bdi bdo bgsound big blink blockquote body br button canvas caption center cite code col colgroup command content data datalist dd del details dfn dialog dir div dl dt element em embed fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe image img input ins isindex kbd keygen label legend li link listing main map mark marquee menu menuitem meta meter multicol nav nextid nobr noembed noframes noscript object ol optgroup option output p param path picture plaintext pre progress q rp rt rtc ruby s samp script section select shadow slot small source spacer span strike strong style sub summary sup svg table tbody td template textarea tfoot th thead time title tr track tt u ul mxwvar video wbr xmp".split(" ");
tagNames.map(function(c) {
  return genTagEx(c);
});
goog.exportSymbol("a", a);
goog.exportSymbol("abbr", abbr);
goog.exportSymbol("acronym", acronym);
goog.exportSymbol("address", address);
goog.exportSymbol("applet", applet);
goog.exportSymbol("area", area);
goog.exportSymbol("article", article);
goog.exportSymbol("aside", aside);
goog.exportSymbol("audio", audio);
goog.exportSymbol("b", b);
goog.exportSymbol("base", base);
goog.exportSymbol("basefont", basefont);
goog.exportSymbol("bdi", bdi);
goog.exportSymbol("bdo", bdo);
goog.exportSymbol("bgsound", bgsound);
goog.exportSymbol("big", big);
goog.exportSymbol("blink", blink);
goog.exportSymbol("blockquote", blockquote);
goog.exportSymbol("body", body);
goog.exportSymbol("br", br);
goog.exportSymbol("button", button);
goog.exportSymbol("canvas", canvas);
goog.exportSymbol("caption", caption);
goog.exportSymbol("center", center);
goog.exportSymbol("cite", cite);
goog.exportSymbol("code", code);
goog.exportSymbol("col", col);
goog.exportSymbol("colgroup", colgroup);
goog.exportSymbol("command", command);
goog.exportSymbol("content", content);
goog.exportSymbol("data", data);
goog.exportSymbol("datalist", datalist);
goog.exportSymbol("dd", dd);
goog.exportSymbol("del", del);
goog.exportSymbol("details", details);
goog.exportSymbol("dfn", dfn);
goog.exportSymbol("dialog", dialog);
goog.exportSymbol("dir", dir);
goog.exportSymbol("div", div);
goog.exportSymbol("dl", dl);
goog.exportSymbol("dt", dt);
goog.exportSymbol("element", element);
goog.exportSymbol("em", em);
goog.exportSymbol("embed", embed);
goog.exportSymbol("fieldset", fieldset);
goog.exportSymbol("figcaption", figcaption);
goog.exportSymbol("figure", figure);
goog.exportSymbol("font", font);
goog.exportSymbol("footer", footer);
goog.exportSymbol("form", form);
goog.exportSymbol("frame", frame);
goog.exportSymbol("frameset", frameset);
goog.exportSymbol("h1", h1);
goog.exportSymbol("h2", h2);
goog.exportSymbol("h3", h3);
goog.exportSymbol("h4", h4);
goog.exportSymbol("h5", h5);
goog.exportSymbol("h6", h6);
goog.exportSymbol("head", head);
goog.exportSymbol("header", header);
goog.exportSymbol("hgroup", hgroup);
goog.exportSymbol("hr", hr);
goog.exportSymbol("html", html);
goog.exportSymbol("i", i);
goog.exportSymbol("iframe", iframe);
goog.exportSymbol("image", image);
goog.exportSymbol("img", img);
goog.exportSymbol("input", input);
goog.exportSymbol("ins", ins);
goog.exportSymbol("isindex", isindex);
goog.exportSymbol("kbd", kbd);
goog.exportSymbol("keygen", keygen);
goog.exportSymbol("label", label);
goog.exportSymbol("legend", legend);
goog.exportSymbol("li", li);
goog.exportSymbol("link", link);
goog.exportSymbol("listing", listing);
goog.exportSymbol("main", main);
goog.exportSymbol("map", map);
goog.exportSymbol("mark", mark);
goog.exportSymbol("marquee", marquee);
goog.exportSymbol("menu", menu);
goog.exportSymbol("menuitem", menuitem);
goog.exportSymbol("meta", meta);
goog.exportSymbol("meter", meter);
goog.exportSymbol("multicol", multicol);
goog.exportSymbol("nav", nav);
goog.exportSymbol("nextid", nextid);
goog.exportSymbol("nobr", nobr);
goog.exportSymbol("noembed", noembed);
goog.exportSymbol("noframes", noframes);
goog.exportSymbol("noscript", noscript);
goog.exportSymbol("object", object);
goog.exportSymbol("ol", ol);
goog.exportSymbol("optgroup", optgroup);
goog.exportSymbol("option", option);
goog.exportSymbol("output", output);
goog.exportSymbol("p", p);
goog.exportSymbol("param", param);
goog.exportSymbol("path", path);
goog.exportSymbol("picture", picture);
goog.exportSymbol("plaintext", plaintext);
goog.exportSymbol("pre", pre);
goog.exportSymbol("progress", progress);
goog.exportSymbol("q", q);
goog.exportSymbol("rp", rp);
goog.exportSymbol("rt", rt);
goog.exportSymbol("rtc", rtc);
goog.exportSymbol("ruby", ruby);
goog.exportSymbol("s", s);
goog.exportSymbol("samp", samp);
goog.exportSymbol("script", script);
goog.exportSymbol("section", section);
goog.exportSymbol("select", select);
goog.exportSymbol("shadow", shadow);
goog.exportSymbol("slot", slot);
goog.exportSymbol("small", small);
goog.exportSymbol("source", source);
goog.exportSymbol("spacer", spacer);
goog.exportSymbol("span", span);
goog.exportSymbol("strike", strike);
goog.exportSymbol("strong", strong);
goog.exportSymbol("style", style);
goog.exportSymbol("sub", sub);
goog.exportSymbol("summary", summary);
goog.exportSymbol("sup", sup);
goog.exportSymbol("svg", svg);
goog.exportSymbol("table", table);
goog.exportSymbol("tbody", tbody);
goog.exportSymbol("td", td);
goog.exportSymbol("template", template);
goog.exportSymbol("textarea", textarea);
goog.exportSymbol("tfoot", tfoot);
goog.exportSymbol("th", th);
goog.exportSymbol("thead", thead);
goog.exportSymbol("time", time);
goog.exportSymbol("title", title);
goog.exportSymbol("tr", tr);
goog.exportSymbol("track", track);
goog.exportSymbol("tt", tt);
goog.exportSymbol("u", u);
goog.exportSymbol("ul", ul);
goog.exportSymbol("mxwvar", mxwvar);
goog.exportSymbol("video", video);
goog.exportSymbol("wbr", wbr);
goog.exportSymbol("xmp", xmp);
var mxCSS = function(c, d) {
  var e = Object.assign({}, d);
  Model.call(this, null, "css", e, !1);
  var f = this;
  this.cssProps = [];
  for (var g in d) {
    this.cssProps.push(g);
  }
  clg("cssProps!!!!", this.cssProps);
  this.sid = ++sid;
  this.tag = c;
  this.slotObservers = [];
  withIntegrity(qAwaken, this, function(c) {
    return f.awaken();
  });
};
$jscomp.inherits(mxCSS, Model);
mxCSS.prototype.dbg = function() {
  return "mxCSS " + this.tag.tag + " tagnm=" + this.tag.name;
};
mxCSS.cname = function() {
  return "mxCSS";
};
mxCSS.prototype.slotObserverResolve = function(c) {
  return obsStyleProperty;
};
function mkCSS(c) {
  return function(d) {
    return new mxCSS(d, c);
  };
}
function tagStyleBuild(c) {
  var d = "", e = c.style;
  e instanceof Function && (e = e(c));
  if (isString(e)) {
    d = e;
  } else {
    if (e instanceof mxCSS) {
      e.cssProps.forEach(function(c) {
        var f = c.replace("_", "-");
        d += f + ":" + e[c] + ";";
      });
    } else {
      for (var f in e) {
        c = f.replace("_", "-"), d += c + ":" + e[f] + ";";
      }
    }
  }
  return "" === d ? "" : ' style="' + d + '"';
}
function tagStyleString(c) {
  var d = "", e = c.style;
  e instanceof Function && (e = e(c));
  if (isString(e)) {
    d = e;
  } else {
    if (e instanceof mxCSS) {
      e.cssProps.forEach(function(c) {
        var f = c.replace("_", "-");
        d += f + ":" + e[c] + ";";
      });
    } else {
      for (var f in e) {
        c = f.replace("_", "-"), d += c + ":" + e[f] + ";";
      }
    }
  }
  return d;
}
var MXStorable = function(c) {
  c = c || {};
  c = Object.assign({id:(c.lsPrefix || "MXSTOR_ANON") + uuidv4(), created:Date.now()}, c, {deleted:c.deleted || cI(null)});
  Model.call(this, null, null, c, !1);
  this.store();
};
$jscomp.inherits(MXStorable, Model);
MXStorable.cname = Model.cname;
MXStorable.storableProperties = function() {
  return ["id", "created", "deleted"];
};
MXStorable.prototype.toJSON = function() {
  var c = this;
  return this.constructor.storableProperties().reduce(function(d, e) {
    d[e] = c[e];
    return d;
  }, {});
};
MXStorable.load = function(c, d) {
  d = window.localStorage.getObject(d);
  return new c(d);
};
MXStorable.obsAnyChange = function(c, d, e, f, g) {
  d.store();
};
MXStorable.prototype.slotObserverResolve = function(c) {
  return MXStorable.obsAnyChange;
};
MXStorable.prototype.store = function() {
  MXStorable.storeObject(this.id, this.toJSON());
};
MXStorable.storeObject = function(c, d) {
  window.localStorage.setObject(c, d);
};
MXStorable.prototype.delete = function() {
  this.deleted = Date.now();
};
MXStorable.loadAllItems = function(c, d) {
  return Object.keys(window.localStorage || {}).filter(function(c) {
    return c.startsWith(d);
  }).map(function(d) {
    return MXStorable.load(c, d);
  });
};
window.MXStorable = MXStorable;
goog.exportSymbol("MXStorable", MXStorable);
goog.Thenable = function() {
};
goog.Thenable.prototype.then = function(c, d, e) {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(c) {
  c.prototype.then = c.prototype.then;
  COMPILED ? c.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : c.prototype.$goog_Thenable = !0;
};
goog.Thenable.isImplementedBy = function(c) {
  if (!c) {
    return !1;
  }
  try {
    return COMPILED ? !!c[goog.Thenable.IMPLEMENTED_BY_PROP] : !!c.$goog_Thenable;
  } catch (d) {
    return !1;
  }
};
goog.debug = {};
goog.debug.Error = function(c) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var d = Error().stack;
    d && (this.stack = d);
  }
  c && (this.message = String(c));
  this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(c, d) {
  goog.debug.Error.call(this, goog.asserts.subs_(c, d));
  this.messagePattern = c;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(c) {
  throw c;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_ = function(c, d) {
  c = c.split("%s");
  for (var e = "", f = c.length - 1, g = 0; g < f; g++) {
    e += c[g] + (g < d.length ? d[g] : "%s");
  }
  return e + c[f];
};
goog.asserts.doAssertFailure_ = function(c, d, e, f) {
  var g = "Assertion failed";
  if (e) {
    g += ": " + e;
    var h = f;
  } else {
    c && (g += ": " + c, h = d);
  }
  c = new goog.asserts.AssertionError("" + g, h || []);
  goog.asserts.errorHandler_(c);
};
goog.asserts.setErrorHandler = function(c) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = c);
};
goog.asserts.assert = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !c && goog.asserts.doAssertFailure_("", null, d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.fail = function(c, d) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (c ? ": " + c : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(c) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertString = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(c) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertFunction = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(c) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertObject = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(c) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertArray = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(c) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertBoolean = function(c, d, e) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(c) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertElement = function(c, d, e) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(c) && c.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(c), c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertInstanceof = function(c, d, e, f) {
  !goog.asserts.ENABLE_ASSERTS || c instanceof d || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(d), goog.asserts.getType_(c)], e, Array.prototype.slice.call(arguments, 3));
  return c;
};
goog.asserts.assertFinite = function(c, d, e) {
  !goog.asserts.ENABLE_ASSERTS || "number" == typeof c && isFinite(c) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [c], d, Array.prototype.slice.call(arguments, 2));
  return c;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var c in Object.prototype) {
    goog.asserts.fail(c + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(c) {
  return c instanceof Function ? c.displayName || c.name || "unknown type name" : c instanceof Object ? c.constructor.displayName || c.constructor.name || Object.prototype.toString.call(c) : null === c ? "null" : typeof c;
};
goog.async = {};
goog.async.FreeList = function(c, d, e) {
  this.limit_ = e;
  this.create_ = c;
  this.reset_ = d;
  this.occupants_ = 0;
  this.head_ = null;
};
goog.async.FreeList.prototype.get = function() {
  if (0 < this.occupants_) {
    this.occupants_--;
    var c = this.head_;
    this.head_ = c.next;
    c.next = null;
  } else {
    c = this.create_();
  }
  return c;
};
goog.async.FreeList.prototype.put = function(c) {
  this.reset_(c);
  this.occupants_ < this.limit_ && (this.occupants_++, c.next = this.head_, this.head_ = c);
};
goog.async.FreeList.prototype.occupants = function() {
  return this.occupants_;
};
goog.async.WorkQueue = function() {
  this.workTail_ = this.workHead_ = null;
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
  return new goog.async.WorkItem;
}, function(c) {
  c.reset();
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(c, d) {
  var e = this.getUnusedItem_();
  e.set(c, d);
  this.workTail_ ? this.workTail_.next = e : (goog.asserts.assert(!this.workHead_), this.workHead_ = e);
  this.workTail_ = e;
};
goog.async.WorkQueue.prototype.remove = function() {
  var c = null;
  this.workHead_ && (c = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), c.next = null);
  return c;
};
goog.async.WorkQueue.prototype.returnUnused = function(c) {
  goog.async.WorkQueue.freelist_.put(c);
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  return goog.async.WorkQueue.freelist_.get();
};
goog.async.WorkItem = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.WorkItem.prototype.set = function(c, d) {
  this.fn = c;
  this.scope = d;
  this.next = null;
};
goog.async.WorkItem.prototype.reset = function() {
  this.next = this.scope = this.fn = null;
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(c) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = c;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var d = goog.debug.entryPointRegistry.monitors_, e = 0; e < d.length; e++) {
      c(goog.bind(d[e].wrap, d[e]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(c) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var d = goog.bind(c.wrap, c), e = 0; e < goog.debug.entryPointRegistry.refList_.length; e++) {
    goog.debug.entryPointRegistry.refList_[e](d);
  }
  goog.debug.entryPointRegistry.monitors_.push(c);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(c) {
  var d = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(c == d[d.length - 1], "Only the most recent monitor can be unwrapped.");
  c = goog.bind(c.unwrap, c);
  for (var e = 0; e < goog.debug.entryPointRegistry.refList_.length; e++) {
    goog.debug.entryPointRegistry.refList_[e](c);
  }
  d.length--;
};
goog.dom.HtmlElement = function() {
};
goog.dom.TagName = function(c) {
  this.tagName_ = c;
};
goog.dom.TagName.prototype.toString = function() {
  return this.tagName_;
};
goog.dom.TagName.A = new goog.dom.TagName("A");
goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
goog.dom.TagName.B = new goog.dom.TagName("B");
goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
goog.dom.TagName.BR = new goog.dom.TagName("BR");
goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
goog.dom.TagName.COL = new goog.dom.TagName("COL");
goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
goog.dom.TagName.DD = new goog.dom.TagName("DD");
goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
goog.dom.TagName.DL = new goog.dom.TagName("DL");
goog.dom.TagName.DT = new goog.dom.TagName("DT");
goog.dom.TagName.EM = new goog.dom.TagName("EM");
goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
goog.dom.TagName.H1 = new goog.dom.TagName("H1");
goog.dom.TagName.H2 = new goog.dom.TagName("H2");
goog.dom.TagName.H3 = new goog.dom.TagName("H3");
goog.dom.TagName.H4 = new goog.dom.TagName("H4");
goog.dom.TagName.H5 = new goog.dom.TagName("H5");
goog.dom.TagName.H6 = new goog.dom.TagName("H6");
goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
goog.dom.TagName.HR = new goog.dom.TagName("HR");
goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
goog.dom.TagName.I = new goog.dom.TagName("I");
goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
goog.dom.TagName.INS = new goog.dom.TagName("INS");
goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
goog.dom.TagName.LI = new goog.dom.TagName("LI");
goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
goog.dom.TagName.META = new goog.dom.TagName("META");
goog.dom.TagName.METER = new goog.dom.TagName("METER");
goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
goog.dom.TagName.OL = new goog.dom.TagName("OL");
goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
goog.dom.TagName.P = new goog.dom.TagName("P");
goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
goog.dom.TagName.Q = new goog.dom.TagName("Q");
goog.dom.TagName.RP = new goog.dom.TagName("RP");
goog.dom.TagName.RT = new goog.dom.TagName("RT");
goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
goog.dom.TagName.S = new goog.dom.TagName("S");
goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
goog.dom.TagName.TD = new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
goog.dom.TagName.TH = new goog.dom.TagName("TH");
goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
goog.dom.TagName.TR = new goog.dom.TagName("TR");
goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
goog.dom.TagName.TT = new goog.dom.TagName("TT");
goog.dom.TagName.U = new goog.dom.TagName("U");
goog.dom.TagName.UL = new goog.dom.TagName("UL");
goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
goog.functions = {};
goog.functions.constant = function(c) {
  return function() {
    return c;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(c, d) {
  return c;
};
goog.functions.error = function(c) {
  return function() {
    throw Error(c);
  };
};
goog.functions.fail = function(c) {
  return function() {
    throw c;
  };
};
goog.functions.lock = function(c, d) {
  d = d || 0;
  return function() {
    return c.apply(this, Array.prototype.slice.call(arguments, 0, d));
  };
};
goog.functions.nth = function(c) {
  return function() {
    return arguments[c];
  };
};
goog.functions.partialRight = function(c, d) {
  var e = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = Array.prototype.slice.call(arguments);
    d.push.apply(d, e);
    return c.apply(this, d);
  };
};
goog.functions.withReturnValue = function(c, d) {
  return goog.functions.sequence(c, goog.functions.constant(d));
};
goog.functions.equalTo = function(c, d) {
  return function(e) {
    return d ? c == e : c === e;
  };
};
goog.functions.compose = function(c, d) {
  var e = arguments, f = e.length;
  return function() {
    var c;
    f && (c = e[f - 1].apply(this, arguments));
    for (var d = f - 2; 0 <= d; d--) {
      c = e[d].call(this, c);
    }
    return c;
  };
};
goog.functions.sequence = function(c) {
  var d = arguments, e = d.length;
  return function() {
    for (var c, g = 0; g < e; g++) {
      c = d[g].apply(this, arguments);
    }
    return c;
  };
};
goog.functions.and = function(c) {
  var d = arguments, e = d.length;
  return function() {
    for (var c = 0; c < e; c++) {
      if (!d[c].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function(c) {
  var d = arguments, e = d.length;
  return function() {
    for (var c = 0; c < e; c++) {
      if (d[c].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function(c) {
  return function() {
    return !c.apply(this, arguments);
  };
};
goog.functions.create = function(c, d) {
  var e = function() {
  };
  e.prototype = c.prototype;
  e = new e;
  c.apply(e, Array.prototype.slice.call(arguments, 1));
  return e;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(c) {
  var d = !1, e;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return c();
    }
    d || (e = c(), d = !0);
    return e;
  };
};
goog.functions.once = function(c) {
  var d = c;
  return function() {
    if (d) {
      var c = d;
      d = null;
      c();
    }
  };
};
goog.functions.debounce = function(c, d, e) {
  var f = 0;
  return function(g) {
    goog.global.clearTimeout(f);
    var h = arguments;
    f = goog.global.setTimeout(function() {
      c.apply(e, h);
    }, d);
  };
};
goog.functions.throttle = function(c, d, e) {
  var f = 0, g = !1, h = [], k = function() {
    f = 0;
    g && (g = !1, l());
  }, l = function() {
    f = goog.global.setTimeout(k, d);
    c.apply(e, h);
  };
  return function(c) {
    h = arguments;
    f ? g = !0 : l();
  };
};
goog.functions.rateLimit = function(c, d, e) {
  var f = 0, g = function() {
    f = 0;
  };
  return function(h) {
    f || (f = goog.global.setTimeout(g, d), c.apply(e, arguments));
  };
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(c) {
  return c[c.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.indexOf.call(c, d, e);
} : function(c, d, e) {
  e = null == e ? 0 : 0 > e ? Math.max(0, c.length + e) : e;
  if (goog.isString(c)) {
    return goog.isString(d) && 1 == d.length ? c.indexOf(d, e) : -1;
  }
  for (; e < c.length; e++) {
    if (e in c && c[e] === d) {
      return e;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.lastIndexOf.call(c, d, null == e ? c.length - 1 : e);
} : function(c, d, e) {
  e = null == e ? c.length - 1 : e;
  0 > e && (e = Math.max(0, c.length + e));
  if (goog.isString(c)) {
    return goog.isString(d) && 1 == d.length ? c.lastIndexOf(d, e) : -1;
  }
  for (; 0 <= e; e--) {
    if (e in c && c[e] === d) {
      return e;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  Array.prototype.forEach.call(c, d, e);
} : function(c, d, e) {
  for (var f = c.length, g = goog.isString(c) ? c.split("") : c, h = 0; h < f; h++) {
    h in g && d.call(e, g[h], h, c);
  }
};
goog.array.forEachRight = function(c, d, e) {
  var f = c.length, g = goog.isString(c) ? c.split("") : c;
  for (--f; 0 <= f; --f) {
    f in g && d.call(e, g[f], f, c);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.filter.call(c, d, e);
} : function(c, d, e) {
  for (var f = c.length, g = [], h = 0, k = goog.isString(c) ? c.split("") : c, l = 0; l < f; l++) {
    if (l in k) {
      var m = k[l];
      d.call(e, m, l, c) && (g[h++] = m);
    }
  }
  return g;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.map.call(c, d, e);
} : function(c, d, e) {
  for (var f = c.length, g = Array(f), h = goog.isString(c) ? c.split("") : c, k = 0; k < f; k++) {
    k in h && (g[k] = d.call(e, h[k], k, c));
  }
  return g;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(c, d, e, f) {
  goog.asserts.assert(null != c.length);
  f && (d = goog.bind(d, f));
  return Array.prototype.reduce.call(c, d, e);
} : function(c, d, e, f) {
  var g = e;
  goog.array.forEach(c, function(e, k) {
    g = d.call(f, g, e, k, c);
  });
  return g;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(c, d, e, f) {
  goog.asserts.assert(null != c.length);
  goog.asserts.assert(null != d);
  f && (d = goog.bind(d, f));
  return Array.prototype.reduceRight.call(c, d, e);
} : function(c, d, e, f) {
  var g = e;
  goog.array.forEachRight(c, function(e, k) {
    g = d.call(f, g, e, k, c);
  });
  return g;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.some.call(c, d, e);
} : function(c, d, e) {
  for (var f = c.length, g = goog.isString(c) ? c.split("") : c, h = 0; h < f; h++) {
    if (h in g && d.call(e, g[h], h, c)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.every.call(c, d, e);
} : function(c, d, e) {
  for (var f = c.length, g = goog.isString(c) ? c.split("") : c, h = 0; h < f; h++) {
    if (h in g && !d.call(e, g[h], h, c)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(c, d, e) {
  var f = 0;
  goog.array.forEach(c, function(c, h, k) {
    d.call(e, c, h, k) && ++f;
  }, e);
  return f;
};
goog.array.find = function(c, d, e) {
  d = goog.array.findIndex(c, d, e);
  return 0 > d ? null : goog.isString(c) ? c.charAt(d) : c[d];
};
goog.array.findIndex = function(c, d, e) {
  for (var f = c.length, g = goog.isString(c) ? c.split("") : c, h = 0; h < f; h++) {
    if (h in g && d.call(e, g[h], h, c)) {
      return h;
    }
  }
  return -1;
};
goog.array.findRight = function(c, d, e) {
  d = goog.array.findIndexRight(c, d, e);
  return 0 > d ? null : goog.isString(c) ? c.charAt(d) : c[d];
};
goog.array.findIndexRight = function(c, d, e) {
  var f = c.length, g = goog.isString(c) ? c.split("") : c;
  for (--f; 0 <= f; f--) {
    if (f in g && d.call(e, g[f], f, c)) {
      return f;
    }
  }
  return -1;
};
goog.array.contains = function(c, d) {
  return 0 <= goog.array.indexOf(c, d);
};
goog.array.isEmpty = function(c) {
  return 0 == c.length;
};
goog.array.clear = function(c) {
  if (!goog.isArray(c)) {
    for (var d = c.length - 1; 0 <= d; d--) {
      delete c[d];
    }
  }
  c.length = 0;
};
goog.array.insert = function(c, d) {
  goog.array.contains(c, d) || c.push(d);
};
goog.array.insertAt = function(c, d, e) {
  goog.array.splice(c, e, 0, d);
};
goog.array.insertArrayAt = function(c, d, e) {
  goog.partial(goog.array.splice, c, e, 0).apply(null, d);
};
goog.array.insertBefore = function(c, d, e) {
  var f;
  2 == arguments.length || 0 > (f = goog.array.indexOf(c, e)) ? c.push(d) : goog.array.insertAt(c, d, f);
};
goog.array.remove = function(c, d) {
  d = goog.array.indexOf(c, d);
  var e;
  (e = 0 <= d) && goog.array.removeAt(c, d);
  return e;
};
goog.array.removeLast = function(c, d) {
  d = goog.array.lastIndexOf(c, d);
  return 0 <= d ? (goog.array.removeAt(c, d), !0) : !1;
};
goog.array.removeAt = function(c, d) {
  goog.asserts.assert(null != c.length);
  return 1 == Array.prototype.splice.call(c, d, 1).length;
};
goog.array.removeIf = function(c, d, e) {
  d = goog.array.findIndex(c, d, e);
  return 0 <= d ? (goog.array.removeAt(c, d), !0) : !1;
};
goog.array.removeAllIf = function(c, d, e) {
  var f = 0;
  goog.array.forEachRight(c, function(g, h) {
    d.call(e, g, h, c) && goog.array.removeAt(c, h) && f++;
  });
  return f;
};
goog.array.concat = function(c) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.join = function(c) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.toArray = function(c) {
  var d = c.length;
  if (0 < d) {
    for (var e = Array(d), f = 0; f < d; f++) {
      e[f] = c[f];
    }
    return e;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(c, d) {
  for (var e = 1; e < arguments.length; e++) {
    var f = arguments[e];
    if (goog.isArrayLike(f)) {
      var g = c.length || 0, h = f.length || 0;
      c.length = g + h;
      for (var k = 0; k < h; k++) {
        c[g + k] = f[k];
      }
    } else {
      c.push(f);
    }
  }
};
goog.array.splice = function(c, d, e, f) {
  goog.asserts.assert(null != c.length);
  return Array.prototype.splice.apply(c, goog.array.slice(arguments, 1));
};
goog.array.slice = function(c, d, e) {
  goog.asserts.assert(null != c.length);
  return 2 >= arguments.length ? Array.prototype.slice.call(c, d) : Array.prototype.slice.call(c, d, e);
};
goog.array.removeDuplicates = function(c, d, e) {
  d = d || c;
  var f = function(c) {
    return goog.isObject(c) ? "o" + goog.getUid(c) : (typeof c).charAt(0) + c;
  };
  e = e || f;
  f = {};
  for (var g = 0, h = 0; h < c.length;) {
    var k = c[h++], l = e(k);
    Object.prototype.hasOwnProperty.call(f, l) || (f[l] = !0, d[g++] = k);
  }
  d.length = g;
};
goog.array.binarySearch = function(c, d, e) {
  return goog.array.binarySearch_(c, e || goog.array.defaultCompare, !1, d);
};
goog.array.binarySelect = function(c, d, e) {
  return goog.array.binarySearch_(c, d, !0, void 0, e);
};
goog.array.binarySearch_ = function(c, d, e, f, g) {
  for (var h = 0, k = c.length, l; h < k;) {
    var m = h + k >> 1;
    var n = e ? d.call(g, c[m], m, c) : d(f, c[m]);
    0 < n ? h = m + 1 : (k = m, l = !n);
  }
  return l ? h : ~h;
};
goog.array.sort = function(c, d) {
  c.sort(d || goog.array.defaultCompare);
};
goog.array.stableSort = function(c, d) {
  for (var e = Array(c.length), f = 0; f < c.length; f++) {
    e[f] = {index:f, value:c[f]};
  }
  var g = d || goog.array.defaultCompare;
  goog.array.sort(e, function(c, d) {
    return g(c.value, d.value) || c.index - d.index;
  });
  for (f = 0; f < c.length; f++) {
    c[f] = e[f].value;
  }
};
goog.array.sortByKey = function(c, d, e) {
  var f = e || goog.array.defaultCompare;
  goog.array.sort(c, function(c, e) {
    return f(d(c), d(e));
  });
};
goog.array.sortObjectsByKey = function(c, d, e) {
  goog.array.sortByKey(c, function(c) {
    return c[d];
  }, e);
};
goog.array.isSorted = function(c, d, e) {
  d = d || goog.array.defaultCompare;
  for (var f = 1; f < c.length; f++) {
    var g = d(c[f - 1], c[f]);
    if (0 < g || 0 == g && e) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function(c, d, e) {
  if (!goog.isArrayLike(c) || !goog.isArrayLike(d) || c.length != d.length) {
    return !1;
  }
  var f = c.length;
  e = e || goog.array.defaultCompareEquality;
  for (var g = 0; g < f; g++) {
    if (!e(c[g], d[g])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(c, d, e) {
  e = e || goog.array.defaultCompare;
  for (var f = Math.min(c.length, d.length), g = 0; g < f; g++) {
    var h = e(c[g], d[g]);
    if (0 != h) {
      return h;
    }
  }
  return goog.array.defaultCompare(c.length, d.length);
};
goog.array.defaultCompare = function(c, d) {
  return c > d ? 1 : c < d ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(c, d) {
  return -goog.array.defaultCompare(c, d);
};
goog.array.defaultCompareEquality = function(c, d) {
  return c === d;
};
goog.array.binaryInsert = function(c, d, e) {
  e = goog.array.binarySearch(c, d, e);
  return 0 > e ? (goog.array.insertAt(c, d, -(e + 1)), !0) : !1;
};
goog.array.binaryRemove = function(c, d, e) {
  d = goog.array.binarySearch(c, d, e);
  return 0 <= d ? goog.array.removeAt(c, d) : !1;
};
goog.array.bucket = function(c, d, e) {
  for (var f = {}, g = 0; g < c.length; g++) {
    var h = c[g], k = d.call(e, h, g, c);
    goog.isDef(k) && (f[k] || (f[k] = [])).push(h);
  }
  return f;
};
goog.array.toObject = function(c, d, e) {
  var f = {};
  goog.array.forEach(c, function(g, h) {
    f[d.call(e, g, h, c)] = g;
  });
  return f;
};
goog.array.range = function(c, d, e) {
  var f = [], g = 0, h = c;
  e = e || 1;
  void 0 !== d && (g = c, h = d);
  if (0 > e * (h - g)) {
    return [];
  }
  if (0 < e) {
    for (c = g; c < h; c += e) {
      f.push(c);
    }
  } else {
    for (c = g; c > h; c += e) {
      f.push(c);
    }
  }
  return f;
};
goog.array.repeat = function(c, d) {
  for (var e = [], f = 0; f < d; f++) {
    e[f] = c;
  }
  return e;
};
goog.array.flatten = function(c) {
  for (var d = [], e = 0; e < arguments.length; e++) {
    var f = arguments[e];
    if (goog.isArray(f)) {
      for (var g = 0; g < f.length; g += 8192) {
        var h = goog.array.slice(f, g, g + 8192);
        h = goog.array.flatten.apply(null, h);
        for (var k = 0; k < h.length; k++) {
          d.push(h[k]);
        }
      }
    } else {
      d.push(f);
    }
  }
  return d;
};
goog.array.rotate = function(c, d) {
  goog.asserts.assert(null != c.length);
  c.length && (d %= c.length, 0 < d ? Array.prototype.unshift.apply(c, c.splice(-d, d)) : 0 > d && Array.prototype.push.apply(c, c.splice(0, -d)));
  return c;
};
goog.array.moveItem = function(c, d, e) {
  goog.asserts.assert(0 <= d && d < c.length);
  goog.asserts.assert(0 <= e && e < c.length);
  d = Array.prototype.splice.call(c, d, 1);
  Array.prototype.splice.call(c, e, 0, d[0]);
};
goog.array.zip = function(c) {
  if (!arguments.length) {
    return [];
  }
  for (var d = [], e = arguments[0].length, f = 1; f < arguments.length; f++) {
    arguments[f].length < e && (e = arguments[f].length);
  }
  for (f = 0; f < e; f++) {
    for (var g = [], h = 0; h < arguments.length; h++) {
      g.push(arguments[h][f]);
    }
    d.push(g);
  }
  return d;
};
goog.array.shuffle = function(c, d) {
  d = d || Math.random;
  for (var e = c.length - 1; 0 < e; e--) {
    var f = Math.floor(d() * (e + 1)), g = c[e];
    c[e] = c[f];
    c[f] = g;
  }
};
goog.array.copyByIndex = function(c, d) {
  var e = [];
  goog.array.forEach(d, function(d) {
    e.push(c[d]);
  });
  return e;
};
goog.array.concatMap = function(c, d, e) {
  return goog.array.concat.apply([], goog.array.map(c, d, e));
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(c, d) {
  return 0 == c.lastIndexOf(d, 0);
};
goog.string.endsWith = function(c, d) {
  var e = c.length - d.length;
  return 0 <= e && c.indexOf(d, e) == e;
};
goog.string.caseInsensitiveStartsWith = function(c, d) {
  return 0 == goog.string.caseInsensitiveCompare(d, c.substr(0, d.length));
};
goog.string.caseInsensitiveEndsWith = function(c, d) {
  return 0 == goog.string.caseInsensitiveCompare(d, c.substr(c.length - d.length, d.length));
};
goog.string.caseInsensitiveEquals = function(c, d) {
  return c.toLowerCase() == d.toLowerCase();
};
goog.string.subs = function(c, d) {
  for (var e = c.split("%s"), f = "", g = Array.prototype.slice.call(arguments, 1); g.length && 1 < e.length;) {
    f += e.shift() + g.shift();
  }
  return f + e.join("%s");
};
goog.string.collapseWhitespace = function(c) {
  return c.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(c) {
  return /^[\s\xa0]*$/.test(c);
};
goog.string.isEmptyString = function(c) {
  return 0 == c.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(c) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(c));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(c) {
  return !/[^\t\n\r ]/.test(c);
};
goog.string.isAlpha = function(c) {
  return !/[^a-zA-Z]/.test(c);
};
goog.string.isNumeric = function(c) {
  return !/[^0-9]/.test(c);
};
goog.string.isAlphaNumeric = function(c) {
  return !/[^a-zA-Z0-9]/.test(c);
};
goog.string.isSpace = function(c) {
  return " " == c;
};
goog.string.isUnicodeChar = function(c) {
  return 1 == c.length && " " <= c && "~" >= c || "\u0080" <= c && "\ufffd" >= c;
};
goog.string.stripNewlines = function(c) {
  return c.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(c) {
  return c.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(c) {
  return c.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(c) {
  return c.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(c) {
  return c.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(c) {
  return c.trim();
} : function(c) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(c)[1];
};
goog.string.trimLeft = function(c) {
  return c.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(c) {
  return c.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(c, d) {
  c = String(c).toLowerCase();
  d = String(d).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(c, d, e) {
  if (c == d) {
    return 0;
  }
  if (!c) {
    return -1;
  }
  if (!d) {
    return 1;
  }
  for (var f = c.toLowerCase().match(e), g = d.toLowerCase().match(e), h = Math.min(f.length, g.length), k = 0; k < h; k++) {
    e = f[k];
    var l = g[k];
    if (e != l) {
      return c = parseInt(e, 10), !isNaN(c) && (d = parseInt(l, 10), !isNaN(d) && c - d) ? c - d : e < l ? -1 : 1;
    }
  }
  return f.length != g.length ? f.length - g.length : c < d ? -1 : 1;
};
goog.string.intAwareCompare = function(c, d) {
  return goog.string.numberAwareCompare_(c, d, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(c, d) {
  return goog.string.numberAwareCompare_(c, d, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(c) {
  return encodeURIComponent(String(c));
};
goog.string.urlDecode = function(c) {
  return decodeURIComponent(c.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(c, d) {
  return c.replace(/(\r\n|\r|\n)/g, d ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(c, d) {
  if (d) {
    c = c.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (c = c.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(c)) {
      return c;
    }
    -1 != c.indexOf("&") && (c = c.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != c.indexOf("<") && (c = c.replace(goog.string.LT_RE_, "&lt;"));
    -1 != c.indexOf(">") && (c = c.replace(goog.string.GT_RE_, "&gt;"));
    -1 != c.indexOf('"') && (c = c.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != c.indexOf("'") && (c = c.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != c.indexOf("\x00") && (c = c.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != c.indexOf("e") && (c = c.replace(goog.string.E_RE_, "&#101;"));
  }
  return c;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(c) {
  return goog.string.contains(c, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(c) : goog.string.unescapePureXmlEntities_(c) : c;
};
goog.string.unescapeEntitiesWithDocument = function(c, d) {
  return goog.string.contains(c, "&") ? goog.string.unescapeEntitiesUsingDom_(c, d) : c;
};
goog.string.unescapeEntitiesUsingDom_ = function(c, d) {
  var e = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var f = d ? d.createElement("div") : goog.global.document.createElement("div");
  return c.replace(goog.string.HTML_ENTITY_PATTERN_, function(c, d) {
    var g = e[c];
    if (g) {
      return g;
    }
    "#" == d.charAt(0) && (d = Number("0" + d.substr(1)), isNaN(d) || (g = String.fromCharCode(d)));
    g || (f.innerHTML = c + " ", g = f.firstChild.nodeValue.slice(0, -1));
    return e[c] = g;
  });
};
goog.string.unescapePureXmlEntities_ = function(c) {
  return c.replace(/&([^;]+);/g, function(c, e) {
    switch(e) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        return "#" != e.charAt(0) || (e = Number("0" + e.substr(1)), isNaN(e)) ? c : String.fromCharCode(e);
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(c, d) {
  return goog.string.newLineToBr(c.replace(/  /g, " &#160;"), d);
};
goog.string.preserveSpaces = function(c) {
  return c.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(c, d) {
  for (var e = d.length, f = 0; f < e; f++) {
    var g = 1 == e ? d : d.charAt(f);
    if (c.charAt(0) == g && c.charAt(c.length - 1) == g) {
      return c.substring(1, c.length - 1);
    }
  }
  return c;
};
goog.string.truncate = function(c, d, e) {
  e && (c = goog.string.unescapeEntities(c));
  c.length > d && (c = c.substring(0, d - 3) + "...");
  e && (c = goog.string.htmlEscape(c));
  return c;
};
goog.string.truncateMiddle = function(c, d, e, f) {
  e && (c = goog.string.unescapeEntities(c));
  if (f && c.length > d) {
    f > d && (f = d);
    var g = c.length - f;
    c = c.substring(0, d - f) + "..." + c.substring(g);
  } else {
    c.length > d && (f = Math.floor(d / 2), g = c.length - f, c = c.substring(0, f + d % 2) + "..." + c.substring(g));
  }
  e && (c = goog.string.htmlEscape(c));
  return c;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(c) {
  c = String(c);
  for (var d = ['"'], e = 0; e < c.length; e++) {
    var f = c.charAt(e), g = f.charCodeAt(0);
    d[e + 1] = goog.string.specialEscapeChars_[f] || (31 < g && 127 > g ? f : goog.string.escapeChar(f));
  }
  d.push('"');
  return d.join("");
};
goog.string.escapeString = function(c) {
  for (var d = [], e = 0; e < c.length; e++) {
    d[e] = goog.string.escapeChar(c.charAt(e));
  }
  return d.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var d = c.charCodeAt(0);
  if (31 < d && 127 > d) {
    var e = c;
  } else {
    if (256 > d) {
      if (e = "\\x", 16 > d || 256 < d) {
        e += "0";
      }
    } else {
      e = "\\u", 4096 > d && (e += "0");
    }
    e += d.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = e;
};
goog.string.contains = function(c, d) {
  return -1 != c.indexOf(d);
};
goog.string.caseInsensitiveContains = function(c, d) {
  return goog.string.contains(c.toLowerCase(), d.toLowerCase());
};
goog.string.countOf = function(c, d) {
  return c && d ? c.split(d).length - 1 : 0;
};
goog.string.removeAt = function(c, d, e) {
  var f = c;
  0 <= d && d < c.length && 0 < e && (f = c.substr(0, d) + c.substr(d + e, c.length - d - e));
  return f;
};
goog.string.remove = function(c, d) {
  return c.replace(d, "");
};
goog.string.removeAll = function(c, d) {
  d = new RegExp(goog.string.regExpEscape(d), "g");
  return c.replace(d, "");
};
goog.string.replaceAll = function(c, d, e) {
  d = new RegExp(goog.string.regExpEscape(d), "g");
  return c.replace(d, e.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function(c) {
  return String(c).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(c, d) {
  return c.repeat(d);
} : function(c, d) {
  return Array(d + 1).join(c);
};
goog.string.padNumber = function(c, d, e) {
  c = goog.isDef(e) ? c.toFixed(e) : String(c);
  e = c.indexOf(".");
  -1 == e && (e = c.length);
  return goog.string.repeat("0", Math.max(0, d - e)) + c;
};
goog.string.makeSafe = function(c) {
  return null == c ? "" : String(c);
};
goog.string.buildString = function(c) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(c, d) {
  var e = 0;
  c = goog.string.trim(String(c)).split(".");
  d = goog.string.trim(String(d)).split(".");
  for (var f = Math.max(c.length, d.length), g = 0; 0 == e && g < f; g++) {
    var h = c[g] || "", k = d[g] || "";
    do {
      h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
      k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
      if (0 == h[0].length && 0 == k[0].length) {
        break;
      }
      e = 0 == h[1].length ? 0 : parseInt(h[1], 10);
      var l = 0 == k[1].length ? 0 : parseInt(k[1], 10);
      e = goog.string.compareElements_(e, l) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) || goog.string.compareElements_(h[2], k[2]);
      h = h[3];
      k = k[3];
    } while (0 == e);
  }
  return e;
};
goog.string.compareElements_ = function(c, d) {
  return c < d ? -1 : c > d ? 1 : 0;
};
goog.string.hashCode = function(c) {
  for (var d = 0, e = 0; e < c.length; ++e) {
    d = 31 * d + c.charCodeAt(e) >>> 0;
  }
  return d;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(c) {
  var d = Number(c);
  return 0 == d && goog.string.isEmptyOrWhitespace(c) ? NaN : d;
};
goog.string.isLowerCamelCase = function(c) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(c);
};
goog.string.isUpperCamelCase = function(c) {
  return /^([A-Z][a-z]*)+$/.test(c);
};
goog.string.toCamelCase = function(c) {
  return String(c).replace(/\-([a-z])/g, function(c, e) {
    return e.toUpperCase();
  });
};
goog.string.toSelectorCase = function(c) {
  return String(c).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(c, d) {
  d = goog.isString(d) ? goog.string.regExpEscape(d) : "\\s";
  return c.replace(new RegExp("(^" + (d ? "|[" + d + "]+" : "") + ")([a-z])", "g"), function(c, d, g) {
    return d + g.toUpperCase();
  });
};
goog.string.capitalize = function(c) {
  return String(c.charAt(0)).toUpperCase() + String(c.substr(1)).toLowerCase();
};
goog.string.parseInt = function(c) {
  isFinite(c) && (c = String(c));
  return goog.isString(c) ? /^\s*-?0x/i.test(c) ? parseInt(c, 16) : parseInt(c, 10) : NaN;
};
goog.string.splitLimit = function(c, d, e) {
  c = c.split(d);
  for (var f = []; 0 < e && c.length;) {
    f.push(c.shift()), e--;
  }
  c.length && f.push(c.join(d));
  return f;
};
goog.string.lastComponent = function(c, d) {
  if (d) {
    "string" == typeof d && (d = [d]);
  } else {
    return c;
  }
  for (var e = -1, f = 0; f < d.length; f++) {
    if ("" != d[f]) {
      var g = c.lastIndexOf(d[f]);
      g > e && (e = g);
    }
  }
  return -1 == e ? c : c.slice(e + 1);
};
goog.string.editDistance = function(c, d) {
  var e = [], f = [];
  if (c == d) {
    return 0;
  }
  if (!c.length || !d.length) {
    return Math.max(c.length, d.length);
  }
  for (var g = 0; g < d.length + 1; g++) {
    e[g] = g;
  }
  for (g = 0; g < c.length; g++) {
    f[0] = g + 1;
    for (var h = 0; h < d.length; h++) {
      f[h + 1] = Math.min(f[h] + 1, e[h + 1] + 1, e[h] + Number(c[g] != d[h]));
    }
    for (h = 0; h < e.length; h++) {
      e[h] = f[h];
    }
  }
  return f[d.length];
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var c = goog.labs.userAgent.util.getNavigator_();
  return c && (c = c.userAgent) ? c : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(c) {
  goog.labs.userAgent.util.userAgent_ = c || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(c) {
  var d = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(d, c);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(c) {
  var d = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(d, c);
};
goog.labs.userAgent.util.extractVersionTuples = function(c) {
  for (var d = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, e = [], f; f = d.exec(c);) {
    e.push([f[1], f[2], f[3] || void 0]);
  }
  return e;
};
goog.object = {};
goog.object.is = function(c, d) {
  return c === d ? 0 !== c || 1 / c === 1 / d : c !== c && d !== d;
};
goog.object.forEach = function(c, d, e) {
  for (var f in c) {
    d.call(e, c[f], f, c);
  }
};
goog.object.filter = function(c, d, e) {
  var f = {}, g;
  for (g in c) {
    d.call(e, c[g], g, c) && (f[g] = c[g]);
  }
  return f;
};
goog.object.map = function(c, d, e) {
  var f = {}, g;
  for (g in c) {
    f[g] = d.call(e, c[g], g, c);
  }
  return f;
};
goog.object.some = function(c, d, e) {
  for (var f in c) {
    if (d.call(e, c[f], f, c)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function(c, d, e) {
  for (var f in c) {
    if (!d.call(e, c[f], f, c)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function(c) {
  var d = 0, e;
  for (e in c) {
    d++;
  }
  return d;
};
goog.object.getAnyKey = function(c) {
  for (var d in c) {
    return d;
  }
};
goog.object.getAnyValue = function(c) {
  for (var d in c) {
    return c[d];
  }
};
goog.object.contains = function(c, d) {
  return goog.object.containsValue(c, d);
};
goog.object.getValues = function(c) {
  var d = [], e = 0, f;
  for (f in c) {
    d[e++] = c[f];
  }
  return d;
};
goog.object.getKeys = function(c) {
  var d = [], e = 0, f;
  for (f in c) {
    d[e++] = f;
  }
  return d;
};
goog.object.getValueByKeys = function(c, d) {
  var e = goog.isArrayLike(d), f = e ? d : arguments;
  for (e = e ? 0 : 1; e < f.length; e++) {
    if (null == c) {
      return;
    }
    c = c[f[e]];
  }
  return c;
};
goog.object.containsKey = function(c, d) {
  return null !== c && d in c;
};
goog.object.containsValue = function(c, d) {
  for (var e in c) {
    if (c[e] == d) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function(c, d, e) {
  for (var f in c) {
    if (d.call(e, c[f], f, c)) {
      return f;
    }
  }
};
goog.object.findValue = function(c, d, e) {
  return (d = goog.object.findKey(c, d, e)) && c[d];
};
goog.object.isEmpty = function(c) {
  for (var d in c) {
    return !1;
  }
  return !0;
};
goog.object.clear = function(c) {
  for (var d in c) {
    delete c[d];
  }
};
goog.object.remove = function(c, d) {
  var e;
  (e = d in c) && delete c[d];
  return e;
};
goog.object.add = function(c, d, e) {
  if (null !== c && d in c) {
    throw Error('The object already contains the key "' + d + '"');
  }
  goog.object.set(c, d, e);
};
goog.object.get = function(c, d, e) {
  return null !== c && d in c ? c[d] : e;
};
goog.object.set = function(c, d, e) {
  c[d] = e;
};
goog.object.setIfUndefined = function(c, d, e) {
  return d in c ? c[d] : c[d] = e;
};
goog.object.setWithReturnValueIfNotSet = function(c, d, e) {
  if (d in c) {
    return c[d];
  }
  e = e();
  return c[d] = e;
};
goog.object.equals = function(c, d) {
  for (var e in c) {
    if (!(e in d) || c[e] !== d[e]) {
      return !1;
    }
  }
  for (e in d) {
    if (!(e in c)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function(c) {
  var d = {}, e;
  for (e in c) {
    d[e] = c[e];
  }
  return d;
};
goog.object.unsafeClone = function(c) {
  var d = goog.typeOf(c);
  if ("object" == d || "array" == d) {
    if (goog.isFunction(c.clone)) {
      return c.clone();
    }
    d = "array" == d ? [] : {};
    for (var e in c) {
      d[e] = goog.object.unsafeClone(c[e]);
    }
    return d;
  }
  return c;
};
goog.object.transpose = function(c) {
  var d = {}, e;
  for (e in c) {
    d[c[e]] = e;
  }
  return d;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(c, d) {
  for (var e, f, g = 1; g < arguments.length; g++) {
    f = arguments[g];
    for (e in f) {
      c[e] = f[e];
    }
    for (var h = 0; h < goog.object.PROTOTYPE_FIELDS_.length; h++) {
      e = goog.object.PROTOTYPE_FIELDS_[h], Object.prototype.hasOwnProperty.call(f, e) && (c[e] = f[e]);
    }
  }
};
goog.object.create = function(c) {
  var d = arguments.length;
  if (1 == d && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (d % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var e = {}, f = 0; f < d; f += 2) {
    e[arguments[f]] = arguments[f + 1];
  }
  return e;
};
goog.object.createSet = function(c) {
  var d = arguments.length;
  if (1 == d && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var e = {}, f = 0; f < d; f++) {
    e[arguments[f]] = !0;
  }
  return e;
};
goog.object.createImmutableView = function(c) {
  var d = c;
  Object.isFrozen && !Object.isFrozen(c) && (d = Object.create(c), Object.freeze(d));
  return d;
};
goog.object.isImmutableView = function(c) {
  return !!Object.isFrozen && Object.isFrozen(c);
};
goog.object.getAllPropertyNames = function(c, d, e) {
  if (!c) {
    return [];
  }
  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return goog.object.getKeys(c);
  }
  for (var f = {}; c && (c !== Object.prototype || d) && (c !== Function.prototype || e);) {
    for (var g = Object.getOwnPropertyNames(c), h = 0; h < g.length; h++) {
      f[g[h]] = !0;
    }
    c = Object.getPrototypeOf(c);
  }
  return goog.object.getKeys(f);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function c(c) {
    c = goog.array.find(c, f);
    return e[c] || "";
  }
  var d = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(d);
  }
  d = goog.labs.userAgent.util.extractVersionTuples(d);
  var e = {};
  goog.array.forEach(d, function(c) {
    e[c[0]] = c[1];
  });
  var f = goog.partial(goog.object.containsKey, e);
  return goog.labs.userAgent.browser.isOpera() ? c(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? c(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? c(["Chrome", "CriOS"]) : (d = d[2]) && d[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(c) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), c);
};
goog.labs.userAgent.browser.getIEVersion_ = function(c) {
  var d = /rv: *([\d\.]*)/.exec(c);
  if (d && d[1]) {
    return d[1];
  }
  d = "";
  var e = /MSIE +([\d\.]+)/.exec(c);
  if (e && e[1]) {
    if (c = /Trident\/(\d.\d)/.exec(c), "7.0" == e[1]) {
      if (c && c[1]) {
        switch(c[1]) {
          case "4.0":
            d = "8.0";
            break;
          case "5.0":
            d = "9.0";
            break;
          case "6.0":
            d = "10.0";
            break;
          case "7.0":
            d = "11.0";
        }
      } else {
        d = "7.0";
      }
    } else {
      d = e[1];
    }
  }
  return d;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var c = goog.labs.userAgent.util.getUserAgent();
  if (c) {
    c = goog.labs.userAgent.util.extractVersionTuples(c);
    var d = goog.labs.userAgent.engine.getEngineTuple_(c);
    if (d) {
      return "Gecko" == d[0] ? goog.labs.userAgent.engine.getVersionForKey_(c, "Firefox") : d[1];
    }
    c = c[0];
    var e;
    if (c && (e = c[2]) && (e = /Trident\/([^\s;]+)/.exec(e))) {
      return e[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(c) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return c[1];
  }
  for (var d = 0; d < c.length; d++) {
    var e = c[d];
    if ("Edge" == e[0]) {
      return e;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(c) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), c);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(c, d) {
  return (c = goog.array.find(c, function(c) {
    return d == c[0];
  })) && c[1] || "";
};
goog.async.throwException = function(c) {
  goog.global.setTimeout(function() {
    throw c;
  }, 0);
};
goog.async.nextTick = function(c, d, e) {
  var f = c;
  d && (f = goog.bind(c, d));
  f = goog.async.nextTick.wrapCallback_(f);
  goog.isFunction(goog.global.setImmediate) && (e || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(f) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(f));
};
goog.async.nextTick.useSetImmediate_ = function() {
  return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0;
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  var c = goog.global.MessageChannel;
  "undefined" === typeof c && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (c = function() {
    var c = document.createElement("IFRAME");
    c.style.display = "none";
    c.src = "";
    document.documentElement.appendChild(c);
    var d = c.contentWindow;
    c = d.document;
    c.open();
    c.write("");
    c.close();
    var e = "callImmediate" + Math.random(), f = "file:" == d.location.protocol ? "*" : d.location.protocol + "//" + d.location.host;
    c = goog.bind(function(c) {
      if (("*" == f || c.origin == f) && c.data == e) {
        this.port1.onmessage();
      }
    }, this);
    d.addEventListener("message", c, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      d.postMessage(e, f);
    }};
  });
  if ("undefined" !== typeof c && !goog.labs.userAgent.browser.isIE()) {
    var d = new c, e = {}, f = e;
    d.port1.onmessage = function() {
      if (goog.isDef(e.next)) {
        e = e.next;
        var c = e.cb;
        e.cb = null;
        c();
      }
    };
    return function(c) {
      f.next = {cb:c};
      f = f.next;
      d.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(c) {
    var d = document.createElement("SCRIPT");
    d.onreadystatechange = function() {
      d.onreadystatechange = null;
      d.parentNode.removeChild(d);
      d = null;
      c();
      c = null;
    };
    document.documentElement.appendChild(d);
  } : function(c) {
    goog.global.setTimeout(c, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(c) {
  goog.async.nextTick.wrapCallback_ = c;
});
goog.async.run = function(c, d) {
  goog.async.run.schedule_ || goog.async.run.initializeRunner_();
  goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
  goog.async.run.workQueue_.add(c, d);
};
goog.async.run.initializeRunner_ = function() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var c = goog.global.Promise.resolve(void 0);
    goog.async.run.schedule_ = function() {
      c.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function(c) {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
    c && c(goog.async.run.processWorkQueue);
  };
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
  goog.async.run.workQueueScheduled_ = !1;
  goog.async.run.workQueue_ = new goog.async.WorkQueue;
});
goog.async.run.processWorkQueue = function() {
  for (var c; c = goog.async.run.workQueue_.remove();) {
    try {
      c.fn.call(c.scope);
    } catch (d) {
      goog.async.throwException(d);
    }
    goog.async.run.workQueue_.returnUnused(c);
  }
  goog.async.run.workQueueScheduled_ = !1;
};
goog.promise = {};
goog.promise.Resolver = function() {
};
goog.Promise = function(c, d) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = void 0;
  this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
  this.executing_ = !1;
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
  goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
  if (c != goog.nullFunction) {
    try {
      var e = this;
      c.call(d, function(c) {
        e.resolve_(goog.Promise.State_.FULFILLED, c);
      }, function(c) {
        if (goog.DEBUG && !(c instanceof goog.Promise.CancellationError)) {
          try {
            if (c instanceof Error) {
              throw c;
            }
            throw Error("Promise rejected.");
          } catch (g) {
          }
        }
        e.resolve_(goog.Promise.State_.REJECTED, c);
      });
    } catch (f) {
      this.resolve_(goog.Promise.State_.REJECTED, f);
    }
  }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_;
}, function(c) {
  c.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(c, d, e) {
  var f = goog.Promise.freelist_.get();
  f.onFulfilled = c;
  f.onRejected = d;
  f.context = e;
  return f;
};
goog.Promise.returnEntry_ = function(c) {
  goog.Promise.freelist_.put(c);
};
goog.Promise.resolve = function(c) {
  if (c instanceof goog.Promise) {
    return c;
  }
  var d = new goog.Promise(goog.nullFunction);
  d.resolve_(goog.Promise.State_.FULFILLED, c);
  return d;
};
goog.Promise.reject = function(c) {
  return new goog.Promise(function(d, e) {
    e(c);
  });
};
goog.Promise.resolveThen_ = function(c, d, e) {
  goog.Promise.maybeThen_(c, d, e, null) || goog.async.run(goog.partial(d, c));
};
goog.Promise.race = function(c) {
  return new goog.Promise(function(d, e) {
    c.length || d(void 0);
    for (var f = 0, g; f < c.length; f++) {
      g = c[f], goog.Promise.resolveThen_(g, d, e);
    }
  });
};
goog.Promise.all = function(c) {
  return new goog.Promise(function(d, e) {
    var f = c.length, g = [];
    if (f) {
      for (var h = function(c, e) {
        f--;
        g[c] = e;
        0 == f && d(g);
      }, k = function(c) {
        e(c);
      }, l = 0, m; l < c.length; l++) {
        m = c[l], goog.Promise.resolveThen_(m, goog.partial(h, l), k);
      }
    } else {
      d(g);
    }
  });
};
goog.Promise.allSettled = function(c) {
  return new goog.Promise(function(d, e) {
    var f = c.length, g = [];
    if (f) {
      e = function(c, e, h) {
        f--;
        g[c] = e ? {fulfilled:!0, value:h} : {fulfilled:!1, reason:h};
        0 == f && d(g);
      };
      for (var h = 0, k; h < c.length; h++) {
        k = c[h], goog.Promise.resolveThen_(k, goog.partial(e, h, !0), goog.partial(e, h, !1));
      }
    } else {
      d(g);
    }
  });
};
goog.Promise.firstFulfilled = function(c) {
  return new goog.Promise(function(d, e) {
    var f = c.length, g = [];
    if (f) {
      for (var h = function(c) {
        d(c);
      }, k = function(c, d) {
        f--;
        g[c] = d;
        0 == f && e(g);
      }, l = 0, m; l < c.length; l++) {
        m = c[l], goog.Promise.resolveThen_(m, h, goog.partial(k, l));
      }
    } else {
      d(void 0);
    }
  });
};
goog.Promise.withResolver = function() {
  var c, d, e = new goog.Promise(function(e, g) {
    c = e;
    d = g;
  });
  return new goog.Promise.Resolver_(e, c, d);
};
goog.Promise.prototype.then = function(c, d, e) {
  null != c && goog.asserts.assertFunction(c, "opt_onFulfilled should be a function.");
  null != d && goog.asserts.assertFunction(d, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  return this.addChildPromise_(goog.isFunction(c) ? c : null, goog.isFunction(d) ? d : null, e);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(c, d, e) {
  null != c && goog.asserts.assertFunction(c, "opt_onFulfilled should be a function.");
  null != d && goog.asserts.assertFunction(d, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(c || goog.nullFunction, d || null, e));
};
goog.Promise.prototype.thenAlways = function(c, d) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
  c = goog.Promise.getCallbackEntry_(c, c, d);
  c.always = !0;
  this.addCallbackEntry_(c);
  return this;
};
goog.Promise.prototype.thenCatch = function(c, d) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
  return this.addChildPromise_(null, c, d);
};
goog.Promise.prototype.cancel = function(c) {
  this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
    var d = new goog.Promise.CancellationError(c);
    this.cancelInternal_(d);
  }, this);
};
goog.Promise.prototype.cancelInternal_ = function(c) {
  this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, c), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, c));
};
goog.Promise.prototype.cancelChild_ = function(c, d) {
  if (this.callbackEntries_) {
    for (var e = 0, f = null, g = null, h = this.callbackEntries_; h && (h.always || (e++, h.child == c && (f = h), !(f && 1 < e))); h = h.next) {
      f || (g = h);
    }
    f && (this.state_ == goog.Promise.State_.PENDING && 1 == e ? this.cancelInternal_(d) : (g ? this.removeEntryAfter_(g) : this.popEntry_(), this.executeCallback_(f, goog.Promise.State_.REJECTED, d)));
  }
};
goog.Promise.prototype.addCallbackEntry_ = function(c) {
  this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
  this.queueEntry_(c);
};
goog.Promise.prototype.addChildPromise_ = function(c, d, e) {
  var f = goog.Promise.getCallbackEntry_(null, null, null);
  f.child = new goog.Promise(function(g, h) {
    f.onFulfilled = c ? function(d) {
      try {
        var f = c.call(e, d);
        g(f);
      } catch (m) {
        h(m);
      }
    } : g;
    f.onRejected = d ? function(c) {
      try {
        var f = d.call(e, c);
        !goog.isDef(f) && c instanceof goog.Promise.CancellationError ? h(c) : g(f);
      } catch (m) {
        h(m);
      }
    } : h;
  });
  f.child.parent_ = this;
  this.addCallbackEntry_(f);
  return f.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(c) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, c);
};
goog.Promise.prototype.unblockAndReject_ = function(c) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, c);
};
goog.Promise.prototype.resolve_ = function(c, d) {
  this.state_ == goog.Promise.State_.PENDING && (this === d && (c = goog.Promise.State_.REJECTED, d = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(d, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = d, this.state_ = c, this.parent_ = null, this.scheduleCallbacks_(), c != goog.Promise.State_.REJECTED || d instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, d)));
};
goog.Promise.maybeThen_ = function(c, d, e, f) {
  if (c instanceof goog.Promise) {
    return c.thenVoid(d, e, f), !0;
  }
  if (goog.Thenable.isImplementedBy(c)) {
    return c.then(d, e, f), !0;
  }
  if (goog.isObject(c)) {
    try {
      var g = c.then;
      if (goog.isFunction(g)) {
        return goog.Promise.tryThen_(c, g, d, e, f), !0;
      }
    } catch (h) {
      return e.call(f, h), !0;
    }
  }
  return !1;
};
goog.Promise.tryThen_ = function(c, d, e, f, g) {
  var h = !1, k = function(c) {
    h || (h = !0, e.call(g, c));
  }, l = function(c) {
    h || (h = !0, f.call(g, c));
  };
  try {
    d.call(c, k, l);
  } catch (m) {
    l(m);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this));
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(c) {
  goog.asserts.assert(null != c.onFulfilled);
  this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = c : this.callbackEntries_ = c;
  this.callbackEntriesTail_ = c;
};
goog.Promise.prototype.popEntry_ = function() {
  var c = null;
  this.callbackEntries_ && (c = this.callbackEntries_, this.callbackEntries_ = c.next, c.next = null);
  this.callbackEntries_ || (this.callbackEntriesTail_ = null);
  null != c && goog.asserts.assert(null != c.onFulfilled);
  return c;
};
goog.Promise.prototype.removeEntryAfter_ = function(c) {
  goog.asserts.assert(this.callbackEntries_);
  goog.asserts.assert(null != c);
  c.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = c);
  c.next = c.next.next;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  for (var c; c = this.popEntry_();) {
    goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(c, this.state_, this.result_);
  }
  this.executing_ = !1;
};
goog.Promise.prototype.executeCallback_ = function(c, d, e) {
  d == goog.Promise.State_.REJECTED && c.onRejected && !c.always && this.removeUnhandledRejection_();
  if (c.child) {
    c.child.parent_ = null, goog.Promise.invokeCallback_(c, d, e);
  } else {
    try {
      c.always ? c.onFulfilled.call(c.context) : goog.Promise.invokeCallback_(c, d, e);
    } catch (f) {
      goog.Promise.handleRejection_.call(null, f);
    }
  }
  goog.Promise.returnEntry_(c);
};
goog.Promise.invokeCallback_ = function(c, d, e) {
  d == goog.Promise.State_.FULFILLED ? c.onFulfilled.call(c.context, e) : c.onRejected && c.onRejected.call(c.context, e);
};
goog.Promise.prototype.addStackTrace_ = function(c) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(c.stack)) {
    var d = c.stack.split("\n", 4)[3];
    c = c.message;
    c += Array(11 - c.length).join(" ");
    this.stack_.push(c + d);
  }
};
goog.Promise.prototype.appendLongStack_ = function(c) {
  if (goog.Promise.LONG_STACK_TRACES && c && goog.isString(c.stack) && this.stack_.length) {
    for (var d = ["Promise trace:"], e = this; e; e = e.parent_) {
      for (var f = this.currentStep_; 0 <= f; f--) {
        d.push(e.stack_[f]);
      }
      d.push("Value: [" + (e.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(e.result_) + ">");
    }
    c.stack += "\n\n" + d.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY) {
    for (var c = this; c && c.unhandledRejectionId_; c = c.parent_) {
      goog.global.clearTimeout(c.unhandledRejectionId_), c.unhandledRejectionId_ = 0;
    }
  } else {
    if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY) {
      for (c = this; c && c.hadUnhandledRejection_; c = c.parent_) {
        c.hadUnhandledRejection_ = !1;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(c, d) {
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? c.unhandledRejectionId_ = goog.global.setTimeout(function() {
    c.appendLongStack_(d);
    goog.Promise.handleRejection_.call(null, d);
  }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (c.hadUnhandledRejection_ = !0, goog.async.run(function() {
    c.hadUnhandledRejection_ && (c.appendLongStack_(d), goog.Promise.handleRejection_.call(null, d));
  }));
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(c) {
  goog.Promise.handleRejection_ = c;
};
goog.Promise.CancellationError = function(c) {
  goog.debug.Error.call(this, c);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(c, d, e) {
  this.promise = c;
  this.resolve = d;
  this.reject = e;
};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;
goog.Disposable = function() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var c = [], d;
  for (d in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(d) && c.push(goog.Disposable.instances_[Number(d)]);
  }
  return c;
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var c = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(c)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && this.onDisposeCallbacks_ && 0 < this.onDisposeCallbacks_.length) {
      throw Error(this + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
    }
    delete goog.Disposable.instances_[c];
  }
};
goog.Disposable.prototype.registerDisposable = function(c) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, c));
};
goog.Disposable.prototype.addOnDisposeCallback = function(c, d) {
  this.disposed_ ? goog.isDef(d) ? c.call(d) : c() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(d) ? goog.bind(c, d) : c));
};
goog.Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    for (; this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function(c) {
  return c && "function" == typeof c.isDisposed ? c.isDisposed() : !1;
};
goog.dispose = function(c) {
  c && "function" == typeof c.dispose && c.dispose();
};
goog.disposeAll = function(c) {
  for (var d = 0, e = arguments.length; d < e; ++d) {
    var f = arguments[d];
    goog.isArrayLike(f) ? goog.disposeAll.apply(null, f) : goog.dispose(f);
  }
};
goog.debug.errorcontext = {};
goog.debug.errorcontext.addErrorContext = function(c, d, e) {
  c[goog.debug.errorcontext.CONTEXT_KEY_] || (c[goog.debug.errorcontext.CONTEXT_KEY_] = {});
  c[goog.debug.errorcontext.CONTEXT_KEY_][d] = e;
};
goog.debug.errorcontext.getErrorContext = function(c) {
  return c[goog.debug.errorcontext.CONTEXT_KEY_] || {};
};
goog.debug.errorcontext.CONTEXT_KEY_ = "__closure__error__context__984382";
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.isChromecast = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrKey");
};
goog.labs.userAgent.platform.getVersion = function() {
  var c = goog.labs.userAgent.util.getUserAgent(), d = "";
  goog.labs.userAgent.platform.isWindows() ? (d = /Windows (?:NT|Phone) ([0-9.]+)/, d = (c = d.exec(c)) ? c[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (d = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, d = (c = d.exec(c)) && c[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (d = /Mac OS X ([0-9_.]+)/, d = (c = d.exec(c)) ? c[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (d = /Android\s+([^\);]+)(\)|;)/, d = (c = d.exec(c)) && c[1]) : goog.labs.userAgent.platform.isChromeOS() && 
  (d = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, d = (c = d.exec(c)) && c[1]);
  return d || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(c) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), c);
};
goog.reflect = {};
goog.reflect.object = function(c, d) {
  return d;
};
goog.reflect.objectProperty = function(c, d) {
  return c;
};
goog.reflect.sinkValue = function(c) {
  goog.reflect.sinkValue[" "](c);
  return c;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(c, d) {
  try {
    return goog.reflect.sinkValue(c[d]), !0;
  } catch (e) {
  }
  return !1;
};
goog.reflect.cache = function(c, d, e, f) {
  f = f ? f(d) : d;
  return Object.prototype.hasOwnProperty.call(c, f) ? c[f] : c[f] = e(d);
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigatorTyped = function() {
  return goog.global.navigator || null;
};
goog.userAgent.getNavigator = function() {
  return goog.userAgent.getNavigatorTyped();
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var c = goog.userAgent.getNavigatorTyped();
  return c && c.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var c = goog.userAgent.getNavigatorTyped();
  return !!c && goog.string.contains(c.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.determineVersion_ = function() {
  var c = "", d = goog.userAgent.getVersionRegexResult_();
  d && (c = d ? d[1] : "");
  return goog.userAgent.IE && (d = goog.userAgent.getDocumentMode_(), null != d && d > parseFloat(c)) ? String(d) : c;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var c = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv:([^\);]+)(\)|;)/.exec(c);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(c);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(c);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(c);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(c);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var c = goog.global.document;
  return c ? c.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(c, d) {
  return goog.string.compareVersions(c, d);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(c) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, c, function() {
    return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, c);
  });
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(c) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= c;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var c = goog.global.document, d = goog.userAgent.getDocumentMode_();
  if (c && goog.userAgent.IE) {
    return d || ("CSS1Compat" == c.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
  }
}();
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(c, d, e) {
  e = e || goog.global;
  var f = e.onerror, g = !!d;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (g = !g);
  e.onerror = function(d, e, l, m, n) {
    f && f(d, e, l, m, n);
    c({message:d, fileName:e, line:l, lineNumber:l, col:m, error:n});
    return g;
  };
};
goog.debug.expose = function(c, d) {
  if ("undefined" == typeof c) {
    return "undefined";
  }
  if (null == c) {
    return "NULL";
  }
  var e = [], f;
  for (f in c) {
    if (d || !goog.isFunction(c[f])) {
      var g = f + " = ";
      try {
        g += c[f];
      } catch (h) {
        g += "*** " + h + " ***";
      }
      e.push(g);
    }
  }
  return e.join("\n");
};
goog.debug.deepExpose = function(c, d) {
  var e = [], f = [], g = {}, h = function(c, l) {
    var k = l + "  ";
    try {
      if (goog.isDef(c)) {
        if (goog.isNull(c)) {
          e.push("NULL");
        } else {
          if (goog.isString(c)) {
            e.push('"' + c.replace(/\n/g, "\n" + l) + '"');
          } else {
            if (goog.isFunction(c)) {
              e.push(String(c).replace(/\n/g, "\n" + l));
            } else {
              if (goog.isObject(c)) {
                goog.hasUid(c) || f.push(c);
                var n = goog.getUid(c);
                if (g[n]) {
                  e.push("*** reference loop detected (id=" + n + ") ***");
                } else {
                  g[n] = !0;
                  e.push("{");
                  for (var r in c) {
                    if (d || !goog.isFunction(c[r])) {
                      e.push("\n"), e.push(k), e.push(r + " = "), h(c[r], k);
                    }
                  }
                  e.push("\n" + l + "}");
                  delete g[n];
                }
              } else {
                e.push(c);
              }
            }
          }
        }
      } else {
        e.push("undefined");
      }
    } catch (t) {
      e.push("*** " + t + " ***");
    }
  };
  h(c, "");
  for (c = 0; c < f.length; c++) {
    goog.removeUid(f[c]);
  }
  return e.join("");
};
goog.debug.exposeArray = function(c) {
  for (var d = [], e = 0; e < c.length; e++) {
    goog.isArray(c[e]) ? d.push(goog.debug.exposeArray(c[e])) : d.push(c[e]);
  }
  return "[ " + d.join(", ") + " ]";
};
goog.debug.normalizeErrorObject = function(c) {
  var d = goog.getObjectByName("window.location.href");
  if (goog.isString(c)) {
    return {message:c, name:"Unknown error", lineNumber:"Not available", fileName:d, stack:"Not available"};
  }
  var e = !1;
  try {
    var f = c.lineNumber || c.line || "Not available";
  } catch (h) {
    f = "Not available", e = !0;
  }
  try {
    var g = c.fileName || c.filename || c.sourceURL || goog.global.$googDebugFname || d;
  } catch (h) {
    g = "Not available", e = !0;
  }
  return !e && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {message:c.message || "Not available", name:c.name || "UnknownError", lineNumber:f, fileName:g, stack:c.stack || "Not available"};
};
goog.debug.enhanceError = function(c, d) {
  c instanceof Error || (c = Error(c), Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError));
  c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
  if (d) {
    for (var e = 0; c["message" + e];) {
      ++e;
    }
    c["message" + e] = String(d);
  }
  return c;
};
goog.debug.enhanceErrorWithContext = function(c, d) {
  c = goog.debug.enhanceError(c);
  if (d) {
    for (var e in d) {
      goog.debug.errorcontext.addErrorContext(c, e, d[e]);
    }
  }
  return c;
};
goog.debug.getStacktraceSimple = function(c) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var d = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (d) {
      return d;
    }
  }
  d = [];
  for (var e = arguments.callee.caller, f = 0; e && (!c || f < c);) {
    d.push(goog.debug.getFunctionName(e));
    d.push("()\n");
    try {
      e = e.caller;
    } catch (g) {
      d.push("[exception trying to get caller]\n");
      break;
    }
    f++;
    if (f >= goog.debug.MAX_STACK_DEPTH) {
      d.push("[...long stack...]");
      break;
    }
  }
  c && f >= c ? d.push("[...reached max depth limit...]") : d.push("[end]");
  return d.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(c) {
  var d = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(d, c), String(d.stack);
  }
  try {
    throw d;
  } catch (e) {
    d = e;
  }
  return (c = d.stack) ? String(c) : null;
};
goog.debug.getStacktrace = function(c) {
  var d;
  goog.debug.FORCE_SLOPPY_STACKS || (d = goog.debug.getNativeStackTrace_(c || goog.debug.getStacktrace));
  d || (d = goog.debug.getStacktraceHelper_(c || arguments.callee.caller, []));
  return d;
};
goog.debug.getStacktraceHelper_ = function(c, d) {
  var e = [];
  if (goog.array.contains(d, c)) {
    e.push("[...circular reference...]");
  } else {
    if (c && d.length < goog.debug.MAX_STACK_DEPTH) {
      e.push(goog.debug.getFunctionName(c) + "(");
      for (var f = c.arguments, g = 0; f && g < f.length; g++) {
        0 < g && e.push(", ");
        var h = f[g];
        switch(typeof h) {
          case "object":
            h = h ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            h = String(h);
            break;
          case "boolean":
            h = h ? "true" : "false";
            break;
          case "function":
            h = (h = goog.debug.getFunctionName(h)) ? h : "[fn]";
            break;
          default:
            h = typeof h;
        }
        40 < h.length && (h = h.substr(0, 40) + "...");
        e.push(h);
      }
      d.push(c);
      e.push(")\n");
      try {
        e.push(goog.debug.getStacktraceHelper_(c.caller, d));
      } catch (k) {
        e.push("[exception trying to get caller]\n");
      }
    } else {
      c ? e.push("[...long stack...]") : e.push("[end]");
    }
  }
  return e.join("");
};
goog.debug.setFunctionResolver = function(c) {
  goog.debug.fnNameResolver_ = c;
};
goog.debug.getFunctionName = function(c) {
  if (goog.debug.fnNameCache_[c]) {
    return goog.debug.fnNameCache_[c];
  }
  if (goog.debug.fnNameResolver_) {
    var d = goog.debug.fnNameResolver_(c);
    if (d) {
      return goog.debug.fnNameCache_[c] = d;
    }
  }
  c = String(c);
  goog.debug.fnNameCache_[c] || (d = /function ([^\(]+)/.exec(c), goog.debug.fnNameCache_[c] = d ? d[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[c];
};
goog.debug.makeWhitespaceVisible = function(c) {
  return c.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.runtimeType = function(c) {
  return c instanceof Function ? c.displayName || c.name || "unknown type name" : c instanceof Object ? c.constructor.displayName || c.constructor.name || Object.prototype.toString.call(c) : null === c ? "null" : typeof c;
};
goog.debug.fnNameCache_ = {};
goog.debug.freezeInternal_ = goog.DEBUG && Object.freeze || function(c) {
  return c;
};
goog.debug.freeze = function(c) {
  return goog.debug.freezeInternal_(c);
};
goog.events = {};
$jscomp.scope.purify = function(c) {
  return c();
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && 
goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || 
!goog.global.navigator.maxTouchPoints && !goog.global.navigator.msMaxTouchPoints), POINTER_EVENTS:"PointerEvent" in goog.global, MSPOINTER_EVENTS:"MSPointerEvent" in goog.global && !(!goog.global.navigator || !goog.global.navigator.msPointerEnabled), PASSIVE_EVENTS:(0,$jscomp.scope.purify)(function() {
  if (!goog.global.addEventListener || !Object.defineProperty) {
    return !1;
  }
  var c = !1, d = Object.defineProperty({}, "passive", {get:function() {
    c = !0;
  }});
  goog.global.addEventListener("test", goog.nullFunction, d);
  goog.global.removeEventListener("test", goog.nullFunction, d);
  return c;
})};
goog.events.EventId = function(c) {
  this.id = c;
};
goog.events.EventId.prototype.toString = function() {
  return this.id;
};
goog.events.Event = function(c, d) {
  this.type = c instanceof goog.events.EventId ? String(c) : c;
  this.currentTarget = this.target = d;
  this.defaultPrevented = this.propagationStopped_ = !1;
  this.returnValue_ = !0;
};
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1;
};
goog.events.Event.stopPropagation = function(c) {
  c.stopPropagation();
};
goog.events.Event.preventDefault = function(c) {
  c.preventDefault();
};
goog.events.getVendorPrefixedName_ = function(c) {
  return goog.userAgent.WEBKIT ? "webkit" + c : goog.userAgent.OPERA ? "o" + c.toLowerCase() : c.toLowerCase();
};
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", MOUSECANCEL:"mousecancel", SELECTIONCHANGE:"selectionchange", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:"focusin", FOCUSOUT:"focusout", CHANGE:"change", 
RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DEVICECHANGE:"devicechange", DEVICEMOTION:"devicemotion", DEVICEORIENTATION:"deviceorientation", 
DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", RATECHANGE:"ratechange", SEEKED:"seeked", SEEKING:"seeking", 
STALLED:"stalled", SUSPEND:"suspend", TIMEUPDATE:"timeupdate", VOLUMECHANGE:"volumechange", WAITING:"waiting", SOURCEOPEN:"sourceopen", SOURCEENDED:"sourceended", SOURCECLOSED:"sourceclosed", ABORT:"abort", UPDATE:"update", UPDATESTART:"updatestart", UPDATEEND:"updateend", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", 
MESSAGE:"message", CONNECT:"connect", INSTALL:"install", ACTIVATE:"activate", FETCH:"fetch", FOREIGNFETCH:"foreignfetch", MESSAGEERROR:"messageerror", STATECHANGE:"statechange", UPDATEFOUND:"updatefound", CONTROLLERCHANGE:"controllerchange", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), 
POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", 
MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:goog.userAgent.IE ? "textinput" : "textInput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend", 
BEFOREINPUT:"beforeinput", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", 
DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified", BEFOREPRINT:"beforeprint", AFTERPRINT:"afterprint", BEFOREINSTALLPROMPT:"beforeinstallprompt", APPINSTALLED:"appinstalled"};
goog.events.getPointerFallbackEventName_ = function(c, d, e) {
  return goog.events.BrowserFeature.POINTER_EVENTS ? c : goog.events.BrowserFeature.MSPOINTER_EVENTS ? d : e;
};
goog.events.PointerFallbackEventType = {POINTERDOWN:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERDOWN, goog.events.EventType.MSPOINTERDOWN, goog.events.EventType.MOUSEDOWN), POINTERUP:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERUP, goog.events.EventType.MSPOINTERUP, goog.events.EventType.MOUSEUP), POINTERCANCEL:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERCANCEL, goog.events.EventType.MSPOINTERCANCEL, goog.events.EventType.MOUSECANCEL), 
POINTERMOVE:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERMOVE, goog.events.EventType.MSPOINTERMOVE, goog.events.EventType.MOUSEMOVE), POINTEROVER:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROVER, goog.events.EventType.MSPOINTEROVER, goog.events.EventType.MOUSEOVER), POINTEROUT:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROUT, goog.events.EventType.MSPOINTEROUT, goog.events.EventType.MOUSEOUT), POINTERENTER:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERENTER, 
goog.events.EventType.MSPOINTERENTER, goog.events.EventType.MOUSEENTER), POINTERLEAVE:goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERLEAVE, goog.events.EventType.MSPOINTERLEAVE, goog.events.EventType.MOUSELEAVE)};
goog.events.PointerAsMouseEventType = {MOUSEDOWN:goog.events.PointerFallbackEventType.POINTERDOWN, MOUSEUP:goog.events.PointerFallbackEventType.POINTERUP, MOUSECANCEL:goog.events.PointerFallbackEventType.POINTERCANCEL, MOUSEMOVE:goog.events.PointerFallbackEventType.POINTERMOVE, MOUSEOVER:goog.events.PointerFallbackEventType.POINTEROVER, MOUSEOUT:goog.events.PointerFallbackEventType.POINTEROUT, MOUSEENTER:goog.events.PointerFallbackEventType.POINTERENTER, MOUSELEAVE:goog.events.PointerFallbackEventType.POINTERLEAVE};
goog.events.BrowserEvent = function(c, d) {
  goog.events.Event.call(this, c ? c.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.key = "";
  this.charCode = this.keyCode = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.platformModifierKey = !1;
  this.pointerId = 0;
  this.pointerType = "";
  this.event_ = null;
  c && this.init(c, d);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.PointerType = {MOUSE:"mouse", PEN:"pen", TOUCH:"touch"};
goog.events.BrowserEvent.IEButtonMap = goog.debug.freeze([1, 4, 2]);
goog.events.BrowserEvent.IE_BUTTON_MAP = goog.events.BrowserEvent.IEButtonMap;
goog.events.BrowserEvent.IE_POINTER_TYPE_MAP = goog.debug.freeze({2:goog.events.BrowserEvent.PointerType.TOUCH, 3:goog.events.BrowserEvent.PointerType.PEN, 4:goog.events.BrowserEvent.PointerType.MOUSE});
goog.events.BrowserEvent.prototype.init = function(c, d) {
  var e = this.type = c.type, f = c.changedTouches ? c.changedTouches[0] : null;
  this.target = c.target || c.srcElement;
  this.currentTarget = d;
  (d = c.relatedTarget) ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(d, "nodeName") || (d = null)) : e == goog.events.EventType.MOUSEOVER ? d = c.fromElement : e == goog.events.EventType.MOUSEOUT && (d = c.toElement);
  this.relatedTarget = d;
  goog.isNull(f) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== c.offsetX ? c.offsetX : c.layerX, this.offsetY = goog.userAgent.WEBKIT || void 0 !== c.offsetY ? c.offsetY : c.layerY, this.clientX = void 0 !== c.clientX ? c.clientX : c.pageX, this.clientY = void 0 !== c.clientY ? c.clientY : c.pageY, this.screenX = c.screenX || 0, this.screenY = c.screenY || 0) : (this.clientX = void 0 !== f.clientX ? f.clientX : f.pageX, this.clientY = void 0 !== f.clientY ? f.clientY : f.pageY, this.screenX = 
  f.screenX || 0, this.screenY = f.screenY || 0);
  this.button = c.button;
  this.keyCode = c.keyCode || 0;
  this.key = c.key || "";
  this.charCode = c.charCode || ("keypress" == e ? c.keyCode : 0);
  this.ctrlKey = c.ctrlKey;
  this.altKey = c.altKey;
  this.shiftKey = c.shiftKey;
  this.metaKey = c.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? c.metaKey : c.ctrlKey;
  this.pointerId = c.pointerId || 0;
  this.pointerType = goog.events.BrowserEvent.getPointerType_(c);
  this.state = c.state;
  this.event_ = c;
  c.defaultPrevented && this.preventDefault();
};
goog.events.BrowserEvent.prototype.isButton = function(c) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == c : "click" == this.type ? c == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IE_BUTTON_MAP[c]);
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey);
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var c = this.event_;
  if (c.preventDefault) {
    c.preventDefault();
  } else {
    if (c.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if (c.ctrlKey || 112 <= c.keyCode && 123 >= c.keyCode) {
          c.keyCode = -1;
        }
      } catch (d) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_;
};
goog.events.BrowserEvent.getPointerType_ = function(c) {
  return goog.isString(c.pointerType) ? c.pointerType : goog.events.BrowserEvent.IE_POINTER_TYPE_MAP[c.pointerType] || "";
};
goog.events.Listenable = function() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1e6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(c) {
  c.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.events.Listenable.isImplementedBy = function(c) {
  return !(!c || !c[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
};
goog.events.ListenableKey = function() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
  return ++goog.events.ListenableKey.counter_;
};
goog.events.Listener = function(c, d, e, f, g, h) {
  goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
  this.listener = c;
  this.proxy = d;
  this.src = e;
  this.type = f;
  this.capture = !!g;
  this.handler = h;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = this.callOnce = !1;
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
  this.removed = !0;
  this.handler = this.src = this.proxy = this.listener = null;
};
goog.events.ListenerMap = function(c) {
  this.src = c;
  this.listeners = {};
  this.typeCount_ = 0;
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
  return this.typeCount_;
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
  var c = 0, d;
  for (d in this.listeners) {
    c += this.listeners[d].length;
  }
  return c;
};
goog.events.ListenerMap.prototype.add = function(c, d, e, f, g) {
  var h = c.toString();
  c = this.listeners[h];
  c || (c = this.listeners[h] = [], this.typeCount_++);
  var k = goog.events.ListenerMap.findListenerIndex_(c, d, f, g);
  -1 < k ? (d = c[k], e || (d.callOnce = !1)) : (d = new goog.events.Listener(d, null, this.src, h, !!f, g), d.callOnce = e, c.push(d));
  return d;
};
goog.events.ListenerMap.prototype.remove = function(c, d, e, f) {
  c = c.toString();
  if (!(c in this.listeners)) {
    return !1;
  }
  var g = this.listeners[c];
  d = goog.events.ListenerMap.findListenerIndex_(g, d, e, f);
  return -1 < d ? (g[d].markAsRemoved(), goog.array.removeAt(g, d), 0 == g.length && (delete this.listeners[c], this.typeCount_--), !0) : !1;
};
goog.events.ListenerMap.prototype.removeByKey = function(c) {
  var d = c.type;
  if (!(d in this.listeners)) {
    return !1;
  }
  var e = goog.array.remove(this.listeners[d], c);
  e && (c.markAsRemoved(), 0 == this.listeners[d].length && (delete this.listeners[d], this.typeCount_--));
  return e;
};
goog.events.ListenerMap.prototype.removeAll = function(c) {
  c = c && c.toString();
  var d = 0, e;
  for (e in this.listeners) {
    if (!c || e == c) {
      for (var f = this.listeners[e], g = 0; g < f.length; g++) {
        ++d, f[g].markAsRemoved();
      }
      delete this.listeners[e];
      this.typeCount_--;
    }
  }
  return d;
};
goog.events.ListenerMap.prototype.getListeners = function(c, d) {
  c = this.listeners[c.toString()];
  var e = [];
  if (c) {
    for (var f = 0; f < c.length; ++f) {
      var g = c[f];
      g.capture == d && e.push(g);
    }
  }
  return e;
};
goog.events.ListenerMap.prototype.getListener = function(c, d, e, f) {
  c = this.listeners[c.toString()];
  var g = -1;
  c && (g = goog.events.ListenerMap.findListenerIndex_(c, d, e, f));
  return -1 < g ? c[g] : null;
};
goog.events.ListenerMap.prototype.hasListener = function(c, d) {
  var e = goog.isDef(c), f = e ? c.toString() : "", g = goog.isDef(d);
  return goog.object.some(this.listeners, function(c, k) {
    for (k = 0; k < c.length; ++k) {
      if (!(e && c[k].type != f || g && c[k].capture != d)) {
        return !0;
      }
    }
    return !1;
  });
};
goog.events.ListenerMap.findListenerIndex_ = function(c, d, e, f) {
  for (var g = 0; g < c.length; ++g) {
    var h = c[g];
    if (!h.removed && h.listener == d && h.capture == !!e && h.handler == f) {
      return g;
    }
  }
  return -1;
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1e6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(c, d, e, f, g) {
  if (f && f.once) {
    return goog.events.listenOnce(c, d, e, f, g);
  }
  if (goog.isArray(d)) {
    for (var h = 0; h < d.length; h++) {
      goog.events.listen(c, d[h], e, f, g);
    }
    return null;
  }
  e = goog.events.wrapListener(e);
  return goog.events.Listenable.isImplementedBy(c) ? (f = goog.isObject(f) ? !!f.capture : !!f, c.listen(d, e, f, g)) : goog.events.listen_(c, d, e, !1, f, g);
};
goog.events.listen_ = function(c, d, e, f, g, h) {
  if (!d) {
    throw Error("Invalid event type");
  }
  var k = goog.isObject(g) ? !!g.capture : !!g;
  if (k && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) {
      return goog.asserts.fail("Can not register capture listener in IE8-."), null;
    }
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) {
      return null;
    }
  }
  var l = goog.events.getListenerMap_(c);
  l || (c[goog.events.LISTENER_MAP_PROP_] = l = new goog.events.ListenerMap(c));
  e = l.add(d, e, f, k, h);
  if (e.proxy) {
    return e;
  }
  f = goog.events.getProxy();
  e.proxy = f;
  f.src = c;
  f.listener = e;
  if (c.addEventListener) {
    goog.events.BrowserFeature.PASSIVE_EVENTS || (g = k), void 0 === g && (g = !1), c.addEventListener(d.toString(), f, g);
  } else {
    if (c.attachEvent) {
      c.attachEvent(goog.events.getOnString_(d.toString()), f);
    } else {
      if (c.addListener && c.removeListener) {
        goog.asserts.assert("change" === d, "MediaQueryList only has a change event"), c.addListener(f);
      } else {
        throw Error("addEventListener and attachEvent are unavailable.");
      }
    }
  }
  goog.events.listenerCountEstimate_++;
  return e;
};
goog.events.getProxy = function() {
  var c = goog.events.handleBrowserEvent_, d = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(e) {
    return c.call(d.src, d.listener, e);
  } : function(e) {
    e = c.call(d.src, d.listener, e);
    if (!e) {
      return e;
    }
  };
  return d;
};
goog.events.listenOnce = function(c, d, e, f, g) {
  if (goog.isArray(d)) {
    for (var h = 0; h < d.length; h++) {
      goog.events.listenOnce(c, d[h], e, f, g);
    }
    return null;
  }
  e = goog.events.wrapListener(e);
  return goog.events.Listenable.isImplementedBy(c) ? (f = goog.isObject(f) ? !!f.capture : !!f, c.listenOnce(d, e, f, g)) : goog.events.listen_(c, d, e, !0, f, g);
};
goog.events.listenWithWrapper = function(c, d, e, f, g) {
  d.listen(c, e, f, g);
};
goog.events.unlisten = function(c, d, e, f, g) {
  if (goog.isArray(d)) {
    for (var h = 0; h < d.length; h++) {
      goog.events.unlisten(c, d[h], e, f, g);
    }
    return null;
  }
  f = goog.isObject(f) ? !!f.capture : !!f;
  e = goog.events.wrapListener(e);
  if (goog.events.Listenable.isImplementedBy(c)) {
    return c.unlisten(d, e, f, g);
  }
  if (!c) {
    return !1;
  }
  if (c = goog.events.getListenerMap_(c)) {
    if (d = c.getListener(d, e, f, g)) {
      return goog.events.unlistenByKey(d);
    }
  }
  return !1;
};
goog.events.unlistenByKey = function(c) {
  if (goog.isNumber(c) || !c || c.removed) {
    return !1;
  }
  var d = c.src;
  if (goog.events.Listenable.isImplementedBy(d)) {
    return d.unlistenByKey(c);
  }
  var e = c.type, f = c.proxy;
  d.removeEventListener ? d.removeEventListener(e, f, c.capture) : d.detachEvent ? d.detachEvent(goog.events.getOnString_(e), f) : d.addListener && d.removeListener && d.removeListener(f);
  goog.events.listenerCountEstimate_--;
  (e = goog.events.getListenerMap_(d)) ? (e.removeByKey(c), 0 == e.getTypeCount() && (e.src = null, d[goog.events.LISTENER_MAP_PROP_] = null)) : c.markAsRemoved();
  return !0;
};
goog.events.unlistenWithWrapper = function(c, d, e, f, g) {
  d.unlisten(c, e, f, g);
};
goog.events.removeAll = function(c, d) {
  if (!c) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(c)) {
    return c.removeAllListeners(d);
  }
  c = goog.events.getListenerMap_(c);
  if (!c) {
    return 0;
  }
  var e = 0;
  d = d && d.toString();
  for (var f in c.listeners) {
    if (!d || f == d) {
      for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) {
        goog.events.unlistenByKey(g[h]) && ++e;
      }
    }
  }
  return e;
};
goog.events.getListeners = function(c, d, e) {
  return goog.events.Listenable.isImplementedBy(c) ? c.getListeners(d, e) : c ? (c = goog.events.getListenerMap_(c)) ? c.getListeners(d, e) : [] : [];
};
goog.events.getListener = function(c, d, e, f, g) {
  e = goog.events.wrapListener(e);
  f = !!f;
  return goog.events.Listenable.isImplementedBy(c) ? c.getListener(d, e, f, g) : c ? (c = goog.events.getListenerMap_(c)) ? c.getListener(d, e, f, g) : null : null;
};
goog.events.hasListener = function(c, d, e) {
  if (goog.events.Listenable.isImplementedBy(c)) {
    return c.hasListener(d, e);
  }
  c = goog.events.getListenerMap_(c);
  return !!c && c.hasListener(d, e);
};
goog.events.expose = function(c) {
  var d = [], e;
  for (e in c) {
    c[e] && c[e].id ? d.push(e + " = " + c[e] + " (" + c[e].id + ")") : d.push(e + " = " + c[e]);
  }
  return d.join("\n");
};
goog.events.getOnString_ = function(c) {
  return c in goog.events.onStringMap_ ? goog.events.onStringMap_[c] : goog.events.onStringMap_[c] = goog.events.onString_ + c;
};
goog.events.fireListeners = function(c, d, e, f) {
  return goog.events.Listenable.isImplementedBy(c) ? c.fireListeners(d, e, f) : goog.events.fireListeners_(c, d, e, f);
};
goog.events.fireListeners_ = function(c, d, e, f) {
  var g = !0;
  if (c = goog.events.getListenerMap_(c)) {
    if (d = c.listeners[d.toString()]) {
      for (d = d.concat(), c = 0; c < d.length; c++) {
        var h = d[c];
        h && h.capture == e && !h.removed && (h = goog.events.fireListener(h, f), g = g && !1 !== h);
      }
    }
  }
  return g;
};
goog.events.fireListener = function(c, d) {
  var e = c.listener, f = c.handler || c.src;
  c.callOnce && goog.events.unlistenByKey(c);
  return e.call(f, d);
};
goog.events.getTotalListenerCount = function() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function(c, d) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(c), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
  return c.dispatchEvent(d);
};
goog.events.protectBrowserEventEntryPoint = function(c) {
  goog.events.handleBrowserEvent_ = c.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function(c, d) {
  if (c.removed) {
    return !0;
  }
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var e = d || goog.getObjectByName("window.event");
    d = new goog.events.BrowserEvent(e, this);
    var f = !0;
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
      if (!goog.events.isMarkedIeEvent_(e)) {
        goog.events.markIeEvent_(e);
        e = [];
        for (var g = d.currentTarget; g; g = g.parentNode) {
          e.push(g);
        }
        c = c.type;
        for (g = e.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
          d.currentTarget = e[g];
          var h = goog.events.fireListeners_(e[g], c, !0, d);
          f = f && h;
        }
        for (g = 0; !d.propagationStopped_ && g < e.length; g++) {
          d.currentTarget = e[g], h = goog.events.fireListeners_(e[g], c, !1, d), f = f && h;
        }
      }
    } else {
      f = goog.events.fireListener(c, d);
    }
    return f;
  }
  return goog.events.fireListener(c, new goog.events.BrowserEvent(d, this));
};
goog.events.markIeEvent_ = function(c) {
  var d = !1;
  if (0 == c.keyCode) {
    try {
      c.keyCode = -1;
      return;
    } catch (e) {
      d = !0;
    }
  }
  if (d || void 0 == c.returnValue) {
    c.returnValue = !0;
  }
};
goog.events.isMarkedIeEvent_ = function(c) {
  return 0 > c.keyCode || void 0 != c.returnValue;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(c) {
  return c + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function(c) {
  c = c[goog.events.LISTENER_MAP_PROP_];
  return c instanceof goog.events.ListenerMap ? c : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
goog.events.wrapListener = function(c) {
  goog.asserts.assert(c, "Listener can not be null.");
  if (goog.isFunction(c)) {
    return c;
  }
  goog.asserts.assert(c.handleEvent, "An object listener must have handleEvent method.");
  c[goog.events.LISTENER_WRAPPER_PROP_] || (c[goog.events.LISTENER_WRAPPER_PROP_] = function(d) {
    return c.handleEvent(d);
  });
  return c[goog.events.LISTENER_WRAPPER_PROP_];
};
goog.debug.entryPointRegistry.register(function(c) {
  goog.events.handleBrowserEvent_ = c(goog.events.handleBrowserEvent_);
});
goog.events.EventTarget = function() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new goog.events.ListenerMap(this);
  this.actualEventTarget_ = this;
  this.parentEventTarget_ = null;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1000;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.setParentEventTarget = function(c) {
  this.parentEventTarget_ = c;
};
goog.events.EventTarget.prototype.addEventListener = function(c, d, e, f) {
  goog.events.listen(this, c, d, e, f);
};
goog.events.EventTarget.prototype.removeEventListener = function(c, d, e, f) {
  goog.events.unlisten(this, c, d, e, f);
};
goog.events.EventTarget.prototype.dispatchEvent = function(c) {
  this.assertInitialized_();
  var d = this.getParentEventTarget();
  if (d) {
    var e = [];
    for (var f = 1; d; d = d.getParentEventTarget()) {
      e.push(d), goog.asserts.assert(++f < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, c, e);
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function(c, d, e, f) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(c), d, !1, e, f);
};
goog.events.EventTarget.prototype.listenOnce = function(c, d, e, f) {
  return this.eventTargetListeners_.add(String(c), d, !0, e, f);
};
goog.events.EventTarget.prototype.unlisten = function(c, d, e, f) {
  return this.eventTargetListeners_.remove(String(c), d, e, f);
};
goog.events.EventTarget.prototype.unlistenByKey = function(c) {
  return this.eventTargetListeners_.removeByKey(c);
};
goog.events.EventTarget.prototype.removeAllListeners = function(c) {
  return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(c) : 0;
};
goog.events.EventTarget.prototype.fireListeners = function(c, d, e) {
  c = this.eventTargetListeners_.listeners[String(c)];
  if (!c) {
    return !0;
  }
  c = c.concat();
  for (var f = !0, g = 0; g < c.length; ++g) {
    var h = c[g];
    if (h && !h.removed && h.capture == d) {
      var k = h.listener, l = h.handler || h.src;
      h.callOnce && this.unlistenByKey(h);
      f = !1 !== k.call(l, e) && f;
    }
  }
  return f && 0 != e.returnValue_;
};
goog.events.EventTarget.prototype.getListeners = function(c, d) {
  return this.eventTargetListeners_.getListeners(String(c), d);
};
goog.events.EventTarget.prototype.getListener = function(c, d, e, f) {
  return this.eventTargetListeners_.getListener(String(c), d, e, f);
};
goog.events.EventTarget.prototype.hasListener = function(c, d) {
  c = goog.isDef(c) ? String(c) : void 0;
  return this.eventTargetListeners_.hasListener(c, d);
};
goog.events.EventTarget.prototype.setTargetForTesting = function(c) {
  this.actualEventTarget_ = c;
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function(c, d, e) {
  var f = d.type || d;
  if (goog.isString(d)) {
    d = new goog.events.Event(d, c);
  } else {
    if (d instanceof goog.events.Event) {
      d.target = d.target || c;
    } else {
      var g = d;
      d = new goog.events.Event(f, c);
      goog.object.extend(d, g);
    }
  }
  g = !0;
  if (e) {
    for (var h = e.length - 1; !d.propagationStopped_ && 0 <= h; h--) {
      var k = d.currentTarget = e[h];
      g = k.fireListeners(f, !0, d) && g;
    }
  }
  d.propagationStopped_ || (k = d.currentTarget = c, g = k.fireListeners(f, !0, d) && g, d.propagationStopped_ || (g = k.fireListeners(f, !1, d) && g));
  if (e) {
    for (h = 0; !d.propagationStopped_ && h < e.length; h++) {
      k = d.currentTarget = e[h], g = k.fireListeners(f, !1, d) && g;
    }
  }
  return g;
};
goog.Timer = function(c, d) {
  goog.events.EventTarget.call(this);
  this.interval_ = c || 1;
  this.timerObject_ = d || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now();
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_;
};
goog.Timer.prototype.setInterval = function(c) {
  this.interval_ = c;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop();
};
goog.Timer.prototype.tick_ = function() {
  if (this.enabled) {
    var c = goog.now() - this.last_;
    0 < c && c < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - c) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()));
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK);
};
goog.Timer.prototype.start = function() {
  this.enabled = !0;
  this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now());
};
goog.Timer.prototype.stop = function() {
  this.enabled = !1;
  this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null);
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_;
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(c, d, e) {
  if (goog.isFunction(c)) {
    e && (c = goog.bind(c, e));
  } else {
    if (c && "function" == typeof c.handleEvent) {
      c = goog.bind(c.handleEvent, c);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return Number(d) > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(c, d || 0);
};
goog.Timer.clear = function(c) {
  goog.Timer.defaultTimerObject.clearTimeout(c);
};
goog.Timer.promise = function(c, d) {
  var e = null;
  return (new goog.Promise(function(f, g) {
    e = goog.Timer.callOnce(function() {
      f(d);
    }, c);
    e == goog.Timer.INVALID_TIMEOUT_ID_ && g(Error("Failed to schedule timer."));
  })).thenCatch(function(c) {
    goog.Timer.clear(e);
    throw c;
  });
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.TRY_NATIVE_JSON = !1;
goog.json.isValid = function(c) {
  return /^\s*$/.test(c) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(c.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""));
};
goog.json.errorLogger_ = goog.nullFunction;
goog.json.setErrorLogger = function(c) {
  goog.json.errorLogger_ = c;
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(c) {
  if (goog.json.TRY_NATIVE_JSON) {
    try {
      return goog.global.JSON.parse(c);
    } catch (f) {
      var d = f;
    }
  }
  c = String(c);
  if (goog.json.isValid(c)) {
    try {
      var e = eval("(" + c + ")");
      d && goog.json.errorLogger_("Invalid JSON: " + c, d);
      return e;
    } catch (f) {
    }
  }
  throw Error("Invalid JSON string: " + c);
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(c, d) {
  return (new goog.json.Serializer(d)).serialize(c);
};
goog.json.Serializer = function(c) {
  this.replacer_ = c;
};
goog.json.Serializer.prototype.serialize = function(c) {
  var d = [];
  this.serializeInternal(c, d);
  return d.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(c, d) {
  if (null == c) {
    d.push("null");
  } else {
    if ("object" == typeof c) {
      if (goog.isArray(c)) {
        this.serializeArray(c, d);
        return;
      }
      if (c instanceof String || c instanceof Number || c instanceof Boolean) {
        c = c.valueOf();
      } else {
        this.serializeObject_(c, d);
        return;
      }
    }
    switch(typeof c) {
      case "string":
        this.serializeString_(c, d);
        break;
      case "number":
        this.serializeNumber_(c, d);
        break;
      case "boolean":
        d.push(String(c));
        break;
      case "function":
        d.push("null");
        break;
      default:
        throw Error("Unknown type: " + typeof c);
    }
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(c, d) {
  d.push('"', c.replace(goog.json.Serializer.charsToReplace_, function(c) {
    var d = goog.json.Serializer.charToJsonCharCache_[c];
    d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), goog.json.Serializer.charToJsonCharCache_[c] = d);
    return d;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(c, d) {
  d.push(isFinite(c) && !isNaN(c) ? String(c) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(c, d) {
  var e = c.length;
  d.push("[");
  for (var f = "", g = 0; g < e; g++) {
    d.push(f), f = c[g], this.serializeInternal(this.replacer_ ? this.replacer_.call(c, String(g), f) : f, d), f = ",";
  }
  d.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(c, d) {
  d.push("{");
  var e = "", f;
  for (f in c) {
    if (Object.prototype.hasOwnProperty.call(c, f)) {
      var g = c[f];
      "function" != typeof g && (d.push(e), this.serializeString_(f, d), d.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(c, f, g) : g, d), e = ",");
    }
  }
  d.push("}");
};
goog.json.hybrid = {};
goog.json.hybrid.stringify = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(c) {
  if (goog.global.JSON) {
    try {
      return goog.global.JSON.stringify(c);
    } catch (d) {
    }
  }
  return goog.json.serialize(c);
};
goog.json.hybrid.parse_ = function(c, d) {
  if (goog.global.JSON) {
    try {
      var e = goog.global.JSON.parse(c);
      goog.asserts.assert("object" == typeof e);
      return e;
    } catch (f) {
    }
  }
  return d(c);
};
goog.json.hybrid.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(c) {
  return goog.json.hybrid.parse_(c, goog.json.parse);
};
goog.debug.LogRecord = function(c, d, e, f, g) {
  this.reset(c, d, e, f, g);
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(c, d, e, f, g) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof g ? g : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = f || goog.now();
  this.level_ = c;
  this.msg_ = d;
  this.loggerName_ = e;
  delete this.exception_;
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_;
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_;
};
goog.debug.LogRecord.prototype.setException = function(c) {
  this.exception_ = c;
};
goog.debug.LogRecord.prototype.setLoggerName = function(c) {
  this.loggerName_ = c;
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_;
};
goog.debug.LogRecord.prototype.setLevel = function(c) {
  this.level_ = c;
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_;
};
goog.debug.LogRecord.prototype.setMessage = function(c) {
  this.msg_ = c;
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_;
};
goog.debug.LogRecord.prototype.setMillis = function(c) {
  this.time_ = c;
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_;
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear();
};
goog.debug.LogBuffer.getInstance = function() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_;
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(c, d, e) {
  var f = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = f;
  if (this.isFull_) {
    return f = this.buffer_[f], f.reset(c, d, e), f;
  }
  this.isFull_ = f == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[f] = new goog.debug.LogRecord(c, d, e);
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY;
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1;
};
goog.debug.LogBuffer.prototype.forEachRecord = function(c) {
  var d = this.buffer_;
  if (d[0]) {
    var e = this.curIndex_, f = this.isFull_ ? e : -1;
    do {
      f = (f + 1) % goog.debug.LogBuffer.CAPACITY, c(d[f]);
    } while (f != e);
  }
};
goog.debug.Logger = function(c) {
  this.name_ = c;
  this.handlers_ = this.children_ = this.level_ = this.parent_ = null;
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_PROFILER_LOGGING = !1;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(c, d) {
  this.name = c;
  this.value = d;
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name;
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1000);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for (var c = 0, d; d = goog.debug.Logger.Level.PREDEFINED_LEVELS[c]; c++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[d.value] = d, goog.debug.Logger.Level.predefinedLevelsCache_[d.name] = d;
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(c) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[c] || null;
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(c) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if (c in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[c];
  }
  for (var d = 0; d < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++d) {
    var e = goog.debug.Logger.Level.PREDEFINED_LEVELS[d];
    if (e.value <= c) {
      return e;
    }
  }
  return null;
};
goog.debug.Logger.getLogger = function(c) {
  return goog.debug.LogManager.getLogger(c);
};
goog.debug.Logger.logToProfilers = function(c) {
  if (goog.debug.Logger.ENABLE_PROFILER_LOGGING) {
    var d = goog.global.msWriteProfilerMark;
    d ? d(c) : (d = goog.global.console) && d.timeStamp && d.timeStamp(c);
  }
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_;
};
goog.debug.Logger.prototype.addHandler = function(c) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(c)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(c)));
};
goog.debug.Logger.prototype.removeHandler = function(c) {
  if (goog.debug.LOGGING_ENABLED) {
    var d = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
    return !!d && goog.array.remove(d, c);
  }
  return !1;
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_;
};
goog.debug.Logger.prototype.getChildren = function() {
  this.children_ || (this.children_ = {});
  return this.children_;
};
goog.debug.Logger.prototype.setLevel = function(c) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = c : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = c));
};
goog.debug.Logger.prototype.getLevel = function() {
  return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF;
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if (!goog.debug.LOGGING_ENABLED) {
    return goog.debug.Logger.Level.OFF;
  }
  if (!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_;
  }
  if (this.level_) {
    return this.level_;
  }
  if (this.parent_) {
    return this.parent_.getEffectiveLevel();
  }
  goog.asserts.fail("Root logger has no level set.");
  return null;
};
goog.debug.Logger.prototype.isLoggable = function(c) {
  return goog.debug.LOGGING_ENABLED && c.value >= this.getEffectiveLevel().value;
};
goog.debug.Logger.prototype.log = function(c, d, e) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(c) && (goog.isFunction(d) && (d = d()), this.doLogRecord_(this.getLogRecord(c, d, e)));
};
goog.debug.Logger.prototype.getLogRecord = function(c, d, e) {
  c = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(c, d, this.name_) : new goog.debug.LogRecord(c, String(d), this.name_);
  e && c.setException(e);
  return c;
};
goog.debug.Logger.prototype.shout = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, c, d);
};
goog.debug.Logger.prototype.severe = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, c, d);
};
goog.debug.Logger.prototype.warning = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, c, d);
};
goog.debug.Logger.prototype.info = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, c, d);
};
goog.debug.Logger.prototype.config = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, c, d);
};
goog.debug.Logger.prototype.fine = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, c, d);
};
goog.debug.Logger.prototype.finer = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, c, d);
};
goog.debug.Logger.prototype.finest = function(c, d) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, c, d);
};
goog.debug.Logger.prototype.logRecord = function(c) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(c.getLevel()) && this.doLogRecord_(c);
};
goog.debug.Logger.prototype.doLogRecord_ = function(c) {
  goog.debug.Logger.ENABLE_PROFILER_LOGGING && goog.debug.Logger.logToProfilers("log:" + c.getMessage());
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    for (var d = this; d;) {
      d.callPublish_(c), d = d.getParent();
    }
  } else {
    d = 0;
    for (var e; e = goog.debug.Logger.rootHandlers_[d++];) {
      e(c);
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(c) {
  if (this.handlers_) {
    for (var d = 0, e; e = this.handlers_[d]; d++) {
      e(c);
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(c) {
  this.parent_ = c;
};
goog.debug.Logger.prototype.addChild_ = function(c, d) {
  this.getChildren()[c] = d;
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG));
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_;
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_;
};
goog.debug.LogManager.getLogger = function(c) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[c] || goog.debug.LogManager.createLogger_(c);
};
goog.debug.LogManager.createFunctionForCatchErrors = function(c) {
  return function(d) {
    (c || goog.debug.LogManager.getRoot()).severe("Error: " + d.message + " (" + d.fileName + " @ Line: " + d.line + ")");
  };
};
goog.debug.LogManager.createLogger_ = function(c) {
  var d = new goog.debug.Logger(c);
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    var e = c.lastIndexOf("."), f = c.substr(0, e);
    e = c.substr(e + 1);
    f = goog.debug.LogManager.getLogger(f);
    f.addChild_(e, d);
    d.setParent_(f);
  }
  return goog.debug.LogManager.loggers_[c] = d;
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(c, d) {
  return goog.log.ENABLED ? (c = goog.debug.LogManager.getLogger(c), d && c && c.setLevel(d), c) : null;
};
goog.log.addHandler = function(c, d) {
  goog.log.ENABLED && c && c.addHandler(d);
};
goog.log.removeHandler = function(c, d) {
  return goog.log.ENABLED && c ? c.removeHandler(d) : !1;
};
goog.log.log = function(c, d, e, f) {
  goog.log.ENABLED && c && c.log(d, e, f);
};
goog.log.error = function(c, d, e) {
  goog.log.ENABLED && c && c.severe(d, e);
};
goog.log.warning = function(c, d, e) {
  goog.log.ENABLED && c && c.warning(d, e);
};
goog.log.info = function(c, d, e) {
  goog.log.ENABLED && c && c.info(d, e);
};
goog.log.fine = function(c, d, e) {
  goog.log.ENABLED && c && c.fine(d, e);
};
goog.net = {};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(c) {
  switch(c) {
    case goog.net.ErrorCode.NO_ERROR:
      return "No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return "Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return "File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return "Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return "Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return "An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return "Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return "Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return "Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return "The resource is not available offline";
    default:
      return "Unrecognized error code";
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress", DOWNLOAD_PROGRESS:"downloadprogress", UPLOAD_PROGRESS:"uploadprogress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, PRECONDITION_REQUIRED:428, TOO_MANY_REQUESTS:429, REQUEST_HEADER_FIELDS_TOO_LARGE:431, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, NETWORK_AUTHENTICATION_REQUIRED:511, QUIRK_IE_NO_CONTENT:1223};
goog.net.HttpStatus.isSuccess = function(c) {
  switch(c) {
    case goog.net.HttpStatus.OK:
    case goog.net.HttpStatus.CREATED:
    case goog.net.HttpStatus.ACCEPTED:
    case goog.net.HttpStatus.NO_CONTENT:
    case goog.net.HttpStatus.PARTIAL_CONTENT:
    case goog.net.HttpStatus.NOT_MODIFIED:
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return !0;
    default:
      return !1;
  }
};
goog.net.XhrLike = function() {
};
goog.net.XhrLike.prototype.open = function(c, d, e, f, g) {
};
goog.net.XhrLike.prototype.send = function(c) {
};
goog.net.XhrLike.prototype.abort = function() {
};
goog.net.XhrLike.prototype.setRequestHeader = function(c, d) {
};
goog.net.XhrLike.prototype.getResponseHeader = function(c) {
};
goog.net.XhrLike.prototype.getAllResponseHeaders = function() {
};
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions());
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
goog.net.WrapperXmlHttpFactory = function(c, d) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = c;
  this.optionsFactory_ = d;
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_();
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_();
};
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance();
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttpDefines = {};
goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions();
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setFactory = function(c, d) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(c), goog.asserts.assert(d)));
};
goog.net.XmlHttp.setGlobalFactory = function(c) {
  goog.net.XmlHttp.factory_ = c;
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this);
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var c = this.getProgId_();
  return c ? new ActiveXObject(c) : new XMLHttpRequest;
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var c = {};
  this.getProgId_() && (c[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, c[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
  return c;
};
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {
    return "";
  }
  if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        return new ActiveXObject(e), this.ieProgId_ = e;
      } catch (f) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return this.ieProgId_;
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.structs = {};
goog.structs.getCount = function(c) {
  return c.getCount && "function" == typeof c.getCount ? c.getCount() : goog.isArrayLike(c) || goog.isString(c) ? c.length : goog.object.getCount(c);
};
goog.structs.getValues = function(c) {
  if (c.getValues && "function" == typeof c.getValues) {
    return c.getValues();
  }
  if (goog.isString(c)) {
    return c.split("");
  }
  if (goog.isArrayLike(c)) {
    for (var d = [], e = c.length, f = 0; f < e; f++) {
      d.push(c[f]);
    }
    return d;
  }
  return goog.object.getValues(c);
};
goog.structs.getKeys = function(c) {
  if (c.getKeys && "function" == typeof c.getKeys) {
    return c.getKeys();
  }
  if (!c.getValues || "function" != typeof c.getValues) {
    if (goog.isArrayLike(c) || goog.isString(c)) {
      var d = [];
      c = c.length;
      for (var e = 0; e < c; e++) {
        d.push(e);
      }
      return d;
    }
    return goog.object.getKeys(c);
  }
};
goog.structs.contains = function(c, d) {
  return c.contains && "function" == typeof c.contains ? c.contains(d) : c.containsValue && "function" == typeof c.containsValue ? c.containsValue(d) : goog.isArrayLike(c) || goog.isString(c) ? goog.array.contains(c, d) : goog.object.containsValue(c, d);
};
goog.structs.isEmpty = function(c) {
  return c.isEmpty && "function" == typeof c.isEmpty ? c.isEmpty() : goog.isArrayLike(c) || goog.isString(c) ? goog.array.isEmpty(c) : goog.object.isEmpty(c);
};
goog.structs.clear = function(c) {
  c.clear && "function" == typeof c.clear ? c.clear() : goog.isArrayLike(c) ? goog.array.clear(c) : goog.object.clear(c);
};
goog.structs.forEach = function(c, d, e) {
  if (c.forEach && "function" == typeof c.forEach) {
    c.forEach(d, e);
  } else {
    if (goog.isArrayLike(c) || goog.isString(c)) {
      goog.array.forEach(c, d, e);
    } else {
      for (var f = goog.structs.getKeys(c), g = goog.structs.getValues(c), h = g.length, k = 0; k < h; k++) {
        d.call(e, g[k], f && f[k], c);
      }
    }
  }
};
goog.structs.filter = function(c, d, e) {
  if ("function" == typeof c.filter) {
    return c.filter(d, e);
  }
  if (goog.isArrayLike(c) || goog.isString(c)) {
    return goog.array.filter(c, d, e);
  }
  var f = goog.structs.getKeys(c), g = goog.structs.getValues(c), h = g.length;
  if (f) {
    var k = {};
    for (var l = 0; l < h; l++) {
      d.call(e, g[l], f[l], c) && (k[f[l]] = g[l]);
    }
  } else {
    for (k = [], l = 0; l < h; l++) {
      d.call(e, g[l], void 0, c) && k.push(g[l]);
    }
  }
  return k;
};
goog.structs.map = function(c, d, e) {
  if ("function" == typeof c.map) {
    return c.map(d, e);
  }
  if (goog.isArrayLike(c) || goog.isString(c)) {
    return goog.array.map(c, d, e);
  }
  var f = goog.structs.getKeys(c), g = goog.structs.getValues(c), h = g.length;
  if (f) {
    var k = {};
    for (var l = 0; l < h; l++) {
      k[f[l]] = d.call(e, g[l], f[l], c);
    }
  } else {
    for (k = [], l = 0; l < h; l++) {
      k[l] = d.call(e, g[l], void 0, c);
    }
  }
  return k;
};
goog.structs.some = function(c, d, e) {
  if ("function" == typeof c.some) {
    return c.some(d, e);
  }
  if (goog.isArrayLike(c) || goog.isString(c)) {
    return goog.array.some(c, d, e);
  }
  for (var f = goog.structs.getKeys(c), g = goog.structs.getValues(c), h = g.length, k = 0; k < h; k++) {
    if (d.call(e, g[k], f && f[k], c)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(c, d, e) {
  if ("function" == typeof c.every) {
    return c.every(d, e);
  }
  if (goog.isArrayLike(c) || goog.isString(c)) {
    return goog.array.every(c, d, e);
  }
  for (var f = goog.structs.getKeys(c), g = goog.structs.getValues(c), h = g.length, k = 0; k < h; k++) {
    if (!d.call(e, g[k], f && f[k], c)) {
      return !1;
    }
  }
  return !0;
};
goog.math = {};
goog.math.randomInt = function(c) {
  return Math.floor(Math.random() * c);
};
goog.math.uniformRandom = function(c, d) {
  return c + Math.random() * (d - c);
};
goog.math.clamp = function(c, d, e) {
  return Math.min(Math.max(c, d), e);
};
goog.math.modulo = function(c, d) {
  c %= d;
  return 0 > c * d ? c + d : c;
};
goog.math.lerp = function(c, d, e) {
  return c + e * (d - c);
};
goog.math.nearlyEquals = function(c, d, e) {
  return Math.abs(c - d) <= (e || 0.000001);
};
goog.math.standardAngle = function(c) {
  return goog.math.modulo(c, 360);
};
goog.math.standardAngleInRadians = function(c) {
  return goog.math.modulo(c, 2 * Math.PI);
};
goog.math.toRadians = function(c) {
  return c * Math.PI / 180;
};
goog.math.toDegrees = function(c) {
  return 180 * c / Math.PI;
};
goog.math.angleDx = function(c, d) {
  return d * Math.cos(goog.math.toRadians(c));
};
goog.math.angleDy = function(c, d) {
  return d * Math.sin(goog.math.toRadians(c));
};
goog.math.angle = function(c, d, e, f) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(f - d, e - c)));
};
goog.math.angleDifference = function(c, d) {
  c = goog.math.standardAngle(d) - goog.math.standardAngle(c);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c;
};
goog.math.sign = function(c) {
  return 0 < c ? 1 : 0 > c ? -1 : c;
};
goog.math.longestCommonSubsequence = function(c, d, e, f) {
  e = e || function(c, d) {
    return c == d;
  };
  f = f || function(d, e) {
    return c[d];
  };
  for (var g = c.length, h = d.length, k = [], l = 0; l < g + 1; l++) {
    k[l] = [], k[l][0] = 0;
  }
  for (var m = 0; m < h + 1; m++) {
    k[0][m] = 0;
  }
  for (l = 1; l <= g; l++) {
    for (m = 1; m <= h; m++) {
      e(c[l - 1], d[m - 1]) ? k[l][m] = k[l - 1][m - 1] + 1 : k[l][m] = Math.max(k[l - 1][m], k[l][m - 1]);
    }
  }
  var n = [];
  l = g;
  for (m = h; 0 < l && 0 < m;) {
    e(c[l - 1], d[m - 1]) ? (n.unshift(f(l - 1, m - 1)), l--, m--) : k[l - 1][m] > k[l][m - 1] ? l-- : m--;
  }
  return n;
};
goog.math.sum = function(c) {
  return goog.array.reduce(arguments, function(c, e) {
    return c + e;
  }, 0);
};
goog.math.average = function(c) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(c) {
  var d = arguments.length;
  if (2 > d) {
    return 0;
  }
  var e = goog.math.average.apply(null, arguments);
  return goog.math.sum.apply(null, goog.array.map(arguments, function(c) {
    return Math.pow(c - e, 2);
  })) / (d - 1);
};
goog.math.standardDeviation = function(c) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(c) {
  return isFinite(c) && 0 == c % 1;
};
goog.math.isFiniteNumber = function(c) {
  return isFinite(c);
};
goog.math.isNegativeZero = function(c) {
  return 0 == c && 0 > 1 / c;
};
goog.math.log10Floor = function(c) {
  if (0 < c) {
    var d = Math.round(Math.log(c) * Math.LOG10E);
    return d - (parseFloat("1e" + d) > c ? 1 : 0);
  }
  return 0 == c ? -Infinity : NaN;
};
goog.math.safeFloor = function(c, d) {
  goog.asserts.assert(!goog.isDef(d) || 0 < d);
  return Math.floor(c + (d || 2e-15));
};
goog.math.safeCeil = function(c, d) {
  goog.asserts.assert(!goog.isDef(d) || 0 < d);
  return Math.ceil(c - (d || 2e-15));
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(c) {
  return this;
};
goog.iter.toIterator = function(c) {
  if (c instanceof goog.iter.Iterator) {
    return c;
  }
  if ("function" == typeof c.__iterator__) {
    return c.__iterator__(!1);
  }
  if (goog.isArrayLike(c)) {
    var d = 0, e = new goog.iter.Iterator;
    e.next = function() {
      for (;;) {
        if (d >= c.length) {
          throw goog.iter.StopIteration;
        }
        if (d in c) {
          return c[d++];
        }
        d++;
      }
    };
    return e;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(c, d, e) {
  if (goog.isArrayLike(c)) {
    try {
      goog.array.forEach(c, d, e);
    } catch (f) {
      if (f !== goog.iter.StopIteration) {
        throw f;
      }
    }
  } else {
    c = goog.iter.toIterator(c);
    try {
      for (;;) {
        d.call(e, c.next(), void 0, c);
      }
    } catch (f) {
      if (f !== goog.iter.StopIteration) {
        throw f;
      }
    }
  }
};
goog.iter.filter = function(c, d, e) {
  var f = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  c.next = function() {
    for (;;) {
      var c = f.next();
      if (d.call(e, c, void 0, f)) {
        return c;
      }
    }
  };
  return c;
};
goog.iter.filterFalse = function(c, d, e) {
  return goog.iter.filter(c, goog.functions.not(d), e);
};
goog.iter.range = function(c, d, e) {
  var f = 0, g = c, h = e || 1;
  1 < arguments.length && (f = c, g = +d);
  if (0 == h) {
    throw Error("Range step argument must not be zero");
  }
  var k = new goog.iter.Iterator;
  k.next = function() {
    if (0 < h && f >= g || 0 > h && f <= g) {
      throw goog.iter.StopIteration;
    }
    var c = f;
    f += h;
    return c;
  };
  return k;
};
goog.iter.join = function(c, d) {
  return goog.iter.toArray(c).join(d);
};
goog.iter.map = function(c, d, e) {
  var f = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  c.next = function() {
    var c = f.next();
    return d.call(e, c, void 0, f);
  };
  return c;
};
goog.iter.reduce = function(c, d, e, f) {
  var g = e;
  goog.iter.forEach(c, function(c) {
    g = d.call(f, g, c);
  });
  return g;
};
goog.iter.some = function(c, d, e) {
  c = goog.iter.toIterator(c);
  try {
    for (;;) {
      if (d.call(e, c.next(), void 0, c)) {
        return !0;
      }
    }
  } catch (f) {
    if (f !== goog.iter.StopIteration) {
      throw f;
    }
  }
  return !1;
};
goog.iter.every = function(c, d, e) {
  c = goog.iter.toIterator(c);
  try {
    for (;;) {
      if (!d.call(e, c.next(), void 0, c)) {
        return !1;
      }
    }
  } catch (f) {
    if (f !== goog.iter.StopIteration) {
      throw f;
    }
  }
  return !0;
};
goog.iter.chain = function(c) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(c) {
  var d = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  var e = null;
  c.next = function() {
    for (;;) {
      if (null == e) {
        var c = d.next();
        e = goog.iter.toIterator(c);
      }
      try {
        return e.next();
      } catch (g) {
        if (g !== goog.iter.StopIteration) {
          throw g;
        }
        e = null;
      }
    }
  };
  return c;
};
goog.iter.dropWhile = function(c, d, e) {
  var f = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  var g = !0;
  c.next = function() {
    for (;;) {
      var c = f.next();
      if (!g || !d.call(e, c, void 0, f)) {
        return g = !1, c;
      }
    }
  };
  return c;
};
goog.iter.takeWhile = function(c, d, e) {
  var f = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  c.next = function() {
    var c = f.next();
    if (d.call(e, c, void 0, f)) {
      return c;
    }
    throw goog.iter.StopIteration;
  };
  return c;
};
goog.iter.toArray = function(c) {
  if (goog.isArrayLike(c)) {
    return goog.array.toArray(c);
  }
  c = goog.iter.toIterator(c);
  var d = [];
  goog.iter.forEach(c, function(c) {
    d.push(c);
  });
  return d;
};
goog.iter.equals = function(c, d, e) {
  c = goog.iter.zipLongest({}, c, d);
  var f = e || goog.array.defaultCompareEquality;
  return goog.iter.every(c, function(c) {
    return f(c[0], c[1]);
  });
};
goog.iter.nextOrValue = function(c, d) {
  try {
    return goog.iter.toIterator(c).next();
  } catch (e) {
    if (e != goog.iter.StopIteration) {
      throw e;
    }
    return d;
  }
};
goog.iter.product = function(c) {
  if (goog.array.some(arguments, function(c) {
    return !c.length;
  }) || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var d = new goog.iter.Iterator, e = arguments, f = goog.array.repeat(0, e.length);
  d.next = function() {
    if (f) {
      for (var c = goog.array.map(f, function(c, d) {
        return e[d][c];
      }), d = f.length - 1; 0 <= d; d--) {
        goog.asserts.assert(f);
        if (f[d] < e[d].length - 1) {
          f[d]++;
          break;
        }
        if (0 == d) {
          f = null;
          break;
        }
        f[d] = 0;
      }
      return c;
    }
    throw goog.iter.StopIteration;
  };
  return d;
};
goog.iter.cycle = function(c) {
  var d = goog.iter.toIterator(c), e = [], f = 0;
  c = new goog.iter.Iterator;
  var g = !1;
  c.next = function() {
    var c = null;
    if (!g) {
      try {
        return c = d.next(), e.push(c), c;
      } catch (k) {
        if (k != goog.iter.StopIteration || goog.array.isEmpty(e)) {
          throw k;
        }
        g = !0;
      }
    }
    c = e[f];
    f = (f + 1) % e.length;
    return c;
  };
  return c;
};
goog.iter.count = function(c, d) {
  var e = c || 0, f = goog.isDef(d) ? d : 1;
  c = new goog.iter.Iterator;
  c.next = function() {
    var c = e;
    e += f;
    return c;
  };
  return c;
};
goog.iter.repeat = function(c) {
  var d = new goog.iter.Iterator;
  d.next = goog.functions.constant(c);
  return d;
};
goog.iter.accumulate = function(c) {
  var d = goog.iter.toIterator(c), e = 0;
  c = new goog.iter.Iterator;
  c.next = function() {
    return e += d.next();
  };
  return c;
};
goog.iter.zip = function(c) {
  var d = arguments, e = new goog.iter.Iterator;
  if (0 < d.length) {
    var f = goog.array.map(d, goog.iter.toIterator);
    e.next = function() {
      return goog.array.map(f, function(c) {
        return c.next();
      });
    };
  }
  return e;
};
goog.iter.zipLongest = function(c, d) {
  var e = goog.array.slice(arguments, 1), f = new goog.iter.Iterator;
  if (0 < e.length) {
    var g = goog.array.map(e, goog.iter.toIterator);
    f.next = function() {
      var d = !1, e = goog.array.map(g, function(e) {
        try {
          var f = e.next();
          d = !0;
        } catch (n) {
          if (n !== goog.iter.StopIteration) {
            throw n;
          }
          f = c;
        }
        return f;
      });
      if (!d) {
        throw goog.iter.StopIteration;
      }
      return e;
    };
  }
  return f;
};
goog.iter.compress = function(c, d) {
  var e = goog.iter.toIterator(d);
  return goog.iter.filter(c, function() {
    return !!e.next();
  });
};
goog.iter.GroupByIterator_ = function(c, d) {
  this.iterator = goog.iter.toIterator(c);
  this.keyFunc = d || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  for (; this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(c) {
  for (var d = []; this.currentKey == c;) {
    d.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (e) {
      if (e !== goog.iter.StopIteration) {
        throw e;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return d;
};
goog.iter.groupBy = function(c, d) {
  return new goog.iter.GroupByIterator_(c, d);
};
goog.iter.starMap = function(c, d, e) {
  var f = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  c.next = function() {
    var c = goog.iter.toArray(f.next());
    return d.apply(e, goog.array.concat(c, void 0, f));
  };
  return c;
};
goog.iter.tee = function(c, d) {
  var e = goog.iter.toIterator(c);
  c = goog.isNumber(d) ? d : 2;
  var f = goog.array.map(goog.array.range(c), function() {
    return [];
  }), g = function() {
    var c = e.next();
    goog.array.forEach(f, function(d) {
      d.push(c);
    });
  };
  return goog.array.map(f, function(c) {
    var d = new goog.iter.Iterator;
    d.next = function() {
      goog.array.isEmpty(c) && g();
      goog.asserts.assert(!goog.array.isEmpty(c));
      return c.shift();
    };
    return d;
  });
};
goog.iter.enumerate = function(c, d) {
  return goog.iter.zip(goog.iter.count(d), c);
};
goog.iter.limit = function(c, d) {
  goog.asserts.assert(goog.math.isInt(d) && 0 <= d);
  var e = goog.iter.toIterator(c);
  c = new goog.iter.Iterator;
  var f = d;
  c.next = function() {
    if (0 < f--) {
      return e.next();
    }
    throw goog.iter.StopIteration;
  };
  return c;
};
goog.iter.consume = function(c, d) {
  goog.asserts.assert(goog.math.isInt(d) && 0 <= d);
  for (c = goog.iter.toIterator(c); 0 < d--;) {
    goog.iter.nextOrValue(c, null);
  }
  return c;
};
goog.iter.slice = function(c, d, e) {
  goog.asserts.assert(goog.math.isInt(d) && 0 <= d);
  c = goog.iter.consume(c, d);
  goog.isNumber(e) && (goog.asserts.assert(goog.math.isInt(e) && e >= d), c = goog.iter.limit(c, e - d));
  return c;
};
goog.iter.hasDuplicates_ = function(c) {
  var d = [];
  goog.array.removeDuplicates(c, d);
  return c.length != d.length;
};
goog.iter.permutations = function(c, d) {
  c = goog.iter.toArray(c);
  d = goog.isNumber(d) ? d : c.length;
  d = goog.array.repeat(c, d);
  d = goog.iter.product.apply(void 0, d);
  return goog.iter.filter(d, function(c) {
    return !goog.iter.hasDuplicates_(c);
  });
};
goog.iter.combinations = function(c, d) {
  function e(c) {
    return f[c];
  }
  var f = goog.iter.toArray(c);
  c = goog.iter.range(f.length);
  d = goog.iter.permutations(c, d);
  var g = goog.iter.filter(d, function(c) {
    return goog.array.isSorted(c);
  });
  d = new goog.iter.Iterator;
  d.next = function() {
    return goog.array.map(g.next(), e);
  };
  return d;
};
goog.iter.combinationsWithReplacement = function(c, d) {
  function e(c) {
    return f[c];
  }
  var f = goog.iter.toArray(c);
  c = goog.array.range(f.length);
  d = goog.array.repeat(c, d);
  d = goog.iter.product.apply(void 0, d);
  var g = goog.iter.filter(d, function(c) {
    return goog.array.isSorted(c);
  });
  d = new goog.iter.Iterator;
  d.next = function() {
    return goog.array.map(g.next(), e);
  };
  return d;
};
goog.structs.Map = function(c, d) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var e = arguments.length;
  if (1 < e) {
    if (e % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var f = 0; f < e; f += 2) {
      this.set(arguments[f], arguments[f + 1]);
    }
  } else {
    c && this.addAll(c);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for (var c = [], d = 0; d < this.keys_.length; d++) {
    c.push(this.map_[this.keys_[d]]);
  }
  return c;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(c) {
  return goog.structs.Map.hasKey_(this.map_, c);
};
goog.structs.Map.prototype.containsValue = function(c) {
  for (var d = 0; d < this.keys_.length; d++) {
    var e = this.keys_[d];
    if (goog.structs.Map.hasKey_(this.map_, e) && this.map_[e] == c) {
      return !0;
    }
  }
  return !1;
};
goog.structs.Map.prototype.equals = function(c, d) {
  if (this === c) {
    return !0;
  }
  if (this.count_ != c.getCount()) {
    return !1;
  }
  d = d || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var e, f = 0; e = this.keys_[f]; f++) {
    if (!d(this.get(e), c.get(e))) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Map.defaultEquals = function(c, d) {
  return c === d;
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function(c) {
  return goog.structs.Map.hasKey_(this.map_, c) ? (delete this.map_[c], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if (this.count_ != this.keys_.length) {
    for (var c = 0, d = 0; c < this.keys_.length;) {
      var e = this.keys_[c];
      goog.structs.Map.hasKey_(this.map_, e) && (this.keys_[d++] = e);
      c++;
    }
    this.keys_.length = d;
  }
  if (this.count_ != this.keys_.length) {
    var f = {};
    for (d = c = 0; c < this.keys_.length;) {
      e = this.keys_[c], goog.structs.Map.hasKey_(f, e) || (this.keys_[d++] = e, f[e] = 1), c++;
    }
    this.keys_.length = d;
  }
};
goog.structs.Map.prototype.get = function(c, d) {
  return goog.structs.Map.hasKey_(this.map_, c) ? this.map_[c] : d;
};
goog.structs.Map.prototype.set = function(c, d) {
  goog.structs.Map.hasKey_(this.map_, c) || (this.count_++, this.keys_.push(c), this.version_++);
  this.map_[c] = d;
};
goog.structs.Map.prototype.addAll = function(c) {
  if (c instanceof goog.structs.Map) {
    for (var d = c.getKeys(), e = 0; e < d.length; e++) {
      this.set(d[e], c.get(d[e]));
    }
  } else {
    for (d in c) {
      this.set(d, c[d]);
    }
  }
};
goog.structs.Map.prototype.forEach = function(c, d) {
  for (var e = this.getKeys(), f = 0; f < e.length; f++) {
    var g = e[f], h = this.get(g);
    c.call(d, h, g, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  for (var c = new goog.structs.Map, d = 0; d < this.keys_.length; d++) {
    var e = this.keys_[d];
    c.set(this.map_[e], e);
  }
  return c;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for (var c = {}, d = 0; d < this.keys_.length; d++) {
    var e = this.keys_[d];
    c[e] = this.map_[e];
  }
  return c;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0);
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1);
};
goog.structs.Map.prototype.__iterator__ = function(c) {
  this.cleanupKeysArray_();
  var d = 0, e = this.version_, f = this, g = new goog.iter.Iterator;
  g.next = function() {
    if (e != f.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (d >= f.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var g = f.keys_[d++];
    return c ? g : f.map_[g];
  };
  return g;
};
goog.structs.Map.hasKey_ = function(c, d) {
  return Object.prototype.hasOwnProperty.call(c, d);
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(c, d, e, f, g, h, k) {
  var l = "";
  c && (l += c + ":");
  e && (l += "//", d && (l += d + "@"), l += e, f && (l += ":" + f));
  g && (l += g);
  h && (l += "?" + h);
  k && (l += "#" + k);
  return l;
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(c) {
  return c.match(goog.uri.utils.splitRe_);
};
goog.uri.utils.decodeIfPossible_ = function(c, d) {
  return c ? d ? decodeURI(c) : decodeURIComponent(c) : c;
};
goog.uri.utils.getComponentByIndex_ = function(c, d) {
  return goog.uri.utils.split(d)[c] || null;
};
goog.uri.utils.getScheme = function(c) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, c);
};
goog.uri.utils.getEffectiveScheme = function(c) {
  c = goog.uri.utils.getScheme(c);
  !c && goog.global.self && goog.global.self.location && (c = goog.global.self.location.protocol, c = c.substr(0, c.length - 1));
  return c ? c.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function(c) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, c);
};
goog.uri.utils.getUserInfo = function(c) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(c));
};
goog.uri.utils.getDomainEncoded = function(c) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, c);
};
goog.uri.utils.getDomain = function(c) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(c), !0);
};
goog.uri.utils.getPort = function(c) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, c)) || null;
};
goog.uri.utils.getPathEncoded = function(c) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, c);
};
goog.uri.utils.getPath = function(c) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(c), !0);
};
goog.uri.utils.getQueryData = function(c) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, c);
};
goog.uri.utils.getFragmentEncoded = function(c) {
  var d = c.indexOf("#");
  return 0 > d ? null : c.substr(d + 1);
};
goog.uri.utils.setFragmentEncoded = function(c, d) {
  return goog.uri.utils.removeFragment(c) + (d ? "#" + d : "");
};
goog.uri.utils.getFragment = function(c) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(c));
};
goog.uri.utils.getHost = function(c) {
  c = goog.uri.utils.split(c);
  return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getOrigin = function(c) {
  c = goog.uri.utils.split(c);
  return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], null, c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function(c) {
  c = goog.uri.utils.split(c);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, c[goog.uri.utils.ComponentIndex.PATH], c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function(c) {
  var d = c.indexOf("#");
  return 0 > d ? c : c.substr(0, d);
};
goog.uri.utils.haveSameDomain = function(c, d) {
  c = goog.uri.utils.split(c);
  d = goog.uri.utils.split(d);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(c) {
  goog.asserts.assert(0 > c.indexOf("#") && 0 > c.indexOf("?"), "goog.uri.utils: Fragment or query identifiers are not supported: [%s]", c);
};
goog.uri.utils.parseQueryData = function(c, d) {
  if (c) {
    c = c.split("&");
    for (var e = 0; e < c.length; e++) {
      var f = c[e].indexOf("="), g = null;
      if (0 <= f) {
        var h = c[e].substring(0, f);
        g = c[e].substring(f + 1);
      } else {
        h = c[e];
      }
      d(h, g ? goog.string.urlDecode(g) : "");
    }
  }
};
goog.uri.utils.splitQueryData_ = function(c) {
  var d = c.indexOf("#");
  0 > d && (d = c.length);
  var e = c.indexOf("?");
  if (0 > e || e > d) {
    e = d;
    var f = "";
  } else {
    f = c.substring(e + 1, d);
  }
  return [c.substr(0, e), f, c.substr(d)];
};
goog.uri.utils.joinQueryData_ = function(c) {
  return c[0] + (c[1] ? "?" + c[1] : "") + c[2];
};
goog.uri.utils.appendQueryData_ = function(c, d) {
  return d ? c ? c + "&" + d : d : c;
};
goog.uri.utils.appendQueryDataToUri_ = function(c, d) {
  if (!d) {
    return c;
  }
  c = goog.uri.utils.splitQueryData_(c);
  c[1] = goog.uri.utils.appendQueryData_(c[1], d);
  return goog.uri.utils.joinQueryData_(c);
};
goog.uri.utils.appendKeyValuePairs_ = function(c, d, e) {
  goog.asserts.assertString(c);
  if (goog.isArray(d)) {
    goog.asserts.assertArray(d);
    for (var f = 0; f < d.length; f++) {
      goog.uri.utils.appendKeyValuePairs_(c, String(d[f]), e);
    }
  } else {
    null != d && e.push(c + ("" === d ? "" : "=" + goog.string.urlEncode(d)));
  }
};
goog.uri.utils.buildQueryData = function(c, d) {
  goog.asserts.assert(0 == Math.max(c.length - (d || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  var e = [];
  for (d = d || 0; d < c.length; d += 2) {
    goog.uri.utils.appendKeyValuePairs_(c[d], c[d + 1], e);
  }
  return e.join("&");
};
goog.uri.utils.buildQueryDataFromMap = function(c) {
  var d = [], e;
  for (e in c) {
    goog.uri.utils.appendKeyValuePairs_(e, c[e], d);
  }
  return d.join("&");
};
goog.uri.utils.appendParams = function(c, d) {
  var e = 2 == arguments.length ? goog.uri.utils.buildQueryData(arguments[1], 0) : goog.uri.utils.buildQueryData(arguments, 1);
  return goog.uri.utils.appendQueryDataToUri_(c, e);
};
goog.uri.utils.appendParamsFromMap = function(c, d) {
  d = goog.uri.utils.buildQueryDataFromMap(d);
  return goog.uri.utils.appendQueryDataToUri_(c, d);
};
goog.uri.utils.appendParam = function(c, d, e) {
  e = goog.isDefAndNotNull(e) ? "=" + goog.string.urlEncode(e) : "";
  return goog.uri.utils.appendQueryDataToUri_(c, d + e);
};
goog.uri.utils.findParam_ = function(c, d, e, f) {
  for (var g = e.length; 0 <= (d = c.indexOf(e, d)) && d < f;) {
    var h = c.charCodeAt(d - 1);
    if (h == goog.uri.utils.CharCode_.AMPERSAND || h == goog.uri.utils.CharCode_.QUESTION) {
      if (h = c.charCodeAt(d + g), !h || h == goog.uri.utils.CharCode_.EQUAL || h == goog.uri.utils.CharCode_.AMPERSAND || h == goog.uri.utils.CharCode_.HASH) {
        return d;
      }
    }
    d += g + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(c, d) {
  return 0 <= goog.uri.utils.findParam_(c, 0, d, c.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function(c, d) {
  var e = c.search(goog.uri.utils.hashOrEndRe_), f = goog.uri.utils.findParam_(c, 0, d, e);
  if (0 > f) {
    return null;
  }
  var g = c.indexOf("&", f);
  if (0 > g || g > e) {
    g = e;
  }
  f += d.length + 1;
  return goog.string.urlDecode(c.substr(f, g - f));
};
goog.uri.utils.getParamValues = function(c, d) {
  for (var e = c.search(goog.uri.utils.hashOrEndRe_), f = 0, g, h = []; 0 <= (g = goog.uri.utils.findParam_(c, f, d, e));) {
    f = c.indexOf("&", g);
    if (0 > f || f > e) {
      f = e;
    }
    g += d.length + 1;
    h.push(goog.string.urlDecode(c.substr(g, f - g)));
  }
  return h;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(c, d) {
  for (var e = c.search(goog.uri.utils.hashOrEndRe_), f = 0, g, h = []; 0 <= (g = goog.uri.utils.findParam_(c, f, d, e));) {
    h.push(c.substring(f, g)), f = Math.min(c.indexOf("&", g) + 1 || e, e);
  }
  h.push(c.substr(f));
  return h.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function(c, d, e) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(c, d), d, e);
};
goog.uri.utils.setParamsFromMap = function(c, d) {
  c = goog.uri.utils.splitQueryData_(c);
  var e = c[1], f = [];
  e && goog.array.forEach(e.split("&"), function(c) {
    var e = c.indexOf("=");
    e = 0 <= e ? c.substr(0, e) : c;
    d.hasOwnProperty(e) || f.push(c);
  });
  c[1] = goog.uri.utils.appendQueryData_(f.join("&"), goog.uri.utils.buildQueryDataFromMap(d));
  return goog.uri.utils.joinQueryData_(c);
};
goog.uri.utils.appendPath = function(c, d) {
  goog.uri.utils.assertNoFragmentsOrQueries_(c);
  goog.string.endsWith(c, "/") && (c = c.substr(0, c.length - 1));
  goog.string.startsWith(d, "/") && (d = d.substr(1));
  return goog.string.buildString(c, "/", d);
};
goog.uri.utils.setPath = function(c, d) {
  goog.string.startsWith(d, "/") || (d = "/" + d);
  c = goog.uri.utils.split(c);
  return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], d, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(c) {
  return goog.uri.utils.setParam(c, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.net.XhrIo = function(c) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = c || null;
  this.active_ = !1;
  this.xhrOptions_ = this.xhr_ = null;
  this.lastMethod_ = this.lastUri_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastError_ = "";
  this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
  this.timeoutInterval_ = 0;
  this.timeoutId_ = null;
  this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
  this.useXhr2Timeout_ = this.progressEventsEnabled_ = this.withCredentials_ = !1;
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.CONTENT_TRANSFER_ENCODING = "Content-Transfer-Encoding";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout";
goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(c, d, e, f, g, h, k) {
  var l = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(l);
  d && l.listen(goog.net.EventType.COMPLETE, d);
  l.listenOnce(goog.net.EventType.READY, l.cleanupSend_);
  h && l.setTimeoutInterval(h);
  k && l.setWithCredentials(k);
  l.send(c, e, f, g);
  return l;
};
goog.net.XhrIo.cleanup = function() {
  for (var c = goog.net.XhrIo.sendInstances_; c.length;) {
    c.pop().dispose();
  }
};
goog.net.XhrIo.protectEntryPoints = function(c) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = c.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
};
goog.net.XhrIo.prototype.cleanupSend_ = function() {
  this.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, this);
};
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_;
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(c) {
  this.timeoutInterval_ = Math.max(0, c);
};
goog.net.XhrIo.prototype.setResponseType = function(c) {
  this.responseType_ = c;
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_;
};
goog.net.XhrIo.prototype.setWithCredentials = function(c) {
  this.withCredentials_ = c;
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_;
};
goog.net.XhrIo.prototype.setProgressEventsEnabled = function(c) {
  this.progressEventsEnabled_ = c;
};
goog.net.XhrIo.prototype.getProgressEventsEnabled = function() {
  return this.progressEventsEnabled_;
};
goog.net.XhrIo.prototype.send = function(c, d, e, f) {
  if (this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + c);
  }
  d = d ? d.toUpperCase() : "GET";
  this.lastUri_ = c;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = d;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  this.getProgressEventsEnabled() && "onprogress" in this.xhr_ && (this.xhr_.onprogress = goog.bind(function(c) {
    this.onProgressHandler_(c, !0);
  }, this), this.xhr_.upload && (this.xhr_.upload.onprogress = goog.bind(this.onProgressHandler_, this)));
  try {
    goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(d, String(c), !0), this.inOpen_ = !1;
  } catch (h) {
    goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + h.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, h);
    return;
  }
  c = e || "";
  var g = this.headers.clone();
  f && goog.structs.forEach(f, function(c, d) {
    g.set(d, c);
  });
  f = goog.array.find(g.getKeys(), goog.net.XhrIo.isContentTypeHeader_);
  e = goog.global.FormData && c instanceof goog.global.FormData;
  !goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, d) || f || e || g.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  g.forEach(function(c, d) {
    this.xhr_.setRequestHeader(d, c);
  }, this);
  this.responseType_ && (this.xhr_.responseType = this.responseType_);
  "withCredentials" in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_ && (this.xhr_.withCredentials = this.withCredentials_);
  try {
    this.cleanUpTimeoutTimer_(), 0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_), goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)), this.useXhr2Timeout_ ? (this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_, this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this)) : this.timeoutId_ = goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, 
    this)), goog.log.fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(c), this.inSend_ = !1;
  } catch (h) {
    goog.log.fine(this.logger_, this.formatMsg_("Send error: " + h.message)), this.error_(goog.net.ErrorCode.EXCEPTION, h);
  }
};
goog.net.XhrIo.shouldUseXhr2Timeout_ = function(c) {
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) && goog.isNumber(c[goog.net.XhrIo.XHR2_TIMEOUT_]) && goog.isDef(c[goog.net.XhrIo.XHR2_ON_TIMEOUT_]);
};
goog.net.XhrIo.isContentTypeHeader_ = function(c) {
  return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, c);
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp();
};
goog.net.XhrIo.prototype.timeout_ = function() {
  "undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT, goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT));
};
goog.net.XhrIo.prototype.error_ = function(c, d) {
  this.active_ = !1;
  this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
  this.lastError_ = d;
  this.lastErrorCode_ = c;
  this.dispatchErrors_();
  this.cleanUpXhr_();
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR));
};
goog.net.XhrIo.prototype.abort = function(c) {
  this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = c || goog.net.ErrorCode.ABORT, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_());
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
  goog.net.XhrIo.superClass_.disposeInternal.call(this);
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if (!this.isDisposed()) {
    if (this.inOpen_ || this.inSend_ || this.inAbort_) {
      this.onReadyStateChangeHelper_();
    } else {
      this.onReadyStateChangeEntryPoint_();
    }
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_();
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if (this.active_ && "undefined" != typeof goog) {
    if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) {
      goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
    } else {
      if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
      } else {
        if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
          goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
          this.active_ = !1;
          try {
            this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_());
          } finally {
            this.cleanUpXhr_();
          }
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.onProgressHandler_ = function(c, d) {
  goog.asserts.assert(c.type === goog.net.EventType.PROGRESS, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(c, goog.net.EventType.PROGRESS));
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(c, d ? goog.net.EventType.DOWNLOAD_PROGRESS : goog.net.EventType.UPLOAD_PROGRESS));
};
goog.net.XhrIo.buildProgressEvent_ = function(c, d) {
  return {type:d, lengthComputable:c.lengthComputable, loaded:c.loaded, total:c.total};
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(c) {
  if (this.xhr_) {
    this.cleanUpTimeoutTimer_();
    var d = this.xhr_, e = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    c || this.dispatchEvent(goog.net.EventType.READY);
    try {
      d.onreadystatechange = e;
    } catch (f) {
      goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + f.message);
    }
  }
};
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
  this.xhr_ && this.useXhr2Timeout_ && (this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null);
  this.timeoutId_ && (goog.Timer.clear(this.timeoutId_), this.timeoutId_ = null);
};
goog.net.XhrIo.prototype.isActive = function() {
  return !!this.xhr_;
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE;
};
goog.net.XhrIo.prototype.isSuccess = function() {
  var c = this.getStatus();
  return goog.net.HttpStatus.isSuccess(c) || 0 === c && !this.isLastUriEffectiveSchemeHttp_();
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var c = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
  return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(c);
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED;
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1;
  } catch (c) {
    return -1;
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : "";
  } catch (c) {
    return goog.log.fine(this.logger_, "Can not get status: " + c.message), "";
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return String(this.lastUri_);
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : "";
  } catch (c) {
    return goog.log.fine(this.logger_, "Can not get responseText: " + c.message), "";
  }
};
goog.net.XhrIo.prototype.getResponseBody = function() {
  try {
    if (this.xhr_ && "responseBody" in this.xhr_) {
      return this.xhr_.responseBody;
    }
  } catch (c) {
    goog.log.fine(this.logger_, "Can not get responseBody: " + c.message);
  }
  return null;
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null;
  } catch (c) {
    return goog.log.fine(this.logger_, "Can not get responseXML: " + c.message), null;
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(c) {
  if (this.xhr_) {
    var d = this.xhr_.responseText;
    c && 0 == d.indexOf(c) && (d = d.substring(c.length));
    return goog.json.hybrid.parse(d);
  }
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    if (!this.xhr_) {
      return null;
    }
    if ("response" in this.xhr_) {
      return this.xhr_.response;
    }
    switch(this.responseType_) {
      case goog.net.XhrIo.ResponseType.DEFAULT:
      case goog.net.XhrIo.ResponseType.TEXT:
        return this.xhr_.responseText;
      case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
        if ("mozResponseArrayBuffer" in this.xhr_) {
          return this.xhr_.mozResponseArrayBuffer;
        }
    }
    goog.log.error(this.logger_, "Response type " + this.responseType_ + " is not supported on this browser");
    return null;
  } catch (c) {
    return goog.log.fine(this.logger_, "Can not get response: " + c.message), null;
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(c) {
  if (this.xhr_ && this.isComplete()) {
    return c = this.xhr_.getResponseHeader(c), goog.isNull(c) ? void 0 : c;
  }
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() || "" : "";
};
goog.net.XhrIo.prototype.getResponseHeaders = function() {
  for (var c = {}, d = this.getAllResponseHeaders().split("\r\n"), e = 0; e < d.length; e++) {
    if (!goog.string.isEmptyOrWhitespace(d[e])) {
      var f = goog.string.splitLimit(d[e], ": ", 2);
      c[f[0]] = c[f[0]] ? c[f[0]] + (", " + f[1]) : f[1];
    }
  }
  return c;
};
goog.net.XhrIo.prototype.getStreamingResponseHeader = function(c) {
  return this.xhr_ ? this.xhr_.getResponseHeader(c) : null;
};
goog.net.XhrIo.prototype.getAllStreamingResponseHeaders = function() {
  return this.xhr_ ? this.xhr_.getAllResponseHeaders() : "";
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_;
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_);
};
goog.net.XhrIo.prototype.formatMsg_ = function(c) {
  return c + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]";
};
goog.debug.entryPointRegistry.register(function(c) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = c(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
});
Matrix.mxXHR = {};
var zoom = {hunh:{}}, mxXHR = function(c, d) {
  d = void 0 === d ? {send:!0, delay:0} : d;
  Model.call(this, null, "mxXhr", {uri:cI(c), xhr:cI(null), okResult:cI(null)});
  d.send && this.send(d.delay);
};
$jscomp.inherits(mxXHR, Model);
mxXHR.cname = Model.cname;
mxXHR.prototype.send = function(c) {
  var d = this, e = function() {
    return goog.net.XhrIo.send(d.uri, function(c) {
      c = c.target;
      d.xhr = c;
      if (c.isSuccess()) {
        d.okResult = c.getResponseJson();
      } else {
        throw "getXHR_JSONxhr last error: " + c.getLastError();
      }
    });
  };
  c ? setTimeout(e, c) : e();
  return d;
};
window.mxXHR = mxXHR;
function getXHR_JSON(c) {
  goog.net.XhrIo.send(c, function(c) {
    c = c.target;
    if (c.isSuccess()) {
      return c.getResponseJson();
    }
    throw "getXHR_JSONxhr last error: " + c.getLastError();
  });
}
function testXHR() {
  clg("testXHR");
  var c = mkm(null, "testX", {lookup:cF(function(c) {
    clg("lookup");
    return new mxXHR("https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:adderall&limit=3");
  }), result:cF(function(c) {
    clg("res");
    c = c.md.lookup;
    clg("result sees lookup", c, c.hunh, c.xhr);
    return c.xhr;
  }), stuff:cF(function(c) {
    clg("stuff");
    if (c = c.md.result) {
      if (c.isSuccess()) {
        return c = c.getResponseJson(), clg("total AEs!!!!!!", c.meta.results.total), c.meta.results.total + "AEs found";
      }
      clg("xhr last error", c.getLastError());
      return "Error " + c.getLastError();
    }
    clg("No result!!!");
  })});
  c.lookup.send();
  console.log("test result " + c.lookup.result);
}
function getabm() {
  clg("getabm!!!!!!!!!!!");
}
function xhraw(c) {
  var d = new XMLHttpRequest;
  d.addEventListener("load", function(c) {
    clg("load", c.target.response);
    debugger;
  });
  d.addEventListener("abort", function(c) {
    return clg("abort", d == c.target);
  });
  d.addEventListener("error", function(c) {
    return clg("error", d == c.target);
  });
  d.open("GET", c);
  d.responseType = "json";
  d.send();
}
;var SLOT_CT = 5, sithApp = new TagSession(null, "SithTrakSession", {obiTrakker:cF(function(c) {
  return (new WebSocket("ws://localhost:4000")).onmessage = function(d) {
    return c.md.obiLoc = JSON.parse(d.data);
  };
}), obiLoc:cI(null), sithIds:cI([-1, -2, 3616, -3, -4])});
function SithTrak() {
  return div({class:"app-container"}, h1({class:"css-planet-monitor", content:cF(function(c) {
    return "Obi-Wan currently on " + (sithApp.obiLoc ? sithApp.obiLoc.name : "...dunno");
  })}), section({class:"css-scrollable-list"}, ul({class:"css-slots"}, {name:"sith-list", kidValues:cF(function(c) {
    return sithApp.sithIds;
  }), kidKey:function(c) {
    return c.sithId;
  }, kidFactory:sithView, next_up:cF(function(c) {
    return c.md.kids[0] && c.md.kids[0].info ? c.md.kids[0].info.master.id : null;
  }, {observer:function(c, d) {
    return d.checkScroll();
  }}), next_down:cF(function(c) {
    return (c = c.md.kids[SLOT_CT - 1]) && c.info ? c.info.apprentice.id : null;
  }, {observer:function(c, d) {
    return d.checkScroll();
  }}), scrollReq:cI(0, {observer:function(c, d) {
    return d.checkScroll();
  }}), checkScroll:function() {
    var c = this.scrollReq;
    0 > c && this.next_up ? (sithApp.sithIds = rotateInOnLeft(sithApp.sithIds, this.next_up), this.scrollReq += 1) : 0 < c && this.next_down && (sithApp.sithIds = rotateInOnRight(sithApp.sithIds, this.next_down), --this.scrollReq);
  }}, function(c) {
    return c.kidValuesKids();
  }), div({class:"css-scroll-buttons", disabled:cF(function(c) {
    return c.md.fmUp("sith-list").kids.some(function(c) {
      return c.withObi;
    });
  })}, scrollerButton("up"), scrollerButton("down"))));
}
function scrollerButton(c) {
  return button({class:cF(function(d) {
    return "css-button-" + c + (d.md.disabled ? " css-button-disabled" : "");
  }), onclick:function(d) {
    return d.fmUp("sith-list").scrollReq += "up" === c ? -2 : 2;
  }, disabled:cF(function(d) {
    return d.md.par.disabled || !d.md.fmTag("ul")["next_" + c];
  })});
}
function sithView(c, d) {
  return li({class:"css-slot", style:cF(function(c) {
    return c.md.withObi ? "color:red" : null;
  })}, {sithId:d, lookup:cF(function(c) {
    return 0 < c.md.sithId ? new mxXHR("http://localhost:3000/dark-jedis/" + c.md.sithId) : null;
  }), cleanUp:function(c) {
    return c.lookup && c.lookup.xhr ? c.lookup.xhr.abort() : null;
  }, info:cF(function(c) {
    return c.md.lookup ? c.md.lookup.okResult : null;
  }, {observer:function(c, f, g) {
    g && withChg("bracket", function() {
      var c = sithApp.sithIds.indexOf(d), e = sithApp.sithIds.slice(), f = slotSetMaybe(e, c - 1, g.master.id);
      if (slotSetMaybe(e, c + 1, g.apprentice.id) || f) {
        sithApp.sithIds = e;
      }
    });
  }}), withObi:cF(function(c) {
    return c.md.info && sithApp.obiLoc && c.md.info.homeworld.name === sithApp.obiLoc.name;
  })}, h3({content:cF(function(c) {
    return (i = c.md.par.info) ? i.name : "";
  })}), h6({content:cF(function(c) {
    return (i = c.md.par.info) ? i.homeworld.name : "";
  })}));
}
function slotSetMaybe(c, d, e) {
  return e && 0 <= d && d < SLOT_CT && (c[d] || -1) !== e ? c[d] = e : !1;
}
function rotateInOnLeft(c, d) {
  return [d].concat(c.slice(0, SLOT_CT - 1));
}
function rotateInOnRight(c, d) {
  c = c.slice(1);
  c.push(d);
  return c;
}
window.SithTrak = SithTrak;

