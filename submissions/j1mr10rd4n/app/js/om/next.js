// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('om.next');
goog.require('cljs.core');
goog.require('goog.log');
goog.require('goog.string');
goog.require('om.next.cache');
goog.require('clojure.zip');
goog.require('om.next.protocols');
goog.require('om.next.impl.parser');
goog.require('goog.object');
goog.require('clojure.walk');
goog.require('om.util');
goog.require('om.tempid');
goog.require('om.transit');
goog.require('goog.debug.Console');
if(typeof om.next._STAR_logger_STAR_ !== 'undefined'){
} else {
om.next._STAR_logger_STAR_ = ((goog.DEBUG)?(function (){
(new goog.debug.Console()).setCapturing(true);

return goog.log.getLogger("om.next");
})()
:null);
}
om.next.roots = (function (){var G__26381 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26381) : cljs.core.atom.call(null,G__26381));
})();
om.next._STAR_raf_STAR_ = null;
om.next._STAR_reconciler_STAR_ = null;
om.next._STAR_parent_STAR_ = null;
om.next._STAR_shared_STAR_ = null;
om.next._STAR_instrument_STAR_ = null;
om.next._STAR_depth_STAR_ = (0);
om.next.nil_or_map_QMARK_ = (function om$next$nil_or_map_QMARK_(x){
return ((x == null)) || (cljs.core.map_QMARK_(x));
});
om.next.node__GT_key = (function om$next$node__GT_key(node){
if(cljs.core.map_QMARK_(node)){
return cljs.core.ffirst(node);
} else {
if(cljs.core.seq_QMARK_(node)){
var node_SINGLEQUOTE_ = cljs.core.first(node);
if(cljs.core.map_QMARK_(node_SINGLEQUOTE_)){
return cljs.core.ffirst(node_SINGLEQUOTE_);
} else {
return null;
}
} else {
return null;

}
}
});
om.next.query_zip = (function om$next$query_zip(root){
return clojure.zip.zipper((function (p1__26382_SHARP_){
return (cljs.core.vector_QMARK_(p1__26382_SHARP_)) || (cljs.core.map_QMARK_(p1__26382_SHARP_)) || (cljs.core.seq_QMARK_(p1__26382_SHARP_));
}),cljs.core.seq,(function (node,children){
var ret = ((cljs.core.vector_QMARK_(node))?cljs.core.vec(children):((cljs.core.map_QMARK_(node))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,children):((cljs.core.seq_QMARK_(node))?children:null)));
return cljs.core.with_meta(ret,cljs.core.meta(node));
}),root);
});
om.next.move_to_key = (function om$next$move_to_key(loc,k){
var loc__$1 = clojure.zip.down(loc);
while(true){
var node = clojure.zip.node(loc__$1);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.first(node))){
return clojure.zip.right(clojure.zip.down(loc__$1));
} else {
var G__26383 = clojure.zip.right(loc__$1);
loc__$1 = G__26383;
continue;
}
break;
}
});
om.next.union_QMARK_ = (function om$next$union_QMARK_(node){
var node__$1 = (function (){var G__26385 = node;
var G__26385__$1 = ((cljs.core.seq_QMARK_(node))?cljs.core.first(G__26385):G__26385);
return G__26385__$1;
})();
return (cljs.core.map_QMARK_(node__$1)) && (cljs.core.map_QMARK_(cljs.core.second(cljs.core.first(node__$1))));
});
om.next.query_template = (function om$next$query_template(query,path){
var query_template_STAR_ = (function om$next$query_template_$_query_template_STAR_(loc,path__$1){
while(true){
if(cljs.core.empty_QMARK_(path__$1)){
return loc;
} else {
var node = clojure.zip.node(loc);
if(cljs.core.vector_QMARK_(node)){
var G__26394 = clojure.zip.down(loc);
var G__26395 = path__$1;
loc = G__26394;
path__$1 = G__26395;
continue;
} else {
var vec__26393 = path__$1;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26393,(0),null);
var ks = cljs.core.nthnext(vec__26393,(1));
var k_SINGLEQUOTE_ = om.next.node__GT_key(node);
if(cljs.core.keyword_identical_QMARK_(k,k_SINGLEQUOTE_)){
if(cljs.core.map_QMARK_(node)){
var loc_SINGLEQUOTE_ = om.next.move_to_key(loc,k);
var node_SINGLEQUOTE_ = clojure.zip.node(loc_SINGLEQUOTE_);
if(cljs.core.map_QMARK_(node_SINGLEQUOTE_)){
if(cljs.core.seq(ks)){
var G__26396 = clojure.zip.replace(loc_SINGLEQUOTE_,clojure.zip.node(om.next.move_to_key(loc_SINGLEQUOTE_,cljs.core.first(ks))));
var G__26397 = cljs.core.next(ks);
loc = G__26396;
path__$1 = G__26397;
continue;
} else {
return loc_SINGLEQUOTE_;
}
} else {
var G__26398 = loc_SINGLEQUOTE_;
var G__26399 = ks;
loc = G__26398;
path__$1 = G__26399;
continue;
}
} else {
var G__26400 = clojure.zip.right(clojure.zip.down(clojure.zip.down(clojure.zip.down(loc))));
var G__26401 = ks;
loc = G__26400;
path__$1 = G__26401;
continue;
}
} else {
var G__26402 = clojure.zip.right(loc);
var G__26403 = path__$1;
loc = G__26402;
path__$1 = G__26403;
continue;
}
}
}
break;
}
});
return query_template_STAR_(om.next.query_zip(query),path);
});
om.next.replace = (function om$next$replace(template,new_query){
return clojure.zip.root(clojure.zip.replace(template,new_query));
});
om.next.join_key = (function om$next$join_key(node){
if(cljs.core.map_QMARK_(node)){
return cljs.core.ffirst(node);
} else {
if(cljs.core.seq_QMARK_(node)){
return om$next$join_key(cljs.core.first(node));
} else {
return node;

}
}
});
om.next.join_entry = (function om$next$join_entry(node){
if(cljs.core.seq_QMARK_(node)){
return cljs.core.ffirst(node);
} else {
return cljs.core.first(node);
}
});
om.next.join_value = (function om$next$join_value(join){
return cljs.core.second(om.next.join_entry(join));
});
om.next.join_QMARK_ = (function om$next$join_QMARK_(x){
var x__$1 = ((cljs.core.seq_QMARK_(x))?cljs.core.first(x):x);
return cljs.core.map_QMARK_(x__$1);
});
om.next.focused_join = (function om$next$focused_join(node,ks){
if(cljs.core.map_QMARK_(node)){
return cljs.core.PersistentArrayMap.fromArray([cljs.core.ffirst(node),(function (){var G__26409 = cljs.core.second(cljs.core.first(node));
var G__26410 = ks;
return (om.next.focus_query.cljs$core$IFn$_invoke$arity$2 ? om.next.focus_query.cljs$core$IFn$_invoke$arity$2(G__26409,G__26410) : om.next.focus_query.call(null,G__26409,G__26410));
})()], true, false);
} else {
if(cljs.core.seq_QMARK_(node)){
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.second(node)),om$next$focused_join(cljs.core.first(node),ks));
} else {
return node;

}
}
});
/**
 * Given a query, focus it along the specified path.
 * 
 *   Examples:
 *  (om.next/focus-query [:foo :bar :baz] [:foo])
 *  => [:foo]
 * 
 *  (om.next/focus-query [{:foo [:bar :baz]} :woz] [:foo :bar])
 *  => [{:foo [:bar]}]
 */
om.next.focus_query = (function om$next$focus_query(query,path){
if(cljs.core.empty_QMARK_(path)){
return query;
} else {
var vec__26414 = path;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26414,(0),null);
var ks = cljs.core.nthnext(vec__26414,(1));
var match = ((function (vec__26414,k,ks){
return (function om$next$focus_query_$_match(x){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,om.next.join_key(x));
});})(vec__26414,k,ks))
;
var value = ((function (vec__26414,k,ks){
return (function om$next$focus_query_$_value(x){
return om.next.focused_join(x,ks);
});})(vec__26414,k,ks))
;
if(cljs.core.map_QMARK_(query)){
return cljs.core.PersistentArrayMap.fromArray([k,om$next$focus_query(cljs.core.get.cljs$core$IFn$_invoke$arity$2(query,k),ks)], true, false);
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(match),cljs.core.map.cljs$core$IFn$_invoke$arity$1(value),cljs.core.take.cljs$core$IFn$_invoke$arity$1((1))),query);
}
}
});
om.next.focus__GT_path = (function om$next$focus__GT_path(var_args){
var args26415 = [];
var len__19301__auto___26419 = arguments.length;
var i__19302__auto___26420 = (0);
while(true){
if((i__19302__auto___26420 < len__19301__auto___26419)){
args26415.push((arguments[i__19302__auto___26420]));

var G__26421 = (i__19302__auto___26420 + (1));
i__19302__auto___26420 = G__26421;
continue;
} else {
}
break;
}

var G__26417 = args26415.length;
switch (G__26417) {
case 1:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26415.length)].join('')));

}
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$1 = (function (focus){
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3(focus,cljs.core.cst$sym$_STAR_,cljs.core.PersistentVector.EMPTY);
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2 = (function (focus,bound){
return om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3(focus,bound,cljs.core.PersistentVector.EMPTY);
});

om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$3 = (function (focus,bound,path){
while(true){
if(cljs.core.truth_((function (){var and__18231__auto__ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(bound,cljs.core.cst$sym$_STAR_)) || ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(path,bound)) && ((cljs.core.count(path) < cljs.core.count(bound))));
if(and__18231__auto__){
var and__18231__auto____$1 = cljs.core.some(om.next.join_QMARK_,focus);
if(cljs.core.truth_(and__18231__auto____$1)){
return ((1) === cljs.core.count(focus));
} else {
return and__18231__auto____$1;
}
} else {
return and__18231__auto__;
}
})())){
var vec__26418 = om.next.join_entry(cljs.core.first(focus));
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26418,(0),null);
var focus_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26418,(1),null);
var focus_SINGLEQUOTE___$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$$$$,focus_SINGLEQUOTE_))?focus:focus_SINGLEQUOTE_);
var G__26423 = focus_SINGLEQUOTE___$1;
var G__26424 = bound;
var G__26425 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,k);
focus = G__26423;
bound = G__26424;
path = G__26425;
continue;
} else {
return path;
}
break;
}
});

om.next.focus__GT_path.cljs$lang$maxFixedArity = 3;

/**
 * @interface
 */
om.next.Ident = function(){};

/**
 * Return the ref for this component
 */
om.next.ident = (function om$next$ident(this$,props){
if((!((this$ == null))) && (!((this$.om$next$Ident$ident$arity$2 == null)))){
return this$.om$next$Ident$ident$arity$2(this$,props);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next.ident[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(this$,props) : m__18899__auto__.call(null,this$,props));
} else {
var m__18899__auto____$1 = (om.next.ident["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,props) : m__18899__auto____$1.call(null,this$,props));
} else {
throw cljs.core.missing_protocol("Ident.ident",this$);
}
}
}
});


/**
 * @interface
 */
om.next.IQueryParams = function(){};

/**
 * Return the query parameters
 */
om.next.params = (function om$next$params(this$){
if((!((this$ == null))) && (!((this$.om$next$IQueryParams$params$arity$1 == null)))){
return this$.om$next$IQueryParams$params$arity$1(this$);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next.params[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto__.call(null,this$));
} else {
var m__18899__auto____$1 = (om.next.params["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("IQueryParams.params",this$);
}
}
}
});

(om.next.IQueryParams["_"] = true);

(om.next.params["_"] = (function (_){
return null;
}));

/**
 * @interface
 */
om.next.IQuery = function(){};

/**
 * Return the component's unbound query
 */
om.next.query = (function om$next$query(this$){
if((!((this$ == null))) && (!((this$.om$next$IQuery$query$arity$1 == null)))){
return this$.om$next$IQuery$query$arity$1(this$);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next.query[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto__.call(null,this$));
} else {
var m__18899__auto____$1 = (om.next.query["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("IQuery.query",this$);
}
}
}
});


/**
 * @interface
 */
om.next.ILocalState = function(){};

/**
 * Set the component's local state
 */
om.next._set_state_BANG_ = (function om$next$_set_state_BANG_(this$,new_state){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_set_state_BANG_$arity$2 == null)))){
return this$.om$next$ILocalState$_set_state_BANG_$arity$2(this$,new_state);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next._set_state_BANG_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_state) : m__18899__auto__.call(null,this$,new_state));
} else {
var m__18899__auto____$1 = (om.next._set_state_BANG_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,new_state) : m__18899__auto____$1.call(null,this$,new_state));
} else {
throw cljs.core.missing_protocol("ILocalState.-set-state!",this$);
}
}
}
});

/**
 * Get the component's local state
 */
om.next._get_state = (function om$next$_get_state(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_get_state$arity$1 == null)))){
return this$.om$next$ILocalState$_get_state$arity$1(this$);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next._get_state[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto__.call(null,this$));
} else {
var m__18899__auto____$1 = (om.next._get_state["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-get-state",this$);
}
}
}
});

/**
 * Get the component's rendered local state
 */
om.next._get_rendered_state = (function om$next$_get_rendered_state(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_get_rendered_state$arity$1 == null)))){
return this$.om$next$ILocalState$_get_rendered_state$arity$1(this$);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next._get_rendered_state[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto__.call(null,this$));
} else {
var m__18899__auto____$1 = (om.next._get_rendered_state["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-get-rendered-state",this$);
}
}
}
});

/**
 * Get the component's pending local state
 */
om.next._merge_pending_state_BANG_ = (function om$next$_merge_pending_state_BANG_(this$){
if((!((this$ == null))) && (!((this$.om$next$ILocalState$_merge_pending_state_BANG_$arity$1 == null)))){
return this$.om$next$ILocalState$_merge_pending_state_BANG_$arity$1(this$);
} else {
var x__18898__auto__ = (((this$ == null))?null:this$);
var m__18899__auto__ = (om.next._merge_pending_state_BANG_[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto__.call(null,this$));
} else {
var m__18899__auto____$1 = (om.next._merge_pending_state_BANG_["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__18899__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("ILocalState.-merge-pending-state!",this$);
}
}
}
});

om.next.var_QMARK_ = (function om$next$var_QMARK_(x){
var and__18231__auto__ = (x instanceof cljs.core.Symbol);
if(and__18231__auto__){
var G__26432 = [cljs.core.str(x)].join('');
var G__26433 = "?";
return goog.string.startsWith(G__26432,G__26433);
} else {
return and__18231__auto__;
}
});
om.next.var__GT_keyword = (function om$next$var__GT_keyword(x){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str(x)].join('').substring((1)));
});
om.next.bind_query = (function om$next$bind_query(query,params){
var replace_var = (function om$next$bind_query_$_replace_var(node){
if(cljs.core.truth_(om.next.var_QMARK_(node))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(params,om.next.var__GT_keyword(node),node);
} else {
return node;
}
});
return clojure.walk.prewalk(replace_var,query);
});


om.next.get_local_query_data = (function om$next$get_local_query_data(component){
var G__26435 = (om.next.get_reconciler.cljs$core$IFn$_invoke$arity$1 ? om.next.get_reconciler.cljs$core$IFn$_invoke$arity$1(component) : om.next.get_reconciler.call(null,component));
var G__26435__$1 = (((G__26435 == null))?null:cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(G__26435));
var G__26435__$2 = (((G__26435__$1 == null))?null:cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(G__26435__$1));
var G__26435__$3 = (((G__26435__$2 == null))?null:(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__26435__$2) : cljs.core.deref.call(null,G__26435__$2)));
var G__26435__$4 = (((G__26435__$3 == null))?null:cljs.core.cst$kw$om$next_SLASH_queries.cljs$core$IFn$_invoke$arity$1(G__26435__$3));
var G__26435__$5 = (((G__26435__$4 == null))?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__26435__$4,component));
return G__26435__$5;
});
/**
 * Return the unbound query for a component.
 */
om.next.get_unbound_query = (function om$next$get_unbound_query(component){
return cljs.core.cst$kw$query.cljs$core$IFn$_invoke$arity$2(om.next.get_local_query_data(component),om.next.query(component));
});
/**
 * Return the query params for a component.
 */
om.next.get_params = (function om$next$get_params(component){
return cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$2(om.next.get_local_query_data(component),om.next.params(component));
});
om.next.get_component_query = (function om$next$get_component_query(c){
var qps = om.next.get_local_query_data(c);
var q = cljs.core.cst$kw$query.cljs$core$IFn$_invoke$arity$2(qps,om.next.query(c));
var c_SINGLEQUOTE_ = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c_SINGLEQUOTE_ == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(c),cljs.core.str(" reuses "),cljs.core.str(c_SINGLEQUOTE_),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$c_SINGLEQUOTE_)], 0)))].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$2(qps,om.next.params(c))),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,cljs.core.type(c)], null));
});
om.next.iquery_QMARK_ = (function om$next$iquery_QMARK_(x){
if(((!((x == null)))?(((false) || (x.om$next$IQuery$))?true:false):false)){
return true;
} else {
if(cljs.core.truth_(goog.isFunction(x))){
var x__$1 = (function (){var G__26440 = x.prototype;
return Object.create(G__26440);
})();
if(!((x__$1 == null))){
if((false) || (x__$1.om$next$IQuery$)){
return true;
} else {
return false;
}
} else {
return false;
}
} else {
return null;
}
}
});
/**
 * Return a IQuery/IParams instance bound query. Works for component classes
 * and component instances. See also om.next/full-query.
 */
om.next.get_query = (function om$next$get_query(x){
if(((!((x == null)))?(((false) || (x.om$next$IQuery$))?true:false):false)){
if(cljs.core.truth_((om.next.component_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.component_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.component_QMARK_.call(null,x)))){
return om.next.get_component_query(x);
} else {
var q = om.next.query(x);
var c = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(x),cljs.core.str(" reuses "),cljs.core.str(c),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,om.next.params(x)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,x], null));
}
} else {
if(cljs.core.truth_(goog.isFunction(x))){
var y = (function (){var G__26446 = x.prototype;
return Object.create(G__26446);
})();
if(((!((y == null)))?(((false) || (y.om$next$IQuery$))?true:false):false)){
var q = om.next.query(y);
var c = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(q));
if((c == null)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Query violation, "),cljs.core.str(y),cljs.core.str(" reuses "),cljs.core.str(c),cljs.core.str(" query")].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

return cljs.core.with_meta(om.next.bind_query(q,om.next.params(y)),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,x], null));
} else {
return null;
}
} else {
return null;
}
}
});
om.next.tag = (function om$next$tag(x,class$){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,cljs.core.cst$kw$component,class$);
});

/**
* @constructor
*/
om.next.OmProps = (function (props,basis_t){
this.props = props;
this.basis_t = basis_t;
})

