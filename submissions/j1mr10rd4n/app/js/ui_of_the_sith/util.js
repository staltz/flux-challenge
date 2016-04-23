// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.util');
goog.require('cljs.core');
goog.require('om.next');
goog.require('ui_of_the_sith.config');
ui_of_the_sith.util.create_master_of = (function ui_of_the_sith$util$create_master_of(apprentice){
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$sith_SLASH_id,om.next.tempid.cljs$core$IFn$_invoke$arity$0(),cljs.core.cst$kw$sith_SLASH_name,null,cljs.core.cst$kw$sith_SLASH_homeworld,null,cljs.core.cst$kw$sith_SLASH_master_DASH_id,null,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id,(apprentice.cljs$core$IFn$_invoke$arity$1 ? apprentice.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_id) : apprentice.call(null,cljs.core.cst$kw$sith_SLASH_id)),cljs.core.cst$kw$sith_SLASH_remote_DASH_id,(apprentice.cljs$core$IFn$_invoke$arity$1 ? apprentice.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id) : apprentice.call(null,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id)),cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id,null,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,(apprentice.cljs$core$IFn$_invoke$arity$1 ? apprentice.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_remote_DASH_id) : apprentice.call(null,cljs.core.cst$kw$sith_SLASH_remote_DASH_id))], null);
});
ui_of_the_sith.util.create_apprentice_of = (function ui_of_the_sith$util$create_apprentice_of(master){
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$sith_SLASH_id,om.next.tempid.cljs$core$IFn$_invoke$arity$0(),cljs.core.cst$kw$sith_SLASH_name,null,cljs.core.cst$kw$sith_SLASH_homeworld,null,cljs.core.cst$kw$sith_SLASH_master_DASH_id,(master.cljs$core$IFn$_invoke$arity$1 ? master.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_id) : master.call(null,cljs.core.cst$kw$sith_SLASH_id)),cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id,null,cljs.core.cst$kw$sith_SLASH_remote_DASH_id,(master.cljs$core$IFn$_invoke$arity$1 ? master.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id) : master.call(null,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id)),cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id,(master.cljs$core$IFn$_invoke$arity$1 ? master.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_remote_DASH_id) : master.call(null,cljs.core.cst$kw$sith_SLASH_remote_DASH_id)),cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,null], null);
});
ui_of_the_sith.util.append_apprentice_to = (function ui_of_the_sith$util$append_apprentice_to(siths){
var last_master = cljs.core.last(siths);
var apprentice = ui_of_the_sith.util.create_apprentice_of(last_master);
var siths_SINGLEQUOTE_ = cljs.core.assoc_in(siths,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.count(siths) - (1)),cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id], null),(apprentice.cljs$core$IFn$_invoke$arity$1 ? apprentice.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_id) : apprentice.call(null,cljs.core.cst$kw$sith_SLASH_id)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(siths_SINGLEQUOTE_,apprentice));
});
ui_of_the_sith.util.prepend_master_to = (function ui_of_the_sith$util$prepend_master_to(siths){
var first_apprentice = cljs.core.first(siths);
var master = ui_of_the_sith.util.create_master_of(first_apprentice);
var siths_SINGLEQUOTE_ = cljs.core.assoc_in(siths,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$sith_SLASH_master_DASH_id], null),(master.cljs$core$IFn$_invoke$arity$1 ? master.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sith_SLASH_id) : master.call(null,cljs.core.cst$kw$sith_SLASH_id)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.cons(master,siths_SINGLEQUOTE_));
});
ui_of_the_sith.util.fill_siths = (function ui_of_the_sith$util$fill_siths(relationship,siths){
var fill_count = (ui_of_the_sith.config.list_size - cljs.core.count(siths));
var fill_function = (function (){var pred__27255 = cljs.core._EQ_;
var expr__27256 = relationship;
if(cljs.core.truth_((pred__27255.cljs$core$IFn$_invoke$arity$2 ? pred__27255.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$master,expr__27256) : pred__27255.call(null,cljs.core.cst$kw$master,expr__27256)))){
return ui_of_the_sith.util.prepend_master_to;
} else {
if(cljs.core.truth_((pred__27255.cljs$core$IFn$_invoke$arity$2 ? pred__27255.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$apprentice,expr__27256) : pred__27255.call(null,cljs.core.cst$kw$apprentice,expr__27256)))){
return ui_of_the_sith.util.append_apprentice_to;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__27256)].join('')));
}
}
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (fill_count,fill_function){
return (function (siths_SINGLEQUOTE_,_){
return (fill_function.cljs$core$IFn$_invoke$arity$1 ? fill_function.cljs$core$IFn$_invoke$arity$1(siths_SINGLEQUOTE_) : fill_function.call(null,siths_SINGLEQUOTE_));
});})(fill_count,fill_function))
,siths,cljs.core.range.cljs$core$IFn$_invoke$arity$1(fill_count));
});
ui_of_the_sith.util.index_of = (function ui_of_the_sith$util$index_of(coll,v){
var i = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__27258_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(v,p1__27258_SHARP_);
}),coll));
if(((i < cljs.core.count(coll))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.last(coll)))){
return i;
} else {
return null;
}
});
