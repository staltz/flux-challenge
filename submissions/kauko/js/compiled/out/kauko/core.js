// Compiled by ClojureScript 1.7.122 {}
goog.provide('kauko.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('kauko.requests');
goog.require('kauko.websockets');
goog.require('clojure.set');
goog.require('cljs.core.async');
cljs.core.enable_console_print_BANG_.call(null);
kauko.core.num_of_sith = (5);
kauko.core.num_of_steps = (2);
if(typeof kauko.core.obi_wan_location !== 'undefined'){
} else {
kauko.core.obi_wan_location = reagent.core.atom.call(null,null);
}
if(typeof kauko.core.sith_list !== 'undefined'){
} else {
kauko.core.sith_list = reagent.core.atom.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.take.call(null,kauko.core.num_of_sith,cljs.core.repeat.call(null,null))));
}
kauko.core.get_apprentice = (function kauko$core$get_apprentice(index){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,kauko.core.sith_list),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,new cljs.core.Keyword(null,"apprentice","apprentice",-1838808462)], null));
});
kauko.core.get_master = (function kauko$core$get_master(index){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,kauko.core.sith_list),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [index,new cljs.core.Keyword(null,"master","master",779988698)], null));
});
kauko.core.obi_wan_on_sith_planet_QMARK_ = (function kauko$core$obi_wan_on_sith_planet_QMARK_(){
return cljs.core.some.call(null,(function (sith){
return cljs.core._EQ_.call(null,cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"homeworld","homeworld",1090129115),new cljs.core.Keyword(null,"name","name",1843675177)], null)),cljs.core.get.call(null,cljs.core.deref.call(null,kauko.core.obi_wan_location),"name"));
}),cljs.core.deref.call(null,kauko.core.sith_list));
});
kauko.core.fetch_some_sith_BANG_ = (function kauko$core$fetch_some_sith_BANG_(whole_list){
var just_sith = cljs.core.remove.call(null,cljs.core.nil_QMARK_,whole_list);
if((cljs.core.first.call(null,whole_list) == null)){
var G__19805_19807 = cljs.core.get_in.call(null,cljs.core.first.call(null,just_sith),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"master","master",779988698),new cljs.core.Keyword(null,"id","id",-1388402092)], null));
var G__19805_19808__$1 = (((G__19805_19807 == null))?null:kauko.requests.get_sith_BANG_.call(null,G__19805_19807));
} else {
}

