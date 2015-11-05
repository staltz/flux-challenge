// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.channels');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async.impl.protocols');
chord.channels.read_from_ws_BANG_ = (function chord$channels$read_from_ws_BANG_(ws,ch){
return ws.onmessage = (function (ev){
var message = ev.data;
return cljs.core.async.put_BANG_.call(null,ch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),message], null));
});
});
chord.channels.write_to_ws_BANG_ = (function chord$channels$write_to_ws_BANG_(ws,ch){
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__){
return (function (state_24284){
var state_val_24285 = (state_24284[(1)]);
if((state_val_24285 === (1))){
var state_24284__$1 = state_24284;
var statearr_24286_24301 = state_24284__$1;
(statearr_24286_24301[(2)] = null);

(statearr_24286_24301[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24285 === (2))){
var state_24284__$1 = state_24284;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24284__$1,(4),ch);
} else {
if((state_val_24285 === (3))){
var inst_24282 = (state_24284[(2)]);
var state_24284__$1 = state_24284;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24284__$1,inst_24282);
} else {
if((state_val_24285 === (4))){
var inst_24274 = (state_24284[(7)]);
var inst_24274__$1 = (state_24284[(2)]);
var state_24284__$1 = (function (){var statearr_24287 = state_24284;
(statearr_24287[(7)] = inst_24274__$1);

return statearr_24287;
})();
if(cljs.core.truth_(inst_24274__$1)){
var statearr_24288_24302 = state_24284__$1;
(statearr_24288_24302[(1)] = (5));

} else {
var statearr_24289_24303 = state_24284__$1;
(statearr_24289_24303[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24285 === (5))){
var inst_24274 = (state_24284[(7)]);
var inst_24276 = ws.send(inst_24274);
var state_24284__$1 = (function (){var statearr_24290 = state_24284;
(statearr_24290[(8)] = inst_24276);

return statearr_24290;
})();
var statearr_24291_24304 = state_24284__$1;
(statearr_24291_24304[(2)] = null);

(statearr_24291_24304[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24285 === (6))){
var state_24284__$1 = state_24284;
var statearr_24292_24305 = state_24284__$1;
(statearr_24292_24305[(2)] = null);

(statearr_24292_24305[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24285 === (7))){
var inst_24280 = (state_24284[(2)]);
var state_24284__$1 = state_24284;
var statearr_24293_24306 = state_24284__$1;
(statearr_24293_24306[(2)] = inst_24280);

(statearr_24293_24306[(1)] = (3));


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
var chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__ = null;
var chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____0 = (function (){
var statearr_24297 = [null,null,null,null,null,null,null,null,null];
(statearr_24297[(0)] = chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__);

(statearr_24297[(1)] = (1));

return statearr_24297;
});
var chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____1 = (function (state_24284){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24284);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24298){if((e24298 instanceof Object)){
var ex__19338__auto__ = e24298;
var statearr_24299_24307 = state_24284;
(statearr_24299_24307[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24284);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24298;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24308 = state_24284;
state_24284 = G__24308;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__ = function(state_24284){
switch(arguments.length){
case 0:
return chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____0.call(this);
case 1:
return chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____1.call(this,state_24284);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____0;
chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = chord$channels$write_to_ws_BANG__$_state_machine__19335__auto____1;
return chord$channels$write_to_ws_BANG__$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__))
})();
var state__19401__auto__ = (function (){var statearr_24300 = f__19400__auto__.call(null);
(statearr_24300[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_24300;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__))
);

return c__19399__auto__;
});
chord.channels.bidi_ch = (function chord$channels$bidi_ch(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24319 = arguments.length;
var i__17378__auto___24320 = (0);
while(true){
if((i__17378__auto___24320 < len__17377__auto___24319)){
args__17384__auto__.push((arguments[i__17378__auto___24320]));

var G__24321 = (i__17378__auto___24320 + (1));
i__17378__auto___24320 = G__24321;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((2) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((2)),(0))):null);
return chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17385__auto__);
});

chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic = (function (read_ch,write_ch,p__24312){
var vec__24313 = p__24312;
var map__24314 = cljs.core.nth.call(null,vec__24313,(0),null);
var map__24314__$1 = ((((!((map__24314 == null)))?((((map__24314.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24314.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24314):map__24314);
var on_close = cljs.core.get.call(null,map__24314__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
if(typeof chord.channels.t_chord$channels24316 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
chord.channels.t_chord$channels24316 = (function (read_ch,write_ch,p__24312,vec__24313,map__24314,on_close,meta24317){
this.read_ch = read_ch;
this.write_ch = write_ch;
this.p__24312 = p__24312;
this.vec__24313 = vec__24313;
this.map__24314 = map__24314;
this.on_close = on_close;
this.meta24317 = meta24317;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.channels.t_chord$channels24316.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (_24318,meta24317__$1){
var self__ = this;
var _24318__$1 = this;
return (new chord.channels.t_chord$channels24316(self__.read_ch,self__.write_ch,self__.p__24312,self__.vec__24313,self__.map__24314,self__.on_close,meta24317__$1));
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (_24318){
var self__ = this;
var _24318__$1 = this;
return self__.meta24317;
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (_,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.read_ch,handler);
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (_,msg,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.write_ch,msg,handler);
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$Channel$ = true;

chord.channels.t_chord$channels24316.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.close_BANG_.call(null,self__.read_ch);

cljs.core.async.impl.protocols.close_BANG_.call(null,self__.write_ch);

if(cljs.core.truth_(self__.on_close)){
return self__.on_close.call(null);
} else {
return null;
}
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.getBasis = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"read-ch","read-ch",1602045113,null),new cljs.core.Symbol(null,"write-ch","write-ch",-126054072,null),new cljs.core.Symbol(null,"p__24312","p__24312",-1417402067,null),new cljs.core.Symbol(null,"vec__24313","vec__24313",2083263694,null),new cljs.core.Symbol(null,"map__24314","map__24314",978910744,null),new cljs.core.Symbol(null,"on-close","on-close",879353133,null),new cljs.core.Symbol(null,"meta24317","meta24317",1287658036,null)], null);
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.t_chord$channels24316.cljs$lang$type = true;

chord.channels.t_chord$channels24316.cljs$lang$ctorStr = "chord.channels/t_chord$channels24316";

chord.channels.t_chord$channels24316.cljs$lang$ctorPrWriter = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.channels/t_chord$channels24316");
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

chord.channels.__GT_t_chord$channels24316 = ((function (vec__24313,map__24314,map__24314__$1,on_close){
return (function chord$channels$__GT_t_chord$channels24316(read_ch__$1,write_ch__$1,p__24312__$1,vec__24313__$1,map__24314__$2,on_close__$1,meta24317){
return (new chord.channels.t_chord$channels24316(read_ch__$1,write_ch__$1,p__24312__$1,vec__24313__$1,map__24314__$2,on_close__$1,meta24317));
});})(vec__24313,map__24314,map__24314__$1,on_close))
;

}

return (new chord.channels.t_chord$channels24316(read_ch,write_ch,p__24312,vec__24313,map__24314__$1,on_close,cljs.core.PersistentArrayMap.EMPTY));
});

chord.channels.bidi_ch.cljs$lang$maxFixedArity = (2);

chord.channels.bidi_ch.cljs$lang$applyTo = (function (seq24309){
var G__24310 = cljs.core.first.call(null,seq24309);
var seq24309__$1 = cljs.core.next.call(null,seq24309);
var G__24311 = cljs.core.first.call(null,seq24309__$1);
var seq24309__$2 = cljs.core.next.call(null,seq24309__$1);
return chord.channels.bidi_ch.cljs$core$IFn$_invoke$arity$variadic(G__24310,G__24311,seq24309__$2);
});

//# sourceMappingURL=channels.js.map?rel=1446554830111