om.next.OmProps.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$props,cljs.core.cst$sym$basis_DASH_t], null);
});

om.next.OmProps.cljs$lang$type = true;

om.next.OmProps.cljs$lang$ctorStr = "om.next/OmProps";

om.next.OmProps.cljs$lang$ctorPrWriter = (function (this__18841__auto__,writer__18842__auto__,opt__18843__auto__){
return cljs.core._write(writer__18842__auto__,"om.next/OmProps");
});

om.next.__GT_OmProps = (function om$next$__GT_OmProps(props,basis_t){
return (new om.next.OmProps(props,basis_t));
});

om.next.om_props = (function om$next$om_props(props,basis_t){
return (new om.next.OmProps(props,basis_t));
});
om.next.om_props_basis = (function om$next$om_props_basis(om_props){
return om_props.basis_t;
});
om.next.nil_props = om.next.om_props(null,(-1));
om.next.unwrap = (function om$next$unwrap(om_props){
return om_props.props;
});
om.next.compute_react_key = (function om$next$compute_react_key(cl,props){
var temp__4423__auto__ = cljs.core.cst$kw$react_DASH_key.cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(temp__4423__auto__)){
var rk = temp__4423__auto__;
return rk;
} else {
var temp__4423__auto____$1 = cljs.core.cst$kw$om_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(props));
if(cljs.core.truth_(temp__4423__auto____$1)){
var idx = temp__4423__auto____$1;
return [cljs.core.str(cl.name),cljs.core.str("_"),cljs.core.str(idx)].join('');
} else {
return undefined;
}
}
});
/**
 * Create a factory constructor from a component class created with
 * om.next/defui.
 */
om.next.factory = (function om$next$factory(var_args){
var args26448 = [];
var len__19301__auto___26464 = arguments.length;
var i__19302__auto___26465 = (0);
while(true){
if((i__19302__auto___26465 < len__19301__auto___26464)){
args26448.push((arguments[i__19302__auto___26465]));

var G__26466 = (i__19302__auto___26465 + (1));
i__19302__auto___26465 = G__26466;
continue;
} else {
}
break;
}

var G__26450 = args26448.length;
switch (G__26450) {
case 1:
return om.next.factory.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.factory.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26448.length)].join('')));

}
});

om.next.factory.cljs$core$IFn$_invoke$arity$1 = (function (class$){
return om.next.factory.cljs$core$IFn$_invoke$arity$2(class$,null);
});

om.next.factory.cljs$core$IFn$_invoke$arity$2 = (function (class$,p__26451){
var map__26452 = p__26451;
var map__26452__$1 = ((((!((map__26452 == null)))?((((map__26452.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26452.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26452):map__26452);
var opts = map__26452__$1;
var validator = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26452__$1,cljs.core.cst$kw$validator);
var keyfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26452__$1,cljs.core.cst$kw$keyfn);
if(cljs.core.fn_QMARK_(class$)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$fn_QMARK_,cljs.core.cst$sym$class)], 0)))].join('')));
}

return ((function (map__26452,map__26452__$1,opts,validator,keyfn){
return (function() { 
var om$next$self__delegate = function (props,children){
if((validator == null)){
} else {
if(cljs.core.truth_((validator.cljs$core$IFn$_invoke$arity$1 ? validator.cljs$core$IFn$_invoke$arity$1(props) : validator.call(null,props)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$validator,cljs.core.cst$sym$props)], 0)))].join('')));
}
}

if(cljs.core.truth_(om.next._STAR_instrument_STAR_)){
var G__26459 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$props,props,cljs.core.cst$kw$children,children,cljs.core.cst$kw$class,class$,cljs.core.cst$kw$factory,om$next$self], null);
return (om.next._STAR_instrument_STAR_.cljs$core$IFn$_invoke$arity$1 ? om.next._STAR_instrument_STAR_.cljs$core$IFn$_invoke$arity$1(G__26459) : om.next._STAR_instrument_STAR_.call(null,G__26459));
} else {
var key = ((!((keyfn == null)))?(keyfn.cljs$core$IFn$_invoke$arity$1 ? keyfn.cljs$core$IFn$_invoke$arity$1(props) : keyfn.call(null,props)):om.next.compute_react_key(class$,props));
var ref = cljs.core.cst$kw$ref.cljs$core$IFn$_invoke$arity$1(props);
var ref__$1 = (function (){var G__26460 = ref;
var G__26460__$1 = (((ref instanceof cljs.core.Keyword))?[cljs.core.str(G__26460)].join(''):G__26460);
return G__26460__$1;
})();
var t = ((!((om.next._STAR_reconciler_STAR_ == null)))?om.next.protocols.basis_t(om.next._STAR_reconciler_STAR_):(0));
var G__26461 = class$;
var G__26462 = {"omcljs$value": om.next.om_props(props,t), "omcljs$instrument": om.next._STAR_instrument_STAR_, "key": key, "ref": ref__$1, "omcljs$shared": om.next._STAR_shared_STAR_, "omcljs$path": cljs.core.cst$kw$om_DASH_path.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(props)), "omcljs$reconciler": om.next._STAR_reconciler_STAR_, "omcljs$depth": om.next._STAR_depth_STAR_, "omcljs$parent": om.next._STAR_parent_STAR_};
var G__26463 = om.util.force_children(children);
return React.createElement(G__26461,G__26462,G__26463);
}
};
var om$next$self = function (props,var_args){
var children = null;
if (arguments.length > 1) {
var G__26468__i = 0, G__26468__a = new Array(arguments.length -  1);
while (G__26468__i < G__26468__a.length) {G__26468__a[G__26468__i] = arguments[G__26468__i + 1]; ++G__26468__i;}
  children = new cljs.core.IndexedSeq(G__26468__a,0);
} 
return om$next$self__delegate.call(this,props,children);};
om$next$self.cljs$lang$maxFixedArity = 1;
om$next$self.cljs$lang$applyTo = (function (arglist__26469){
var props = cljs.core.first(arglist__26469);
var children = cljs.core.rest(arglist__26469);
return om$next$self__delegate(props,children);
});
om$next$self.cljs$core$IFn$_invoke$arity$variadic = om$next$self__delegate;
return om$next$self;
})()
;
;})(map__26452,map__26452__$1,opts,validator,keyfn))
});

om.next.factory.cljs$lang$maxFixedArity = 2;
/**
 * Returns true if the argument is an Om component.
 */
om.next.component_QMARK_ = (function om$next$component_QMARK_(x){
if(!((x == null))){
return x.om$isComponent === true;
} else {
return false;
}
});
om.next.state = (function om$next$state(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

return c.state;
});
/**
 * PRIVATE: Do not use
 */
om.next.get_prop = (function om$next$get_prop(c,k){
var G__26472 = c.props;
var G__26473 = k;
return goog.object.get(G__26472,G__26473);
});
om.next.get_props_STAR_ = (function om$next$get_props_STAR_(x,k){
if((x == null)){
return om.next.nil_props;
} else {
var y = goog.object.get(x,k);
if((y == null)){
return om.next.nil_props;
} else {
return y;
}
}
});
om.next.get_prev_props = (function om$next$get_prev_props(x){
return om.next.get_props_STAR_(x,"omcljs$prev$value");
});
om.next.get_next_props = (function om$next$get_next_props(x){
return om.next.get_props_STAR_(x,"omcljs$next$value");
});
om.next.get_props = (function om$next$get_props(x){
return om.next.get_props_STAR_(x,"omcljs$value");
});
/**
 * PRIVATE: Do not use
 */
om.next.set_prop_BANG_ = (function om$next$set_prop_BANG_(c,k,v){
var G__26477 = c.props;
var G__26478 = k;
var G__26479 = v;
return goog.object.set(G__26477,G__26478,G__26479);
});
om.next.get_reconciler = (function om$next$get_reconciler(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

return om.next.get_prop(c,"omcljs$reconciler");
});
om.next.props_STAR_ = (function om$next$props_STAR_(var_args){
var args26480 = [];
var len__19301__auto___26483 = arguments.length;
var i__19302__auto___26484 = (0);
while(true){
if((i__19302__auto___26484 < len__19301__auto___26483)){
args26480.push((arguments[i__19302__auto___26484]));

var G__26485 = (i__19302__auto___26484 + (1));
i__19302__auto___26484 = G__26485;
continue;
} else {
}
break;
}

var G__26482 = args26480.length;
switch (G__26482) {
case 2:
return om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26480.length)].join('')));

}
});

om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return cljs.core.max_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,y);
});

om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (x,y,z){
return cljs.core.max_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(y,z));
});

om.next.props_STAR_.cljs$lang$maxFixedArity = 3;
om.next.prev_props_STAR_ = (function om$next$prev_props_STAR_(var_args){
var args26487 = [];
var len__19301__auto___26490 = arguments.length;
var i__19302__auto___26491 = (0);
while(true){
if((i__19302__auto___26491 < len__19301__auto___26490)){
args26487.push((arguments[i__19302__auto___26491]));

var G__26492 = (i__19302__auto___26491 + (1));
i__19302__auto___26491 = G__26492;
continue;
} else {
}
break;
}

var G__26489 = args26487.length;
switch (G__26489) {
case 2:
return om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26487.length)].join('')));

}
});

om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return cljs.core.min_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,x,y);
});

om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (x,y,z){
return cljs.core.min_key.cljs$core$IFn$_invoke$arity$3(om.next.om_props_basis,om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(x,y),om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(y,z));
});

om.next.prev_props_STAR_.cljs$lang$maxFixedArity = 3;
om.next._prev_props = (function om$next$_prev_props(prev_props,component){
var cst = component.state;
var props = component.props;
return om.next.unwrap(om.next.prev_props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(prev_props),om.next.get_prev_props(cst)),om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(cst),om.next.get_props(props))));
});
om.next._next_props = (function om$next$_next_props(next_props,component){
return om.next.unwrap(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$3(om.next.get_props(next_props),om.next.get_props(component.props),om.next.get_next_props(component.state)));
});
om.next.merge_pending_props_BANG_ = (function om$next$merge_pending_props_BANG_(c){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

var cst = c.state;
var props = c.props;
var pending = goog.object.get(cst,"omcljs$next$value");
var prev = om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(cst),om.next.get_props(props));
goog.object.set(cst,"omcljs$prev$value",prev);

if((pending == null)){
return null;
} else {
goog.object.remove(cst,"omcljs$next$value");

return goog.object.set(cst,"omcljs$value",pending);
}
});
om.next.clear_prev_props_BANG_ = (function om$next$clear_prev_props_BANG_(c){
var G__26496 = c.state;
var G__26497 = "omcljs$prev$value";
return goog.object.remove(G__26496,G__26497);
});
/**
 * Get basis t value for when the component last read its props from
 * the global state.
 */
om.next.t = (function om$next$t(c){
return om.next.om_props_basis(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(c.props),om.next.get_props(c.state)));
});
/**
 * Returns the parent Om component.
 */
om.next.parent = (function om$next$parent(component){
return om.next.get_prop(component,"omcljs$parent");
});
/**
 * PRIVATE: Returns the render depth (a integer) of the component relative to
 *   the mount root.
 */
om.next.depth = (function om$next$depth(component){
if(om.next.component_QMARK_(component)){
return om.next.get_prop(component,"omcljs$depth");
} else {
return null;
}
});
/**
 * Returns the components React key.
 */
om.next.react_key = (function om$next$react_key(component){
return component.props.key;
});
/**
 * Returns the component type, regardless of whether the component has been
 * mounted
 */
om.next.react_type = (function om$next$react_type(x){
var or__18243__auto__ = goog.object.get(x,"type");
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return cljs.core.type(x);
}
});
/**
 * Returns the component's Om data path.
 */
om.next.path = (function om$next$path(c){
return om.next.get_prop(c,"omcljs$path");
});
/**
 * Return the global shared properties of the Om Next root. See :shared and
 * :shared-fn reconciler options.
 */
om.next.shared = (function om$next$shared(var_args){
var args26498 = [];
var len__19301__auto___26505 = arguments.length;
var i__19302__auto___26506 = (0);
while(true){
if((i__19302__auto___26506 < len__19301__auto___26505)){
args26498.push((arguments[i__19302__auto___26506]));

var G__26507 = (i__19302__auto___26506 + (1));
i__19302__auto___26506 = G__26507;
continue;
} else {
}
break;
}

var G__26500 = args26498.length;
switch (G__26500) {
case 1:
return om.next.shared.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.shared.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26498.length)].join('')));

}
});

om.next.shared.cljs$core$IFn$_invoke$arity$1 = (function (component){
return om.next.shared.cljs$core$IFn$_invoke$arity$2(component,cljs.core.PersistentVector.EMPTY);
});

om.next.shared.cljs$core$IFn$_invoke$arity$2 = (function (component,k_or_ks){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

var shared = (function (){var G__26501 = component.props;
var G__26502 = "omcljs$shared";
return goog.object.get(G__26501,G__26502);
})();
var ks = (function (){var G__26503 = k_or_ks;
var G__26503__$1 = ((!(cljs.core.sequential_QMARK_(k_or_ks)))?(new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__26503],null)):G__26503);
return G__26503__$1;
})();
var G__26504 = shared;
var G__26504__$1 = ((!(cljs.core.empty_QMARK_(ks)))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(G__26504,ks):G__26504);
return G__26504__$1;
});

om.next.shared.cljs$lang$maxFixedArity = 2;
om.next.instrument = (function om$next$instrument(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

return om.next.get_prop(component,"omcljs$instrument");
});
om.next.update_props_BANG_ = (function om$next$update_props_BANG_(c,next_props){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

var G__26513 = c.state;
var G__26514_26517 = G__26513;
var G__26515_26518 = "omcljs$next$value";
var G__26516_26519 = om.next.om_props(next_props,om.next.protocols.basis_t(om.next.get_reconciler(c)));
goog.object.set(G__26514_26517,G__26515_26518,G__26516_26519);

return G__26513;
});
/**
 * Return a components props.
 */
om.next.props = (function om$next$props(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

return om.next.unwrap(om.next.props_STAR_.cljs$core$IFn$_invoke$arity$2(om.next.get_props(component.props),om.next.get_props(component.state)));
});
/**
 * Add computed properties to props. Note will replace any pre-existing
 * computed properties.
 */
om.next.computed = (function om$next$computed(props,computed_map){
if((props == null)){
return null;
} else {
if(cljs.core.vector_QMARK_(props)){
var G__26522 = props;
var G__26522__$1 = ((!(cljs.core.empty_QMARK_(computed_map)))?cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(G__26522,cljs.core.assoc,cljs.core.cst$kw$om$next_SLASH_computed,computed_map):G__26522);
return G__26522__$1;
} else {
var G__26523 = props;
var G__26523__$1 = ((!(cljs.core.empty_QMARK_(computed_map)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__26523,cljs.core.cst$kw$om$next_SLASH_computed,computed_map):G__26523);
return G__26523__$1;
}
}
});
/**
 * Return the computed properties on a component or its props.
 */
om.next.get_computed = (function om$next$get_computed(var_args){
var args26524 = [];
var len__19301__auto___26529 = arguments.length;
var i__19302__auto___26530 = (0);
while(true){
if((i__19302__auto___26530 < len__19301__auto___26529)){
args26524.push((arguments[i__19302__auto___26530]));

var G__26531 = (i__19302__auto___26530 + (1));
i__19302__auto___26530 = G__26531;
continue;
} else {
}
break;
}

var G__26526 = args26524.length;
switch (G__26526) {
case 1:
return om.next.get_computed.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.get_computed.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26524.length)].join('')));

}
});

om.next.get_computed.cljs$core$IFn$_invoke$arity$1 = (function (x){
return om.next.get_computed.cljs$core$IFn$_invoke$arity$2(x,cljs.core.PersistentVector.EMPTY);
});

om.next.get_computed.cljs$core$IFn$_invoke$arity$2 = (function (x,k_or_ks){
if((x == null)){
return null;
} else {
var props = (function (){var G__26527 = x;
var G__26527__$1 = ((om.next.component_QMARK_(x))?om.next.props(G__26527):G__26527);
return G__26527__$1;
})();
var ks = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_computed], null),(function (){var G__26528 = k_or_ks;
var G__26528__$1 = ((!(cljs.core.sequential_QMARK_(k_or_ks)))?(new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__26528],null)):G__26528);
return G__26528__$1;
})());
if(cljs.core.vector_QMARK_(props)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(props),ks);
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,ks);
}
}
});

om.next.get_computed.cljs$lang$maxFixedArity = 2;
/**
 * Set the component local state of the component. Analogous to React's
 * setState.
 */
om.next.set_state_BANG_ = (function om$next$set_state_BANG_(component,new_state){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

if(((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false)){
om.next._set_state_BANG_(component,new_state);
} else {
var G__26538_26541 = component.state;
var G__26539_26542 = "omcljs$pendingState";
var G__26540_26543 = new_state;
goog.object.set(G__26538_26541,G__26539_26542,G__26540_26543);
}

var temp__4423__auto__ = om.next.get_reconciler(component);
if(cljs.core.truth_(temp__4423__auto__)){
var r = temp__4423__auto__;
om.next.protocols.queue_BANG_(r,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [component], null));

return (om.next.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1 ? om.next.schedule_render_BANG_.cljs$core$IFn$_invoke$arity$1(r) : om.next.schedule_render_BANG_.call(null,r));
} else {
return component.forceUpdate();
}
});
/**
 * Get a component's local state. May provide a single key or a sequential
 * collection of keys for indexed access into the component's local state.
 */
om.next.get_state = (function om$next$get_state(var_args){
var args26544 = [];
var len__19301__auto___26548 = arguments.length;
var i__19302__auto___26549 = (0);
while(true){
if((i__19302__auto___26549 < len__19301__auto___26548)){
args26544.push((arguments[i__19302__auto___26549]));

var G__26550 = (i__19302__auto___26549 + (1));
i__19302__auto___26549 = G__26550;
continue;
} else {
}
break;
}

var G__26546 = args26544.length;
switch (G__26546) {
case 1:
return om.next.get_state.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.get_state.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26544.length)].join('')));

}
});

om.next.get_state.cljs$core$IFn$_invoke$arity$1 = (function (component){
return om.next.get_state.cljs$core$IFn$_invoke$arity$2(component,cljs.core.PersistentVector.EMPTY);
});

om.next.get_state.cljs$core$IFn$_invoke$arity$2 = (function (component,k_or_ks){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

var cst = ((((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false))?om.next._get_state(component):(function (){var temp__4425__auto__ = component.state;
if(cljs.core.truth_(temp__4425__auto__)){
var state = temp__4425__auto__;
var or__18243__auto__ = goog.object.get(state,"omcljs$pendingState");
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return goog.object.get(state,"omcljs$state");
}
} else {
return null;
}
})());
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cst,((cljs.core.sequential_QMARK_(k_or_ks))?k_or_ks:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k_or_ks], null)));
});

