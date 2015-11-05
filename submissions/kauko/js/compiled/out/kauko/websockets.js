// Compiled by ClojureScript 1.7.122 {}
goog.provide('kauko.websockets');
goog.require('cljs.core');
goog.require('chord.client');
goog.require('cljs.core.async');
kauko.websockets.receive_msgs_BANG_ = (function kauko$websockets$receive_msgs_BANG_(server_ch,atom){
var c__19340__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19340__auto__){
return (function (){
var f__19341__auto__ = (function (){var switch__19319__auto__ = ((function (c__19340__auto__){
return (function (state_19484){
var state_val_19485 = (state_19484[(1)]);
if((state_val_19485 === (7))){
var inst_19467 = (state_19484[(2)]);
var state_19484__$1 = state_19484;
if(cljs.core.truth_(inst_19467)){
var statearr_19486_19513 = state_19484__$1;
(statearr_19486_19513[(1)] = (11));

} else {
var statearr_19487_19514 = state_19484__$1;
(statearr_19487_19514[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (1))){
var state_19484__$1 = state_19484;
var statearr_19488_19515 = state_19484__$1;
(statearr_19488_19515[(2)] = null);

(statearr_19488_19515[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (4))){
var inst_19452 = (state_19484[(7)]);
var inst_19452__$1 = (state_19484[(2)]);
var inst_19454 = (inst_19452__$1 == null);
var inst_19455 = cljs.core.not.call(null,inst_19454);
var state_19484__$1 = (function (){var statearr_19489 = state_19484;
(statearr_19489[(7)] = inst_19452__$1);

return statearr_19489;
})();
if(inst_19455){
var statearr_19490_19516 = state_19484__$1;
(statearr_19490_19516[(1)] = (5));

} else {
var statearr_19491_19517 = state_19484__$1;
(statearr_19491_19517[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (15))){
var state_19484__$1 = state_19484;
var statearr_19492_19518 = state_19484__$1;
(statearr_19492_19518[(2)] = null);

(statearr_19492_19518[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (13))){
var inst_19472 = (state_19484[(2)]);
var inst_19473 = cljs.core.get.call(null,inst_19472,new cljs.core.Keyword(null,"message","message",-406056002));
var inst_19474 = cljs.core.js__GT_clj.call(null,inst_19473);
var inst_19475 = cljs.core.reset_BANG_.call(null,atom,inst_19474);
var state_19484__$1 = (function (){var statearr_19493 = state_19484;
(statearr_19493[(8)] = inst_19475);

return statearr_19493;
})();
if(cljs.core.truth_(inst_19473)){
var statearr_19494_19519 = state_19484__$1;
(statearr_19494_19519[(1)] = (14));

} else {
var statearr_19495_19520 = state_19484__$1;
(statearr_19495_19520[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (6))){
var state_19484__$1 = state_19484;
var statearr_19496_19521 = state_19484__$1;
(statearr_19496_19521[(2)] = false);

(statearr_19496_19521[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (3))){
var inst_19482 = (state_19484[(2)]);
var state_19484__$1 = state_19484;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19484__$1,inst_19482);
} else {
if((state_val_19485 === (12))){
var inst_19452 = (state_19484[(7)]);
var state_19484__$1 = state_19484;
var statearr_19497_19522 = state_19484__$1;
(statearr_19497_19522[(2)] = inst_19452);

(statearr_19497_19522[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (2))){
var state_19484__$1 = state_19484;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19484__$1,(4),server_ch);
} else {
if((state_val_19485 === (11))){
var inst_19452 = (state_19484[(7)]);
var inst_19469 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19452);
var state_19484__$1 = state_19484;
var statearr_19498_19523 = state_19484__$1;
(statearr_19498_19523[(2)] = inst_19469);

(statearr_19498_19523[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (9))){
var state_19484__$1 = state_19484;
var statearr_19499_19524 = state_19484__$1;
(statearr_19499_19524[(2)] = false);

(statearr_19499_19524[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (5))){
var inst_19452 = (state_19484[(7)]);
var inst_19457 = inst_19452.cljs$lang$protocol_mask$partition0$;
var inst_19458 = (inst_19457 & (64));
var inst_19459 = inst_19452.cljs$core$ISeq$;
var inst_19460 = (inst_19458) || (inst_19459);
var state_19484__$1 = state_19484;
if(cljs.core.truth_(inst_19460)){
var statearr_19500_19525 = state_19484__$1;
(statearr_19500_19525[(1)] = (8));

} else {
var statearr_19501_19526 = state_19484__$1;
(statearr_19501_19526[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (14))){
var state_19484__$1 = state_19484;
var statearr_19502_19527 = state_19484__$1;
(statearr_19502_19527[(2)] = null);

(statearr_19502_19527[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (16))){
var inst_19480 = (state_19484[(2)]);
var state_19484__$1 = state_19484;
var statearr_19503_19528 = state_19484__$1;
(statearr_19503_19528[(2)] = inst_19480);

(statearr_19503_19528[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (10))){
var inst_19464 = (state_19484[(2)]);
var state_19484__$1 = state_19484;
var statearr_19504_19529 = state_19484__$1;
(statearr_19504_19529[(2)] = inst_19464);

(statearr_19504_19529[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19485 === (8))){
var state_19484__$1 = state_19484;
var statearr_19505_19530 = state_19484__$1;
(statearr_19505_19530[(2)] = true);

(statearr_19505_19530[(1)] = (10));


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
});})(c__19340__auto__))
;
return ((function (switch__19319__auto__,c__19340__auto__){
return (function() {
var kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__ = null;
var kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____0 = (function (){
var statearr_19509 = [null,null,null,null,null,null,null,null,null];
(statearr_19509[(0)] = kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__);

(statearr_19509[(1)] = (1));

return statearr_19509;
});
var kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____1 = (function (state_19484){
while(true){
var ret_value__19321__auto__ = (function (){try{while(true){
var result__19322__auto__ = switch__19319__auto__.call(null,state_19484);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19322__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19322__auto__;
}
break;
}
}catch (e19510){if((e19510 instanceof Object)){
var ex__19323__auto__ = e19510;
var statearr_19511_19531 = state_19484;
(statearr_19511_19531[(5)] = ex__19323__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19484);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19510;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19321__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19532 = state_19484;
state_19484 = G__19532;
continue;
} else {
return ret_value__19321__auto__;
}
break;
}
});
kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__ = function(state_19484){
switch(arguments.length){
case 0:
return kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____0.call(this);
case 1:
return kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____1.call(this,state_19484);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$0 = kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____0;
kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$1 = kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto____1;
return kauko$websockets$receive_msgs_BANG__$_state_machine__19320__auto__;
})()
;})(switch__19319__auto__,c__19340__auto__))
})();
var state__19342__auto__ = (function (){var statearr_19512 = f__19341__auto__.call(null);
(statearr_19512[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19340__auto__);

return statearr_19512;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19342__auto__);
});})(c__19340__auto__))
);

return c__19340__auto__;
});
kauko.websockets.start_websocket_BANG_ = (function kauko$websockets$start_websocket_BANG_(atom){
var c__19340__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19340__auto__){
return (function (){
var f__19341__auto__ = (function (){var switch__19319__auto__ = ((function (c__19340__auto__){
return (function (state_19621){
var state_val_19622 = (state_19621[(1)]);
if((state_val_19622 === (7))){
var state_19621__$1 = state_19621;
var statearr_19623_19645 = state_19621__$1;
(statearr_19623_19645[(2)] = false);

(statearr_19623_19645[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (1))){
var inst_19590 = [new cljs.core.Keyword(null,"format","format",-1306924766)];
var inst_19591 = [new cljs.core.Keyword(null,"json","json",1279968570)];
var inst_19592 = cljs.core.PersistentHashMap.fromArrays(inst_19590,inst_19591);
var inst_19593 = chord.client.ws_ch.call(null,"ws://localhost:4000",inst_19592);
var state_19621__$1 = state_19621;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19621__$1,(2),inst_19593);
} else {
if((state_val_19622 === (4))){
var state_19621__$1 = state_19621;
var statearr_19624_19646 = state_19621__$1;
(statearr_19624_19646[(2)] = false);

(statearr_19624_19646[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (6))){
var state_19621__$1 = state_19621;
var statearr_19625_19647 = state_19621__$1;
(statearr_19625_19647[(2)] = true);

(statearr_19625_19647[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (3))){
var inst_19595 = (state_19621[(7)]);
var inst_19600 = inst_19595.cljs$lang$protocol_mask$partition0$;
var inst_19601 = (inst_19600 & (64));
var inst_19602 = inst_19595.cljs$core$ISeq$;
var inst_19603 = (inst_19601) || (inst_19602);
var state_19621__$1 = state_19621;
if(cljs.core.truth_(inst_19603)){
var statearr_19626_19648 = state_19621__$1;
(statearr_19626_19648[(1)] = (6));

} else {
var statearr_19627_19649 = state_19621__$1;
(statearr_19627_19649[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (12))){
var inst_19616 = (state_19621[(8)]);
var inst_19618 = (state_19621[(2)]);
var inst_19619 = kauko.websockets.receive_msgs_BANG_.call(null,inst_19616,atom);
var state_19621__$1 = (function (){var statearr_19628 = state_19621;
(statearr_19628[(9)] = inst_19618);

return statearr_19628;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19621__$1,inst_19619);
} else {
if((state_val_19622 === (2))){
var inst_19595 = (state_19621[(7)]);
var inst_19595__$1 = (state_19621[(2)]);
var inst_19597 = (inst_19595__$1 == null);
var inst_19598 = cljs.core.not.call(null,inst_19597);
var state_19621__$1 = (function (){var statearr_19629 = state_19621;
(statearr_19629[(7)] = inst_19595__$1);

return statearr_19629;
})();
if(inst_19598){
var statearr_19630_19650 = state_19621__$1;
(statearr_19630_19650[(1)] = (3));

} else {
var statearr_19631_19651 = state_19621__$1;
(statearr_19631_19651[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (11))){
var inst_19616 = (state_19621[(8)]);
var inst_19615 = (state_19621[(2)]);
var inst_19616__$1 = cljs.core.get.call(null,inst_19615,new cljs.core.Keyword(null,"ws-channel","ws-channel",1643892174));
var state_19621__$1 = (function (){var statearr_19632 = state_19621;
(statearr_19632[(8)] = inst_19616__$1);

return statearr_19632;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19621__$1,(12),inst_19616__$1,"Ready to start receiving Obi-Wan's location!");
} else {
if((state_val_19622 === (9))){
var inst_19595 = (state_19621[(7)]);
var inst_19612 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19595);
var state_19621__$1 = state_19621;
var statearr_19633_19652 = state_19621__$1;
(statearr_19633_19652[(2)] = inst_19612);

(statearr_19633_19652[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (5))){
var inst_19610 = (state_19621[(2)]);
var state_19621__$1 = state_19621;
if(cljs.core.truth_(inst_19610)){
var statearr_19634_19653 = state_19621__$1;
(statearr_19634_19653[(1)] = (9));

} else {
var statearr_19635_19654 = state_19621__$1;
(statearr_19635_19654[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (10))){
var inst_19595 = (state_19621[(7)]);
var state_19621__$1 = state_19621;
var statearr_19636_19655 = state_19621__$1;
(statearr_19636_19655[(2)] = inst_19595);

(statearr_19636_19655[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19622 === (8))){
var inst_19607 = (state_19621[(2)]);
var state_19621__$1 = state_19621;
var statearr_19637_19656 = state_19621__$1;
(statearr_19637_19656[(2)] = inst_19607);

(statearr_19637_19656[(1)] = (5));


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
});})(c__19340__auto__))
;
return ((function (switch__19319__auto__,c__19340__auto__){
return (function() {
var kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__ = null;
var kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____0 = (function (){
var statearr_19641 = [null,null,null,null,null,null,null,null,null,null];
(statearr_19641[(0)] = kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__);

(statearr_19641[(1)] = (1));

return statearr_19641;
});
var kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____1 = (function (state_19621){
while(true){
var ret_value__19321__auto__ = (function (){try{while(true){
var result__19322__auto__ = switch__19319__auto__.call(null,state_19621);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19322__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19322__auto__;
}
break;
}
}catch (e19642){if((e19642 instanceof Object)){
var ex__19323__auto__ = e19642;
var statearr_19643_19657 = state_19621;
(statearr_19643_19657[(5)] = ex__19323__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19621);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19642;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19321__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19658 = state_19621;
state_19621 = G__19658;
continue;
} else {
return ret_value__19321__auto__;
}
break;
}
});
kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__ = function(state_19621){
switch(arguments.length){
case 0:
return kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____0.call(this);
case 1:
return kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____1.call(this,state_19621);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$0 = kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____0;
kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$1 = kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto____1;
return kauko$websockets$start_websocket_BANG__$_state_machine__19320__auto__;
})()
;})(switch__19319__auto__,c__19340__auto__))
})();
var state__19342__auto__ = (function (){var statearr_19644 = f__19341__auto__.call(null);
(statearr_19644[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19340__auto__);

return statearr_19644;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19342__auto__);
});})(c__19340__auto__))
);

return c__19340__auto__;
});

//# sourceMappingURL=websockets.js.map?rel=1446734325953