// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args28253 = [];
var len__19301__auto___28259 = arguments.length;
var i__19302__auto___28260 = (0);
while(true){
if((i__19302__auto___28260 < len__19301__auto___28259)){
args28253.push((arguments[i__19302__auto___28260]));

var G__28261 = (i__19302__auto___28260 + (1));
i__19302__auto___28260 = G__28261;
continue;
} else {
}
break;
}

var G__28255 = args28253.length;
switch (G__28255) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28253.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async28256 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28256 = (function (f,blockable,meta28257){
this.f = f;
this.blockable = blockable;
this.meta28257 = meta28257;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28258,meta28257__$1){
var self__ = this;
var _28258__$1 = this;
return (new cljs.core.async.t_cljs$core$async28256(self__.f,self__.blockable,meta28257__$1));
});

cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28258){
var self__ = this;
var _28258__$1 = this;
return self__.meta28257;
});

cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async28256.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async28256.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$blockable,cljs.core.cst$sym$meta28257], null);
});

cljs.core.async.t_cljs$core$async28256.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async28256.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28256";

cljs.core.async.t_cljs$core$async28256.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async28256");
});

cljs.core.async.__GT_t_cljs$core$async28256 = (function cljs$core$async$__GT_t_cljs$core$async28256(f__$1,blockable__$1,meta28257){
return (new cljs.core.async.t_cljs$core$async28256(f__$1,blockable__$1,meta28257));
});

}

return (new cljs.core.async.t_cljs$core$async28256(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args28265 = [];
var len__19301__auto___28268 = arguments.length;
var i__19302__auto___28269 = (0);
while(true){
if((i__19302__auto___28269 < len__19301__auto___28268)){
args28265.push((arguments[i__19302__auto___28269]));

var G__28270 = (i__19302__auto___28269 + (1));
i__19302__auto___28269 = G__28270;
continue;
} else {
}
break;
}

var G__28267 = args28265.length;
switch (G__28267) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28265.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$sym$buf_DASH_or_DASH_n], 0)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args28272 = [];
var len__19301__auto___28275 = arguments.length;
var i__19302__auto___28276 = (0);
while(true){
if((i__19302__auto___28276 < len__19301__auto___28275)){
args28272.push((arguments[i__19302__auto___28276]));

var G__28277 = (i__19302__auto___28276 + (1));
i__19302__auto___28276 = G__28277;
continue;
} else {
}
break;
}

var G__28274 = args28272.length;
switch (G__28274) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28272.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args28279 = [];
var len__19301__auto___28282 = arguments.length;
var i__19302__auto___28283 = (0);
while(true){
if((i__19302__auto___28283 < len__19301__auto___28282)){
args28279.push((arguments[i__19302__auto___28283]));

var G__28284 = (i__19302__auto___28283 + (1));
i__19302__auto___28283 = G__28284;
continue;
} else {
}
break;
}

var G__28281 = args28279.length;
switch (G__28281) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28279.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_28286 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_28286) : fn1.call(null,val_28286));
} else {
cljs.core.async.impl.dispatch.run(((function (val_28286,ret){
return (function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_28286) : fn1.call(null,val_28286));
});})(val_28286,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args28287 = [];
var len__19301__auto___28290 = arguments.length;
var i__19302__auto___28291 = (0);
while(true){
if((i__19302__auto___28291 < len__19301__auto___28290)){
args28287.push((arguments[i__19302__auto___28291]));

var G__28292 = (i__19302__auto___28291 + (1));
i__19302__auto___28291 = G__28292;
continue;
} else {
}
break;
}

var G__28289 = args28287.length;
switch (G__28289) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28287.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(retb) : cljs.core.deref.call(null,retb));
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run(((function (ret,retb,temp__4423__auto__){
return (function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__19146__auto___28294 = n;
var x_28295 = (0);
while(true){
if((x_28295 < n__19146__auto___28294)){
(a[x_28295] = (0));

var G__28296 = (x_28295 + (1));
x_28295 = G__28296;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,n)){
return a;
} else {
var j = cljs.core.rand_int(i);
(a[i] = (a[j]));

(a[j] = i);

var G__28297 = (i + (1));
i = G__28297;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
if(typeof cljs.core.async.t_cljs$core$async28301 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28301 = (function (alt_flag,flag,meta28302){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta28302 = meta28302;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_28303,meta28302__$1){
var self__ = this;
var _28303__$1 = this;
return (new cljs.core.async.t_cljs$core$async28301(self__.alt_flag,self__.flag,meta28302__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_28303){
var self__ = this;
var _28303__$1 = this;
return self__.meta28302;
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.flag) : cljs.core.deref.call(null,self__.flag));
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.flag,null) : cljs.core.reset_BANG_.call(null,self__.flag,null));

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_flag,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$meta28302], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async28301.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async28301.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28301";

cljs.core.async.t_cljs$core$async28301.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async28301");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async28301 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async28301(alt_flag__$1,flag__$1,meta28302){
return (new cljs.core.async.t_cljs$core$async28301(alt_flag__$1,flag__$1,meta28302));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async28301(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async28307 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async28307 = (function (alt_handler,flag,cb,meta28308){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta28308 = meta28308;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_28309,meta28308__$1){
var self__ = this;
var _28309__$1 = this;
return (new cljs.core.async.t_cljs$core$async28307(self__.alt_handler,self__.flag,self__.cb,meta28308__$1));
});

cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_28309){
var self__ = this;
var _28309__$1 = this;
return self__.meta28308;
});

cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
});

cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async28307.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async28307.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$alt_DASH_handler,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,true,cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$flag,cljs.core.cst$sym$cb], null)))], null)),cljs.core.cst$sym$flag,cljs.core.cst$sym$cb,cljs.core.cst$sym$meta28308], null);
});

cljs.core.async.t_cljs$core$async28307.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async28307.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async28307";

cljs.core.async.t_cljs$core$async28307.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async28307");
});

cljs.core.async.__GT_t_cljs$core$async28307 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async28307(alt_handler__$1,flag__$1,cb__$1,meta28308){
return (new cljs.core.async.t_cljs$core$async28307(alt_handler__$1,flag__$1,cb__$1,meta28308));
});

}