if((cljs.core.last.call(null,whole_list) == null)){
var G__19806 = cljs.core.get_in.call(null,cljs.core.last.call(null,just_sith),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"apprentice","apprentice",-1838808462),new cljs.core.Keyword(null,"id","id",-1388402092)], null));
var G__19806__$1 = (((G__19806 == null))?null:kauko.requests.get_sith_BANG_.call(null,G__19806));
return G__19806__$1;
} else {
return null;
}
});
cljs.core.add_watch.call(null,kauko.core.sith_list,new cljs.core.Keyword(null,"sith-list-watcher","sith-list-watcher",1146639367),(function (_,___$1,___$2,new_state){
if(cljs.core.truth_(kauko.core.obi_wan_on_sith_planet_QMARK_.call(null))){
return kauko.requests.abort_requests_BANG_.call(null);
} else {
return kauko.core.fetch_some_sith_BANG_.call(null,new_state);
}
}));
cljs.core.add_watch.call(null,kauko.core.obi_wan_location,new cljs.core.Keyword(null,"request-aborter","request-aborter",-2127269539),(function (_,___$1,___$2,___$3){
if(cljs.core.truth_(kauko.core.obi_wan_on_sith_planet_QMARK_.call(null))){
return kauko.requests.abort_requests_BANG_.call(null);
} else {
if(cljs.core.truth_((function (){var and__16306__auto__ = cljs.core.empty_QMARK_.call(null,cljs.core.deref.call(null,kauko.requests.pending_requests));
if(and__16306__auto__){
return cljs.core.some.call(null,cljs.core.nil_QMARK_,cljs.core.deref.call(null,kauko.core.sith_list));
} else {
return and__16306__auto__;
}
})())){
cljs.core.print.call(null,"Restart requests!");

return kauko.core.fetch_some_sith_BANG_.call(null,cljs.core.deref.call(null,kauko.core.sith_list));
} else {
return null;
}
}
}));
kauko.core.get_index_for_sith = (function kauko$core$get_index_for_sith(sith){

var or__16318__auto__ = (cljs.core.truth_(cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"master","master",779988698),new cljs.core.Keyword(null,"id","id",-1388402092)], null)))?cljs.core.first.call(null,cljs.core.keep_indexed.call(null,(function (index,master){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(master),cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"master","master",779988698),new cljs.core.Keyword(null,"id","id",-1388402092)], null)))){
return (index + (1));
} else {
return null;
}
}),cljs.core.deref.call(null,kauko.core.sith_list))):null);
if(cljs.core.truth_(or__16318__auto__)){
return or__16318__auto__;
} else {
var or__16318__auto____$1 = (cljs.core.truth_(cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"apprentice","apprentice",-1838808462),new cljs.core.Keyword(null,"id","id",-1388402092)], null)))?cljs.core.first.call(null,cljs.core.keep_indexed.call(null,((function (or__16318__auto__){
return (function (index,apprentice){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(apprentice),cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"apprentice","apprentice",-1838808462),new cljs.core.Keyword(null,"id","id",-1388402092)], null)))){
return (index - (1));
} else {
return null;
}
});})(or__16318__auto__))
,cljs.core.deref.call(null,kauko.core.sith_list))):null);
if(cljs.core.truth_(or__16318__auto____$1)){
return or__16318__auto____$1;
} else {
return cljs.core.rand_int.call(null,kauko.core.num_of_sith);
}
}
});
kauko.core.sith_fetched_BANG_ = (function kauko$core$sith_fetched_BANG_(sith){
var index = kauko.core.get_index_for_sith.call(null,sith);
if(((index >= (0))) && ((index < kauko.core.num_of_sith))){
cljs.core.print.call(null,"Found ",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(sith),", putting to: ",index);

return cljs.core.swap_BANG_.call(null,kauko.core.sith_list,cljs.core.assoc,index,sith);
} else {
return null;
}
});
var c__19340__auto___19830 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19340__auto___19830){
return (function (){
var f__19341__auto__ = (function (){var switch__19319__auto__ = ((function (c__19340__auto___19830){
return (function (state_19818){
var state_val_19819 = (state_19818[(1)]);
if((state_val_19819 === (1))){
var state_19818__$1 = state_19818;
var statearr_19820_19831 = state_19818__$1;
(statearr_19820_19831[(2)] = null);

(statearr_19820_19831[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19819 === (2))){
var state_19818__$1 = state_19818;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19818__$1,(4),kauko.requests.out_channel);
} else {
if((state_val_19819 === (3))){
var inst_19816 = (state_19818[(2)]);
var state_19818__$1 = state_19818;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19818__$1,inst_19816);
} else {
if((state_val_19819 === (4))){
var inst_19811 = (state_19818[(2)]);
var inst_19812 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_19811);
var inst_19813 = kauko.core.sith_fetched_BANG_.call(null,inst_19812);
var state_19818__$1 = (function (){var statearr_19821 = state_19818;
(statearr_19821[(7)] = inst_19813);

return statearr_19821;
})();
var statearr_19822_19832 = state_19818__$1;
(statearr_19822_19832[(2)] = null);

(statearr_19822_19832[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
});})(c__19340__auto___19830))
;
return ((function (switch__19319__auto__,c__19340__auto___19830){
return (function() {
var kauko$core$state_machine__19320__auto__ = null;
var kauko$core$state_machine__19320__auto____0 = (function (){
var statearr_19826 = [null,null,null,null,null,null,null,null];
(statearr_19826[(0)] = kauko$core$state_machine__19320__auto__);

(statearr_19826[(1)] = (1));

return statearr_19826;
});
var kauko$core$state_machine__19320__auto____1 = (function (state_19818){
while(true){
var ret_value__19321__auto__ = (function (){try{while(true){
var result__19322__auto__ = switch__19319__auto__.call(null,state_19818);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19322__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19322__auto__;
}
break;
}
}catch (e19827){if((e19827 instanceof Object)){
var ex__19323__auto__ = e19827;
var statearr_19828_19833 = state_19818;
(statearr_19828_19833[(5)] = ex__19323__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19818);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19827;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19321__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19834 = state_19818;
state_19818 = G__19834;
continue;
} else {
return ret_value__19321__auto__;
}
break;
}
});
kauko$core$state_machine__19320__auto__ = function(state_19818){
switch(arguments.length){
case 0:
return kauko$core$state_machine__19320__auto____0.call(this);
case 1:
return kauko$core$state_machine__19320__auto____1.call(this,state_19818);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
kauko$core$state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$0 = kauko$core$state_machine__19320__auto____0;
kauko$core$state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$1 = kauko$core$state_machine__19320__auto____1;
return kauko$core$state_machine__19320__auto__;
})()
;})(switch__19319__auto__,c__19340__auto___19830))
})();
var state__19342__auto__ = (function (){var statearr_19829 = f__19341__auto__.call(null);
(statearr_19829[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19340__auto___19830);

return statearr_19829;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19342__auto__);
});})(c__19340__auto___19830))
);

kauko.core.nil_to_start = (function kauko$core$nil_to_start(col,num_to_take,num_of_nil){

return cljs.core.vec.call(null,cljs.core.take.call(null,num_to_take,cljs.core.concat.call(null,cljs.core.repeat.call(null,num_of_nil,null),col)));
});
kauko.core.nil_to_end = (function kauko$core$nil_to_end(coll,num_to_take,num_of_nil){

return cljs.core.vec.call(null,cljs.core.take_last.call(null,num_to_take,cljs.core.concat.call(null,coll,cljs.core.repeat.call(null,num_of_nil,null))));
});
/**
 * Aborts requests for masters/apprentices of the sith in coll.
 */
kauko.core.stop_fetching_for_BANG_ = (function kauko$core$stop_fetching_for_BANG_(var_args){
var args19836 = [];
var len__17376__auto___19843 = arguments.length;
var i__17377__auto___19844 = (0);
while(true){
if((i__17377__auto___19844 < len__17376__auto___19843)){
args19836.push((arguments[i__17377__auto___19844]));

var G__19845 = (i__17377__auto___19844 + (1));
i__17377__auto___19844 = G__19845;
continue;
} else {
}
break;
}

var G__19838 = args19836.length;
switch (G__19838) {
case 1:
return kauko.core.stop_fetching_for_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kauko.core.stop_fetching_for_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19836.length)].join('')));

}
});

kauko.core.stop_fetching_for_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (coll){
kauko.core.stop_fetching_for_BANG_.call(null,coll,new cljs.core.Keyword(null,"master","master",779988698));

return kauko.core.stop_fetching_for_BANG_.call(null,coll,new cljs.core.Keyword(null,"apprentice","apprentice",-1838808462));
});

kauko.core.stop_fetching_for_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (coll,key){
var seq__19839 = cljs.core.seq.call(null,cljs.core.map.call(null,(function (p1__19835_SHARP_){
return cljs.core.get_in.call(null,p1__19835_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,new cljs.core.Keyword(null,"id","id",-1388402092)], null));
}),coll));
var chunk__19840 = null;
var count__19841 = (0);
var i__19842 = (0);
while(true){
if((i__19842 < count__19841)){
var id = cljs.core._nth.call(null,chunk__19840,i__19842);
kauko.requests.abort_request_BANG_.call(null,id);

var G__19847 = seq__19839;
var G__19848 = chunk__19840;
var G__19849 = count__19841;
var G__19850 = (i__19842 + (1));
seq__19839 = G__19847;
chunk__19840 = G__19848;
count__19841 = G__19849;
i__19842 = G__19850;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__19839);
if(temp__4425__auto__){
var seq__19839__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19839__$1)){
var c__17121__auto__ = cljs.core.chunk_first.call(null,seq__19839__$1);
var G__19851 = cljs.core.chunk_rest.call(null,seq__19839__$1);
var G__19852 = c__17121__auto__;
var G__19853 = cljs.core.count.call(null,c__17121__auto__);
var G__19854 = (0);
seq__19839 = G__19851;
chunk__19840 = G__19852;
count__19841 = G__19853;
i__19842 = G__19854;
continue;
} else {
var id = cljs.core.first.call(null,seq__19839__$1);
kauko.requests.abort_request_BANG_.call(null,id);

var G__19855 = cljs.core.next.call(null,seq__19839__$1);
var G__19856 = null;
var G__19857 = (0);
var G__19858 = (0);
seq__19839 = G__19855;
chunk__19840 = G__19856;
count__19841 = G__19857;
i__19842 = G__19858;
continue;
}
} else {
return null;
}
}
break;
}
});