om.next.get_state.cljs$lang$maxFixedArity = 2;
/**
 * Update a component's local state. Similar to Clojure(Script)'s swap!
 */
om.next.update_state_BANG_ = (function om$next$update_state_BANG_(var_args){
var args26552 = [];
var len__19301__auto___26577 = arguments.length;
var i__19302__auto___26578 = (0);
while(true){
if((i__19302__auto___26578 < len__19301__auto___26577)){
args26552.push((arguments[i__19302__auto___26578]));

var G__26579 = (i__19302__auto___26578 + (1));
i__19302__auto___26578 = G__26579;
continue;
} else {
}
break;
}

var G__26561 = args26552.length;
switch (G__26561) {
case 2:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
var argseq__19320__auto__ = (new cljs.core.IndexedSeq(args26552.slice((6)),(0)));
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__19320__auto__);

}
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,f){
return om.next.set_state_BANG_(component,(function (){var G__26562 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__26562) : f.call(null,G__26562));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,f,arg0){
return om.next.set_state_BANG_(component,(function (){var G__26563 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__26564 = arg0;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__26563,G__26564) : f.call(null,G__26563,G__26564));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (component,f,arg0,arg1){
return om.next.set_state_BANG_(component,(function (){var G__26565 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__26566 = arg0;
var G__26567 = arg1;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__26565,G__26566,G__26567) : f.call(null,G__26565,G__26566,G__26567));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (component,f,arg0,arg1,arg2){
return om.next.set_state_BANG_(component,(function (){var G__26568 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__26569 = arg0;
var G__26570 = arg1;
var G__26571 = arg2;
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__26568,G__26569,G__26570,G__26571) : f.call(null,G__26568,G__26569,G__26570,G__26571));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$6 = (function (component,f,arg0,arg1,arg2,arg3){
return om.next.set_state_BANG_(component,(function (){var G__26572 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(component);
var G__26573 = arg0;
var G__26574 = arg1;
var G__26575 = arg2;
var G__26576 = arg3;
return (f.cljs$core$IFn$_invoke$arity$5 ? f.cljs$core$IFn$_invoke$arity$5(G__26572,G__26573,G__26574,G__26575,G__26576) : f.call(null,G__26572,G__26573,G__26574,G__26575,G__26576));
})());
});

om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (component,f,arg0,arg1,arg2,arg3,arg_rest){
return om.next.set_state_BANG_(component,cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(f,om.next.get_state.cljs$core$IFn$_invoke$arity$1(component),arg0,arg1,arg2,cljs.core.array_seq([arg3,arg_rest], 0)));
});

om.next.update_state_BANG_.cljs$lang$applyTo = (function (seq26553){
var G__26554 = cljs.core.first(seq26553);
var seq26553__$1 = cljs.core.next(seq26553);
var G__26555 = cljs.core.first(seq26553__$1);
var seq26553__$2 = cljs.core.next(seq26553__$1);
var G__26556 = cljs.core.first(seq26553__$2);
var seq26553__$3 = cljs.core.next(seq26553__$2);
var G__26557 = cljs.core.first(seq26553__$3);
var seq26553__$4 = cljs.core.next(seq26553__$3);
var G__26558 = cljs.core.first(seq26553__$4);
var seq26553__$5 = cljs.core.next(seq26553__$4);
var G__26559 = cljs.core.first(seq26553__$5);
var seq26553__$6 = cljs.core.next(seq26553__$5);
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26554,G__26555,G__26556,G__26557,G__26558,G__26559,seq26553__$6);
});

om.next.update_state_BANG_.cljs$lang$maxFixedArity = (6);
/**
 * Get the rendered state of component. om.next/get-state always returns the
 * up-to-date state.
 */
om.next.get_rendered_state = (function om$next$get_rendered_state(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

if(((!((component == null)))?(((false) || (component.om$next$ILocalState$))?true:false):false)){
return om.next._get_rendered_state(component);
} else {
var G__26584 = component;
var G__26584__$1 = (((G__26584 == null))?null:G__26584.state);
var G__26584__$2 = (((G__26584__$1 == null))?null:goog.object.get(G__26584__$1,"omcljs$state"));
return G__26584__$2;
}
});
om.next.merge_pending_state_BANG_ = (function om$next$merge_pending_state_BANG_(c){
if(((!((c == null)))?(((false) || (c.om$next$ILocalState$))?true:false):false)){
return om.next._merge_pending_state_BANG_(c);
} else {
var temp__4425__auto__ = (function (){var G__26588 = c;
var G__26588__$1 = (((G__26588 == null))?null:G__26588.state);
var G__26588__$2 = (((G__26588__$1 == null))?null:goog.object.get(G__26588__$1,"omcljs$pendingState"));
return G__26588__$2;
})();
if(cljs.core.truth_(temp__4425__auto__)){
var pending = temp__4425__auto__;
var state = c.state;
var previous = goog.object.get(state,"omcljs$state");
goog.object.remove(state,"omcljs$pendingState");

goog.object.set(state,"omcljs$previousState",previous);

return goog.object.set(state,"omcljs$state",pending);
} else {
return null;
}
}
});
om.next.react_set_state_BANG_ = (function om$next$react_set_state_BANG_(var_args){
var args26589 = [];
var len__19301__auto___26592 = arguments.length;
var i__19302__auto___26593 = (0);
while(true){
if((i__19302__auto___26593 < len__19301__auto___26592)){
args26589.push((arguments[i__19302__auto___26593]));

var G__26594 = (i__19302__auto___26593 + (1));
i__19302__auto___26593 = G__26594;
continue;
} else {
}
break;
}

var G__26591 = args26589.length;
switch (G__26591) {
case 2:
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26589.length)].join('')));

}
});

om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,new_state){
return om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3(component,new_state,null);
});

om.next.react_set_state_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,new_state,cb){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

return component.setState({"omcljs$state": new_state},null);
});

om.next.react_set_state_BANG_.cljs$lang$maxFixedArity = 3;





om.next.gather_sends = (function om$next$gather_sends(p__26597,q,remotes){
var map__26602 = p__26597;
var map__26602__$1 = ((((!((map__26602 == null)))?((((map__26602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26602):map__26602);
var env = map__26602__$1;
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26602__$1,cljs.core.cst$kw$parser);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (map__26602,map__26602__$1,env,parser){
return (function (p1__26596_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__26596_SHARP_,(parser.cljs$core$IFn$_invoke$arity$3 ? parser.cljs$core$IFn$_invoke$arity$3(env,q,p1__26596_SHARP_) : parser.call(null,env,q,p1__26596_SHARP_))],null));
});})(map__26602,map__26602__$1,env,parser))
),cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (map__26602,map__26602__$1,env,parser){
return (function (p__26604){
var vec__26605 = p__26604;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26605,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26605,(1),null);
return (cljs.core.count(v) > (0));
});})(map__26602,map__26602__$1,env,parser))
)),remotes);
});
om.next.transform_reads = (function om$next$transform_reads(r,tx){
var with_target = (function om$next$transform_reads_$_with_target(target,q){
if(!((target == null))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__26634 = cljs.core.first(q);
var G__26635 = target;
return (om.next.force.cljs$core$IFn$_invoke$arity$2 ? om.next.force.cljs$core$IFn$_invoke$arity$2(G__26634,G__26635) : om.next.force.call(null,G__26634,G__26635));
})()], null);
} else {
return q;
}
});
var add_focused_query = (function om$next$transform_reads_$_add_focused_query(k,target,tx__$1,c){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(tx__$1,(function (){var G__26638 = c;
var G__26639 = with_target(target,om.next.focus_query(om.next.get_query(c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null)));
return (om.next.full_query.cljs$core$IFn$_invoke$arity$2 ? om.next.full_query.cljs$core$IFn$_invoke$arity$2(G__26638,G__26639) : om.next.full_query.call(null,G__26638,G__26639));
})());
});
var exprs = cljs.core.seq(tx);
var tx_SINGLEQUOTE_ = cljs.core.PersistentVector.EMPTY;
while(true){
if(!((exprs == null))){
var expr = cljs.core.first(exprs);
var ast = om.next.impl.parser.expr__GT_ast(expr);
var key = cljs.core.cst$kw$key.cljs$core$IFn$_invoke$arity$1(ast);
var tgt = cljs.core.cst$kw$target.cljs$core$IFn$_invoke$arity$1(ast);
if((key instanceof cljs.core.Keyword)){
var G__26640 = cljs.core.next(exprs);
var G__26641 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (exprs,tx_SINGLEQUOTE_,expr,ast,key,tgt){
return (function (p1__26606_SHARP_,p2__26607_SHARP_){
return add_focused_query(key,tgt,p1__26606_SHARP_,p2__26607_SHARP_);
});})(exprs,tx_SINGLEQUOTE_,expr,ast,key,tgt))
,tx_SINGLEQUOTE_,(om.next.ref__GT_components.cljs$core$IFn$_invoke$arity$2 ? om.next.ref__GT_components.cljs$core$IFn$_invoke$arity$2(r,key) : om.next.ref__GT_components.call(null,r,key)));
exprs = G__26640;
tx_SINGLEQUOTE_ = G__26641;
continue;
} else {
var G__26642 = cljs.core.next(exprs);
var G__26643 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(tx_SINGLEQUOTE_,expr);
exprs = G__26642;
tx_SINGLEQUOTE_ = G__26643;
continue;
}
} else {
return tx_SINGLEQUOTE_;
}
break;
}
});
/**
 * Change the query of a component. Takes a map containing :params and/or
 * :query. :params should be a map of new bindings and :query should be a query
 * expression. Will schedule a re-render as well as remote re-sends if
 * necessary.
 */
om.next.set_query_BANG_ = (function om$next$set_query_BANG_(var_args){
var args26644 = [];
var len__19301__auto___26655 = arguments.length;
var i__19302__auto___26656 = (0);
while(true){
if((i__19302__auto___26656 < len__19301__auto___26655)){
args26644.push((arguments[i__19302__auto___26656]));

var G__26657 = (i__19302__auto___26656 + (1));
i__19302__auto___26656 = G__26657;
continue;
} else {
}
break;
}

var G__26646 = args26644.length;
switch (G__26646) {
case 2:
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26644.length)].join('')));

}
});

om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (x,params_AMPERSAND_query){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3(x,params_AMPERSAND_query,null);
});

om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (x,p__26647,reads){
var map__26648 = p__26647;
var map__26648__$1 = ((((!((map__26648 == null)))?((((map__26648.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26648.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26648):map__26648);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26648__$1,cljs.core.cst$kw$params);
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26648__$1,cljs.core.cst$kw$query);
if(cljs.core.truth_((function (){var or__18243__auto__ = (om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x));
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return om.next.component_QMARK_(x);
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$x),cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$x))], 0)))].join('')));
}

if((!((params == null))) || (!((query == null)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$not,cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$params)),cljs.core.list(cljs.core.cst$sym$not,cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$query)))], 0)))].join('')));
}

if(((reads == null)) || (cljs.core.vector_QMARK_(reads))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$reads),cljs.core.list(cljs.core.cst$sym$vector_QMARK_,cljs.core.cst$sym$reads))], 0)))].join('')));
}

var r = ((om.next.component_QMARK_(x))?om.next.get_reconciler(x):x);
var c = ((om.next.component_QMARK_(x))?x:null);
var root = cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__26650 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(r);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__26650) : cljs.core.deref.call(null,G__26650));
})());
var cfg = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r);
var st = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg);
var id = cljs.core.random_uuid();
var _ = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cfg).add(id,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(st) : cljs.core.deref.call(null,st)));
var temp__4425__auto___26659 = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(cfg);
if(cljs.core.truth_(temp__4425__auto___26659)){
var l_26660 = temp__4425__auto___26659;
var G__26652_26661 = l_26660;
var G__26653_26662 = [cljs.core.str((function (){var temp__4425__auto____$1 = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?om.next.ident(c,om.next.props(c)):null);
if(cljs.core.truth_(temp__4425__auto____$1)){
var ref = temp__4425__auto____$1;
return [cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ref], 0))),cljs.core.str(" ")].join('');
} else {
return null;
}
})()),cljs.core.str((cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?"reconciler ":null)),cljs.core.str((cljs.core.truth_(query)?(function (){


return ", ";
})()
:null)),cljs.core.str((cljs.core.truth_(params)?(function (){


return " ";
})()
:null)),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([id], 0)))].join('');
goog.log.info(G__26652_26661,G__26653_26662);
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(st,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_queries,(function (){var or__18243__auto__ = c;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return root;
}
})()], null),cljs.core.merge,cljs.core.array_seq([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(query)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$query,query], null):null),(cljs.core.truth_(params)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$params,params], null):null)], 0))], 0));

if((!((c == null))) && ((reads == null))){
om.next.protocols.queue_BANG_(r,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [c], null));
} else {
}

if((reads == null)){
} else {
om.next.protocols.queue_BANG_(r,reads);
}

om.next.protocols.reindex_BANG_(r);

var rootq_26663 = ((!((c == null)))?(om.next.full_query.cljs$core$IFn$_invoke$arity$1 ? om.next.full_query.cljs$core$IFn$_invoke$arity$1(c) : om.next.full_query.call(null,c)):(((reads == null))?om.next.get_query(root):null));
var sends_26664 = om.next.gather_sends((om.next.to_env.cljs$core$IFn$_invoke$arity$1 ? om.next.to_env.cljs$core$IFn$_invoke$arity$1(cfg) : om.next.to_env.call(null,cfg)),cljs.core.into.cljs$core$IFn$_invoke$arity$2((function (){var or__18243__auto__ = rootq_26663;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),om.next.transform_reads(r,reads)),cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(cfg));
if(cljs.core.empty_QMARK_(sends_26664)){
} else {
om.next.protocols.queue_sends_BANG_(r,sends_26664);

(om.next.schedule_sends_BANG_.cljs$core$IFn$_invoke$arity$1 ? om.next.schedule_sends_BANG_.cljs$core$IFn$_invoke$arity$1(r) : om.next.schedule_sends_BANG_.call(null,r));
}

return null;
});

om.next.set_query_BANG_.cljs$lang$maxFixedArity = 3;
/**
 * Update a component's query and query parameters with a function.
 */
om.next.update_query_BANG_ = (function om$next$update_query_BANG_(var_args){
var args26665 = [];
var len__19301__auto___26691 = arguments.length;
var i__19302__auto___26692 = (0);
while(true){
if((i__19302__auto___26692 < len__19301__auto___26691)){
args26665.push((arguments[i__19302__auto___26692]));

var G__26693 = (i__19302__auto___26692 + (1));
i__19302__auto___26692 = G__26693;
continue;
} else {
}
break;
}

var G__26674 = args26665.length;
switch (G__26674) {
case 2:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var argseq__19320__auto__ = (new cljs.core.IndexedSeq(args26665.slice((6)),(0)));
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__19320__auto__);

}
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,f){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__26675 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__26675) : f.call(null,G__26675));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,f,arg0){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__26676 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__26677 = arg0;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__26676,G__26677) : f.call(null,G__26676,G__26677));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (component,f,arg0,arg1){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__26678 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__26679 = arg0;
var G__26680 = arg1;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__26678,G__26679,G__26680) : f.call(null,G__26678,G__26679,G__26680));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (component,f,arg0,arg1,arg2){
return om.next.set_query_BANG_.cljs$core$IFn$_invoke$arity$2(component,(function (){var G__26681 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__26682 = arg0;
var G__26683 = arg1;
var G__26684 = arg2;
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__26681,G__26682,G__26683,G__26684) : f.call(null,G__26681,G__26682,G__26683,G__26684));
})());
});

om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (component,f,arg0,arg1,arg2,arg3,arg_rest){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(om.next.set_query_BANG_,component,(function (){var G__26685 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,om.next.get_unbound_query(component),cljs.core.cst$kw$params,om.next.get_params(component)], null);
var G__26686 = arg0;
var G__26687 = arg1;
var G__26688 = arg2;
var G__26689 = arg3;
var G__26690 = arg_rest;
return (f.cljs$core$IFn$_invoke$arity$6 ? f.cljs$core$IFn$_invoke$arity$6(G__26685,G__26686,G__26687,G__26688,G__26689,G__26690) : f.call(null,G__26685,G__26686,G__26687,G__26688,G__26689,G__26690));
})());
});

om.next.update_query_BANG_.cljs$lang$applyTo = (function (seq26666){
var G__26667 = cljs.core.first(seq26666);
var seq26666__$1 = cljs.core.next(seq26666);
var G__26668 = cljs.core.first(seq26666__$1);
var seq26666__$2 = cljs.core.next(seq26666__$1);
var G__26669 = cljs.core.first(seq26666__$2);
var seq26666__$3 = cljs.core.next(seq26666__$2);
var G__26670 = cljs.core.first(seq26666__$3);
var seq26666__$4 = cljs.core.next(seq26666__$3);
var G__26671 = cljs.core.first(seq26666__$4);
var seq26666__$5 = cljs.core.next(seq26666__$4);
var G__26672 = cljs.core.first(seq26666__$5);
var seq26666__$6 = cljs.core.next(seq26666__$5);
return om.next.update_query_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26667,G__26668,G__26669,G__26670,G__26671,G__26672,seq26666__$6);
});

om.next.update_query_BANG_.cljs$lang$maxFixedArity = (6);
/**
 * Returns true if the component is mounted.
 */
om.next.mounted_QMARK_ = (function om$next$mounted_QMARK_(x){
return (om.next.component_QMARK_(x)) && (x.isMounted());
});
/**
 * Returns the component associated with a component's React ref.
 */
om.next.react_ref = (function om$next$react_ref(component,name){
var G__26696 = component.refs;
var G__26696__$1 = (((G__26696 == null))?null:goog.object.get(G__26696,name));
return G__26696__$1;
});
/**
 * Returns the component's children.
 */
om.next.children = (function om$next$children(component){
return component.props.children;
});
om.next.update_component_BANG_ = (function om$next$update_component_BANG_(c,next_props){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

om.next.update_props_BANG_(c,next_props);

return c.forceUpdate();
});
om.next.should_update_QMARK_ = (function om$next$should_update_QMARK_(var_args){
var args26697 = [];
var len__19301__auto___26700 = arguments.length;
var i__19302__auto___26701 = (0);
while(true){
if((i__19302__auto___26701 < len__19301__auto___26700)){
args26697.push((arguments[i__19302__auto___26701]));

var G__26702 = (i__19302__auto___26701 + (1));
i__19302__auto___26701 = G__26702;
continue;
} else {
}
break;
}

var G__26699 = args26697.length;
switch (G__26699) {
case 2:
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26697.length)].join('')));

}
});

om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (c,next_props){
return om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props,null);
});

om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (c,next_props,next_state){
if(om.next.component_QMARK_(c)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$c)], 0)))].join('')));
}

return c.shouldComponentUpdate({"omcljs$value": next_props},{"omcljs$state": next_state});
});

