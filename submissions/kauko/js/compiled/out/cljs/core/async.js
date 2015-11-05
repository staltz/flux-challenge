// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t_cljs$core$async24513 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24513 = (function (fn_handler,f,meta24514){
this.fn_handler = fn_handler;
this.f = f;
this.meta24514 = meta24514;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24513.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24515,meta24514__$1){
var self__ = this;
var _24515__$1 = this;
return (new cljs.core.async.t_cljs$core$async24513(self__.fn_handler,self__.f,meta24514__$1));
});

cljs.core.async.t_cljs$core$async24513.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24515){
var self__ = this;
var _24515__$1 = this;
return self__.meta24514;
});

cljs.core.async.t_cljs$core$async24513.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24513.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async24513.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async24513.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta24514","meta24514",-785952767,null)], null);
});

cljs.core.async.t_cljs$core$async24513.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24513.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24513";

cljs.core.async.t_cljs$core$async24513.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async24513");
});

cljs.core.async.__GT_t_cljs$core$async24513 = (function cljs$core$async$fn_handler_$___GT_t_cljs$core$async24513(fn_handler__$1,f__$1,meta24514){
return (new cljs.core.async.t_cljs$core$async24513(fn_handler__$1,f__$1,meta24514));
});

}

return (new cljs.core.async.t_cljs$core$async24513(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
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
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
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
var args24518 = [];
var len__17377__auto___24521 = arguments.length;
var i__17378__auto___24522 = (0);
while(true){
if((i__17378__auto___24522 < len__17377__auto___24521)){
args24518.push((arguments[i__17378__auto___24522]));

var G__24523 = (i__17378__auto___24522 + (1));
i__17378__auto___24522 = G__24523;
continue;
} else {
}
break;
}

var G__24520 = args24518.length;
switch (G__24520) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24518.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
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
var args24525 = [];
var len__17377__auto___24528 = arguments.length;
var i__17378__auto___24529 = (0);
while(true){
if((i__17378__auto___24529 < len__17377__auto___24528)){
args24525.push((arguments[i__17378__auto___24529]));

var G__24530 = (i__17378__auto___24529 + (1));
i__17378__auto___24529 = G__24530;
continue;
} else {
}
break;
}

var G__24527 = args24525.length;
switch (G__24527) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24525.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_24532 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_24532);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_24532,ret){
return (function (){
return fn1.call(null,val_24532);
});})(val_24532,ret))
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
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
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
var args24533 = [];
var len__17377__auto___24536 = arguments.length;
var i__17378__auto___24537 = (0);
while(true){
if((i__17378__auto___24537 < len__17377__auto___24536)){
args24533.push((arguments[i__17378__auto___24537]));

var G__24538 = (i__17378__auto___24537 + (1));
i__17378__auto___24537 = G__24538;
continue;
} else {
}
break;
}

var G__24535 = args24533.length;
switch (G__24535) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24533.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
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
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__17222__auto___24540 = n;
var x_24541 = (0);
while(true){
if((x_24541 < n__17222__auto___24540)){
(a[x_24541] = (0));

var G__24542 = (x_24541 + (1));
x_24541 = G__24542;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__24543 = (i + (1));
i = G__24543;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async24547 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24547 = (function (alt_flag,flag,meta24548){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta24548 = meta24548;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24547.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_24549,meta24548__$1){
var self__ = this;
var _24549__$1 = this;
return (new cljs.core.async.t_cljs$core$async24547(self__.alt_flag,self__.flag,meta24548__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async24547.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_24549){
var self__ = this;
var _24549__$1 = this;
return self__.meta24548;
});})(flag))
;

cljs.core.async.t_cljs$core$async24547.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24547.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async24547.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async24547.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta24548","meta24548",1122683785,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async24547.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24547.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24547";

cljs.core.async.t_cljs$core$async24547.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async24547");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async24547 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async24547(alt_flag__$1,flag__$1,meta24548){
return (new cljs.core.async.t_cljs$core$async24547(alt_flag__$1,flag__$1,meta24548));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async24547(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async24553 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async24553 = (function (alt_handler,flag,cb,meta24554){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta24554 = meta24554;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async24553.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24555,meta24554__$1){
var self__ = this;
var _24555__$1 = this;
return (new cljs.core.async.t_cljs$core$async24553(self__.alt_handler,self__.flag,self__.cb,meta24554__$1));
});

cljs.core.async.t_cljs$core$async24553.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24555){
var self__ = this;
var _24555__$1 = this;
return self__.meta24554;
});

cljs.core.async.t_cljs$core$async24553.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async24553.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async24553.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async24553.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta24554","meta24554",1435864,null)], null);
});

cljs.core.async.t_cljs$core$async24553.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async24553.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async24553";

cljs.core.async.t_cljs$core$async24553.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async24553");
});

cljs.core.async.__GT_t_cljs$core$async24553 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async24553(alt_handler__$1,flag__$1,cb__$1,meta24554){
return (new cljs.core.async.t_cljs$core$async24553(alt_handler__$1,flag__$1,cb__$1,meta24554));
});

}

