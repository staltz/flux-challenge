// Compiled by ClojureScript 1.7.122 {}
goog.provide('cognitect.transit');
goog.require('cljs.core');
goog.require('com.cognitect.transit');
goog.require('com.cognitect.transit.types');
goog.require('com.cognitect.transit.eq');
goog.require('goog.math.Long');
cljs.core.UUID.prototype.cljs$core$IEquiv$ = true;

cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
if((other instanceof cljs.core.UUID)){
return (this$__$1.uuid === other.uuid);
} else {
if((other instanceof com.cognitect.transit.types.UUID)){
return (this$__$1.uuid === other.toString());
} else {
return false;

}
}
});
cljs.core.UUID.prototype.cljs$core$IComparable$ = true;

cljs.core.UUID.prototype.cljs$core$IComparable$_compare$arity$2 = (function (this$,other){
var this$__$1 = this;
if(((other instanceof cljs.core.UUID)) || ((other instanceof com.cognitect.transit.types.UUID))){
return cljs.core.compare.call(null,this$__$1.toString(),other.toString());
} else {
throw (new Error([cljs.core.str("Cannot compare "),cljs.core.str(this$__$1),cljs.core.str(" to "),cljs.core.str(other)].join('')));
}
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IComparable$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IComparable$_compare$arity$2 = (function (this$,other){
var this$__$1 = this;
if(((other instanceof cljs.core.UUID)) || ((other instanceof com.cognitect.transit.types.UUID))){
return cljs.core.compare.call(null,this$__$1.toString(),other.toString());
} else {
throw (new Error([cljs.core.str("Cannot compare "),cljs.core.str(this$__$1),cljs.core.str(" to "),cljs.core.str(other)].join('')));
}
});
goog.math.Long.prototype.cljs$core$IEquiv$ = true;

goog.math.Long.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
return this$__$1.equiv(other);
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
if((other instanceof cljs.core.UUID)){
return cljs.core._equiv.call(null,other,this$__$1);
} else {
return this$__$1.equiv(other);
}
});

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$ = true;

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
return this$__$1.equiv(other);
});
goog.math.Long.prototype.cljs$core$IHash$ = true;

goog.math.Long.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$ = true;

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});
com.cognitect.transit.types.UUID.prototype.cljs$core$IPrintWithWriter$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (uuid,writer,_){
var uuid__$1 = this;
return cljs.core._write.call(null,writer,[cljs.core.str("#uuid \""),cljs.core.str(uuid__$1.toString()),cljs.core.str("\"")].join(''));
});
cognitect.transit.opts_merge = (function cognitect$transit$opts_merge(a,b){
var seq__23631_23635 = cljs.core.seq.call(null,cljs.core.js_keys.call(null,b));
var chunk__23632_23636 = null;
var count__23633_23637 = (0);
var i__23634_23638 = (0);
while(true){
if((i__23634_23638 < count__23633_23637)){
var k_23639 = cljs.core._nth.call(null,chunk__23632_23636,i__23634_23638);
var v_23640 = (b[k_23639]);
(a[k_23639] = v_23640);

var G__23641 = seq__23631_23635;
var G__23642 = chunk__23632_23636;
var G__23643 = count__23633_23637;
var G__23644 = (i__23634_23638 + (1));
seq__23631_23635 = G__23641;
chunk__23632_23636 = G__23642;
count__23633_23637 = G__23643;
i__23634_23638 = G__23644;
continue;
} else {
var temp__4425__auto___23645 = cljs.core.seq.call(null,seq__23631_23635);
if(temp__4425__auto___23645){
var seq__23631_23646__$1 = temp__4425__auto___23645;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23631_23646__$1)){
var c__17122__auto___23647 = cljs.core.chunk_first.call(null,seq__23631_23646__$1);
var G__23648 = cljs.core.chunk_rest.call(null,seq__23631_23646__$1);
var G__23649 = c__17122__auto___23647;
var G__23650 = cljs.core.count.call(null,c__17122__auto___23647);
var G__23651 = (0);
seq__23631_23635 = G__23648;
chunk__23632_23636 = G__23649;
count__23633_23637 = G__23650;
i__23634_23638 = G__23651;
continue;
} else {
var k_23652 = cljs.core.first.call(null,seq__23631_23646__$1);
var v_23653 = (b[k_23652]);
(a[k_23652] = v_23653);

var G__23654 = cljs.core.next.call(null,seq__23631_23646__$1);
var G__23655 = null;
var G__23656 = (0);
var G__23657 = (0);
seq__23631_23635 = G__23654;
chunk__23632_23636 = G__23655;
count__23633_23637 = G__23656;
i__23634_23638 = G__23657;
continue;
}
} else {
}
}
break;
}

