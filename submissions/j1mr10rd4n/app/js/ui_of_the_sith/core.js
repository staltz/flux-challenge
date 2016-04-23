// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.core');
goog.require('cljs.core');
goog.require('ui_of_the_sith.util');
goog.require('goog.dom');
goog.require('goog.Uri');
goog.require('ui_of_the_sith.parser');
goog.require('om.dom');
goog.require('ui_of_the_sith.config');
goog.require('ui_of_the_sith.scrollable_list');
goog.require('cljs.core.async');
goog.require('ui_of_the_sith.planet_monitor');
goog.require('goog.object');
goog.require('goog.events');
goog.require('goog.net.XhrIo');
goog.require('om.next');
ui_of_the_sith.core.initial_siths = (function (){var initial_sith = new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$sith_SLASH_id,om.next.tempid.cljs$core$IFn$_invoke$arity$0(),cljs.core.cst$kw$sith_SLASH_name,null,cljs.core.cst$kw$sith_SLASH_homeworld,null,cljs.core.cst$kw$sith_SLASH_master_DASH_id,null,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id,null,cljs.core.cst$kw$sith_SLASH_remote_DASH_id,ui_of_the_sith.config.initial_sith_remote_id,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id,null,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,null], null);
return ui_of_the_sith.util.fill_siths(cljs.core.cst$kw$apprentice,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [initial_sith], null));
})();
ui_of_the_sith.core.send_chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
ui_of_the_sith.core.send_to_chan = (function ui_of_the_sith$core$send_to_chan(c){
return (function (p__31062,cb){
var map__31063 = p__31062;
var map__31063__$1 = ((((!((map__31063 == null)))?((((map__31063.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31063.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31063):map__31063);
var dark_jedi_query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31063__$1,cljs.core.cst$kw$dark_DASH_jedi_DASH_query);
if(cljs.core.truth_(dark_jedi_query)){
var map__31065 = om.next.query__GT_ast(dark_jedi_query);
var map__31065__$1 = ((((!((map__31065 == null)))?((((map__31065.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31065.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31065):map__31065);
var vec__31066 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31065__$1,cljs.core.cst$kw$children);
var dark_jedi_query__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31066,(0),null);
var map__31067 = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(dark_jedi_query__$1);
var map__31067__$1 = ((((!((map__31067 == null)))?((((map__31067.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31067.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31067):map__31067);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31067__$1,cljs.core.cst$kw$component);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(c,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [component,cb], null));
} else {
return null;
}
});
});
ui_of_the_sith.core.reconciler = om.next.reconciler(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$state,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$siths_SLASH_list,ui_of_the_sith.core.initial_siths], null),cljs.core.cst$kw$parser,om.next.parser(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$read,ui_of_the_sith.parser.read,cljs.core.cst$kw$mutate,ui_of_the_sith.parser.mutate], null)),cljs.core.cst$kw$send,ui_of_the_sith.core.send_to_chan(ui_of_the_sith.core.send_chan),cljs.core.cst$kw$remotes,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$dark_DASH_jedi_DASH_query], null),cljs.core.cst$kw$logger,ui_of_the_sith.config.logger], null));
ui_of_the_sith.core.dark_jedi_service_loop = (function ui_of_the_sith$core$dark_jedi_service_loop(c){
var c__20268__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__20268__auto__){
return (function (){
var f__20269__auto__ = (function (){var switch__20247__auto__ = ((function (c__20268__auto__){
return (function (state_31205){
var state_val_31206 = (state_31205[(1)]);
if((state_val_31206 === (7))){
var inst_31181 = (state_31205[(2)]);
var state_31205__$1 = state_31205;
if(cljs.core.truth_(inst_31181)){
var statearr_31207_31236 = state_31205__$1;
(statearr_31207_31236[(1)] = (11));

} else {
var statearr_31208_31237 = state_31205__$1;
(statearr_31208_31237[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (1))){
var state_31205__$1 = state_31205;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31205__$1,(2),c);
} else {
if((state_val_31206 === (4))){
var inst_31203 = (state_31205[(2)]);
var state_31205__$1 = state_31205;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31205__$1,inst_31203);
} else {
if((state_val_31206 === (13))){
var inst_31160 = (state_31205[(7)]);
var inst_31157 = (state_31205[(8)]);
var inst_31163 = (state_31205[(9)]);
var inst_31164 = (state_31205[(10)]);
var inst_31186 = (state_31205[(2)]);
var inst_31187 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_31186,cljs.core.cst$kw$sith_SLASH_id);
var inst_31188 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_31186,cljs.core.cst$kw$sith_SLASH_remote_DASH_id);
var inst_31189 = [cljs.core.str(ui_of_the_sith.config.base_url),cljs.core.str(inst_31188)].join('');
var inst_31190 = (new goog.Uri(inst_31189));
var inst_31191 = (new goog.net.XhrIo());
var inst_31192 = (function (){var uri = inst_31190;
var map__31165 = inst_31186;
var xhr = inst_31191;
var remote_id = inst_31188;
var cb = inst_31164;
var G__31154 = inst_31160;
var component = inst_31163;
var sith = inst_31186;
var vec__31162 = inst_31160;
var id = inst_31187;
var url = inst_31189;
var vec__31155 = inst_31157;
return ((function (uri,map__31165,xhr,remote_id,cb,G__31154,component,sith,vec__31162,id,url,vec__31155,inst_31160,inst_31157,inst_31163,inst_31164,inst_31186,inst_31187,inst_31188,inst_31189,inst_31190,inst_31191,state_val_31206,c__20268__auto__){
return (function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(goog.object.get(e,"type"),goog.net.EventType.COMPLETE)){
var xhr__$1 = goog.object.get(e,"target");
var temp__4423__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),xhr__$1.getStatus());
if(temp__4423__auto__){
var status = temp__4423__auto__;
var jedi_data = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(xhr__$1.getResponseJson());
ui_of_the_sith.config.logger.info([cljs.core.str("GOT RESPONSE FOR "),cljs.core.str((jedi_data.cljs$core$IFn$_invoke$arity$1 ? jedi_data.cljs$core$IFn$_invoke$arity$1("name") : jedi_data.call(null,"name"))),cljs.core.str(" WITH REMOTE ID "),cljs.core.str((jedi_data.cljs$core$IFn$_invoke$arity$1 ? jedi_data.cljs$core$IFn$_invoke$arity$1("id") : jedi_data.call(null,"id")))].join(''));

var name = (jedi_data.cljs$core$IFn$_invoke$arity$1 ? jedi_data.cljs$core$IFn$_invoke$arity$1("name") : jedi_data.call(null,"name"));
var homeworld = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(jedi_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["homeworld","name"], null));
var apprentice_remote_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(jedi_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["apprentice","id"], null));
var master_remote_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(jedi_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["master","id"], null));
var populated_sith = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(sith,cljs.core.cst$kw$sith_SLASH_name,name,cljs.core.array_seq([cljs.core.cst$kw$sith_SLASH_homeworld,homeworld,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,apprentice_remote_id,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id,master_remote_id], 0));
om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3(component,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$xhr,null,cljs.core.cst$kw$populated_DASH_from_DASH_remote_QMARK_,true], null));

var G__31209 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null),populated_sith], true, false);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__31209) : cb.call(null,G__31209));
} else {
return null;
}
} else {
return null;
}
});
;})(uri,map__31165,xhr,remote_id,cb,G__31154,component,sith,vec__31162,id,url,vec__31155,inst_31160,inst_31157,inst_31163,inst_31164,inst_31186,inst_31187,inst_31188,inst_31189,inst_31190,inst_31191,state_val_31206,c__20268__auto__))
})();
var inst_31193 = (function (){var G__31210 = inst_31191;
var G__31211 = [goog.net.EventType.COMPLETE];
var G__31212 = inst_31192;
return goog.events.listen(G__31210,G__31211,G__31212);
})();
var inst_31194 = [cljs.core.cst$kw$xhr];
var inst_31195 = [inst_31191];
var inst_31196 = cljs.core.PersistentHashMap.fromArrays(inst_31194,inst_31195);
var inst_31197 = om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3(inst_31163,cljs.core.merge,inst_31196);
var inst_31198 = inst_31191.send(inst_31190);
var state_31205__$1 = (function (){var statearr_31213 = state_31205;
(statearr_31213[(11)] = inst_31198);

(statearr_31213[(12)] = inst_31197);

(statearr_31213[(13)] = inst_31193);

return statearr_31213;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31205__$1,(14),c);
} else {
if((state_val_31206 === (6))){
var state_31205__$1 = state_31205;
var statearr_31214_31238 = state_31205__$1;
(statearr_31214_31238[(2)] = false);

(statearr_31214_31238[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (3))){
var inst_31160 = (state_31205[(7)]);
var inst_31166 = (state_31205[(14)]);
var inst_31163 = (state_31205[(9)]);
var inst_31163__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_31160,(0),null);
var inst_31164 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_31160,(1),null);
var inst_31166__$1 = om.next.props(inst_31163__$1);
var inst_31168 = (inst_31166__$1 == null);
var inst_31169 = cljs.core.not(inst_31168);
var state_31205__$1 = (function (){var statearr_31215 = state_31205;
(statearr_31215[(14)] = inst_31166__$1);

(statearr_31215[(9)] = inst_31163__$1);

(statearr_31215[(10)] = inst_31164);

return statearr_31215;
})();
if(inst_31169){
var statearr_31216_31239 = state_31205__$1;
(statearr_31216_31239[(1)] = (5));

} else {
var statearr_31217_31240 = state_31205__$1;
(statearr_31217_31240[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (12))){
var inst_31166 = (state_31205[(14)]);
var state_31205__$1 = state_31205;
var statearr_31218_31241 = state_31205__$1;
(statearr_31218_31241[(2)] = inst_31166);

(statearr_31218_31241[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (2))){
var inst_31157 = (state_31205[(8)]);
var inst_31157__$1 = (state_31205[(2)]);
var inst_31158 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_31157__$1,(0),null);
var inst_31159 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_31157__$1,(1),null);
var inst_31160 = inst_31157__$1;
var state_31205__$1 = (function (){var statearr_31219 = state_31205;
(statearr_31219[(15)] = inst_31159);

(statearr_31219[(7)] = inst_31160);

(statearr_31219[(8)] = inst_31157__$1);

(statearr_31219[(16)] = inst_31158);

return statearr_31219;
})();
var statearr_31220_31242 = state_31205__$1;
(statearr_31220_31242[(2)] = null);

(statearr_31220_31242[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (11))){
var inst_31166 = (state_31205[(14)]);
var inst_31183 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_31166);
var state_31205__$1 = state_31205;
var statearr_31221_31243 = state_31205__$1;
(statearr_31221_31243[(2)] = inst_31183);

(statearr_31221_31243[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (9))){
var state_31205__$1 = state_31205;
var statearr_31222_31244 = state_31205__$1;
(statearr_31222_31244[(2)] = false);

(statearr_31222_31244[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (5))){
var inst_31166 = (state_31205[(14)]);
var inst_31171 = inst_31166.cljs$lang$protocol_mask$partition0$;
var inst_31172 = (inst_31171 & (64));
var inst_31173 = inst_31166.cljs$core$ISeq$;
var inst_31174 = (inst_31172) || (inst_31173);
var state_31205__$1 = state_31205;
if(cljs.core.truth_(inst_31174)){
var statearr_31223_31245 = state_31205__$1;
(statearr_31223_31245[(1)] = (8));

} else {
var statearr_31224_31246 = state_31205__$1;
(statearr_31224_31246[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (14))){
var inst_31200 = (state_31205[(2)]);
var inst_31160 = inst_31200;
var state_31205__$1 = (function (){var statearr_31225 = state_31205;
(statearr_31225[(7)] = inst_31160);

return statearr_31225;
})();
var statearr_31226_31247 = state_31205__$1;
(statearr_31226_31247[(2)] = null);

(statearr_31226_31247[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (10))){
var inst_31178 = (state_31205[(2)]);
var state_31205__$1 = state_31205;
var statearr_31227_31248 = state_31205__$1;
(statearr_31227_31248[(2)] = inst_31178);

(statearr_31227_31248[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_31206 === (8))){
var state_31205__$1 = state_31205;
var statearr_31228_31249 = state_31205__$1;
(statearr_31228_31249[(2)] = true);

(statearr_31228_31249[(1)] = (10));


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
});})(c__20268__auto__))
;
return ((function (switch__20247__auto__,c__20268__auto__){
return (function() {
var ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__ = null;
var ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____0 = (function (){
var statearr_31232 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31232[(0)] = ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__);

(statearr_31232[(1)] = (1));

return statearr_31232;
});
var ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____1 = (function (state_31205){
while(true){
var ret_value__20249__auto__ = (function (){try{while(true){
var result__20250__auto__ = switch__20247__auto__(state_31205);
if(cljs.core.keyword_identical_QMARK_(result__20250__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__20250__auto__;
}
break;
}
}catch (e31233){if((e31233 instanceof Object)){
var ex__20251__auto__ = e31233;
var statearr_31234_31250 = state_31205;
(statearr_31234_31250[(5)] = ex__20251__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_31205);

return cljs.core.cst$kw$recur;
} else {
throw e31233;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__20249__auto__,cljs.core.cst$kw$recur)){
var G__31251 = state_31205;
state_31205 = G__31251;
continue;
} else {
return ret_value__20249__auto__;
}
break;
}
});
ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__ = function(state_31205){
switch(arguments.length){
case 0:
return ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____0.call(this);
case 1:
return ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____1.call(this,state_31205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$0 = ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____0;
ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__.cljs$core$IFn$_invoke$arity$1 = ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto____1;
return ui_of_the_sith$core$dark_jedi_service_loop_$_state_machine__20248__auto__;
})()
;})(switch__20247__auto__,c__20268__auto__))
})();
var state__20270__auto__ = (function (){var statearr_31235 = (f__20269__auto__.cljs$core$IFn$_invoke$arity$0 ? f__20269__auto__.cljs$core$IFn$_invoke$arity$0() : f__20269__auto__.call(null));
(statearr_31235[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__20268__auto__);

return statearr_31235;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__20270__auto__);
});})(c__20268__auto__))
);

return c__20268__auto__;
});
ui_of_the_sith.core.dark_jedi_service_loop(ui_of_the_sith.core.send_chan);
ui_of_the_sith.core.populate_from_remote_callback = (function ui_of_the_sith$core$populate_from_remote_callback(component){
return (function (id){
var updated_sith = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ui_of_the_sith.core.reconciler) : cljs.core.deref.call(null,ui_of_the_sith.core.reconciler)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null));
var map__31254 = updated_sith;
var map__31254__$1 = ((((!((map__31254 == null)))?((((map__31254.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31254.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31254):map__31254);
var apprentice_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31254__$1,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id);
var apprentice_remote_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31254__$1,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id);
var master_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31254__$1,cljs.core.cst$kw$sith_SLASH_master_DASH_id);
var master_remote_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31254__$1,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id);
var i = ui_of_the_sith.util.index_of(cljs.core.cst$kw$siths_SLASH_list.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(ui_of_the_sith.core.reconciler) : cljs.core.deref.call(null,ui_of_the_sith.core.reconciler))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null));
if((!((apprentice_remote_id == null))) && (!((apprentice_id == null)))){
om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sith_SLASH_set_DASH_remote_DASH_id),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$id,apprentice_id,cljs.core.cst$kw$remote_DASH_id,apprentice_remote_id], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null))))))))))));
} else {
}

