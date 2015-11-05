// Compiled by ClojureScript 1.7.122 {}
goog.provide('kauko.requests');
goog.require('cljs.core');
goog.require('cljs_http.client');
goog.require('cljs_http.core');
goog.require('cljs.core.async');
kauko.requests.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
kauko.requests.out_channel = cljs.core.async.chan.call(null,(10));
kauko.requests.GET_BANG_ = (function kauko$requests$GET_BANG_(id){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,kauko.requests.pending_requests),id))){
return null;
} else {
cljs.core.print.call(null,"Searching for sith with id: ",id);

var request = cljs_http.client.get.call(null,[cljs.core.str("http://localhost:3000/dark-jedis/"),cljs.core.str(id)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222),false], null));
cljs.core.swap_BANG_.call(null,kauko.requests.pending_requests,cljs.core.assoc,id,request);

return request;
}
});
kauko.requests.abort_request_BANG_ = (function kauko$requests$abort_request_BANG_(id){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,kauko.requests.pending_requests),id))){
cljs.core.print.call(null,"Aborting request for ",id);

cljs_http.core.abort_BANG_.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,kauko.requests.pending_requests),id));

return cljs.core.swap_BANG_.call(null,kauko.requests.pending_requests,cljs.core.dissoc,id);
} else {
return null;
}
});
kauko.requests.abort_requests_BANG_ = (function kauko$requests$abort_requests_BANG_(){
cljs.core.print.call(null,"Abort ALL requests!");

cljs.core.map.call(null,(function (p__19663){
var vec__19664 = p__19663;
var _ = cljs.core.nth.call(null,vec__19664,(0),null);
var req = cljs.core.nth.call(null,vec__19664,(1),null);
return cljs_http.core.abort_BANG_.call(null,req);
}),cljs.core.deref.call(null,kauko.requests.pending_requests));

return cljs.core.reset_BANG_.call(null,kauko.requests.pending_requests,cljs.core.PersistentArrayMap.EMPTY);
});
kauko.requests.get_sith_BANG_ = (function kauko$requests$get_sith_BANG_(id){
var request = kauko.requests.GET_BANG_.call(null,id);
if(cljs.core.truth_(request)){
var c__19340__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19340__auto__,request){
return (function (){
var f__19341__auto__ = (function (){var switch__19319__auto__ = ((function (c__19340__auto__,request){
return (function (state_19695){
var state_val_19696 = (state_19695[(1)]);
if((state_val_19696 === (1))){
var state_19695__$1 = state_19695;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19695__$1,(3),request);
} else {
if((state_val_19696 === (2))){
var inst_19693 = (state_19695[(2)]);
var state_19695__$1 = state_19695;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19695__$1,inst_19693);
} else {
if((state_val_19696 === (3))){
var inst_19686 = (state_19695[(2)]);
var inst_19687 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_19688 = [new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"id","id",-1388402092)];
var inst_19689 = (new cljs.core.PersistentVector(null,2,(5),inst_19687,inst_19688,null));
var inst_19690 = cljs.core.get_in.call(null,inst_19686,inst_19689);
var inst_19691 = cljs.core.swap_BANG_.call(null,kauko.requests.pending_requests,cljs.core.dissoc,inst_19690);
var state_19695__$1 = (function (){var statearr_19697 = state_19695;
(statearr_19697[(7)] = inst_19691);

return statearr_19697;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19695__$1,(2),kauko.requests.out_channel,inst_19686);
} else {
return null;
}
}
}
});})(c__19340__auto__,request))
;
return ((function (switch__19319__auto__,c__19340__auto__,request){
return (function() {
var kauko$requests$get_sith_BANG__$_state_machine__19320__auto__ = null;
var kauko$requests$get_sith_BANG__$_state_machine__19320__auto____0 = (function (){
var statearr_19701 = [null,null,null,null,null,null,null,null];
(statearr_19701[(0)] = kauko$requests$get_sith_BANG__$_state_machine__19320__auto__);

(statearr_19701[(1)] = (1));

return statearr_19701;
});
var kauko$requests$get_sith_BANG__$_state_machine__19320__auto____1 = (function (state_19695){
while(true){
var ret_value__19321__auto__ = (function (){try{while(true){
var result__19322__auto__ = switch__19319__auto__.call(null,state_19695);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19322__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19322__auto__;
}
break;
}
}catch (e19702){if((e19702 instanceof Object)){
var ex__19323__auto__ = e19702;
var statearr_19703_19705 = state_19695;
(statearr_19703_19705[(5)] = ex__19323__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19695);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19702;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19321__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19706 = state_19695;
state_19695 = G__19706;
continue;
} else {
return ret_value__19321__auto__;
}
break;
}
});
kauko$requests$get_sith_BANG__$_state_machine__19320__auto__ = function(state_19695){
switch(arguments.length){
case 0:
return kauko$requests$get_sith_BANG__$_state_machine__19320__auto____0.call(this);
case 1:
return kauko$requests$get_sith_BANG__$_state_machine__19320__auto____1.call(this,state_19695);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
kauko$requests$get_sith_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$0 = kauko$requests$get_sith_BANG__$_state_machine__19320__auto____0;
kauko$requests$get_sith_BANG__$_state_machine__19320__auto__.cljs$core$IFn$_invoke$arity$1 = kauko$requests$get_sith_BANG__$_state_machine__19320__auto____1;
return kauko$requests$get_sith_BANG__$_state_machine__19320__auto__;
})()
;})(switch__19319__auto__,c__19340__auto__,request))
})();
var state__19342__auto__ = (function (){var statearr_19704 = f__19341__auto__.call(null);
(statearr_19704[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19340__auto__);

return statearr_19704;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19342__auto__);
});})(c__19340__auto__,request))
);

return c__19340__auto__;
} else {
return null;
}
});
cljs.core.add_watch.call(null,kauko.requests.pending_requests,new cljs.core.Keyword(null,"foo","foo",1268894036),(function (_,___$1,old,new$){
return cljs.core.print.call(null,cljs.core.keys.call(null,old)," => ",cljs.core.keys.call(null,new$));
}));

//# sourceMappingURL=requests.js.map?rel=1446734326100