return a;
});

/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.MapBuilder = (function (){
})
cognitect.transit.MapBuilder.prototype.init = (function (node){
var self__ = this;
var _ = this;
return cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

cognitect.transit.MapBuilder.prototype.add = (function (m,k,v,node){
var self__ = this;
var _ = this;
return cljs.core.assoc_BANG_.call(null,m,k,v);
});

cognitect.transit.MapBuilder.prototype.finalize = (function (m,node){
var self__ = this;
var _ = this;
return cljs.core.persistent_BANG_.call(null,m);
});

cognitect.transit.MapBuilder.prototype.fromArray = (function (arr,node){
var self__ = this;
var _ = this;
return cljs.core.PersistentArrayMap.fromArray.call(null,arr,true,true);
});

cognitect.transit.MapBuilder.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.MapBuilder.cljs$lang$type = true;

cognitect.transit.MapBuilder.cljs$lang$ctorStr = "cognitect.transit/MapBuilder";

cognitect.transit.MapBuilder.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/MapBuilder");
});

cognitect.transit.__GT_MapBuilder = (function cognitect$transit$__GT_MapBuilder(){
return (new cognitect.transit.MapBuilder());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.VectorBuilder = (function (){
})
cognitect.transit.VectorBuilder.prototype.init = (function (node){
var self__ = this;
var _ = this;
return cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
});

cognitect.transit.VectorBuilder.prototype.add = (function (v,x,node){
var self__ = this;
var _ = this;
return cljs.core.conj_BANG_.call(null,v,x);
});

cognitect.transit.VectorBuilder.prototype.finalize = (function (v,node){
var self__ = this;
var _ = this;
return cljs.core.persistent_BANG_.call(null,v);
});

cognitect.transit.VectorBuilder.prototype.fromArray = (function (arr,node){
var self__ = this;
var _ = this;
return cljs.core.PersistentVector.fromArray.call(null,arr,true);
});

cognitect.transit.VectorBuilder.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.VectorBuilder.cljs$lang$type = true;

cognitect.transit.VectorBuilder.cljs$lang$ctorStr = "cognitect.transit/VectorBuilder";

cognitect.transit.VectorBuilder.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/VectorBuilder");
});

cognitect.transit.__GT_VectorBuilder = (function cognitect$transit$__GT_VectorBuilder(){
return (new cognitect.transit.VectorBuilder());
});

/**
 * Return a transit reader. type may be either :json or :json-verbose.
 * opts may be a map optionally containing a :handlers entry. The value
 * of :handlers should be map from tag to a decoder function which returns
 * then in-memory representation of the semantic transit value.
 */
cognitect.transit.reader = (function cognitect$transit$reader(var_args){
var args23658 = [];
var len__17377__auto___23661 = arguments.length;
var i__17378__auto___23662 = (0);
while(true){
if((i__17378__auto___23662 < len__17377__auto___23661)){
args23658.push((arguments[i__17378__auto___23662]));

var G__23663 = (i__17378__auto___23662 + (1));
i__17378__auto___23662 = G__23663;
continue;
} else {
}
break;
}

var G__23660 = args23658.length;
switch (G__23660) {
case 1:
return cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23658.length)].join('')));

}
});

cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1 = (function (type){
return cognitect.transit.reader.call(null,type,null);
});

cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2 = (function (type,opts){
return com.cognitect.transit.reader.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"handlers": cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 5, ["$",(function (v){
return cljs.core.symbol.call(null,v);
}),":",(function (v){
return cljs.core.keyword.call(null,v);
}),"set",(function (v){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,v);
}),"list",(function (v){
return cljs.core.into.call(null,cljs.core.List.EMPTY,v.reverse());
}),"cmap",(function (v){
var i = (0);
var ret = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i < v.length)){
var G__23665 = (i + (2));
var G__23666 = cljs.core.assoc_BANG_.call(null,ret,(v[i]),(v[(i + (1))]));
i = G__23665;
ret = G__23666;
continue;
} else {
return cljs.core.persistent_BANG_.call(null,ret);
}
break;
}
})], null),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts))), "mapBuilder": (new cognitect.transit.MapBuilder()), "arrayBuilder": (new cognitect.transit.VectorBuilder()), "prefersStrings": false},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});

