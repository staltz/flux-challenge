// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('cljs.core.async.impl.buffers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.buffers.acopy = (function cljs$core$async$impl$buffers$acopy(src,src_start,dest,dest_start,len){
var cnt = (0);
while(true){
if((cnt < len)){
(dest[(dest_start + cnt)] = (src[(src_start + cnt)]));

var G__25869 = (cnt + (1));
cnt = G__25869;
continue;
} else {
return null;
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.async.impl.buffers.Object}
*/
cljs.core.async.impl.buffers.RingBuffer = (function (head,tail,length,arr){
this.head = head;
this.tail = tail;
this.length = length;
this.arr = arr;
})
cljs.core.async.impl.buffers.RingBuffer.prototype.pop = (function (){
var self__ = this;
var _ = this;
if((self__.length === (0))){
return null;
} else {
var x = (self__.arr[self__.tail]);
(self__.arr[self__.tail] = null);

self__.tail = ((self__.tail + (1)) % self__.arr.length);

self__.length = (self__.length - (1));

return x;
}
});

cljs.core.async.impl.buffers.RingBuffer.prototype.unshift = (function (x){
var self__ = this;
var _ = this;
(self__.arr[self__.head] = x);

self__.head = ((self__.head + (1)) % self__.arr.length);

self__.length = (self__.length + (1));

return null;
});

cljs.core.async.impl.buffers.RingBuffer.prototype.unbounded_unshift = (function (x){
var self__ = this;
var this$ = this;
if(((self__.length + (1)) === self__.arr.length)){
this$.resize();
} else {
}

return this$.unshift(x);
});

cljs.core.async.impl.buffers.RingBuffer.prototype.resize = (function (){
var self__ = this;
var _ = this;
var new_arr_size = (self__.arr.length * (2));
var new_arr = (new Array(new_arr_size));
if((self__.tail < self__.head)){
cljs.core.async.impl.buffers.acopy(self__.arr,self__.tail,new_arr,(0),self__.length);

self__.tail = (0);

self__.head = self__.length;

return self__.arr = new_arr;
} else {
if((self__.tail > self__.head)){
cljs.core.async.impl.buffers.acopy(self__.arr,self__.tail,new_arr,(0),(self__.arr.length - self__.tail));

cljs.core.async.impl.buffers.acopy(self__.arr,(0),new_arr,(self__.arr.length - self__.tail),self__.head);

self__.tail = (0);

self__.head = self__.length;

return self__.arr = new_arr;
} else {
if((self__.tail === self__.head)){
self__.tail = (0);

self__.head = (0);

return self__.arr = new_arr;
} else {
return null;
}
}
}
});

cljs.core.async.impl.buffers.RingBuffer.prototype.cleanup = (function (keep_QMARK_){
var self__ = this;
var this$ = this;
var n__19146__auto__ = self__.length;
var x = (0);
while(true){
if((x < n__19146__auto__)){
var v_25870 = this$.pop();
if((keep_QMARK_.cljs$core$IFn$_invoke$arity$1 ? keep_QMARK_.cljs$core$IFn$_invoke$arity$1(v_25870) : keep_QMARK_.call(null,v_25870))){
this$.unshift(v_25870);
} else {
}

var G__25871 = (x + (1));
x = G__25871;
continue;
} else {
return null;
}
break;
}
});

cljs.core.async.impl.buffers.RingBuffer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$head,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$tail,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$length,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$arr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.core.async.impl.buffers.RingBuffer.cljs$lang$type = true;

cljs.core.async.impl.buffers.RingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/RingBuffer";

cljs.core.async.impl.buffers.RingBuffer.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async.impl.buffers/RingBuffer");
});

cljs.core.async.impl.buffers.__GT_RingBuffer = (function cljs$core$async$impl$buffers$__GT_RingBuffer(head,tail,length,arr){
return (new cljs.core.async.impl.buffers.RingBuffer(head,tail,length,arr));
});

cljs.core.async.impl.buffers.ring_buffer = (function cljs$core$async$impl$buffers$ring_buffer(n){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Can't create a ring buffer of size 0"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$_GT_,cljs.core.cst$sym$n,(0))], 0)))].join('')));
}

return (new cljs.core.async.impl.buffers.RingBuffer((0),(0),(0),(new Array(n))));
});

/**
* @constructor
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.Buffer}
*/
cljs.core.async.impl.buffers.FixedBuffer = (function (buf,n){
this.buf = buf;
this.n = n;
this.cljs$lang$protocol_mask$partition0$ = 2;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = true;

cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return (self__.buf.length === self__.n);
});

cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.pop();
});

cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG__STAR_$arity$2 = (function (this$,itm){
var self__ = this;
var this$__$1 = this;
self__.buf.unbounded_unshift(itm);

return this$__$1;
});

cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$close_buf_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
});

cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.length;
});

cljs.core.async.impl.buffers.FixedBuffer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$buf,cljs.core.cst$sym$n], null);
});

cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$type = true;

cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/FixedBuffer";

cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async.impl.buffers/FixedBuffer");
});

cljs.core.async.impl.buffers.__GT_FixedBuffer = (function cljs$core$async$impl$buffers$__GT_FixedBuffer(buf,n){
return (new cljs.core.async.impl.buffers.FixedBuffer(buf,n));
});