om.next.should_update_QMARK_.cljs$lang$maxFixedArity = 3;
om.next.class_path = (function om$next$class_path(c){

new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pre,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.next.component_QMARK_(c)], null)], null);

var c__$1 = c;
var ret = cljs.core._conj(cljs.core.List.EMPTY,cljs.core.type(c__$1));
while(true){
var temp__4423__auto__ = om.next.parent(c__$1);
if(cljs.core.truth_(temp__4423__auto__)){
var p = temp__4423__auto__;
if(om.next.iquery_QMARK_(p)){
var G__26706 = p;
var G__26707 = cljs.core.cons(cljs.core.type(p),ret);
c__$1 = G__26706;
ret = G__26707;
continue;
} else {
var G__26708 = p;
var G__26709 = ret;
c__$1 = G__26708;
ret = G__26709;
continue;
}
} else {
var seen = (function (){var G__26705 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26705) : cljs.core.atom.call(null,G__26705));
})();
return cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (c__$1,ret,seen,temp__4423__auto__){
return (function (x){
if(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(seen) : cljs.core.deref.call(null,seen)),x)){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(seen,cljs.core.conj,x);

return x;
}
});})(c__$1,ret,seen,temp__4423__auto__))
,ret);
}
break;
}
});
/**
 * Given a class or mounted component x and a ref to an instantiated component
 * or class that defines a subquery, pick the most specific subquery. If the
 * component is mounted subquery-ref will be used, subquery-class otherwise.
 */
om.next.subquery = (function om$next$subquery(x,subquery_ref,subquery_class){
if(((subquery_ref instanceof cljs.core.Keyword)) || (typeof subquery_ref === 'string')){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$keyword_QMARK_,cljs.core.cst$sym$subquery_DASH_ref),cljs.core.list(cljs.core.cst$sym$string_QMARK_,cljs.core.cst$sym$subquery_DASH_ref))], 0)))].join('')));
}

if(cljs.core.fn_QMARK_(subquery_class)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$fn_QMARK_,cljs.core.cst$sym$subquery_DASH_class)], 0)))].join('')));
}

var ref = (function (){var G__26711 = subquery_ref;
var G__26711__$1 = (((subquery_ref instanceof cljs.core.Keyword))?[cljs.core.str(G__26711)].join(''):G__26711);
return G__26711__$1;
})();
if((om.next.component_QMARK_(x)) && (om.next.mounted_QMARK_(x))){
return om.next.get_query(om.next.react_ref(x,ref));
} else {
return om.next.get_query(subquery_class);
}
});
/**
 * Given a component return its ident
 */
om.next.get_ident = (function om$next$get_ident(component){
if(om.next.component_QMARK_(component)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$component)], 0)))].join('')));
}

return om.next.ident(component,om.next.props(component));
});
om.next.basis_t = (function om$next$basis_t(reconciler){
return om.next.protocols.basis_t(reconciler);
});
om.next.schedule_render_BANG_ = (function om$next$schedule_render_BANG_(reconciler){
if(cljs.core.truth_(om.next.protocols.schedule_render_BANG_(reconciler))){
var f = (function (){
return om.next.protocols.reconcile_BANG_(reconciler);
});
if(cljs.core.fn_QMARK_(om.next._STAR_raf_STAR_)){
return (om.next._STAR_raf_STAR_.cljs$core$IFn$_invoke$arity$1 ? om.next._STAR_raf_STAR_.cljs$core$IFn$_invoke$arity$1(f) : om.next._STAR_raf_STAR_.call(null,f));
} else {
if(!(typeof requestAnimationFrame !== 'undefined')){
return setTimeout(f,(16));
} else {
return requestAnimationFrame(f);

}
}
} else {
return null;
}
});
om.next.schedule_sends_BANG_ = (function om$next$schedule_sends_BANG_(reconciler){
if(cljs.core.truth_(om.next.protocols.schedule_sends_BANG_(reconciler))){
var G__26714 = (function (){
return om.next.protocols.send_BANG_(reconciler);
});
var G__26715 = (0);
return setTimeout(G__26714,G__26715);
} else {
return null;
}
});
/**
 * Given a root component class and a target root DOM node, instantiate and
 * render the root class using the reconciler's :state property. The reconciler
 * will continue to observe changes to :state and keep the target node in sync.
 * Note a reconciler may have only one root. If invoked on a reconciler with an
 * existing root, the new root will replace the old one.
 */
om.next.add_root_BANG_ = (function om$next$add_root_BANG_(var_args){
var args26716 = [];
var len__19301__auto___26719 = arguments.length;
var i__19302__auto___26720 = (0);
while(true){
if((i__19302__auto___26720 < len__19301__auto___26719)){
args26716.push((arguments[i__19302__auto___26720]));

var G__26721 = (i__19302__auto___26720 + (1));
i__19302__auto___26720 = G__26721;
continue;
} else {
}
break;
}

var G__26718 = args26716.length;
switch (G__26718) {
case 3:
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26716.length)].join('')));

}
});

om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (reconciler,root_class,target){
return om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4(reconciler,root_class,target,null);
});

om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (reconciler,root_class,target,options){
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(reconciler) : om.next.reconciler_QMARK_.call(null,reconciler)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

if(cljs.core.fn_QMARK_(root_class)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$fn_QMARK_,cljs.core.cst$sym$root_DASH_class)], 0)))].join('')));
}

var temp__4425__auto___26723 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(om.next.roots) : cljs.core.deref.call(null,om.next.roots)),target);
if(cljs.core.truth_(temp__4425__auto___26723)){
var old_reconciler_26724 = temp__4425__auto___26723;
(om.next.remove_root_BANG_.cljs$core$IFn$_invoke$arity$2 ? om.next.remove_root_BANG_.cljs$core$IFn$_invoke$arity$2(old_reconciler_26724,target) : om.next.remove_root_BANG_.call(null,old_reconciler_26724,target));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(om.next.roots,cljs.core.assoc,target,reconciler);

return om.next.protocols.add_root_BANG_(reconciler,root_class,target,options);
});

om.next.add_root_BANG_.cljs$lang$maxFixedArity = 4;
/**
 * Remove a root target (a DOM element) from a reconciler. The reconciler will
 * no longer attempt to reconcile application state with the specified root.
 */
om.next.remove_root_BANG_ = (function om$next$remove_root_BANG_(reconciler,target){
return om.next.protocols.remove_root_BANG_(reconciler,target);
});
/**
 * Create an Om Next root without an actual DOM target. Useful in devcards
 * testing context.
 */
om.next.mock_root = (function om$next$mock_root(reconciler,root_class){
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(reconciler) : om.next.reconciler_QMARK_.call(null,reconciler)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

if(cljs.core.fn_QMARK_(root_class)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$fn_QMARK_,cljs.core.cst$sym$root_DASH_class)], 0)))].join('')));
}

return om.next.protocols.add_root_BANG_(reconciler,root_class,null,null);
});

/**
 * @interface
 */
om.next.ITxIntercept = function(){};

/**
 * An optional protocol that component may implement to intercept child
 *   transactions.
 */
om.next.tx_intercept = (function om$next$tx_intercept(c,tx){
if((!((c == null))) && (!((c.om$next$ITxIntercept$tx_intercept$arity$2 == null)))){
return c.om$next$ITxIntercept$tx_intercept$arity$2(c,tx);
} else {
var x__18898__auto__ = (((c == null))?null:c);
var m__18899__auto__ = (om.next.tx_intercept[goog.typeOf(x__18898__auto__)]);
if(!((m__18899__auto__ == null))){
return (m__18899__auto__.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto__.cljs$core$IFn$_invoke$arity$2(c,tx) : m__18899__auto__.call(null,c,tx));
} else {
var m__18899__auto____$1 = (om.next.tx_intercept["_"]);
if(!((m__18899__auto____$1 == null))){
return (m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__18899__auto____$1.cljs$core$IFn$_invoke$arity$2(c,tx) : m__18899__auto____$1.call(null,c,tx));
} else {
throw cljs.core.missing_protocol("ITxIntercept.tx-intercept",c);
}
}
}
});

om.next.to_env = (function om$next$to_env(x){
var config = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(x):x);
return cljs.core.select_keys(config,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$shared,cljs.core.cst$kw$parser,cljs.core.cst$kw$logger,cljs.core.cst$kw$pathopt], null));
});
om.next.transact_STAR_ = (function om$next$transact_STAR_(r,c,ref,tx){
var cfg = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r);
var ref__$1 = (cljs.core.truth_((function (){var and__18231__auto__ = c;
if(cljs.core.truth_(and__18231__auto__)){
var and__18231__auto____$1 = ((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false);
if(and__18231__auto____$1){
return cljs.core.not(ref);
} else {
return and__18231__auto____$1;
}
} else {
return and__18231__auto__;
}
})())?om.next.ident(c,om.next.props(c)):ref);
var env = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([om.next.to_env(cfg),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reconciler,r,cljs.core.cst$kw$component,c], null),(cljs.core.truth_(ref__$1)?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ref,ref__$1], null):null)], 0));
var id = cljs.core.random_uuid();
var _ = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cfg).add(id,(function (){var G__26733 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__26733) : cljs.core.deref.call(null,G__26733));
})());
var ___$1 = (function (){var temp__4425__auto__ = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(cfg);
if(cljs.core.truth_(temp__4425__auto__)){
var l = temp__4425__auto__;
var G__26734 = l;
var G__26735 = [cljs.core.str((cljs.core.truth_(ref__$1)?[cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ref__$1], 0))),cljs.core.str(" ")].join(''):null)),cljs.core.str("transacted '"),cljs.core.str(tx),cljs.core.str(", "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([id], 0)))].join('');
return goog.log.info(G__26734,G__26735);
} else {
return null;
}
})();
var v = cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(cfg).call(null,env,tx);
var snds = om.next.gather_sends(env,tx,cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(cfg));
var q = (function (){var G__26736 = cljs.core.PersistentVector.EMPTY;
var G__26736__$1 = ((!((c == null)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__26736,c):G__26736);
var G__26736__$2 = ((!((ref__$1 == null)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__26736__$1,ref__$1):G__26736__$1);
return G__26736__$2;
})();
om.next.protocols.queue_BANG_(r,cljs.core.into.cljs$core$IFn$_invoke$arity$3(q,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol_QMARK_),cljs.core.keys(v)));

if(cljs.core.empty_QMARK_(snds)){
return null;
} else {
om.next.protocols.queue_sends_BANG_(r,snds);

return om.next.schedule_sends_BANG_(r);
}
});
/**
 * Given a reconciler or component run a transaction. tx is a parse expression
 * that should include mutations followed by any necessary read. The reads will
 * be used to trigger component re-rendering.
 * 
 * Example:
 * 
 *   (om/transact! widget
 *     '[(do/this!) (do/that!)
 *       :read/this :read/that])
 */
om.next.transact_BANG_ = (function om$next$transact_BANG_(var_args){
var args26737 = [];
var len__19301__auto___26742 = arguments.length;
var i__19302__auto___26743 = (0);
while(true){
if((i__19302__auto___26743 < len__19301__auto___26742)){
args26737.push((arguments[i__19302__auto___26743]));

var G__26744 = (i__19302__auto___26743 + (1));
i__19302__auto___26743 = G__26744;
continue;
} else {
}
break;
}

var G__26739 = args26737.length;
switch (G__26739) {
case 2:
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26737.length)].join('')));

}
});

om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (x,tx){
if(cljs.core.truth_((function (){var or__18243__auto__ = om.next.component_QMARK_(x);
if(or__18243__auto__){
return or__18243__auto__;
} else {
return (om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x));
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$component_QMARK_,cljs.core.cst$sym$x),cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$x))], 0)))].join('')));
}

if(cljs.core.vector_QMARK_(tx)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$vector_QMARK_,cljs.core.cst$sym$tx)], 0)))].join('')));
}

if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))){
return om.next.transact_STAR_(x,null,null,tx);
} else {
if(om.next.iquery_QMARK_(x)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("transact! invoked by component "),cljs.core.str(x),cljs.core.str(" that does not implement IQuery")].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$iquery_QMARK_,cljs.core.cst$sym$x)], 0)))].join('')));
}

var p = om.next.parent(x);
var x__$1 = x;
var tx__$1 = tx;
while(true){
if((p == null)){
var r = om.next.get_reconciler(x__$1);
return om.next.transact_STAR_(r,x__$1,null,om.next.transform_reads(r,tx__$1));
} else {
var vec__26740 = ((((!((p == null)))?(((false) || (p.om$next$ITxIntercept$))?true:false):false))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,om.next.tx_intercept(p,tx__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x__$1,tx__$1], null));
var x_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26740,(0),null);
var tx__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26740,(1),null);
var G__26746 = om.next.parent(p);
var G__26747 = x_SINGLEQUOTE_;
var G__26748 = tx__$2;
p = G__26746;
x__$1 = G__26747;
tx__$1 = G__26748;
continue;
}
break;
}
}
});

om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (r,ref,tx){
return om.next.transact_STAR_(r,null,ref,tx);
});

om.next.transact_BANG_.cljs$lang$maxFixedArity = 3;
/**
 * Create a parser. The argument is a map of two keys, :read and :mutate. Both
 * functions should have the signature (Env -> Key -> Params -> ParseResult).
 */
om.next.parser = (function om$next$parser(p__26749){
var map__26752 = p__26749;
var map__26752__$1 = ((((!((map__26752 == null)))?((((map__26752.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26752.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26752):map__26752);
var opts = map__26752__$1;
var read = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26752__$1,cljs.core.cst$kw$read);
var mutate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26752__$1,cljs.core.cst$kw$mutate);
if(cljs.core.map_QMARK_(opts)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$map_QMARK_,cljs.core.cst$sym$opts)], 0)))].join('')));
}

return om.next.impl.parser.parser(opts);
});
/**
 * Helper function for implementing :read and :mutate as multimethods. Use this
 * as the dispatch-fn.
 */
om.next.dispatch = (function om$next$dispatch(_,key,___$1){
return key;
});
/**
 * Given a query expression convert it into an AST.
 */
om.next.query__GT_ast = (function om$next$query__GT_ast(query_expr){
return om.next.impl.parser.query__GT_ast(query_expr);
});
om.next.ast__GT_query = (function om$next$ast__GT_query(query_ast){

return om.next.impl.parser.ast__GT_expr.cljs$core$IFn$_invoke$arity$2(query_ast,true);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {om.next.protocols.IIndexer}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
om.next.Indexer = (function (indexes,__meta,__extmap,__hash){
this.indexes = indexes;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229700362;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
om.next.Indexer.prototype.om$next$protocols$IIndexer$ = true;

om.next.Indexer.prototype.om$next$protocols$IIndexer$index_root$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
var prop__GT_classes = (function (){var G__26760 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26760) : cljs.core.atom.call(null,G__26760));
})();
var class_path__GT_query = (function (){var G__26761 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26761) : cljs.core.atom.call(null,G__26761));
})();
var rootq = om.next.get_query(x);
var class$ = (function (){var G__26762 = x;
var G__26762__$1 = ((om.next.component_QMARK_(x))?cljs.core.type(G__26762):G__26762);
return G__26762__$1;
})();
var build_index_STAR_ = ((function (prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function om$next$build_index_STAR_(class$__$1,query,path,classpath){
var recursive_QMARK_ = cljs.core.some(cljs.core.PersistentHashSet.fromArray([class$__$1], true),classpath);
var classpath__$1 = (function (){var G__26840 = classpath;
var G__26840__$1 = (((!((class$__$1 == null))) && (cljs.core.not(recursive_QMARK_)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__26840,class$__$1):G__26840);
return G__26840__$1;
})();
if(cljs.core.truth_(class$__$1)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(class_path__GT_query,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [classpath__$1], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.array_seq([om.next.query_template(om.next.focus_query(rootq,path),path)], 0));
} else {
}

if(cljs.core.truth_(recursive_QMARK_)){
return null;
} else {
if(cljs.core.vector_QMARK_(query)){
var map__26841 = cljs.core.group_by(om.next.join_QMARK_,query);
var map__26841__$1 = ((((!((map__26841 == null)))?((((map__26841.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26841.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26841):map__26841);
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26841__$1,false);
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26841__$1,true);
if(cljs.core.truth_(class$__$1)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__26754_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__26754_SHARP_,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$dispatch_DASH_key,om.next.impl.parser.expr__GT_ast),props),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.fromArray([class$__$1], true)))], 0));
});})(map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);
} else {
}

var seq__26843 = cljs.core.seq(joins);
var chunk__26844 = null;
var count__26845 = (0);
var i__26846 = (0);
while(true){
if((i__26846 < count__26845)){
var join = chunk__26844.cljs$core$IIndexed$_nth$arity$2(null,i__26846);
var vec__26847_26863 = om.next.join_entry(join);
var prop_26864 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26847_26863,(0),null);
var query_SINGLEQUOTE__26865 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26847_26863,(1),null);
var query_SINGLEQUOTE__26866__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$$$$,query_SINGLEQUOTE__26865))?query:query_SINGLEQUOTE__26865);
if(cljs.core.truth_(class$__$1)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (seq__26843,chunk__26844,count__26845,i__26846,vec__26847_26863,prop_26864,query_SINGLEQUOTE__26865,query_SINGLEQUOTE__26866__$1,join,map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__26755_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__26755_SHARP_,cljs.core.PersistentArrayMap.fromArray([prop_26864,cljs.core.PersistentHashSet.fromArray([class$__$1], true)], true, false)], 0));
});})(seq__26843,chunk__26844,count__26845,i__26846,vec__26847_26863,prop_26864,query_SINGLEQUOTE__26865,query_SINGLEQUOTE__26866__$1,join,map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);
} else {
}

var class_SINGLEQUOTE__26867 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE__26866__$1));
om$next$build_index_STAR_(class_SINGLEQUOTE__26867,query_SINGLEQUOTE__26866__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop_26864),classpath__$1);

var G__26868 = seq__26843;
var G__26869 = chunk__26844;
var G__26870 = count__26845;
var G__26871 = (i__26846 + (1));
seq__26843 = G__26868;
chunk__26844 = G__26869;
count__26845 = G__26870;
i__26846 = G__26871;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__26843);
if(temp__4425__auto__){
var seq__26843__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__26843__$1)){
var c__19046__auto__ = cljs.core.chunk_first(seq__26843__$1);
var G__26872 = cljs.core.chunk_rest(seq__26843__$1);
var G__26873 = c__19046__auto__;
var G__26874 = cljs.core.count(c__19046__auto__);
var G__26875 = (0);
seq__26843 = G__26872;
chunk__26844 = G__26873;
count__26845 = G__26874;
i__26846 = G__26875;
continue;
} else {
var join = cljs.core.first(seq__26843__$1);
var vec__26848_26876 = om.next.join_entry(join);
var prop_26877 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26848_26876,(0),null);
var query_SINGLEQUOTE__26878 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26848_26876,(1),null);
var query_SINGLEQUOTE__26879__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$$$$,query_SINGLEQUOTE__26878))?query:query_SINGLEQUOTE__26878);
if(cljs.core.truth_(class$__$1)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(prop__GT_classes,((function (seq__26843,chunk__26844,count__26845,i__26846,vec__26848_26876,prop_26877,query_SINGLEQUOTE__26878,query_SINGLEQUOTE__26879__$1,join,seq__26843__$1,temp__4425__auto__,map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1){
return (function (p1__26755_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__26755_SHARP_,cljs.core.PersistentArrayMap.fromArray([prop_26877,cljs.core.PersistentHashSet.fromArray([class$__$1], true)], true, false)], 0));
});})(seq__26843,chunk__26844,count__26845,i__26846,vec__26848_26876,prop_26877,query_SINGLEQUOTE__26878,query_SINGLEQUOTE__26879__$1,join,seq__26843__$1,temp__4425__auto__,map__26841,map__26841__$1,props,joins,recursive_QMARK_,classpath__$1,prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
);
} else {
}