cognitect.transit.reader.cljs$lang$maxFixedArity = 2;
/**
 * Read a transit encoded string into ClojureScript values given a 
 * transit reader.
 */
cognitect.transit.read = (function cognitect$transit$read(r,str){
return r.read(str);
});

/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.KeywordHandler = (function (){
})
cognitect.transit.KeywordHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return ":";
});

cognitect.transit.KeywordHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.fqn;
});

cognitect.transit.KeywordHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return v.fqn;
});

cognitect.transit.KeywordHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.KeywordHandler.cljs$lang$type = true;

cognitect.transit.KeywordHandler.cljs$lang$ctorStr = "cognitect.transit/KeywordHandler";

cognitect.transit.KeywordHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/KeywordHandler");
});

cognitect.transit.__GT_KeywordHandler = (function cognitect$transit$__GT_KeywordHandler(){
return (new cognitect.transit.KeywordHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.SymbolHandler = (function (){
})
cognitect.transit.SymbolHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "$";
});

cognitect.transit.SymbolHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.str;
});

cognitect.transit.SymbolHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return v.str;
});

cognitect.transit.SymbolHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.SymbolHandler.cljs$lang$type = true;

cognitect.transit.SymbolHandler.cljs$lang$ctorStr = "cognitect.transit/SymbolHandler";

cognitect.transit.SymbolHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/SymbolHandler");
});

cognitect.transit.__GT_SymbolHandler = (function cognitect$transit$__GT_SymbolHandler(){
return (new cognitect.transit.SymbolHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.ListHandler = (function (){
})
cognitect.transit.ListHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "list";
});

cognitect.transit.ListHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__23667_23671 = cljs.core.seq.call(null,v);
var chunk__23668_23672 = null;
var count__23669_23673 = (0);
var i__23670_23674 = (0);
while(true){
if((i__23670_23674 < count__23669_23673)){
var x_23675 = cljs.core._nth.call(null,chunk__23668_23672,i__23670_23674);
ret.push(x_23675);

var G__23676 = seq__23667_23671;
var G__23677 = chunk__23668_23672;
var G__23678 = count__23669_23673;
var G__23679 = (i__23670_23674 + (1));
seq__23667_23671 = G__23676;
chunk__23668_23672 = G__23677;
count__23669_23673 = G__23678;
i__23670_23674 = G__23679;
continue;
} else {
var temp__4425__auto___23680 = cljs.core.seq.call(null,seq__23667_23671);
if(temp__4425__auto___23680){
var seq__23667_23681__$1 = temp__4425__auto___23680;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23667_23681__$1)){
var c__17122__auto___23682 = cljs.core.chunk_first.call(null,seq__23667_23681__$1);
var G__23683 = cljs.core.chunk_rest.call(null,seq__23667_23681__$1);
var G__23684 = c__17122__auto___23682;
var G__23685 = cljs.core.count.call(null,c__17122__auto___23682);
var G__23686 = (0);
seq__23667_23671 = G__23683;
chunk__23668_23672 = G__23684;
count__23669_23673 = G__23685;
i__23670_23674 = G__23686;
continue;
} else {
var x_23687 = cljs.core.first.call(null,seq__23667_23681__$1);
ret.push(x_23687);

var G__23688 = cljs.core.next.call(null,seq__23667_23681__$1);
var G__23689 = null;
var G__23690 = (0);
var G__23691 = (0);
seq__23667_23671 = G__23688;
chunk__23668_23672 = G__23689;
count__23669_23673 = G__23690;
i__23670_23674 = G__23691;
continue;
}
} else {
}
}
break;
}

return com.cognitect.transit.tagged.call(null,"array",ret);
});

cognitect.transit.ListHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.ListHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.ListHandler.cljs$lang$type = true;

