// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.client');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('chord.channels');
goog.require('chord.format');
chord.client.on_close = (function chord$client$on_close(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24012 = arguments.length;
var i__17378__auto___24013 = (0);
while(true){
if((i__17378__auto___24013 < len__17377__auto___24012)){
args__17384__auto__.push((arguments[i__17378__auto___24013]));

var G__24014 = (i__17378__auto___24013 + (1));
i__17378__auto___24013 = G__24014;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((3) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((3)),(0))):null);
return chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17385__auto__);
});

chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic = (function (ws,read_ch,write_ch,p__23939){
var vec__23940 = p__23939;
var err_meta_channel = cljs.core.nth.call(null,vec__23940,(0),null);
return ws.onclose = ((function (vec__23940,err_meta_channel){
return (function (ev){
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__,vec__23940,err_meta_channel){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__,vec__23940,err_meta_channel){
return (function (state_23979){
var state_val_23980 = (state_23979[(1)]);
if((state_val_23980 === (7))){
var inst_23975 = (state_23979[(2)]);
var inst_23976 = cljs.core.async.close_BANG_.call(null,read_ch);
var inst_23977 = cljs.core.async.close_BANG_.call(null,write_ch);
var state_23979__$1 = (function (){var statearr_23981 = state_23979;
(statearr_23981[(7)] = inst_23975);

(statearr_23981[(8)] = inst_23976);

return statearr_23981;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23979__$1,inst_23977);
} else {
if((state_val_23980 === (1))){
var inst_23941 = (state_23979[(9)]);
var inst_23941__$1 = ws.error_seen;
var state_23979__$1 = (function (){var statearr_23982 = state_23979;
(statearr_23982[(9)] = inst_23941__$1);

return statearr_23982;
})();
if(cljs.core.truth_(inst_23941__$1)){
var statearr_23983_24015 = state_23979__$1;
(statearr_23983_24015[(1)] = (2));

} else {
var statearr_23984_24016 = state_23979__$1;
(statearr_23984_24016[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (4))){
var inst_23947 = (state_23979[(2)]);
var state_23979__$1 = state_23979;
if(cljs.core.truth_(inst_23947)){
var statearr_23985_24017 = state_23979__$1;
(statearr_23985_24017[(1)] = (5));

} else {
var statearr_23986_24018 = state_23979__$1;
(statearr_23986_24018[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (6))){
var state_23979__$1 = state_23979;
var statearr_23987_24019 = state_23979__$1;
(statearr_23987_24019[(2)] = null);

(statearr_23987_24019[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (3))){
var inst_23944 = ev.wasClean;
var inst_23945 = cljs.core.not.call(null,inst_23944);
var state_23979__$1 = state_23979;
var statearr_23988_24020 = state_23979__$1;
(statearr_23988_24020[(2)] = inst_23945);

(statearr_23988_24020[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (12))){
var inst_23972 = (state_23979[(2)]);
var state_23979__$1 = state_23979;
var statearr_23989_24021 = state_23979__$1;
(statearr_23989_24021[(2)] = inst_23972);

(statearr_23989_24021[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (2))){
var inst_23941 = (state_23979[(9)]);
var state_23979__$1 = state_23979;
var statearr_23990_24022 = state_23979__$1;
(statearr_23990_24022[(2)] = inst_23941);

(statearr_23990_24022[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (11))){
var inst_23967 = (state_23979[(2)]);
var state_23979__$1 = state_23979;
var statearr_23991_24023 = state_23979__$1;
(statearr_23991_24023[(2)] = inst_23967);

(statearr_23991_24023[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (9))){
var state_23979__$1 = state_23979;
var statearr_23992_24024 = state_23979__$1;
(statearr_23992_24024[(2)] = null);

(statearr_23992_24024[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (5))){
var inst_23949 = [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"code","code",1586293142),new cljs.core.Keyword(null,"wasClean","wasClean",-1404940601)];
var inst_23950 = ev.reason;
var inst_23951 = ev.code;
var inst_23952 = ev.wasClean;
var inst_23953 = [inst_23950,inst_23951,inst_23952];
var inst_23954 = cljs.core.PersistentHashMap.fromArrays(inst_23949,inst_23953);
var state_23979__$1 = (function (){var statearr_23993 = state_23979;
(statearr_23993[(10)] = inst_23954);

return statearr_23993;
})();
if(cljs.core.truth_(err_meta_channel)){
var statearr_23994_24025 = state_23979__$1;
(statearr_23994_24025[(1)] = (8));

} else {
var statearr_23995_24026 = state_23979__$1;
(statearr_23995_24026[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23980 === (10))){
var inst_23954 = (state_23979[(10)]);
var inst_23970 = (state_23979[(2)]);
var state_23979__$1 = (function (){var statearr_23996 = state_23979;
(statearr_23996[(11)] = inst_23970);

return statearr_23996;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23979__$1,(12),read_ch,inst_23954);
} else {
if((state_val_23980 === (8))){
var inst_23941 = (state_23979[(9)]);
var inst_23954 = (state_23979[(10)]);
var inst_23959 = cljs.core.async.chan.call(null,(1));
var inst_23960 = (function (){var error_seen_QMARK_ = inst_23941;
var error_desc = inst_23954;
var c__19399__auto____$1 = inst_23959;
return ((function (error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel){
return (function (state_23957){
var state_val_23958 = (state_23957[(1)]);
if((state_val_23958 === (1))){
var state_23957__$1 = state_23957;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23957__$1,error_desc);
} else {
return null;
}
});})(error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel))
;
return ((function (switch__19334__auto__,error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel){
return (function() {
var chord$client$state_machine__19335__auto__ = null;
var chord$client$state_machine__19335__auto____0 = (function (){
var statearr_24000 = [null,null,null,null,null,null,null];
(statearr_24000[(0)] = chord$client$state_machine__19335__auto__);

(statearr_24000[(1)] = (1));

return statearr_24000;
});
var chord$client$state_machine__19335__auto____1 = (function (state_23957){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_23957);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24001){if((e24001 instanceof Object)){
var ex__19338__auto__ = e24001;
var statearr_24002_24027 = state_23957;
(statearr_24002_24027[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23957);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24001;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24028 = state_23957;
state_23957 = G__24028;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
chord$client$state_machine__19335__auto__ = function(state_23957){
switch(arguments.length){
case 0:
return chord$client$state_machine__19335__auto____0.call(this);
case 1:
return chord$client$state_machine__19335__auto____1.call(this,state_23957);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__19335__auto____0;
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__19335__auto____1;
return chord$client$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel))
})();
var state__19401__auto__ = (function (){var statearr_24003 = f__19400__auto__.call(null);
(statearr_24003[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto____$1);

return statearr_24003;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});
;})(error_seen_QMARK_,error_desc,c__19399__auto____$1,inst_23941,inst_23954,inst_23959,state_val_23980,c__19399__auto__,vec__23940,err_meta_channel))
})();
var inst_23961 = cljs.core.async.impl.dispatch.run.call(null,inst_23960);
var inst_23963 = cljs.core.async.chan.call(null);
var inst_23964 = cljs.core.async.close_BANG_.call(null,inst_23963);
var inst_23965 = chord.channels.bidi_ch.call(null,inst_23959,inst_23963);
var state_23979__$1 = (function (){var statearr_24004 = state_23979;
(statearr_24004[(12)] = inst_23961);

(statearr_24004[(13)] = inst_23964);

return statearr_24004;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_23979__$1,(11),err_meta_channel,inst_23965);
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
});})(c__19399__auto__,vec__23940,err_meta_channel))
;
return ((function (switch__19334__auto__,c__19399__auto__,vec__23940,err_meta_channel){
return (function() {
var chord$client$state_machine__19335__auto__ = null;
var chord$client$state_machine__19335__auto____0 = (function (){
var statearr_24008 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24008[(0)] = chord$client$state_machine__19335__auto__);

(statearr_24008[(1)] = (1));

return statearr_24008;
});
var chord$client$state_machine__19335__auto____1 = (function (state_23979){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_23979);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24009){if((e24009 instanceof Object)){
var ex__19338__auto__ = e24009;
var statearr_24010_24029 = state_23979;
(statearr_24010_24029[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23979);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24009;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24030 = state_23979;
state_23979 = G__24030;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
chord$client$state_machine__19335__auto__ = function(state_23979){
switch(arguments.length){
case 0:
return chord$client$state_machine__19335__auto____0.call(this);
case 1:
return chord$client$state_machine__19335__auto____1.call(this,state_23979);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__19335__auto____0;
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__19335__auto____1;
return chord$client$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__,vec__23940,err_meta_channel))
})();
var state__19401__auto__ = (function (){var statearr_24011 = f__19400__auto__.call(null);
(statearr_24011[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_24011;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__,vec__23940,err_meta_channel))
);

return c__19399__auto__;
});})(vec__23940,err_meta_channel))
;
});

chord.client.on_close.cljs$lang$maxFixedArity = (3);

chord.client.on_close.cljs$lang$applyTo = (function (seq23935){
var G__23936 = cljs.core.first.call(null,seq23935);
var seq23935__$1 = cljs.core.next.call(null,seq23935);
var G__23937 = cljs.core.first.call(null,seq23935__$1);
var seq23935__$2 = cljs.core.next.call(null,seq23935__$1);
var G__23938 = cljs.core.first.call(null,seq23935__$2);
var seq23935__$3 = cljs.core.next.call(null,seq23935__$2);
return chord.client.on_close.cljs$core$IFn$_invoke$arity$variadic(G__23936,G__23937,G__23938,seq23935__$3);
});
chord.client.make_open_ch = (function chord$client$make_open_ch(ws,read_ch,write_ch,v){
var ch = cljs.core.async.chan.call(null);
chord.client.on_close.call(null,ws,read_ch,write_ch,ch);

ws.onopen = ((function (ch){
return (function (){
var c__19399__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto__,ch){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto__,ch){
return (function (state_24049){
var state_val_24050 = (state_24049[(1)]);
if((state_val_24050 === (1))){
var state_24049__$1 = state_24049;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24049__$1,(2),ch,v);
} else {
if((state_val_24050 === (2))){
var inst_24046 = (state_24049[(2)]);
var inst_24047 = cljs.core.async.close_BANG_.call(null,ch);
var state_24049__$1 = (function (){var statearr_24051 = state_24049;
(statearr_24051[(7)] = inst_24046);

return statearr_24051;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24049__$1,inst_24047);
} else {
return null;
}
}
});})(c__19399__auto__,ch))
;
return ((function (switch__19334__auto__,c__19399__auto__,ch){
return (function() {
var chord$client$make_open_ch_$_state_machine__19335__auto__ = null;
var chord$client$make_open_ch_$_state_machine__19335__auto____0 = (function (){
var statearr_24055 = [null,null,null,null,null,null,null,null];
(statearr_24055[(0)] = chord$client$make_open_ch_$_state_machine__19335__auto__);

(statearr_24055[(1)] = (1));

return statearr_24055;
});
var chord$client$make_open_ch_$_state_machine__19335__auto____1 = (function (state_24049){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24049);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24056){if((e24056 instanceof Object)){
var ex__19338__auto__ = e24056;
var statearr_24057_24059 = state_24049;
(statearr_24057_24059[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24049);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24056;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24060 = state_24049;
state_24049 = G__24060;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
chord$client$make_open_ch_$_state_machine__19335__auto__ = function(state_24049){
switch(arguments.length){
case 0:
return chord$client$make_open_ch_$_state_machine__19335__auto____0.call(this);
case 1:
return chord$client$make_open_ch_$_state_machine__19335__auto____1.call(this,state_24049);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$make_open_ch_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$make_open_ch_$_state_machine__19335__auto____0;
chord$client$make_open_ch_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$make_open_ch_$_state_machine__19335__auto____1;
return chord$client$make_open_ch_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto__,ch))
})();
var state__19401__auto__ = (function (){var statearr_24058 = f__19400__auto__.call(null);
(statearr_24058[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto__);

return statearr_24058;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto__,ch))
);

return c__19399__auto__;
});})(ch))
;

return ch;
});
chord.client.close_event__GT_maybe_error = (function chord$client$close_event__GT_maybe_error(ev){
if(cljs.core.truth_(ev.wasClean)){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reason","reason",-2070751759),ev.reason,new cljs.core.Keyword(null,"code","code",1586293142),ev.code], null);
}
});
/**
 * Creates websockets connection and returns a 2-sided channel when the websocket is opened.
 * Arguments:
 *  ws-url           - (required) link to websocket service
 *  opts             - (optional) map to configure reading/writing channels
 *    :read-ch       - (optional) (possibly buffered) channel to use for reading the websocket
 *    :write-ch      - (optional) (possibly buffered) channel to use for writing to the websocket
 *    :format        - (optional) data format to use on the channel, (at the moment)
 *                                either :edn (default), :json, :json-kw or :str.
 * 
 * Usage:
 *  (:require [cljs.core.async :as a])
 * 
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437"))
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))}))
 * 
 *  (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))
 *                                        :write-ch (a/chan (a/dropping-buffer 10))}))
 */
chord.client.ws_ch = (function chord$client$ws_ch(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24167 = arguments.length;
var i__17378__auto___24168 = (0);
while(true){
if((i__17378__auto___24168 < len__17377__auto___24167)){
args__17384__auto__.push((arguments[i__17378__auto___24168]));

var G__24169 = (i__17378__auto___24168 + (1));
i__17378__auto___24168 = G__24169;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic = (function (ws_url,p__24065){
var vec__24066 = p__24065;
var map__24067 = cljs.core.nth.call(null,vec__24066,(0),null);
var map__24067__$1 = ((((!((map__24067 == null)))?((((map__24067.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24067.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24067):map__24067);
var opts = map__24067__$1;
var read_ch = cljs.core.get.call(null,map__24067__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch = cljs.core.get.call(null,map__24067__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var format = cljs.core.get.call(null,map__24067__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var web_socket = (new WebSocket(ws_url));
var map__24069 = chord.format.wrap_format.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",-38486414),(function (){var or__16319__auto__ = read_ch;
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return cljs.core.async.chan.call(null);
}
})(),new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599),(function (){var or__16319__auto__ = write_ch;
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return cljs.core.async.chan.call(null);
}
})()], null),opts);
var map__24069__$1 = ((((!((map__24069 == null)))?((((map__24069.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24069.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24069):map__24069);
var read_ch__$1 = cljs.core.get.call(null,map__24069__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch__$1 = cljs.core.get.call(null,map__24069__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var open_ch = cljs.core.async.chan.call(null);
var close_ch = cljs.core.async.chan.call(null);
web_socket.binaryType = "arraybuffer";

chord.channels.read_from_ws_BANG_.call(null,web_socket,read_ch__$1);

chord.channels.write_to_ws_BANG_.call(null,web_socket,write_ch__$1);

web_socket.onopen = ((function (web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function (p1__24061_SHARP_){
return cljs.core.async.put_BANG_.call(null,open_ch,p1__24061_SHARP_);
});})(web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
;

web_socket.onclose = ((function (web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function (p1__24062_SHARP_){
return cljs.core.async.put_BANG_.call(null,close_ch,p1__24062_SHARP_);
});})(web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
;

var ws_chan = chord.channels.bidi_ch.call(null,read_ch__$1,write_ch__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-close","on-close",-761178394),((function (web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function (){
return web_socket.close();
});})(web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
], null));
var initial_ch = cljs.core.async.chan.call(null);
var c__19399__auto___24170 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function (state_24130){
var state_val_24131 = (state_24130[(1)]);
if((state_val_24131 === (7))){
var inst_24126 = (state_24130[(2)]);
var state_24130__$1 = state_24130;
var statearr_24132_24171 = state_24130__$1;
(statearr_24132_24171[(2)] = inst_24126);

(statearr_24132_24171[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (20))){
var state_24130__$1 = state_24130;
var statearr_24133_24172 = state_24130__$1;
(statearr_24133_24172[(2)] = null);

(statearr_24133_24172[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (1))){
var inst_24071 = false;
var state_24130__$1 = (function (){var statearr_24134 = state_24130;
(statearr_24134[(7)] = inst_24071);

return statearr_24134;
})();
var statearr_24135_24173 = state_24130__$1;
(statearr_24135_24173[(2)] = null);

(statearr_24135_24173[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (4))){
var inst_24084 = (state_24130[(8)]);
var inst_24082 = (state_24130[(9)]);
var inst_24082__$1 = (state_24130[(2)]);
var inst_24083 = cljs.core.nth.call(null,inst_24082__$1,(0),null);
var inst_24084__$1 = cljs.core.nth.call(null,inst_24082__$1,(1),null);
var inst_24085 = cljs.core._EQ_.call(null,inst_24084__$1,open_ch);
var state_24130__$1 = (function (){var statearr_24136 = state_24130;
(statearr_24136[(10)] = inst_24083);

(statearr_24136[(8)] = inst_24084__$1);

(statearr_24136[(9)] = inst_24082__$1);

return statearr_24136;
})();
if(inst_24085){
var statearr_24137_24174 = state_24130__$1;
(statearr_24137_24174[(1)] = (5));

} else {
var statearr_24138_24175 = state_24130__$1;
(statearr_24138_24175[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (15))){
var inst_24111 = (state_24130[(2)]);
var state_24130__$1 = state_24130;
var statearr_24139_24176 = state_24130__$1;
(statearr_24139_24176[(2)] = inst_24111);

(statearr_24139_24176[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (21))){
var inst_24122 = (state_24130[(2)]);
var state_24130__$1 = state_24130;
var statearr_24140_24177 = state_24130__$1;
(statearr_24140_24177[(2)] = inst_24122);

(statearr_24140_24177[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (13))){
var state_24130__$1 = state_24130;
var statearr_24141_24178 = state_24130__$1;
(statearr_24141_24178[(2)] = null);

(statearr_24141_24178[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (6))){
var inst_24084 = (state_24130[(8)]);
var inst_24097 = cljs.core._EQ_.call(null,inst_24084,close_ch);
var state_24130__$1 = state_24130;
if(inst_24097){
var statearr_24142_24179 = state_24130__$1;
(statearr_24142_24179[(1)] = (9));

} else {
var statearr_24143_24180 = state_24130__$1;
(statearr_24143_24180[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (17))){
var state_24130__$1 = state_24130;
var statearr_24144_24181 = state_24130__$1;
(statearr_24144_24181[(2)] = initial_ch);

(statearr_24144_24181[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (3))){
var inst_24128 = (state_24130[(2)]);
var state_24130__$1 = state_24130;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24130__$1,inst_24128);
} else {
if((state_val_24131 === (12))){
var inst_24071 = (state_24130[(7)]);
var state_24130__$1 = state_24130;
if(cljs.core.truth_(inst_24071)){
var statearr_24145_24182 = state_24130__$1;
(statearr_24145_24182[(1)] = (16));

} else {
var statearr_24146_24183 = state_24130__$1;
(statearr_24146_24183[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (2))){
var inst_24078 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_24079 = [open_ch,close_ch];
var inst_24080 = (new cljs.core.PersistentVector(null,2,(5),inst_24078,inst_24079,null));
var state_24130__$1 = state_24130;
return cljs.core.async.ioc_alts_BANG_.call(null,state_24130__$1,(4),inst_24080);
} else {
if((state_val_24131 === (19))){
var inst_24083 = (state_24130[(10)]);
var state_24130__$1 = state_24130;
var statearr_24147_24184 = state_24130__$1;
(statearr_24147_24184[(2)] = inst_24083);

(statearr_24147_24184[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (11))){
var inst_24124 = (state_24130[(2)]);
var state_24130__$1 = state_24130;
var statearr_24148_24185 = state_24130__$1;
(statearr_24148_24185[(2)] = inst_24124);

(statearr_24148_24185[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (9))){
var inst_24101 = (state_24130[(11)]);
var inst_24082 = (state_24130[(9)]);
var inst_24100 = cljs.core.nth.call(null,inst_24082,(0),null);
var inst_24101__$1 = chord.client.close_event__GT_maybe_error.call(null,inst_24100);
var state_24130__$1 = (function (){var statearr_24149 = state_24130;
(statearr_24149[(11)] = inst_24101__$1);

return statearr_24149;
})();
if(cljs.core.truth_(inst_24101__$1)){
var statearr_24150_24186 = state_24130__$1;
(statearr_24150_24186[(1)] = (12));

} else {
var statearr_24151_24187 = state_24130__$1;
(statearr_24151_24187[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (5))){
var inst_24082 = (state_24130[(9)]);
var inst_24088 = cljs.core.nth.call(null,inst_24082,(0),null);
var inst_24089 = [new cljs.core.Keyword(null,"ws-channel","ws-channel",1643892174)];
var inst_24090 = [ws_chan];
var inst_24091 = cljs.core.PersistentHashMap.fromArrays(inst_24089,inst_24090);
var state_24130__$1 = (function (){var statearr_24152 = state_24130;
(statearr_24152[(12)] = inst_24088);

return statearr_24152;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24130__$1,(8),initial_ch,inst_24091);
} else {
if((state_val_24131 === (14))){
var inst_24114 = (state_24130[(2)]);
var inst_24115 = cljs.core.async.close_BANG_.call(null,ws_chan);
var inst_24116 = cljs.core.async.close_BANG_.call(null,initial_ch);
var state_24130__$1 = (function (){var statearr_24153 = state_24130;
(statearr_24153[(13)] = inst_24114);

(statearr_24153[(14)] = inst_24115);

return statearr_24153;
})();
var statearr_24154_24188 = state_24130__$1;
(statearr_24154_24188[(2)] = inst_24116);

(statearr_24154_24188[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (16))){
var state_24130__$1 = state_24130;
var statearr_24155_24189 = state_24130__$1;
(statearr_24155_24189[(2)] = read_ch__$1);

(statearr_24155_24189[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (10))){
var inst_24084 = (state_24130[(8)]);
var inst_24118 = cljs.core._EQ_.call(null,inst_24084,new cljs.core.Keyword(null,"default","default",-1987822328));
var state_24130__$1 = state_24130;
if(inst_24118){
var statearr_24156_24190 = state_24130__$1;
(statearr_24156_24190[(1)] = (19));

} else {
var statearr_24157_24191 = state_24130__$1;
(statearr_24157_24191[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24131 === (18))){
var inst_24101 = (state_24130[(11)]);
var inst_24106 = (state_24130[(2)]);
var inst_24107 = [new cljs.core.Keyword(null,"error","error",-978969032)];
var inst_24108 = [inst_24101];
var inst_24109 = cljs.core.PersistentHashMap.fromArrays(inst_24107,inst_24108);
var state_24130__$1 = state_24130;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_24130__$1,(15),inst_24106,inst_24109);
} else {
if((state_val_24131 === (8))){
var inst_24093 = (state_24130[(2)]);
var inst_24094 = cljs.core.async.close_BANG_.call(null,initial_ch);
var inst_24071 = true;
var state_24130__$1 = (function (){var statearr_24158 = state_24130;
(statearr_24158[(15)] = inst_24093);

(statearr_24158[(7)] = inst_24071);

(statearr_24158[(16)] = inst_24094);

return statearr_24158;
})();
var statearr_24159_24192 = state_24130__$1;
(statearr_24159_24192[(2)] = null);

(statearr_24159_24192[(1)] = (2));


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
});})(c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
;
return ((function (switch__19334__auto__,c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format){
return (function() {
var chord$client$state_machine__19335__auto__ = null;
var chord$client$state_machine__19335__auto____0 = (function (){
var statearr_24163 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24163[(0)] = chord$client$state_machine__19335__auto__);

(statearr_24163[(1)] = (1));

return statearr_24163;
});
var chord$client$state_machine__19335__auto____1 = (function (state_24130){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_24130);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e24164){if((e24164 instanceof Object)){
var ex__19338__auto__ = e24164;
var statearr_24165_24193 = state_24130;
(statearr_24165_24193[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24130);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24164;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24194 = state_24130;
state_24130 = G__24194;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
chord$client$state_machine__19335__auto__ = function(state_24130){
switch(arguments.length){
case 0:
return chord$client$state_machine__19335__auto____0.call(this);
case 1:
return chord$client$state_machine__19335__auto____1.call(this,state_24130);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = chord$client$state_machine__19335__auto____0;
chord$client$state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = chord$client$state_machine__19335__auto____1;
return chord$client$state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
})();
var state__19401__auto__ = (function (){var statearr_24166 = f__19400__auto__.call(null);
(statearr_24166[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___24170);

return statearr_24166;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___24170,ws_chan,initial_ch,web_socket,map__24069,map__24069__$1,read_ch__$1,write_ch__$1,open_ch,close_ch,vec__24066,map__24067,map__24067__$1,opts,read_ch,write_ch,format))
);


return initial_ch;
});

chord.client.ws_ch.cljs$lang$maxFixedArity = (1);

chord.client.ws_ch.cljs$lang$applyTo = (function (seq24063){
var G__24064 = cljs.core.first.call(null,seq24063);
var seq24063__$1 = cljs.core.next.call(null,seq24063);
return chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic(G__24064,seq24063__$1);
});

//# sourceMappingURL=client.js.map?rel=1446554829940