var class_SINGLEQUOTE__26880 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE__26879__$1));
om$next$build_index_STAR_(class_SINGLEQUOTE__26880,query_SINGLEQUOTE__26879__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop_26877),classpath__$1);

var G__26881 = cljs.core.next(seq__26843__$1);
var G__26882 = null;
var G__26883 = (0);
var G__26884 = (0);
seq__26843 = G__26881;
chunk__26844 = G__26882;
count__26845 = G__26883;
i__26846 = G__26884;
continue;
}
} else {
return null;
}
}
break;
}
} else {
if(cljs.core.map_QMARK_(query)){
var seq__26849 = cljs.core.seq(query);
var chunk__26850 = null;
var count__26851 = (0);
var i__26852 = (0);
while(true){
if((i__26852 < count__26851)){
var vec__26853 = chunk__26850.cljs$core$IIndexed$_nth$arity$2(null,i__26852);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26853,(0),null);
var query_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26853,(1),null);
var class_SINGLEQUOTE__26885 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE_));
om$next$build_index_STAR_(class_SINGLEQUOTE__26885,query_SINGLEQUOTE_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop),classpath__$1);

var G__26886 = seq__26849;
var G__26887 = chunk__26850;
var G__26888 = count__26851;
var G__26889 = (i__26852 + (1));
seq__26849 = G__26886;
chunk__26850 = G__26887;
count__26851 = G__26888;
i__26852 = G__26889;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__26849);
if(temp__4425__auto__){
var seq__26849__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__26849__$1)){
var c__19046__auto__ = cljs.core.chunk_first(seq__26849__$1);
var G__26890 = cljs.core.chunk_rest(seq__26849__$1);
var G__26891 = c__19046__auto__;
var G__26892 = cljs.core.count(c__19046__auto__);
var G__26893 = (0);
seq__26849 = G__26890;
chunk__26850 = G__26891;
count__26851 = G__26892;
i__26852 = G__26893;
continue;
} else {
var vec__26854 = cljs.core.first(seq__26849__$1);
var prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26854,(0),null);
var query_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26854,(1),null);
var class_SINGLEQUOTE__26894 = cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query_SINGLEQUOTE_));
om$next$build_index_STAR_(class_SINGLEQUOTE__26894,query_SINGLEQUOTE_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,prop),classpath__$1);

var G__26895 = cljs.core.next(seq__26849__$1);
var G__26896 = null;
var G__26897 = (0);
var G__26898 = (0);
seq__26849 = G__26895;
chunk__26850 = G__26896;
count__26851 = G__26897;
i__26852 = G__26898;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
}
});})(prop__GT_classes,class_path__GT_query,rootq,class$,___$1))
;
build_index_STAR_(class$,rootq,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.indexes,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$prop_DASH__GT_classes,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(prop__GT_classes) : cljs.core.deref.call(null,prop__GT_classes)),cljs.core.cst$kw$class_DASH_path_DASH__GT_query,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(class_path__GT_query) : cljs.core.deref.call(null,class_path__GT_query))], null));
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$index_component_BANG_$arity$2 = (function (_,c){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.indexes,((function (___$1){
return (function (indexes__$1){
var indexes__$2 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.type(c)], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),c);
var ref = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?om.next.ident(c,om.next.props(c)):null);
if(!((ref == null))){
var G__26856 = indexes__$2;
var G__26856__$1 = (cljs.core.truth_(ref)?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__26856,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,ref], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),c):G__26856);
return G__26856__$1;
} else {
return indexes__$2;
}
});})(___$1))
);
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$drop_component_BANG_$arity$2 = (function (_,c){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.indexes,((function (___$1){
return (function (indexes__$1){
var indexes__$2 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.type(c)], null),cljs.core.disj,c);
var ref = ((((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false))?om.next.ident(c,om.next.props(c)):null);
if(!((ref == null))){
var G__26858 = indexes__$2;
var G__26858__$1 = (cljs.core.truth_(ref)?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__26858,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,ref], null),cljs.core.disj,c):G__26858);
return G__26858__$1;
} else {
return indexes__$2;
}
});})(___$1))
);
});

om.next.Indexer.prototype.om$next$protocols$IIndexer$key__GT_components$arity$2 = (function (_,k){
var self__ = this;
var ___$1 = this;
var indexes__$1 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.indexes) : cljs.core.deref.call(null,self__.indexes));
if(om.next.component_QMARK_(k)){
return cljs.core.PersistentHashSet.fromArray([k], true);
} else {
var cs = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ref_DASH__GT_components,k], null),cljs.core.cst$kw$om$next_SLASH_not_DASH_found);
if(!(cljs.core.keyword_identical_QMARK_(cljs.core.cst$kw$om$next_SLASH_not_DASH_found,cs))){
return cs;
} else {
if((k instanceof cljs.core.Keyword)){
var cs__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prop_DASH__GT_classes,k], null));
return cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (cs__$1,cs,indexes__$1,___$1){
return (function (p1__26756_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(indexes__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,p1__26756_SHARP_], null));
});})(cs__$1,cs,indexes__$1,___$1))
),cljs.core.completing.cljs$core$IFn$_invoke$arity$1(cljs.core.into),cljs.core.PersistentHashSet.EMPTY,cs__$1);
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
}
}
});

om.next.Indexer.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__18857__auto__,k__18858__auto__){
var self__ = this;
var this__18857__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__18857__auto____$1,k__18858__auto__,null);
});

om.next.Indexer.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__18859__auto__,k26758,else__18860__auto__){
var self__ = this;
var this__18859__auto____$1 = this;
var G__26859 = (((k26758 instanceof cljs.core.Keyword))?k26758.fqn:null);
switch (G__26859) {
case "indexes":
return self__.indexes;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k26758,else__18860__auto__);

}
});

om.next.Indexer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__18871__auto__,writer__18872__auto__,opts__18873__auto__){
var self__ = this;
var this__18871__auto____$1 = this;
var pr_pair__18874__auto__ = ((function (this__18871__auto____$1){
return (function (keyval__18875__auto__){
return cljs.core.pr_sequential_writer(writer__18872__auto__,cljs.core.pr_writer,""," ","",opts__18873__auto__,keyval__18875__auto__);
});})(this__18871__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__18872__auto__,pr_pair__18874__auto__,"#om.next.Indexer{",", ","}",opts__18873__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$indexes,self__.indexes],null))], null),self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IIterable$ = true;

om.next.Indexer.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__26757){
var self__ = this;
var G__26757__$1 = this;
return (new cljs.core.RecordIter((0),G__26757__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$indexes], null),cljs.core._iterator(self__.__extmap)));
});

om.next.Indexer.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__18855__auto__){
var self__ = this;
var this__18855__auto____$1 = this;
return self__.__meta;
});

om.next.Indexer.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__18851__auto__){
var self__ = this;
var this__18851__auto____$1 = this;
return (new om.next.Indexer(self__.indexes,self__.__meta,self__.__extmap,self__.__hash));
});

om.next.Indexer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__18861__auto__){
var self__ = this;
var this__18861__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__18852__auto__){
var self__ = this;
var this__18852__auto____$1 = this;
var h__18678__auto__ = self__.__hash;
if(!((h__18678__auto__ == null))){
return h__18678__auto__;
} else {
var h__18678__auto____$1 = cljs.core.hash_imap(this__18852__auto____$1);
self__.__hash = h__18678__auto____$1;

return h__18678__auto____$1;
}
});

om.next.Indexer.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__18853__auto__,other__18854__auto__){
var self__ = this;
var this__18853__auto____$1 = this;
if(cljs.core.truth_((function (){var and__18231__auto__ = other__18854__auto__;
if(cljs.core.truth_(and__18231__auto__)){
var and__18231__auto____$1 = (this__18853__auto____$1.constructor === other__18854__auto__.constructor);
if(and__18231__auto____$1){
return cljs.core.equiv_map(this__18853__auto____$1,other__18854__auto__);
} else {
return and__18231__auto____$1;
}
} else {
return and__18231__auto__;
}
})())){
return true;
} else {
return false;
}
});

om.next.Indexer.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__18866__auto__,k__18867__auto__){
var self__ = this;
var this__18866__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$indexes,null], null), null),k__18867__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__18866__auto____$1),self__.__meta),k__18867__auto__);
} else {
return (new om.next.Indexer(self__.indexes,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__18867__auto__)),null));
}
});

om.next.Indexer.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__18864__auto__,k__18865__auto__,G__26757){
var self__ = this;
var this__18864__auto____$1 = this;
var pred__26860 = cljs.core.keyword_identical_QMARK_;
var expr__26861 = k__18865__auto__;
if(cljs.core.truth_((pred__26860.cljs$core$IFn$_invoke$arity$2 ? pred__26860.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$indexes,expr__26861) : pred__26860.call(null,cljs.core.cst$kw$indexes,expr__26861)))){
return (new om.next.Indexer(G__26757,self__.__meta,self__.__extmap,null));
} else {
return (new om.next.Indexer(self__.indexes,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__18865__auto__,G__26757),null));
}
});

om.next.Indexer.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__18869__auto__){
var self__ = this;
var this__18869__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$indexes,self__.indexes],null))], null),self__.__extmap));
});

om.next.Indexer.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__18856__auto__,G__26757){
var self__ = this;
var this__18856__auto____$1 = this;
return (new om.next.Indexer(self__.indexes,G__26757,self__.__extmap,self__.__hash));
});

om.next.Indexer.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__18862__auto__,entry__18863__auto__){
var self__ = this;
var this__18862__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__18863__auto__)){
return cljs.core._assoc(this__18862__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__18863__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__18863__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__18862__auto____$1,entry__18863__auto__);
}
});

om.next.Indexer.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.indexes) : cljs.core.deref.call(null,self__.indexes));
});

om.next.Indexer.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$indexes], null);
});

om.next.Indexer.cljs$lang$type = true;

om.next.Indexer.cljs$lang$ctorPrSeq = (function (this__18891__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"om.next/Indexer");
});

om.next.Indexer.cljs$lang$ctorPrWriter = (function (this__18891__auto__,writer__18892__auto__){
return cljs.core._write(writer__18892__auto__,"om.next/Indexer");
});

om.next.__GT_Indexer = (function om$next$__GT_Indexer(indexes){
return (new om.next.Indexer(indexes,null,null,null));
});

om.next.map__GT_Indexer = (function om$next$map__GT_Indexer(G__26759){
return (new om.next.Indexer(cljs.core.cst$kw$indexes.cljs$core$IFn$_invoke$arity$1(G__26759),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__26759,cljs.core.cst$kw$indexes),null));
});

/**
 * Given a function (Component -> Ref), return an indexer.
 */
om.next.indexer = (function om$next$indexer(){
return (new om.next.Indexer((function (){var G__26901 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class_DASH__GT_components,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$ref_DASH__GT_components,cljs.core.PersistentArrayMap.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26901) : cljs.core.atom.call(null,G__26901));
})(),null,null,null));
});
/**
 * PRIVATE: Get the indexer associated with the reconciler.
 */
om.next.get_indexer = (function om$next$get_indexer(reconciler){
if(cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(reconciler) : om.next.reconciler_QMARK_.call(null,reconciler)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

return cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler));
});
/**
 * Return all components for a given ref.
 */
om.next.ref__GT_components = (function om$next$ref__GT_components(x,ref){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return om.next.protocols.key__GT_components(indexer,ref);
});
/**
 * Get any component from the indexer that matches the ref.
 */
om.next.ref__GT_any = (function om$next$ref__GT_any(x,ref){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return cljs.core.first(om.next.protocols.key__GT_components(indexer,ref));
});
/**
 * Get any component from the indexer that matches the component class.
 */
om.next.class__GT_any = (function om$next$class__GT_any(x,class$){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
return cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(indexer) : cljs.core.deref.call(null,indexer)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH__GT_components,class$], null)));
});
/**
 * Given x (a reconciler or indexer) and y (a component or component class
 * path), return the queries for that path.
 */
om.next.class_path__GT_queries = (function om$next$class_path__GT_queries(x,y){
var indexer = (cljs.core.truth_((om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1 ? om.next.reconciler_QMARK_.cljs$core$IFn$_invoke$arity$1(x) : om.next.reconciler_QMARK_.call(null,x)))?om.next.get_indexer(x):x);
var cp = ((om.next.component_QMARK_(y))?om.next.class_path(y):y);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(clojure.zip.root),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(indexer) : cljs.core.deref.call(null,indexer)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,cp], null)));
});
/**
 * Returns the absolute query for a given component, not relative like
 * om.next/get-query.
 */
om.next.full_query = (function om$next$full_query(var_args){
var args26903 = [];
var len__19301__auto___26908 = arguments.length;
var i__19302__auto___26909 = (0);
while(true){
if((i__19302__auto___26909 < len__19301__auto___26908)){
args26903.push((arguments[i__19302__auto___26909]));

var G__26910 = (i__19302__auto___26909 + (1));
i__19302__auto___26909 = G__26910;
continue;
} else {
}
break;
}

var G__26905 = args26903.length;
switch (G__26905) {
case 1:
return om.next.full_query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.full_query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26903.length)].join('')));

}
});

om.next.full_query.cljs$core$IFn$_invoke$arity$1 = (function (component){
if(om.next.iquery_QMARK_(component)){
if((om.next.path(component) == null)){
return om.next.replace(cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((function (){var G__26906 = om.next.get_indexer(om.next.get_reconciler(component));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__26906) : cljs.core.deref.call(null,G__26906));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,om.next.class_path(component)], null))),om.next.get_query(component));
} else {
return om.next.full_query.cljs$core$IFn$_invoke$arity$2(component,om.next.get_query(component));
}
} else {
return null;
}
});

om.next.full_query.cljs$core$IFn$_invoke$arity$2 = (function (component,query){
if(om.next.iquery_QMARK_(component)){
var path_SINGLEQUOTE_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.number_QMARK_),om.next.path(component));
var cp = om.next.class_path(component);
var qs = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((function (){var G__26907 = om.next.get_indexer(om.next.get_reconciler(component));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__26907) : cljs.core.deref.call(null,G__26907));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class_DASH_path_DASH__GT_query,cp], null));
if(!(cljs.core.empty_QMARK_(qs))){
var q = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (path_SINGLEQUOTE_,cp,qs){
return (function (p1__26902_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(path_SINGLEQUOTE_,om.next.focus__GT_path.cljs$core$IFn$_invoke$arity$2(clojure.zip.root(p1__26902_SHARP_),path_SINGLEQUOTE_));
});})(path_SINGLEQUOTE_,cp,qs))
,qs));
if(!((q == null))){
return om.next.replace(q,query);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("No queries exist for component path "),cljs.core.str(cp),cljs.core.str(" or data path "),cljs.core.str(path_SINGLEQUOTE_)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$om$next_SLASH_no_DASH_queries], null));
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("No queries exist for component path "),cljs.core.str(cp)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$om$next_SLASH_no_DASH_queries], null));
}
} else {
return null;
}
});

om.next.full_query.cljs$lang$maxFixedArity = 2;
om.next.to_class = (function om$next$to_class(class$){
if((class$ == null)){
return null;
} else {
if(!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))){
var G__26915 = class$.prototype;
return Object.create(G__26915);
} else {
return class$;
}
}
});
/**
 * Returns true if x is an ident.
 */
om.next.ident_QMARK_ = (function om$next$ident_QMARK_(x){
return (cljs.core.vector_QMARK_(x)) && (((2) === cljs.core.count(x))) && ((cljs.core.nth.cljs$core$IFn$_invoke$arity$2(x,(0)) instanceof cljs.core.Keyword));
});
om.next.normalize_STAR_ = (function om$next$normalize_STAR_(query,data,refs,errs){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null),query)){
return data;
} else {
if(cljs.core.map_QMARK_(query)){
var class$ = om.next.to_class(cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(query)));
var ref = ((((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))?om.next.ident(class$,data):null);
if(!((ref == null))){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(om$next$normalize_STAR_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(query,cljs.core.first(ref)),data,refs,errs),cljs.core.assoc,cljs.core.cst$kw$om_SLASH_tag,cljs.core.first(ref));
} else {
throw (new Error("Union components must implement Ident"));
}
} else {
if(cljs.core.vector_QMARK_(data)){
return data;
} else {
var q = cljs.core.seq(query);
var ret = data;
while(true){
if(!((q == null))){
var node = cljs.core.first(q);
if(cljs.core.truth_(om.next.join_QMARK_(node))){
var vec__26931 = om.next.join_entry(node);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26931,(0),null);
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26931,(1),null);
var recursive_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$$$$,sel);
var sel__$1 = ((recursive_QMARK_)?query:sel);
var class$ = om.next.to_class(cljs.core.cst$kw$component.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(sel__$1)));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,k);
if((recursive_QMARK_) && (om.next.ident_QMARK_(v))){
var G__26938 = cljs.core.next(q);
var G__26939 = ret;
q = G__26938;
ret = G__26939;
continue;
} else {
if(cljs.core.map_QMARK_(v)){
var x = om$next$normalize_STAR_(sel__$1,v,refs,errs);
if(!(((class$ == null)) || (!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))))){
var i = om.next.ident(class$,v);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(refs,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(i),cljs.core.second(i)], null),cljs.core.merge,cljs.core.array_seq([x], 0));