cognitect.transit.ListHandler.cljs$lang$ctorStr = "cognitect.transit/ListHandler";

cognitect.transit.ListHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/ListHandler");
});

cognitect.transit.__GT_ListHandler = (function cognitect$transit$__GT_ListHandler(){
return (new cognitect.transit.ListHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.MapHandler = (function (){
})
cognitect.transit.MapHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "map";
});

cognitect.transit.MapHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v;
});

cognitect.transit.MapHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.MapHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.MapHandler.cljs$lang$type = true;

cognitect.transit.MapHandler.cljs$lang$ctorStr = "cognitect.transit/MapHandler";

cognitect.transit.MapHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/MapHandler");
});

cognitect.transit.__GT_MapHandler = (function cognitect$transit$__GT_MapHandler(){
return (new cognitect.transit.MapHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.SetHandler = (function (){
})
cognitect.transit.SetHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "set";
});

cognitect.transit.SetHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__23692_23696 = cljs.core.seq.call(null,v);
var chunk__23693_23697 = null;
var count__23694_23698 = (0);
var i__23695_23699 = (0);
while(true){
if((i__23695_23699 < count__23694_23698)){
var x_23700 = cljs.core._nth.call(null,chunk__23693_23697,i__23695_23699);
ret.push(x_23700);

var G__23701 = seq__23692_23696;
var G__23702 = chunk__23693_23697;
var G__23703 = count__23694_23698;
var G__23704 = (i__23695_23699 + (1));
seq__23692_23696 = G__23701;
chunk__23693_23697 = G__23702;
count__23694_23698 = G__23703;
i__23695_23699 = G__23704;
continue;
} else {
var temp__4425__auto___23705 = cljs.core.seq.call(null,seq__23692_23696);
if(temp__4425__auto___23705){
var seq__23692_23706__$1 = temp__4425__auto___23705;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23692_23706__$1)){
var c__17122__auto___23707 = cljs.core.chunk_first.call(null,seq__23692_23706__$1);
var G__23708 = cljs.core.chunk_rest.call(null,seq__23692_23706__$1);
var G__23709 = c__17122__auto___23707;
var G__23710 = cljs.core.count.call(null,c__17122__auto___23707);
var G__23711 = (0);
seq__23692_23696 = G__23708;
chunk__23693_23697 = G__23709;
count__23694_23698 = G__23710;
i__23695_23699 = G__23711;
continue;
} else {
var x_23712 = cljs.core.first.call(null,seq__23692_23706__$1);
ret.push(x_23712);

var G__23713 = cljs.core.next.call(null,seq__23692_23706__$1);
var G__23714 = null;
var G__23715 = (0);
var G__23716 = (0);
seq__23692_23696 = G__23713;
chunk__23693_23697 = G__23714;
count__23694_23698 = G__23715;
i__23695_23699 = G__23716;
continue;
}
} else {
}
}
break;
}

return com.cognitect.transit.tagged.call(null,"array",ret);
});

cognitect.transit.SetHandler.prototype.stringRep = (function (){
var self__ = this;
var v = this;
return null;
});

cognitect.transit.SetHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.SetHandler.cljs$lang$type = true;

cognitect.transit.SetHandler.cljs$lang$ctorStr = "cognitect.transit/SetHandler";

cognitect.transit.SetHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/SetHandler");
});

