// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.parser');
goog.require('cljs.core');
goog.require('om.next');
goog.require('ui_of_the_sith.scrollable_list');
goog.require('ui_of_the_sith.config');
goog.require('ui_of_the_sith.util');
if(typeof ui_of_the_sith.parser.read !== 'undefined'){
} else {
ui_of_the_sith.parser.read = (function (){var method_table__19156__auto__ = (function (){var G__31009 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31009) : cljs.core.atom.call(null,G__31009));
})();
var prefer_table__19157__auto__ = (function (){var G__31010 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31010) : cljs.core.atom.call(null,G__31010));
})();
var method_cache__19158__auto__ = (function (){var G__31011 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31011) : cljs.core.atom.call(null,G__31011));
})();
var cached_hierarchy__19159__auto__ = (function (){var G__31012 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31012) : cljs.core.atom.call(null,G__31012));
})();
var hierarchy__19160__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("ui-of-the-sith.parser","read"),((function (method_table__19156__auto__,prefer_table__19157__auto__,method_cache__19158__auto__,cached_hierarchy__19159__auto__,hierarchy__19160__auto__){
return (function (env,key,params){
return key;
});})(method_table__19156__auto__,prefer_table__19157__auto__,method_cache__19158__auto__,cached_hierarchy__19159__auto__,hierarchy__19160__auto__))
,cljs.core.cst$kw$default,hierarchy__19160__auto__,method_table__19156__auto__,prefer_table__19157__auto__,method_cache__19158__auto__,cached_hierarchy__19159__auto__));
})();
}
ui_of_the_sith.parser.read.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (p__31013,key,params){
var map__31014 = p__31013;
var map__31014__$1 = ((((!((map__31014 == null)))?((((map__31014.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31014.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31014):map__31014);
var env = map__31014__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31014__$1,cljs.core.cst$kw$state);
var st = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state));
var temp__4423__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,key);
if(cljs.core.truth_(temp__4423__auto__)){
var value = temp__4423__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,value], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,cljs.core.cst$kw$not_DASH_found], null);
}
}));
ui_of_the_sith.parser.get_siths = (function ui_of_the_sith$parser$get_siths(state,key){
var st = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (st){
return (function (p1__31016_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,p1__31016_SHARP_);
});})(st))
),cljs.core.get.cljs$core$IFn$_invoke$arity$2(st,key));
});
ui_of_the_sith.parser.read.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$obi_DASH_wan_DASH_planet,(function (p__31017,key,params){
var map__31018 = p__31017;
var map__31018__$1 = ((((!((map__31018 == null)))?((((map__31018.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31018.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31018):map__31018);
var env = map__31018__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31018__$1,cljs.core.cst$kw$state);
var vec__31020 = cljs.core.find((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state)),key);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31020,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31020,(1),null);
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,v], null);
}));
ui_of_the_sith.parser.read.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$siths_SLASH_list,(function (p__31021,key,params){
var map__31022 = p__31021;
var map__31022__$1 = ((((!((map__31022 == null)))?((((map__31022.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31022.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31022):map__31022);
var env = map__31022__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31022__$1,cljs.core.cst$kw$state);
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,ui_of_the_sith.parser.get_siths(state,key)], null);
}));
if(typeof ui_of_the_sith.parser.mutate !== 'undefined'){
} else {
ui_of_the_sith.parser.mutate = (function (){var method_table__19156__auto__ = (function (){var G__31024 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31024) : cljs.core.atom.call(null,G__31024));
})();
var prefer_table__19157__auto__ = (function (){var G__31025 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31025) : cljs.core.atom.call(null,G__31025));
})();
var method_cache__19158__auto__ = (function (){var G__31026 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31026) : cljs.core.atom.call(null,G__31026));
})();
var cached_hierarchy__19159__auto__ = (function (){var G__31027 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__31027) : cljs.core.atom.call(null,G__31027));
})();
var hierarchy__19160__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("ui-of-the-sith.parser","mutate"),om.next.dispatch,cljs.core.cst$kw$default,hierarchy__19160__auto__,method_table__19156__auto__,prefer_table__19157__auto__,method_cache__19158__auto__,cached_hierarchy__19159__auto__));
})();
}
ui_of_the_sith.parser.mutate.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1,___$2){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,cljs.core.cst$kw$not_DASH_found], null);
}));
ui_of_the_sith.parser.mutate.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$obi_DASH_wan_DASH_planet_SLASH_update,(function (p__31028,key,p__31029){
var map__31030 = p__31028;
var map__31030__$1 = ((((!((map__31030 == null)))?((((map__31030.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31030.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31030):map__31030);
var env = map__31030__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31030__$1,cljs.core.cst$kw$state);
var map__31031 = p__31029;
var map__31031__$1 = ((((!((map__31031 == null)))?((((map__31031.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31031.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31031):map__31031);
var params = map__31031__$1;
var planet_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31031__$1,cljs.core.cst$kw$planet_DASH_name);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$keys,cljs.core.cst$kw$obi_DASH_wan_DASH_planet], null),cljs.core.cst$kw$action,((function (map__31030,map__31030__$1,env,state,map__31031,map__31031__$1,params,planet_name){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$obi_DASH_wan_DASH_planet,planet_name);
});})(map__31030,map__31030__$1,env,state,map__31031,map__31031__$1,params,planet_name))
], null);
}));
ui_of_the_sith.parser.mutate.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$sith_SLASH_set_DASH_remote_DASH_id,(function (p__31034,key,p__31035){
var map__31036 = p__31034;
var map__31036__$1 = ((((!((map__31036 == null)))?((((map__31036.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31036.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31036):map__31036);
var env = map__31036__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31036__$1,cljs.core.cst$kw$state);
var map__31037 = p__31035;
var map__31037__$1 = ((((!((map__31037 == null)))?((((map__31037.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31037.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31037):map__31037);
var params = map__31037__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31037__$1,cljs.core.cst$kw$id);
var remote_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31037__$1,cljs.core.cst$kw$remote_DASH_id);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$action,((function (map__31036,map__31036__$1,env,state,map__31037,map__31037__$1,params,id,remote_id){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id,cljs.core.cst$kw$sith_SLASH_remote_DASH_id], null),remote_id);
});})(map__31036,map__31036__$1,env,state,map__31037,map__31037__$1,params,id,remote_id))
,cljs.core.cst$kw$value,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$keys,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null))))))], null)], null);
}));
ui_of_the_sith.parser.mutate.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$sith_SLASH_populate_DASH_from_DASH_remote,(function (p__31040,key,params){
var map__31041 = p__31040;
var map__31041__$1 = ((((!((map__31041 == null)))?((((map__31041.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31041.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31041):map__31041);
var env = map__31041__$1;
var ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31041__$1,cljs.core.cst$kw$ast);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31041__$1,cljs.core.cst$kw$component);
var ast_SINGLEQUOTE_ = cljs.core.assoc_in(ast,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$params], null),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([params,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$component,component], null)], 0)));
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dark_DASH_jedi_DASH_query,ast_SINGLEQUOTE_], null);
}));
ui_of_the_sith.parser.mutate.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$sym$siths_SLASH_scroll,(function (p__31043,key,p__31044){
var map__31045 = p__31043;
var map__31045__$1 = ((((!((map__31045 == null)))?((((map__31045.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31045.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31045):map__31045);
var env = map__31045__$1;
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31045__$1,cljs.core.cst$kw$state);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31045__$1,cljs.core.cst$kw$component);
var map__31046 = p__31044;
var map__31046__$1 = ((((!((map__31046 == null)))?((((map__31046.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31046.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31046):map__31046);
var params = map__31046__$1;
var index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31046__$1,cljs.core.cst$kw$index);
var move_to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31046__$1,cljs.core.cst$kw$move_DASH_to);
var sith_query = om.next.get_query(ui_of_the_sith.scrollable_list.Slot);
var norm_list = cljs.core.cst$kw$siths_SLASH_list.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state)));
var norm_refs = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,cljs.core.cst$kw$siths_SLASH_by_DASH_id.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(state) : cljs.core.deref.call(null,state)))], null);
var denorm_list = om.next.db__GT_tree.cljs$core$IFn$_invoke$arity$3(sith_query,norm_list,norm_refs);
var new_list = (function (){var pred__31049 = cljs.core._EQ_;
var expr__31050 = move_to;
if(cljs.core.truth_((pred__31049.cljs$core$IFn$_invoke$arity$2 ? pred__31049.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$start,expr__31050) : pred__31049.call(null,cljs.core.cst$kw$start,expr__31050)))){
return ui_of_the_sith.util.fill_siths(cljs.core.cst$kw$apprentice,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(denorm_list,index,ui_of_the_sith.config.list_size));
} else {
if(cljs.core.truth_((pred__31049.cljs$core$IFn$_invoke$arity$2 ? pred__31049.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$end,expr__31050) : pred__31049.call(null,cljs.core.cst$kw$end,expr__31050)))){
return ui_of_the_sith.util.fill_siths(cljs.core.cst$kw$master,cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(denorm_list,(0),((1) + index)));
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__31050)].join('')));
}
}
})();
var norm_new_list = om.next.tree__GT_db.cljs$core$IFn$_invoke$arity$2(component,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$siths_SLASH_list,new_list], null));
var new_refs = cljs.core.meta(norm_new_list);
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$action,((function (sith_query,norm_list,norm_refs,denorm_list,new_list,norm_new_list,new_refs,map__31045,map__31045__$1,env,state,component,map__31046,map__31046__$1,params,index,move_to){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.assoc,cljs.core.cst$kw$siths_SLASH_list,cljs.core.cst$kw$siths_SLASH_list.cljs$core$IFn$_invoke$arity$1(norm_new_list),cljs.core.array_seq([cljs.core.cst$kw$siths_SLASH_by_DASH_id,cljs.core.cst$kw$siths_SLASH_by_DASH_id.cljs$core$IFn$_invoke$arity$1(new_refs)], 0));
});})(sith_query,norm_list,norm_refs,denorm_list,new_list,norm_new_list,new_refs,map__31045,map__31045__$1,env,state,component,map__31046,map__31046__$1,params,index,move_to))
], null);
}));