var G__26940 = cljs.core.next(q);
var G__26941 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,i);
q = G__26940;
ret = G__26941;
continue;
} else {
var G__26942 = cljs.core.next(q);
var G__26943 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,x);
q = G__26942;
ret = G__26943;
continue;
}
} else {
if(cljs.core.vector_QMARK_(v)){
var xs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (q,ret,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node){
return (function (p1__26916_SHARP_){
return om$next$normalize_STAR_(sel__$1,p1__26916_SHARP_,refs,errs);
});})(q,ret,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node))
),v);
if(!(((class$ == null)) || (!(((!((class$ == null)))?(((false) || (class$.om$next$Ident$))?true:false):false))))){
var is = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (q,ret,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node){
return (function (p1__26917_SHARP_){
return om.next.ident(class$,p1__26917_SHARP_);
});})(q,ret,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node))
),xs);
if(cljs.core.vector_QMARK_(sel__$1)){
if(cljs.core.empty_QMARK_(is)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(refs,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.ffirst(is)], null),((function (q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node){
return (function (ys){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.merge,cljs.core.array_seq([ys,cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,is),xs)], 0));
});})(q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node))
);
}
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(refs,((function (q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node){
return (function (refs_SINGLEQUOTE_){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node){
return (function (ret__$1,p__26936){
var vec__26937 = p__26936;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26937,(0),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26937,(1),null);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(ret__$1,i,cljs.core.merge,x);
});})(q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node))
,refs_SINGLEQUOTE_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,is,xs));
});})(q,ret,is,xs,vec__26931,k,sel,recursive_QMARK_,sel__$1,class$,v,node))
);
}

var G__26944 = cljs.core.next(q);
var G__26945 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,is);
q = G__26944;
ret = G__26945;
continue;
} else {
var G__26946 = cljs.core.next(q);
var G__26947 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,xs);
q = G__26946;
ret = G__26947;
continue;
}
} else {
if((v == null)){
var G__26948 = cljs.core.next(q);
var G__26949 = ret;
q = G__26948;
ret = G__26949;
continue;
} else {
var G__26950 = cljs.core.next(q);
var G__26951 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,v);
q = G__26950;
ret = G__26951;
continue;

}
}
}
}
} else {
var k = ((cljs.core.seq_QMARK_(node))?cljs.core.first(node):node);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,k);
if((v == null)){
var G__26952 = cljs.core.next(q);
var G__26953 = ret;
q = G__26952;
ret = G__26953;
continue;
} else {
var G__26954 = cljs.core.next(q);
var G__26955 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,k,v);
q = G__26954;
ret = G__26955;
continue;
}
}
} else {
return ret;
}
break;
}

}
}
}
});
/**
 * Given a Om component class or instance and a tree of data, use the component's
 * query to transform the tree into the default database format. All nodes that
 * can be mapped via Ident implementations wil be replaced with ident links. The
 * original node data will be moved into tables indexed by ident. If merge-idents
 * option is true, will return these tables in the result instead of as metadata.
 */
om.next.tree__GT_db = (function om$next$tree__GT_db(var_args){
var args26956 = [];
var len__19301__auto___26961 = arguments.length;
var i__19302__auto___26962 = (0);
while(true){
if((i__19302__auto___26962 < len__19301__auto___26961)){
args26956.push((arguments[i__19302__auto___26962]));

var G__26963 = (i__19302__auto___26962 + (1));
i__19302__auto___26962 = G__26963;
continue;
} else {
}
break;
}

var G__26958 = args26956.length;
switch (G__26958) {
case 2:
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26956.length)].join('')));

}
});

om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2 = (function (x,data){
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3(x,data,false);
});

om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3 = (function (x,data,merge_idents){
var refs = (function (){var G__26959 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26959) : cljs.core.atom.call(null,G__26959));
})();
var errs = (function (){var G__26960 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__26960) : cljs.core.atom.call(null,G__26960));
})();
var x__$1 = ((cljs.core.vector_QMARK_(x))?x:om.next.get_query(x));
var ret = om.next.normalize_STAR_(x__$1,data,refs,errs);
if(merge_idents){
var refs_SINGLEQUOTE_ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(refs) : cljs.core.deref.call(null,refs));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ret,refs_SINGLEQUOTE_], 0)),cljs.core.cst$kw$om$next_SLASH_tables,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keys(refs_SINGLEQUOTE_)));
} else {
return cljs.core.with_meta(ret,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(refs) : cljs.core.deref.call(null,refs)));
}
});

om.next.tree__GT_db.cljs$lang$maxFixedArity = 3;
om.next.sift_refs = (function om$next$sift_refs(res){
var map__26968 = cljs.core.group_by((function (p1__26965_SHARP_){
return cljs.core.vector_QMARK_(cljs.core.first(p1__26965_SHARP_));
}),res);
var map__26968__$1 = ((((!((map__26968 == null)))?((((map__26968.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26968.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26968):map__26968);
var refs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26968__$1,true);
var rest = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26968__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,refs),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,rest)], null);
});
/**
 * Given a query, some data in the default database format, and the entire
 * application state in the default database format, return the tree where all
 * ident links have been replaced with their original node values.
 */
om.next.db__GT_tree = (function om$next$db__GT_tree(var_args){
var args26971 = [];
var len__19301__auto___26983 = arguments.length;
var i__19302__auto___26984 = (0);
while(true){
if((i__19302__auto___26984 < len__19301__auto___26983)){
args26971.push((arguments[i__19302__auto___26984]));

var G__26985 = (i__19302__auto___26984 + (1));
i__19302__auto___26984 = G__26985;
continue;
} else {
}
break;
}

var G__26973 = args26971.length;
switch (G__26973) {
case 3:
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26971.length)].join('')));

}
});

om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$3 = (function (query,data,refs){
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5(query,data,refs,cljs.core.identity,cljs.core.PersistentArrayMap.EMPTY);
});

om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4 = (function (query,data,refs,map_ident){
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5(query,data,refs,map_ident,cljs.core.PersistentArrayMap.EMPTY);
});

om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5 = (function (query,data,refs,map_ident,idents_seen){
if(cljs.core.map_QMARK_(refs)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$map_QMARK_,cljs.core.cst$sym$refs)], 0)))].join('')));
}

var data__$1 = (function (){var G__26974 = data;
var G__26974__$1 = ((om.next.ident_QMARK_(data))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(G__26974) : map_ident.call(null,G__26974))):G__26974);
return G__26974__$1;
})();
if(cljs.core.vector_QMARK_(data__$1)){
var step = ((function (data__$1){
return (function (ident){
var ident_SINGLEQUOTE_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(ident) : map_ident.call(null,ident)));
var query_SINGLEQUOTE_ = (function (){var G__26975 = query;
var G__26975__$1 = ((cljs.core.map_QMARK_(query))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__26975,cljs.core.first(ident)):G__26975);
return G__26975__$1;
})();
return om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5(query_SINGLEQUOTE_,ident_SINGLEQUOTE_,refs,map_ident,idents_seen);
});})(data__$1))
;
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(step),data__$1);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null),query)){
return data__$1;
} else {
var map__26976 = cljs.core.group_by(((function (data__$1){
return (function (p1__26970_SHARP_){
var or__18243__auto__ = om.next.join_QMARK_(p1__26970_SHARP_);
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return om.next.ident_QMARK_(p1__26970_SHARP_);
}
});})(data__$1))
,query);
var map__26976__$1 = ((((!((map__26976 == null)))?((((map__26976.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26976.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__26976):map__26976);
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26976__$1,false);
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__26976__$1,true);
var joins__$1 = cljs.core.seq(joins);
var ret = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(!((joins__$1 == null))){
var join = cljs.core.first(joins__$1);
var join__$1 = (function (){var G__26979 = join;
var G__26979__$1 = ((om.next.ident_QMARK_(join))?cljs.core.PersistentHashMap.fromArrays([G__26979],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_STAR_], null)]):G__26979);
return G__26979__$1;
})();
var vec__26978 = om.next.join_entry(join__$1);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26978,(0),null);
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26978,(1),null);
var recurse_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$$$$,sel);
var v = ((om.next.ident_QMARK_(key))?((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_,cljs.core.second(key)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(refs,cljs.core.first(key)):cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(refs,(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(key) : map_ident.call(null,key)))):cljs.core.get.cljs$core$IFn$_invoke$arity$2(data__$1,key));
var key__$1 = (function (){var G__26980 = key;
var G__26980__$1 = (((om.next.ident_QMARK_(key)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_,cljs.core.second(key))))?cljs.core.first(G__26980):G__26980);
return G__26980__$1;
})();
var v__$1 = ((om.next.ident_QMARK_(v))?(map_ident.cljs$core$IFn$_invoke$arity$1 ? map_ident.cljs$core$IFn$_invoke$arity$1(v) : map_ident.call(null,v)):v);
var sel__$1 = ((recurse_QMARK_)?query:(((om.next.ident_QMARK_(key__$1)) && (om.next.union_QMARK_(join__$1)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(sel,cljs.core.first(key__$1)):(((om.next.ident_QMARK_(v__$1)) && (om.next.union_QMARK_(join__$1)))?cljs.core.get.cljs$core$IFn$_invoke$arity$2(sel,cljs.core.first(v__$1)):sel
)));
var graph_loop_QMARK_ = (recurse_QMARK_) && (cljs.core.contains_QMARK_(cljs.core.set(cljs.core.get.cljs$core$IFn$_invoke$arity$2(idents_seen,key__$1)),v__$1));
var idents_seen__$1 = (((om.next.ident_QMARK_(v__$1)) && (recurse_QMARK_))?cljs.core.assoc_in(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(idents_seen,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key__$1], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),v__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$last_DASH_ident,key__$1], null),v__$1):idents_seen);
if(graph_loop_QMARK_){
var G__26987 = cljs.core.next(joins__$1);
var G__26988 = ret;
joins__$1 = G__26987;
ret = G__26988;
continue;
} else {
if((v__$1 == null)){
var G__26989 = cljs.core.next(joins__$1);
var G__26990 = ret;
joins__$1 = G__26989;
ret = G__26990;
continue;
} else {
var G__26991 = cljs.core.next(joins__$1);
var G__26992 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,key__$1,om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$5(sel__$1,v__$1,refs,map_ident,idents_seen__$1));
joins__$1 = G__26991;
ret = G__26992;
continue;

}
}
} else {
var temp__4423__auto__ = cljs.core.some(((function (joins__$1,ret,map__26976,map__26976__$1,props,joins,data__$1){
return (function (p__26981){
var vec__26982 = p__26981;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26982,(0),null);
var identset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__26982,(1),null);
if(cljs.core.contains_QMARK_(identset,cljs.core.get.cljs$core$IFn$_invoke$arity$2(data__$1,k))){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(idents_seen,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$last_DASH_ident,k], null));
} else {
return null;
}
});})(joins__$1,ret,map__26976,map__26976__$1,props,joins,data__$1))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(idents_seen,cljs.core.cst$kw$last_DASH_ident));
if(cljs.core.truth_(temp__4423__auto__)){
var looped_key = temp__4423__auto__;
return looped_key;
} else {
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.select_keys(data__$1,props),ret], 0));
}
}
break;
}
}
}
});

om.next.db__GT_tree.cljs$lang$maxFixedArity = 5;
om.next.rewrite = (function om$next$rewrite(rewrite_map,result){
var step = (function om$next$rewrite_$_step(res,p__27004){
var vec__27006 = p__27004;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27006,(0),null);
var orig_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27006,(1),null);
var to_move = cljs.core.get.cljs$core$IFn$_invoke$arity$2(result,k);
var res_SINGLEQUOTE_ = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (to_move,vec__27006,k,orig_paths){
return (function (p1__26993_SHARP_,p2__26994_SHARP_){
return cljs.core.assoc_in(p1__26993_SHARP_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p2__26994_SHARP_,k),to_move);
});})(to_move,vec__27006,k,orig_paths))
,res,orig_paths);
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(res_SINGLEQUOTE_,k);
});
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,result,rewrite_map);
});
/**
 * When given a join `{:join selector-vector}`, roots found so far, and a `path` prefix:
 *   returns a (possibly empty) sequence of [re-rooted-join prefix] results.
 *   Does NOT support sub-roots. Each re-rooted join will share only
 *   one common parent (their common branching point).
 *   
 */
om.next.move_roots = (function om$next$move_roots(join,result_roots,path){
var query_root_QMARK_ = (function om$next$move_roots_$_query_root_QMARK_(join__$1){
return cljs.core.cst$kw$query_DASH_root.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(join__$1)) === true;
});
if(cljs.core.truth_(om.next.join_QMARK_(join))){
if(cljs.core.truth_(query_root_QMARK_(join))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result_roots,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [join,path], null));
} else {
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__27007_SHARP_){
return om$next$move_roots(p1__27007_SHARP_,result_roots,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,om.next.join_key(join)));
}),cljs.core.array_seq([om.next.join_value(join)], 0));
}
} else {
return result_roots;
}
});
/**
 * Searches a query for duplicate joins and deep-merges them into a new query.
 */
om.next.merge_joins = (function om$next$merge_joins(query){
var step = (function om$next$merge_joins_$_step(res,expr){
if(cljs.core.contains_QMARK_(cljs.core.cst$kw$elements_DASH_seen.cljs$core$IFn$_invoke$arity$1(res),expr)){
return res;
} else {
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4((cljs.core.truth_((function (){var and__18231__auto__ = om.next.join_QMARK_(expr);
if(cljs.core.truth_(and__18231__auto__)){
return !(om.next.union_QMARK_(expr));
} else {
return and__18231__auto__;
}
})())?(function (){var jk = om.next.join_key(expr);
var jv = om.next.join_value(expr);
var q = (function (){var or__18243__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$query_DASH_by_DASH_join.cljs$core$IFn$_invoke$arity$1(res),jk);
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var nq = (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(q,cljs.core.cst$sym$$$$)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(jv,cljs.core.cst$sym$$$$)))?cljs.core.cst$sym$$$$:om$next$merge_joins(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(q,jv))));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$5(res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_by_DASH_join], null),cljs.core.assoc,jk,nq);
})():cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$non_DASH_joins], null),cljs.core.conj,expr)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$elements_DASH_seen], null),cljs.core.conj,expr);
}
});
var init = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$query_DASH_by_DASH_join,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$elements_DASH_seen,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$non_DASH_joins,cljs.core.PersistentVector.EMPTY], null);
var res = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,init,query);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$non_DASH_joins.cljs$core$IFn$_invoke$arity$1(res),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (init,res){
return (function (p__27017){
var vec__27018 = p__27017;
var jkey = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27018,(0),null);
var jsel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27018,(1),null);
return cljs.core.PersistentArrayMap.fromArray([jkey,jsel], true, false);
});})(init,res))
,cljs.core.cst$kw$query_DASH_by_DASH_join.cljs$core$IFn$_invoke$arity$1(res))));
});
om.next.process_roots = (function om$next$process_roots(query){

var retain = (function om$next$process_roots_$_retain(expr){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [expr,cljs.core.PersistentVector.EMPTY], null)], null);
});
var reroot = (function om$next$process_roots_$_reroot(expr){
var roots = om.next.move_roots(expr,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY);
if(cljs.core.empty_QMARK_(roots)){
return retain(expr);
} else {
return roots;
}
});
var rewrite_map_step = (function om$next$process_roots_$_rewrite_map_step(rewrites,p__27028){
var vec__27030 = p__27028;
var expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27030,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27030,(1),null);
if(cljs.core.empty_QMARK_(path)){
return rewrites;
} else {
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(rewrites,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [om.next.join_key(expr)], null),cljs.core.conj,path);
}
});
var reroots = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(reroot,cljs.core.array_seq([query], 0));
var query__$1 = om.next.merge_joins(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.first,reroots));
var rewrite_map = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(rewrite_map_step,cljs.core.PersistentArrayMap.EMPTY,reroots);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$query,query__$1,cljs.core.cst$kw$rewrite,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(om.next.rewrite,rewrite_map)], null);
});
om.next.merge_idents = (function om$next$merge_idents(tree,config,refs){
var map__27039 = config;
var map__27039__$1 = ((((!((map__27039 == null)))?((((map__27039.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27039.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27039):map__27039);
var merge_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27039__$1,cljs.core.cst$kw$merge_DASH_ident);
var indexer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27039__$1,cljs.core.cst$kw$indexer);
var step = ((function (map__27039,map__27039__$1,merge_ident,indexer){
return (function om$next$merge_idents_$_step(tree_SINGLEQUOTE_,p__27044){
var vec__27046 = p__27044;
var ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27046,(0),null);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27046,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(config))){
var c = om.next.ref__GT_any(indexer,ref);
var props_SINGLEQUOTE_ = om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2(c,props);
var refs__$1 = cljs.core.meta(props_SINGLEQUOTE_);
return cljs.core.cst$kw$merge_DASH_tree.cljs$core$IFn$_invoke$arity$1(config).call(null,(merge_ident.cljs$core$IFn$_invoke$arity$4 ? merge_ident.cljs$core$IFn$_invoke$arity$4(config,tree_SINGLEQUOTE_,ref,props_SINGLEQUOTE_) : merge_ident.call(null,config,tree_SINGLEQUOTE_,ref,props_SINGLEQUOTE_)),refs__$1);
} else {
return (merge_ident.cljs$core$IFn$_invoke$arity$4 ? merge_ident.cljs$core$IFn$_invoke$arity$4(config,tree_SINGLEQUOTE_,ref,props) : merge_ident.call(null,config,tree_SINGLEQUOTE_,ref,props));
}
});})(map__27039,map__27039__$1,merge_ident,indexer))
;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,tree,refs);
});
om.next.merge_novelty_BANG_ = (function om$next$merge_novelty_BANG_(reconciler,state,res,query){
var config = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler);
var vec__27049 = om.next.sift_refs(res);
var refs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27049,(0),null);
var res_SINGLEQUOTE_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27049,(1),null);
var res_SINGLEQUOTE___$1 = (cljs.core.truth_(cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(config))?om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3((function (){var or__18243__auto__ = query;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__27050 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27050) : cljs.core.deref.call(null,G__27050));
})());
}
})(),res_SINGLEQUOTE_,true):res_SINGLEQUOTE_);
return cljs.core.cst$kw$merge_DASH_tree.cljs$core$IFn$_invoke$arity$1(config).call(null,om.next.merge_idents(state,config,refs),res_SINGLEQUOTE___$1);
});
om.next.default_merge = (function om$next$default_merge(reconciler,state,res,query){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$keys,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol_QMARK_),cljs.core.keys(res)),cljs.core.cst$kw$next,om.next.merge_novelty_BANG_(reconciler,state,res,query),cljs.core.cst$kw$tempids,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.merge,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$tempids,cljs.core.second),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol_QMARK_,cljs.core.first),res)))], null);
});
/**
 * Merge a state delta into the application state. Affected components managed
 * by the reconciler will re-render. 
 */
om.next.merge_BANG_ = (function om$next$merge_BANG_(var_args){
var args27051 = [];
var len__19301__auto___27074 = arguments.length;
var i__19302__auto___27075 = (0);
while(true){
if((i__19302__auto___27075 < len__19301__auto___27074)){
args27051.push((arguments[i__19302__auto___27075]));

var G__27076 = (i__19302__auto___27075 + (1));
i__19302__auto___27075 = G__27076;
continue;
} else {
}
break;
}

var G__27053 = args27051.length;
switch (G__27053) {
case 2:
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27051.length)].join('')));

}
});

om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (reconciler,delta){
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(reconciler,delta,null);
});