cognitect.transit.__GT_SetHandler = (function cognitect$transit$__GT_SetHandler(){
return (new cognitect.transit.SetHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.VectorHandler = (function (){
})
cognitect.transit.VectorHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "array";
});

cognitect.transit.VectorHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__23717_23721 = cljs.core.seq.call(null,v);
var chunk__23718_23722 = null;
var count__23719_23723 = (0);
var i__23720_23724 = (0);
while(true){
if((i__23720_23724 < count__23719_23723)){
var x_23725 = cljs.core._nth.call(null,chunk__23718_23722,i__23720_23724);
ret.push(x_23725);

var G__23726 = seq__23717_23721;
var G__23727 = chunk__23718_23722;
var G__23728 = count__23719_23723;
var G__23729 = (i__23720_23724 + (1));
seq__23717_23721 = G__23726;
chunk__23718_23722 = G__23727;
count__23719_23723 = G__23728;
i__23720_23724 = G__23729;
continue;
} else {
var temp__4425__auto___23730 = cljs.core.seq.call(null,seq__23717_23721);
if(temp__4425__auto___23730){
var seq__23717_23731__$1 = temp__4425__auto___23730;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23717_23731__$1)){
var c__17122__auto___23732 = cljs.core.chunk_first.call(null,seq__23717_23731__$1);
var G__23733 = cljs.core.chunk_rest.call(null,seq__23717_23731__$1);
var G__23734 = c__17122__auto___23732;
var G__23735 = cljs.core.count.call(null,c__17122__auto___23732);
var G__23736 = (0);
seq__23717_23721 = G__23733;
chunk__23718_23722 = G__23734;
count__23719_23723 = G__23735;
i__23720_23724 = G__23736;
continue;
} else {
var x_23737 = cljs.core.first.call(null,seq__23717_23731__$1);
ret.push(x_23737);

var G__23738 = cljs.core.next.call(null,seq__23717_23731__$1);
var G__23739 = null;
var G__23740 = (0);
var G__23741 = (0);
seq__23717_23721 = G__23738;
chunk__23718_23722 = G__23739;
count__23719_23723 = G__23740;
i__23720_23724 = G__23741;
continue;
}
} else {
}
}
break;
}

return ret;
});

cognitect.transit.VectorHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.VectorHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.VectorHandler.cljs$lang$type = true;

cognitect.transit.VectorHandler.cljs$lang$ctorStr = "cognitect.transit/VectorHandler";

cognitect.transit.VectorHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/VectorHandler");
});

cognitect.transit.__GT_VectorHandler = (function cognitect$transit$__GT_VectorHandler(){
return (new cognitect.transit.VectorHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.UUIDHandler = (function (){
})
cognitect.transit.UUIDHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "u";
});

cognitect.transit.UUIDHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.uuid;
});

cognitect.transit.UUIDHandler.prototype.stringRep = (function (v){
var self__ = this;
var this$ = this;
return this$.rep(v);
});

cognitect.transit.UUIDHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.UUIDHandler.cljs$lang$type = true;

cognitect.transit.UUIDHandler.cljs$lang$ctorStr = "cognitect.transit/UUIDHandler";

cognitect.transit.UUIDHandler.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/UUIDHandler");
});

cognitect.transit.__GT_UUIDHandler = (function cognitect$transit$__GT_UUIDHandler(){
return (new cognitect.transit.UUIDHandler());
});

/**
 * Return a transit writer. type maybe either :json or :json-verbose.
 *   opts is a map containing a :handlers entry. :handlers is a map of
 *   type constructors to handler instances.
 */
cognitect.transit.writer = (function cognitect$transit$writer(var_args){
var args23742 = [];
var len__17377__auto___23753 = arguments.length;
var i__17378__auto___23754 = (0);
while(true){
if((i__17378__auto___23754 < len__17377__auto___23753)){
args23742.push((arguments[i__17378__auto___23754]));

var G__23755 = (i__17378__auto___23754 + (1));
i__17378__auto___23754 = G__23755;
continue;
} else {
}
break;
}

var G__23744 = args23742.length;
switch (G__23744) {
case 1:
return cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23742.length)].join('')));

}
});

cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1 = (function (type){
return cognitect.transit.writer.call(null,type,null);
});

cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2 = (function (type,opts){
var keyword_handler = (new cognitect.transit.KeywordHandler());
var symbol_handler = (new cognitect.transit.SymbolHandler());
var list_handler = (new cognitect.transit.ListHandler());
var map_handler = (new cognitect.transit.MapHandler());
var set_handler = (new cognitect.transit.SetHandler());
var vector_handler = (new cognitect.transit.VectorHandler());
var uuid_handler = (new cognitect.transit.UUIDHandler());
var handlers = cljs.core.merge.call(null,cljs.core.PersistentHashMap.fromArrays([cljs.core.PersistentHashMap,cljs.core.Cons,cljs.core.PersistentArrayMap,cljs.core.NodeSeq,cljs.core.PersistentQueue,cljs.core.IndexedSeq,cljs.core.Keyword,cljs.core.EmptyList,cljs.core.LazySeq,cljs.core.Subvec,cljs.core.PersistentQueueSeq,cljs.core.ArrayNodeSeq,cljs.core.ValSeq,cljs.core.PersistentArrayMapSeq,cljs.core.PersistentVector,cljs.core.List,cljs.core.RSeq,cljs.core.PersistentHashSet,cljs.core.PersistentTreeMap,cljs.core.KeySeq,cljs.core.ChunkedSeq,cljs.core.PersistentTreeSet,cljs.core.ChunkedCons,cljs.core.Symbol,cljs.core.UUID,cljs.core.Range,cljs.core.PersistentTreeMapSeq],[map_handler,list_handler,map_handler,list_handler,list_handler,list_handler,keyword_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,set_handler,map_handler,list_handler,list_handler,set_handler,list_handler,symbol_handler,uuid_handler,list_handler,list_handler]),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts));
return com.cognitect.transit.writer.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"objectBuilder": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (m,kfn,vfn){
return cljs.core.reduce_kv.call(null,((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (obj,k,v){
var G__23745 = obj;
G__23745.push(kfn.call(null,k),vfn.call(null,v));

return G__23745;
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
,["^ "],m);
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
, "handlers": (function (){var x23746 = cljs.core.clone.call(null,handlers);
x23746.forEach = ((function (x23746,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (f){
var coll = this;
var seq__23747 = cljs.core.seq.call(null,coll);
var chunk__23748 = null;
var count__23749 = (0);
var i__23750 = (0);
while(true){
if((i__23750 < count__23749)){
var vec__23751 = cljs.core._nth.call(null,chunk__23748,i__23750);
var k = cljs.core.nth.call(null,vec__23751,(0),null);
var v = cljs.core.nth.call(null,vec__23751,(1),null);
f.call(null,v,k);

var G__23757 = seq__23747;
var G__23758 = chunk__23748;
var G__23759 = count__23749;
var G__23760 = (i__23750 + (1));
seq__23747 = G__23757;
chunk__23748 = G__23758;
count__23749 = G__23759;
i__23750 = G__23760;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__23747);
if(temp__4425__auto__){
var seq__23747__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23747__$1)){
var c__17122__auto__ = cljs.core.chunk_first.call(null,seq__23747__$1);
var G__23761 = cljs.core.chunk_rest.call(null,seq__23747__$1);
var G__23762 = c__17122__auto__;
var G__23763 = cljs.core.count.call(null,c__17122__auto__);
var G__23764 = (0);
seq__23747 = G__23761;
chunk__23748 = G__23762;
count__23749 = G__23763;
i__23750 = G__23764;
continue;
} else {
var vec__23752 = cljs.core.first.call(null,seq__23747__$1);
var k = cljs.core.nth.call(null,vec__23752,(0),null);
var v = cljs.core.nth.call(null,vec__23752,(1),null);
f.call(null,v,k);

var G__23765 = cljs.core.next.call(null,seq__23747__$1);
var G__23766 = null;
var G__23767 = (0);
var G__23768 = (0);
seq__23747 = G__23765;
chunk__23748 = G__23766;
count__23749 = G__23767;
i__23750 = G__23768;
continue;
}
} else {
return null;
}
}
break;
}
});})(x23746,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
;

return x23746;
})(), "unpack": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (x){
if((x instanceof cljs.core.PersistentArrayMap)){
return x.arr;
} else {
return false;
}
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});

cognitect.transit.writer.cljs$lang$maxFixedArity = 2;
/**
 * Encode an object into a transit string given a transit writer.
 */
cognitect.transit.write = (function cognitect$transit$write(w,o){
return w.write(o);
});
/**
 * Construct a read handler. Implemented as identity, exists primarily
 * for API compatiblity with transit-clj
 */
cognitect.transit.read_handler = (function cognitect$transit$read_handler(from_rep){
return from_rep;
});
/**
 * Creates a transit write handler whose tag, rep,
 * stringRep, and verboseWriteHandler methods
 * invoke the provided fns.
 */
cognitect.transit.write_handler = (function cognitect$transit$write_handler(var_args){
var args23769 = [];
var len__17377__auto___23775 = arguments.length;
var i__17378__auto___23776 = (0);
while(true){
if((i__17378__auto___23776 < len__17377__auto___23775)){
args23769.push((arguments[i__17378__auto___23776]));

var G__23777 = (i__17378__auto___23776 + (1));
i__17378__auto___23776 = G__23777;
continue;
} else {
}
break;
}

var G__23771 = args23769.length;
switch (G__23771) {
case 2:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args23769.length)].join('')));

}
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2 = (function (tag_fn,rep_fn){
return cognitect.transit.write_handler.call(null,tag_fn,rep_fn,null,null);
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$3 = (function (tag_fn,rep_fn,str_rep_fn){
return cognitect.transit.write_handler.call(null,tag_fn,rep_fn,str_rep_fn,null);
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$4 = (function (tag_fn,rep_fn,str_rep_fn,verbose_handler_fn){
if(typeof cognitect.transit.t_cognitect$transit23772 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cognitect.transit.Object}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cognitect.transit.t_cognitect$transit23772 = (function (tag_fn,rep_fn,str_rep_fn,verbose_handler_fn,meta23773){
this.tag_fn = tag_fn;
this.rep_fn = rep_fn;
this.str_rep_fn = str_rep_fn;
this.verbose_handler_fn = verbose_handler_fn;
this.meta23773 = meta23773;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cognitect.transit.t_cognitect$transit23772.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_23774,meta23773__$1){
var self__ = this;
var _23774__$1 = this;
return (new cognitect.transit.t_cognitect$transit23772(self__.tag_fn,self__.rep_fn,self__.str_rep_fn,self__.verbose_handler_fn,meta23773__$1));
});

cognitect.transit.t_cognitect$transit23772.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_23774){
var self__ = this;
var _23774__$1 = this;
return self__.meta23773;
});

cognitect.transit.t_cognitect$transit23772.prototype.tag = (function (o){
var self__ = this;
var _ = this;
return self__.tag_fn.call(null,o);
});

cognitect.transit.t_cognitect$transit23772.prototype.rep = (function (o){
var self__ = this;
var _ = this;
return self__.rep_fn.call(null,o);
});

cognitect.transit.t_cognitect$transit23772.prototype.stringRep = (function (o){
var self__ = this;
var _ = this;
if(cljs.core.truth_(self__.str_rep_fn)){
return self__.str_rep_fn.call(null,o);
} else {
return null;
}
});

cognitect.transit.t_cognitect$transit23772.prototype.getVerboseHandler = (function (){
var self__ = this;
var _ = this;
if(cljs.core.truth_(self__.verbose_handler_fn)){
return self__.verbose_handler_fn.call(null);
} else {
return null;
}
});

cognitect.transit.t_cognitect$transit23772.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"tag-fn","tag-fn",242055482,null),new cljs.core.Symbol(null,"rep-fn","rep-fn",-1724891035,null),new cljs.core.Symbol(null,"str-rep-fn","str-rep-fn",-1179615016,null),new cljs.core.Symbol(null,"verbose-handler-fn","verbose-handler-fn",547340594,null),new cljs.core.Symbol(null,"meta23773","meta23773",1116291408,null)], null);
});