cljs.core.async.impl.buffers.fixed_buffer = (function cljs$core$async$impl$buffers$fixed_buffer(n){
return (new cljs.core.async.impl.buffers.FixedBuffer(cljs.core.async.impl.buffers.ring_buffer(n),n));
});

/**
* @constructor
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.UnblockingBuffer}
 * @implements {cljs.core.async.impl.protocols.Buffer}
*/
cljs.core.async.impl.buffers.DroppingBuffer = (function (buf,n){
this.buf = buf;
this.n = n;
this.cljs$lang$protocol_mask$partition0$ = 2;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$UnblockingBuffer$ = true;

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = true;

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return false;
});

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.pop();
});

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG__STAR_$arity$2 = (function (this$,itm){
var self__ = this;
var this$__$1 = this;
if((self__.buf.length === self__.n)){
} else {
self__.buf.unshift(itm);
}

return this$__$1;
});

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$close_buf_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
});

cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.length;
});

cljs.core.async.impl.buffers.DroppingBuffer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$buf,cljs.core.cst$sym$n], null);
});

cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$type = true;

cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/DroppingBuffer";

cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async.impl.buffers/DroppingBuffer");
});

cljs.core.async.impl.buffers.__GT_DroppingBuffer = (function cljs$core$async$impl$buffers$__GT_DroppingBuffer(buf,n){
return (new cljs.core.async.impl.buffers.DroppingBuffer(buf,n));
});

cljs.core.async.impl.buffers.dropping_buffer = (function cljs$core$async$impl$buffers$dropping_buffer(n){
return (new cljs.core.async.impl.buffers.DroppingBuffer(cljs.core.async.impl.buffers.ring_buffer(n),n));
});

/**
* @constructor
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.UnblockingBuffer}
 * @implements {cljs.core.async.impl.protocols.Buffer}
*/
cljs.core.async.impl.buffers.SlidingBuffer = (function (buf,n){
this.buf = buf;
this.n = n;
this.cljs$lang$protocol_mask$partition0$ = 2;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$UnblockingBuffer$ = true;

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = true;

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return false;
});

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.pop();
});

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG__STAR_$arity$2 = (function (this$,itm){
var self__ = this;
var this$__$1 = this;
if((self__.buf.length === self__.n)){
cljs.core.async.impl.protocols.remove_BANG_(this$__$1);
} else {
}

self__.buf.unshift(itm);

return this$__$1;
});

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$close_buf_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return null;
});

cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.buf.length;
});

cljs.core.async.impl.buffers.SlidingBuffer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$buf,cljs.core.cst$sym$n], null);
});

cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$type = true;

cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/SlidingBuffer";

cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async.impl.buffers/SlidingBuffer");
});

cljs.core.async.impl.buffers.__GT_SlidingBuffer = (function cljs$core$async$impl$buffers$__GT_SlidingBuffer(buf,n){
return (new cljs.core.async.impl.buffers.SlidingBuffer(buf,n));
});

cljs.core.async.impl.buffers.sliding_buffer = (function cljs$core$async$impl$buffers$sliding_buffer(n){
return (new cljs.core.async.impl.buffers.SlidingBuffer(cljs.core.async.impl.buffers.ring_buffer(n),n));
});
if(typeof cljs.core.async.impl.buffers.NO_VAL !== 'undefined'){
} else {
cljs.core.async.impl.buffers.NO_VAL = (new Object());
}
cljs.core.async.impl.buffers.undelivered_QMARK_ = (function cljs$core$async$impl$buffers$undelivered_QMARK_(val){
return (cljs.core.async.impl.buffers.NO_VAL === val);
});

/**
* @constructor
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.UnblockingBuffer}
 * @implements {cljs.core.async.impl.protocols.Buffer}
*/
cljs.core.async.impl.buffers.PromiseBuffer = (function (val){
this.val = val;
this.cljs$lang$protocol_mask$partition0$ = 2;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$UnblockingBuffer$ = true;

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = true;

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return false;
});

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.val;
});

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG__STAR_$arity$2 = (function (this$,itm){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(cljs.core.async.impl.buffers.undelivered_QMARK_(self__.val))){
self__.val = itm;
} else {
}

return this$__$1;
});

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$async$impl$protocols$Buffer$close_buf_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(cljs.core.async.impl.buffers.undelivered_QMARK_(self__.val))){
return self__.val = null;
} else {
return null;
}
});

cljs.core.async.impl.buffers.PromiseBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(cljs.core.async.impl.buffers.undelivered_QMARK_(self__.val))){
return (0);
} else {
return (1);
}
});

cljs.core.async.impl.buffers.PromiseBuffer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$val,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.core.async.impl.buffers.PromiseBuffer.cljs$lang$type = true;

cljs.core.async.impl.buffers.PromiseBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/PromiseBuffer";

cljs.core.async.impl.buffers.PromiseBuffer.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"cljs.core.async.impl.buffers/PromiseBuffer");
});

cljs.core.async.impl.buffers.__GT_PromiseBuffer = (function cljs$core$async$impl$buffers$__GT_PromiseBuffer(val){
return (new cljs.core.async.impl.buffers.PromiseBuffer(val));
});

cljs.core.async.impl.buffers.promise_buffer = (function cljs$core$async$impl$buffers$promise_buffer(){
return (new cljs.core.async.impl.buffers.PromiseBuffer(cljs.core.async.impl.buffers.NO_VAL));
});