om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (reconciler,delta,query){
var config = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler);
var state = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(config);
var merge = cljs.core.cst$kw$merge.cljs$core$IFn$_invoke$arity$1(config);
var map__27054 = (function (){var G__27055 = reconciler;
var G__27056 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state));
var G__27057 = delta;
var G__27058 = query;
return (merge.cljs$core$IFn$_invoke$arity$4 ? merge.cljs$core$IFn$_invoke$arity$4(G__27055,G__27056,G__27057,G__27058) : merge.call(null,G__27055,G__27056,G__27057,G__27058));
})();
var map__27054__$1 = ((((!((map__27054 == null)))?((((map__27054.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27054.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27054):map__27054);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27054__$1,cljs.core.cst$kw$keys);
var next = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27054__$1,cljs.core.cst$kw$next);
var tempids = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27054__$1,cljs.core.cst$kw$tempids);
om.next.protocols.queue_BANG_(reconciler,keys);

var G__27066 = state;
var G__27067 = (function (){var temp__4423__auto__ = cljs.core.cst$kw$migrate.cljs$core$IFn$_invoke$arity$1(config);
if(cljs.core.truth_(temp__4423__auto__)){
var migrate = temp__4423__auto__;
var G__27069 = next;
var G__27070 = (function (){var or__18243__auto__ = query;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return om.next.get_query(cljs.core.cst$kw$root.cljs$core$IFn$_invoke$arity$1((function (){var G__27073 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27073) : cljs.core.deref.call(null,G__27073));
})()));
}
})();
var G__27071 = tempids;
var G__27072 = cljs.core.cst$kw$id_DASH_key.cljs$core$IFn$_invoke$arity$1(config);
return (migrate.cljs$core$IFn$_invoke$arity$4 ? migrate.cljs$core$IFn$_invoke$arity$4(G__27069,G__27070,G__27071,G__27072) : migrate.call(null,G__27069,G__27070,G__27071,G__27072));
} else {
return next;
}
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__27066,G__27067) : cljs.core.reset_BANG_.call(null,G__27066,G__27067));
});

om.next.merge_BANG_.cljs$lang$maxFixedArity = 3;

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {om.next.protocols.IReconciler}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
om.next.Reconciler = (function (config,state,__meta,__extmap,__hash){
this.config = config;
this.state = state;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229700362;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
om.next.Reconciler.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__18857__auto__,k__18858__auto__){
var self__ = this;
var this__18857__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__18857__auto____$1,k__18858__auto__,null);
});

om.next.Reconciler.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__18859__auto__,k27083,else__18860__auto__){
var self__ = this;
var this__18859__auto____$1 = this;
var G__27085 = (((k27083 instanceof cljs.core.Keyword))?k27083.fqn:null);
switch (G__27085) {
case "config":
return self__.config;

break;
case "state":
return self__.state;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k27083,else__18860__auto__);

}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$ = true;

om.next.Reconciler.prototype.om$next$protocols$IReconciler$queue_BANG_$arity$2 = (function (_,ks){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queue], null),cljs.core.into,cljs.core.array_seq([ks], 0));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$queue_sends_BANG_$arity$2 = (function (_,sends){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued_DASH_sends], null),cljs.core.cst$kw$merge_DASH_sends.cljs$core$IFn$_invoke$arity$1(self__.config),cljs.core.array_seq([sends], 0));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$send_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var sends = cljs.core.cst$kw$queued_DASH_sends.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
if(cljs.core.empty_QMARK_(sends)){
return null;
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,((function (sends,this$__$1){
return (function (state__$1){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(state__$1,cljs.core.cst$kw$queued_DASH_sends,cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$sends_DASH_queued,false);
});})(sends,this$__$1))
);

return cljs.core.cst$kw$send.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,sends,((function (sends,this$__$1){
return (function (res,query){
return om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$1,res,query);
});})(sends,this$__$1))
);
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$reconcile_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var st = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state));
var q = cljs.core.cst$kw$queue.cljs$core$IFn$_invoke$arity$1(st);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued], null),cljs.core.not);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$queue,cljs.core.PersistentVector.EMPTY);

if(cljs.core.empty_QMARK_(q)){
return cljs.core.cst$kw$render.cljs$core$IFn$_invoke$arity$1(st).call(null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_skip], null),q)){
return null;
} else {
var cs = cljs.core.transduce.cljs$core$IFn$_invoke$arity$4(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (st,q,___$1){
return (function (p1__27079_SHARP_){
return om.next.protocols.key__GT_components(cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config),p1__27079_SHARP_);
});})(st,q,___$1))
),((function (st,q,___$1){
return (function (p1__27080_SHARP_,p2__27081_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(p1__27080_SHARP_,p2__27081_SHARP_);
});})(st,q,___$1))
,cljs.core.PersistentHashSet.EMPTY,q);
var map__27086 = self__.config;
var map__27086__$1 = ((((!((map__27086 == null)))?((((map__27086.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27086.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27086):map__27086);
var ui__GT_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27086__$1,cljs.core.cst$kw$ui_DASH__GT_props);
var env = om.next.to_env(self__.config);
var seq__27088 = cljs.core.seq(cljs.core.cst$kw$optimize.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,cs));
var chunk__27089 = null;
var count__27090 = (0);
var i__27091 = (0);
while(true){
if((i__27091 < count__27090)){
var c = chunk__27089.cljs$core$IIndexed$_nth$arity$2(null,i__27091);
if(om.next.mounted_QMARK_(c)){
var computed_27106 = om.next.get_computed.cljs$core$IFn$_invoke$arity$1(om.next.props(c));
var next_props_27107 = om.next.computed((ui__GT_props.cljs$core$IFn$_invoke$arity$2 ? ui__GT_props.cljs$core$IFn$_invoke$arity$2(env,c) : ui__GT_props.call(null,env,c)),computed_27106);
if(cljs.core.truth_(om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props_27107,om.next.get_state.cljs$core$IFn$_invoke$arity$1(c)))){
if(!((next_props_27107 == null))){
om.next.update_component_BANG_(c,next_props_27107);
} else {
c.forceUpdate();
}
} else {
}
} else {
}

var G__27108 = seq__27088;
var G__27109 = chunk__27089;
var G__27110 = count__27090;
var G__27111 = (i__27091 + (1));
seq__27088 = G__27108;
chunk__27089 = G__27109;
count__27090 = G__27110;
i__27091 = G__27111;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__27088);
if(temp__4425__auto__){
var seq__27088__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__27088__$1)){
var c__19046__auto__ = cljs.core.chunk_first(seq__27088__$1);
var G__27112 = cljs.core.chunk_rest(seq__27088__$1);
var G__27113 = c__19046__auto__;
var G__27114 = cljs.core.count(c__19046__auto__);
var G__27115 = (0);
seq__27088 = G__27112;
chunk__27089 = G__27113;
count__27090 = G__27114;
i__27091 = G__27115;
continue;
} else {
var c = cljs.core.first(seq__27088__$1);
if(om.next.mounted_QMARK_(c)){
var computed_27116 = om.next.get_computed.cljs$core$IFn$_invoke$arity$1(om.next.props(c));
var next_props_27117 = om.next.computed((ui__GT_props.cljs$core$IFn$_invoke$arity$2 ? ui__GT_props.cljs$core$IFn$_invoke$arity$2(env,c) : ui__GT_props.call(null,env,c)),computed_27116);
if(cljs.core.truth_(om.next.should_update_QMARK_.cljs$core$IFn$_invoke$arity$3(c,next_props_27117,om.next.get_state.cljs$core$IFn$_invoke$arity$1(c)))){
if(!((next_props_27117 == null))){
om.next.update_component_BANG_(c,next_props_27117);
} else {
c.forceUpdate();
}
} else {
}
} else {
}

var G__27118 = cljs.core.next(seq__27088__$1);
var G__27119 = null;
var G__27120 = (0);
var G__27121 = (0);
seq__27088 = G__27118;
chunk__27089 = G__27119;
count__27090 = G__27120;
i__27091 = G__27121;
continue;
}
} else {
return null;
}
}
break;
}

}
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$schedule_render_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.not(cljs.core.cst$kw$queued.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$queued], null),cljs.core.not);
} else {
return false;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$schedule_sends_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.not(cljs.core.cst$kw$sends_DASH_queued.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sends_DASH_queued], null),true);

return true;
} else {
return false;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$basis_t$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$t.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$add_root_BANG_$arity$4 = (function (this$,root_class,target,options){
var self__ = this;
var this$__$1 = this;
var ret = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var rctor = om.next.factory.cljs$core$IFn$_invoke$arity$1(root_class);
var guid = cljs.core.random_uuid();
if(om.next.iquery_QMARK_(root_class)){
om.next.protocols.index_root(cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config),root_class);
} else {
}

if(cljs.core.truth_((function (){var and__18231__auto__ = cljs.core.cst$kw$normalize.cljs$core$IFn$_invoke$arity$1(self__.config);
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not(cljs.core.cst$kw$normalized.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state))));
} else {
return and__18231__auto__;
}
})())){
var new_state_27122 = om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2(root_class,(function (){var G__27092 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27092) : cljs.core.deref.call(null,G__27092));
})());
var refs_27123 = cljs.core.meta(new_state_27122);
var G__27093_27124 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
var G__27094_27125 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new_state_27122,refs_27123], 0));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__27093_27124,G__27094_27125) : cljs.core.reset_BANG_.call(null,G__27093_27124,G__27094_27125));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$normalized,true);
} else {
}

var renderf = ((function (ret,rctor,guid,this$__$1){
return (function (data){
var _STAR_reconciler_STAR_27095 = om.next._STAR_reconciler_STAR_;
var _STAR_shared_STAR_27096 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_27097 = om.next._STAR_instrument_STAR_;
om.next._STAR_reconciler_STAR_ = this$__$1;

om.next._STAR_shared_STAR_ = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$shared.cljs$core$IFn$_invoke$arity$1(self__.config),(cljs.core.truth_(cljs.core.cst$kw$shared_DASH_fn.cljs$core$IFn$_invoke$arity$1(self__.config))?cljs.core.cst$kw$shared_DASH_fn.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,data):null)], 0));

om.next._STAR_instrument_STAR_ = cljs.core.cst$kw$instrument.cljs$core$IFn$_invoke$arity$1(self__.config);

try{var c = ((!((target == null)))?cljs.core.cst$kw$root_DASH_render.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,(rctor.cljs$core$IFn$_invoke$arity$1 ? rctor.cljs$core$IFn$_invoke$arity$1(data) : rctor.call(null,data)),target):((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null))?(rctor.cljs$core$IFn$_invoke$arity$1 ? rctor.cljs$core$IFn$_invoke$arity$1(data) : rctor.call(null,data)):(function (){var temp__4425__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(temp__4425__auto__)){
var c_SINGLEQUOTE_ = temp__4425__auto__;
if(om.next.mounted_QMARK_(c_SINGLEQUOTE_)){
return c_SINGLEQUOTE_.forceUpdate(data);
} else {
return null;
}
} else {
return null;
}
})()
));
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret)) == null)) && (!((c == null)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.assoc,cljs.core.cst$kw$root,c);

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(ret,c) : cljs.core.reset_BANG_.call(null,ret,c));
} else {
return null;
}
}finally {om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_27097;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_27096;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_27095;
}});})(ret,rctor,guid,this$__$1))
;
var parsef = ((function (renderf,ret,rctor,guid,this$__$1){
return (function (){
var sel = om.next.get_query((function (){var or__18243__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return root_class;
}
})());
if(((sel == null)) || (cljs.core.vector_QMARK_(sel))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Application root query must be a vector"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$or,cljs.core.list(cljs.core.cst$sym$nil_QMARK_,cljs.core.cst$sym$sel),cljs.core.list(cljs.core.cst$sym$vector_QMARK_,cljs.core.cst$sym$sel))], 0)))].join('')));
}

if(!((sel == null))){
var env = om.next.to_env(self__.config);
var v = cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,env,sel);
if(cljs.core.empty_QMARK_(v)){
return null;
} else {
return renderf(v);
}
} else {
return renderf((function (){var G__27098 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27098) : cljs.core.deref.call(null,G__27098));
})());
}
});})(renderf,ret,rctor,guid,this$__$1))
;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.state,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$target,target,cljs.core.cst$kw$render,parsef,cljs.core.cst$kw$root,root_class,cljs.core.cst$kw$remove,((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (){
cljs.core.remove_watch(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config),(function (){var or__18243__auto__ = target;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return guid;
}
})());

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.state,((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (p1__27078_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__27078_SHARP_,cljs.core.cst$kw$target),cljs.core.cst$kw$render),cljs.core.cst$kw$root),cljs.core.cst$kw$remove);
});})(renderf,parsef,ret,rctor,guid,this$__$1))
);

if((target == null)){
return null;
} else {
return cljs.core.cst$kw$root_DASH_unmount.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,target);
}
});})(renderf,parsef,ret,rctor,guid,this$__$1))
], null));

cljs.core.add_watch(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config),(function (){var or__18243__auto__ = target;
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return guid;
}
})(),((function (renderf,parsef,ret,rctor,guid,this$__$1){
return (function (_,___$1,___$2,___$3){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$t], null),cljs.core.inc);

return om.next.schedule_render_BANG_(this$__$1);
});})(renderf,parsef,ret,rctor,guid,this$__$1))
);

parsef();

var temp__4425__auto___27126 = om.next.get_query((function (){var or__18243__auto__ = (function (){var and__18231__auto__ = target;
if(cljs.core.truth_(and__18231__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
} else {
return and__18231__auto__;
}
})();
if(cljs.core.truth_(or__18243__auto__)){
return or__18243__auto__;
} else {
return root_class;
}
})());
if(cljs.core.truth_(temp__4425__auto___27126)){
var sel_27127 = temp__4425__auto___27126;
var env_27128 = om.next.to_env(self__.config);
var snds_27129 = om.next.gather_sends(env_27128,sel_27127,cljs.core.cst$kw$remotes.cljs$core$IFn$_invoke$arity$1(self__.config));
if(cljs.core.empty_QMARK_(snds_27129)){
} else {
var temp__4425__auto___27130__$1 = cljs.core.cst$kw$send.cljs$core$IFn$_invoke$arity$1(self__.config);
if(cljs.core.truth_(temp__4425__auto___27130__$1)){
var send_27131 = temp__4425__auto___27130__$1;
var G__27099_27132 = snds_27129;
var G__27100_27133 = ((function (G__27099_27132,send_27131,temp__4425__auto___27130__$1,env_27128,snds_27129,sel_27127,temp__4425__auto___27126,renderf,parsef,ret,rctor,guid,this$__$1){
return (function (res,query){
om.next.merge_BANG_.cljs$core$IFn$_invoke$arity$3(this$__$1,res,query);

return renderf(cljs.core.cst$kw$parser.cljs$core$IFn$_invoke$arity$1(self__.config).call(null,env_27128,sel_27127));
});})(G__27099_27132,send_27131,temp__4425__auto___27130__$1,env_27128,snds_27129,sel_27127,temp__4425__auto___27126,renderf,parsef,ret,rctor,guid,this$__$1))
;
(send_27131.cljs$core$IFn$_invoke$arity$2 ? send_27131.cljs$core$IFn$_invoke$arity$2(G__27099_27132,G__27100_27133) : send_27131.call(null,G__27099_27132,G__27100_27133));
} else {
}
}
} else {
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ret) : cljs.core.deref.call(null,ret));
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$reindex_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var root = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)),cljs.core.cst$kw$root);
if(om.next.iquery_QMARK_(root)){
return om.next.protocols.index_root(cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(self__.config),root);
} else {
return null;
}
});

om.next.Reconciler.prototype.om$next$protocols$IReconciler$remove_root_BANG_$arity$2 = (function (_,target){
var self__ = this;
var ___$1 = this;
var temp__4425__auto__ = cljs.core.cst$kw$remove.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.state) : cljs.core.deref.call(null,self__.state)));
if(cljs.core.truth_(temp__4425__auto__)){
var remove = temp__4425__auto__;
return (remove.cljs$core$IFn$_invoke$arity$0 ? remove.cljs$core$IFn$_invoke$arity$0() : remove.call(null));
} else {
return null;
}
});

om.next.Reconciler.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__18871__auto__,writer__18872__auto__,opts__18873__auto__){
var self__ = this;
var this__18871__auto____$1 = this;
var pr_pair__18874__auto__ = ((function (this__18871__auto____$1){
return (function (keyval__18875__auto__){
return cljs.core.pr_sequential_writer(writer__18872__auto__,cljs.core.pr_writer,""," ","",opts__18873__auto__,keyval__18875__auto__);
});})(this__18871__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__18872__auto__,pr_pair__18874__auto__,"#om.next.Reconciler{",", ","}",opts__18873__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$config,self__.config],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null))], null),self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IIterable$ = true;

om.next.Reconciler.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__27082){
var self__ = this;
var G__27082__$1 = this;
return (new cljs.core.RecordIter((0),G__27082__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$state], null),cljs.core._iterator(self__.__extmap)));
});

om.next.Reconciler.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__18855__auto__){
var self__ = this;
var this__18855__auto____$1 = this;
return self__.__meta;
});

om.next.Reconciler.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__18851__auto__){
var self__ = this;
var this__18851__auto____$1 = this;
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,self__.__extmap,self__.__hash));
});

om.next.Reconciler.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__18861__auto__){
var self__ = this;
var this__18861__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__18852__auto__){
var self__ = this;
var this__18852__auto____$1 = this;
var h__18678__auto__ = self__.__hash;
if(!((h__18678__auto__ == null))){
return h__18678__auto__;
} else {
var h__18678__auto____$1 = cljs.core.hash_imap(this__18852__auto____$1);
self__.__hash = h__18678__auto____$1;

return h__18678__auto____$1;
}
});

om.next.Reconciler.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__18853__auto__,other__18854__auto__){
var self__ = this;
var this__18853__auto____$1 = this;
if(cljs.core.truth_((function (){var and__18231__auto__ = other__18854__auto__;
if(cljs.core.truth_(and__18231__auto__)){
var and__18231__auto____$1 = (this__18853__auto____$1.constructor === other__18854__auto__.constructor);
if(and__18231__auto____$1){
return cljs.core.equiv_map(this__18853__auto____$1,other__18854__auto__);
} else {
return and__18231__auto____$1;
}
} else {
return and__18231__auto__;
}
})())){
return true;
} else {
return false;
}
});

om.next.Reconciler.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__18866__auto__,k__18867__auto__){
var self__ = this;
var this__18866__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$config,null,cljs.core.cst$kw$state,null], null), null),k__18867__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__18866__auto____$1),self__.__meta),k__18867__auto__);
} else {
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__18867__auto__)),null));
}
});