if((!((master_remote_id == null))) && (!((master_id == null)))){
om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sith_SLASH_set_DASH_remote_DASH_id),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$id,master_id,cljs.core.cst$kw$remote_DASH_id,master_remote_id], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null))))))))))));
} else {
}

if(((apprentice_remote_id == null)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(i,ui_of_the_sith.config.list_size))){
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$siths_SLASH_scroll),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$index,i,cljs.core.cst$kw$move_DASH_to,cljs.core.cst$kw$end], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list)))))))))));
} else {
return null;
}
});
});
ui_of_the_sith.core.scroll_callback = (function ui_of_the_sith$core$scroll_callback(component){
return (function (direction){
var pred__31259 = cljs.core._EQ_;
var expr__31260 = direction;
if(cljs.core.truth_((pred__31259.cljs$core$IFn$_invoke$arity$2 ? pred__31259.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$up,expr__31260) : pred__31259.call(null,cljs.core.cst$kw$up,expr__31260)))){
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$siths_SLASH_scroll),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$index,((ui_of_the_sith.config.list_size - ui_of_the_sith.config.scroll_size) - (1)),cljs.core.cst$kw$move_DASH_to,cljs.core.cst$kw$end], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list)))))))))));
} else {
if(cljs.core.truth_((pred__31259.cljs$core$IFn$_invoke$arity$2 ? pred__31259.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$down,expr__31260) : pred__31259.call(null,cljs.core.cst$kw$down,expr__31260)))){
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$siths_SLASH_scroll),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$index,ui_of_the_sith.config.scroll_size,cljs.core.cst$kw$move_DASH_to,cljs.core.cst$kw$start], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list)))))))))));
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__31260)].join('')));
}
}
});
});
ui_of_the_sith.core.update_planet_callback = (function ui_of_the_sith$core$update_planet_callback(component){
return (function (planet_name){
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(component,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$obi_DASH_wan_DASH_planet_SLASH_update),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$planet_DASH_name),cljs.core._conj(cljs.core.List.EMPTY,planet_name)))))))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$obi_DASH_wan_DASH_planet),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list)))))))))));
});
});
/**
 * @constructor
 */