cognitect.transit.t_cognitect$transit23772.cljs$lang$type = true;

cognitect.transit.t_cognitect$transit23772.cljs$lang$ctorStr = "cognitect.transit/t_cognitect$transit23772";

cognitect.transit.t_cognitect$transit23772.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"cognitect.transit/t_cognitect$transit23772");
});

cognitect.transit.__GT_t_cognitect$transit23772 = (function cognitect$transit$__GT_t_cognitect$transit23772(tag_fn__$1,rep_fn__$1,str_rep_fn__$1,verbose_handler_fn__$1,meta23773){
return (new cognitect.transit.t_cognitect$transit23772(tag_fn__$1,rep_fn__$1,str_rep_fn__$1,verbose_handler_fn__$1,meta23773));
});

}

return (new cognitect.transit.t_cognitect$transit23772(tag_fn,rep_fn,str_rep_fn,verbose_handler_fn,cljs.core.PersistentArrayMap.EMPTY));
});

cognitect.transit.write_handler.cljs$lang$maxFixedArity = 4;
/**
 * Construct a tagged value. tag must be a string and rep can
 * be any transit encodeable value.
 */
cognitect.transit.tagged_value = (function cognitect$transit$tagged_value(tag,rep){
return com.cognitect.transit.types.taggedValue.call(null,tag,rep);
});
/**
 * Returns true if x is a transit tagged value, false otherwise.
 */