return (new cljs.core.async.t_cljs$core$async28307(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = cljs.core.cst$kw$priority.cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__28310_SHARP_){
var G__28314 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__28310_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__28314) : fret.call(null,G__28314));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__28311_SHARP_){
var G__28315 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__28311_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__28315) : fret.call(null,G__28315));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(vbox) : cljs.core.deref.call(null,vbox)),(function (){var or__18243__auto__ = wport;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return port;
}
})()], null));
} else {
var G__28316 = (i + (1));
i = G__28316;
continue;
}
} else {
return null;
}
break;
}
})();
var or__18243__auto__ = ret;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,cljs.core.cst$kw$default)){
var temp__4425__auto__ = (function (){var and__18231__auto__ = cljs.core.async.impl.protocols.active_QMARK_(flag);
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.async.impl.protocols.commit(flag);
} else {
return and__18231__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$default.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$default], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__19308__auto__ = [];
var len__19301__auto___28322 = arguments.length;
var i__19302__auto___28323 = (0);
while(true){
if((i__19302__auto___28323 < len__19301__auto___28322)){
args__19308__auto__.push((arguments[i__19302__auto___28323]));

var G__28324 = (i__19302__auto___28323 + (1));
i__19302__auto___28323 = G__28324;
continue;
} else {
}
break;
}

var argseq__19309__auto__ = ((((1) < args__19308__auto__.length))?(new cljs.core.IndexedSeq(args__19308__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__19309__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__28319){
var map__28320 = p__28319;
var map__28320__$1 = ((((!((map__28320 == null)))?((((map__28320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28320):map__28320);
var opts = map__28320__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq28317){
var G__28318 = cljs.core.first(seq28317);
var seq28317__$1 = cljs.core.next(seq28317);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__28318,seq28317__$1);
});
/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args28325 = [];
var len__19301__auto___28375 = arguments.length;
var i__19302__auto___28376 = (0);
while(true){
if((i__19302__auto___28376 < len__19301__auto___28375)){
args28325.push((arguments[i__19302__auto___28376]));

var G__28377 = (i__19302__auto___28376 + (1));
i__19302__auto___28376 = G__28377;
continue;
} else {
}
break;
}

var G__28327 = args28325.length;
switch (G__28327) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28325.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__20268__auto___28379 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___28379){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___28379){
return (function (state_28351){
var state_val_28352 = (state_28351[(1)]);
if((state_val_28352 === (7))){
var inst_28347 = (state_28351[(2)]);
var state_28351__$1 = state_28351;
var statearr_28353_28380 = state_28351__$1;
(statearr_28353_28380[(2)] = inst_28347);

(statearr_28353_28380[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (1))){
var state_28351__$1 = state_28351;
var statearr_28354_28381 = state_28351__$1;
(statearr_28354_28381[(2)] = null);

(statearr_28354_28381[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (4))){
var inst_28330 = (state_28351[(7)]);
var inst_28330__$1 = (state_28351[(2)]);
var inst_28331 = (inst_28330__$1 == null);
var state_28351__$1 = (function (){var statearr_28355 = state_28351;
(statearr_28355[(7)] = inst_28330__$1);

return statearr_28355;
})();
if(cljs.core.truth_(inst_28331)){
var statearr_28356_28382 = state_28351__$1;
(statearr_28356_28382[(1)] = (5));

} else {
var statearr_28357_28383 = state_28351__$1;
(statearr_28357_28383[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (13))){
var state_28351__$1 = state_28351;
var statearr_28358_28384 = state_28351__$1;
(statearr_28358_28384[(2)] = null);

(statearr_28358_28384[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (6))){
var inst_28330 = (state_28351[(7)]);
var state_28351__$1 = state_28351;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28351__$1,(11),to,inst_28330);
} else {
if((state_val_28352 === (3))){
var inst_28349 = (state_28351[(2)]);
var state_28351__$1 = state_28351;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28351__$1,inst_28349);
} else {
if((state_val_28352 === (12))){
var state_28351__$1 = state_28351;
var statearr_28359_28385 = state_28351__$1;
(statearr_28359_28385[(2)] = null);

(statearr_28359_28385[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (2))){
var state_28351__$1 = state_28351;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28351__$1,(4),from);
} else {
if((state_val_28352 === (11))){
var inst_28340 = (state_28351[(2)]);
var state_28351__$1 = state_28351;
if(cljs.core.truth_(inst_28340)){
var statearr_28360_28386 = state_28351__$1;
(statearr_28360_28386[(1)] = (12));

} else {
var statearr_28361_28387 = state_28351__$1;
(statearr_28361_28387[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (9))){
var state_28351__$1 = state_28351;
var statearr_28362_28388 = state_28351__$1;
(statearr_28362_28388[(2)] = null);

(statearr_28362_28388[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (5))){
var state_28351__$1 = state_28351;
if(cljs.core.truth_(close_QMARK_)){
var statearr_28363_28389 = state_28351__$1;
(statearr_28363_28389[(1)] = (8));

} else {
var statearr_28364_28390 = state_28351__$1;
(statearr_28364_28390[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (14))){
var inst_28345 = (state_28351[(2)]);
var state_28351__$1 = state_28351;
var statearr_28365_28391 = state_28351__$1;
(statearr_28365_28391[(2)] = inst_28345);

(statearr_28365_28391[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (10))){
var inst_28337 = (state_28351[(2)]);
var state_28351__$1 = state_28351;
var statearr_28366_28392 = state_28351__$1;
(statearr_28366_28392[(2)] = inst_28337);

(statearr_28366_28392[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28352 === (8))){
var inst_28334 = cljs.core.async.close_BANG_(to);
var state_28351__$1 = state_28351;
var statearr_28367_28393 = state_28351__$1;
(statearr_28367_28393[(2)] = inst_28334);

(statearr_28367_28393[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___28379))
;
return ((function (switch__20247__auto__,c__20268__auto___28379){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_28371 = [null,null,null,null,null,null,null,null];
(statearr_28371[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_28371[(1)] = (1));

return statearr_28371;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_28351){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28351);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28372){if((e28372 instanceof Object)){
var ex__20251__auto__ = e28372;
var statearr_28373_28394 = state_28351;
(statearr_28373_28394[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28351);

return cljs.core.cst$kw$recur;
} else {
throw e28372;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28395 = state_28351;
state_28351 = G__28395;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_28351){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_28351);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___28379))
})();
var state__20270__auto__ = (function (){var statearr_28374 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28374[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28379);

return statearr_28374;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___28379))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$pos_QMARK_,cljs.core.cst$sym$n)], 0)))].join('')));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process = ((function (jobs,results){
return (function (p__28579){
var vec__28580 = p__28579;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28580,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28580,(1),null);
var job = vec__28580;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__20268__auto___28762 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results){
return (function (state_28585){
var state_val_28586 = (state_28585[(1)]);
if((state_val_28586 === (1))){
var state_28585__$1 = state_28585;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28585__$1,(2),res,v);
} else {
if((state_val_28586 === (2))){
var inst_28582 = (state_28585[(2)]);
var inst_28583 = cljs.core.async.close_BANG_(res);
var state_28585__$1 = (function (){var statearr_28587 = state_28585;
(statearr_28587[(7)] = inst_28582);

return statearr_28587;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_28585__$1,inst_28583);
} else {
return null;
}
}
});})(c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results))
;
return ((function (switch__20247__auto__,c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_28591 = [null,null,null,null,null,null,null,null];
(statearr_28591[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__);

(statearr_28591[(1)] = (1));

return statearr_28591;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1 = (function (state_28585){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28585);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28592){if((e28592 instanceof Object)){
var ex__20251__auto__ = e28592;
var statearr_28593_28763 = state_28585;
(statearr_28593_28763[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28585);

return cljs.core.cst$kw$recur;
} else {
throw e28592;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28764 = state_28585;
state_28585 = G__28764;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = function(state_28585){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1.call(this,state_28585);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results))
})();
var state__20270__auto__ = (function (){var statearr_28594 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28594[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28762);

return statearr_28594;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___28762,res,vec__28580,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__28595){
var vec__28596 = p__28595;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28596,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__28596,(1),null);
var job = vec__28596;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});})(jobs,results,process))
;
var n__19146__auto___28765 = n;
var __28766 = (0);
while(true){
if((__28766 < n__19146__auto___28765)){
var G__28597_28767 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__28597_28767) {
case "compute":
var c__20268__auto___28769 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__28766,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (__28766,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function (state_28610){
var state_val_28611 = (state_28610[(1)]);
if((state_val_28611 === (1))){
var state_28610__$1 = state_28610;
var statearr_28612_28770 = state_28610__$1;
(statearr_28612_28770[(2)] = null);

(statearr_28612_28770[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28611 === (2))){
var state_28610__$1 = state_28610;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28610__$1,(4),jobs);
} else {
if((state_val_28611 === (3))){
var inst_28608 = (state_28610[(2)]);
var state_28610__$1 = state_28610;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28610__$1,inst_28608);
} else {
if((state_val_28611 === (4))){
var inst_28600 = (state_28610[(2)]);
var inst_28601 = process(inst_28600);
var state_28610__$1 = state_28610;
if(cljs.core.truth_(inst_28601)){
var statearr_28613_28771 = state_28610__$1;
(statearr_28613_28771[(1)] = (5));

} else {
var statearr_28614_28772 = state_28610__$1;
(statearr_28614_28772[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28611 === (5))){
var state_28610__$1 = state_28610;
var statearr_28615_28773 = state_28610__$1;
(statearr_28615_28773[(2)] = null);

(statearr_28615_28773[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28611 === (6))){
var state_28610__$1 = state_28610;
var statearr_28616_28774 = state_28610__$1;
(statearr_28616_28774[(2)] = null);

(statearr_28616_28774[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28611 === (7))){
var inst_28606 = (state_28610[(2)]);
var state_28610__$1 = state_28610;
var statearr_28617_28775 = state_28610__$1;
(statearr_28617_28775[(2)] = inst_28606);

(statearr_28617_28775[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
});})(__28766,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
;
return ((function (__28766,switch__20247__auto__,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_28621 = [null,null,null,null,null,null,null];
(statearr_28621[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__);

(statearr_28621[(1)] = (1));

return statearr_28621;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1 = (function (state_28610){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28610);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28622){if((e28622 instanceof Object)){
var ex__20251__auto__ = e28622;
var statearr_28623_28776 = state_28610;
(statearr_28623_28776[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28610);

return cljs.core.cst$kw$recur;
} else {
throw e28622;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28777 = state_28610;
state_28610 = G__28777;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = function(state_28610){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1.call(this,state_28610);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__;
})()
;})(__28766,switch__20247__auto__,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
})();
var state__20270__auto__ = (function (){var statearr_28624 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28624[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28769);

return statearr_28624;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(__28766,c__20268__auto___28769,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
);


break;
case "async":
var c__20268__auto___28778 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__28766,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (__28766,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function (state_28637){
var state_val_28638 = (state_28637[(1)]);
if((state_val_28638 === (1))){
var state_28637__$1 = state_28637;
var statearr_28639_28779 = state_28637__$1;
(statearr_28639_28779[(2)] = null);

(statearr_28639_28779[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28638 === (2))){
var state_28637__$1 = state_28637;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28637__$1,(4),jobs);
} else {
if((state_val_28638 === (3))){
var inst_28635 = (state_28637[(2)]);
var state_28637__$1 = state_28637;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28637__$1,inst_28635);
} else {
if((state_val_28638 === (4))){
var inst_28627 = (state_28637[(2)]);
var inst_28628 = async(inst_28627);
var state_28637__$1 = state_28637;
if(cljs.core.truth_(inst_28628)){
var statearr_28640_28780 = state_28637__$1;
(statearr_28640_28780[(1)] = (5));

} else {
var statearr_28641_28781 = state_28637__$1;
(statearr_28641_28781[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28638 === (5))){
var state_28637__$1 = state_28637;
var statearr_28642_28782 = state_28637__$1;
(statearr_28642_28782[(2)] = null);

(statearr_28642_28782[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28638 === (6))){
var state_28637__$1 = state_28637;
var statearr_28643_28783 = state_28637__$1;
(statearr_28643_28783[(2)] = null);

(statearr_28643_28783[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28638 === (7))){
var inst_28633 = (state_28637[(2)]);
var state_28637__$1 = state_28637;
var statearr_28644_28784 = state_28637__$1;
(statearr_28644_28784[(2)] = inst_28633);

(statearr_28644_28784[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
});})(__28766,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
;
return ((function (__28766,switch__20247__auto__,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_28648 = [null,null,null,null,null,null,null];
(statearr_28648[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__);

(statearr_28648[(1)] = (1));

return statearr_28648;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1 = (function (state_28637){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28637);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28649){if((e28649 instanceof Object)){
var ex__20251__auto__ = e28649;
var statearr_28650_28785 = state_28637;
(statearr_28650_28785[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28637);

return cljs.core.cst$kw$recur;
} else {
throw e28649;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28786 = state_28637;
state_28637 = G__28786;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = function(state_28637){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1.call(this,state_28637);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__;
})()
;})(__28766,switch__20247__auto__,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
})();
var state__20270__auto__ = (function (){var statearr_28651 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28651[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28778);

return statearr_28651;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(__28766,c__20268__auto___28778,G__28597_28767,n__19146__auto___28765,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__28787 = (__28766 + (1));
__28766 = G__28787;
continue;
} else {
}
break;
}

var c__20268__auto___28788 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___28788,jobs,results,process,async){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___28788,jobs,results,process,async){
return (function (state_28673){
var state_val_28674 = (state_28673[(1)]);
if((state_val_28674 === (1))){
var state_28673__$1 = state_28673;
var statearr_28675_28789 = state_28673__$1;
(statearr_28675_28789[(2)] = null);

(statearr_28675_28789[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28674 === (2))){
var state_28673__$1 = state_28673;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28673__$1,(4),from);
} else {
if((state_val_28674 === (3))){
var inst_28671 = (state_28673[(2)]);
var state_28673__$1 = state_28673;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28673__$1,inst_28671);
} else {
if((state_val_28674 === (4))){
var inst_28654 = (state_28673[(7)]);
var inst_28654__$1 = (state_28673[(2)]);
var inst_28655 = (inst_28654__$1 == null);
var state_28673__$1 = (function (){var statearr_28676 = state_28673;
(statearr_28676[(7)] = inst_28654__$1);

return statearr_28676;
})();
if(cljs.core.truth_(inst_28655)){
var statearr_28677_28790 = state_28673__$1;
(statearr_28677_28790[(1)] = (5));

} else {
var statearr_28678_28791 = state_28673__$1;
(statearr_28678_28791[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28674 === (5))){
var inst_28657 = cljs.core.async.close_BANG_(jobs);
var state_28673__$1 = state_28673;
var statearr_28679_28792 = state_28673__$1;
(statearr_28679_28792[(2)] = inst_28657);

(statearr_28679_28792[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28674 === (6))){
var inst_28659 = (state_28673[(8)]);
var inst_28654 = (state_28673[(7)]);
var inst_28659__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_28660 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_28661 = [inst_28654,inst_28659__$1];
var inst_28662 = (new cljs.core.PersistentVector(null,2,(5),inst_28660,inst_28661,null));
var state_28673__$1 = (function (){var statearr_28680 = state_28673;
(statearr_28680[(8)] = inst_28659__$1);

return statearr_28680;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28673__$1,(8),jobs,inst_28662);
} else {
if((state_val_28674 === (7))){
var inst_28669 = (state_28673[(2)]);
var state_28673__$1 = state_28673;
var statearr_28681_28793 = state_28673__$1;
(statearr_28681_28793[(2)] = inst_28669);

(statearr_28681_28793[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28674 === (8))){
var inst_28659 = (state_28673[(8)]);
var inst_28664 = (state_28673[(2)]);
var state_28673__$1 = (function (){var statearr_28682 = state_28673;
(statearr_28682[(9)] = inst_28664);

return statearr_28682;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28673__$1,(9),results,inst_28659);
} else {
if((state_val_28674 === (9))){
var inst_28666 = (state_28673[(2)]);
var state_28673__$1 = (function (){var statearr_28683 = state_28673;
(statearr_28683[(10)] = inst_28666);

return statearr_28683;
})();
var statearr_28684_28794 = state_28673__$1;
(statearr_28684_28794[(2)] = null);

(statearr_28684_28794[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___28788,jobs,results,process,async))
;
return ((function (switch__20247__auto__,c__20268__auto___28788,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_28688 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_28688[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__);

(statearr_28688[(1)] = (1));

return statearr_28688;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1 = (function (state_28673){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28673);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28689){if((e28689 instanceof Object)){
var ex__20251__auto__ = e28689;
var statearr_28690_28795 = state_28673;
(statearr_28690_28795[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28673);

return cljs.core.cst$kw$recur;
} else {
throw e28689;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28796 = state_28673;
state_28673 = G__28796;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = function(state_28673){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1.call(this,state_28673);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___28788,jobs,results,process,async))
})();
var state__20270__auto__ = (function (){var statearr_28691 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28691[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28788);

return statearr_28691;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___28788,jobs,results,process,async))
);


var c__20268__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto__,jobs,results,process,async){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto__,jobs,results,process,async){
return (function (state_28729){
var state_val_28730 = (state_28729[(1)]);
if((state_val_28730 === (7))){
var inst_28725 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
var statearr_28731_28797 = state_28729__$1;
(statearr_28731_28797[(2)] = inst_28725);

(statearr_28731_28797[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (20))){
var state_28729__$1 = state_28729;
var statearr_28732_28798 = state_28729__$1;
(statearr_28732_28798[(2)] = null);

(statearr_28732_28798[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (1))){
var state_28729__$1 = state_28729;
var statearr_28733_28799 = state_28729__$1;
(statearr_28733_28799[(2)] = null);

(statearr_28733_28799[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (4))){
var inst_28694 = (state_28729[(7)]);
var inst_28694__$1 = (state_28729[(2)]);
var inst_28695 = (inst_28694__$1 == null);
var state_28729__$1 = (function (){var statearr_28734 = state_28729;
(statearr_28734[(7)] = inst_28694__$1);

return statearr_28734;
})();
if(cljs.core.truth_(inst_28695)){
var statearr_28735_28800 = state_28729__$1;
(statearr_28735_28800[(1)] = (5));

} else {
var statearr_28736_28801 = state_28729__$1;
(statearr_28736_28801[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (15))){
var inst_28707 = (state_28729[(8)]);
var state_28729__$1 = state_28729;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28729__$1,(18),to,inst_28707);
} else {
if((state_val_28730 === (21))){
var inst_28720 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
var statearr_28737_28802 = state_28729__$1;
(statearr_28737_28802[(2)] = inst_28720);

(statearr_28737_28802[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (13))){
var inst_28722 = (state_28729[(2)]);
var state_28729__$1 = (function (){var statearr_28738 = state_28729;
(statearr_28738[(9)] = inst_28722);

return statearr_28738;
})();
var statearr_28739_28803 = state_28729__$1;
(statearr_28739_28803[(2)] = null);

(statearr_28739_28803[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (6))){
var inst_28694 = (state_28729[(7)]);
var state_28729__$1 = state_28729;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28729__$1,(11),inst_28694);
} else {
if((state_val_28730 === (17))){
var inst_28715 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
if(cljs.core.truth_(inst_28715)){
var statearr_28740_28804 = state_28729__$1;
(statearr_28740_28804[(1)] = (19));

} else {
var statearr_28741_28805 = state_28729__$1;
(statearr_28741_28805[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (3))){
var inst_28727 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28729__$1,inst_28727);
} else {
if((state_val_28730 === (12))){
var inst_28704 = (state_28729[(10)]);
var state_28729__$1 = state_28729;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28729__$1,(14),inst_28704);
} else {
if((state_val_28730 === (2))){
var state_28729__$1 = state_28729;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28729__$1,(4),results);
} else {
if((state_val_28730 === (19))){
var state_28729__$1 = state_28729;
var statearr_28742_28806 = state_28729__$1;
(statearr_28742_28806[(2)] = null);

(statearr_28742_28806[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (11))){
var inst_28704 = (state_28729[(2)]);
var state_28729__$1 = (function (){var statearr_28743 = state_28729;
(statearr_28743[(10)] = inst_28704);

return statearr_28743;
})();
var statearr_28744_28807 = state_28729__$1;
(statearr_28744_28807[(2)] = null);

(statearr_28744_28807[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (9))){
var state_28729__$1 = state_28729;
var statearr_28745_28808 = state_28729__$1;
(statearr_28745_28808[(2)] = null);

(statearr_28745_28808[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (5))){
var state_28729__$1 = state_28729;
if(cljs.core.truth_(close_QMARK_)){
var statearr_28746_28809 = state_28729__$1;
(statearr_28746_28809[(1)] = (8));

} else {
var statearr_28747_28810 = state_28729__$1;
(statearr_28747_28810[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (14))){
var inst_28709 = (state_28729[(11)]);
var inst_28707 = (state_28729[(8)]);
var inst_28707__$1 = (state_28729[(2)]);
var inst_28708 = (inst_28707__$1 == null);
var inst_28709__$1 = cljs.core.not(inst_28708);
var state_28729__$1 = (function (){var statearr_28748 = state_28729;
(statearr_28748[(11)] = inst_28709__$1);

(statearr_28748[(8)] = inst_28707__$1);

return statearr_28748;
})();
if(inst_28709__$1){
var statearr_28749_28811 = state_28729__$1;
(statearr_28749_28811[(1)] = (15));

} else {
var statearr_28750_28812 = state_28729__$1;
(statearr_28750_28812[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (16))){
var inst_28709 = (state_28729[(11)]);
var state_28729__$1 = state_28729;
var statearr_28751_28813 = state_28729__$1;
(statearr_28751_28813[(2)] = inst_28709);

(statearr_28751_28813[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (10))){
var inst_28701 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
var statearr_28752_28814 = state_28729__$1;
(statearr_28752_28814[(2)] = inst_28701);

(statearr_28752_28814[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (18))){
var inst_28712 = (state_28729[(2)]);
var state_28729__$1 = state_28729;
var statearr_28753_28815 = state_28729__$1;
(statearr_28753_28815[(2)] = inst_28712);

(statearr_28753_28815[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28730 === (8))){
var inst_28698 = cljs.core.async.close_BANG_(to);
var state_28729__$1 = state_28729;
var statearr_28754_28816 = state_28729__$1;
(statearr_28754_28816[(2)] = inst_28698);

(statearr_28754_28816[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto__,jobs,results,process,async))
;
return ((function (switch__20247__auto__,c__20268__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_28758 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28758[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__);

(statearr_28758[(1)] = (1));

return statearr_28758;
});
var cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1 = (function (state_28729){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28729);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28759){if((e28759 instanceof Object)){
var ex__20251__auto__ = e28759;
var statearr_28760_28817 = state_28729;
(statearr_28760_28817[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28729);

return cljs.core.cst$kw$recur;
} else {
throw e28759;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28818 = state_28729;
state_28729 = G__28818;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__ = function(state_28729){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1.call(this,state_28729);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto__,jobs,results,process,async))
})();
var state__20270__auto__ = (function (){var statearr_28761 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28761[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto__);

return statearr_28761;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto__,jobs,results,process,async))
);

return c__20268__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args28819 = [];
var len__19301__auto___28822 = arguments.length;
var i__19302__auto___28823 = (0);
while(true){
if((i__19302__auto___28823 < len__19301__auto___28822)){
args28819.push((arguments[i__19302__auto___28823]));

var G__28824 = (i__19302__auto___28823 + (1));
i__19302__auto___28823 = G__28824;
continue;
} else {
}
break;
}

var G__28821 = args28819.length;
switch (G__28821) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28819.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,cljs.core.cst$kw$async);
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args28826 = [];
var len__19301__auto___28829 = arguments.length;
var i__19302__auto___28830 = (0);
while(true){
if((i__19302__auto___28830 < len__19301__auto___28829)){
args28826.push((arguments[i__19302__auto___28830]));

var G__28831 = (i__19302__auto___28830 + (1));
i__19302__auto___28830 = G__28831;
continue;
} else {
}
break;
}

var G__28828 = args28826.length;
switch (G__28828) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28826.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,cljs.core.cst$kw$compute);
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args28833 = [];
var len__19301__auto___28886 = arguments.length;
var i__19302__auto___28887 = (0);
while(true){
if((i__19302__auto___28887 < len__19301__auto___28886)){
args28833.push((arguments[i__19302__auto___28887]));

var G__28888 = (i__19302__auto___28887 + (1));
i__19302__auto___28887 = G__28888;
continue;
} else {
}
break;
}

var G__28835 = args28833.length;
switch (G__28835) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28833.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__20268__auto___28890 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___28890,tc,fc){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___28890,tc,fc){
return (function (state_28861){
var state_val_28862 = (state_28861[(1)]);
if((state_val_28862 === (7))){
var inst_28857 = (state_28861[(2)]);
var state_28861__$1 = state_28861;
var statearr_28863_28891 = state_28861__$1;
(statearr_28863_28891[(2)] = inst_28857);

(statearr_28863_28891[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (1))){
var state_28861__$1 = state_28861;
var statearr_28864_28892 = state_28861__$1;
(statearr_28864_28892[(2)] = null);

(statearr_28864_28892[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (4))){
var inst_28838 = (state_28861[(7)]);
var inst_28838__$1 = (state_28861[(2)]);
var inst_28839 = (inst_28838__$1 == null);
var state_28861__$1 = (function (){var statearr_28865 = state_28861;
(statearr_28865[(7)] = inst_28838__$1);

return statearr_28865;
})();
if(cljs.core.truth_(inst_28839)){
var statearr_28866_28893 = state_28861__$1;
(statearr_28866_28893[(1)] = (5));

} else {
var statearr_28867_28894 = state_28861__$1;
(statearr_28867_28894[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (13))){
var state_28861__$1 = state_28861;
var statearr_28868_28895 = state_28861__$1;
(statearr_28868_28895[(2)] = null);

(statearr_28868_28895[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (6))){
var inst_28838 = (state_28861[(7)]);
var inst_28844 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_28838) : p.call(null,inst_28838));
var state_28861__$1 = state_28861;
if(cljs.core.truth_(inst_28844)){
var statearr_28869_28896 = state_28861__$1;
(statearr_28869_28896[(1)] = (9));

} else {
var statearr_28870_28897 = state_28861__$1;
(statearr_28870_28897[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (3))){
var inst_28859 = (state_28861[(2)]);
var state_28861__$1 = state_28861;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28861__$1,inst_28859);
} else {
if((state_val_28862 === (12))){
var state_28861__$1 = state_28861;
var statearr_28871_28898 = state_28861__$1;
(statearr_28871_28898[(2)] = null);

(statearr_28871_28898[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (2))){
var state_28861__$1 = state_28861;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28861__$1,(4),ch);
} else {
if((state_val_28862 === (11))){
var inst_28838 = (state_28861[(7)]);
var inst_28848 = (state_28861[(2)]);
var state_28861__$1 = state_28861;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_28861__$1,(8),inst_28848,inst_28838);
} else {
if((state_val_28862 === (9))){
var state_28861__$1 = state_28861;
var statearr_28872_28899 = state_28861__$1;
(statearr_28872_28899[(2)] = tc);

(statearr_28872_28899[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (5))){
var inst_28841 = cljs.core.async.close_BANG_(tc);
var inst_28842 = cljs.core.async.close_BANG_(fc);
var state_28861__$1 = (function (){var statearr_28873 = state_28861;
(statearr_28873[(8)] = inst_28841);

return statearr_28873;
})();
var statearr_28874_28900 = state_28861__$1;
(statearr_28874_28900[(2)] = inst_28842);

(statearr_28874_28900[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (14))){
var inst_28855 = (state_28861[(2)]);
var state_28861__$1 = state_28861;
var statearr_28875_28901 = state_28861__$1;
(statearr_28875_28901[(2)] = inst_28855);

(statearr_28875_28901[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (10))){
var state_28861__$1 = state_28861;
var statearr_28876_28902 = state_28861__$1;
(statearr_28876_28902[(2)] = fc);

(statearr_28876_28902[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28862 === (8))){
var inst_28850 = (state_28861[(2)]);
var state_28861__$1 = state_28861;
if(cljs.core.truth_(inst_28850)){
var statearr_28877_28903 = state_28861__$1;
(statearr_28877_28903[(1)] = (12));

} else {
var statearr_28878_28904 = state_28861__$1;
(statearr_28878_28904[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___28890,tc,fc))
;
return ((function (switch__20247__auto__,c__20268__auto___28890,tc,fc){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_28882 = [null,null,null,null,null,null,null,null,null];
(statearr_28882[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_28882[(1)] = (1));

return statearr_28882;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_28861){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28861);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28883){if((e28883 instanceof Object)){
var ex__20251__auto__ = e28883;
var statearr_28884_28905 = state_28861;
(statearr_28884_28905[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28861);

return cljs.core.cst$kw$recur;
} else {
throw e28883;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__28906 = state_28861;
state_28861 = G__28906;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_28861){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_28861);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___28890,tc,fc))
})();
var state__20270__auto__ = (function (){var statearr_28885 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28885[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___28890);

return statearr_28885;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___28890,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__20268__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto__){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto__){
return (function (state_28970){
var state_val_28971 = (state_28970[(1)]);
if((state_val_28971 === (7))){
var inst_28966 = (state_28970[(2)]);
var state_28970__$1 = state_28970;
var statearr_28972_28993 = state_28970__$1;
(statearr_28972_28993[(2)] = inst_28966);

(statearr_28972_28993[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (1))){
var inst_28950 = init;
var state_28970__$1 = (function (){var statearr_28973 = state_28970;
(statearr_28973[(7)] = inst_28950);

return statearr_28973;
})();
var statearr_28974_28994 = state_28970__$1;
(statearr_28974_28994[(2)] = null);

(statearr_28974_28994[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (4))){
var inst_28953 = (state_28970[(8)]);
var inst_28953__$1 = (state_28970[(2)]);
var inst_28954 = (inst_28953__$1 == null);
var state_28970__$1 = (function (){var statearr_28975 = state_28970;
(statearr_28975[(8)] = inst_28953__$1);

return statearr_28975;
})();
if(cljs.core.truth_(inst_28954)){
var statearr_28976_28995 = state_28970__$1;
(statearr_28976_28995[(1)] = (5));

} else {
var statearr_28977_28996 = state_28970__$1;
(statearr_28977_28996[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (6))){
var inst_28957 = (state_28970[(9)]);
var inst_28950 = (state_28970[(7)]);
var inst_28953 = (state_28970[(8)]);
var inst_28957__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_28950,inst_28953) : f.call(null,inst_28950,inst_28953));
var inst_28958 = cljs.core.reduced_QMARK_(inst_28957__$1);
var state_28970__$1 = (function (){var statearr_28978 = state_28970;
(statearr_28978[(9)] = inst_28957__$1);

return statearr_28978;
})();
if(inst_28958){
var statearr_28979_28997 = state_28970__$1;
(statearr_28979_28997[(1)] = (8));

} else {
var statearr_28980_28998 = state_28970__$1;
(statearr_28980_28998[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (3))){
var inst_28968 = (state_28970[(2)]);
var state_28970__$1 = state_28970;
return cljs.core.async.impl.ioc_helpers.return_chan(state_28970__$1,inst_28968);
} else {
if((state_val_28971 === (2))){
var state_28970__$1 = state_28970;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_28970__$1,(4),ch);
} else {
if((state_val_28971 === (9))){
var inst_28957 = (state_28970[(9)]);
var inst_28950 = inst_28957;
var state_28970__$1 = (function (){var statearr_28981 = state_28970;
(statearr_28981[(7)] = inst_28950);

return statearr_28981;
})();
var statearr_28982_28999 = state_28970__$1;
(statearr_28982_28999[(2)] = null);

(statearr_28982_28999[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (5))){
var inst_28950 = (state_28970[(7)]);
var state_28970__$1 = state_28970;
var statearr_28983_29000 = state_28970__$1;
(statearr_28983_29000[(2)] = inst_28950);

(statearr_28983_29000[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (10))){
var inst_28964 = (state_28970[(2)]);
var state_28970__$1 = state_28970;
var statearr_28984_29001 = state_28970__$1;
(statearr_28984_29001[(2)] = inst_28964);

(statearr_28984_29001[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_28971 === (8))){
var inst_28957 = (state_28970[(9)]);
var inst_28960 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_28957) : cljs.core.deref.call(null,inst_28957));
var state_28970__$1 = state_28970;
var statearr_28985_29002 = state_28970__$1;
(statearr_28985_29002[(2)] = inst_28960);

(statearr_28985_29002[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto__))
;
return ((function (switch__20247__auto__,c__20268__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__20248__auto__ = null;
var cljs$core$async$reduce_$_state_machine__20248__auto____0 = (function (){
var statearr_28989 = [null,null,null,null,null,null,null,null,null,null];
(statearr_28989[(0)] = cljs$core$async$reduce_$_state_machine__20248__auto__);

(statearr_28989[(1)] = (1));

return statearr_28989;
});
var cljs$core$async$reduce_$_state_machine__20248__auto____1 = (function (state_28970){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_28970);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e28990){if((e28990 instanceof Object)){
var ex__20251__auto__ = e28990;
var statearr_28991_29003 = state_28970;
(statearr_28991_29003[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_28970);

return cljs.core.cst$kw$recur;
} else {
throw e28990;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__29004 = state_28970;
state_28970 = G__29004;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__20248__auto__ = function(state_28970){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__20248__auto____1.call(this,state_28970);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__20248__auto____0;
cljs$core$async$reduce_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__20248__auto____1;
return cljs$core$async$reduce_$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto__))
})();
var state__20270__auto__ = (function (){var statearr_28992 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_28992[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto__);

return statearr_28992;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto__))
);

return c__20268__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args29005 = [];
var len__19301__auto___29057 = arguments.length;
var i__19302__auto___29058 = (0);
while(true){
if((i__19302__auto___29058 < len__19301__auto___29057)){
args29005.push((arguments[i__19302__auto___29058]));

var G__29059 = (i__19302__auto___29058 + (1));
i__19302__auto___29058 = G__29059;
continue;
} else {
}
break;
}

var G__29007 = args29005.length;
switch (G__29007) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args29005.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__20268__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto__){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto__){
return (function (state_29032){
var state_val_29033 = (state_29032[(1)]);
if((state_val_29033 === (7))){
var inst_29014 = (state_29032[(2)]);
var state_29032__$1 = state_29032;
var statearr_29034_29061 = state_29032__$1;
(statearr_29034_29061[(2)] = inst_29014);

(statearr_29034_29061[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (1))){
var inst_29008 = cljs.core.seq(coll);
var inst_29009 = inst_29008;
var state_29032__$1 = (function (){var statearr_29035 = state_29032;
(statearr_29035[(7)] = inst_29009);

return statearr_29035;
})();
var statearr_29036_29062 = state_29032__$1;
(statearr_29036_29062[(2)] = null);

(statearr_29036_29062[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (4))){
var inst_29009 = (state_29032[(7)]);
var inst_29012 = cljs.core.first(inst_29009);
var state_29032__$1 = state_29032;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_29032__$1,(7),ch,inst_29012);
} else {
if((state_val_29033 === (13))){
var inst_29026 = (state_29032[(2)]);
var state_29032__$1 = state_29032;
var statearr_29037_29063 = state_29032__$1;
(statearr_29037_29063[(2)] = inst_29026);

(statearr_29037_29063[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (6))){
var inst_29017 = (state_29032[(2)]);
var state_29032__$1 = state_29032;
if(cljs.core.truth_(inst_29017)){
var statearr_29038_29064 = state_29032__$1;
(statearr_29038_29064[(1)] = (8));

} else {
var statearr_29039_29065 = state_29032__$1;
(statearr_29039_29065[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (3))){
var inst_29030 = (state_29032[(2)]);
var state_29032__$1 = state_29032;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29032__$1,inst_29030);
} else {
if((state_val_29033 === (12))){
var state_29032__$1 = state_29032;
var statearr_29040_29066 = state_29032__$1;
(statearr_29040_29066[(2)] = null);

(statearr_29040_29066[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (2))){
var inst_29009 = (state_29032[(7)]);
var state_29032__$1 = state_29032;
if(cljs.core.truth_(inst_29009)){
var statearr_29041_29067 = state_29032__$1;
(statearr_29041_29067[(1)] = (4));

} else {
var statearr_29042_29068 = state_29032__$1;
(statearr_29042_29068[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (11))){
var inst_29023 = cljs.core.async.close_BANG_(ch);
var state_29032__$1 = state_29032;
var statearr_29043_29069 = state_29032__$1;
(statearr_29043_29069[(2)] = inst_29023);

(statearr_29043_29069[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (9))){
var state_29032__$1 = state_29032;
if(cljs.core.truth_(close_QMARK_)){
var statearr_29044_29070 = state_29032__$1;
(statearr_29044_29070[(1)] = (11));

} else {
var statearr_29045_29071 = state_29032__$1;
(statearr_29045_29071[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (5))){
var inst_29009 = (state_29032[(7)]);
var state_29032__$1 = state_29032;
var statearr_29046_29072 = state_29032__$1;
(statearr_29046_29072[(2)] = inst_29009);

(statearr_29046_29072[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (10))){
var inst_29028 = (state_29032[(2)]);
var state_29032__$1 = state_29032;
var statearr_29047_29073 = state_29032__$1;
(statearr_29047_29073[(2)] = inst_29028);

(statearr_29047_29073[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29033 === (8))){
var inst_29009 = (state_29032[(7)]);
var inst_29019 = cljs.core.next(inst_29009);
var inst_29009__$1 = inst_29019;
var state_29032__$1 = (function (){var statearr_29048 = state_29032;
(statearr_29048[(7)] = inst_29009__$1);

return statearr_29048;
})();
var statearr_29049_29074 = state_29032__$1;
(statearr_29049_29074[(2)] = null);

(statearr_29049_29074[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto__))
;
return ((function (switch__20247__auto__,c__20268__auto__){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_29053 = [null,null,null,null,null,null,null,null];
(statearr_29053[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_29053[(1)] = (1));

return statearr_29053;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_29032){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_29032);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e29054){if((e29054 instanceof Object)){
var ex__20251__auto__ = e29054;
var statearr_29055_29075 = state_29032;
(statearr_29055_29075[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_29032);

return cljs.core.cst$kw$recur;
} else {
throw e29054;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__29076 = state_29032;
state_29032 = G__29076;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_29032){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_29032);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto__))
})();
var state__20270__auto__ = (function (){var statearr_29056 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_29056[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto__);

return statearr_29056;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto__))
);

return c__20268__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__18898__auto__ = (((_ == null))?null:_);
var m__18899__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__18899__auto__.call(null,_));
} else {
var m__18899__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(_) : m__18899__auto____$1.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$3 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__18899__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__18899__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__18899__auto____$1.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto__.call(null,m,ch));
} else {
var m__18899__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__18899__auto__.call(null,m));
} else {
var m__18899__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(m) : m__18899__auto____$1.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = (function (){var G__29301 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__29301) : cljs.core.atom.call(null,G__29301));
})();
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async29302 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async29302 = (function (mult,ch,cs,meta29303){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta29303 = meta29303;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_29304,meta29303__$1){
var self__ = this;
var _29304__$1 = this;
return (new cljs.core.async.t_cljs$core$async29302(self__.mult,self__.ch,self__.cs,meta29303__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_29304){
var self__ = this;
var _29304__$1 = this;
return self__.meta29303;
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__29305_29525 = self__.cs;
var G__29306_29526 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__29305_29525,G__29306_29526) : cljs.core.reset_BANG_.call(null,G__29305_29525,G__29306_29526));

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$mult,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),cljs.core.cst$sym$ch,cljs.core.cst$sym$cs,cljs.core.cst$sym$meta29303], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async29302.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async29302.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async29302";

cljs.core.async.t_cljs$core$async29302.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async29302");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async29302 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async29302(mult__$1,ch__$1,cs__$1,meta29303){
return (new cljs.core.async.t_cljs$core$async29302(mult__$1,ch__$1,cs__$1,meta29303));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async29302(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__20268__auto___29527 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___29527,cs,m,dchan,dctr,done){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___29527,cs,m,dchan,dctr,done){
return (function (state_29437){
var state_val_29438 = (state_29437[(1)]);
if((state_val_29438 === (7))){
var inst_29433 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29439_29528 = state_29437__$1;
(statearr_29439_29528[(2)] = inst_29433);

(statearr_29439_29528[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (20))){
var inst_29338 = (state_29437[(7)]);
var inst_29348 = cljs.core.first(inst_29338);
var inst_29349 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29348,(0),null);
var inst_29350 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29348,(1),null);
var state_29437__$1 = (function (){var statearr_29440 = state_29437;
(statearr_29440[(8)] = inst_29349);

return statearr_29440;
})();
if(cljs.core.truth_(inst_29350)){
var statearr_29441_29529 = state_29437__$1;
(statearr_29441_29529[(1)] = (22));

} else {
var statearr_29442_29530 = state_29437__$1;
(statearr_29442_29530[(1)] = (23));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (27))){
var inst_29378 = (state_29437[(9)]);
var inst_29380 = (state_29437[(10)]);
var inst_29309 = (state_29437[(11)]);
var inst_29385 = (state_29437[(12)]);
var inst_29385__$1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_29378,inst_29380);
var inst_29386 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_29385__$1,inst_29309,done);
var state_29437__$1 = (function (){var statearr_29443 = state_29437;
(statearr_29443[(12)] = inst_29385__$1);

return statearr_29443;
})();
if(cljs.core.truth_(inst_29386)){
var statearr_29444_29531 = state_29437__$1;
(statearr_29444_29531[(1)] = (30));

} else {
var statearr_29445_29532 = state_29437__$1;
(statearr_29445_29532[(1)] = (31));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (1))){
var state_29437__$1 = state_29437;
var statearr_29446_29533 = state_29437__$1;
(statearr_29446_29533[(2)] = null);

(statearr_29446_29533[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (24))){
var inst_29338 = (state_29437[(7)]);
var inst_29355 = (state_29437[(2)]);
var inst_29356 = cljs.core.next(inst_29338);
var inst_29318 = inst_29356;
var inst_29319 = null;
var inst_29320 = (0);
var inst_29321 = (0);
var state_29437__$1 = (function (){var statearr_29447 = state_29437;
(statearr_29447[(13)] = inst_29320);

(statearr_29447[(14)] = inst_29318);

(statearr_29447[(15)] = inst_29321);

(statearr_29447[(16)] = inst_29355);

(statearr_29447[(17)] = inst_29319);

return statearr_29447;
})();
var statearr_29448_29534 = state_29437__$1;
(statearr_29448_29534[(2)] = null);

(statearr_29448_29534[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (39))){
var state_29437__$1 = state_29437;
var statearr_29452_29535 = state_29437__$1;
(statearr_29452_29535[(2)] = null);

(statearr_29452_29535[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (4))){
var inst_29309 = (state_29437[(11)]);
var inst_29309__$1 = (state_29437[(2)]);
var inst_29310 = (inst_29309__$1 == null);
var state_29437__$1 = (function (){var statearr_29453 = state_29437;
(statearr_29453[(11)] = inst_29309__$1);

return statearr_29453;
})();
if(cljs.core.truth_(inst_29310)){
var statearr_29454_29536 = state_29437__$1;
(statearr_29454_29536[(1)] = (5));

} else {
var statearr_29455_29537 = state_29437__$1;
(statearr_29455_29537[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (15))){
var inst_29320 = (state_29437[(13)]);
var inst_29318 = (state_29437[(14)]);
var inst_29321 = (state_29437[(15)]);
var inst_29319 = (state_29437[(17)]);
var inst_29334 = (state_29437[(2)]);
var inst_29335 = (inst_29321 + (1));
var tmp29449 = inst_29320;
var tmp29450 = inst_29318;
var tmp29451 = inst_29319;
var inst_29318__$1 = tmp29450;
var inst_29319__$1 = tmp29451;
var inst_29320__$1 = tmp29449;
var inst_29321__$1 = inst_29335;
var state_29437__$1 = (function (){var statearr_29456 = state_29437;
(statearr_29456[(18)] = inst_29334);

(statearr_29456[(13)] = inst_29320__$1);

(statearr_29456[(14)] = inst_29318__$1);

(statearr_29456[(15)] = inst_29321__$1);

(statearr_29456[(17)] = inst_29319__$1);

return statearr_29456;
})();
var statearr_29457_29538 = state_29437__$1;
(statearr_29457_29538[(2)] = null);

(statearr_29457_29538[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (21))){
var inst_29359 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29461_29539 = state_29437__$1;
(statearr_29461_29539[(2)] = inst_29359);

(statearr_29461_29539[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (31))){
var inst_29385 = (state_29437[(12)]);
var inst_29389 = done(null);
var inst_29390 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_29385);
var state_29437__$1 = (function (){var statearr_29462 = state_29437;
(statearr_29462[(19)] = inst_29389);

return statearr_29462;
})();
var statearr_29463_29540 = state_29437__$1;
(statearr_29463_29540[(2)] = inst_29390);

(statearr_29463_29540[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (32))){
var inst_29377 = (state_29437[(20)]);
var inst_29379 = (state_29437[(21)]);
var inst_29378 = (state_29437[(9)]);
var inst_29380 = (state_29437[(10)]);
var inst_29392 = (state_29437[(2)]);
var inst_29393 = (inst_29380 + (1));
var tmp29458 = inst_29377;
var tmp29459 = inst_29379;
var tmp29460 = inst_29378;
var inst_29377__$1 = tmp29458;
var inst_29378__$1 = tmp29460;
var inst_29379__$1 = tmp29459;
var inst_29380__$1 = inst_29393;
var state_29437__$1 = (function (){var statearr_29464 = state_29437;
(statearr_29464[(20)] = inst_29377__$1);

(statearr_29464[(21)] = inst_29379__$1);

(statearr_29464[(9)] = inst_29378__$1);

(statearr_29464[(10)] = inst_29380__$1);

(statearr_29464[(22)] = inst_29392);

return statearr_29464;
})();
var statearr_29465_29541 = state_29437__$1;
(statearr_29465_29541[(2)] = null);

(statearr_29465_29541[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (40))){
var inst_29405 = (state_29437[(23)]);
var inst_29409 = done(null);
var inst_29410 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_29405);
var state_29437__$1 = (function (){var statearr_29466 = state_29437;
(statearr_29466[(24)] = inst_29409);

return statearr_29466;
})();
var statearr_29467_29542 = state_29437__$1;
(statearr_29467_29542[(2)] = inst_29410);

(statearr_29467_29542[(1)] = (41));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (33))){
var inst_29396 = (state_29437[(25)]);
var inst_29398 = cljs.core.chunked_seq_QMARK_(inst_29396);
var state_29437__$1 = state_29437;
if(inst_29398){
var statearr_29468_29543 = state_29437__$1;
(statearr_29468_29543[(1)] = (36));

} else {
var statearr_29469_29544 = state_29437__$1;
(statearr_29469_29544[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (13))){
var inst_29328 = (state_29437[(26)]);
var inst_29331 = cljs.core.async.close_BANG_(inst_29328);
var state_29437__$1 = state_29437;
var statearr_29470_29545 = state_29437__$1;
(statearr_29470_29545[(2)] = inst_29331);

(statearr_29470_29545[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (22))){
var inst_29349 = (state_29437[(8)]);
var inst_29352 = cljs.core.async.close_BANG_(inst_29349);
var state_29437__$1 = state_29437;
var statearr_29471_29546 = state_29437__$1;
(statearr_29471_29546[(2)] = inst_29352);

(statearr_29471_29546[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (36))){
var inst_29396 = (state_29437[(25)]);
var inst_29400 = cljs.core.chunk_first(inst_29396);
var inst_29401 = cljs.core.chunk_rest(inst_29396);
var inst_29402 = cljs.core.count(inst_29400);
var inst_29377 = inst_29401;
var inst_29378 = inst_29400;
var inst_29379 = inst_29402;
var inst_29380 = (0);
var state_29437__$1 = (function (){var statearr_29472 = state_29437;
(statearr_29472[(20)] = inst_29377);

(statearr_29472[(21)] = inst_29379);

(statearr_29472[(9)] = inst_29378);

(statearr_29472[(10)] = inst_29380);

return statearr_29472;
})();
var statearr_29473_29547 = state_29437__$1;
(statearr_29473_29547[(2)] = null);

(statearr_29473_29547[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (41))){
var inst_29396 = (state_29437[(25)]);
var inst_29412 = (state_29437[(2)]);
var inst_29413 = cljs.core.next(inst_29396);
var inst_29377 = inst_29413;
var inst_29378 = null;
var inst_29379 = (0);
var inst_29380 = (0);
var state_29437__$1 = (function (){var statearr_29474 = state_29437;
(statearr_29474[(20)] = inst_29377);

(statearr_29474[(21)] = inst_29379);

(statearr_29474[(9)] = inst_29378);

(statearr_29474[(10)] = inst_29380);

(statearr_29474[(27)] = inst_29412);

return statearr_29474;
})();
var statearr_29475_29548 = state_29437__$1;
(statearr_29475_29548[(2)] = null);

(statearr_29475_29548[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (43))){
var state_29437__$1 = state_29437;
var statearr_29476_29549 = state_29437__$1;
(statearr_29476_29549[(2)] = null);

(statearr_29476_29549[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (29))){
var inst_29421 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29477_29550 = state_29437__$1;
(statearr_29477_29550[(2)] = inst_29421);

(statearr_29477_29550[(1)] = (26));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (44))){
var inst_29430 = (state_29437[(2)]);
var state_29437__$1 = (function (){var statearr_29478 = state_29437;
(statearr_29478[(28)] = inst_29430);

return statearr_29478;
})();
var statearr_29479_29551 = state_29437__$1;
(statearr_29479_29551[(2)] = null);

(statearr_29479_29551[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (6))){
var inst_29369 = (state_29437[(29)]);
var inst_29368 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_29369__$1 = cljs.core.keys(inst_29368);
var inst_29370 = cljs.core.count(inst_29369__$1);
var inst_29371 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,inst_29370) : cljs.core.reset_BANG_.call(null,dctr,inst_29370));
var inst_29376 = cljs.core.seq(inst_29369__$1);
var inst_29377 = inst_29376;
var inst_29378 = null;
var inst_29379 = (0);
var inst_29380 = (0);
var state_29437__$1 = (function (){var statearr_29480 = state_29437;
(statearr_29480[(20)] = inst_29377);

(statearr_29480[(21)] = inst_29379);

(statearr_29480[(29)] = inst_29369__$1);

(statearr_29480[(30)] = inst_29371);

(statearr_29480[(9)] = inst_29378);

(statearr_29480[(10)] = inst_29380);

return statearr_29480;
})();
var statearr_29481_29552 = state_29437__$1;
(statearr_29481_29552[(2)] = null);

(statearr_29481_29552[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (28))){
var inst_29377 = (state_29437[(20)]);
var inst_29396 = (state_29437[(25)]);
var inst_29396__$1 = cljs.core.seq(inst_29377);
var state_29437__$1 = (function (){var statearr_29482 = state_29437;
(statearr_29482[(25)] = inst_29396__$1);

return statearr_29482;
})();
if(inst_29396__$1){
var statearr_29483_29553 = state_29437__$1;
(statearr_29483_29553[(1)] = (33));

} else {
var statearr_29484_29554 = state_29437__$1;
(statearr_29484_29554[(1)] = (34));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (25))){
var inst_29379 = (state_29437[(21)]);
var inst_29380 = (state_29437[(10)]);
var inst_29382 = (inst_29380 < inst_29379);
var inst_29383 = inst_29382;
var state_29437__$1 = state_29437;
if(cljs.core.truth_(inst_29383)){
var statearr_29485_29555 = state_29437__$1;
(statearr_29485_29555[(1)] = (27));

} else {
var statearr_29486_29556 = state_29437__$1;
(statearr_29486_29556[(1)] = (28));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (34))){
var state_29437__$1 = state_29437;
var statearr_29487_29557 = state_29437__$1;
(statearr_29487_29557[(2)] = null);

(statearr_29487_29557[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (17))){
var state_29437__$1 = state_29437;
var statearr_29488_29558 = state_29437__$1;
(statearr_29488_29558[(2)] = null);

(statearr_29488_29558[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (3))){
var inst_29435 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29437__$1,inst_29435);
} else {
if((state_val_29438 === (12))){
var inst_29364 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29489_29559 = state_29437__$1;
(statearr_29489_29559[(2)] = inst_29364);

(statearr_29489_29559[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (2))){
var state_29437__$1 = state_29437;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29437__$1,(4),ch);
} else {
if((state_val_29438 === (23))){
var state_29437__$1 = state_29437;
var statearr_29490_29560 = state_29437__$1;
(statearr_29490_29560[(2)] = null);

(statearr_29490_29560[(1)] = (24));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (35))){
var inst_29419 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29491_29561 = state_29437__$1;
(statearr_29491_29561[(2)] = inst_29419);

(statearr_29491_29561[(1)] = (29));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (19))){
var inst_29338 = (state_29437[(7)]);
var inst_29342 = cljs.core.chunk_first(inst_29338);
var inst_29343 = cljs.core.chunk_rest(inst_29338);
var inst_29344 = cljs.core.count(inst_29342);
var inst_29318 = inst_29343;
var inst_29319 = inst_29342;
var inst_29320 = inst_29344;
var inst_29321 = (0);
var state_29437__$1 = (function (){var statearr_29492 = state_29437;
(statearr_29492[(13)] = inst_29320);

(statearr_29492[(14)] = inst_29318);

(statearr_29492[(15)] = inst_29321);

(statearr_29492[(17)] = inst_29319);

return statearr_29492;
})();
var statearr_29493_29562 = state_29437__$1;
(statearr_29493_29562[(2)] = null);

(statearr_29493_29562[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (11))){
var inst_29318 = (state_29437[(14)]);
var inst_29338 = (state_29437[(7)]);
var inst_29338__$1 = cljs.core.seq(inst_29318);
var state_29437__$1 = (function (){var statearr_29494 = state_29437;
(statearr_29494[(7)] = inst_29338__$1);

return statearr_29494;
})();
if(inst_29338__$1){
var statearr_29495_29563 = state_29437__$1;
(statearr_29495_29563[(1)] = (16));

} else {
var statearr_29496_29564 = state_29437__$1;
(statearr_29496_29564[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (9))){
var inst_29366 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29497_29565 = state_29437__$1;
(statearr_29497_29565[(2)] = inst_29366);

(statearr_29497_29565[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (5))){
var inst_29316 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var inst_29317 = cljs.core.seq(inst_29316);
var inst_29318 = inst_29317;
var inst_29319 = null;
var inst_29320 = (0);
var inst_29321 = (0);
var state_29437__$1 = (function (){var statearr_29498 = state_29437;
(statearr_29498[(13)] = inst_29320);

(statearr_29498[(14)] = inst_29318);

(statearr_29498[(15)] = inst_29321);

(statearr_29498[(17)] = inst_29319);

return statearr_29498;
})();
var statearr_29499_29566 = state_29437__$1;
(statearr_29499_29566[(2)] = null);

(statearr_29499_29566[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (14))){
var state_29437__$1 = state_29437;
var statearr_29500_29567 = state_29437__$1;
(statearr_29500_29567[(2)] = null);

(statearr_29500_29567[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (45))){
var inst_29427 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29501_29568 = state_29437__$1;
(statearr_29501_29568[(2)] = inst_29427);

(statearr_29501_29568[(1)] = (44));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (26))){
var inst_29369 = (state_29437[(29)]);
var inst_29423 = (state_29437[(2)]);
var inst_29424 = cljs.core.seq(inst_29369);
var state_29437__$1 = (function (){var statearr_29502 = state_29437;
(statearr_29502[(31)] = inst_29423);

return statearr_29502;
})();
if(inst_29424){
var statearr_29503_29569 = state_29437__$1;
(statearr_29503_29569[(1)] = (42));

} else {
var statearr_29504_29570 = state_29437__$1;
(statearr_29504_29570[(1)] = (43));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (16))){
var inst_29338 = (state_29437[(7)]);
var inst_29340 = cljs.core.chunked_seq_QMARK_(inst_29338);
var state_29437__$1 = state_29437;
if(inst_29340){
var statearr_29505_29571 = state_29437__$1;
(statearr_29505_29571[(1)] = (19));

} else {
var statearr_29506_29572 = state_29437__$1;
(statearr_29506_29572[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (38))){
var inst_29416 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29507_29573 = state_29437__$1;
(statearr_29507_29573[(2)] = inst_29416);

(statearr_29507_29573[(1)] = (35));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (30))){
var state_29437__$1 = state_29437;
var statearr_29508_29574 = state_29437__$1;
(statearr_29508_29574[(2)] = null);

(statearr_29508_29574[(1)] = (32));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (10))){
var inst_29321 = (state_29437[(15)]);
var inst_29319 = (state_29437[(17)]);
var inst_29327 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_29319,inst_29321);
var inst_29328 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29327,(0),null);
var inst_29329 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29327,(1),null);
var state_29437__$1 = (function (){var statearr_29509 = state_29437;
(statearr_29509[(26)] = inst_29328);

return statearr_29509;
})();
if(cljs.core.truth_(inst_29329)){
var statearr_29510_29575 = state_29437__$1;
(statearr_29510_29575[(1)] = (13));

} else {
var statearr_29511_29576 = state_29437__$1;
(statearr_29511_29576[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (18))){
var inst_29362 = (state_29437[(2)]);
var state_29437__$1 = state_29437;
var statearr_29512_29577 = state_29437__$1;
(statearr_29512_29577[(2)] = inst_29362);

(statearr_29512_29577[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (42))){
var state_29437__$1 = state_29437;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_29437__$1,(45),dchan);
} else {
if((state_val_29438 === (37))){
var inst_29396 = (state_29437[(25)]);
var inst_29309 = (state_29437[(11)]);
var inst_29405 = (state_29437[(23)]);
var inst_29405__$1 = cljs.core.first(inst_29396);
var inst_29406 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_29405__$1,inst_29309,done);
var state_29437__$1 = (function (){var statearr_29513 = state_29437;
(statearr_29513[(23)] = inst_29405__$1);

return statearr_29513;
})();
if(cljs.core.truth_(inst_29406)){
var statearr_29514_29578 = state_29437__$1;
(statearr_29514_29578[(1)] = (39));

} else {
var statearr_29515_29579 = state_29437__$1;
(statearr_29515_29579[(1)] = (40));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29438 === (8))){
var inst_29320 = (state_29437[(13)]);
var inst_29321 = (state_29437[(15)]);
var inst_29323 = (inst_29321 < inst_29320);
var inst_29324 = inst_29323;
var state_29437__$1 = state_29437;
if(cljs.core.truth_(inst_29324)){
var statearr_29516_29580 = state_29437__$1;
(statearr_29516_29580[(1)] = (10));

} else {
var statearr_29517_29581 = state_29437__$1;
(statearr_29517_29581[(1)] = (11));

}

return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___29527,cs,m,dchan,dctr,done))
;
return ((function (switch__20247__auto__,c__20268__auto___29527,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__20248__auto__ = null;
var cljs$core$async$mult_$_state_machine__20248__auto____0 = (function (){
var statearr_29521 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29521[(0)] = cljs$core$async$mult_$_state_machine__20248__auto__);

(statearr_29521[(1)] = (1));

return statearr_29521;
});
var cljs$core$async$mult_$_state_machine__20248__auto____1 = (function (state_29437){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_29437);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e29522){if((e29522 instanceof Object)){
var ex__20251__auto__ = e29522;
var statearr_29523_29582 = state_29437;
(statearr_29523_29582[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_29437);

return cljs.core.cst$kw$recur;
} else {
throw e29522;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__29583 = state_29437;
state_29437 = G__29583;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__20248__auto__ = function(state_29437){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__20248__auto____1.call(this,state_29437);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__20248__auto____0;
cljs$core$async$mult_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__20248__auto____1;
return cljs$core$async$mult_$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___29527,cs,m,dchan,dctr,done))
})();
var state__20270__auto__ = (function (){var statearr_29524 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_29524[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___29527);

return statearr_29524;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___29527,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args29584 = [];
var len__19301__auto___29587 = arguments.length;
var i__19302__auto___29588 = (0);
while(true){
if((i__19302__auto___29588 < len__19301__auto___29587)){
args29584.push((arguments[i__19302__auto___29588]));

var G__29589 = (i__19302__auto___29588 + (1));
i__19302__auto___29588 = G__29589;
continue;
} else {
}
break;
}

var G__29586 = args29584.length;
switch (G__29586) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args29584.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto__.call(null,m,ch));
} else {
var m__18899__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto__.call(null,m,ch));
} else {
var m__18899__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(m,ch) : m__18899__auto____$1.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__18899__auto__.call(null,m));
} else {
var m__18899__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(m) : m__18899__auto____$1.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__18899__auto__.call(null,m,state_map));
} else {
var m__18899__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__18899__auto____$1.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__18898__auto__ = (((m == null))?null:m);
var m__18899__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__18899__auto__.call(null,m,mode));
} else {
var m__18899__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(m,mode) : m__18899__auto____$1.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__19308__auto__ = [];
var len__19301__auto___29601 = arguments.length;
var i__19302__auto___29602 = (0);
while(true){
if((i__19302__auto___29602 < len__19301__auto___29601)){
args__19308__auto__.push((arguments[i__19302__auto___29602]));

var G__29603 = (i__19302__auto___29602 + (1));
i__19302__auto___29602 = G__29603;
continue;
} else {
}
break;
}

var argseq__19309__auto__ = ((((3) < args__19308__auto__.length))?(new cljs.core.IndexedSeq(args__19308__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__19309__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__29595){
var map__29596 = p__29595;
var map__29596__$1 = ((((!((map__29596 == null)))?((((map__29596.cljs$lang$protocol_mask$partition0$ & (64))) || (map__29596.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__29596):map__29596);
var opts = map__29596__$1;
var statearr_29598_29604 = state;
(statearr_29598_29604[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts(((function (map__29596,map__29596__$1,opts){
return (function (val){
var statearr_29599_29605 = state;
(statearr_29599_29605[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
});})(map__29596,map__29596__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_29600_29606 = state;
(statearr_29600_29606[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cb) : cljs.core.deref.call(null,cb)));


return cljs.core.cst$kw$recur;
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq29591){
var G__29592 = cljs.core.first(seq29591);
var seq29591__$1 = cljs.core.next(seq29591);
var G__29593 = cljs.core.first(seq29591__$1);
var seq29591__$2 = cljs.core.next(seq29591__$1);
var G__29594 = cljs.core.first(seq29591__$2);
var seq29591__$3 = cljs.core.next(seq29591__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__29592,G__29593,G__29594,seq29591__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = (function (){var G__29773 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__29773) : cljs.core.atom.call(null,G__29773));
})();
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$pause,null,cljs.core.cst$kw$mute,null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,cljs.core.cst$kw$solo);
var solo_mode = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$mute) : cljs.core.atom.call(null,cljs.core.cst$kw$mute));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv(((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cs) : cljs.core.deref.call(null,cs));
var mode = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(solo_mode) : cljs.core.deref.call(null,solo_mode));
var solos = pick(cljs.core.cst$kw$solo,chs);
var pauses = pick(cljs.core.cst$kw$pause,chs);
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$solos,solos,cljs.core.cst$kw$mutes,pick(cljs.core.cst$kw$mute,chs),cljs.core.cst$kw$reads,cljs.core.conj.cljs$core$IFn$_invoke$arity$2((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,cljs.core.cst$kw$pause)) && (!(cljs.core.empty_QMARK_(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async29774 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async29774 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta29775){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta29775 = meta29775;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_29776,meta29775__$1){
var self__ = this;
var _29776__$1 = this;
return (new cljs.core.async.t_cljs$core$async29774(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta29775__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_29776){
var self__ = this;
var _29776__$1 = this;
return self__.meta29775;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__29777_29939 = self__.cs;
var G__29778_29940 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__29777_29939,G__29778_29940) : cljs.core.reset_BANG_.call(null,G__29777_29939,G__29778_29940));

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$solo_DASH_modes,cljs.core.cst$sym$mode)], 0)))].join('')));
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.solo_mode,mode) : cljs.core.reset_BANG_.call(null,self__.solo_mode,mode));

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$change,cljs.core.with_meta(cljs.core.cst$sym$mix,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$out], null))),cljs.core.cst$kw$doc,"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),cljs.core.cst$sym$solo_DASH_mode,cljs.core.cst$sym$pick,cljs.core.cst$sym$cs,cljs.core.cst$sym$calc_DASH_state,cljs.core.cst$sym$out,cljs.core.cst$sym$changed,cljs.core.cst$sym$solo_DASH_modes,cljs.core.cst$sym$attrs,cljs.core.cst$sym$meta29775], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async29774.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async29774.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async29774";

cljs.core.async.t_cljs$core$async29774.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async29774");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async29774 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async29774(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta29775){
return (new cljs.core.async.t_cljs$core$async29774(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta29775));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async29774(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20268__auto___29941 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_29876){
var state_val_29877 = (state_29876[(1)]);
if((state_val_29877 === (7))){
var inst_29794 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
var statearr_29878_29942 = state_29876__$1;
(statearr_29878_29942[(2)] = inst_29794);

(statearr_29878_29942[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (20))){
var inst_29806 = (state_29876[(7)]);
var state_29876__$1 = state_29876;
var statearr_29879_29943 = state_29876__$1;
(statearr_29879_29943[(2)] = inst_29806);

(statearr_29879_29943[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (27))){
var state_29876__$1 = state_29876;
var statearr_29880_29944 = state_29876__$1;
(statearr_29880_29944[(2)] = null);

(statearr_29880_29944[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (1))){
var inst_29782 = (state_29876[(8)]);
var inst_29782__$1 = calc_state();
var inst_29784 = (inst_29782__$1 == null);
var inst_29785 = cljs.core.not(inst_29784);
var state_29876__$1 = (function (){var statearr_29881 = state_29876;
(statearr_29881[(8)] = inst_29782__$1);

return statearr_29881;
})();
if(inst_29785){
var statearr_29882_29945 = state_29876__$1;
(statearr_29882_29945[(1)] = (2));

} else {
var statearr_29883_29946 = state_29876__$1;
(statearr_29883_29946[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (24))){
var inst_29850 = (state_29876[(9)]);
var inst_29829 = (state_29876[(10)]);
var inst_29836 = (state_29876[(11)]);
var inst_29850__$1 = (inst_29829.cljs$core$IFn$_invoke$arity$1 ? inst_29829.cljs$core$IFn$_invoke$arity$1(inst_29836) : inst_29829.call(null,inst_29836));
var state_29876__$1 = (function (){var statearr_29884 = state_29876;
(statearr_29884[(9)] = inst_29850__$1);

return statearr_29884;
})();
if(cljs.core.truth_(inst_29850__$1)){
var statearr_29885_29947 = state_29876__$1;
(statearr_29885_29947[(1)] = (29));

} else {
var statearr_29886_29948 = state_29876__$1;
(statearr_29886_29948[(1)] = (30));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (4))){
var inst_29797 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29797)){
var statearr_29887_29949 = state_29876__$1;
(statearr_29887_29949[(1)] = (8));

} else {
var statearr_29888_29950 = state_29876__$1;
(statearr_29888_29950[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (15))){
var inst_29823 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29823)){
var statearr_29889_29951 = state_29876__$1;
(statearr_29889_29951[(1)] = (19));

} else {
var statearr_29890_29952 = state_29876__$1;
(statearr_29890_29952[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (21))){
var inst_29828 = (state_29876[(12)]);
var inst_29828__$1 = (state_29876[(2)]);
var inst_29829 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29828__$1,cljs.core.cst$kw$solos);
var inst_29830 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29828__$1,cljs.core.cst$kw$mutes);
var inst_29831 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29828__$1,cljs.core.cst$kw$reads);
var state_29876__$1 = (function (){var statearr_29891 = state_29876;
(statearr_29891[(10)] = inst_29829);

(statearr_29891[(12)] = inst_29828__$1);

(statearr_29891[(13)] = inst_29830);

return statearr_29891;
})();
return cljs.core.async.ioc_alts_BANG_(state_29876__$1,(22),inst_29831);
} else {
if((state_val_29877 === (31))){
var inst_29858 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29858)){
var statearr_29892_29953 = state_29876__$1;
(statearr_29892_29953[(1)] = (32));

} else {
var statearr_29893_29954 = state_29876__$1;
(statearr_29893_29954[(1)] = (33));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (32))){
var inst_29835 = (state_29876[(14)]);
var state_29876__$1 = state_29876;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_29876__$1,(35),out,inst_29835);
} else {
if((state_val_29877 === (33))){
var inst_29828 = (state_29876[(12)]);
var inst_29806 = inst_29828;
var state_29876__$1 = (function (){var statearr_29894 = state_29876;
(statearr_29894[(7)] = inst_29806);

return statearr_29894;
})();
var statearr_29895_29955 = state_29876__$1;
(statearr_29895_29955[(2)] = null);

(statearr_29895_29955[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (13))){
var inst_29806 = (state_29876[(7)]);
var inst_29813 = inst_29806.cljs$lang$protocol_mask$partition0$;
var inst_29814 = (inst_29813 & (64));
var inst_29815 = inst_29806.cljs$core$ISeq$;
var inst_29816 = (inst_29814) || (inst_29815);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29816)){
var statearr_29896_29956 = state_29876__$1;
(statearr_29896_29956[(1)] = (16));

} else {
var statearr_29897_29957 = state_29876__$1;
(statearr_29897_29957[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (22))){
var inst_29835 = (state_29876[(14)]);
var inst_29836 = (state_29876[(11)]);
var inst_29834 = (state_29876[(2)]);
var inst_29835__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29834,(0),null);
var inst_29836__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_29834,(1),null);
var inst_29837 = (inst_29835__$1 == null);
var inst_29838 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_29836__$1,change);
var inst_29839 = (inst_29837) || (inst_29838);
var state_29876__$1 = (function (){var statearr_29898 = state_29876;
(statearr_29898[(14)] = inst_29835__$1);

(statearr_29898[(11)] = inst_29836__$1);

return statearr_29898;
})();
if(cljs.core.truth_(inst_29839)){
var statearr_29899_29958 = state_29876__$1;
(statearr_29899_29958[(1)] = (23));

} else {
var statearr_29900_29959 = state_29876__$1;
(statearr_29900_29959[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (36))){
var inst_29828 = (state_29876[(12)]);
var inst_29806 = inst_29828;
var state_29876__$1 = (function (){var statearr_29901 = state_29876;
(statearr_29901[(7)] = inst_29806);

return statearr_29901;
})();
var statearr_29902_29960 = state_29876__$1;
(statearr_29902_29960[(2)] = null);

(statearr_29902_29960[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (29))){
var inst_29850 = (state_29876[(9)]);
var state_29876__$1 = state_29876;
var statearr_29903_29961 = state_29876__$1;
(statearr_29903_29961[(2)] = inst_29850);

(statearr_29903_29961[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (6))){
var state_29876__$1 = state_29876;
var statearr_29904_29962 = state_29876__$1;
(statearr_29904_29962[(2)] = false);

(statearr_29904_29962[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (28))){
var inst_29846 = (state_29876[(2)]);
var inst_29847 = calc_state();
var inst_29806 = inst_29847;
var state_29876__$1 = (function (){var statearr_29905 = state_29876;
(statearr_29905[(7)] = inst_29806);

(statearr_29905[(15)] = inst_29846);

return statearr_29905;
})();
var statearr_29906_29963 = state_29876__$1;
(statearr_29906_29963[(2)] = null);

(statearr_29906_29963[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (25))){
var inst_29872 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
var statearr_29907_29964 = state_29876__$1;
(statearr_29907_29964[(2)] = inst_29872);

(statearr_29907_29964[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (34))){
var inst_29870 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
var statearr_29908_29965 = state_29876__$1;
(statearr_29908_29965[(2)] = inst_29870);

(statearr_29908_29965[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (17))){
var state_29876__$1 = state_29876;
var statearr_29909_29966 = state_29876__$1;
(statearr_29909_29966[(2)] = false);

(statearr_29909_29966[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (3))){
var state_29876__$1 = state_29876;
var statearr_29910_29967 = state_29876__$1;
(statearr_29910_29967[(2)] = false);

(statearr_29910_29967[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (12))){
var inst_29874 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
return cljs.core.async.impl.ioc_helpers.return_chan(state_29876__$1,inst_29874);
} else {
if((state_val_29877 === (2))){
var inst_29782 = (state_29876[(8)]);
var inst_29787 = inst_29782.cljs$lang$protocol_mask$partition0$;
var inst_29788 = (inst_29787 & (64));
var inst_29789 = inst_29782.cljs$core$ISeq$;
var inst_29790 = (inst_29788) || (inst_29789);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29790)){
var statearr_29911_29968 = state_29876__$1;
(statearr_29911_29968[(1)] = (5));

} else {
var statearr_29912_29969 = state_29876__$1;
(statearr_29912_29969[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (23))){
var inst_29835 = (state_29876[(14)]);
var inst_29841 = (inst_29835 == null);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29841)){
var statearr_29913_29970 = state_29876__$1;
(statearr_29913_29970[(1)] = (26));

} else {
var statearr_29914_29971 = state_29876__$1;
(statearr_29914_29971[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (35))){
var inst_29861 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
if(cljs.core.truth_(inst_29861)){
var statearr_29915_29972 = state_29876__$1;
(statearr_29915_29972[(1)] = (36));

} else {
var statearr_29916_29973 = state_29876__$1;
(statearr_29916_29973[(1)] = (37));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (19))){
var inst_29806 = (state_29876[(7)]);
var inst_29825 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_29806);
var state_29876__$1 = state_29876;
var statearr_29917_29974 = state_29876__$1;
(statearr_29917_29974[(2)] = inst_29825);

(statearr_29917_29974[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (11))){
var inst_29806 = (state_29876[(7)]);
var inst_29810 = (inst_29806 == null);
var inst_29811 = cljs.core.not(inst_29810);
var state_29876__$1 = state_29876;
if(inst_29811){
var statearr_29918_29975 = state_29876__$1;
(statearr_29918_29975[(1)] = (13));

} else {
var statearr_29919_29976 = state_29876__$1;
(statearr_29919_29976[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (9))){
var inst_29782 = (state_29876[(8)]);
var state_29876__$1 = state_29876;
var statearr_29920_29977 = state_29876__$1;
(statearr_29920_29977[(2)] = inst_29782);

(statearr_29920_29977[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (5))){
var state_29876__$1 = state_29876;
var statearr_29921_29978 = state_29876__$1;
(statearr_29921_29978[(2)] = true);

(statearr_29921_29978[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (14))){
var state_29876__$1 = state_29876;
var statearr_29922_29979 = state_29876__$1;
(statearr_29922_29979[(2)] = false);

(statearr_29922_29979[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (26))){
var inst_29836 = (state_29876[(11)]);
var inst_29843 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_29836);
var state_29876__$1 = state_29876;
var statearr_29923_29980 = state_29876__$1;
(statearr_29923_29980[(2)] = inst_29843);

(statearr_29923_29980[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (16))){
var state_29876__$1 = state_29876;
var statearr_29924_29981 = state_29876__$1;
(statearr_29924_29981[(2)] = true);

(statearr_29924_29981[(1)] = (18));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (38))){
var inst_29866 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
var statearr_29925_29982 = state_29876__$1;
(statearr_29925_29982[(2)] = inst_29866);

(statearr_29925_29982[(1)] = (34));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (30))){
var inst_29829 = (state_29876[(10)]);
var inst_29836 = (state_29876[(11)]);
var inst_29830 = (state_29876[(13)]);
var inst_29853 = cljs.core.empty_QMARK_(inst_29829);
var inst_29854 = (inst_29830.cljs$core$IFn$_invoke$arity$1 ? inst_29830.cljs$core$IFn$_invoke$arity$1(inst_29836) : inst_29830.call(null,inst_29836));
var inst_29855 = cljs.core.not(inst_29854);
var inst_29856 = (inst_29853) && (inst_29855);
var state_29876__$1 = state_29876;
var statearr_29926_29983 = state_29876__$1;
(statearr_29926_29983[(2)] = inst_29856);

(statearr_29926_29983[(1)] = (31));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (10))){
var inst_29782 = (state_29876[(8)]);
var inst_29802 = (state_29876[(2)]);
var inst_29803 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29802,cljs.core.cst$kw$solos);
var inst_29804 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29802,cljs.core.cst$kw$mutes);
var inst_29805 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_29802,cljs.core.cst$kw$reads);
var inst_29806 = inst_29782;
var state_29876__$1 = (function (){var statearr_29927 = state_29876;
(statearr_29927[(16)] = inst_29805);

(statearr_29927[(7)] = inst_29806);

(statearr_29927[(17)] = inst_29804);

(statearr_29927[(18)] = inst_29803);

return statearr_29927;
})();
var statearr_29928_29984 = state_29876__$1;
(statearr_29928_29984[(2)] = null);

(statearr_29928_29984[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (18))){
var inst_29820 = (state_29876[(2)]);
var state_29876__$1 = state_29876;
var statearr_29929_29985 = state_29876__$1;
(statearr_29929_29985[(2)] = inst_29820);

(statearr_29929_29985[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (37))){
var state_29876__$1 = state_29876;
var statearr_29930_29986 = state_29876__$1;
(statearr_29930_29986[(2)] = null);

(statearr_29930_29986[(1)] = (38));


return cljs.core.cst$kw$recur;
} else {
if((state_val_29877 === (8))){
var inst_29782 = (state_29876[(8)]);
var inst_29799 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_29782);
var state_29876__$1 = state_29876;
var statearr_29931_29987 = state_29876__$1;
(statearr_29931_29987[(2)] = inst_29799);

(statearr_29931_29987[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__20247__auto__,c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__20248__auto__ = null;
var cljs$core$async$mix_$_state_machine__20248__auto____0 = (function (){
var statearr_29935 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_29935[(0)] = cljs$core$async$mix_$_state_machine__20248__auto__);

(statearr_29935[(1)] = (1));

return statearr_29935;
});
var cljs$core$async$mix_$_state_machine__20248__auto____1 = (function (state_29876){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_29876);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e29936){if((e29936 instanceof Object)){
var ex__20251__auto__ = e29936;
var statearr_29937_29988 = state_29876;
(statearr_29937_29988[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_29876);

return cljs.core.cst$kw$recur;
} else {
throw e29936;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__29989 = state_29876;
state_29876 = G__29989;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__20248__auto__ = function(state_29876){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__20248__auto____1.call(this,state_29876);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__20248__auto____0;
cljs$core$async$mix_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__20248__auto____1;
return cljs$core$async$mix_$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__20270__auto__ = (function (){var statearr_29938 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_29938[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___29941);

return statearr_29938;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___29941,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__18898__auto__ = (((p == null))?null:p);
var m__18899__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$4 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__18899__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__18899__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__18899__auto____$1.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__18898__auto__ = (((p == null))?null:p);
var m__18899__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$3 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__18899__auto__.call(null,p,v,ch));
} else {
var m__18899__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__18899__auto____$1.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args29990 = [];
var len__19301__auto___29993 = arguments.length;
var i__19302__auto___29994 = (0);
while(true){
if((i__19302__auto___29994 < len__19301__auto___29993)){
args29990.push((arguments[i__19302__auto___29994]));

var G__29995 = (i__19302__auto___29994 + (1));
i__19302__auto___29994 = G__29995;
continue;
} else {
}
break;
}

var G__29992 = args29990.length;
switch (G__29992) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args29990.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__18898__auto__ = (((p == null))?null:p);
var m__18899__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__18899__auto__.call(null,p));
} else {
var m__18899__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(p) : m__18899__auto____$1.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__18898__auto__ = (((p == null))?null:p);
var m__18899__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__18899__auto__.call(null,p,v));
} else {
var m__18899__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(p,v) : m__18899__auto____$1.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args29998 = [];
var len__19301__auto___30126 = arguments.length;
var i__19302__auto___30127 = (0);
while(true){
if((i__19302__auto___30127 < len__19301__auto___30126)){
args29998.push((arguments[i__19302__auto___30127]));

var G__30128 = (i__19302__auto___30127 + (1));
i__19302__auto___30127 = G__30128;
continue;
} else {
}
break;
}

var G__30000 = args29998.length;
switch (G__30000) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args29998.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = (function (){var G__30001 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__30001) : cljs.core.atom.call(null,G__30001));
})();
var ensure_mult = ((function (mults){
return (function (topic){
var or__18243__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults)),topic);
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,((function (or__18243__auto__,mults){
return (function (p1__29997_SHARP_){
if(cljs.core.truth_((p1__29997_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__29997_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__29997_SHARP_.call(null,topic)))){
return p1__29997_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__29997_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
});})(or__18243__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async30002 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async30002 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta30003){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta30003 = meta30003;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_30004,meta30003__$1){
var self__ = this;
var _30004__$1 = this;
return (new cljs.core.async.t_cljs$core$async30002(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta30003__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_30004){
var self__ = this;
var _30004__$1 = this;
return self__.meta30003;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.mults) : cljs.core.deref.call(null,self__.mults)),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
var G__30005 = self__.mults;
var G__30006 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__30005,G__30006) : cljs.core.reset_BANG_.call(null,G__30005,G__30006));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch,cljs.core.cst$sym$topic_DASH_fn,cljs.core.cst$sym$buf_DASH_fn,cljs.core.cst$sym$mults,cljs.core.cst$sym$ensure_DASH_mult,cljs.core.cst$sym$meta30003], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async30002.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async30002.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async30002";

cljs.core.async.t_cljs$core$async30002.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async30002");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async30002 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async30002(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta30003){
return (new cljs.core.async.t_cljs$core$async30002(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta30003));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async30002(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__20268__auto___30130 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30130,mults,ensure_mult,p){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30130,mults,ensure_mult,p){
return (function (state_30078){
var state_val_30079 = (state_30078[(1)]);
if((state_val_30079 === (7))){
var inst_30074 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30080_30131 = state_30078__$1;
(statearr_30080_30131[(2)] = inst_30074);

(statearr_30080_30131[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (20))){
var state_30078__$1 = state_30078;
var statearr_30081_30132 = state_30078__$1;
(statearr_30081_30132[(2)] = null);

(statearr_30081_30132[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (1))){
var state_30078__$1 = state_30078;
var statearr_30082_30133 = state_30078__$1;
(statearr_30082_30133[(2)] = null);

(statearr_30082_30133[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (24))){
var inst_30057 = (state_30078[(7)]);
var inst_30066 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_30057);
var state_30078__$1 = state_30078;
var statearr_30083_30134 = state_30078__$1;
(statearr_30083_30134[(2)] = inst_30066);

(statearr_30083_30134[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (4))){
var inst_30009 = (state_30078[(8)]);
var inst_30009__$1 = (state_30078[(2)]);
var inst_30010 = (inst_30009__$1 == null);
var state_30078__$1 = (function (){var statearr_30084 = state_30078;
(statearr_30084[(8)] = inst_30009__$1);

return statearr_30084;
})();
if(cljs.core.truth_(inst_30010)){
var statearr_30085_30135 = state_30078__$1;
(statearr_30085_30135[(1)] = (5));

} else {
var statearr_30086_30136 = state_30078__$1;
(statearr_30086_30136[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (15))){
var inst_30051 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30087_30137 = state_30078__$1;
(statearr_30087_30137[(2)] = inst_30051);

(statearr_30087_30137[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (21))){
var inst_30071 = (state_30078[(2)]);
var state_30078__$1 = (function (){var statearr_30088 = state_30078;
(statearr_30088[(9)] = inst_30071);

return statearr_30088;
})();
var statearr_30089_30138 = state_30078__$1;
(statearr_30089_30138[(2)] = null);

(statearr_30089_30138[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (13))){
var inst_30033 = (state_30078[(10)]);
var inst_30035 = cljs.core.chunked_seq_QMARK_(inst_30033);
var state_30078__$1 = state_30078;
if(inst_30035){
var statearr_30090_30139 = state_30078__$1;
(statearr_30090_30139[(1)] = (16));

} else {
var statearr_30091_30140 = state_30078__$1;
(statearr_30091_30140[(1)] = (17));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (22))){
var inst_30063 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
if(cljs.core.truth_(inst_30063)){
var statearr_30092_30141 = state_30078__$1;
(statearr_30092_30141[(1)] = (23));

} else {
var statearr_30093_30142 = state_30078__$1;
(statearr_30093_30142[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (6))){
var inst_30057 = (state_30078[(7)]);
var inst_30009 = (state_30078[(8)]);
var inst_30059 = (state_30078[(11)]);
var inst_30057__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_30009) : topic_fn.call(null,inst_30009));
var inst_30058 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_30059__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_30058,inst_30057__$1);
var state_30078__$1 = (function (){var statearr_30094 = state_30078;
(statearr_30094[(7)] = inst_30057__$1);

(statearr_30094[(11)] = inst_30059__$1);

return statearr_30094;
})();
if(cljs.core.truth_(inst_30059__$1)){
var statearr_30095_30143 = state_30078__$1;
(statearr_30095_30143[(1)] = (19));

} else {
var statearr_30096_30144 = state_30078__$1;
(statearr_30096_30144[(1)] = (20));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (25))){
var inst_30068 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30097_30145 = state_30078__$1;
(statearr_30097_30145[(2)] = inst_30068);

(statearr_30097_30145[(1)] = (21));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (17))){
var inst_30033 = (state_30078[(10)]);
var inst_30042 = cljs.core.first(inst_30033);
var inst_30043 = cljs.core.async.muxch_STAR_(inst_30042);
var inst_30044 = cljs.core.async.close_BANG_(inst_30043);
var inst_30045 = cljs.core.next(inst_30033);
var inst_30019 = inst_30045;
var inst_30020 = null;
var inst_30021 = (0);
var inst_30022 = (0);
var state_30078__$1 = (function (){var statearr_30098 = state_30078;
(statearr_30098[(12)] = inst_30022);

(statearr_30098[(13)] = inst_30021);

(statearr_30098[(14)] = inst_30020);

(statearr_30098[(15)] = inst_30044);

(statearr_30098[(16)] = inst_30019);

return statearr_30098;
})();
var statearr_30099_30146 = state_30078__$1;
(statearr_30099_30146[(2)] = null);

(statearr_30099_30146[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (3))){
var inst_30076 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30078__$1,inst_30076);
} else {
if((state_val_30079 === (12))){
var inst_30053 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30100_30147 = state_30078__$1;
(statearr_30100_30147[(2)] = inst_30053);

(statearr_30100_30147[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (2))){
var state_30078__$1 = state_30078;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30078__$1,(4),ch);
} else {
if((state_val_30079 === (23))){
var state_30078__$1 = state_30078;
var statearr_30101_30148 = state_30078__$1;
(statearr_30101_30148[(2)] = null);

(statearr_30101_30148[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (19))){
var inst_30009 = (state_30078[(8)]);
var inst_30059 = (state_30078[(11)]);
var inst_30061 = cljs.core.async.muxch_STAR_(inst_30059);
var state_30078__$1 = state_30078;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30078__$1,(22),inst_30061,inst_30009);
} else {
if((state_val_30079 === (11))){
var inst_30033 = (state_30078[(10)]);
var inst_30019 = (state_30078[(16)]);
var inst_30033__$1 = cljs.core.seq(inst_30019);
var state_30078__$1 = (function (){var statearr_30102 = state_30078;
(statearr_30102[(10)] = inst_30033__$1);

return statearr_30102;
})();
if(inst_30033__$1){
var statearr_30103_30149 = state_30078__$1;
(statearr_30103_30149[(1)] = (13));

} else {
var statearr_30104_30150 = state_30078__$1;
(statearr_30104_30150[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (9))){
var inst_30055 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30105_30151 = state_30078__$1;
(statearr_30105_30151[(2)] = inst_30055);

(statearr_30105_30151[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (5))){
var inst_30016 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mults) : cljs.core.deref.call(null,mults));
var inst_30017 = cljs.core.vals(inst_30016);
var inst_30018 = cljs.core.seq(inst_30017);
var inst_30019 = inst_30018;
var inst_30020 = null;
var inst_30021 = (0);
var inst_30022 = (0);
var state_30078__$1 = (function (){var statearr_30106 = state_30078;
(statearr_30106[(12)] = inst_30022);

(statearr_30106[(13)] = inst_30021);

(statearr_30106[(14)] = inst_30020);

(statearr_30106[(16)] = inst_30019);

return statearr_30106;
})();
var statearr_30107_30152 = state_30078__$1;
(statearr_30107_30152[(2)] = null);

(statearr_30107_30152[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (14))){
var state_30078__$1 = state_30078;
var statearr_30111_30153 = state_30078__$1;
(statearr_30111_30153[(2)] = null);

(statearr_30111_30153[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (16))){
var inst_30033 = (state_30078[(10)]);
var inst_30037 = cljs.core.chunk_first(inst_30033);
var inst_30038 = cljs.core.chunk_rest(inst_30033);
var inst_30039 = cljs.core.count(inst_30037);
var inst_30019 = inst_30038;
var inst_30020 = inst_30037;
var inst_30021 = inst_30039;
var inst_30022 = (0);
var state_30078__$1 = (function (){var statearr_30112 = state_30078;
(statearr_30112[(12)] = inst_30022);

(statearr_30112[(13)] = inst_30021);

(statearr_30112[(14)] = inst_30020);

(statearr_30112[(16)] = inst_30019);

return statearr_30112;
})();
var statearr_30113_30154 = state_30078__$1;
(statearr_30113_30154[(2)] = null);

(statearr_30113_30154[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (10))){
var inst_30022 = (state_30078[(12)]);
var inst_30021 = (state_30078[(13)]);
var inst_30020 = (state_30078[(14)]);
var inst_30019 = (state_30078[(16)]);
var inst_30027 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_30020,inst_30022);
var inst_30028 = cljs.core.async.muxch_STAR_(inst_30027);
var inst_30029 = cljs.core.async.close_BANG_(inst_30028);
var inst_30030 = (inst_30022 + (1));
var tmp30108 = inst_30021;
var tmp30109 = inst_30020;
var tmp30110 = inst_30019;
var inst_30019__$1 = tmp30110;
var inst_30020__$1 = tmp30109;
var inst_30021__$1 = tmp30108;
var inst_30022__$1 = inst_30030;
var state_30078__$1 = (function (){var statearr_30114 = state_30078;
(statearr_30114[(12)] = inst_30022__$1);

(statearr_30114[(13)] = inst_30021__$1);

(statearr_30114[(14)] = inst_30020__$1);

(statearr_30114[(17)] = inst_30029);

(statearr_30114[(16)] = inst_30019__$1);

return statearr_30114;
})();
var statearr_30115_30155 = state_30078__$1;
(statearr_30115_30155[(2)] = null);

(statearr_30115_30155[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (18))){
var inst_30048 = (state_30078[(2)]);
var state_30078__$1 = state_30078;
var statearr_30116_30156 = state_30078__$1;
(statearr_30116_30156[(2)] = inst_30048);

(statearr_30116_30156[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30079 === (8))){
var inst_30022 = (state_30078[(12)]);
var inst_30021 = (state_30078[(13)]);
var inst_30024 = (inst_30022 < inst_30021);
var inst_30025 = inst_30024;
var state_30078__$1 = state_30078;
if(cljs.core.truth_(inst_30025)){
var statearr_30117_30157 = state_30078__$1;
(statearr_30117_30157[(1)] = (10));

} else {
var statearr_30118_30158 = state_30078__$1;
(statearr_30118_30158[(1)] = (11));

}

return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30130,mults,ensure_mult,p))
;
return ((function (switch__20247__auto__,c__20268__auto___30130,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30122 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30122[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30122[(1)] = (1));

return statearr_30122;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30078){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30078);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30123){if((e30123 instanceof Object)){
var ex__20251__auto__ = e30123;
var statearr_30124_30159 = state_30078;
(statearr_30124_30159[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30078);

return cljs.core.cst$kw$recur;
} else {
throw e30123;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30160 = state_30078;
state_30078 = G__30160;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30078){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30130,mults,ensure_mult,p))
})();
var state__20270__auto__ = (function (){var statearr_30125 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30125[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30130);

return statearr_30125;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30130,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args30161 = [];
var len__19301__auto___30164 = arguments.length;
var i__19302__auto___30165 = (0);
while(true){
if((i__19302__auto___30165 < len__19301__auto___30164)){
args30161.push((arguments[i__19302__auto___30165]));

var G__30166 = (i__19302__auto___30165 + (1));
i__19302__auto___30165 = G__30166;
continue;
} else {
}
break;
}

var G__30163 = args30161.length;
switch (G__30163) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30161.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args30168 = [];
var len__19301__auto___30171 = arguments.length;
var i__19302__auto___30172 = (0);
while(true){
if((i__19302__auto___30172 < len__19301__auto___30171)){
args30168.push((arguments[i__19302__auto___30172]));

var G__30173 = (i__19302__auto___30172 + (1));
i__19302__auto___30172 = G__30173;
continue;
} else {
}
break;
}

var G__30170 = args30168.length;
switch (G__30170) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30168.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1(p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2(p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args30175 = [];
var len__19301__auto___30246 = arguments.length;
var i__19302__auto___30247 = (0);
while(true){
if((i__19302__auto___30247 < len__19301__auto___30246)){
args30175.push((arguments[i__19302__auto___30247]));

var G__30248 = (i__19302__auto___30247 + (1));
i__19302__auto___30247 = G__30248;
continue;
} else {
}
break;
}

var G__30177 = args30175.length;
switch (G__30177) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30175.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
var c__20268__auto___30250 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_30216){
var state_val_30217 = (state_30216[(1)]);
if((state_val_30217 === (7))){
var state_30216__$1 = state_30216;
var statearr_30218_30251 = state_30216__$1;
(statearr_30218_30251[(2)] = null);

(statearr_30218_30251[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (1))){
var state_30216__$1 = state_30216;
var statearr_30219_30252 = state_30216__$1;
(statearr_30219_30252[(2)] = null);

(statearr_30219_30252[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (4))){
var inst_30180 = (state_30216[(7)]);
var inst_30182 = (inst_30180 < cnt);
var state_30216__$1 = state_30216;
if(cljs.core.truth_(inst_30182)){
var statearr_30220_30253 = state_30216__$1;
(statearr_30220_30253[(1)] = (6));

} else {
var statearr_30221_30254 = state_30216__$1;
(statearr_30221_30254[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (15))){
var inst_30212 = (state_30216[(2)]);
var state_30216__$1 = state_30216;
var statearr_30222_30255 = state_30216__$1;
(statearr_30222_30255[(2)] = inst_30212);

(statearr_30222_30255[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (13))){
var inst_30205 = cljs.core.async.close_BANG_(out);
var state_30216__$1 = state_30216;
var statearr_30223_30256 = state_30216__$1;
(statearr_30223_30256[(2)] = inst_30205);

(statearr_30223_30256[(1)] = (15));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (6))){
var state_30216__$1 = state_30216;
var statearr_30224_30257 = state_30216__$1;
(statearr_30224_30257[(2)] = null);

(statearr_30224_30257[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (3))){
var inst_30214 = (state_30216[(2)]);
var state_30216__$1 = state_30216;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30216__$1,inst_30214);
} else {
if((state_val_30217 === (12))){
var inst_30202 = (state_30216[(8)]);
var inst_30202__$1 = (state_30216[(2)]);
var inst_30203 = cljs.core.some(cljs.core.nil_QMARK_,inst_30202__$1);
var state_30216__$1 = (function (){var statearr_30225 = state_30216;
(statearr_30225[(8)] = inst_30202__$1);

return statearr_30225;
})();
if(cljs.core.truth_(inst_30203)){
var statearr_30226_30258 = state_30216__$1;
(statearr_30226_30258[(1)] = (13));

} else {
var statearr_30227_30259 = state_30216__$1;
(statearr_30227_30259[(1)] = (14));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (2))){
var inst_30179 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cnt) : cljs.core.reset_BANG_.call(null,dctr,cnt));
var inst_30180 = (0);
var state_30216__$1 = (function (){var statearr_30228 = state_30216;
(statearr_30228[(7)] = inst_30180);

(statearr_30228[(9)] = inst_30179);

return statearr_30228;
})();
var statearr_30229_30260 = state_30216__$1;
(statearr_30229_30260[(2)] = null);

(statearr_30229_30260[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (11))){
var inst_30180 = (state_30216[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_30216,(10),Object,null,(9));
var inst_30189 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_30180) : chs__$1.call(null,inst_30180));
var inst_30190 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_30180) : done.call(null,inst_30180));
var inst_30191 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_30189,inst_30190);
var state_30216__$1 = state_30216;
var statearr_30230_30261 = state_30216__$1;
(statearr_30230_30261[(2)] = inst_30191);


cljs.core.async.impl.ioc_helpers.process_exception(state_30216__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (9))){
var inst_30180 = (state_30216[(7)]);
var inst_30193 = (state_30216[(2)]);
var inst_30194 = (inst_30180 + (1));
var inst_30180__$1 = inst_30194;
var state_30216__$1 = (function (){var statearr_30231 = state_30216;
(statearr_30231[(10)] = inst_30193);

(statearr_30231[(7)] = inst_30180__$1);

return statearr_30231;
})();
var statearr_30232_30262 = state_30216__$1;
(statearr_30232_30262[(2)] = null);

(statearr_30232_30262[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (5))){
var inst_30200 = (state_30216[(2)]);
var state_30216__$1 = (function (){var statearr_30233 = state_30216;
(statearr_30233[(11)] = inst_30200);

return statearr_30233;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30216__$1,(12),dchan);
} else {
if((state_val_30217 === (14))){
var inst_30202 = (state_30216[(8)]);
var inst_30207 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_30202);
var state_30216__$1 = state_30216;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30216__$1,(16),out,inst_30207);
} else {
if((state_val_30217 === (16))){
var inst_30209 = (state_30216[(2)]);
var state_30216__$1 = (function (){var statearr_30234 = state_30216;
(statearr_30234[(12)] = inst_30209);

return statearr_30234;
})();
var statearr_30235_30263 = state_30216__$1;
(statearr_30235_30263[(2)] = null);

(statearr_30235_30263[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (10))){
var inst_30184 = (state_30216[(2)]);
var inst_30185 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_30216__$1 = (function (){var statearr_30236 = state_30216;
(statearr_30236[(13)] = inst_30184);

return statearr_30236;
})();
var statearr_30237_30264 = state_30216__$1;
(statearr_30237_30264[(2)] = inst_30185);


cljs.core.async.impl.ioc_helpers.process_exception(state_30216__$1);

return cljs.core.cst$kw$recur;
} else {
if((state_val_30217 === (8))){
var inst_30198 = (state_30216[(2)]);
var state_30216__$1 = state_30216;
var statearr_30238_30265 = state_30216__$1;
(statearr_30238_30265[(2)] = inst_30198);

(statearr_30238_30265[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__20247__auto__,c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30242 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30242[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30242[(1)] = (1));

return statearr_30242;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30216){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30216);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30243){if((e30243 instanceof Object)){
var ex__20251__auto__ = e30243;
var statearr_30244_30266 = state_30216;
(statearr_30244_30266[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30216);

return cljs.core.cst$kw$recur;
} else {
throw e30243;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30267 = state_30216;
state_30216 = G__30267;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30216){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30216);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__20270__auto__ = (function (){var statearr_30245 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30245[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30250);

return statearr_30245;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30250,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args30269 = [];
var len__19301__auto___30325 = arguments.length;
var i__19302__auto___30326 = (0);
while(true){
if((i__19302__auto___30326 < len__19301__auto___30325)){
args30269.push((arguments[i__19302__auto___30326]));

var G__30327 = (i__19302__auto___30326 + (1));
i__19302__auto___30326 = G__30327;
continue;
} else {
}
break;
}

var G__30271 = args30269.length;
switch (G__30271) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30269.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30329 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30329,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30329,out){
return (function (state_30301){
var state_val_30302 = (state_30301[(1)]);
if((state_val_30302 === (7))){
var inst_30281 = (state_30301[(7)]);
var inst_30280 = (state_30301[(8)]);
var inst_30280__$1 = (state_30301[(2)]);
var inst_30281__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_30280__$1,(0),null);
var inst_30282 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_30280__$1,(1),null);
var inst_30283 = (inst_30281__$1 == null);
var state_30301__$1 = (function (){var statearr_30303 = state_30301;
(statearr_30303[(7)] = inst_30281__$1);

(statearr_30303[(9)] = inst_30282);

(statearr_30303[(8)] = inst_30280__$1);

return statearr_30303;
})();
if(cljs.core.truth_(inst_30283)){
var statearr_30304_30330 = state_30301__$1;
(statearr_30304_30330[(1)] = (8));

} else {
var statearr_30305_30331 = state_30301__$1;
(statearr_30305_30331[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (1))){
var inst_30272 = cljs.core.vec(chs);
var inst_30273 = inst_30272;
var state_30301__$1 = (function (){var statearr_30306 = state_30301;
(statearr_30306[(10)] = inst_30273);

return statearr_30306;
})();
var statearr_30307_30332 = state_30301__$1;
(statearr_30307_30332[(2)] = null);

(statearr_30307_30332[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (4))){
var inst_30273 = (state_30301[(10)]);
var state_30301__$1 = state_30301;
return cljs.core.async.ioc_alts_BANG_(state_30301__$1,(7),inst_30273);
} else {
if((state_val_30302 === (6))){
var inst_30297 = (state_30301[(2)]);
var state_30301__$1 = state_30301;
var statearr_30308_30333 = state_30301__$1;
(statearr_30308_30333[(2)] = inst_30297);

(statearr_30308_30333[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (3))){
var inst_30299 = (state_30301[(2)]);
var state_30301__$1 = state_30301;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30301__$1,inst_30299);
} else {
if((state_val_30302 === (2))){
var inst_30273 = (state_30301[(10)]);
var inst_30275 = cljs.core.count(inst_30273);
var inst_30276 = (inst_30275 > (0));
var state_30301__$1 = state_30301;
if(cljs.core.truth_(inst_30276)){
var statearr_30310_30334 = state_30301__$1;
(statearr_30310_30334[(1)] = (4));

} else {
var statearr_30311_30335 = state_30301__$1;
(statearr_30311_30335[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (11))){
var inst_30273 = (state_30301[(10)]);
var inst_30290 = (state_30301[(2)]);
var tmp30309 = inst_30273;
var inst_30273__$1 = tmp30309;
var state_30301__$1 = (function (){var statearr_30312 = state_30301;
(statearr_30312[(10)] = inst_30273__$1);

(statearr_30312[(11)] = inst_30290);

return statearr_30312;
})();
var statearr_30313_30336 = state_30301__$1;
(statearr_30313_30336[(2)] = null);

(statearr_30313_30336[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (9))){
var inst_30281 = (state_30301[(7)]);
var state_30301__$1 = state_30301;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30301__$1,(11),out,inst_30281);
} else {
if((state_val_30302 === (5))){
var inst_30295 = cljs.core.async.close_BANG_(out);
var state_30301__$1 = state_30301;
var statearr_30314_30337 = state_30301__$1;
(statearr_30314_30337[(2)] = inst_30295);

(statearr_30314_30337[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (10))){
var inst_30293 = (state_30301[(2)]);
var state_30301__$1 = state_30301;
var statearr_30315_30338 = state_30301__$1;
(statearr_30315_30338[(2)] = inst_30293);

(statearr_30315_30338[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30302 === (8))){
var inst_30281 = (state_30301[(7)]);
var inst_30273 = (state_30301[(10)]);
var inst_30282 = (state_30301[(9)]);
var inst_30280 = (state_30301[(8)]);
var inst_30285 = (function (){var cs = inst_30273;
var vec__30278 = inst_30280;
var v = inst_30281;
var c = inst_30282;
return ((function (cs,vec__30278,v,c,inst_30281,inst_30273,inst_30282,inst_30280,state_val_30302,c__20268__auto___30329,out){
return (function (p1__30268_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__30268_SHARP_);
});
;})(cs,vec__30278,v,c,inst_30281,inst_30273,inst_30282,inst_30280,state_val_30302,c__20268__auto___30329,out))
})();
var inst_30286 = cljs.core.filterv(inst_30285,inst_30273);
var inst_30273__$1 = inst_30286;
var state_30301__$1 = (function (){var statearr_30316 = state_30301;
(statearr_30316[(10)] = inst_30273__$1);

return statearr_30316;
})();
var statearr_30317_30339 = state_30301__$1;
(statearr_30317_30339[(2)] = null);

(statearr_30317_30339[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30329,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30329,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30321 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30321[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30321[(1)] = (1));

return statearr_30321;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30301){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30301);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30322){if((e30322 instanceof Object)){
var ex__20251__auto__ = e30322;
var statearr_30323_30340 = state_30301;
(statearr_30323_30340[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30301);

return cljs.core.cst$kw$recur;
} else {
throw e30322;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30341 = state_30301;
state_30301 = G__30341;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30301){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30301);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30329,out))
})();
var state__20270__auto__ = (function (){var statearr_30324 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30324[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30329);

return statearr_30324;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30329,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args30342 = [];
var len__19301__auto___30391 = arguments.length;
var i__19302__auto___30392 = (0);
while(true){
if((i__19302__auto___30392 < len__19301__auto___30391)){
args30342.push((arguments[i__19302__auto___30392]));

var G__30393 = (i__19302__auto___30392 + (1));
i__19302__auto___30392 = G__30393;
continue;
} else {
}
break;
}

var G__30344 = args30342.length;
switch (G__30344) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30342.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30395 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30395,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30395,out){
return (function (state_30368){
var state_val_30369 = (state_30368[(1)]);
if((state_val_30369 === (7))){
var inst_30350 = (state_30368[(7)]);
var inst_30350__$1 = (state_30368[(2)]);
var inst_30351 = (inst_30350__$1 == null);
var inst_30352 = cljs.core.not(inst_30351);
var state_30368__$1 = (function (){var statearr_30370 = state_30368;
(statearr_30370[(7)] = inst_30350__$1);

return statearr_30370;
})();
if(inst_30352){
var statearr_30371_30396 = state_30368__$1;
(statearr_30371_30396[(1)] = (8));

} else {
var statearr_30372_30397 = state_30368__$1;
(statearr_30372_30397[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (1))){
var inst_30345 = (0);
var state_30368__$1 = (function (){var statearr_30373 = state_30368;
(statearr_30373[(8)] = inst_30345);

return statearr_30373;
})();
var statearr_30374_30398 = state_30368__$1;
(statearr_30374_30398[(2)] = null);

(statearr_30374_30398[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (4))){
var state_30368__$1 = state_30368;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30368__$1,(7),ch);
} else {
if((state_val_30369 === (6))){
var inst_30363 = (state_30368[(2)]);
var state_30368__$1 = state_30368;
var statearr_30375_30399 = state_30368__$1;
(statearr_30375_30399[(2)] = inst_30363);

(statearr_30375_30399[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (3))){
var inst_30365 = (state_30368[(2)]);
var inst_30366 = cljs.core.async.close_BANG_(out);
var state_30368__$1 = (function (){var statearr_30376 = state_30368;
(statearr_30376[(9)] = inst_30365);

return statearr_30376;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_30368__$1,inst_30366);
} else {
if((state_val_30369 === (2))){
var inst_30345 = (state_30368[(8)]);
var inst_30347 = (inst_30345 < n);
var state_30368__$1 = state_30368;
if(cljs.core.truth_(inst_30347)){
var statearr_30377_30400 = state_30368__$1;
(statearr_30377_30400[(1)] = (4));

} else {
var statearr_30378_30401 = state_30368__$1;
(statearr_30378_30401[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (11))){
var inst_30345 = (state_30368[(8)]);
var inst_30355 = (state_30368[(2)]);
var inst_30356 = (inst_30345 + (1));
var inst_30345__$1 = inst_30356;
var state_30368__$1 = (function (){var statearr_30379 = state_30368;
(statearr_30379[(8)] = inst_30345__$1);

(statearr_30379[(10)] = inst_30355);

return statearr_30379;
})();
var statearr_30380_30402 = state_30368__$1;
(statearr_30380_30402[(2)] = null);

(statearr_30380_30402[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (9))){
var state_30368__$1 = state_30368;
var statearr_30381_30403 = state_30368__$1;
(statearr_30381_30403[(2)] = null);

(statearr_30381_30403[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (5))){
var state_30368__$1 = state_30368;
var statearr_30382_30404 = state_30368__$1;
(statearr_30382_30404[(2)] = null);

(statearr_30382_30404[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (10))){
var inst_30360 = (state_30368[(2)]);
var state_30368__$1 = state_30368;
var statearr_30383_30405 = state_30368__$1;
(statearr_30383_30405[(2)] = inst_30360);

(statearr_30383_30405[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30369 === (8))){
var inst_30350 = (state_30368[(7)]);
var state_30368__$1 = state_30368;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30368__$1,(11),out,inst_30350);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30395,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30395,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30387 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_30387[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30387[(1)] = (1));

return statearr_30387;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30368){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30368);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30388){if((e30388 instanceof Object)){
var ex__20251__auto__ = e30388;
var statearr_30389_30406 = state_30368;
(statearr_30389_30406[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30368);

return cljs.core.cst$kw$recur;
} else {
throw e30388;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30407 = state_30368;
state_30368 = G__30407;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30368){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30368);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30395,out))
})();
var state__20270__auto__ = (function (){var statearr_30390 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30390[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30395);

return statearr_30390;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30395,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async30417 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async30417 = (function (map_LT_,f,ch,meta30418){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta30418 = meta30418;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30419,meta30418__$1){
var self__ = this;
var _30419__$1 = this;
return (new cljs.core.async.t_cljs$core$async30417(self__.map_LT_,self__.f,self__.ch,meta30418__$1));
});

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30419){
var self__ = this;
var _30419__$1 = this;
return self__.meta30418;
});

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async30420 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async30420 = (function (map_LT_,f,ch,meta30418,_,fn1,meta30421){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta30418 = meta30418;
this._ = _;
this.fn1 = fn1;
this.meta30421 = meta30421;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_30422,meta30421__$1){
var self__ = this;
var _30422__$1 = this;
return (new cljs.core.async.t_cljs$core$async30420(self__.map_LT_,self__.f,self__.ch,self__.meta30418,self__._,self__.fn1,meta30421__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_30422){
var self__ = this;
var _30422__$1 = this;
return self__.meta30421;
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__30408_SHARP_){
var G__30423 = (((p1__30408_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__30408_SHARP_) : self__.f.call(null,p1__30408_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__30423) : f1.call(null,G__30423));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta30418,cljs.core.with_meta(cljs.core.cst$sym$_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core$async_SLASH_t_cljs$core$async30417], null)),cljs.core.cst$sym$fn1,cljs.core.cst$sym$meta30421], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async30420.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async30420.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async30420";

cljs.core.async.t_cljs$core$async30420.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async30420");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async30420 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async30420(map_LT___$1,f__$1,ch__$1,meta30418__$1,___$2,fn1__$1,meta30421){
return (new cljs.core.async.t_cljs$core$async30420(map_LT___$1,f__$1,ch__$1,meta30418__$1,___$2,fn1__$1,meta30421));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async30420(self__.map_LT_,self__.f,self__.ch,self__.meta30418,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__18231__auto__ = ret;
if(cljs.core.truth_(and__18231__auto__)){
return !(((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null));
} else {
return and__18231__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__30424 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__30424) : self__.f.call(null,G__30424));
})());
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async30417.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async30417.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_LT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta30418], null);
});

cljs.core.async.t_cljs$core$async30417.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async30417.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async30417";

cljs.core.async.t_cljs$core$async30417.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async30417");
});

cljs.core.async.__GT_t_cljs$core$async30417 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async30417(map_LT___$1,f__$1,ch__$1,meta30418){
return (new cljs.core.async.t_cljs$core$async30417(map_LT___$1,f__$1,ch__$1,meta30418));
});

}

return (new cljs.core.async.t_cljs$core$async30417(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async30428 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async30428 = (function (map_GT_,f,ch,meta30429){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta30429 = meta30429;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30430,meta30429__$1){
var self__ = this;
var _30430__$1 = this;
return (new cljs.core.async.t_cljs$core$async30428(self__.map_GT_,self__.f,self__.ch,meta30429__$1));
});

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30430){
var self__ = this;
var _30430__$1 = this;
return self__.meta30429;
});

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async30428.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
});

cljs.core.async.t_cljs$core$async30428.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$map_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$f,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta30429], null);
});

cljs.core.async.t_cljs$core$async30428.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async30428.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async30428";

cljs.core.async.t_cljs$core$async30428.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async30428");
});

cljs.core.async.__GT_t_cljs$core$async30428 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async30428(map_GT___$1,f__$1,ch__$1,meta30429){
return (new cljs.core.async.t_cljs$core$async30428(map_GT___$1,f__$1,ch__$1,meta30429));
});

}

return (new cljs.core.async.t_cljs$core$async30428(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async30434 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async30434 = (function (filter_GT_,p,ch,meta30435){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta30435 = meta30435;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_30436,meta30435__$1){
var self__ = this;
var _30436__$1 = this;
return (new cljs.core.async.t_cljs$core$async30434(self__.filter_GT_,self__.p,self__.ch,meta30435__$1));
});

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_30436){
var self__ = this;
var _30436__$1 = this;
return self__.meta30435;
});

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
});

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async30434.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
});

cljs.core.async.t_cljs$core$async30434.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$filter_GT_,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p,cljs.core.cst$sym$ch], null))),cljs.core.cst$kw$doc,"Deprecated - this function will be removed. Use transducer instead"], null)),cljs.core.cst$sym$p,cljs.core.cst$sym$ch,cljs.core.cst$sym$meta30435], null);
});

cljs.core.async.t_cljs$core$async30434.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async30434.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async30434";

cljs.core.async.t_cljs$core$async30434.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async/t_cljs$core$async30434");
});

cljs.core.async.__GT_t_cljs$core$async30434 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async30434(filter_GT___$1,p__$1,ch__$1,meta30435){
return (new cljs.core.async.t_cljs$core$async30434(filter_GT___$1,p__$1,ch__$1,meta30435));
});

}

return (new cljs.core.async.t_cljs$core$async30434(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args30437 = [];
var len__19301__auto___30481 = arguments.length;
var i__19302__auto___30482 = (0);
while(true){
if((i__19302__auto___30482 < len__19301__auto___30481)){
args30437.push((arguments[i__19302__auto___30482]));

var G__30483 = (i__19302__auto___30482 + (1));
i__19302__auto___30482 = G__30483;
continue;
} else {
}
break;
}

var G__30439 = args30437.length;
switch (G__30439) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30437.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30485 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30485,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30485,out){
return (function (state_30460){
var state_val_30461 = (state_30460[(1)]);
if((state_val_30461 === (7))){
var inst_30456 = (state_30460[(2)]);
var state_30460__$1 = state_30460;
var statearr_30462_30486 = state_30460__$1;
(statearr_30462_30486[(2)] = inst_30456);

(statearr_30462_30486[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (1))){
var state_30460__$1 = state_30460;
var statearr_30463_30487 = state_30460__$1;
(statearr_30463_30487[(2)] = null);

(statearr_30463_30487[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (4))){
var inst_30442 = (state_30460[(7)]);
var inst_30442__$1 = (state_30460[(2)]);
var inst_30443 = (inst_30442__$1 == null);
var state_30460__$1 = (function (){var statearr_30464 = state_30460;
(statearr_30464[(7)] = inst_30442__$1);

return statearr_30464;
})();
if(cljs.core.truth_(inst_30443)){
var statearr_30465_30488 = state_30460__$1;
(statearr_30465_30488[(1)] = (5));

} else {
var statearr_30466_30489 = state_30460__$1;
(statearr_30466_30489[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (6))){
var inst_30442 = (state_30460[(7)]);
var inst_30447 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_30442) : p.call(null,inst_30442));
var state_30460__$1 = state_30460;
if(cljs.core.truth_(inst_30447)){
var statearr_30467_30490 = state_30460__$1;
(statearr_30467_30490[(1)] = (8));

} else {
var statearr_30468_30491 = state_30460__$1;
(statearr_30468_30491[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (3))){
var inst_30458 = (state_30460[(2)]);
var state_30460__$1 = state_30460;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30460__$1,inst_30458);
} else {
if((state_val_30461 === (2))){
var state_30460__$1 = state_30460;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30460__$1,(4),ch);
} else {
if((state_val_30461 === (11))){
var inst_30450 = (state_30460[(2)]);
var state_30460__$1 = state_30460;
var statearr_30469_30492 = state_30460__$1;
(statearr_30469_30492[(2)] = inst_30450);

(statearr_30469_30492[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (9))){
var state_30460__$1 = state_30460;
var statearr_30470_30493 = state_30460__$1;
(statearr_30470_30493[(2)] = null);

(statearr_30470_30493[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (5))){
var inst_30445 = cljs.core.async.close_BANG_(out);
var state_30460__$1 = state_30460;
var statearr_30471_30494 = state_30460__$1;
(statearr_30471_30494[(2)] = inst_30445);

(statearr_30471_30494[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (10))){
var inst_30453 = (state_30460[(2)]);
var state_30460__$1 = (function (){var statearr_30472 = state_30460;
(statearr_30472[(8)] = inst_30453);

return statearr_30472;
})();
var statearr_30473_30495 = state_30460__$1;
(statearr_30473_30495[(2)] = null);

(statearr_30473_30495[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30461 === (8))){
var inst_30442 = (state_30460[(7)]);
var state_30460__$1 = state_30460;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30460__$1,(11),out,inst_30442);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30485,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30485,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30477 = [null,null,null,null,null,null,null,null,null];
(statearr_30477[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30477[(1)] = (1));

return statearr_30477;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30460){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30460);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30478){if((e30478 instanceof Object)){
var ex__20251__auto__ = e30478;
var statearr_30479_30496 = state_30460;
(statearr_30479_30496[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30460);

return cljs.core.cst$kw$recur;
} else {
throw e30478;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30497 = state_30460;
state_30460 = G__30497;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30460){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30460);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30485,out))
})();
var state__20270__auto__ = (function (){var statearr_30480 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30480[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30485);

return statearr_30480;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30485,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args30498 = [];
var len__19301__auto___30501 = arguments.length;
var i__19302__auto___30502 = (0);
while(true){
if((i__19302__auto___30502 < len__19301__auto___30501)){
args30498.push((arguments[i__19302__auto___30502]));

var G__30503 = (i__19302__auto___30502 + (1));
i__19302__auto___30502 = G__30503;
continue;
} else {
}
break;
}

var G__30500 = args30498.length;
switch (G__30500) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30498.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__20268__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto__){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto__){
return (function (state_30670){
var state_val_30671 = (state_30670[(1)]);
if((state_val_30671 === (7))){
var inst_30666 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
var statearr_30672_30713 = state_30670__$1;
(statearr_30672_30713[(2)] = inst_30666);

(statearr_30672_30713[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (20))){
var inst_30636 = (state_30670[(7)]);
var inst_30647 = (state_30670[(2)]);
var inst_30648 = cljs.core.next(inst_30636);
var inst_30622 = inst_30648;
var inst_30623 = null;
var inst_30624 = (0);
var inst_30625 = (0);
var state_30670__$1 = (function (){var statearr_30673 = state_30670;
(statearr_30673[(8)] = inst_30623);

(statearr_30673[(9)] = inst_30647);

(statearr_30673[(10)] = inst_30625);

(statearr_30673[(11)] = inst_30622);

(statearr_30673[(12)] = inst_30624);

return statearr_30673;
})();
var statearr_30674_30714 = state_30670__$1;
(statearr_30674_30714[(2)] = null);

(statearr_30674_30714[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (1))){
var state_30670__$1 = state_30670;
var statearr_30675_30715 = state_30670__$1;
(statearr_30675_30715[(2)] = null);

(statearr_30675_30715[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (4))){
var inst_30611 = (state_30670[(13)]);
var inst_30611__$1 = (state_30670[(2)]);
var inst_30612 = (inst_30611__$1 == null);
var state_30670__$1 = (function (){var statearr_30676 = state_30670;
(statearr_30676[(13)] = inst_30611__$1);

return statearr_30676;
})();
if(cljs.core.truth_(inst_30612)){
var statearr_30677_30716 = state_30670__$1;
(statearr_30677_30716[(1)] = (5));

} else {
var statearr_30678_30717 = state_30670__$1;
(statearr_30678_30717[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (15))){
var state_30670__$1 = state_30670;
var statearr_30682_30718 = state_30670__$1;
(statearr_30682_30718[(2)] = null);

(statearr_30682_30718[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (21))){
var state_30670__$1 = state_30670;
var statearr_30683_30719 = state_30670__$1;
(statearr_30683_30719[(2)] = null);

(statearr_30683_30719[(1)] = (23));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (13))){
var inst_30623 = (state_30670[(8)]);
var inst_30625 = (state_30670[(10)]);
var inst_30622 = (state_30670[(11)]);
var inst_30624 = (state_30670[(12)]);
var inst_30632 = (state_30670[(2)]);
var inst_30633 = (inst_30625 + (1));
var tmp30679 = inst_30623;
var tmp30680 = inst_30622;
var tmp30681 = inst_30624;
var inst_30622__$1 = tmp30680;
var inst_30623__$1 = tmp30679;
var inst_30624__$1 = tmp30681;
var inst_30625__$1 = inst_30633;
var state_30670__$1 = (function (){var statearr_30684 = state_30670;
(statearr_30684[(14)] = inst_30632);

(statearr_30684[(8)] = inst_30623__$1);

(statearr_30684[(10)] = inst_30625__$1);

(statearr_30684[(11)] = inst_30622__$1);

(statearr_30684[(12)] = inst_30624__$1);

return statearr_30684;
})();
var statearr_30685_30720 = state_30670__$1;
(statearr_30685_30720[(2)] = null);

(statearr_30685_30720[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (22))){
var state_30670__$1 = state_30670;
var statearr_30686_30721 = state_30670__$1;
(statearr_30686_30721[(2)] = null);

(statearr_30686_30721[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (6))){
var inst_30611 = (state_30670[(13)]);
var inst_30620 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_30611) : f.call(null,inst_30611));
var inst_30621 = cljs.core.seq(inst_30620);
var inst_30622 = inst_30621;
var inst_30623 = null;
var inst_30624 = (0);
var inst_30625 = (0);
var state_30670__$1 = (function (){var statearr_30687 = state_30670;
(statearr_30687[(8)] = inst_30623);

(statearr_30687[(10)] = inst_30625);

(statearr_30687[(11)] = inst_30622);

(statearr_30687[(12)] = inst_30624);

return statearr_30687;
})();
var statearr_30688_30722 = state_30670__$1;
(statearr_30688_30722[(2)] = null);

(statearr_30688_30722[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (17))){
var inst_30636 = (state_30670[(7)]);
var inst_30640 = cljs.core.chunk_first(inst_30636);
var inst_30641 = cljs.core.chunk_rest(inst_30636);
var inst_30642 = cljs.core.count(inst_30640);
var inst_30622 = inst_30641;
var inst_30623 = inst_30640;
var inst_30624 = inst_30642;
var inst_30625 = (0);
var state_30670__$1 = (function (){var statearr_30689 = state_30670;
(statearr_30689[(8)] = inst_30623);

(statearr_30689[(10)] = inst_30625);

(statearr_30689[(11)] = inst_30622);

(statearr_30689[(12)] = inst_30624);

return statearr_30689;
})();
var statearr_30690_30723 = state_30670__$1;
(statearr_30690_30723[(2)] = null);

(statearr_30690_30723[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (3))){
var inst_30668 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30670__$1,inst_30668);
} else {
if((state_val_30671 === (12))){
var inst_30656 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
var statearr_30691_30724 = state_30670__$1;
(statearr_30691_30724[(2)] = inst_30656);

(statearr_30691_30724[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (2))){
var state_30670__$1 = state_30670;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30670__$1,(4),in$);
} else {
if((state_val_30671 === (23))){
var inst_30664 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
var statearr_30692_30725 = state_30670__$1;
(statearr_30692_30725[(2)] = inst_30664);

(statearr_30692_30725[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (19))){
var inst_30651 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
var statearr_30693_30726 = state_30670__$1;
(statearr_30693_30726[(2)] = inst_30651);

(statearr_30693_30726[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (11))){
var inst_30636 = (state_30670[(7)]);
var inst_30622 = (state_30670[(11)]);
var inst_30636__$1 = cljs.core.seq(inst_30622);
var state_30670__$1 = (function (){var statearr_30694 = state_30670;
(statearr_30694[(7)] = inst_30636__$1);

return statearr_30694;
})();
if(inst_30636__$1){
var statearr_30695_30727 = state_30670__$1;
(statearr_30695_30727[(1)] = (14));

} else {
var statearr_30696_30728 = state_30670__$1;
(statearr_30696_30728[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (9))){
var inst_30658 = (state_30670[(2)]);
var inst_30659 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_30670__$1 = (function (){var statearr_30697 = state_30670;
(statearr_30697[(15)] = inst_30658);

return statearr_30697;
})();
if(cljs.core.truth_(inst_30659)){
var statearr_30698_30729 = state_30670__$1;
(statearr_30698_30729[(1)] = (21));

} else {
var statearr_30699_30730 = state_30670__$1;
(statearr_30699_30730[(1)] = (22));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (5))){
var inst_30614 = cljs.core.async.close_BANG_(out);
var state_30670__$1 = state_30670;
var statearr_30700_30731 = state_30670__$1;
(statearr_30700_30731[(2)] = inst_30614);

(statearr_30700_30731[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (14))){
var inst_30636 = (state_30670[(7)]);
var inst_30638 = cljs.core.chunked_seq_QMARK_(inst_30636);
var state_30670__$1 = state_30670;
if(inst_30638){
var statearr_30701_30732 = state_30670__$1;
(statearr_30701_30732[(1)] = (17));

} else {
var statearr_30702_30733 = state_30670__$1;
(statearr_30702_30733[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (16))){
var inst_30654 = (state_30670[(2)]);
var state_30670__$1 = state_30670;
var statearr_30703_30734 = state_30670__$1;
(statearr_30703_30734[(2)] = inst_30654);

(statearr_30703_30734[(1)] = (12));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30671 === (10))){
var inst_30623 = (state_30670[(8)]);
var inst_30625 = (state_30670[(10)]);
var inst_30630 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_30623,inst_30625);
var state_30670__$1 = state_30670;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30670__$1,(13),out,inst_30630);
} else {
if((state_val_30671 === (18))){
var inst_30636 = (state_30670[(7)]);
var inst_30645 = cljs.core.first(inst_30636);
var state_30670__$1 = state_30670;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30670__$1,(20),out,inst_30645);
} else {
if((state_val_30671 === (8))){
var inst_30625 = (state_30670[(10)]);
var inst_30624 = (state_30670[(12)]);
var inst_30627 = (inst_30625 < inst_30624);
var inst_30628 = inst_30627;
var state_30670__$1 = state_30670;
if(cljs.core.truth_(inst_30628)){
var statearr_30704_30735 = state_30670__$1;
(statearr_30704_30735[(1)] = (10));

} else {
var statearr_30705_30736 = state_30670__$1;
(statearr_30705_30736[(1)] = (11));

}

return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto__))
;
return ((function (switch__20247__auto__,c__20268__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____0 = (function (){
var statearr_30709 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30709[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__);

(statearr_30709[(1)] = (1));

return statearr_30709;
});
var cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____1 = (function (state_30670){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30670);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30710){if((e30710 instanceof Object)){
var ex__20251__auto__ = e30710;
var statearr_30711_30737 = state_30670;
(statearr_30711_30737[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30670);

return cljs.core.cst$kw$recur;
} else {
throw e30710;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30738 = state_30670;
state_30670 = G__30738;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__ = function(state_30670){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____1.call(this,state_30670);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__20248__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto__))
})();
var state__20270__auto__ = (function (){var statearr_30712 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30712[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto__);

return statearr_30712;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto__))
);

return c__20268__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args30739 = [];
var len__19301__auto___30742 = arguments.length;
var i__19302__auto___30743 = (0);
while(true){
if((i__19302__auto___30743 < len__19301__auto___30742)){
args30739.push((arguments[i__19302__auto___30743]));

var G__30744 = (i__19302__auto___30743 + (1));
i__19302__auto___30743 = G__30744;
continue;
} else {
}
break;
}

var G__30741 = args30739.length;
switch (G__30741) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30739.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args30746 = [];
var len__19301__auto___30749 = arguments.length;
var i__19302__auto___30750 = (0);
while(true){
if((i__19302__auto___30750 < len__19301__auto___30749)){
args30746.push((arguments[i__19302__auto___30750]));

var G__30751 = (i__19302__auto___30750 + (1));
i__19302__auto___30750 = G__30751;
continue;
} else {
}
break;
}

var G__30748 = args30746.length;
switch (G__30748) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30746.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args30753 = [];
var len__19301__auto___30804 = arguments.length;
var i__19302__auto___30805 = (0);
while(true){
if((i__19302__auto___30805 < len__19301__auto___30804)){
args30753.push((arguments[i__19302__auto___30805]));

var G__30806 = (i__19302__auto___30805 + (1));
i__19302__auto___30805 = G__30806;
continue;
} else {
}
break;
}

var G__30755 = args30753.length;
switch (G__30755) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30753.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30808 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30808,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30808,out){
return (function (state_30779){
var state_val_30780 = (state_30779[(1)]);
if((state_val_30780 === (7))){
var inst_30774 = (state_30779[(2)]);
var state_30779__$1 = state_30779;
var statearr_30781_30809 = state_30779__$1;
(statearr_30781_30809[(2)] = inst_30774);

(statearr_30781_30809[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (1))){
var inst_30756 = null;
var state_30779__$1 = (function (){var statearr_30782 = state_30779;
(statearr_30782[(7)] = inst_30756);

return statearr_30782;
})();
var statearr_30783_30810 = state_30779__$1;
(statearr_30783_30810[(2)] = null);

(statearr_30783_30810[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (4))){
var inst_30759 = (state_30779[(8)]);
var inst_30759__$1 = (state_30779[(2)]);
var inst_30760 = (inst_30759__$1 == null);
var inst_30761 = cljs.core.not(inst_30760);
var state_30779__$1 = (function (){var statearr_30784 = state_30779;
(statearr_30784[(8)] = inst_30759__$1);

return statearr_30784;
})();
if(inst_30761){
var statearr_30785_30811 = state_30779__$1;
(statearr_30785_30811[(1)] = (5));

} else {
var statearr_30786_30812 = state_30779__$1;
(statearr_30786_30812[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (6))){
var state_30779__$1 = state_30779;
var statearr_30787_30813 = state_30779__$1;
(statearr_30787_30813[(2)] = null);

(statearr_30787_30813[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (3))){
var inst_30776 = (state_30779[(2)]);
var inst_30777 = cljs.core.async.close_BANG_(out);
var state_30779__$1 = (function (){var statearr_30788 = state_30779;
(statearr_30788[(9)] = inst_30776);

return statearr_30788;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_30779__$1,inst_30777);
} else {
if((state_val_30780 === (2))){
var state_30779__$1 = state_30779;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30779__$1,(4),ch);
} else {
if((state_val_30780 === (11))){
var inst_30759 = (state_30779[(8)]);
var inst_30768 = (state_30779[(2)]);
var inst_30756 = inst_30759;
var state_30779__$1 = (function (){var statearr_30789 = state_30779;
(statearr_30789[(7)] = inst_30756);

(statearr_30789[(10)] = inst_30768);

return statearr_30789;
})();
var statearr_30790_30814 = state_30779__$1;
(statearr_30790_30814[(2)] = null);

(statearr_30790_30814[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (9))){
var inst_30759 = (state_30779[(8)]);
var state_30779__$1 = state_30779;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30779__$1,(11),out,inst_30759);
} else {
if((state_val_30780 === (5))){
var inst_30756 = (state_30779[(7)]);
var inst_30759 = (state_30779[(8)]);
var inst_30763 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_30759,inst_30756);
var state_30779__$1 = state_30779;
if(inst_30763){
var statearr_30792_30815 = state_30779__$1;
(statearr_30792_30815[(1)] = (8));

} else {
var statearr_30793_30816 = state_30779__$1;
(statearr_30793_30816[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (10))){
var inst_30771 = (state_30779[(2)]);
var state_30779__$1 = state_30779;
var statearr_30794_30817 = state_30779__$1;
(statearr_30794_30817[(2)] = inst_30771);

(statearr_30794_30817[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30780 === (8))){
var inst_30756 = (state_30779[(7)]);
var tmp30791 = inst_30756;
var inst_30756__$1 = tmp30791;
var state_30779__$1 = (function (){var statearr_30795 = state_30779;
(statearr_30795[(7)] = inst_30756__$1);

return statearr_30795;
})();
var statearr_30796_30818 = state_30779__$1;
(statearr_30796_30818[(2)] = null);

(statearr_30796_30818[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30808,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30808,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30800 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_30800[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30800[(1)] = (1));

return statearr_30800;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30779){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30779);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30801){if((e30801 instanceof Object)){
var ex__20251__auto__ = e30801;
var statearr_30802_30819 = state_30779;
(statearr_30802_30819[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30779);

return cljs.core.cst$kw$recur;
} else {
throw e30801;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30820 = state_30779;
state_30779 = G__30820;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30779){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30779);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30808,out))
})();
var state__20270__auto__ = (function (){var statearr_30803 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30803[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30808);

return statearr_30803;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30808,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args30821 = [];
var len__19301__auto___30891 = arguments.length;
var i__19302__auto___30892 = (0);
while(true){
if((i__19302__auto___30892 < len__19301__auto___30891)){
args30821.push((arguments[i__19302__auto___30892]));

var G__30893 = (i__19302__auto___30892 + (1));
i__19302__auto___30892 = G__30893;
continue;
} else {
}
break;
}

var G__30823 = args30821.length;
switch (G__30823) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30821.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30895 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30895,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30895,out){
return (function (state_30861){
var state_val_30862 = (state_30861[(1)]);
if((state_val_30862 === (7))){
var inst_30857 = (state_30861[(2)]);
var state_30861__$1 = state_30861;
var statearr_30863_30896 = state_30861__$1;
(statearr_30863_30896[(2)] = inst_30857);

(statearr_30863_30896[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (1))){
var inst_30824 = (new Array(n));
var inst_30825 = inst_30824;
var inst_30826 = (0);
var state_30861__$1 = (function (){var statearr_30864 = state_30861;
(statearr_30864[(7)] = inst_30826);

(statearr_30864[(8)] = inst_30825);

return statearr_30864;
})();
var statearr_30865_30897 = state_30861__$1;
(statearr_30865_30897[(2)] = null);

(statearr_30865_30897[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (4))){
var inst_30829 = (state_30861[(9)]);
var inst_30829__$1 = (state_30861[(2)]);
var inst_30830 = (inst_30829__$1 == null);
var inst_30831 = cljs.core.not(inst_30830);
var state_30861__$1 = (function (){var statearr_30866 = state_30861;
(statearr_30866[(9)] = inst_30829__$1);

return statearr_30866;
})();
if(inst_30831){
var statearr_30867_30898 = state_30861__$1;
(statearr_30867_30898[(1)] = (5));

} else {
var statearr_30868_30899 = state_30861__$1;
(statearr_30868_30899[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (15))){
var inst_30851 = (state_30861[(2)]);
var state_30861__$1 = state_30861;
var statearr_30869_30900 = state_30861__$1;
(statearr_30869_30900[(2)] = inst_30851);

(statearr_30869_30900[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (13))){
var state_30861__$1 = state_30861;
var statearr_30870_30901 = state_30861__$1;
(statearr_30870_30901[(2)] = null);

(statearr_30870_30901[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (6))){
var inst_30826 = (state_30861[(7)]);
var inst_30847 = (inst_30826 > (0));
var state_30861__$1 = state_30861;
if(cljs.core.truth_(inst_30847)){
var statearr_30871_30902 = state_30861__$1;
(statearr_30871_30902[(1)] = (12));

} else {
var statearr_30872_30903 = state_30861__$1;
(statearr_30872_30903[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (3))){
var inst_30859 = (state_30861[(2)]);
var state_30861__$1 = state_30861;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30861__$1,inst_30859);
} else {
if((state_val_30862 === (12))){
var inst_30825 = (state_30861[(8)]);
var inst_30849 = cljs.core.vec(inst_30825);
var state_30861__$1 = state_30861;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30861__$1,(15),out,inst_30849);
} else {
if((state_val_30862 === (2))){
var state_30861__$1 = state_30861;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30861__$1,(4),ch);
} else {
if((state_val_30862 === (11))){
var inst_30841 = (state_30861[(2)]);
var inst_30842 = (new Array(n));
var inst_30825 = inst_30842;
var inst_30826 = (0);
var state_30861__$1 = (function (){var statearr_30873 = state_30861;
(statearr_30873[(10)] = inst_30841);

(statearr_30873[(7)] = inst_30826);

(statearr_30873[(8)] = inst_30825);

return statearr_30873;
})();
var statearr_30874_30904 = state_30861__$1;
(statearr_30874_30904[(2)] = null);

(statearr_30874_30904[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (9))){
var inst_30825 = (state_30861[(8)]);
var inst_30839 = cljs.core.vec(inst_30825);
var state_30861__$1 = state_30861;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30861__$1,(11),out,inst_30839);
} else {
if((state_val_30862 === (5))){
var inst_30826 = (state_30861[(7)]);
var inst_30825 = (state_30861[(8)]);
var inst_30834 = (state_30861[(11)]);
var inst_30829 = (state_30861[(9)]);
var inst_30833 = (inst_30825[inst_30826] = inst_30829);
var inst_30834__$1 = (inst_30826 + (1));
var inst_30835 = (inst_30834__$1 < n);
var state_30861__$1 = (function (){var statearr_30875 = state_30861;
(statearr_30875[(11)] = inst_30834__$1);

(statearr_30875[(12)] = inst_30833);

return statearr_30875;
})();
if(cljs.core.truth_(inst_30835)){
var statearr_30876_30905 = state_30861__$1;
(statearr_30876_30905[(1)] = (8));

} else {
var statearr_30877_30906 = state_30861__$1;
(statearr_30877_30906[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (14))){
var inst_30854 = (state_30861[(2)]);
var inst_30855 = cljs.core.async.close_BANG_(out);
var state_30861__$1 = (function (){var statearr_30879 = state_30861;
(statearr_30879[(13)] = inst_30854);

return statearr_30879;
})();
var statearr_30880_30907 = state_30861__$1;
(statearr_30880_30907[(2)] = inst_30855);

(statearr_30880_30907[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (10))){
var inst_30845 = (state_30861[(2)]);
var state_30861__$1 = state_30861;
var statearr_30881_30908 = state_30861__$1;
(statearr_30881_30908[(2)] = inst_30845);

(statearr_30881_30908[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30862 === (8))){
var inst_30825 = (state_30861[(8)]);
var inst_30834 = (state_30861[(11)]);
var tmp30878 = inst_30825;
var inst_30825__$1 = tmp30878;
var inst_30826 = inst_30834;
var state_30861__$1 = (function (){var statearr_30882 = state_30861;
(statearr_30882[(7)] = inst_30826);

(statearr_30882[(8)] = inst_30825__$1);

return statearr_30882;
})();
var statearr_30883_30909 = state_30861__$1;
(statearr_30883_30909[(2)] = null);

(statearr_30883_30909[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30895,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30895,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30887 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30887[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30887[(1)] = (1));

return statearr_30887;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30861){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30861);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30888){if((e30888 instanceof Object)){
var ex__20251__auto__ = e30888;
var statearr_30889_30910 = state_30861;
(statearr_30889_30910[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30861);

return cljs.core.cst$kw$recur;
} else {
throw e30888;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__30911 = state_30861;
state_30861 = G__30911;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30861){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30861);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30895,out))
})();
var state__20270__auto__ = (function (){var statearr_30890 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30890[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30895);

return statearr_30890;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30895,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args30912 = [];
var len__19301__auto___30986 = arguments.length;
var i__19302__auto___30987 = (0);
while(true){
if((i__19302__auto___30987 < len__19301__auto___30986)){
args30912.push((arguments[i__19302__auto___30987]));

var G__30988 = (i__19302__auto___30987 + (1));
i__19302__auto___30987 = G__30988;
continue;
} else {
}
break;
}

var G__30914 = args30912.length;
switch (G__30914) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args30912.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__20268__auto___30990 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto___30990,out){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto___30990,out){
return (function (state_30956){
var state_val_30957 = (state_30956[(1)]);
if((state_val_30957 === (7))){
var inst_30952 = (state_30956[(2)]);
var state_30956__$1 = state_30956;
var statearr_30958_30991 = state_30956__$1;
(statearr_30958_30991[(2)] = inst_30952);

(statearr_30958_30991[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (1))){
var inst_30915 = [];
var inst_30916 = inst_30915;
var inst_30917 = cljs.core.cst$kw$cljs$core$async_SLASH_nothing;
var state_30956__$1 = (function (){var statearr_30959 = state_30956;
(statearr_30959[(7)] = inst_30917);

(statearr_30959[(8)] = inst_30916);

return statearr_30959;
})();
var statearr_30960_30992 = state_30956__$1;
(statearr_30960_30992[(2)] = null);

(statearr_30960_30992[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (4))){
var inst_30920 = (state_30956[(9)]);
var inst_30920__$1 = (state_30956[(2)]);
var inst_30921 = (inst_30920__$1 == null);
var inst_30922 = cljs.core.not(inst_30921);
var state_30956__$1 = (function (){var statearr_30961 = state_30956;
(statearr_30961[(9)] = inst_30920__$1);

return statearr_30961;
})();
if(inst_30922){
var statearr_30962_30993 = state_30956__$1;
(statearr_30962_30993[(1)] = (5));

} else {
var statearr_30963_30994 = state_30956__$1;
(statearr_30963_30994[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (15))){
var inst_30946 = (state_30956[(2)]);
var state_30956__$1 = state_30956;
var statearr_30964_30995 = state_30956__$1;
(statearr_30964_30995[(2)] = inst_30946);

(statearr_30964_30995[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (13))){
var state_30956__$1 = state_30956;
var statearr_30965_30996 = state_30956__$1;
(statearr_30965_30996[(2)] = null);

(statearr_30965_30996[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (6))){
var inst_30916 = (state_30956[(8)]);
var inst_30941 = inst_30916.length;
var inst_30942 = (inst_30941 > (0));
var state_30956__$1 = state_30956;
if(cljs.core.truth_(inst_30942)){
var statearr_30966_30997 = state_30956__$1;
(statearr_30966_30997[(1)] = (12));

} else {
var statearr_30967_30998 = state_30956__$1;
(statearr_30967_30998[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (3))){
var inst_30954 = (state_30956[(2)]);
var state_30956__$1 = state_30956;
return cljs.core.async.impl.ioc_helpers.return_chan(state_30956__$1,inst_30954);
} else {
if((state_val_30957 === (12))){
var inst_30916 = (state_30956[(8)]);
var inst_30944 = cljs.core.vec(inst_30916);
var state_30956__$1 = state_30956;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30956__$1,(15),out,inst_30944);
} else {
if((state_val_30957 === (2))){
var state_30956__$1 = state_30956;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_30956__$1,(4),ch);
} else {
if((state_val_30957 === (11))){
var inst_30920 = (state_30956[(9)]);
var inst_30924 = (state_30956[(10)]);
var inst_30934 = (state_30956[(2)]);
var inst_30935 = [];
var inst_30936 = inst_30935.push(inst_30920);
var inst_30916 = inst_30935;
var inst_30917 = inst_30924;
var state_30956__$1 = (function (){var statearr_30968 = state_30956;
(statearr_30968[(11)] = inst_30936);

(statearr_30968[(12)] = inst_30934);

(statearr_30968[(7)] = inst_30917);

(statearr_30968[(8)] = inst_30916);

return statearr_30968;
})();
var statearr_30969_30999 = state_30956__$1;
(statearr_30969_30999[(2)] = null);

(statearr_30969_30999[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (9))){
var inst_30916 = (state_30956[(8)]);
var inst_30932 = cljs.core.vec(inst_30916);
var state_30956__$1 = state_30956;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_30956__$1,(11),out,inst_30932);
} else {
if((state_val_30957 === (5))){
var inst_30920 = (state_30956[(9)]);
var inst_30924 = (state_30956[(10)]);
var inst_30917 = (state_30956[(7)]);
var inst_30924__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_30920) : f.call(null,inst_30920));
var inst_30925 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_30924__$1,inst_30917);
var inst_30926 = cljs.core.keyword_identical_QMARK_(inst_30917,cljs.core.cst$kw$cljs$core$async_SLASH_nothing);
var inst_30927 = (inst_30925) || (inst_30926);
var state_30956__$1 = (function (){var statearr_30970 = state_30956;
(statearr_30970[(10)] = inst_30924__$1);

return statearr_30970;
})();
if(cljs.core.truth_(inst_30927)){
var statearr_30971_31000 = state_30956__$1;
(statearr_30971_31000[(1)] = (8));

} else {
var statearr_30972_31001 = state_30956__$1;
(statearr_30972_31001[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (14))){
var inst_30949 = (state_30956[(2)]);
var inst_30950 = cljs.core.async.close_BANG_(out);
var state_30956__$1 = (function (){var statearr_30974 = state_30956;
(statearr_30974[(13)] = inst_30949);

return statearr_30974;
})();
var statearr_30975_31002 = state_30956__$1;
(statearr_30975_31002[(2)] = inst_30950);

(statearr_30975_31002[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (10))){
var inst_30939 = (state_30956[(2)]);
var state_30956__$1 = state_30956;
var statearr_30976_31003 = state_30956__$1;
(statearr_30976_31003[(2)] = inst_30939);

(statearr_30976_31003[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_30957 === (8))){
var inst_30920 = (state_30956[(9)]);
var inst_30924 = (state_30956[(10)]);
var inst_30916 = (state_30956[(8)]);
var inst_30929 = inst_30916.push(inst_30920);
var tmp30973 = inst_30916;
var inst_30916__$1 = tmp30973;
var inst_30917 = inst_30924;
var state_30956__$1 = (function (){var statearr_30977 = state_30956;
(statearr_30977[(14)] = inst_30929);

(statearr_30977[(7)] = inst_30917);

(statearr_30977[(8)] = inst_30916__$1);

return statearr_30977;
})();
var statearr_30978_31004 = state_30956__$1;
(statearr_30978_31004[(2)] = null);

(statearr_30978_31004[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__20268__auto___30990,out))
;
return ((function (switch__20247__auto__,c__20268__auto___30990,out){
return (function() {
var cljs$core$async$state_machine__20248__auto__ = null;
var cljs$core$async$state_machine__20248__auto____0 = (function (){
var statearr_30982 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30982[(0)] = cljs$core$async$state_machine__20248__auto__);

(statearr_30982[(1)] = (1));

return statearr_30982;
});
var cljs$core$async$state_machine__20248__auto____1 = (function (state_30956){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_30956);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e30983){if((e30983 instanceof Object)){
var ex__20251__auto__ = e30983;
var statearr_30984_31005 = state_30956;
(statearr_30984_31005[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_30956);

return cljs.core.cst$kw$recur;
} else {
throw e30983;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__31006 = state_30956;
state_30956 = G__31006;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
cljs$core$async$state_machine__20248__auto__ = function(state_30956){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__20248__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__20248__auto____1.call(this,state_30956);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__20248__auto____0;
cljs$core$async$state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__20248__auto____1;
return cljs$core$async$state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto___30990,out))
})();
var state__20270__auto__ = (function (){var statearr_30985 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_30985[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto___30990);

return statearr_30985;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto___30990,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;