kauko.core.stop_fetching_for_BANG_.cljs$lang$maxFixedArity = 2;
kauko.core.single_sith = (function kauko$core$single_sith(sith,generated_id){
if(cljs.core.truth_(sith)){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),(function (){var G__19860 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-slot"], null);
var G__19860__$1 = ((cljs.core._EQ_.call(null,cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"homeworld","homeworld",1090129115),new cljs.core.Keyword(null,"name","name",1843675177)], null)),cljs.core.get.call(null,cljs.core.deref.call(null,kauko.core.obi_wan_location),"name")))?cljs.core.merge.call(null,G__19860,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null)], null)):G__19860);
return G__19860__$1;
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(sith)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h6","h6",557293780),[cljs.core.str("Homeworld: "),cljs.core.str(cljs.core.get_in.call(null,sith,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"homeworld","homeworld",1090129115),new cljs.core.Keyword(null,"name","name",1843675177)], null)))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),generated_id], null));
} else {
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-slot"], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),generated_id], null));
}
});
kauko.core.main_view = (function kauko$core$main_view(){
var up_button_enabled_QMARK_ = (cljs.core.truth_((function (){var and__16306__auto__ = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(kauko.core.get_master.call(null,(0)));
if(cljs.core.truth_(and__16306__auto__)){
return cljs.core.not.call(null,kauko.core.obi_wan_on_sith_planet_QMARK_.call(null));
} else {
return and__16306__auto__;
}
})())?true:null);
var down_button_enabled_QMARK_ = (cljs.core.truth_((function (){var and__16306__auto__ = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(kauko.core.get_apprentice.call(null,(kauko.core.num_of_sith - (1))));
if(cljs.core.truth_(and__16306__auto__)){
return cljs.core.not.call(null,kauko.core.obi_wan_on_sith_planet_QMARK_.call(null));
} else {
return and__16306__auto__;
}
})())?true:null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"app-container"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-root"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-planet-monitor"], null),"Obi-Wan currently on ",cljs.core.get.call(null,cljs.core.deref.call(null,kauko.core.obi_wan_location),"name")], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-scrollable-list"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-slots"], null),cljs.core.doall.call(null,(function (){var iter__17090__auto__ = ((function (up_button_enabled_QMARK_,down_button_enabled_QMARK_){
return (function kauko$core$main_view_$_iter__19872(s__19873){
return (new cljs.core.LazySeq(null,((function (up_button_enabled_QMARK_,down_button_enabled_QMARK_){
return (function (){
var s__19873__$1 = s__19873;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__19873__$1);
if(temp__4425__auto__){
var s__19873__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19873__$2)){
var c__17088__auto__ = cljs.core.chunk_first.call(null,s__19873__$2);
var size__17089__auto__ = cljs.core.count.call(null,c__17088__auto__);
var b__19875 = cljs.core.chunk_buffer.call(null,size__17089__auto__);
if((function (){var i__19874 = (0);
while(true){
if((i__19874 < size__17089__auto__)){
var vec__19878 = cljs.core._nth.call(null,c__17088__auto__,i__19874);
var sith = cljs.core.nth.call(null,vec__19878,(0),null);
var id = cljs.core.nth.call(null,vec__19878,(1),null);
cljs.core.chunk_append.call(null,b__19875,kauko.core.single_sith.call(null,sith,id));

var G__19880 = (i__19874 + (1));
i__19874 = G__19880;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19875),kauko$core$main_view_$_iter__19872.call(null,cljs.core.chunk_rest.call(null,s__19873__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19875),null);
}
} else {
var vec__19879 = cljs.core.first.call(null,s__19873__$2);
var sith = cljs.core.nth.call(null,vec__19879,(0),null);
var id = cljs.core.nth.call(null,vec__19879,(1),null);
return cljs.core.cons.call(null,kauko.core.single_sith.call(null,sith,id),kauko$core$main_view_$_iter__19872.call(null,cljs.core.rest.call(null,s__19873__$2)));
}
} else {
return null;
}
break;
}
});})(up_button_enabled_QMARK_,down_button_enabled_QMARK_))
,null,null));
});})(up_button_enabled_QMARK_,down_button_enabled_QMARK_))
;
return iter__17090__auto__.call(null,cljs.core.partition.call(null,(2),cljs.core.interleave.call(null,cljs.core.take.call(null,kauko.core.num_of_sith,cljs.core.deref.call(null,kauko.core.sith_list)),cljs.core.map.call(null,((function (iter__17090__auto__,up_button_enabled_QMARK_,down_button_enabled_QMARK_){
return (function (p1__19861_SHARP_){
return [cljs.core.str("gen_id_"),cljs.core.str(p1__19861_SHARP_)].join('');
});})(iter__17090__auto__,up_button_enabled_QMARK_,down_button_enabled_QMARK_))
,cljs.core.range.call(null,kauko.core.num_of_sith)))));
})())], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"css-scroll-buttons"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str("css-button-up"),cljs.core.str((cljs.core.truth_(up_button_enabled_QMARK_)?null:" css-button-disabled"))].join(''),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (up_button_enabled_QMARK_,down_button_enabled_QMARK_){
return (function (p1__19862_SHARP_){
p1__19862_SHARP_.preventDefault();

if(cljs.core.truth_(up_button_enabled_QMARK_)){
kauko.core.stop_fetching_for_BANG_.call(null,cljs.core.take_last.call(null,kauko.core.num_of_steps,cljs.core.deref.call(null,kauko.core.sith_list)));

return cljs.core.reset_BANG_.call(null,kauko.core.sith_list,kauko.core.nil_to_start.call(null,cljs.core.deref.call(null,kauko.core.sith_list),kauko.core.num_of_sith,kauko.core.num_of_steps));
} else {
return null;
}
});})(up_button_enabled_QMARK_,down_button_enabled_QMARK_))
], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str("css-button-down"),cljs.core.str((cljs.core.truth_(down_button_enabled_QMARK_)?null:" css-button-disabled"))].join(''),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (up_button_enabled_QMARK_,down_button_enabled_QMARK_){
return (function (p1__19863_SHARP_){
p1__19863_SHARP_.preventDefault();

if(cljs.core.truth_(down_button_enabled_QMARK_)){
kauko.core.stop_fetching_for_BANG_.call(null,cljs.core.take.call(null,kauko.core.num_of_steps,cljs.core.deref.call(null,kauko.core.sith_list)));

return cljs.core.reset_BANG_.call(null,kauko.core.sith_list,kauko.core.nil_to_end.call(null,cljs.core.deref.call(null,kauko.core.sith_list),kauko.core.num_of_sith,kauko.core.num_of_steps));
} else {
return null;
}
});})(up_button_enabled_QMARK_,down_button_enabled_QMARK_))
], null)], null)], null)], null)], null)], null);
});
reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kauko.core.main_view], null),document.getElementById("app"));
kauko.websockets.start_websocket_BANG_.call(null,kauko.core.obi_wan_location);
var co__19795__auto___19881 = reagent.ratom.make_reaction.call(null,(function (){
if(cljs.core.empty_QMARK_.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.deref.call(null,kauko.core.sith_list)))){
return kauko.requests.get_sith_BANG_.call(null,(3616));
} else {
return null;
}
}),new cljs.core.Keyword(null,"auto-run","auto-run",1958400437),true);
cljs.core.deref.call(null,co__19795__auto___19881);


//# sourceMappingURL=core.js.map?rel=1446734326343