cognitect.transit.tagged_value_QMARK_ = (function cognitect$transit$tagged_value_QMARK_(x){
return com.cognitect.transit.types.isTaggedValue.call(null,x);
});
/**
 * Construct a transit integer value. Returns JavaScript number if
 *   in the 53bit integer range, a goog.math.Long instance if above. s
 *   may be a string or a JavaScript number.
 */
cognitect.transit.integer = (function cognitect$transit$integer(s){
return com.cognitect.transit.types.intValue.call(null,s);
});
/**
 * Returns true if x is an integer value between the 53bit and 64bit
 *   range, false otherwise.
 */
cognitect.transit.integer_QMARK_ = (function cognitect$transit$integer_QMARK_(x){
return com.cognitect.transit.types.isInteger.call(null,x);
});
/**
 * Construct a big integer from a string.
 */
cognitect.transit.bigint = (function cognitect$transit$bigint(s){
return com.cognitect.transit.types.bigInteger.call(null,s);
});
/**
 * Returns true if x is a transit big integer value, false otherwise.
 */
cognitect.transit.bigint_QMARK_ = (function cognitect$transit$bigint_QMARK_(x){
return com.cognitect.transit.types.isBigInteger.call(null,x);
});
/**
 * Construct a big decimal from a string.
 */
cognitect.transit.bigdec = (function cognitect$transit$bigdec(s){
return com.cognitect.transit.types.bigDecimalValue.call(null,s);
});
/**
 * Returns true if x is a transit big decimal value, false otherwise.
 */
cognitect.transit.bigdec_QMARK_ = (function cognitect$transit$bigdec_QMARK_(x){
return com.cognitect.transit.types.isBigDecimal.call(null,x);
});
/**
 * Construct a URI from a string.
 */
cognitect.transit.uri = (function cognitect$transit$uri(s){
return com.cognitect.transit.types.uri.call(null,s);
});
/**
 * Returns true if x is a transit URI value, false otherwise.
 */
cognitect.transit.uri_QMARK_ = (function cognitect$transit$uri_QMARK_(x){
return com.cognitect.transit.types.isURI.call(null,x);
});
/**
 * Construct a UUID from a string.
 */
cognitect.transit.uuid = (function cognitect$transit$uuid(s){
return com.cognitect.transit.types.uuid.call(null,s);
});
/**
 * Returns true if x is a transit UUID value, false otherwise.
 */
cognitect.transit.uuid_QMARK_ = (function cognitect$transit$uuid_QMARK_(x){
return com.cognitect.transit.types.isUUID.call(null,x);
});
/**
 * Construct a transit binary value. s should be base64 encoded
 * string.
 */
cognitect.transit.binary = (function cognitect$transit$binary(s){
return com.cognitect.transit.types.binary.call(null,s);
});
/**
 * Returns true if x is a transit binary value, false otherwise.
 */
cognitect.transit.binary_QMARK_ = (function cognitect$transit$binary_QMARK_(x){
return com.cognitect.transit.types.isBinary.call(null,x);
});
/**
 * Construct a quoted transit value. x should be a transit
 * encodeable value.
 */
cognitect.transit.quoted = (function cognitect$transit$quoted(x){
return com.cognitect.transit.types.quoted.call(null,x);
});
/**
 * Returns true if x is a transit quoted value, false otherwise.
 */
cognitect.transit.quoted_QMARK_ = (function cognitect$transit$quoted_QMARK_(x){
return com.cognitect.transit.types.isQuoted.call(null,x);
});
/**
 * Construct a transit link value. x should be an IMap instance
 * containing at a minimum the following keys: :href, :rel. It
 * may optionall include :name, :render, and :prompt. :href must
 * be a transit URI, all other values are strings, and :render must
 * be either :image or :link.
 */
cognitect.transit.link = (function cognitect$transit$link(x){
return com.cognitect.transit.types.link.call(null,x);
});
/**
 * Returns true if x a transit link value, false if otherwise.
 */
cognitect.transit.link_QMARK_ = (function cognitect$transit$link_QMARK_(x){
return com.cognitect.transit.types.isLink.call(null,x);
});

//# sourceMappingURL=transit.js.map?rel=1446554829536