ui_of_the_sith.core.App = (function ui_of_the_sith$core$App(){
var this__20443__auto__ = this;
React.Component.apply(this__20443__auto__,arguments);

if(!((this__20443__auto__.initLocalState == null))){
this__20443__auto__.state = this__20443__auto__.initLocalState();
} else {
this__20443__auto__.state = {};
}

return this__20443__auto__;
});

ui_of_the_sith.core.App.prototype = goog.object.clone(React.Component.prototype);

var x31266_31283 = ui_of_the_sith.core.App.prototype;
x31266_31283.componentWillUpdate = ((function (x31266_31283){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
om.next.merge_pending_props_BANG_(this__20383__auto__);

return om.next.merge_pending_state_BANG_(this__20383__auto__);
});})(x31266_31283))
;

x31266_31283.shouldComponentUpdate = ((function (x31266_31283){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
var or__18243__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(om.next.props(this__20383__auto__),goog.object.get(next_props__20384__auto__,"omcljs$value"));
if(or__18243__auto__){
return or__18243__auto__;
} else {
var and__18231__auto__ = this__20383__auto__.state;
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__31269 = this__20383__auto__.state;
var G__31270 = "omcljs$state";
return goog.object.get(G__31269,G__31270);
})(),goog.object.get(next_state__20385__auto__,"omcljs$state"));
} else {
return and__18231__auto__;
}
}
});})(x31266_31283))
;