return (new cljs.core.async.t_cljs$core$async24553(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__24556_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__24556_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__24557_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__24557_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__16319__auto__ = wport;
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return port;
}
})()], null));
} else {
var G__24558 = (i + (1));
i = G__24558;
continue;
}
} else {
return null;
}
break;
}
})();
var or__16319__auto__ = ret;
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__16307__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__16307__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__16307__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
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
var args__17384__auto__ = [];
var len__17377__auto___24564 = arguments.length;
var i__17378__auto___24565 = (0);
while(true){
if((i__17378__auto___24565 < len__17377__auto___24564)){
args__17384__auto__.push((arguments[i__17378__auto___24565]));

var G__24566 = (i__17378__auto___24565 + (1));
i__17378__auto___24565 = G__24566;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__24561){
var map__24562 = p__24561;
var map__24562__$1 = ((((!((map__24562 == null)))?((((map__24562.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24562.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24562):map__24562);
var opts = map__24562__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq24559){
var G__24560 = cljs.core.first.call(null,seq24559);
var seq24559__$1 = cljs.core.next.call(null,seq24559);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__24560,seq24559__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args24567 = [];
var len__17377__auto___24617 = arguments.length;
var i__17378__auto___24618 = (0);
while(true){
if((i__17378__auto___24618 < len__17377__auto___24617)){
args24567.push((arguments[i__17378__auto___24618]));

var G__24619 = (i__17378__auto___24618 + (1));
i__17378__auto___24618 = G__24619;
continue;
} else {
}
break;
}

var G__24569 = args24567.length;
switch (G__24569) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24567.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__19399__auto___24621 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___24621){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___24621){
return (function (state_24593){
var state_val_24594 = (state_24593[(1)]);
if((state_val_24594 === (7))){
var inst_24589 = (state_24593[(2)]);
var state_24593__$1 = state_24593;
var statearr_24595_24622 = state_24593__$1;
(statearr_24595_24622[(2)] = inst_24589);

(statearr_24595_24622[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (1))){
var state_24593__$1 = state_24593;
var statearr_24596_24623 = state_24593__$1;
(statearr_24596_24623[(2)] = null);

(statearr_24596_24623[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (4))){
var inst_24572 = (state_24593[(7)]);
var inst_24572__$1 = (state_24593[(2)]);
var inst_24573 = (inst_24572__$1 == null);
var state_24593__$1 = (function (){var statearr_24597 = state_24593;
(statearr_24597[(7)] = inst_24572__$1);

return statearr_24597;
})();
if(cljs.core.truth_(inst_24573)){
var statearr_24598_24624 = state_24593__$1;
(statearr_24598_24624[(1)] = (5));

} else {
var statearr_24599_24625 = state_24593__$1;
(statearr_24599_24625[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (13))){
var state_24593__$1 = state_24593;
var statearr_24600_24626 = state_24593__$1;
(statearr_24600_24626[(2)] = null);

(statearr_24600_24626[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (6))){
var inst_24572 = (state_24593[(7)]);
var state_24593__$1 = state_24593;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24593__$1,(11),to,inst_24572);
} else {
if((state_val_24594 === (3))){
var inst_24591 = (state_24593[(2)]);
var state_24593__$1 = state_24593;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24593__$1,inst_24591);
} else {
if((state_val_24594 === (12))){
var state_24593__$1 = state_24593;
var statearr_24601_24627 = state_24593__$1;
(statearr_24601_24627[(2)] = null);

(statearr_24601_24627[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (2))){
var state_24593__$1 = state_24593;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24593__$1,(4),from);
} else {
if((state_val_24594 === (11))){
var inst_24582 = (state_24593[(2)]);
var state_24593__$1 = state_24593;
if(cljs.core.truth_(inst_24582)){
var statearr_24602_24628 = state_24593__$1;
(statearr_24602_24628[(1)] = (12));

} else {
var statearr_24603_24629 = state_24593__$1;
(statearr_24603_24629[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (9))){
var state_24593__$1 = state_24593;
var statearr_24604_24630 = state_24593__$1;
(statearr_24604_24630[(2)] = null);

(statearr_24604_24630[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (5))){
var state_24593__$1 = state_24593;
if(cljs.core.truth_(close_QMARK_)){
var statearr_24605_24631 = state_24593__$1;
(statearr_24605_24631[(1)] = (8));

} else {
var statearr_24606_24632 = state_24593__$1;
(statearr_24606_24632[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (14))){
var inst_24587 = (state_24593[(2)]);
var state_24593__$1 = state_24593;
var statearr_24607_24633 = state_24593__$1;
(statearr_24607_24633[(2)] = inst_24587);

(statearr_24607_24633[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (10))){
var inst_24579 = (state_24593[(2)]);
var state_24593__$1 = state_24593;
var statearr_24608_24634 = state_24593__$1;
(statearr_24608_24634[(2)] = inst_24579);

(statearr_24608_24634[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24594 === (8))){
var inst_24576 = cljs.core.async.close_BANG_.call(null,to);
var state_24593__$1 = state_24593;
var statearr_24609_24635 = state_24593__$1;
(statearr_24609_24635[(2)] = inst_24576);

(statearr_24609_24635[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___24621))
;
return ((function (switch__19334__auto__,c__19399__auto___24621){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_24613 = [null,null,null,null,null,null,null,null];
(statearr_24613[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_24613[(1)] = (1));

return statearr_24613;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_24593){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24593);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24614){if((e24614 instanceof Object)){
var ex__19338__auto__ = e24614;
var statearr_24615_24636 = state_24593;
(statearr_24615_24636[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24593);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24614;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24637 = state_24593;
state_24593 = G__24637;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_24593){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_24593);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___24621))
})();
var state__19401__auto__ = (function (){var statearr_24616 = f__19400__auto__.call(null);
(statearr_24616[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___24621);

return statearr_24616;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___24621))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__24821){
var vec__24822 = p__24821;
var v = cljs.core.nth.call(null,vec__24822,(0),null);
var p = cljs.core.nth.call(null,vec__24822,(1),null);
var job = vec__24822;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__19399__auto___25004 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results){
return (function (state_24827){
var state_val_24828 = (state_24827[(1)]);
if((state_val_24828 === (1))){
var state_24827__$1 = state_24827;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24827__$1,(2),res,v);
} else {
if((state_val_24828 === (2))){
var inst_24824 = (state_24827[(2)]);
var inst_24825 = cljs.core.async.close_BANG_.call(null,res);
var state_24827__$1 = (function (){var statearr_24829 = state_24827;
(statearr_24829[(7)] = inst_24824);

return statearr_24829;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24827__$1,inst_24825);
} else {
return null;
}
}
});})(c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results))
;
return ((function (switch__19334__auto__,c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_24833 = [null,null,null,null,null,null,null,null];
(statearr_24833[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__);

(statearr_24833[(1)] = (1));

return statearr_24833;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1 = (function (state_24827){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24827);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24834){if((e24834 instanceof Object)){
var ex__19338__auto__ = e24834;
var statearr_24835_25005 = state_24827;
(statearr_24835_25005[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24827);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24834;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25006 = state_24827;
state_24827 = G__25006;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = function(state_24827){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1.call(this,state_24827);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results))
})();
var state__19401__auto__ = (function (){var statearr_24836 = f__19400__auto__.call(null);
(statearr_24836[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25004);

return statearr_24836;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___25004,res,vec__24822,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__24837){
var vec__24838 = p__24837;
var v = cljs.core.nth.call(null,vec__24838,(0),null);
var p = cljs.core.nth.call(null,vec__24838,(1),null);
var job = vec__24838;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__17222__auto___25007 = n;
var __25008 = (0);
while(true){
if((__25008 < n__17222__auto___25007)){
var G__24839_25009 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__24839_25009) {
case "compute":
var c__19399__auto___25011 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__25008,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (__25008,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function (state_24852){
var state_val_24853 = (state_24852[(1)]);
if((state_val_24853 === (1))){
var state_24852__$1 = state_24852;
var statearr_24854_25012 = state_24852__$1;
(statearr_24854_25012[(2)] = null);

(statearr_24854_25012[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24853 === (2))){
var state_24852__$1 = state_24852;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24852__$1,(4),jobs);
} else {
if((state_val_24853 === (3))){
var inst_24850 = (state_24852[(2)]);
var state_24852__$1 = state_24852;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24852__$1,inst_24850);
} else {
if((state_val_24853 === (4))){
var inst_24842 = (state_24852[(2)]);
var inst_24843 = process.call(null,inst_24842);
var state_24852__$1 = state_24852;
if(cljs.core.truth_(inst_24843)){
var statearr_24855_25013 = state_24852__$1;
(statearr_24855_25013[(1)] = (5));

} else {
var statearr_24856_25014 = state_24852__$1;
(statearr_24856_25014[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24853 === (5))){
var state_24852__$1 = state_24852;
var statearr_24857_25015 = state_24852__$1;
(statearr_24857_25015[(2)] = null);

(statearr_24857_25015[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24853 === (6))){
var state_24852__$1 = state_24852;
var statearr_24858_25016 = state_24852__$1;
(statearr_24858_25016[(2)] = null);

(statearr_24858_25016[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24853 === (7))){
var inst_24848 = (state_24852[(2)]);
var state_24852__$1 = state_24852;
var statearr_24859_25017 = state_24852__$1;
(statearr_24859_25017[(2)] = inst_24848);

(statearr_24859_25017[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__25008,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
;
return ((function (__25008,switch__19334__auto__,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_24863 = [null,null,null,null,null,null,null];
(statearr_24863[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__);

(statearr_24863[(1)] = (1));

return statearr_24863;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1 = (function (state_24852){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24852);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24864){if((e24864 instanceof Object)){
var ex__19338__auto__ = e24864;
var statearr_24865_25018 = state_24852;
(statearr_24865_25018[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24852);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24864;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25019 = state_24852;
state_24852 = G__25019;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = function(state_24852){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1.call(this,state_24852);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__;
})()
;})(__25008,switch__19334__auto__,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
})();
var state__19401__auto__ = (function (){var statearr_24866 = f__19400__auto__.call(null);
(statearr_24866[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25011);

return statearr_24866;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(__25008,c__19399__auto___25011,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
);


break;
case "async":
var c__19399__auto___25020 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__25008,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (__25008,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function (state_24879){
var state_val_24880 = (state_24879[(1)]);
if((state_val_24880 === (1))){
var state_24879__$1 = state_24879;
var statearr_24881_25021 = state_24879__$1;
(statearr_24881_25021[(2)] = null);

(statearr_24881_25021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24880 === (2))){
var state_24879__$1 = state_24879;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24879__$1,(4),jobs);
} else {
if((state_val_24880 === (3))){
var inst_24877 = (state_24879[(2)]);
var state_24879__$1 = state_24879;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24879__$1,inst_24877);
} else {
if((state_val_24880 === (4))){
var inst_24869 = (state_24879[(2)]);
var inst_24870 = async.call(null,inst_24869);
var state_24879__$1 = state_24879;
if(cljs.core.truth_(inst_24870)){
var statearr_24882_25022 = state_24879__$1;
(statearr_24882_25022[(1)] = (5));

} else {
var statearr_24883_25023 = state_24879__$1;
(statearr_24883_25023[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24880 === (5))){
var state_24879__$1 = state_24879;
var statearr_24884_25024 = state_24879__$1;
(statearr_24884_25024[(2)] = null);

(statearr_24884_25024[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24880 === (6))){
var state_24879__$1 = state_24879;
var statearr_24885_25025 = state_24879__$1;
(statearr_24885_25025[(2)] = null);

(statearr_24885_25025[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24880 === (7))){
var inst_24875 = (state_24879[(2)]);
var state_24879__$1 = state_24879;
var statearr_24886_25026 = state_24879__$1;
(statearr_24886_25026[(2)] = inst_24875);

(statearr_24886_25026[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__25008,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
;
return ((function (__25008,switch__19334__auto__,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_24890 = [null,null,null,null,null,null,null];
(statearr_24890[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__);

(statearr_24890[(1)] = (1));

return statearr_24890;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1 = (function (state_24879){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24879);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24891){if((e24891 instanceof Object)){
var ex__19338__auto__ = e24891;
var statearr_24892_25027 = state_24879;
(statearr_24892_25027[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24879);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24891;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25028 = state_24879;
state_24879 = G__25028;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = function(state_24879){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1.call(this,state_24879);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__;
})()
;})(__25008,switch__19334__auto__,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
})();
var state__19401__auto__ = (function (){var statearr_24893 = f__19400__auto__.call(null);
(statearr_24893[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25020);

return statearr_24893;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(__25008,c__19399__auto___25020,G__24839_25009,n__17222__auto___25007,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__25029 = (__25008 + (1));
__25008 = G__25029;
continue;
} else {
}
break;
}

var c__19399__auto___25030 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___25030,jobs,results,process,async){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___25030,jobs,results,process,async){
return (function (state_24915){
var state_val_24916 = (state_24915[(1)]);
if((state_val_24916 === (1))){
var state_24915__$1 = state_24915;
var statearr_24917_25031 = state_24915__$1;
(statearr_24917_25031[(2)] = null);

(statearr_24917_25031[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24916 === (2))){
var state_24915__$1 = state_24915;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24915__$1,(4),from);
} else {
if((state_val_24916 === (3))){
var inst_24913 = (state_24915[(2)]);
var state_24915__$1 = state_24915;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24915__$1,inst_24913);
} else {
if((state_val_24916 === (4))){
var inst_24896 = (state_24915[(7)]);
var inst_24896__$1 = (state_24915[(2)]);
var inst_24897 = (inst_24896__$1 == null);
var state_24915__$1 = (function (){var statearr_24918 = state_24915;
(statearr_24918[(7)] = inst_24896__$1);

return statearr_24918;
})();
if(cljs.core.truth_(inst_24897)){
var statearr_24919_25032 = state_24915__$1;
(statearr_24919_25032[(1)] = (5));

} else {
var statearr_24920_25033 = state_24915__$1;
(statearr_24920_25033[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24916 === (5))){
var inst_24899 = cljs.core.async.close_BANG_.call(null,jobs);
var state_24915__$1 = state_24915;
var statearr_24921_25034 = state_24915__$1;
(statearr_24921_25034[(2)] = inst_24899);

(statearr_24921_25034[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24916 === (6))){
var inst_24896 = (state_24915[(7)]);
var inst_24901 = (state_24915[(8)]);
var inst_24901__$1 = cljs.core.async.chan.call(null,(1));
var inst_24902 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_24903 = [inst_24896,inst_24901__$1];
var inst_24904 = (new cljs.core.PersistentVector(null,2,(5),inst_24902,inst_24903,null));
var state_24915__$1 = (function (){var statearr_24922 = state_24915;
(statearr_24922[(8)] = inst_24901__$1);

return statearr_24922;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24915__$1,(8),jobs,inst_24904);
} else {
if((state_val_24916 === (7))){
var inst_24911 = (state_24915[(2)]);
var state_24915__$1 = state_24915;
var statearr_24923_25035 = state_24915__$1;
(statearr_24923_25035[(2)] = inst_24911);

(statearr_24923_25035[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24916 === (8))){
var inst_24901 = (state_24915[(8)]);
var inst_24906 = (state_24915[(2)]);
var state_24915__$1 = (function (){var statearr_24924 = state_24915;
(statearr_24924[(9)] = inst_24906);

return statearr_24924;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24915__$1,(9),results,inst_24901);
} else {
if((state_val_24916 === (9))){
var inst_24908 = (state_24915[(2)]);
var state_24915__$1 = (function (){var statearr_24925 = state_24915;
(statearr_24925[(10)] = inst_24908);

return statearr_24925;
})();
var statearr_24926_25036 = state_24915__$1;
(statearr_24926_25036[(2)] = null);

(statearr_24926_25036[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___25030,jobs,results,process,async))
;
return ((function (switch__19334__auto__,c__19399__auto___25030,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_24930 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_24930[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__);

(statearr_24930[(1)] = (1));

return statearr_24930;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1 = (function (state_24915){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24915);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24931){if((e24931 instanceof Object)){
var ex__19338__auto__ = e24931;
var statearr_24932_25037 = state_24915;
(statearr_24932_25037[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24915);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24931;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25038 = state_24915;
state_24915 = G__25038;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = function(state_24915){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1.call(this,state_24915);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___25030,jobs,results,process,async))
})();
var state__19401__auto__ = (function (){var statearr_24933 = f__19400__auto__.call(null);
(statearr_24933[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25030);

return statearr_24933;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___25030,jobs,results,process,async))
);


var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__,jobs,results,process,async){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__,jobs,results,process,async){
return (function (state_24971){
var state_val_24972 = (state_24971[(1)]);
if((state_val_24972 === (7))){
var inst_24967 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
var statearr_24973_25039 = state_24971__$1;
(statearr_24973_25039[(2)] = inst_24967);

(statearr_24973_25039[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (20))){
var state_24971__$1 = state_24971;
var statearr_24974_25040 = state_24971__$1;
(statearr_24974_25040[(2)] = null);

(statearr_24974_25040[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (1))){
var state_24971__$1 = state_24971;
var statearr_24975_25041 = state_24971__$1;
(statearr_24975_25041[(2)] = null);

(statearr_24975_25041[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (4))){
var inst_24936 = (state_24971[(7)]);
var inst_24936__$1 = (state_24971[(2)]);
var inst_24937 = (inst_24936__$1 == null);
var state_24971__$1 = (function (){var statearr_24976 = state_24971;
(statearr_24976[(7)] = inst_24936__$1);

return statearr_24976;
})();
if(cljs.core.truth_(inst_24937)){
var statearr_24977_25042 = state_24971__$1;
(statearr_24977_25042[(1)] = (5));

} else {
var statearr_24978_25043 = state_24971__$1;
(statearr_24978_25043[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (15))){
var inst_24949 = (state_24971[(8)]);
var state_24971__$1 = state_24971;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24971__$1,(18),to,inst_24949);
} else {
if((state_val_24972 === (21))){
var inst_24962 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
var statearr_24979_25044 = state_24971__$1;
(statearr_24979_25044[(2)] = inst_24962);

(statearr_24979_25044[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (13))){
var inst_24964 = (state_24971[(2)]);
var state_24971__$1 = (function (){var statearr_24980 = state_24971;
(statearr_24980[(9)] = inst_24964);

return statearr_24980;
})();
var statearr_24981_25045 = state_24971__$1;
(statearr_24981_25045[(2)] = null);

(statearr_24981_25045[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (6))){
var inst_24936 = (state_24971[(7)]);
var state_24971__$1 = state_24971;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24971__$1,(11),inst_24936);
} else {
if((state_val_24972 === (17))){
var inst_24957 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
if(cljs.core.truth_(inst_24957)){
var statearr_24982_25046 = state_24971__$1;
(statearr_24982_25046[(1)] = (19));

} else {
var statearr_24983_25047 = state_24971__$1;
(statearr_24983_25047[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (3))){
var inst_24969 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24971__$1,inst_24969);
} else {
if((state_val_24972 === (12))){
var inst_24946 = (state_24971[(10)]);
var state_24971__$1 = state_24971;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24971__$1,(14),inst_24946);
} else {
if((state_val_24972 === (2))){
var state_24971__$1 = state_24971;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24971__$1,(4),results);
} else {
if((state_val_24972 === (19))){
var state_24971__$1 = state_24971;
var statearr_24984_25048 = state_24971__$1;
(statearr_24984_25048[(2)] = null);

(statearr_24984_25048[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (11))){
var inst_24946 = (state_24971[(2)]);
var state_24971__$1 = (function (){var statearr_24985 = state_24971;
(statearr_24985[(10)] = inst_24946);

return statearr_24985;
})();
var statearr_24986_25049 = state_24971__$1;
(statearr_24986_25049[(2)] = null);

(statearr_24986_25049[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (9))){
var state_24971__$1 = state_24971;
var statearr_24987_25050 = state_24971__$1;
(statearr_24987_25050[(2)] = null);

(statearr_24987_25050[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (5))){
var state_24971__$1 = state_24971;
if(cljs.core.truth_(close_QMARK_)){
var statearr_24988_25051 = state_24971__$1;
(statearr_24988_25051[(1)] = (8));

} else {
var statearr_24989_25052 = state_24971__$1;
(statearr_24989_25052[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (14))){
var inst_24949 = (state_24971[(8)]);
var inst_24951 = (state_24971[(11)]);
var inst_24949__$1 = (state_24971[(2)]);
var inst_24950 = (inst_24949__$1 == null);
var inst_24951__$1 = cljs.core.not.call(null,inst_24950);
var state_24971__$1 = (function (){var statearr_24990 = state_24971;
(statearr_24990[(8)] = inst_24949__$1);

(statearr_24990[(11)] = inst_24951__$1);

return statearr_24990;
})();
if(inst_24951__$1){
var statearr_24991_25053 = state_24971__$1;
(statearr_24991_25053[(1)] = (15));

} else {
var statearr_24992_25054 = state_24971__$1;
(statearr_24992_25054[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (16))){
var inst_24951 = (state_24971[(11)]);
var state_24971__$1 = state_24971;
var statearr_24993_25055 = state_24971__$1;
(statearr_24993_25055[(2)] = inst_24951);

(statearr_24993_25055[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (10))){
var inst_24943 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
var statearr_24994_25056 = state_24971__$1;
(statearr_24994_25056[(2)] = inst_24943);

(statearr_24994_25056[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (18))){
var inst_24954 = (state_24971[(2)]);
var state_24971__$1 = state_24971;
var statearr_24995_25057 = state_24971__$1;
(statearr_24995_25057[(2)] = inst_24954);

(statearr_24995_25057[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24972 === (8))){
var inst_24940 = cljs.core.async.close_BANG_.call(null,to);
var state_24971__$1 = state_24971;
var statearr_24996_25058 = state_24971__$1;
(statearr_24996_25058[(2)] = inst_24940);

(statearr_24996_25058[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto__,jobs,results,process,async))
;
return ((function (switch__19334__auto__,c__19399__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_25000 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25000[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__);

(statearr_25000[(1)] = (1));

return statearr_25000;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1 = (function (state_24971){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24971);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e25001){if((e25001 instanceof Object)){
var ex__19338__auto__ = e25001;
var statearr_25002_25059 = state_24971;
(statearr_25002_25059[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24971);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25001;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25060 = state_24971;
state_24971 = G__25060;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__ = function(state_24971){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1.call(this,state_24971);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__,jobs,results,process,async))
})();
var state__19401__auto__ = (function (){var statearr_25003 = f__19400__auto__.call(null);
(statearr_25003[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_25003;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__,jobs,results,process,async))
);

return c__19399__auto__;
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
var args25061 = [];
var len__17377__auto___25064 = arguments.length;
var i__17378__auto___25065 = (0);
while(true){
if((i__17378__auto___25065 < len__17377__auto___25064)){
args25061.push((arguments[i__17378__auto___25065]));

var G__25066 = (i__17378__auto___25065 + (1));
i__17378__auto___25065 = G__25066;
continue;
} else {
}
break;
}

var G__25063 = args25061.length;
switch (G__25063) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25061.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
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
var args25068 = [];
var len__17377__auto___25071 = arguments.length;
var i__17378__auto___25072 = (0);
while(true){
if((i__17378__auto___25072 < len__17377__auto___25071)){
args25068.push((arguments[i__17378__auto___25072]));

var G__25073 = (i__17378__auto___25072 + (1));
i__17378__auto___25072 = G__25073;
continue;
} else {
}
break;
}

var G__25070 = args25068.length;
switch (G__25070) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25068.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
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
var args25075 = [];
var len__17377__auto___25128 = arguments.length;
var i__17378__auto___25129 = (0);
while(true){
if((i__17378__auto___25129 < len__17377__auto___25128)){
args25075.push((arguments[i__17378__auto___25129]));

var G__25130 = (i__17378__auto___25129 + (1));
i__17378__auto___25129 = G__25130;
continue;
} else {
}
break;
}

var G__25077 = args25075.length;
switch (G__25077) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25075.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__19399__auto___25132 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___25132,tc,fc){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___25132,tc,fc){
return (function (state_25103){
var state_val_25104 = (state_25103[(1)]);
if((state_val_25104 === (7))){
var inst_25099 = (state_25103[(2)]);
var state_25103__$1 = state_25103;
var statearr_25105_25133 = state_25103__$1;
(statearr_25105_25133[(2)] = inst_25099);

(statearr_25105_25133[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (1))){
var state_25103__$1 = state_25103;
var statearr_25106_25134 = state_25103__$1;
(statearr_25106_25134[(2)] = null);

(statearr_25106_25134[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (4))){
var inst_25080 = (state_25103[(7)]);
var inst_25080__$1 = (state_25103[(2)]);
var inst_25081 = (inst_25080__$1 == null);
var state_25103__$1 = (function (){var statearr_25107 = state_25103;
(statearr_25107[(7)] = inst_25080__$1);

return statearr_25107;
})();
if(cljs.core.truth_(inst_25081)){
var statearr_25108_25135 = state_25103__$1;
(statearr_25108_25135[(1)] = (5));

} else {
var statearr_25109_25136 = state_25103__$1;
(statearr_25109_25136[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (13))){
var state_25103__$1 = state_25103;
var statearr_25110_25137 = state_25103__$1;
(statearr_25110_25137[(2)] = null);

(statearr_25110_25137[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (6))){
var inst_25080 = (state_25103[(7)]);
var inst_25086 = p.call(null,inst_25080);
var state_25103__$1 = state_25103;
if(cljs.core.truth_(inst_25086)){
var statearr_25111_25138 = state_25103__$1;
(statearr_25111_25138[(1)] = (9));

} else {
var statearr_25112_25139 = state_25103__$1;
(statearr_25112_25139[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (3))){
var inst_25101 = (state_25103[(2)]);
var state_25103__$1 = state_25103;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25103__$1,inst_25101);
} else {
if((state_val_25104 === (12))){
var state_25103__$1 = state_25103;
var statearr_25113_25140 = state_25103__$1;
(statearr_25113_25140[(2)] = null);

(statearr_25113_25140[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (2))){
var state_25103__$1 = state_25103;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25103__$1,(4),ch);
} else {
if((state_val_25104 === (11))){
var inst_25080 = (state_25103[(7)]);
var inst_25090 = (state_25103[(2)]);
var state_25103__$1 = state_25103;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25103__$1,(8),inst_25090,inst_25080);
} else {
if((state_val_25104 === (9))){
var state_25103__$1 = state_25103;
var statearr_25114_25141 = state_25103__$1;
(statearr_25114_25141[(2)] = tc);

(statearr_25114_25141[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (5))){
var inst_25083 = cljs.core.async.close_BANG_.call(null,tc);
var inst_25084 = cljs.core.async.close_BANG_.call(null,fc);
var state_25103__$1 = (function (){var statearr_25115 = state_25103;
(statearr_25115[(8)] = inst_25083);

return statearr_25115;
})();
var statearr_25116_25142 = state_25103__$1;
(statearr_25116_25142[(2)] = inst_25084);

(statearr_25116_25142[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (14))){
var inst_25097 = (state_25103[(2)]);
var state_25103__$1 = state_25103;
var statearr_25117_25143 = state_25103__$1;
(statearr_25117_25143[(2)] = inst_25097);

(statearr_25117_25143[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (10))){
var state_25103__$1 = state_25103;
var statearr_25118_25144 = state_25103__$1;
(statearr_25118_25144[(2)] = fc);

(statearr_25118_25144[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25104 === (8))){
var inst_25092 = (state_25103[(2)]);
var state_25103__$1 = state_25103;
if(cljs.core.truth_(inst_25092)){
var statearr_25119_25145 = state_25103__$1;
(statearr_25119_25145[(1)] = (12));

} else {
var statearr_25120_25146 = state_25103__$1;
(statearr_25120_25146[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___25132,tc,fc))
;
return ((function (switch__19334__auto__,c__19399__auto___25132,tc,fc){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_25124 = [null,null,null,null,null,null,null,null,null];
(statearr_25124[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_25124[(1)] = (1));

return statearr_25124;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_25103){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_25103);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e25125){if((e25125 instanceof Object)){
var ex__19338__auto__ = e25125;
var statearr_25126_25147 = state_25103;
(statearr_25126_25147[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25103);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25125;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25148 = state_25103;
state_25103 = G__25148;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_25103){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_25103);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___25132,tc,fc))
})();
var state__19401__auto__ = (function (){var statearr_25127 = f__19400__auto__.call(null);
(statearr_25127[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25132);

return statearr_25127;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___25132,tc,fc))
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
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__){
return (function (state_25195){
var state_val_25196 = (state_25195[(1)]);
if((state_val_25196 === (1))){
var inst_25181 = init;
var state_25195__$1 = (function (){var statearr_25197 = state_25195;
(statearr_25197[(7)] = inst_25181);

return statearr_25197;
})();
var statearr_25198_25213 = state_25195__$1;
(statearr_25198_25213[(2)] = null);

(statearr_25198_25213[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25196 === (2))){
var state_25195__$1 = state_25195;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25195__$1,(4),ch);
} else {
if((state_val_25196 === (3))){
var inst_25193 = (state_25195[(2)]);
var state_25195__$1 = state_25195;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25195__$1,inst_25193);
} else {
if((state_val_25196 === (4))){
var inst_25184 = (state_25195[(8)]);
var inst_25184__$1 = (state_25195[(2)]);
var inst_25185 = (inst_25184__$1 == null);
var state_25195__$1 = (function (){var statearr_25199 = state_25195;
(statearr_25199[(8)] = inst_25184__$1);

return statearr_25199;
})();
if(cljs.core.truth_(inst_25185)){
var statearr_25200_25214 = state_25195__$1;
(statearr_25200_25214[(1)] = (5));

} else {
var statearr_25201_25215 = state_25195__$1;
(statearr_25201_25215[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25196 === (5))){
var inst_25181 = (state_25195[(7)]);
var state_25195__$1 = state_25195;
var statearr_25202_25216 = state_25195__$1;
(statearr_25202_25216[(2)] = inst_25181);

(statearr_25202_25216[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25196 === (6))){
var inst_25181 = (state_25195[(7)]);
var inst_25184 = (state_25195[(8)]);
var inst_25188 = f.call(null,inst_25181,inst_25184);
var inst_25181__$1 = inst_25188;
var state_25195__$1 = (function (){var statearr_25203 = state_25195;
(statearr_25203[(7)] = inst_25181__$1);

return statearr_25203;
})();
var statearr_25204_25217 = state_25195__$1;
(statearr_25204_25217[(2)] = null);

(statearr_25204_25217[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25196 === (7))){
var inst_25191 = (state_25195[(2)]);
var state_25195__$1 = state_25195;
var statearr_25205_25218 = state_25195__$1;
(statearr_25205_25218[(2)] = inst_25191);

(statearr_25205_25218[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__19399__auto__))
;
return ((function (switch__19334__auto__,c__19399__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__19335__auto__ = null;
var cljs$core$async$reduce_$_state_machine__19335__auto____0 = (function (){
var statearr_25209 = [null,null,null,null,null,null,null,null,null];
(statearr_25209[(0)] = cljs$core$async$reduce_$_state_machine__19335__auto__);

(statearr_25209[(1)] = (1));

return statearr_25209;
});
var cljs$core$async$reduce_$_state_machine__19335__auto____1 = (function (state_25195){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_25195);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e25210){if((e25210 instanceof Object)){
var ex__19338__auto__ = e25210;
var statearr_25211_25219 = state_25195;
(statearr_25211_25219[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25195);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25210;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25220 = state_25195;
state_25195 = G__25220;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__19335__auto__ = function(state_25195){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__19335__auto____1.call(this,state_25195);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__19335__auto____0;
cljs$core$async$reduce_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__19335__auto____1;
return cljs$core$async$reduce_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__))
})();
var state__19401__auto__ = (function (){var statearr_25212 = f__19400__auto__.call(null);
(statearr_25212[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_25212;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__))
);

return c__19399__auto__;
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
var args25221 = [];
var len__17377__auto___25273 = arguments.length;
var i__17378__auto___25274 = (0);
while(true){
if((i__17378__auto___25274 < len__17377__auto___25273)){
args25221.push((arguments[i__17378__auto___25274]));

var G__25275 = (i__17378__auto___25274 + (1));
i__17378__auto___25274 = G__25275;
continue;
} else {
}
break;
}

var G__25223 = args25221.length;
switch (G__25223) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25221.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__){
return (function (state_25248){
var state_val_25249 = (state_25248[(1)]);
if((state_val_25249 === (7))){
var inst_25230 = (state_25248[(2)]);
var state_25248__$1 = state_25248;
var statearr_25250_25277 = state_25248__$1;
(statearr_25250_25277[(2)] = inst_25230);

(statearr_25250_25277[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (1))){
var inst_25224 = cljs.core.seq.call(null,coll);
var inst_25225 = inst_25224;
var state_25248__$1 = (function (){var statearr_25251 = state_25248;
(statearr_25251[(7)] = inst_25225);

return statearr_25251;
})();
var statearr_25252_25278 = state_25248__$1;
(statearr_25252_25278[(2)] = null);

(statearr_25252_25278[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (4))){
var inst_25225 = (state_25248[(7)]);
var inst_25228 = cljs.core.first.call(null,inst_25225);
var state_25248__$1 = state_25248;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25248__$1,(7),ch,inst_25228);
} else {
if((state_val_25249 === (13))){
var inst_25242 = (state_25248[(2)]);
var state_25248__$1 = state_25248;
var statearr_25253_25279 = state_25248__$1;
(statearr_25253_25279[(2)] = inst_25242);

(statearr_25253_25279[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (6))){
var inst_25233 = (state_25248[(2)]);
var state_25248__$1 = state_25248;
if(cljs.core.truth_(inst_25233)){
var statearr_25254_25280 = state_25248__$1;
(statearr_25254_25280[(1)] = (8));

} else {
var statearr_25255_25281 = state_25248__$1;
(statearr_25255_25281[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (3))){
var inst_25246 = (state_25248[(2)]);
var state_25248__$1 = state_25248;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25248__$1,inst_25246);
} else {
if((state_val_25249 === (12))){
var state_25248__$1 = state_25248;
var statearr_25256_25282 = state_25248__$1;
(statearr_25256_25282[(2)] = null);

(statearr_25256_25282[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (2))){
var inst_25225 = (state_25248[(7)]);
var state_25248__$1 = state_25248;
if(cljs.core.truth_(inst_25225)){
var statearr_25257_25283 = state_25248__$1;
(statearr_25257_25283[(1)] = (4));

} else {
var statearr_25258_25284 = state_25248__$1;
(statearr_25258_25284[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (11))){
var inst_25239 = cljs.core.async.close_BANG_.call(null,ch);
var state_25248__$1 = state_25248;
var statearr_25259_25285 = state_25248__$1;
(statearr_25259_25285[(2)] = inst_25239);

(statearr_25259_25285[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (9))){
var state_25248__$1 = state_25248;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25260_25286 = state_25248__$1;
(statearr_25260_25286[(1)] = (11));

} else {
var statearr_25261_25287 = state_25248__$1;
(statearr_25261_25287[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (5))){
var inst_25225 = (state_25248[(7)]);
var state_25248__$1 = state_25248;
var statearr_25262_25288 = state_25248__$1;
(statearr_25262_25288[(2)] = inst_25225);

(statearr_25262_25288[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (10))){
var inst_25244 = (state_25248[(2)]);
var state_25248__$1 = state_25248;
var statearr_25263_25289 = state_25248__$1;
(statearr_25263_25289[(2)] = inst_25244);

(statearr_25263_25289[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25249 === (8))){
var inst_25225 = (state_25248[(7)]);
var inst_25235 = cljs.core.next.call(null,inst_25225);
var inst_25225__$1 = inst_25235;
var state_25248__$1 = (function (){var statearr_25264 = state_25248;
(statearr_25264[(7)] = inst_25225__$1);

return statearr_25264;
})();
var statearr_25265_25290 = state_25248__$1;
(statearr_25265_25290[(2)] = null);

(statearr_25265_25290[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto__))
;
return ((function (switch__19334__auto__,c__19399__auto__){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_25269 = [null,null,null,null,null,null,null,null];
(statearr_25269[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_25269[(1)] = (1));

return statearr_25269;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_25248){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_25248);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e25270){if((e25270 instanceof Object)){
var ex__19338__auto__ = e25270;
var statearr_25271_25291 = state_25248;
(statearr_25271_25291[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25248);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25270;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25292 = state_25248;
state_25248 = G__25292;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_25248){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_25248);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__))
})();
var state__19401__auto__ = (function (){var statearr_25272 = f__19400__auto__.call(null);
(statearr_25272[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_25272;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__))
);

return c__19399__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

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
var x__16974__auto__ = (((_ == null))?null:_);
var m__16975__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,_);
} else {
var m__16975__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
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
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__16975__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,ch);
} else {
var m__16975__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m);
} else {
var m__16975__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
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
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async25514 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25514 = (function (mult,ch,cs,meta25515){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta25515 = meta25515;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_25516,meta25515__$1){
var self__ = this;
var _25516__$1 = this;
return (new cljs.core.async.t_cljs$core$async25514(self__.mult,self__.ch,self__.cs,meta25515__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_25516){
var self__ = this;
var _25516__$1 = this;
return self__.meta25515;
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta25515","meta25515",-1856720000,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async25514.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25514.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25514";

cljs.core.async.t_cljs$core$async25514.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async25514");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async25514 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async25514(mult__$1,ch__$1,cs__$1,meta25515){
return (new cljs.core.async.t_cljs$core$async25514(mult__$1,ch__$1,cs__$1,meta25515));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async25514(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__19399__auto___25735 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___25735,cs,m,dchan,dctr,done){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___25735,cs,m,dchan,dctr,done){
return (function (state_25647){
var state_val_25648 = (state_25647[(1)]);
if((state_val_25648 === (7))){
var inst_25643 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25649_25736 = state_25647__$1;
(statearr_25649_25736[(2)] = inst_25643);

(statearr_25649_25736[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (20))){
var inst_25548 = (state_25647[(7)]);
var inst_25558 = cljs.core.first.call(null,inst_25548);
var inst_25559 = cljs.core.nth.call(null,inst_25558,(0),null);
var inst_25560 = cljs.core.nth.call(null,inst_25558,(1),null);
var state_25647__$1 = (function (){var statearr_25650 = state_25647;
(statearr_25650[(8)] = inst_25559);

return statearr_25650;
})();
if(cljs.core.truth_(inst_25560)){
var statearr_25651_25737 = state_25647__$1;
(statearr_25651_25737[(1)] = (22));

} else {
var statearr_25652_25738 = state_25647__$1;
(statearr_25652_25738[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (27))){
var inst_25595 = (state_25647[(9)]);
var inst_25590 = (state_25647[(10)]);
var inst_25519 = (state_25647[(11)]);
var inst_25588 = (state_25647[(12)]);
var inst_25595__$1 = cljs.core._nth.call(null,inst_25588,inst_25590);
var inst_25596 = cljs.core.async.put_BANG_.call(null,inst_25595__$1,inst_25519,done);
var state_25647__$1 = (function (){var statearr_25653 = state_25647;
(statearr_25653[(9)] = inst_25595__$1);

return statearr_25653;
})();
if(cljs.core.truth_(inst_25596)){
var statearr_25654_25739 = state_25647__$1;
(statearr_25654_25739[(1)] = (30));

} else {
var statearr_25655_25740 = state_25647__$1;
(statearr_25655_25740[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (1))){
var state_25647__$1 = state_25647;
var statearr_25656_25741 = state_25647__$1;
(statearr_25656_25741[(2)] = null);

(statearr_25656_25741[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (24))){
var inst_25548 = (state_25647[(7)]);
var inst_25565 = (state_25647[(2)]);
var inst_25566 = cljs.core.next.call(null,inst_25548);
var inst_25528 = inst_25566;
var inst_25529 = null;
var inst_25530 = (0);
var inst_25531 = (0);
var state_25647__$1 = (function (){var statearr_25657 = state_25647;
(statearr_25657[(13)] = inst_25530);

(statearr_25657[(14)] = inst_25531);

(statearr_25657[(15)] = inst_25565);

(statearr_25657[(16)] = inst_25528);

(statearr_25657[(17)] = inst_25529);

return statearr_25657;
})();
var statearr_25658_25742 = state_25647__$1;
(statearr_25658_25742[(2)] = null);

(statearr_25658_25742[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (39))){
var state_25647__$1 = state_25647;
var statearr_25662_25743 = state_25647__$1;
(statearr_25662_25743[(2)] = null);

(statearr_25662_25743[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (4))){
var inst_25519 = (state_25647[(11)]);
var inst_25519__$1 = (state_25647[(2)]);
var inst_25520 = (inst_25519__$1 == null);
var state_25647__$1 = (function (){var statearr_25663 = state_25647;
(statearr_25663[(11)] = inst_25519__$1);

return statearr_25663;
})();
if(cljs.core.truth_(inst_25520)){
var statearr_25664_25744 = state_25647__$1;
(statearr_25664_25744[(1)] = (5));

} else {
var statearr_25665_25745 = state_25647__$1;
(statearr_25665_25745[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (15))){
var inst_25530 = (state_25647[(13)]);
var inst_25531 = (state_25647[(14)]);
var inst_25528 = (state_25647[(16)]);
var inst_25529 = (state_25647[(17)]);
var inst_25544 = (state_25647[(2)]);
var inst_25545 = (inst_25531 + (1));
var tmp25659 = inst_25530;
var tmp25660 = inst_25528;
var tmp25661 = inst_25529;
var inst_25528__$1 = tmp25660;
var inst_25529__$1 = tmp25661;
var inst_25530__$1 = tmp25659;
var inst_25531__$1 = inst_25545;
var state_25647__$1 = (function (){var statearr_25666 = state_25647;
(statearr_25666[(18)] = inst_25544);

(statearr_25666[(13)] = inst_25530__$1);

(statearr_25666[(14)] = inst_25531__$1);

(statearr_25666[(16)] = inst_25528__$1);

(statearr_25666[(17)] = inst_25529__$1);

return statearr_25666;
})();
var statearr_25667_25746 = state_25647__$1;
(statearr_25667_25746[(2)] = null);

(statearr_25667_25746[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (21))){
var inst_25569 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25671_25747 = state_25647__$1;
(statearr_25671_25747[(2)] = inst_25569);

(statearr_25671_25747[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (31))){
var inst_25595 = (state_25647[(9)]);
var inst_25599 = done.call(null,null);
var inst_25600 = cljs.core.async.untap_STAR_.call(null,m,inst_25595);
var state_25647__$1 = (function (){var statearr_25672 = state_25647;
(statearr_25672[(19)] = inst_25599);

return statearr_25672;
})();
var statearr_25673_25748 = state_25647__$1;
(statearr_25673_25748[(2)] = inst_25600);

(statearr_25673_25748[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (32))){
var inst_25587 = (state_25647[(20)]);
var inst_25590 = (state_25647[(10)]);
var inst_25588 = (state_25647[(12)]);
var inst_25589 = (state_25647[(21)]);
var inst_25602 = (state_25647[(2)]);
var inst_25603 = (inst_25590 + (1));
var tmp25668 = inst_25587;
var tmp25669 = inst_25588;
var tmp25670 = inst_25589;
var inst_25587__$1 = tmp25668;
var inst_25588__$1 = tmp25669;
var inst_25589__$1 = tmp25670;
var inst_25590__$1 = inst_25603;
var state_25647__$1 = (function (){var statearr_25674 = state_25647;
(statearr_25674[(22)] = inst_25602);

(statearr_25674[(20)] = inst_25587__$1);

(statearr_25674[(10)] = inst_25590__$1);

(statearr_25674[(12)] = inst_25588__$1);

(statearr_25674[(21)] = inst_25589__$1);

return statearr_25674;
})();
var statearr_25675_25749 = state_25647__$1;
(statearr_25675_25749[(2)] = null);

(statearr_25675_25749[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (40))){
var inst_25615 = (state_25647[(23)]);
var inst_25619 = done.call(null,null);
var inst_25620 = cljs.core.async.untap_STAR_.call(null,m,inst_25615);
var state_25647__$1 = (function (){var statearr_25676 = state_25647;
(statearr_25676[(24)] = inst_25619);

return statearr_25676;
})();
var statearr_25677_25750 = state_25647__$1;
(statearr_25677_25750[(2)] = inst_25620);

(statearr_25677_25750[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (33))){
var inst_25606 = (state_25647[(25)]);
var inst_25608 = cljs.core.chunked_seq_QMARK_.call(null,inst_25606);
var state_25647__$1 = state_25647;
if(inst_25608){
var statearr_25678_25751 = state_25647__$1;
(statearr_25678_25751[(1)] = (36));

} else {
var statearr_25679_25752 = state_25647__$1;
(statearr_25679_25752[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (13))){
var inst_25538 = (state_25647[(26)]);
var inst_25541 = cljs.core.async.close_BANG_.call(null,inst_25538);
var state_25647__$1 = state_25647;
var statearr_25680_25753 = state_25647__$1;
(statearr_25680_25753[(2)] = inst_25541);

(statearr_25680_25753[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (22))){
var inst_25559 = (state_25647[(8)]);
var inst_25562 = cljs.core.async.close_BANG_.call(null,inst_25559);
var state_25647__$1 = state_25647;
var statearr_25681_25754 = state_25647__$1;
(statearr_25681_25754[(2)] = inst_25562);

(statearr_25681_25754[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (36))){
var inst_25606 = (state_25647[(25)]);
var inst_25610 = cljs.core.chunk_first.call(null,inst_25606);
var inst_25611 = cljs.core.chunk_rest.call(null,inst_25606);
var inst_25612 = cljs.core.count.call(null,inst_25610);
var inst_25587 = inst_25611;
var inst_25588 = inst_25610;
var inst_25589 = inst_25612;
var inst_25590 = (0);
var state_25647__$1 = (function (){var statearr_25682 = state_25647;
(statearr_25682[(20)] = inst_25587);

(statearr_25682[(10)] = inst_25590);

(statearr_25682[(12)] = inst_25588);

(statearr_25682[(21)] = inst_25589);

return statearr_25682;
})();
var statearr_25683_25755 = state_25647__$1;
(statearr_25683_25755[(2)] = null);

(statearr_25683_25755[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (41))){
var inst_25606 = (state_25647[(25)]);
var inst_25622 = (state_25647[(2)]);
var inst_25623 = cljs.core.next.call(null,inst_25606);
var inst_25587 = inst_25623;
var inst_25588 = null;
var inst_25589 = (0);
var inst_25590 = (0);
var state_25647__$1 = (function (){var statearr_25684 = state_25647;
(statearr_25684[(27)] = inst_25622);

(statearr_25684[(20)] = inst_25587);

(statearr_25684[(10)] = inst_25590);

(statearr_25684[(12)] = inst_25588);

(statearr_25684[(21)] = inst_25589);

return statearr_25684;
})();
var statearr_25685_25756 = state_25647__$1;
(statearr_25685_25756[(2)] = null);

(statearr_25685_25756[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (43))){
var state_25647__$1 = state_25647;
var statearr_25686_25757 = state_25647__$1;
(statearr_25686_25757[(2)] = null);

(statearr_25686_25757[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (29))){
var inst_25631 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25687_25758 = state_25647__$1;
(statearr_25687_25758[(2)] = inst_25631);

(statearr_25687_25758[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (44))){
var inst_25640 = (state_25647[(2)]);
var state_25647__$1 = (function (){var statearr_25688 = state_25647;
(statearr_25688[(28)] = inst_25640);

return statearr_25688;
})();
var statearr_25689_25759 = state_25647__$1;
(statearr_25689_25759[(2)] = null);

(statearr_25689_25759[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (6))){
var inst_25579 = (state_25647[(29)]);
var inst_25578 = cljs.core.deref.call(null,cs);
var inst_25579__$1 = cljs.core.keys.call(null,inst_25578);
var inst_25580 = cljs.core.count.call(null,inst_25579__$1);
var inst_25581 = cljs.core.reset_BANG_.call(null,dctr,inst_25580);
var inst_25586 = cljs.core.seq.call(null,inst_25579__$1);
var inst_25587 = inst_25586;
var inst_25588 = null;
var inst_25589 = (0);
var inst_25590 = (0);
var state_25647__$1 = (function (){var statearr_25690 = state_25647;
(statearr_25690[(30)] = inst_25581);

(statearr_25690[(20)] = inst_25587);

(statearr_25690[(10)] = inst_25590);

(statearr_25690[(29)] = inst_25579__$1);

(statearr_25690[(12)] = inst_25588);

(statearr_25690[(21)] = inst_25589);

return statearr_25690;
})();
var statearr_25691_25760 = state_25647__$1;
(statearr_25691_25760[(2)] = null);

(statearr_25691_25760[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (28))){
var inst_25587 = (state_25647[(20)]);
var inst_25606 = (state_25647[(25)]);
var inst_25606__$1 = cljs.core.seq.call(null,inst_25587);
var state_25647__$1 = (function (){var statearr_25692 = state_25647;
(statearr_25692[(25)] = inst_25606__$1);

return statearr_25692;
})();
if(inst_25606__$1){
var statearr_25693_25761 = state_25647__$1;
(statearr_25693_25761[(1)] = (33));

} else {
var statearr_25694_25762 = state_25647__$1;
(statearr_25694_25762[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (25))){
var inst_25590 = (state_25647[(10)]);
var inst_25589 = (state_25647[(21)]);
var inst_25592 = (inst_25590 < inst_25589);
var inst_25593 = inst_25592;
var state_25647__$1 = state_25647;
if(cljs.core.truth_(inst_25593)){
var statearr_25695_25763 = state_25647__$1;
(statearr_25695_25763[(1)] = (27));

} else {
var statearr_25696_25764 = state_25647__$1;
(statearr_25696_25764[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (34))){
var state_25647__$1 = state_25647;
var statearr_25697_25765 = state_25647__$1;
(statearr_25697_25765[(2)] = null);

(statearr_25697_25765[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (17))){
var state_25647__$1 = state_25647;
var statearr_25698_25766 = state_25647__$1;
(statearr_25698_25766[(2)] = null);

(statearr_25698_25766[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (3))){
var inst_25645 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25647__$1,inst_25645);
} else {
if((state_val_25648 === (12))){
var inst_25574 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25699_25767 = state_25647__$1;
(statearr_25699_25767[(2)] = inst_25574);

(statearr_25699_25767[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (2))){
var state_25647__$1 = state_25647;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25647__$1,(4),ch);
} else {
if((state_val_25648 === (23))){
var state_25647__$1 = state_25647;
var statearr_25700_25768 = state_25647__$1;
(statearr_25700_25768[(2)] = null);

(statearr_25700_25768[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (35))){
var inst_25629 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25701_25769 = state_25647__$1;
(statearr_25701_25769[(2)] = inst_25629);

(statearr_25701_25769[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (19))){
var inst_25548 = (state_25647[(7)]);
var inst_25552 = cljs.core.chunk_first.call(null,inst_25548);
var inst_25553 = cljs.core.chunk_rest.call(null,inst_25548);
var inst_25554 = cljs.core.count.call(null,inst_25552);
var inst_25528 = inst_25553;
var inst_25529 = inst_25552;
var inst_25530 = inst_25554;
var inst_25531 = (0);
var state_25647__$1 = (function (){var statearr_25702 = state_25647;
(statearr_25702[(13)] = inst_25530);

(statearr_25702[(14)] = inst_25531);

(statearr_25702[(16)] = inst_25528);

(statearr_25702[(17)] = inst_25529);

return statearr_25702;
})();
var statearr_25703_25770 = state_25647__$1;
(statearr_25703_25770[(2)] = null);

(statearr_25703_25770[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (11))){
var inst_25548 = (state_25647[(7)]);
var inst_25528 = (state_25647[(16)]);
var inst_25548__$1 = cljs.core.seq.call(null,inst_25528);
var state_25647__$1 = (function (){var statearr_25704 = state_25647;
(statearr_25704[(7)] = inst_25548__$1);

return statearr_25704;
})();
if(inst_25548__$1){
var statearr_25705_25771 = state_25647__$1;
(statearr_25705_25771[(1)] = (16));

} else {
var statearr_25706_25772 = state_25647__$1;
(statearr_25706_25772[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (9))){
var inst_25576 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25707_25773 = state_25647__$1;
(statearr_25707_25773[(2)] = inst_25576);

(statearr_25707_25773[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (5))){
var inst_25526 = cljs.core.deref.call(null,cs);
var inst_25527 = cljs.core.seq.call(null,inst_25526);
var inst_25528 = inst_25527;
var inst_25529 = null;
var inst_25530 = (0);
var inst_25531 = (0);
var state_25647__$1 = (function (){var statearr_25708 = state_25647;
(statearr_25708[(13)] = inst_25530);

(statearr_25708[(14)] = inst_25531);

(statearr_25708[(16)] = inst_25528);

(statearr_25708[(17)] = inst_25529);

return statearr_25708;
})();
var statearr_25709_25774 = state_25647__$1;
(statearr_25709_25774[(2)] = null);

(statearr_25709_25774[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (14))){
var state_25647__$1 = state_25647;
var statearr_25710_25775 = state_25647__$1;
(statearr_25710_25775[(2)] = null);

(statearr_25710_25775[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (45))){
var inst_25637 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25711_25776 = state_25647__$1;
(statearr_25711_25776[(2)] = inst_25637);

(statearr_25711_25776[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (26))){
var inst_25579 = (state_25647[(29)]);
var inst_25633 = (state_25647[(2)]);
var inst_25634 = cljs.core.seq.call(null,inst_25579);
var state_25647__$1 = (function (){var statearr_25712 = state_25647;
(statearr_25712[(31)] = inst_25633);

return statearr_25712;
})();
if(inst_25634){
var statearr_25713_25777 = state_25647__$1;
(statearr_25713_25777[(1)] = (42));

} else {
var statearr_25714_25778 = state_25647__$1;
(statearr_25714_25778[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (16))){
var inst_25548 = (state_25647[(7)]);
var inst_25550 = cljs.core.chunked_seq_QMARK_.call(null,inst_25548);
var state_25647__$1 = state_25647;
if(inst_25550){
var statearr_25715_25779 = state_25647__$1;
(statearr_25715_25779[(1)] = (19));

} else {
var statearr_25716_25780 = state_25647__$1;
(statearr_25716_25780[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (38))){
var inst_25626 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25717_25781 = state_25647__$1;
(statearr_25717_25781[(2)] = inst_25626);

(statearr_25717_25781[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (30))){
var state_25647__$1 = state_25647;
var statearr_25718_25782 = state_25647__$1;
(statearr_25718_25782[(2)] = null);

(statearr_25718_25782[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (10))){
var inst_25531 = (state_25647[(14)]);
var inst_25529 = (state_25647[(17)]);
var inst_25537 = cljs.core._nth.call(null,inst_25529,inst_25531);
var inst_25538 = cljs.core.nth.call(null,inst_25537,(0),null);
var inst_25539 = cljs.core.nth.call(null,inst_25537,(1),null);
var state_25647__$1 = (function (){var statearr_25719 = state_25647;
(statearr_25719[(26)] = inst_25538);

return statearr_25719;
})();
if(cljs.core.truth_(inst_25539)){
var statearr_25720_25783 = state_25647__$1;
(statearr_25720_25783[(1)] = (13));

} else {
var statearr_25721_25784 = state_25647__$1;
(statearr_25721_25784[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (18))){
var inst_25572 = (state_25647[(2)]);
var state_25647__$1 = state_25647;
var statearr_25722_25785 = state_25647__$1;
(statearr_25722_25785[(2)] = inst_25572);

(statearr_25722_25785[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (42))){
var state_25647__$1 = state_25647;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25647__$1,(45),dchan);
} else {
if((state_val_25648 === (37))){
var inst_25606 = (state_25647[(25)]);
var inst_25615 = (state_25647[(23)]);
var inst_25519 = (state_25647[(11)]);
var inst_25615__$1 = cljs.core.first.call(null,inst_25606);
var inst_25616 = cljs.core.async.put_BANG_.call(null,inst_25615__$1,inst_25519,done);
var state_25647__$1 = (function (){var statearr_25723 = state_25647;
(statearr_25723[(23)] = inst_25615__$1);

return statearr_25723;
})();
if(cljs.core.truth_(inst_25616)){
var statearr_25724_25786 = state_25647__$1;
(statearr_25724_25786[(1)] = (39));

} else {
var statearr_25725_25787 = state_25647__$1;
(statearr_25725_25787[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25648 === (8))){
var inst_25530 = (state_25647[(13)]);
var inst_25531 = (state_25647[(14)]);
var inst_25533 = (inst_25531 < inst_25530);
var inst_25534 = inst_25533;
var state_25647__$1 = state_25647;
if(cljs.core.truth_(inst_25534)){
var statearr_25726_25788 = state_25647__$1;
(statearr_25726_25788[(1)] = (10));

} else {
var statearr_25727_25789 = state_25647__$1;
(statearr_25727_25789[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___25735,cs,m,dchan,dctr,done))
;
return ((function (switch__19334__auto__,c__19399__auto___25735,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__19335__auto__ = null;
var cljs$core$async$mult_$_state_machine__19335__auto____0 = (function (){
var statearr_25731 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25731[(0)] = cljs$core$async$mult_$_state_machine__19335__auto__);

(statearr_25731[(1)] = (1));

return statearr_25731;
});
var cljs$core$async$mult_$_state_machine__19335__auto____1 = (function (state_25647){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_25647);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e25732){if((e25732 instanceof Object)){
var ex__19338__auto__ = e25732;
var statearr_25733_25790 = state_25647;
(statearr_25733_25790[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25647);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25732;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25791 = state_25647;
state_25647 = G__25791;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__19335__auto__ = function(state_25647){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__19335__auto____1.call(this,state_25647);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__19335__auto____0;
cljs$core$async$mult_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__19335__auto____1;
return cljs$core$async$mult_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___25735,cs,m,dchan,dctr,done))
})();
var state__19401__auto__ = (function (){var statearr_25734 = f__19400__auto__.call(null);
(statearr_25734[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___25735);

return statearr_25734;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___25735,cs,m,dchan,dctr,done))
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
var args25792 = [];
var len__17377__auto___25795 = arguments.length;
var i__17378__auto___25796 = (0);
while(true){
if((i__17378__auto___25796 < len__17377__auto___25795)){
args25792.push((arguments[i__17378__auto___25796]));

var G__25797 = (i__17378__auto___25796 + (1));
i__17378__auto___25796 = G__25797;
continue;
} else {
}
break;
}

var G__25794 = args25792.length;
switch (G__25794) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25792.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,ch);
} else {
var m__16975__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,ch);
} else {
var m__16975__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m);
} else {
var m__16975__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,state_map);
} else {
var m__16975__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__16974__auto__ = (((m == null))?null:m);
var m__16975__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,m,mode);
} else {
var m__16975__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__17384__auto__ = [];
var len__17377__auto___25809 = arguments.length;
var i__17378__auto___25810 = (0);
while(true){
if((i__17378__auto___25810 < len__17377__auto___25809)){
args__17384__auto__.push((arguments[i__17378__auto___25810]));

var G__25811 = (i__17378__auto___25810 + (1));
i__17378__auto___25810 = G__25811;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((3) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17385__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__25803){
var map__25804 = p__25803;
var map__25804__$1 = ((((!((map__25804 == null)))?((((map__25804.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25804.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25804):map__25804);
var opts = map__25804__$1;
var statearr_25806_25812 = state;
(statearr_25806_25812[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__25804,map__25804__$1,opts){
return (function (val){
var statearr_25807_25813 = state;
(statearr_25807_25813[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__25804,map__25804__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_25808_25814 = state;
(statearr_25808_25814[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq25799){
var G__25800 = cljs.core.first.call(null,seq25799);
var seq25799__$1 = cljs.core.next.call(null,seq25799);
var G__25801 = cljs.core.first.call(null,seq25799__$1);
var seq25799__$2 = cljs.core.next.call(null,seq25799__$1);
var G__25802 = cljs.core.first.call(null,seq25799__$2);
var seq25799__$3 = cljs.core.next.call(null,seq25799__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__25800,G__25801,G__25802,seq25799__$3);
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
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async25978 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25978 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta25979){
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
this.meta25979 = meta25979;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_25980,meta25979__$1){
var self__ = this;
var _25980__$1 = this;
return (new cljs.core.async.t_cljs$core$async25978(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta25979__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_25980){
var self__ = this;
var _25980__$1 = this;
return self__.meta25979;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta25979","meta25979",-16073414,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async25978.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25978.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25978";

cljs.core.async.t_cljs$core$async25978.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async25978");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async25978 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async25978(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta25979){
return (new cljs.core.async.t_cljs$core$async25978(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta25979));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async25978(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19399__auto___26141 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_26078){
var state_val_26079 = (state_26078[(1)]);
if((state_val_26079 === (7))){
var inst_25996 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
var statearr_26080_26142 = state_26078__$1;
(statearr_26080_26142[(2)] = inst_25996);

(statearr_26080_26142[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (20))){
var inst_26008 = (state_26078[(7)]);
var state_26078__$1 = state_26078;
var statearr_26081_26143 = state_26078__$1;
(statearr_26081_26143[(2)] = inst_26008);

(statearr_26081_26143[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (27))){
var state_26078__$1 = state_26078;
var statearr_26082_26144 = state_26078__$1;
(statearr_26082_26144[(2)] = null);

(statearr_26082_26144[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (1))){
var inst_25984 = (state_26078[(8)]);
var inst_25984__$1 = calc_state.call(null);
var inst_25986 = (inst_25984__$1 == null);
var inst_25987 = cljs.core.not.call(null,inst_25986);
var state_26078__$1 = (function (){var statearr_26083 = state_26078;
(statearr_26083[(8)] = inst_25984__$1);

return statearr_26083;
})();
if(inst_25987){
var statearr_26084_26145 = state_26078__$1;
(statearr_26084_26145[(1)] = (2));

} else {
var statearr_26085_26146 = state_26078__$1;
(statearr_26085_26146[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (24))){
var inst_26031 = (state_26078[(9)]);
var inst_26038 = (state_26078[(10)]);
var inst_26052 = (state_26078[(11)]);
var inst_26052__$1 = inst_26031.call(null,inst_26038);
var state_26078__$1 = (function (){var statearr_26086 = state_26078;
(statearr_26086[(11)] = inst_26052__$1);

return statearr_26086;
})();
if(cljs.core.truth_(inst_26052__$1)){
var statearr_26087_26147 = state_26078__$1;
(statearr_26087_26147[(1)] = (29));

} else {
var statearr_26088_26148 = state_26078__$1;
(statearr_26088_26148[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (4))){
var inst_25999 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_25999)){
var statearr_26089_26149 = state_26078__$1;
(statearr_26089_26149[(1)] = (8));

} else {
var statearr_26090_26150 = state_26078__$1;
(statearr_26090_26150[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (15))){
var inst_26025 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_26025)){
var statearr_26091_26151 = state_26078__$1;
(statearr_26091_26151[(1)] = (19));

} else {
var statearr_26092_26152 = state_26078__$1;
(statearr_26092_26152[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (21))){
var inst_26030 = (state_26078[(12)]);
var inst_26030__$1 = (state_26078[(2)]);
var inst_26031 = cljs.core.get.call(null,inst_26030__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_26032 = cljs.core.get.call(null,inst_26030__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_26033 = cljs.core.get.call(null,inst_26030__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_26078__$1 = (function (){var statearr_26093 = state_26078;
(statearr_26093[(9)] = inst_26031);

(statearr_26093[(12)] = inst_26030__$1);

(statearr_26093[(13)] = inst_26032);

return statearr_26093;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_26078__$1,(22),inst_26033);
} else {
if((state_val_26079 === (31))){
var inst_26060 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_26060)){
var statearr_26094_26153 = state_26078__$1;
(statearr_26094_26153[(1)] = (32));

} else {
var statearr_26095_26154 = state_26078__$1;
(statearr_26095_26154[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (32))){
var inst_26037 = (state_26078[(14)]);
var state_26078__$1 = state_26078;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26078__$1,(35),out,inst_26037);
} else {
if((state_val_26079 === (33))){
var inst_26030 = (state_26078[(12)]);
var inst_26008 = inst_26030;
var state_26078__$1 = (function (){var statearr_26096 = state_26078;
(statearr_26096[(7)] = inst_26008);

return statearr_26096;
})();
var statearr_26097_26155 = state_26078__$1;
(statearr_26097_26155[(2)] = null);

(statearr_26097_26155[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (13))){
var inst_26008 = (state_26078[(7)]);
var inst_26015 = inst_26008.cljs$lang$protocol_mask$partition0$;
var inst_26016 = (inst_26015 & (64));
var inst_26017 = inst_26008.cljs$core$ISeq$;
var inst_26018 = (inst_26016) || (inst_26017);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_26018)){
var statearr_26098_26156 = state_26078__$1;
(statearr_26098_26156[(1)] = (16));

} else {
var statearr_26099_26157 = state_26078__$1;
(statearr_26099_26157[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (22))){
var inst_26038 = (state_26078[(10)]);
var inst_26037 = (state_26078[(14)]);
var inst_26036 = (state_26078[(2)]);
var inst_26037__$1 = cljs.core.nth.call(null,inst_26036,(0),null);
var inst_26038__$1 = cljs.core.nth.call(null,inst_26036,(1),null);
var inst_26039 = (inst_26037__$1 == null);
var inst_26040 = cljs.core._EQ_.call(null,inst_26038__$1,change);
var inst_26041 = (inst_26039) || (inst_26040);
var state_26078__$1 = (function (){var statearr_26100 = state_26078;
(statearr_26100[(10)] = inst_26038__$1);

(statearr_26100[(14)] = inst_26037__$1);

return statearr_26100;
})();
if(cljs.core.truth_(inst_26041)){
var statearr_26101_26158 = state_26078__$1;
(statearr_26101_26158[(1)] = (23));

} else {
var statearr_26102_26159 = state_26078__$1;
(statearr_26102_26159[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (36))){
var inst_26030 = (state_26078[(12)]);
var inst_26008 = inst_26030;
var state_26078__$1 = (function (){var statearr_26103 = state_26078;
(statearr_26103[(7)] = inst_26008);

return statearr_26103;
})();
var statearr_26104_26160 = state_26078__$1;
(statearr_26104_26160[(2)] = null);

(statearr_26104_26160[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (29))){
var inst_26052 = (state_26078[(11)]);
var state_26078__$1 = state_26078;
var statearr_26105_26161 = state_26078__$1;
(statearr_26105_26161[(2)] = inst_26052);

(statearr_26105_26161[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (6))){
var state_26078__$1 = state_26078;
var statearr_26106_26162 = state_26078__$1;
(statearr_26106_26162[(2)] = false);

(statearr_26106_26162[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (28))){
var inst_26048 = (state_26078[(2)]);
var inst_26049 = calc_state.call(null);
var inst_26008 = inst_26049;
var state_26078__$1 = (function (){var statearr_26107 = state_26078;
(statearr_26107[(15)] = inst_26048);

(statearr_26107[(7)] = inst_26008);

return statearr_26107;
})();
var statearr_26108_26163 = state_26078__$1;
(statearr_26108_26163[(2)] = null);

(statearr_26108_26163[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (25))){
var inst_26074 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
var statearr_26109_26164 = state_26078__$1;
(statearr_26109_26164[(2)] = inst_26074);

(statearr_26109_26164[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (34))){
var inst_26072 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
var statearr_26110_26165 = state_26078__$1;
(statearr_26110_26165[(2)] = inst_26072);

(statearr_26110_26165[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (17))){
var state_26078__$1 = state_26078;
var statearr_26111_26166 = state_26078__$1;
(statearr_26111_26166[(2)] = false);

(statearr_26111_26166[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (3))){
var state_26078__$1 = state_26078;
var statearr_26112_26167 = state_26078__$1;
(statearr_26112_26167[(2)] = false);

(statearr_26112_26167[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (12))){
var inst_26076 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26078__$1,inst_26076);
} else {
if((state_val_26079 === (2))){
var inst_25984 = (state_26078[(8)]);
var inst_25989 = inst_25984.cljs$lang$protocol_mask$partition0$;
var inst_25990 = (inst_25989 & (64));
var inst_25991 = inst_25984.cljs$core$ISeq$;
var inst_25992 = (inst_25990) || (inst_25991);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_25992)){
var statearr_26113_26168 = state_26078__$1;
(statearr_26113_26168[(1)] = (5));

} else {
var statearr_26114_26169 = state_26078__$1;
(statearr_26114_26169[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (23))){
var inst_26037 = (state_26078[(14)]);
var inst_26043 = (inst_26037 == null);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_26043)){
var statearr_26115_26170 = state_26078__$1;
(statearr_26115_26170[(1)] = (26));

} else {
var statearr_26116_26171 = state_26078__$1;
(statearr_26116_26171[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (35))){
var inst_26063 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
if(cljs.core.truth_(inst_26063)){
var statearr_26117_26172 = state_26078__$1;
(statearr_26117_26172[(1)] = (36));

} else {
var statearr_26118_26173 = state_26078__$1;
(statearr_26118_26173[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (19))){
var inst_26008 = (state_26078[(7)]);
var inst_26027 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26008);
var state_26078__$1 = state_26078;
var statearr_26119_26174 = state_26078__$1;
(statearr_26119_26174[(2)] = inst_26027);

(statearr_26119_26174[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (11))){
var inst_26008 = (state_26078[(7)]);
var inst_26012 = (inst_26008 == null);
var inst_26013 = cljs.core.not.call(null,inst_26012);
var state_26078__$1 = state_26078;
if(inst_26013){
var statearr_26120_26175 = state_26078__$1;
(statearr_26120_26175[(1)] = (13));

} else {
var statearr_26121_26176 = state_26078__$1;
(statearr_26121_26176[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (9))){
var inst_25984 = (state_26078[(8)]);
var state_26078__$1 = state_26078;
var statearr_26122_26177 = state_26078__$1;
(statearr_26122_26177[(2)] = inst_25984);

(statearr_26122_26177[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (5))){
var state_26078__$1 = state_26078;
var statearr_26123_26178 = state_26078__$1;
(statearr_26123_26178[(2)] = true);

(statearr_26123_26178[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (14))){
var state_26078__$1 = state_26078;
var statearr_26124_26179 = state_26078__$1;
(statearr_26124_26179[(2)] = false);

(statearr_26124_26179[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (26))){
var inst_26038 = (state_26078[(10)]);
var inst_26045 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_26038);
var state_26078__$1 = state_26078;
var statearr_26125_26180 = state_26078__$1;
(statearr_26125_26180[(2)] = inst_26045);

(statearr_26125_26180[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (16))){
var state_26078__$1 = state_26078;
var statearr_26126_26181 = state_26078__$1;
(statearr_26126_26181[(2)] = true);

(statearr_26126_26181[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (38))){
var inst_26068 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
var statearr_26127_26182 = state_26078__$1;
(statearr_26127_26182[(2)] = inst_26068);

(statearr_26127_26182[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (30))){
var inst_26031 = (state_26078[(9)]);
var inst_26038 = (state_26078[(10)]);
var inst_26032 = (state_26078[(13)]);
var inst_26055 = cljs.core.empty_QMARK_.call(null,inst_26031);
var inst_26056 = inst_26032.call(null,inst_26038);
var inst_26057 = cljs.core.not.call(null,inst_26056);
var inst_26058 = (inst_26055) && (inst_26057);
var state_26078__$1 = state_26078;
var statearr_26128_26183 = state_26078__$1;
(statearr_26128_26183[(2)] = inst_26058);

(statearr_26128_26183[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (10))){
var inst_25984 = (state_26078[(8)]);
var inst_26004 = (state_26078[(2)]);
var inst_26005 = cljs.core.get.call(null,inst_26004,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_26006 = cljs.core.get.call(null,inst_26004,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_26007 = cljs.core.get.call(null,inst_26004,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_26008 = inst_25984;
var state_26078__$1 = (function (){var statearr_26129 = state_26078;
(statearr_26129[(16)] = inst_26005);

(statearr_26129[(17)] = inst_26006);

(statearr_26129[(18)] = inst_26007);

(statearr_26129[(7)] = inst_26008);

return statearr_26129;
})();
var statearr_26130_26184 = state_26078__$1;
(statearr_26130_26184[(2)] = null);

(statearr_26130_26184[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (18))){
var inst_26022 = (state_26078[(2)]);
var state_26078__$1 = state_26078;
var statearr_26131_26185 = state_26078__$1;
(statearr_26131_26185[(2)] = inst_26022);

(statearr_26131_26185[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (37))){
var state_26078__$1 = state_26078;
var statearr_26132_26186 = state_26078__$1;
(statearr_26132_26186[(2)] = null);

(statearr_26132_26186[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26079 === (8))){
var inst_25984 = (state_26078[(8)]);
var inst_26001 = cljs.core.apply.call(null,cljs.core.hash_map,inst_25984);
var state_26078__$1 = state_26078;
var statearr_26133_26187 = state_26078__$1;
(statearr_26133_26187[(2)] = inst_26001);

(statearr_26133_26187[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__19334__auto__,c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__19335__auto__ = null;
var cljs$core$async$mix_$_state_machine__19335__auto____0 = (function (){
var statearr_26137 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26137[(0)] = cljs$core$async$mix_$_state_machine__19335__auto__);

(statearr_26137[(1)] = (1));

return statearr_26137;
});
var cljs$core$async$mix_$_state_machine__19335__auto____1 = (function (state_26078){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26078);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26138){if((e26138 instanceof Object)){
var ex__19338__auto__ = e26138;
var statearr_26139_26188 = state_26078;
(statearr_26139_26188[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26078);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26138;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26189 = state_26078;
state_26078 = G__26189;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__19335__auto__ = function(state_26078){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__19335__auto____1.call(this,state_26078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__19335__auto____0;
cljs$core$async$mix_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__19335__auto____1;
return cljs$core$async$mix_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__19401__auto__ = (function (){var statearr_26140 = f__19400__auto__.call(null);
(statearr_26140[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26141);

return statearr_26140;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
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
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__16974__auto__ = (((p == null))?null:p);
var m__16975__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__16975__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__16974__auto__ = (((p == null))?null:p);
var m__16975__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,p,v,ch);
} else {
var m__16975__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args26190 = [];
var len__17377__auto___26193 = arguments.length;
var i__17378__auto___26194 = (0);
while(true){
if((i__17378__auto___26194 < len__17377__auto___26193)){
args26190.push((arguments[i__17378__auto___26194]));

var G__26195 = (i__17378__auto___26194 + (1));
i__17378__auto___26194 = G__26195;
continue;
} else {
}
break;
}

var G__26192 = args26190.length;
switch (G__26192) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26190.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__16974__auto__ = (((p == null))?null:p);
var m__16975__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,p);
} else {
var m__16975__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__16974__auto__ = (((p == null))?null:p);
var m__16975__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,p,v);
} else {
var m__16975__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
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
var args26198 = [];
var len__17377__auto___26323 = arguments.length;
var i__17378__auto___26324 = (0);
while(true){
if((i__17378__auto___26324 < len__17377__auto___26323)){
args26198.push((arguments[i__17378__auto___26324]));

var G__26325 = (i__17378__auto___26324 + (1));
i__17378__auto___26324 = G__26325;
continue;
} else {
}
break;
}

var G__26200 = args26198.length;
switch (G__26200) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26198.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__16319__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__16319__auto__,mults){
return (function (p1__26197_SHARP_){
if(cljs.core.truth_(p1__26197_SHARP_.call(null,topic))){
return p1__26197_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__26197_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16319__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async26201 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26201 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta26202){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta26202 = meta26202;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_26203,meta26202__$1){
var self__ = this;
var _26203__$1 = this;
return (new cljs.core.async.t_cljs$core$async26201(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta26202__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_26203){
var self__ = this;
var _26203__$1 = this;
return self__.meta26202;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta26202","meta26202",1987724728,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26201.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26201.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26201";

cljs.core.async.t_cljs$core$async26201.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async26201");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async26201 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async26201(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta26202){
return (new cljs.core.async.t_cljs$core$async26201(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta26202));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async26201(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19399__auto___26327 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26327,mults,ensure_mult,p){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26327,mults,ensure_mult,p){
return (function (state_26275){
var state_val_26276 = (state_26275[(1)]);
if((state_val_26276 === (7))){
var inst_26271 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26277_26328 = state_26275__$1;
(statearr_26277_26328[(2)] = inst_26271);

(statearr_26277_26328[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (20))){
var state_26275__$1 = state_26275;
var statearr_26278_26329 = state_26275__$1;
(statearr_26278_26329[(2)] = null);

(statearr_26278_26329[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (1))){
var state_26275__$1 = state_26275;
var statearr_26279_26330 = state_26275__$1;
(statearr_26279_26330[(2)] = null);

(statearr_26279_26330[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (24))){
var inst_26254 = (state_26275[(7)]);
var inst_26263 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_26254);
var state_26275__$1 = state_26275;
var statearr_26280_26331 = state_26275__$1;
(statearr_26280_26331[(2)] = inst_26263);

(statearr_26280_26331[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (4))){
var inst_26206 = (state_26275[(8)]);
var inst_26206__$1 = (state_26275[(2)]);
var inst_26207 = (inst_26206__$1 == null);
var state_26275__$1 = (function (){var statearr_26281 = state_26275;
(statearr_26281[(8)] = inst_26206__$1);

return statearr_26281;
})();
if(cljs.core.truth_(inst_26207)){
var statearr_26282_26332 = state_26275__$1;
(statearr_26282_26332[(1)] = (5));

} else {
var statearr_26283_26333 = state_26275__$1;
(statearr_26283_26333[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (15))){
var inst_26248 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26284_26334 = state_26275__$1;
(statearr_26284_26334[(2)] = inst_26248);

(statearr_26284_26334[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (21))){
var inst_26268 = (state_26275[(2)]);
var state_26275__$1 = (function (){var statearr_26285 = state_26275;
(statearr_26285[(9)] = inst_26268);

return statearr_26285;
})();
var statearr_26286_26335 = state_26275__$1;
(statearr_26286_26335[(2)] = null);

(statearr_26286_26335[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (13))){
var inst_26230 = (state_26275[(10)]);
var inst_26232 = cljs.core.chunked_seq_QMARK_.call(null,inst_26230);
var state_26275__$1 = state_26275;
if(inst_26232){
var statearr_26287_26336 = state_26275__$1;
(statearr_26287_26336[(1)] = (16));

} else {
var statearr_26288_26337 = state_26275__$1;
(statearr_26288_26337[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (22))){
var inst_26260 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
if(cljs.core.truth_(inst_26260)){
var statearr_26289_26338 = state_26275__$1;
(statearr_26289_26338[(1)] = (23));

} else {
var statearr_26290_26339 = state_26275__$1;
(statearr_26290_26339[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (6))){
var inst_26256 = (state_26275[(11)]);
var inst_26254 = (state_26275[(7)]);
var inst_26206 = (state_26275[(8)]);
var inst_26254__$1 = topic_fn.call(null,inst_26206);
var inst_26255 = cljs.core.deref.call(null,mults);
var inst_26256__$1 = cljs.core.get.call(null,inst_26255,inst_26254__$1);
var state_26275__$1 = (function (){var statearr_26291 = state_26275;
(statearr_26291[(11)] = inst_26256__$1);

(statearr_26291[(7)] = inst_26254__$1);

return statearr_26291;
})();
if(cljs.core.truth_(inst_26256__$1)){
var statearr_26292_26340 = state_26275__$1;
(statearr_26292_26340[(1)] = (19));

} else {
var statearr_26293_26341 = state_26275__$1;
(statearr_26293_26341[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (25))){
var inst_26265 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26294_26342 = state_26275__$1;
(statearr_26294_26342[(2)] = inst_26265);

(statearr_26294_26342[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (17))){
var inst_26230 = (state_26275[(10)]);
var inst_26239 = cljs.core.first.call(null,inst_26230);
var inst_26240 = cljs.core.async.muxch_STAR_.call(null,inst_26239);
var inst_26241 = cljs.core.async.close_BANG_.call(null,inst_26240);
var inst_26242 = cljs.core.next.call(null,inst_26230);
var inst_26216 = inst_26242;
var inst_26217 = null;
var inst_26218 = (0);
var inst_26219 = (0);
var state_26275__$1 = (function (){var statearr_26295 = state_26275;
(statearr_26295[(12)] = inst_26218);

(statearr_26295[(13)] = inst_26216);

(statearr_26295[(14)] = inst_26219);

(statearr_26295[(15)] = inst_26241);

(statearr_26295[(16)] = inst_26217);

return statearr_26295;
})();
var statearr_26296_26343 = state_26275__$1;
(statearr_26296_26343[(2)] = null);

(statearr_26296_26343[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (3))){
var inst_26273 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26275__$1,inst_26273);
} else {
if((state_val_26276 === (12))){
var inst_26250 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26297_26344 = state_26275__$1;
(statearr_26297_26344[(2)] = inst_26250);

(statearr_26297_26344[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (2))){
var state_26275__$1 = state_26275;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26275__$1,(4),ch);
} else {
if((state_val_26276 === (23))){
var state_26275__$1 = state_26275;
var statearr_26298_26345 = state_26275__$1;
(statearr_26298_26345[(2)] = null);

(statearr_26298_26345[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (19))){
var inst_26256 = (state_26275[(11)]);
var inst_26206 = (state_26275[(8)]);
var inst_26258 = cljs.core.async.muxch_STAR_.call(null,inst_26256);
var state_26275__$1 = state_26275;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26275__$1,(22),inst_26258,inst_26206);
} else {
if((state_val_26276 === (11))){
var inst_26216 = (state_26275[(13)]);
var inst_26230 = (state_26275[(10)]);
var inst_26230__$1 = cljs.core.seq.call(null,inst_26216);
var state_26275__$1 = (function (){var statearr_26299 = state_26275;
(statearr_26299[(10)] = inst_26230__$1);

return statearr_26299;
})();
if(inst_26230__$1){
var statearr_26300_26346 = state_26275__$1;
(statearr_26300_26346[(1)] = (13));

} else {
var statearr_26301_26347 = state_26275__$1;
(statearr_26301_26347[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (9))){
var inst_26252 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26302_26348 = state_26275__$1;
(statearr_26302_26348[(2)] = inst_26252);

(statearr_26302_26348[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (5))){
var inst_26213 = cljs.core.deref.call(null,mults);
var inst_26214 = cljs.core.vals.call(null,inst_26213);
var inst_26215 = cljs.core.seq.call(null,inst_26214);
var inst_26216 = inst_26215;
var inst_26217 = null;
var inst_26218 = (0);
var inst_26219 = (0);
var state_26275__$1 = (function (){var statearr_26303 = state_26275;
(statearr_26303[(12)] = inst_26218);

(statearr_26303[(13)] = inst_26216);

(statearr_26303[(14)] = inst_26219);

(statearr_26303[(16)] = inst_26217);

return statearr_26303;
})();
var statearr_26304_26349 = state_26275__$1;
(statearr_26304_26349[(2)] = null);

(statearr_26304_26349[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (14))){
var state_26275__$1 = state_26275;
var statearr_26308_26350 = state_26275__$1;
(statearr_26308_26350[(2)] = null);

(statearr_26308_26350[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (16))){
var inst_26230 = (state_26275[(10)]);
var inst_26234 = cljs.core.chunk_first.call(null,inst_26230);
var inst_26235 = cljs.core.chunk_rest.call(null,inst_26230);
var inst_26236 = cljs.core.count.call(null,inst_26234);
var inst_26216 = inst_26235;
var inst_26217 = inst_26234;
var inst_26218 = inst_26236;
var inst_26219 = (0);
var state_26275__$1 = (function (){var statearr_26309 = state_26275;
(statearr_26309[(12)] = inst_26218);

(statearr_26309[(13)] = inst_26216);

(statearr_26309[(14)] = inst_26219);

(statearr_26309[(16)] = inst_26217);

return statearr_26309;
})();
var statearr_26310_26351 = state_26275__$1;
(statearr_26310_26351[(2)] = null);

(statearr_26310_26351[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (10))){
var inst_26218 = (state_26275[(12)]);
var inst_26216 = (state_26275[(13)]);
var inst_26219 = (state_26275[(14)]);
var inst_26217 = (state_26275[(16)]);
var inst_26224 = cljs.core._nth.call(null,inst_26217,inst_26219);
var inst_26225 = cljs.core.async.muxch_STAR_.call(null,inst_26224);
var inst_26226 = cljs.core.async.close_BANG_.call(null,inst_26225);
var inst_26227 = (inst_26219 + (1));
var tmp26305 = inst_26218;
var tmp26306 = inst_26216;
var tmp26307 = inst_26217;
var inst_26216__$1 = tmp26306;
var inst_26217__$1 = tmp26307;
var inst_26218__$1 = tmp26305;
var inst_26219__$1 = inst_26227;
var state_26275__$1 = (function (){var statearr_26311 = state_26275;
(statearr_26311[(12)] = inst_26218__$1);

(statearr_26311[(13)] = inst_26216__$1);

(statearr_26311[(14)] = inst_26219__$1);

(statearr_26311[(17)] = inst_26226);

(statearr_26311[(16)] = inst_26217__$1);

return statearr_26311;
})();
var statearr_26312_26352 = state_26275__$1;
(statearr_26312_26352[(2)] = null);

(statearr_26312_26352[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (18))){
var inst_26245 = (state_26275[(2)]);
var state_26275__$1 = state_26275;
var statearr_26313_26353 = state_26275__$1;
(statearr_26313_26353[(2)] = inst_26245);

(statearr_26313_26353[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26276 === (8))){
var inst_26218 = (state_26275[(12)]);
var inst_26219 = (state_26275[(14)]);
var inst_26221 = (inst_26219 < inst_26218);
var inst_26222 = inst_26221;
var state_26275__$1 = state_26275;
if(cljs.core.truth_(inst_26222)){
var statearr_26314_26354 = state_26275__$1;
(statearr_26314_26354[(1)] = (10));

} else {
var statearr_26315_26355 = state_26275__$1;
(statearr_26315_26355[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___26327,mults,ensure_mult,p))
;
return ((function (switch__19334__auto__,c__19399__auto___26327,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26319 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26319[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26319[(1)] = (1));

return statearr_26319;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26275){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26275);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26320){if((e26320 instanceof Object)){
var ex__19338__auto__ = e26320;
var statearr_26321_26356 = state_26275;
(statearr_26321_26356[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26275);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26320;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26357 = state_26275;
state_26275 = G__26357;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26275){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26275);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26327,mults,ensure_mult,p))
})();
var state__19401__auto__ = (function (){var statearr_26322 = f__19400__auto__.call(null);
(statearr_26322[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26327);

return statearr_26322;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26327,mults,ensure_mult,p))
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
var args26358 = [];
var len__17377__auto___26361 = arguments.length;
var i__17378__auto___26362 = (0);
while(true){
if((i__17378__auto___26362 < len__17377__auto___26361)){
args26358.push((arguments[i__17378__auto___26362]));

var G__26363 = (i__17378__auto___26362 + (1));
i__17378__auto___26362 = G__26363;
continue;
} else {
}
break;
}

var G__26360 = args26358.length;
switch (G__26360) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26358.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args26365 = [];
var len__17377__auto___26368 = arguments.length;
var i__17378__auto___26369 = (0);
while(true){
if((i__17378__auto___26369 < len__17377__auto___26368)){
args26365.push((arguments[i__17378__auto___26369]));

var G__26370 = (i__17378__auto___26369 + (1));
i__17378__auto___26369 = G__26370;
continue;
} else {
}
break;
}

var G__26367 = args26365.length;
switch (G__26367) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26365.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
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
var args26372 = [];
var len__17377__auto___26443 = arguments.length;
var i__17378__auto___26444 = (0);
while(true){
if((i__17378__auto___26444 < len__17377__auto___26443)){
args26372.push((arguments[i__17378__auto___26444]));

var G__26445 = (i__17378__auto___26444 + (1));
i__17378__auto___26444 = G__26445;
continue;
} else {
}
break;
}

var G__26374 = args26372.length;
switch (G__26374) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26372.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__19399__auto___26447 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_26413){
var state_val_26414 = (state_26413[(1)]);
if((state_val_26414 === (7))){
var state_26413__$1 = state_26413;
var statearr_26415_26448 = state_26413__$1;
(statearr_26415_26448[(2)] = null);

(statearr_26415_26448[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (1))){
var state_26413__$1 = state_26413;
var statearr_26416_26449 = state_26413__$1;
(statearr_26416_26449[(2)] = null);

(statearr_26416_26449[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (4))){
var inst_26377 = (state_26413[(7)]);
var inst_26379 = (inst_26377 < cnt);
var state_26413__$1 = state_26413;
if(cljs.core.truth_(inst_26379)){
var statearr_26417_26450 = state_26413__$1;
(statearr_26417_26450[(1)] = (6));

} else {
var statearr_26418_26451 = state_26413__$1;
(statearr_26418_26451[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (15))){
var inst_26409 = (state_26413[(2)]);
var state_26413__$1 = state_26413;
var statearr_26419_26452 = state_26413__$1;
(statearr_26419_26452[(2)] = inst_26409);

(statearr_26419_26452[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (13))){
var inst_26402 = cljs.core.async.close_BANG_.call(null,out);
var state_26413__$1 = state_26413;
var statearr_26420_26453 = state_26413__$1;
(statearr_26420_26453[(2)] = inst_26402);

(statearr_26420_26453[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (6))){
var state_26413__$1 = state_26413;
var statearr_26421_26454 = state_26413__$1;
(statearr_26421_26454[(2)] = null);

(statearr_26421_26454[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (3))){
var inst_26411 = (state_26413[(2)]);
var state_26413__$1 = state_26413;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26413__$1,inst_26411);
} else {
if((state_val_26414 === (12))){
var inst_26399 = (state_26413[(8)]);
var inst_26399__$1 = (state_26413[(2)]);
var inst_26400 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_26399__$1);
var state_26413__$1 = (function (){var statearr_26422 = state_26413;
(statearr_26422[(8)] = inst_26399__$1);

return statearr_26422;
})();
if(cljs.core.truth_(inst_26400)){
var statearr_26423_26455 = state_26413__$1;
(statearr_26423_26455[(1)] = (13));

} else {
var statearr_26424_26456 = state_26413__$1;
(statearr_26424_26456[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (2))){
var inst_26376 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_26377 = (0);
var state_26413__$1 = (function (){var statearr_26425 = state_26413;
(statearr_26425[(9)] = inst_26376);

(statearr_26425[(7)] = inst_26377);

return statearr_26425;
})();
var statearr_26426_26457 = state_26413__$1;
(statearr_26426_26457[(2)] = null);

(statearr_26426_26457[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (11))){
var inst_26377 = (state_26413[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26413,(10),Object,null,(9));
var inst_26386 = chs__$1.call(null,inst_26377);
var inst_26387 = done.call(null,inst_26377);
var inst_26388 = cljs.core.async.take_BANG_.call(null,inst_26386,inst_26387);
var state_26413__$1 = state_26413;
var statearr_26427_26458 = state_26413__$1;
(statearr_26427_26458[(2)] = inst_26388);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26413__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (9))){
var inst_26377 = (state_26413[(7)]);
var inst_26390 = (state_26413[(2)]);
var inst_26391 = (inst_26377 + (1));
var inst_26377__$1 = inst_26391;
var state_26413__$1 = (function (){var statearr_26428 = state_26413;
(statearr_26428[(10)] = inst_26390);

(statearr_26428[(7)] = inst_26377__$1);

return statearr_26428;
})();
var statearr_26429_26459 = state_26413__$1;
(statearr_26429_26459[(2)] = null);

(statearr_26429_26459[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (5))){
var inst_26397 = (state_26413[(2)]);
var state_26413__$1 = (function (){var statearr_26430 = state_26413;
(statearr_26430[(11)] = inst_26397);

return statearr_26430;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26413__$1,(12),dchan);
} else {
if((state_val_26414 === (14))){
var inst_26399 = (state_26413[(8)]);
var inst_26404 = cljs.core.apply.call(null,f,inst_26399);
var state_26413__$1 = state_26413;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26413__$1,(16),out,inst_26404);
} else {
if((state_val_26414 === (16))){
var inst_26406 = (state_26413[(2)]);
var state_26413__$1 = (function (){var statearr_26431 = state_26413;
(statearr_26431[(12)] = inst_26406);

return statearr_26431;
})();
var statearr_26432_26460 = state_26413__$1;
(statearr_26432_26460[(2)] = null);

(statearr_26432_26460[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (10))){
var inst_26381 = (state_26413[(2)]);
var inst_26382 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_26413__$1 = (function (){var statearr_26433 = state_26413;
(statearr_26433[(13)] = inst_26381);

return statearr_26433;
})();
var statearr_26434_26461 = state_26413__$1;
(statearr_26434_26461[(2)] = inst_26382);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26413__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26414 === (8))){
var inst_26395 = (state_26413[(2)]);
var state_26413__$1 = state_26413;
var statearr_26435_26462 = state_26413__$1;
(statearr_26435_26462[(2)] = inst_26395);

(statearr_26435_26462[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__19334__auto__,c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26439 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26439[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26439[(1)] = (1));

return statearr_26439;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26413){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26413);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26440){if((e26440 instanceof Object)){
var ex__19338__auto__ = e26440;
var statearr_26441_26463 = state_26413;
(statearr_26441_26463[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26413);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26440;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26464 = state_26413;
state_26413 = G__26464;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26413){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26413);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__19401__auto__ = (function (){var statearr_26442 = f__19400__auto__.call(null);
(statearr_26442[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26447);

return statearr_26442;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26447,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args26466 = [];
var len__17377__auto___26522 = arguments.length;
var i__17378__auto___26523 = (0);
while(true){
if((i__17378__auto___26523 < len__17377__auto___26522)){
args26466.push((arguments[i__17378__auto___26523]));

var G__26524 = (i__17378__auto___26523 + (1));
i__17378__auto___26523 = G__26524;
continue;
} else {
}
break;
}

var G__26468 = args26466.length;
switch (G__26468) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26466.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___26526 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26526,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26526,out){
return (function (state_26498){
var state_val_26499 = (state_26498[(1)]);
if((state_val_26499 === (7))){
var inst_26477 = (state_26498[(7)]);
var inst_26478 = (state_26498[(8)]);
var inst_26477__$1 = (state_26498[(2)]);
var inst_26478__$1 = cljs.core.nth.call(null,inst_26477__$1,(0),null);
var inst_26479 = cljs.core.nth.call(null,inst_26477__$1,(1),null);
var inst_26480 = (inst_26478__$1 == null);
var state_26498__$1 = (function (){var statearr_26500 = state_26498;
(statearr_26500[(7)] = inst_26477__$1);

(statearr_26500[(9)] = inst_26479);

(statearr_26500[(8)] = inst_26478__$1);

return statearr_26500;
})();
if(cljs.core.truth_(inst_26480)){
var statearr_26501_26527 = state_26498__$1;
(statearr_26501_26527[(1)] = (8));

} else {
var statearr_26502_26528 = state_26498__$1;
(statearr_26502_26528[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (1))){
var inst_26469 = cljs.core.vec.call(null,chs);
var inst_26470 = inst_26469;
var state_26498__$1 = (function (){var statearr_26503 = state_26498;
(statearr_26503[(10)] = inst_26470);

return statearr_26503;
})();
var statearr_26504_26529 = state_26498__$1;
(statearr_26504_26529[(2)] = null);

(statearr_26504_26529[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (4))){
var inst_26470 = (state_26498[(10)]);
var state_26498__$1 = state_26498;
return cljs.core.async.ioc_alts_BANG_.call(null,state_26498__$1,(7),inst_26470);
} else {
if((state_val_26499 === (6))){
var inst_26494 = (state_26498[(2)]);
var state_26498__$1 = state_26498;
var statearr_26505_26530 = state_26498__$1;
(statearr_26505_26530[(2)] = inst_26494);

(statearr_26505_26530[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (3))){
var inst_26496 = (state_26498[(2)]);
var state_26498__$1 = state_26498;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26498__$1,inst_26496);
} else {
if((state_val_26499 === (2))){
var inst_26470 = (state_26498[(10)]);
var inst_26472 = cljs.core.count.call(null,inst_26470);
var inst_26473 = (inst_26472 > (0));
var state_26498__$1 = state_26498;
if(cljs.core.truth_(inst_26473)){
var statearr_26507_26531 = state_26498__$1;
(statearr_26507_26531[(1)] = (4));

} else {
var statearr_26508_26532 = state_26498__$1;
(statearr_26508_26532[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (11))){
var inst_26470 = (state_26498[(10)]);
var inst_26487 = (state_26498[(2)]);
var tmp26506 = inst_26470;
var inst_26470__$1 = tmp26506;
var state_26498__$1 = (function (){var statearr_26509 = state_26498;
(statearr_26509[(11)] = inst_26487);

(statearr_26509[(10)] = inst_26470__$1);

return statearr_26509;
})();
var statearr_26510_26533 = state_26498__$1;
(statearr_26510_26533[(2)] = null);

(statearr_26510_26533[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (9))){
var inst_26478 = (state_26498[(8)]);
var state_26498__$1 = state_26498;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26498__$1,(11),out,inst_26478);
} else {
if((state_val_26499 === (5))){
var inst_26492 = cljs.core.async.close_BANG_.call(null,out);
var state_26498__$1 = state_26498;
var statearr_26511_26534 = state_26498__$1;
(statearr_26511_26534[(2)] = inst_26492);

(statearr_26511_26534[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (10))){
var inst_26490 = (state_26498[(2)]);
var state_26498__$1 = state_26498;
var statearr_26512_26535 = state_26498__$1;
(statearr_26512_26535[(2)] = inst_26490);

(statearr_26512_26535[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26499 === (8))){
var inst_26477 = (state_26498[(7)]);
var inst_26479 = (state_26498[(9)]);
var inst_26470 = (state_26498[(10)]);
var inst_26478 = (state_26498[(8)]);
var inst_26482 = (function (){var cs = inst_26470;
var vec__26475 = inst_26477;
var v = inst_26478;
var c = inst_26479;
return ((function (cs,vec__26475,v,c,inst_26477,inst_26479,inst_26470,inst_26478,state_val_26499,c__19399__auto___26526,out){
return (function (p1__26465_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__26465_SHARP_);
});
;})(cs,vec__26475,v,c,inst_26477,inst_26479,inst_26470,inst_26478,state_val_26499,c__19399__auto___26526,out))
})();
var inst_26483 = cljs.core.filterv.call(null,inst_26482,inst_26470);
var inst_26470__$1 = inst_26483;
var state_26498__$1 = (function (){var statearr_26513 = state_26498;
(statearr_26513[(10)] = inst_26470__$1);

return statearr_26513;
})();
var statearr_26514_26536 = state_26498__$1;
(statearr_26514_26536[(2)] = null);

(statearr_26514_26536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___26526,out))
;
return ((function (switch__19334__auto__,c__19399__auto___26526,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26518 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26518[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26518[(1)] = (1));

return statearr_26518;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26498){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26498);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26519){if((e26519 instanceof Object)){
var ex__19338__auto__ = e26519;
var statearr_26520_26537 = state_26498;
(statearr_26520_26537[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26498);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26519;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26538 = state_26498;
state_26498 = G__26538;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26498){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26498);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26526,out))
})();
var state__19401__auto__ = (function (){var statearr_26521 = f__19400__auto__.call(null);
(statearr_26521[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26526);

return statearr_26521;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26526,out))
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
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args26539 = [];
var len__17377__auto___26588 = arguments.length;
var i__17378__auto___26589 = (0);
while(true){
if((i__17378__auto___26589 < len__17377__auto___26588)){
args26539.push((arguments[i__17378__auto___26589]));

var G__26590 = (i__17378__auto___26589 + (1));
i__17378__auto___26589 = G__26590;
continue;
} else {
}
break;
}

var G__26541 = args26539.length;
switch (G__26541) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26539.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___26592 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26592,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26592,out){
return (function (state_26565){
var state_val_26566 = (state_26565[(1)]);
if((state_val_26566 === (7))){
var inst_26547 = (state_26565[(7)]);
var inst_26547__$1 = (state_26565[(2)]);
var inst_26548 = (inst_26547__$1 == null);
var inst_26549 = cljs.core.not.call(null,inst_26548);
var state_26565__$1 = (function (){var statearr_26567 = state_26565;
(statearr_26567[(7)] = inst_26547__$1);

return statearr_26567;
})();
if(inst_26549){
var statearr_26568_26593 = state_26565__$1;
(statearr_26568_26593[(1)] = (8));

} else {
var statearr_26569_26594 = state_26565__$1;
(statearr_26569_26594[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (1))){
var inst_26542 = (0);
var state_26565__$1 = (function (){var statearr_26570 = state_26565;
(statearr_26570[(8)] = inst_26542);

return statearr_26570;
})();
var statearr_26571_26595 = state_26565__$1;
(statearr_26571_26595[(2)] = null);

(statearr_26571_26595[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (4))){
var state_26565__$1 = state_26565;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26565__$1,(7),ch);
} else {
if((state_val_26566 === (6))){
var inst_26560 = (state_26565[(2)]);
var state_26565__$1 = state_26565;
var statearr_26572_26596 = state_26565__$1;
(statearr_26572_26596[(2)] = inst_26560);

(statearr_26572_26596[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (3))){
var inst_26562 = (state_26565[(2)]);
var inst_26563 = cljs.core.async.close_BANG_.call(null,out);
var state_26565__$1 = (function (){var statearr_26573 = state_26565;
(statearr_26573[(9)] = inst_26562);

return statearr_26573;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26565__$1,inst_26563);
} else {
if((state_val_26566 === (2))){
var inst_26542 = (state_26565[(8)]);
var inst_26544 = (inst_26542 < n);
var state_26565__$1 = state_26565;
if(cljs.core.truth_(inst_26544)){
var statearr_26574_26597 = state_26565__$1;
(statearr_26574_26597[(1)] = (4));

} else {
var statearr_26575_26598 = state_26565__$1;
(statearr_26575_26598[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (11))){
var inst_26542 = (state_26565[(8)]);
var inst_26552 = (state_26565[(2)]);
var inst_26553 = (inst_26542 + (1));
var inst_26542__$1 = inst_26553;
var state_26565__$1 = (function (){var statearr_26576 = state_26565;
(statearr_26576[(8)] = inst_26542__$1);

(statearr_26576[(10)] = inst_26552);

return statearr_26576;
})();
var statearr_26577_26599 = state_26565__$1;
(statearr_26577_26599[(2)] = null);

(statearr_26577_26599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (9))){
var state_26565__$1 = state_26565;
var statearr_26578_26600 = state_26565__$1;
(statearr_26578_26600[(2)] = null);

(statearr_26578_26600[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (5))){
var state_26565__$1 = state_26565;
var statearr_26579_26601 = state_26565__$1;
(statearr_26579_26601[(2)] = null);

(statearr_26579_26601[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (10))){
var inst_26557 = (state_26565[(2)]);
var state_26565__$1 = state_26565;
var statearr_26580_26602 = state_26565__$1;
(statearr_26580_26602[(2)] = inst_26557);

(statearr_26580_26602[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26566 === (8))){
var inst_26547 = (state_26565[(7)]);
var state_26565__$1 = state_26565;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26565__$1,(11),out,inst_26547);
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
});})(c__19399__auto___26592,out))
;
return ((function (switch__19334__auto__,c__19399__auto___26592,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26584 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26584[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26584[(1)] = (1));

return statearr_26584;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26565){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26565);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26585){if((e26585 instanceof Object)){
var ex__19338__auto__ = e26585;
var statearr_26586_26603 = state_26565;
(statearr_26586_26603[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26565);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26585;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26604 = state_26565;
state_26565 = G__26604;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26565){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26565);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26592,out))
})();
var state__19401__auto__ = (function (){var statearr_26587 = f__19400__auto__.call(null);
(statearr_26587[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26592);

return statearr_26587;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26592,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async26612 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26612 = (function (map_LT_,f,ch,meta26613){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta26613 = meta26613;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26614,meta26613__$1){
var self__ = this;
var _26614__$1 = this;
return (new cljs.core.async.t_cljs$core$async26612(self__.map_LT_,self__.f,self__.ch,meta26613__$1));
});

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26614){
var self__ = this;
var _26614__$1 = this;
return self__.meta26613;
});

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async26615 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26615 = (function (map_LT_,f,ch,meta26613,_,fn1,meta26616){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta26613 = meta26613;
this._ = _;
this.fn1 = fn1;
this.meta26616 = meta26616;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26615.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_26617,meta26616__$1){
var self__ = this;
var _26617__$1 = this;
return (new cljs.core.async.t_cljs$core$async26615(self__.map_LT_,self__.f,self__.ch,self__.meta26613,self__._,self__.fn1,meta26616__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async26615.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_26617){
var self__ = this;
var _26617__$1 = this;
return self__.meta26616;
});})(___$1))
;

cljs.core.async.t_cljs$core$async26615.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async26615.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26615.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__26605_SHARP_){
return f1.call(null,(((p1__26605_SHARP_ == null))?null:self__.f.call(null,p1__26605_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async26615.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26613","meta26613",-906723559,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async26612","cljs.core.async/t_cljs$core$async26612",-1638644345,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta26616","meta26616",-2041607350,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26615.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26615.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26615";

cljs.core.async.t_cljs$core$async26615.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async26615");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async26615 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26615(map_LT___$1,f__$1,ch__$1,meta26613__$1,___$2,fn1__$1,meta26616){
return (new cljs.core.async.t_cljs$core$async26615(map_LT___$1,f__$1,ch__$1,meta26613__$1,___$2,fn1__$1,meta26616));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async26615(self__.map_LT_,self__.f,self__.ch,self__.meta26613,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__16307__auto__ = ret;
if(cljs.core.truth_(and__16307__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__16307__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26612.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async26612.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26613","meta26613",-906723559,null)], null);
});

cljs.core.async.t_cljs$core$async26612.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26612.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26612";

cljs.core.async.t_cljs$core$async26612.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async26612");
});

cljs.core.async.__GT_t_cljs$core$async26612 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26612(map_LT___$1,f__$1,ch__$1,meta26613){
return (new cljs.core.async.t_cljs$core$async26612(map_LT___$1,f__$1,ch__$1,meta26613));
});

}

return (new cljs.core.async.t_cljs$core$async26612(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async26621 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26621 = (function (map_GT_,f,ch,meta26622){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta26622 = meta26622;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26623,meta26622__$1){
var self__ = this;
var _26623__$1 = this;
return (new cljs.core.async.t_cljs$core$async26621(self__.map_GT_,self__.f,self__.ch,meta26622__$1));
});

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26623){
var self__ = this;
var _26623__$1 = this;
return self__.meta26622;
});

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26621.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async26621.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26622","meta26622",602912358,null)], null);
});

cljs.core.async.t_cljs$core$async26621.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26621.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26621";

cljs.core.async.t_cljs$core$async26621.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async26621");
});

cljs.core.async.__GT_t_cljs$core$async26621 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async26621(map_GT___$1,f__$1,ch__$1,meta26622){
return (new cljs.core.async.t_cljs$core$async26621(map_GT___$1,f__$1,ch__$1,meta26622));
});

}

return (new cljs.core.async.t_cljs$core$async26621(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async26627 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26627 = (function (filter_GT_,p,ch,meta26628){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta26628 = meta26628;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26629,meta26628__$1){
var self__ = this;
var _26629__$1 = this;
return (new cljs.core.async.t_cljs$core$async26627(self__.filter_GT_,self__.p,self__.ch,meta26628__$1));
});

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26629){
var self__ = this;
var _26629__$1 = this;
return self__.meta26628;
});

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async26627.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async26627.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26628","meta26628",-416998818,null)], null);
});

cljs.core.async.t_cljs$core$async26627.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26627.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26627";

cljs.core.async.t_cljs$core$async26627.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cljs.core.async/t_cljs$core$async26627");
});

cljs.core.async.__GT_t_cljs$core$async26627 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async26627(filter_GT___$1,p__$1,ch__$1,meta26628){
return (new cljs.core.async.t_cljs$core$async26627(filter_GT___$1,p__$1,ch__$1,meta26628));
});

}

return (new cljs.core.async.t_cljs$core$async26627(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args26630 = [];
var len__17377__auto___26674 = arguments.length;
var i__17378__auto___26675 = (0);
while(true){
if((i__17378__auto___26675 < len__17377__auto___26674)){
args26630.push((arguments[i__17378__auto___26675]));

var G__26676 = (i__17378__auto___26675 + (1));
i__17378__auto___26675 = G__26676;
continue;
} else {
}
break;
}

var G__26632 = args26630.length;
switch (G__26632) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26630.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___26678 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___26678,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___26678,out){
return (function (state_26653){
var state_val_26654 = (state_26653[(1)]);
if((state_val_26654 === (7))){
var inst_26649 = (state_26653[(2)]);
var state_26653__$1 = state_26653;
var statearr_26655_26679 = state_26653__$1;
(statearr_26655_26679[(2)] = inst_26649);

(statearr_26655_26679[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (1))){
var state_26653__$1 = state_26653;
var statearr_26656_26680 = state_26653__$1;
(statearr_26656_26680[(2)] = null);

(statearr_26656_26680[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (4))){
var inst_26635 = (state_26653[(7)]);
var inst_26635__$1 = (state_26653[(2)]);
var inst_26636 = (inst_26635__$1 == null);
var state_26653__$1 = (function (){var statearr_26657 = state_26653;
(statearr_26657[(7)] = inst_26635__$1);

return statearr_26657;
})();
if(cljs.core.truth_(inst_26636)){
var statearr_26658_26681 = state_26653__$1;
(statearr_26658_26681[(1)] = (5));

} else {
var statearr_26659_26682 = state_26653__$1;
(statearr_26659_26682[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (6))){
var inst_26635 = (state_26653[(7)]);
var inst_26640 = p.call(null,inst_26635);
var state_26653__$1 = state_26653;
if(cljs.core.truth_(inst_26640)){
var statearr_26660_26683 = state_26653__$1;
(statearr_26660_26683[(1)] = (8));

} else {
var statearr_26661_26684 = state_26653__$1;
(statearr_26661_26684[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (3))){
var inst_26651 = (state_26653[(2)]);
var state_26653__$1 = state_26653;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26653__$1,inst_26651);
} else {
if((state_val_26654 === (2))){
var state_26653__$1 = state_26653;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26653__$1,(4),ch);
} else {
if((state_val_26654 === (11))){
var inst_26643 = (state_26653[(2)]);
var state_26653__$1 = state_26653;
var statearr_26662_26685 = state_26653__$1;
(statearr_26662_26685[(2)] = inst_26643);

(statearr_26662_26685[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (9))){
var state_26653__$1 = state_26653;
var statearr_26663_26686 = state_26653__$1;
(statearr_26663_26686[(2)] = null);

(statearr_26663_26686[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (5))){
var inst_26638 = cljs.core.async.close_BANG_.call(null,out);
var state_26653__$1 = state_26653;
var statearr_26664_26687 = state_26653__$1;
(statearr_26664_26687[(2)] = inst_26638);

(statearr_26664_26687[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (10))){
var inst_26646 = (state_26653[(2)]);
var state_26653__$1 = (function (){var statearr_26665 = state_26653;
(statearr_26665[(8)] = inst_26646);

return statearr_26665;
})();
var statearr_26666_26688 = state_26653__$1;
(statearr_26666_26688[(2)] = null);

(statearr_26666_26688[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26654 === (8))){
var inst_26635 = (state_26653[(7)]);
var state_26653__$1 = state_26653;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26653__$1,(11),out,inst_26635);
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
});})(c__19399__auto___26678,out))
;
return ((function (switch__19334__auto__,c__19399__auto___26678,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26670 = [null,null,null,null,null,null,null,null,null];
(statearr_26670[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26670[(1)] = (1));

return statearr_26670;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26653){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26653);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26671){if((e26671 instanceof Object)){
var ex__19338__auto__ = e26671;
var statearr_26672_26689 = state_26653;
(statearr_26672_26689[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26653);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26671;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26690 = state_26653;
state_26653 = G__26690;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26653){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26653);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___26678,out))
})();
var state__19401__auto__ = (function (){var statearr_26673 = f__19400__auto__.call(null);
(statearr_26673[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___26678);

return statearr_26673;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___26678,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args26691 = [];
var len__17377__auto___26694 = arguments.length;
var i__17378__auto___26695 = (0);
while(true){
if((i__17378__auto___26695 < len__17377__auto___26694)){
args26691.push((arguments[i__17378__auto___26695]));

var G__26696 = (i__17378__auto___26695 + (1));
i__17378__auto___26695 = G__26696;
continue;
} else {
}
break;
}

var G__26693 = args26691.length;
switch (G__26693) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26691.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__){
return (function (state_26863){
var state_val_26864 = (state_26863[(1)]);
if((state_val_26864 === (7))){
var inst_26859 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
var statearr_26865_26906 = state_26863__$1;
(statearr_26865_26906[(2)] = inst_26859);

(statearr_26865_26906[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (20))){
var inst_26829 = (state_26863[(7)]);
var inst_26840 = (state_26863[(2)]);
var inst_26841 = cljs.core.next.call(null,inst_26829);
var inst_26815 = inst_26841;
var inst_26816 = null;
var inst_26817 = (0);
var inst_26818 = (0);
var state_26863__$1 = (function (){var statearr_26866 = state_26863;
(statearr_26866[(8)] = inst_26818);

(statearr_26866[(9)] = inst_26815);

(statearr_26866[(10)] = inst_26816);

(statearr_26866[(11)] = inst_26817);

(statearr_26866[(12)] = inst_26840);

return statearr_26866;
})();
var statearr_26867_26907 = state_26863__$1;
(statearr_26867_26907[(2)] = null);

(statearr_26867_26907[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (1))){
var state_26863__$1 = state_26863;
var statearr_26868_26908 = state_26863__$1;
(statearr_26868_26908[(2)] = null);

(statearr_26868_26908[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (4))){
var inst_26804 = (state_26863[(13)]);
var inst_26804__$1 = (state_26863[(2)]);
var inst_26805 = (inst_26804__$1 == null);
var state_26863__$1 = (function (){var statearr_26869 = state_26863;
(statearr_26869[(13)] = inst_26804__$1);

return statearr_26869;
})();
if(cljs.core.truth_(inst_26805)){
var statearr_26870_26909 = state_26863__$1;
(statearr_26870_26909[(1)] = (5));

} else {
var statearr_26871_26910 = state_26863__$1;
(statearr_26871_26910[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (15))){
var state_26863__$1 = state_26863;
var statearr_26875_26911 = state_26863__$1;
(statearr_26875_26911[(2)] = null);

(statearr_26875_26911[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (21))){
var state_26863__$1 = state_26863;
var statearr_26876_26912 = state_26863__$1;
(statearr_26876_26912[(2)] = null);

(statearr_26876_26912[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (13))){
var inst_26818 = (state_26863[(8)]);
var inst_26815 = (state_26863[(9)]);
var inst_26816 = (state_26863[(10)]);
var inst_26817 = (state_26863[(11)]);
var inst_26825 = (state_26863[(2)]);
var inst_26826 = (inst_26818 + (1));
var tmp26872 = inst_26815;
var tmp26873 = inst_26816;
var tmp26874 = inst_26817;
var inst_26815__$1 = tmp26872;
var inst_26816__$1 = tmp26873;
var inst_26817__$1 = tmp26874;
var inst_26818__$1 = inst_26826;
var state_26863__$1 = (function (){var statearr_26877 = state_26863;
(statearr_26877[(8)] = inst_26818__$1);

(statearr_26877[(14)] = inst_26825);

(statearr_26877[(9)] = inst_26815__$1);

(statearr_26877[(10)] = inst_26816__$1);

(statearr_26877[(11)] = inst_26817__$1);

return statearr_26877;
})();
var statearr_26878_26913 = state_26863__$1;
(statearr_26878_26913[(2)] = null);

(statearr_26878_26913[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (22))){
var state_26863__$1 = state_26863;
var statearr_26879_26914 = state_26863__$1;
(statearr_26879_26914[(2)] = null);

(statearr_26879_26914[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (6))){
var inst_26804 = (state_26863[(13)]);
var inst_26813 = f.call(null,inst_26804);
var inst_26814 = cljs.core.seq.call(null,inst_26813);
var inst_26815 = inst_26814;
var inst_26816 = null;
var inst_26817 = (0);
var inst_26818 = (0);
var state_26863__$1 = (function (){var statearr_26880 = state_26863;
(statearr_26880[(8)] = inst_26818);

(statearr_26880[(9)] = inst_26815);

(statearr_26880[(10)] = inst_26816);

(statearr_26880[(11)] = inst_26817);

return statearr_26880;
})();
var statearr_26881_26915 = state_26863__$1;
(statearr_26881_26915[(2)] = null);

(statearr_26881_26915[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (17))){
var inst_26829 = (state_26863[(7)]);
var inst_26833 = cljs.core.chunk_first.call(null,inst_26829);
var inst_26834 = cljs.core.chunk_rest.call(null,inst_26829);
var inst_26835 = cljs.core.count.call(null,inst_26833);
var inst_26815 = inst_26834;
var inst_26816 = inst_26833;
var inst_26817 = inst_26835;
var inst_26818 = (0);
var state_26863__$1 = (function (){var statearr_26882 = state_26863;
(statearr_26882[(8)] = inst_26818);

(statearr_26882[(9)] = inst_26815);

(statearr_26882[(10)] = inst_26816);

(statearr_26882[(11)] = inst_26817);

return statearr_26882;
})();
var statearr_26883_26916 = state_26863__$1;
(statearr_26883_26916[(2)] = null);

(statearr_26883_26916[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (3))){
var inst_26861 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26863__$1,inst_26861);
} else {
if((state_val_26864 === (12))){
var inst_26849 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
var statearr_26884_26917 = state_26863__$1;
(statearr_26884_26917[(2)] = inst_26849);

(statearr_26884_26917[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (2))){
var state_26863__$1 = state_26863;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26863__$1,(4),in$);
} else {
if((state_val_26864 === (23))){
var inst_26857 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
var statearr_26885_26918 = state_26863__$1;
(statearr_26885_26918[(2)] = inst_26857);

(statearr_26885_26918[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (19))){
var inst_26844 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
var statearr_26886_26919 = state_26863__$1;
(statearr_26886_26919[(2)] = inst_26844);

(statearr_26886_26919[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (11))){
var inst_26829 = (state_26863[(7)]);
var inst_26815 = (state_26863[(9)]);
var inst_26829__$1 = cljs.core.seq.call(null,inst_26815);
var state_26863__$1 = (function (){var statearr_26887 = state_26863;
(statearr_26887[(7)] = inst_26829__$1);

return statearr_26887;
})();
if(inst_26829__$1){
var statearr_26888_26920 = state_26863__$1;
(statearr_26888_26920[(1)] = (14));

} else {
var statearr_26889_26921 = state_26863__$1;
(statearr_26889_26921[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (9))){
var inst_26851 = (state_26863[(2)]);
var inst_26852 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_26863__$1 = (function (){var statearr_26890 = state_26863;
(statearr_26890[(15)] = inst_26851);

return statearr_26890;
})();
if(cljs.core.truth_(inst_26852)){
var statearr_26891_26922 = state_26863__$1;
(statearr_26891_26922[(1)] = (21));

} else {
var statearr_26892_26923 = state_26863__$1;
(statearr_26892_26923[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (5))){
var inst_26807 = cljs.core.async.close_BANG_.call(null,out);
var state_26863__$1 = state_26863;
var statearr_26893_26924 = state_26863__$1;
(statearr_26893_26924[(2)] = inst_26807);

(statearr_26893_26924[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (14))){
var inst_26829 = (state_26863[(7)]);
var inst_26831 = cljs.core.chunked_seq_QMARK_.call(null,inst_26829);
var state_26863__$1 = state_26863;
if(inst_26831){
var statearr_26894_26925 = state_26863__$1;
(statearr_26894_26925[(1)] = (17));

} else {
var statearr_26895_26926 = state_26863__$1;
(statearr_26895_26926[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (16))){
var inst_26847 = (state_26863[(2)]);
var state_26863__$1 = state_26863;
var statearr_26896_26927 = state_26863__$1;
(statearr_26896_26927[(2)] = inst_26847);

(statearr_26896_26927[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26864 === (10))){
var inst_26818 = (state_26863[(8)]);
var inst_26816 = (state_26863[(10)]);
var inst_26823 = cljs.core._nth.call(null,inst_26816,inst_26818);
var state_26863__$1 = state_26863;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26863__$1,(13),out,inst_26823);
} else {
if((state_val_26864 === (18))){
var inst_26829 = (state_26863[(7)]);
var inst_26838 = cljs.core.first.call(null,inst_26829);
var state_26863__$1 = state_26863;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26863__$1,(20),out,inst_26838);
} else {
if((state_val_26864 === (8))){
var inst_26818 = (state_26863[(8)]);
var inst_26817 = (state_26863[(11)]);
var inst_26820 = (inst_26818 < inst_26817);
var inst_26821 = inst_26820;
var state_26863__$1 = state_26863;
if(cljs.core.truth_(inst_26821)){
var statearr_26897_26928 = state_26863__$1;
(statearr_26897_26928[(1)] = (10));

} else {
var statearr_26898_26929 = state_26863__$1;
(statearr_26898_26929[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto__))
;
return ((function (switch__19334__auto__,c__19399__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____0 = (function (){
var statearr_26902 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26902[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__);

(statearr_26902[(1)] = (1));

return statearr_26902;
});
var cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____1 = (function (state_26863){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26863);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26903){if((e26903 instanceof Object)){
var ex__19338__auto__ = e26903;
var statearr_26904_26930 = state_26863;
(statearr_26904_26930[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26863);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26903;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26931 = state_26863;
state_26863 = G__26931;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__ = function(state_26863){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____1.call(this,state_26863);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__19335__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__))
})();
var state__19401__auto__ = (function (){var statearr_26905 = f__19400__auto__.call(null);
(statearr_26905[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_26905;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__))
);

return c__19399__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args26932 = [];
var len__17377__auto___26935 = arguments.length;
var i__17378__auto___26936 = (0);
while(true){
if((i__17378__auto___26936 < len__17377__auto___26935)){
args26932.push((arguments[i__17378__auto___26936]));

var G__26937 = (i__17378__auto___26936 + (1));
i__17378__auto___26936 = G__26937;
continue;
} else {
}
break;
}

var G__26934 = args26932.length;
switch (G__26934) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26932.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args26939 = [];
var len__17377__auto___26942 = arguments.length;
var i__17378__auto___26943 = (0);
while(true){
if((i__17378__auto___26943 < len__17377__auto___26942)){
args26939.push((arguments[i__17378__auto___26943]));

var G__26944 = (i__17378__auto___26943 + (1));
i__17378__auto___26943 = G__26944;
continue;
} else {
}
break;
}

var G__26941 = args26939.length;
switch (G__26941) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26939.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args26946 = [];
var len__17377__auto___26997 = arguments.length;
var i__17378__auto___26998 = (0);
while(true){
if((i__17378__auto___26998 < len__17377__auto___26997)){
args26946.push((arguments[i__17378__auto___26998]));

var G__26999 = (i__17378__auto___26998 + (1));
i__17378__auto___26998 = G__26999;
continue;
} else {
}
break;
}

var G__26948 = args26946.length;
switch (G__26948) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26946.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___27001 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___27001,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___27001,out){
return (function (state_26972){
var state_val_26973 = (state_26972[(1)]);
if((state_val_26973 === (7))){
var inst_26967 = (state_26972[(2)]);
var state_26972__$1 = state_26972;
var statearr_26974_27002 = state_26972__$1;
(statearr_26974_27002[(2)] = inst_26967);

(statearr_26974_27002[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (1))){
var inst_26949 = null;
var state_26972__$1 = (function (){var statearr_26975 = state_26972;
(statearr_26975[(7)] = inst_26949);

return statearr_26975;
})();
var statearr_26976_27003 = state_26972__$1;
(statearr_26976_27003[(2)] = null);

(statearr_26976_27003[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (4))){
var inst_26952 = (state_26972[(8)]);
var inst_26952__$1 = (state_26972[(2)]);
var inst_26953 = (inst_26952__$1 == null);
var inst_26954 = cljs.core.not.call(null,inst_26953);
var state_26972__$1 = (function (){var statearr_26977 = state_26972;
(statearr_26977[(8)] = inst_26952__$1);

return statearr_26977;
})();
if(inst_26954){
var statearr_26978_27004 = state_26972__$1;
(statearr_26978_27004[(1)] = (5));

} else {
var statearr_26979_27005 = state_26972__$1;
(statearr_26979_27005[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (6))){
var state_26972__$1 = state_26972;
var statearr_26980_27006 = state_26972__$1;
(statearr_26980_27006[(2)] = null);

(statearr_26980_27006[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (3))){
var inst_26969 = (state_26972[(2)]);
var inst_26970 = cljs.core.async.close_BANG_.call(null,out);
var state_26972__$1 = (function (){var statearr_26981 = state_26972;
(statearr_26981[(9)] = inst_26969);

return statearr_26981;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26972__$1,inst_26970);
} else {
if((state_val_26973 === (2))){
var state_26972__$1 = state_26972;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26972__$1,(4),ch);
} else {
if((state_val_26973 === (11))){
var inst_26952 = (state_26972[(8)]);
var inst_26961 = (state_26972[(2)]);
var inst_26949 = inst_26952;
var state_26972__$1 = (function (){var statearr_26982 = state_26972;
(statearr_26982[(7)] = inst_26949);

(statearr_26982[(10)] = inst_26961);

return statearr_26982;
})();
var statearr_26983_27007 = state_26972__$1;
(statearr_26983_27007[(2)] = null);

(statearr_26983_27007[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (9))){
var inst_26952 = (state_26972[(8)]);
var state_26972__$1 = state_26972;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26972__$1,(11),out,inst_26952);
} else {
if((state_val_26973 === (5))){
var inst_26949 = (state_26972[(7)]);
var inst_26952 = (state_26972[(8)]);
var inst_26956 = cljs.core._EQ_.call(null,inst_26952,inst_26949);
var state_26972__$1 = state_26972;
if(inst_26956){
var statearr_26985_27008 = state_26972__$1;
(statearr_26985_27008[(1)] = (8));

} else {
var statearr_26986_27009 = state_26972__$1;
(statearr_26986_27009[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (10))){
var inst_26964 = (state_26972[(2)]);
var state_26972__$1 = state_26972;
var statearr_26987_27010 = state_26972__$1;
(statearr_26987_27010[(2)] = inst_26964);

(statearr_26987_27010[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26973 === (8))){
var inst_26949 = (state_26972[(7)]);
var tmp26984 = inst_26949;
var inst_26949__$1 = tmp26984;
var state_26972__$1 = (function (){var statearr_26988 = state_26972;
(statearr_26988[(7)] = inst_26949__$1);

return statearr_26988;
})();
var statearr_26989_27011 = state_26972__$1;
(statearr_26989_27011[(2)] = null);

(statearr_26989_27011[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___27001,out))
;
return ((function (switch__19334__auto__,c__19399__auto___27001,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_26993 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26993[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_26993[(1)] = (1));

return statearr_26993;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_26972){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_26972);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e26994){if((e26994 instanceof Object)){
var ex__19338__auto__ = e26994;
var statearr_26995_27012 = state_26972;
(statearr_26995_27012[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26972);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26994;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27013 = state_26972;
state_26972 = G__27013;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_26972){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_26972);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___27001,out))
})();
var state__19401__auto__ = (function (){var statearr_26996 = f__19400__auto__.call(null);
(statearr_26996[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___27001);

return statearr_26996;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___27001,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args27014 = [];
var len__17377__auto___27084 = arguments.length;
var i__17378__auto___27085 = (0);
while(true){
if((i__17378__auto___27085 < len__17377__auto___27084)){
args27014.push((arguments[i__17378__auto___27085]));

var G__27086 = (i__17378__auto___27085 + (1));
i__17378__auto___27085 = G__27086;
continue;
} else {
}
break;
}

var G__27016 = args27014.length;
switch (G__27016) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27014.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___27088 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___27088,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___27088,out){
return (function (state_27054){
var state_val_27055 = (state_27054[(1)]);
if((state_val_27055 === (7))){
var inst_27050 = (state_27054[(2)]);
var state_27054__$1 = state_27054;
var statearr_27056_27089 = state_27054__$1;
(statearr_27056_27089[(2)] = inst_27050);

(statearr_27056_27089[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (1))){
var inst_27017 = (new Array(n));
var inst_27018 = inst_27017;
var inst_27019 = (0);
var state_27054__$1 = (function (){var statearr_27057 = state_27054;
(statearr_27057[(7)] = inst_27018);

(statearr_27057[(8)] = inst_27019);

return statearr_27057;
})();
var statearr_27058_27090 = state_27054__$1;
(statearr_27058_27090[(2)] = null);

(statearr_27058_27090[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (4))){
var inst_27022 = (state_27054[(9)]);
var inst_27022__$1 = (state_27054[(2)]);
var inst_27023 = (inst_27022__$1 == null);
var inst_27024 = cljs.core.not.call(null,inst_27023);
var state_27054__$1 = (function (){var statearr_27059 = state_27054;
(statearr_27059[(9)] = inst_27022__$1);

return statearr_27059;
})();
if(inst_27024){
var statearr_27060_27091 = state_27054__$1;
(statearr_27060_27091[(1)] = (5));

} else {
var statearr_27061_27092 = state_27054__$1;
(statearr_27061_27092[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (15))){
var inst_27044 = (state_27054[(2)]);
var state_27054__$1 = state_27054;
var statearr_27062_27093 = state_27054__$1;
(statearr_27062_27093[(2)] = inst_27044);

(statearr_27062_27093[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (13))){
var state_27054__$1 = state_27054;
var statearr_27063_27094 = state_27054__$1;
(statearr_27063_27094[(2)] = null);

(statearr_27063_27094[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (6))){
var inst_27019 = (state_27054[(8)]);
var inst_27040 = (inst_27019 > (0));
var state_27054__$1 = state_27054;
if(cljs.core.truth_(inst_27040)){
var statearr_27064_27095 = state_27054__$1;
(statearr_27064_27095[(1)] = (12));

} else {
var statearr_27065_27096 = state_27054__$1;
(statearr_27065_27096[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (3))){
var inst_27052 = (state_27054[(2)]);
var state_27054__$1 = state_27054;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27054__$1,inst_27052);
} else {
if((state_val_27055 === (12))){
var inst_27018 = (state_27054[(7)]);
var inst_27042 = cljs.core.vec.call(null,inst_27018);
var state_27054__$1 = state_27054;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27054__$1,(15),out,inst_27042);
} else {
if((state_val_27055 === (2))){
var state_27054__$1 = state_27054;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27054__$1,(4),ch);
} else {
if((state_val_27055 === (11))){
var inst_27034 = (state_27054[(2)]);
var inst_27035 = (new Array(n));
var inst_27018 = inst_27035;
var inst_27019 = (0);
var state_27054__$1 = (function (){var statearr_27066 = state_27054;
(statearr_27066[(7)] = inst_27018);

(statearr_27066[(10)] = inst_27034);

(statearr_27066[(8)] = inst_27019);

return statearr_27066;
})();
var statearr_27067_27097 = state_27054__$1;
(statearr_27067_27097[(2)] = null);

(statearr_27067_27097[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (9))){
var inst_27018 = (state_27054[(7)]);
var inst_27032 = cljs.core.vec.call(null,inst_27018);
var state_27054__$1 = state_27054;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27054__$1,(11),out,inst_27032);
} else {
if((state_val_27055 === (5))){
var inst_27018 = (state_27054[(7)]);
var inst_27019 = (state_27054[(8)]);
var inst_27027 = (state_27054[(11)]);
var inst_27022 = (state_27054[(9)]);
var inst_27026 = (inst_27018[inst_27019] = inst_27022);
var inst_27027__$1 = (inst_27019 + (1));
var inst_27028 = (inst_27027__$1 < n);
var state_27054__$1 = (function (){var statearr_27068 = state_27054;
(statearr_27068[(12)] = inst_27026);

(statearr_27068[(11)] = inst_27027__$1);

return statearr_27068;
})();
if(cljs.core.truth_(inst_27028)){
var statearr_27069_27098 = state_27054__$1;
(statearr_27069_27098[(1)] = (8));

} else {
var statearr_27070_27099 = state_27054__$1;
(statearr_27070_27099[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (14))){
var inst_27047 = (state_27054[(2)]);
var inst_27048 = cljs.core.async.close_BANG_.call(null,out);
var state_27054__$1 = (function (){var statearr_27072 = state_27054;
(statearr_27072[(13)] = inst_27047);

return statearr_27072;
})();
var statearr_27073_27100 = state_27054__$1;
(statearr_27073_27100[(2)] = inst_27048);

(statearr_27073_27100[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (10))){
var inst_27038 = (state_27054[(2)]);
var state_27054__$1 = state_27054;
var statearr_27074_27101 = state_27054__$1;
(statearr_27074_27101[(2)] = inst_27038);

(statearr_27074_27101[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27055 === (8))){
var inst_27018 = (state_27054[(7)]);
var inst_27027 = (state_27054[(11)]);
var tmp27071 = inst_27018;
var inst_27018__$1 = tmp27071;
var inst_27019 = inst_27027;
var state_27054__$1 = (function (){var statearr_27075 = state_27054;
(statearr_27075[(7)] = inst_27018__$1);

(statearr_27075[(8)] = inst_27019);

return statearr_27075;
})();
var statearr_27076_27102 = state_27054__$1;
(statearr_27076_27102[(2)] = null);

(statearr_27076_27102[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___27088,out))
;
return ((function (switch__19334__auto__,c__19399__auto___27088,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_27080 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27080[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_27080[(1)] = (1));

return statearr_27080;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_27054){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_27054);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e27081){if((e27081 instanceof Object)){
var ex__19338__auto__ = e27081;
var statearr_27082_27103 = state_27054;
(statearr_27082_27103[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27054);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27081;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27104 = state_27054;
state_27054 = G__27104;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_27054){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_27054);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___27088,out))
})();
var state__19401__auto__ = (function (){var statearr_27083 = f__19400__auto__.call(null);
(statearr_27083[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___27088);

return statearr_27083;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___27088,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args27105 = [];
var len__17377__auto___27179 = arguments.length;
var i__17378__auto___27180 = (0);
while(true){
if((i__17378__auto___27180 < len__17377__auto___27179)){
args27105.push((arguments[i__17378__auto___27180]));

var G__27181 = (i__17378__auto___27180 + (1));
i__17378__auto___27180 = G__27181;
continue;
} else {
}
break;
}

var G__27107 = args27105.length;
switch (G__27107) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27105.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19399__auto___27183 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___27183,out){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___27183,out){
return (function (state_27149){
var state_val_27150 = (state_27149[(1)]);
if((state_val_27150 === (7))){
var inst_27145 = (state_27149[(2)]);
var state_27149__$1 = state_27149;
var statearr_27151_27184 = state_27149__$1;
(statearr_27151_27184[(2)] = inst_27145);

(statearr_27151_27184[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (1))){
var inst_27108 = [];
var inst_27109 = inst_27108;
var inst_27110 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_27149__$1 = (function (){var statearr_27152 = state_27149;
(statearr_27152[(7)] = inst_27109);

(statearr_27152[(8)] = inst_27110);

return statearr_27152;
})();
var statearr_27153_27185 = state_27149__$1;
(statearr_27153_27185[(2)] = null);

(statearr_27153_27185[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (4))){
var inst_27113 = (state_27149[(9)]);
var inst_27113__$1 = (state_27149[(2)]);
var inst_27114 = (inst_27113__$1 == null);
var inst_27115 = cljs.core.not.call(null,inst_27114);
var state_27149__$1 = (function (){var statearr_27154 = state_27149;
(statearr_27154[(9)] = inst_27113__$1);

return statearr_27154;
})();
if(inst_27115){
var statearr_27155_27186 = state_27149__$1;
(statearr_27155_27186[(1)] = (5));

} else {
var statearr_27156_27187 = state_27149__$1;
(statearr_27156_27187[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (15))){
var inst_27139 = (state_27149[(2)]);
var state_27149__$1 = state_27149;
var statearr_27157_27188 = state_27149__$1;
(statearr_27157_27188[(2)] = inst_27139);

(statearr_27157_27188[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (13))){
var state_27149__$1 = state_27149;
var statearr_27158_27189 = state_27149__$1;
(statearr_27158_27189[(2)] = null);

(statearr_27158_27189[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (6))){
var inst_27109 = (state_27149[(7)]);
var inst_27134 = inst_27109.length;
var inst_27135 = (inst_27134 > (0));
var state_27149__$1 = state_27149;
if(cljs.core.truth_(inst_27135)){
var statearr_27159_27190 = state_27149__$1;
(statearr_27159_27190[(1)] = (12));

} else {
var statearr_27160_27191 = state_27149__$1;
(statearr_27160_27191[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (3))){
var inst_27147 = (state_27149[(2)]);
var state_27149__$1 = state_27149;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27149__$1,inst_27147);
} else {
if((state_val_27150 === (12))){
var inst_27109 = (state_27149[(7)]);
var inst_27137 = cljs.core.vec.call(null,inst_27109);
var state_27149__$1 = state_27149;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27149__$1,(15),out,inst_27137);
} else {
if((state_val_27150 === (2))){
var state_27149__$1 = state_27149;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27149__$1,(4),ch);
} else {
if((state_val_27150 === (11))){
var inst_27113 = (state_27149[(9)]);
var inst_27117 = (state_27149[(10)]);
var inst_27127 = (state_27149[(2)]);
var inst_27128 = [];
var inst_27129 = inst_27128.push(inst_27113);
var inst_27109 = inst_27128;
var inst_27110 = inst_27117;
var state_27149__$1 = (function (){var statearr_27161 = state_27149;
(statearr_27161[(11)] = inst_27129);

(statearr_27161[(12)] = inst_27127);

(statearr_27161[(7)] = inst_27109);

(statearr_27161[(8)] = inst_27110);

return statearr_27161;
})();
var statearr_27162_27192 = state_27149__$1;
(statearr_27162_27192[(2)] = null);

(statearr_27162_27192[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (9))){
var inst_27109 = (state_27149[(7)]);
var inst_27125 = cljs.core.vec.call(null,inst_27109);
var state_27149__$1 = state_27149;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27149__$1,(11),out,inst_27125);
} else {
if((state_val_27150 === (5))){
var inst_27113 = (state_27149[(9)]);
var inst_27110 = (state_27149[(8)]);
var inst_27117 = (state_27149[(10)]);
var inst_27117__$1 = f.call(null,inst_27113);
var inst_27118 = cljs.core._EQ_.call(null,inst_27117__$1,inst_27110);
var inst_27119 = cljs.core.keyword_identical_QMARK_.call(null,inst_27110,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_27120 = (inst_27118) || (inst_27119);
var state_27149__$1 = (function (){var statearr_27163 = state_27149;
(statearr_27163[(10)] = inst_27117__$1);

return statearr_27163;
})();
if(cljs.core.truth_(inst_27120)){
var statearr_27164_27193 = state_27149__$1;
(statearr_27164_27193[(1)] = (8));

} else {
var statearr_27165_27194 = state_27149__$1;
(statearr_27165_27194[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (14))){
var inst_27142 = (state_27149[(2)]);
var inst_27143 = cljs.core.async.close_BANG_.call(null,out);
var state_27149__$1 = (function (){var statearr_27167 = state_27149;
(statearr_27167[(13)] = inst_27142);

return statearr_27167;
})();
var statearr_27168_27195 = state_27149__$1;
(statearr_27168_27195[(2)] = inst_27143);

(statearr_27168_27195[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (10))){
var inst_27132 = (state_27149[(2)]);
var state_27149__$1 = state_27149;
var statearr_27169_27196 = state_27149__$1;
(statearr_27169_27196[(2)] = inst_27132);

(statearr_27169_27196[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27150 === (8))){
var inst_27113 = (state_27149[(9)]);
var inst_27109 = (state_27149[(7)]);
var inst_27117 = (state_27149[(10)]);
var inst_27122 = inst_27109.push(inst_27113);
var tmp27166 = inst_27109;
var inst_27109__$1 = tmp27166;
var inst_27110 = inst_27117;
var state_27149__$1 = (function (){var statearr_27170 = state_27149;
(statearr_27170[(7)] = inst_27109__$1);

(statearr_27170[(14)] = inst_27122);

(statearr_27170[(8)] = inst_27110);

return statearr_27170;
})();
var statearr_27171_27197 = state_27149__$1;
(statearr_27171_27197[(2)] = null);

(statearr_27171_27197[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});})(c__19399__auto___27183,out))
;
return ((function (switch__19334__auto__,c__19399__auto___27183,out){
return (function() {
var cljs$core$async$state_machine__19335__auto__ = null;
var cljs$core$async$state_machine__19335__auto____0 = (function (){
var statearr_27175 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27175[(0)] = cljs$core$async$state_machine__19335__auto__);

(statearr_27175[(1)] = (1));

return statearr_27175;
});
var cljs$core$async$state_machine__19335__auto____1 = (function (state_27149){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_27149);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e27176){if((e27176 instanceof Object)){
var ex__19338__auto__ = e27176;
var statearr_27177_27198 = state_27149;
(statearr_27177_27198[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27149);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27176;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27199 = state_27149;
state_27149 = G__27199;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs$core$async$state_machine__19335__auto__ = function(state_27149){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19335__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19335__auto____1.call(this,state_27149);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19335__auto____0;
cljs$core$async$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19335__auto____1;
return cljs$core$async$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___27183,out))
})();
var state__19401__auto__ = (function (){var statearr_27178 = f__19400__auto__.call(null);
(statearr_27178[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___27183);

return statearr_27178;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___27183,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map?rel=1446554831115