om.next.Reconciler.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__18864__auto__,k__18865__auto__,G__27082){
var self__ = this;
var this__18864__auto____$1 = this;
var pred__27101 = cljs.core.keyword_identical_QMARK_;
var expr__27102 = k__18865__auto__;
if(cljs.core.truth_((pred__27101.cljs$core$IFn$_invoke$arity$2 ? pred__27101.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$config,expr__27102) : pred__27101.call(null,cljs.core.cst$kw$config,expr__27102)))){
return (new om.next.Reconciler(G__27082,self__.state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__27101.cljs$core$IFn$_invoke$arity$2 ? pred__27101.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$state,expr__27102) : pred__27101.call(null,cljs.core.cst$kw$state,expr__27102)))){
return (new om.next.Reconciler(self__.config,G__27082,self__.__meta,self__.__extmap,null));
} else {
return (new om.next.Reconciler(self__.config,self__.state,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__18865__auto__,G__27082),null));
}
}
});

om.next.Reconciler.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__18869__auto__){
var self__ = this;
var this__18869__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$config,self__.config],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null))], null),self__.__extmap));
});

om.next.Reconciler.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__18856__auto__,G__27082){
var self__ = this;
var this__18856__auto____$1 = this;
return (new om.next.Reconciler(self__.config,self__.state,G__27082,self__.__extmap,self__.__hash));
});

om.next.Reconciler.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__18862__auto__,entry__18863__auto__){
var self__ = this;
var this__18862__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__18863__auto__)){
return cljs.core._assoc(this__18862__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__18863__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__18863__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__18862__auto____$1,entry__18863__auto__);
}
});

om.next.Reconciler.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var G__27104 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(self__.config);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27104) : cljs.core.deref.call(null,G__27104));
});

om.next.Reconciler.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$config,cljs.core.cst$sym$state], null);
});

om.next.Reconciler.cljs$lang$type = true;

om.next.Reconciler.cljs$lang$ctorPrSeq = (function (this__18891__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"om.next/Reconciler");
});

om.next.Reconciler.cljs$lang$ctorPrWriter = (function (this__18891__auto__,writer__18892__auto__){
return cljs.core._write(writer__18892__auto__,"om.next/Reconciler");
});

om.next.__GT_Reconciler = (function om$next$__GT_Reconciler(config,state){
return (new om.next.Reconciler(config,state,null,null,null));
});

om.next.map__GT_Reconciler = (function om$next$map__GT_Reconciler(G__27084){
return (new om.next.Reconciler(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(G__27084),cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(G__27084),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__27084,cljs.core.cst$kw$config,cljs.core.array_seq([cljs.core.cst$kw$state], 0)),null));
});

om.next.default_ui__GT_props = (function om$next$default_ui__GT_props(p__27134,c){
var map__27144 = p__27134;
var map__27144__$1 = ((((!((map__27144 == null)))?((((map__27144.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27144.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27144):map__27144);
var env = map__27144__$1;
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27144__$1,cljs.core.cst$kw$parser);
var pathopt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27144__$1,cljs.core.cst$kw$pathopt);
var ui = (((function (){var and__18231__auto__ = pathopt;
if(and__18231__auto__){
var and__18231__auto____$1 = ((!((c == null)))?(((false) || (c.om$next$Ident$))?true:false):false);
if(and__18231__auto____$1){
return om.next.iquery_QMARK_(c);
} else {
return and__18231__auto____$1;
}
} else {
return and__18231__auto__;
}
})())?(function (){var id = om.next.ident(c,om.next.props(c));
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__27149 = env;
var G__27150 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.fromArray([id,om.next.get_query(c)], true, false)], null);
return (parser.cljs$core$IFn$_invoke$arity$2 ? parser.cljs$core$IFn$_invoke$arity$2(G__27149,G__27150) : parser.call(null,G__27149,G__27150));
})(),id);
})():null);
if(!((ui == null))){
return ui;
} else {
var fq = om.next.full_query.cljs$core$IFn$_invoke$arity$1(c);
if((fq == null)){
return null;
} else {
var s = cljs.core.system_time();
var ui__$1 = (parser.cljs$core$IFn$_invoke$arity$2 ? parser.cljs$core$IFn$_invoke$arity$2(env,fq) : parser.call(null,env,fq));
var e = cljs.core.system_time();
var temp__4425__auto___27153 = cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_(temp__4425__auto___27153)){
var l_27154 = temp__4425__auto___27153;
var dt_27155 = (e - s);
if(((16) < dt_27155)){
var G__27151_27156 = l_27154;
var G__27152_27157 = [cljs.core.str(c),cljs.core.str(" query took "),cljs.core.str(dt_27155),cljs.core.str(" msecs")].join('');
goog.log.warning(G__27151_27156,G__27152_27157);
} else {
}
} else {
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(ui__$1,om.next.path(c));
}
}
});
om.next.default_merge_ident = (function om$next$default_merge_ident(_,tree,ref,props){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(tree,ref,cljs.core.merge,props);
});
om.next.default_merge_tree = (function om$next$default_merge_tree(a,b){
if(cljs.core.map_QMARK_(a)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a,b], 0));
} else {
return b;
}
});
om.next.default_migrate = (function om$next$default_migrate(pure,query,tempids,id_key){
var dissoc_in = (function om$next$default_migrate_$_dissoc_in(pure__$1,p__27188){
var vec__27190 = p__27188;
var table = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27190,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27190,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(pure__$1,table,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pure__$1,table),id));
});
var step = (function om$next$default_migrate_$_step(pure__$1,p__27191){
var vec__27195 = p__27191;
var old = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27195,(0),null);
var vec__27196 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27195,(1),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27196,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__27196,(1),null);
var new$ = vec__27196;
return cljs.core.assoc_in(dissoc_in(pure__$1,old),new$,(function (){var G__27197 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(pure__$1,old),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(pure__$1,new$)], 0));
var G__27197__$1 = ((!((id_key == null)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__27197,id_key,id):G__27197);
return G__27197__$1;
})());
});
if(!(cljs.core.empty_QMARK_(tempids))){
var pure_SINGLEQUOTE_ = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,pure,tempids);
return om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$3(query,om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$4(query,pure_SINGLEQUOTE_,pure_SINGLEQUOTE_,((function (pure_SINGLEQUOTE_){
return (function (ident){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(tempids,ident,ident);
});})(pure_SINGLEQUOTE_))
),true);
} else {
return pure;
}
});
/**
 * Construct a reconciler from a configuration map.
 * 
 * Required parameters:
 *   :state        - the application state. If IAtom value is not supplied the
 *                   data will be normalized into the default database format
 *                   using the root query. This can be disabled by explicitly
 *                   setting the optional :normalize parameter to false.
 *   :parser       - the parser to be used
 * 
 * Optional parameters:
 *   :shared       - a map of global shared properties for the component tree.
 *   :shared-fn    - a function to compute global shared properties from the root props.
 *                   the result is merged with :shared.
 *   :send         - required only if the parser will return a non-empty value when
 *                   run against the supplied :remotes. send is a function of two
 *                   arguments, the map of remote expressions keyed by remote target
 *                   and a callback which should be invoked with the result from each
 *                   remote target. Note this means the callback can be invoked
 *                   multiple times to support parallel fetching and incremental
 *                   loading if desired. The callback should take the response as the
 *                   first argument and the the query that was sent as the second
 *                   argument.
 *   :normalize    - whether the state should be normalized. If true it is assumed
 *                   all novelty introduced into the system will also need
 *                   normalization.
 *   :remotes      - a vector of keywords representing remote services which can
 *                   evaluate query expressions. Defaults to [:remote]
 *   :root-render  - the root render function. Defaults to ReactDOM.render
 *   :root-unmount - the root unmount function. Defaults to
 *                   ReactDOM.unmountComponentAtNode
 *   :logger       - supply a goog.log compatible logger
 */
om.next.reconciler = (function om$next$reconciler(p__27203){
var map__27211 = p__27203;
var map__27211__$1 = ((((!((map__27211 == null)))?((((map__27211.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27211.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27211):map__27211);
var config = map__27211__$1;
var root_render = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$root_DASH_render,((function (map__27211,map__27211__$1,config){
return (function (p1__27200_SHARP_,p2__27201_SHARP_){
return ReactDOM.render(p1__27200_SHARP_,p2__27201_SHARP_);
});})(map__27211,map__27211__$1,config))
);
var normalize = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$normalize);
var pathopt = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$pathopt,false);
var instrument = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$instrument);
var id_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$id_DASH_key);
var merge_sends = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$merge_DASH_sends,((function (map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key){
return (function (p1__27198_SHARP_,p2__27199_SHARP_){
return cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.into,cljs.core.array_seq([p1__27198_SHARP_,p2__27199_SHARP_], 0));
});})(map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key))
);
var merge_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$merge_DASH_ident,om.next.default_merge_ident);
var remotes = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$remotes,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$remote], null));
var migrate = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$migrate,om.next.default_migrate);
var history = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$history,(100));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$state);
var merge = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$merge,om.next.default_merge);
var shared_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$shared_DASH_fn);
var ui__GT_props = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$ui_DASH__GT_props,om.next.default_ui__GT_props);
var parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$parser);
var indexer = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$indexer,om.next.indexer);
var root_unmount = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$root_DASH_unmount,((function (map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer){
return (function (p1__27202_SHARP_){
return ReactDOM.unmountComponentAtNode(p1__27202_SHARP_);
});})(map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer))
);
var send = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$send);
var merge_tree = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$merge_DASH_tree,om.next.default_merge_tree);
var shared = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27211__$1,cljs.core.cst$kw$shared);
var optimize = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__27211__$1,cljs.core.cst$kw$optimize,((function (map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared){
return (function (cs){
return cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(om.next.depth,cs);
});})(map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared))
);
if(cljs.core.map_QMARK_(config)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$map_QMARK_,cljs.core.cst$sym$config)], 0)))].join('')));
}

var idxr = (indexer.cljs$core$IFn$_invoke$arity$0 ? indexer.cljs$core$IFn$_invoke$arity$0() : indexer.call(null));
var norm_QMARK_ = ((!((state == null)))?((((state.cljs$lang$protocol_mask$partition1$ & (16384))) || (state.cljs$core$IAtom$))?true:(((!state.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IAtom,state):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IAtom,state));
var state_SINGLEQUOTE_ = ((norm_QMARK_)?state:(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.atom.call(null,state)));
var logger = ((cljs.core.contains_QMARK_(config,cljs.core.cst$kw$logger))?cljs.core.cst$kw$logger.cljs$core$IFn$_invoke$arity$1(config):om.next._STAR_logger_STAR_);
var ret = (new om.next.Reconciler(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$pathopt,cljs.core.cst$kw$id_DASH_key,cljs.core.cst$kw$instrument,cljs.core.cst$kw$merge_DASH_ident,cljs.core.cst$kw$merge_DASH_sends,cljs.core.cst$kw$remotes,cljs.core.cst$kw$migrate,cljs.core.cst$kw$history,cljs.core.cst$kw$state,cljs.core.cst$kw$merge,cljs.core.cst$kw$shared_DASH_fn,cljs.core.cst$kw$parser,cljs.core.cst$kw$ui_DASH__GT_props,cljs.core.cst$kw$logger,cljs.core.cst$kw$indexer,cljs.core.cst$kw$root_DASH_unmount,cljs.core.cst$kw$send,cljs.core.cst$kw$shared,cljs.core.cst$kw$merge_DASH_tree,cljs.core.cst$kw$optimize,cljs.core.cst$kw$root_DASH_render,cljs.core.cst$kw$normalize],[pathopt,id_key,(function (){var G__27214 = instrument;
var G__27214__$1 = ((!((instrument == null)))?((function (G__27214,idxr,norm_QMARK_,state_SINGLEQUOTE_,logger,map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared,optimize){
return (function om$next$reconciler_$_G__27214(x){
var _STAR_instrument_STAR_27216 = om.next._STAR_instrument_STAR_;
om.next._STAR_instrument_STAR_ = null;

try{return (instrument.cljs$core$IFn$_invoke$arity$1 ? instrument.cljs$core$IFn$_invoke$arity$1(x) : instrument.call(null,x));
}finally {om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_27216;
}});})(G__27214,idxr,norm_QMARK_,state_SINGLEQUOTE_,logger,map__27211,map__27211__$1,config,root_render,normalize,pathopt,instrument,id_key,merge_sends,merge_ident,remotes,migrate,history,state,merge,shared_fn,ui__GT_props,parser,indexer,root_unmount,send,merge_tree,shared,optimize))
:G__27214);
return G__27214__$1;
})(),merge_ident,merge_sends,remotes,migrate,om.next.cache.cache(history),state_SINGLEQUOTE_,merge,shared_fn,parser,ui__GT_props,logger,idxr,root_unmount,send,shared,merge_tree,optimize,root_render,(function (){var or__18243__auto__ = !(norm_QMARK_);
if(or__18243__auto__){
return or__18243__auto__;
} else {
return normalize;
}
})()]),(function (){var G__27217 = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$normalized,cljs.core.cst$kw$remove,cljs.core.cst$kw$queue,cljs.core.cst$kw$sends_DASH_queued,cljs.core.cst$kw$queued_DASH_sends,cljs.core.cst$kw$queued,cljs.core.cst$kw$render,cljs.core.cst$kw$root,cljs.core.cst$kw$t,cljs.core.cst$kw$target],[false,null,cljs.core.PersistentVector.EMPTY,false,cljs.core.PersistentArrayMap.EMPTY,false,null,null,(0),null]);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__27217) : cljs.core.atom.call(null,G__27217));
})(),null,null,null));
return ret;
});
/**
 * Returns true if x is a reconciler.
 */
om.next.reconciler_QMARK_ = (function om$next$reconciler_QMARK_(x){
return (x instanceof om.next.Reconciler);
});
/**
 * Return the reconciler's application state atom. Useful when the reconciler
 * was initialized via denormalized data.
 */
om.next.app_state = (function om$next$app_state(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

return cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler));
});
/**
 * Return the application's root component.
 */
om.next.app_root = (function om$next$app_root(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__27219 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27219) : cljs.core.deref.call(null,G__27219));
})(),cljs.core.cst$kw$root);
});
/**
 * Force a re-render of the root. Not recommended for anything except
 * recomputing :shared.
 */
om.next.force_root_render_BANG_ = (function om$next$force_root_render_BANG_(reconciler){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((function (){var G__27221 = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(reconciler);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__27221) : cljs.core.deref.call(null,G__27221));
})(),cljs.core.cst$kw$render).call(null);
});
/**
 * Given a reconciler and UUID return the application state snapshost
 * from history associated with the UUID. The size of the reconciler history
 * may be configured by the :history option when constructing the reconciler.
 */
om.next.from_history = (function om$next$from_history(reconciler,uuid){
if(om.next.reconciler_QMARK_(reconciler)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$reconciler_QMARK_,cljs.core.cst$sym$reconciler)], 0)))].join('')));
}

return cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(reconciler)).get(uuid);
});
/**
 * Return a temporary id.
 */
om.next.tempid = (function om$next$tempid(var_args){
var args27222 = [];
var len__19301__auto___27225 = arguments.length;
var i__19302__auto___27226 = (0);
while(true){
if((i__19302__auto___27226 < len__19301__auto___27225)){
args27222.push((arguments[i__19302__auto___27226]));

var G__27227 = (i__19302__auto___27226 + (1));
i__19302__auto___27226 = G__27227;
continue;
} else {
}
break;
}

var G__27224 = args27222.length;
switch (G__27224) {
case 0:
return om.next.tempid.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.tempid.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27222.length)].join('')));

}
});

om.next.tempid.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.tempid.tempid.cljs$core$IFn$_invoke$arity$0();
});

om.next.tempid.cljs$core$IFn$_invoke$arity$1 = (function (id){
return om.tempid.tempid.cljs$core$IFn$_invoke$arity$1(id);
});

om.next.tempid.cljs$lang$maxFixedArity = 1;
/**
 * Create a Om Next transit reader. This reader can handler the tempid type.
 * Can pass transit reader customization opts map.
 */
om.next.reader = (function om$next$reader(var_args){
var args27229 = [];
var len__19301__auto___27232 = arguments.length;
var i__19302__auto___27233 = (0);
while(true){
if((i__19302__auto___27233 < len__19301__auto___27232)){
args27229.push((arguments[i__19302__auto___27233]));

var G__27234 = (i__19302__auto___27233 + (1));
i__19302__auto___27233 = G__27234;
continue;
} else {
}
break;
}

var G__27231 = args27229.length;
switch (G__27231) {
case 0:
return om.next.reader.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27229.length)].join('')));

}
});

om.next.reader.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.transit.reader.cljs$core$IFn$_invoke$arity$0();
});

om.next.reader.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return om.transit.reader.cljs$core$IFn$_invoke$arity$1(opts);
});

om.next.reader.cljs$lang$maxFixedArity = 1;
/**
 * Create a Om Next transit writer. This writer can handler the tempid type.
 * Can pass transit writer customization opts map.
 */
om.next.writer = (function om$next$writer(var_args){
var args27236 = [];
var len__19301__auto___27239 = arguments.length;
var i__19302__auto___27240 = (0);
while(true){
if((i__19302__auto___27240 < len__19301__auto___27239)){
args27236.push((arguments[i__19302__auto___27240]));

var G__27241 = (i__19302__auto___27240 + (1));
i__19302__auto___27240 = G__27241;
continue;
} else {
}
break;
}

var G__27238 = args27236.length;
switch (G__27238) {
case 0:
return om.next.writer.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return om.next.writer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27236.length)].join('')));

}
});

om.next.writer.cljs$core$IFn$_invoke$arity$0 = (function (){
return om.transit.writer.cljs$core$IFn$_invoke$arity$0();
});

om.next.writer.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return om.transit.writer.cljs$core$IFn$_invoke$arity$1(opts);
});

om.next.writer.cljs$lang$maxFixedArity = 1;
/**
 * Given a query expression return an equivalent query expression that can be
 * spliced into a transaction that will force a read of that key from the
 * specified remote target.
 */
om.next.force = (function om$next$force(var_args){
var args27243 = [];
var len__19301__auto___27246 = arguments.length;
var i__19302__auto___27247 = (0);
while(true){
if((i__19302__auto___27247 < len__19301__auto___27246)){
args27243.push((arguments[i__19302__auto___27247]));

var G__27248 = (i__19302__auto___27247 + (1));
i__19302__auto___27247 = G__27248;
continue;
} else {
}
break;
}

var G__27245 = args27243.length;
switch (G__27245) {
case 1:
return om.next.force.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return om.next.force.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27243.length)].join('')));

}
});

om.next.force.cljs$core$IFn$_invoke$arity$1 = (function (expr){
return om.next.force.cljs$core$IFn$_invoke$arity$2(expr,cljs.core.cst$kw$remote);
});

om.next.force.cljs$core$IFn$_invoke$arity$2 = (function (expr,target){
return cljs.core.with_meta(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,expr),cljs.core.cst$sym$quote),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$target,target], null));
});

om.next.force.cljs$lang$maxFixedArity = 2;