x31266_31283.componentWillUnmount = ((function (x31266_31283){
return (function (){
var this__20383__auto__ = this;
var r__20389__auto__ = om.next.get_reconciler(this__20383__auto__);
var cfg__20390__auto__ = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r__20389__auto__);
var st__20391__auto__ = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg__20390__auto__);
var indexer__20388__auto__ = cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(cfg__20390__auto__);
if((st__20391__auto__ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(st__20391__auto__,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_queries], null),cljs.core.dissoc,cljs.core.array_seq([this__20383__auto__], 0));
}

if((indexer__20388__auto__ == null)){
return null;
} else {
return om.next.protocols.drop_component_BANG_(indexer__20388__auto__,this__20383__auto__);
}
});})(x31266_31283))
;

x31266_31283.componentDidUpdate = ((function (x31266_31283){
return (function (prev_props__20386__auto__,prev_state__20387__auto__){
var this__20383__auto__ = this;
return om.next.clear_prev_props_BANG_(this__20383__auto__);
});})(x31266_31283))
;

x31266_31283.isMounted = ((function (x31266_31283){
return (function (){
var this__20383__auto__ = this;
return cljs.core.boolean$(goog.object.getValueByKeys(this__20383__auto__,"_reactInternalInstance","_renderedComponent"));
});})(x31266_31283))
;

x31266_31283.componentWillMount = ((function (x31266_31283){
return (function (){
var this__20383__auto__ = this;
var indexer__20388__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(om.next.get_reconciler(this__20383__auto__),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$indexer], null));
if((indexer__20388__auto__ == null)){
return null;
} else {
return om.next.protocols.index_component_BANG_(indexer__20388__auto__,this__20383__auto__);
}
});})(x31266_31283))
;

x31266_31283.render = ((function (x31266_31283){
return (function (){
var this__20382__auto__ = this;
var this$ = this__20382__auto__;
var _STAR_reconciler_STAR_31271 = om.next._STAR_reconciler_STAR_;
var _STAR_depth_STAR_31272 = om.next._STAR_depth_STAR_;
var _STAR_shared_STAR_31273 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_31274 = om.next._STAR_instrument_STAR_;
var _STAR_parent_STAR_31275 = om.next._STAR_parent_STAR_;
om.next._STAR_reconciler_STAR_ = om.next.get_reconciler(this__20382__auto__);

om.next._STAR_depth_STAR_ = (om.next.depth(this__20382__auto__) + (1));

om.next._STAR_shared_STAR_ = om.next.shared.cljs$core$IFn$_invoke$arity$1(this__20382__auto__);

om.next._STAR_instrument_STAR_ = om.next.instrument(this__20382__auto__);

om.next._STAR_parent_STAR_ = this__20382__auto__;

try{var map__31276 = om.next.props(this$);
var map__31276__$1 = ((((!((map__31276 == null)))?((((map__31276.cljs$lang$protocol_mask$partition0$ & (64))) || (map__31276.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__31276):map__31276);
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31276__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var list = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31276__$1,cljs.core.cst$kw$siths_SLASH_list);
var list_SINGLEQUOTE_ = om.next.computed(list,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback,ui_of_the_sith.core.populate_from_remote_callback(this$),cljs.core.cst$kw$scroll_DASH_callback,ui_of_the_sith.core.scroll_callback(this$)], null));
var scrollable_list_props = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$obi_DASH_wan_DASH_planet,obi_wan_planet,cljs.core.cst$kw$siths_SLASH_list,list_SINGLEQUOTE_], null);
var planet_monitor_props = om.next.computed(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$obi_DASH_wan_DASH_planet,obi_wan_planet], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$update_DASH_planet_DASH_callback,ui_of_the_sith.core.update_planet_callback(this$)], null));
var G__31278 = {"className": "css-root"};
var G__31279 = om.util.force_children((ui_of_the_sith.planet_monitor.planet_monitor.cljs$core$IFn$_invoke$arity$1 ? ui_of_the_sith.planet_monitor.planet_monitor.cljs$core$IFn$_invoke$arity$1(planet_monitor_props) : ui_of_the_sith.planet_monitor.planet_monitor.call(null,planet_monitor_props)));
var G__31280 = om.util.force_children((ui_of_the_sith.scrollable_list.scrollable_list.cljs$core$IFn$_invoke$arity$1 ? ui_of_the_sith.scrollable_list.scrollable_list.cljs$core$IFn$_invoke$arity$1(scrollable_list_props) : ui_of_the_sith.scrollable_list.scrollable_list.call(null,scrollable_list_props)));
return React.DOM.div(G__31278,G__31279,G__31280);
}finally {om.next._STAR_parent_STAR_ = _STAR_parent_STAR_31275;

om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_31274;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_31273;

om.next._STAR_depth_STAR_ = _STAR_depth_STAR_31272;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_31271;
}});})(x31266_31283))
;


ui_of_the_sith.core.App.prototype.constructor = ui_of_the_sith.core.App;

ui_of_the_sith.core.App.prototype.om$isComponent = true;

var x31281_31284 = ui_of_the_sith.core.App;
x31281_31284.om$next$IQuery$ = true;

x31281_31284.om$next$IQuery$query$arity$1 = ((function (x31281_31284){
return (function (this$){
var this$__$1 = this;
return cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$obi_DASH_wan_DASH_planet),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list),cljs.core._conj(cljs.core.List.EMPTY,om.next.get_query(ui_of_the_sith.scrollable_list.Slot)))))))))));
});})(x31281_31284))
;


var x31282_31285 = ui_of_the_sith.core.App.prototype;
x31282_31285.om$next$IQuery$ = true;

x31282_31285.om$next$IQuery$query$arity$1 = ((function (x31282_31285){
return (function (this$){
var this$__$1 = this;
return cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$obi_DASH_wan_DASH_planet),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$siths_SLASH_list),cljs.core._conj(cljs.core.List.EMPTY,om.next.get_query(ui_of_the_sith.scrollable_list.Slot)))))))))));
});})(x31282_31285))
;


ui_of_the_sith.core.App.cljs$lang$type = true;

ui_of_the_sith.core.App.cljs$lang$ctorStr = "ui-of-the-sith.core/App";

ui_of_the_sith.core.App.cljs$lang$ctorPrWriter = (function (this__20445__auto__,writer__20446__auto__,opt__20447__auto__){
return cljs.core._write(writer__20446__auto__,"ui-of-the-sith.core/App");
});
om.next.add_root_BANG_.cljs$core$IFn$_invoke$arity$3(ui_of_the_sith.core.reconciler,ui_of_the_sith.core.App,goog.dom.getElement("app"));
