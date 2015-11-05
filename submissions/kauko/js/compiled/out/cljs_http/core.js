// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs_http.core');
goog.require('cljs.core');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('cljs.core.async');
goog.require('cljs_http.util');
goog.require('goog.net.Jsonp');
goog.require('clojure.string');
goog.require('goog.net.XhrIo');
cljs_http.core.pending_requests = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Attempt to close the given channel and abort the pending HTTP request
 *   with which it is associated.
 */
cljs_http.core.abort_BANG_ = (function cljs_http$core$abort_BANG_(channel){
var temp__4425__auto__ = cljs.core.deref.call(null,cljs_http.core.pending_requests).call(null,channel);
if(cljs.core.truth_(temp__4425__auto__)){
var req = temp__4425__auto__;
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

cljs.core.async.close_BANG_.call(null,channel);

if(cljs.core.truth_(req.hasOwnProperty("abort"))){
return req.abort();
} else {
return new cljs.core.Keyword(null,"jsonp","jsonp",226119588).cljs$core$IFn$_invoke$arity$1(req).cancel(new cljs.core.Keyword(null,"request","request",1772954723).cljs$core$IFn$_invoke$arity$1(req));
}
} else {
return null;
}
});
cljs_http.core.aborted_QMARK_ = (function cljs_http$core$aborted_QMARK_(xhr){
return cljs.core._EQ_.call(null,xhr.getLastErrorCode(),goog.net.ErrorCode.ABORT);
});
/**
 * Takes an XhrIo object and applies the default-headers to it.
 */
cljs_http.core.apply_default_headers_BANG_ = (function cljs_http$core$apply_default_headers_BANG_(xhr,headers){
var seq__23433 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs_http.util.camelize,cljs.core.keys.call(null,headers)));
var chunk__23438 = null;
var count__23439 = (0);
var i__23440 = (0);
while(true){
if((i__23440 < count__23439)){
var h_name = cljs.core._nth.call(null,chunk__23438,i__23440);
var seq__23441_23445 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__23442_23446 = null;
var count__23443_23447 = (0);
var i__23444_23448 = (0);
while(true){
if((i__23444_23448 < count__23443_23447)){
var h_val_23449 = cljs.core._nth.call(null,chunk__23442_23446,i__23444_23448);
xhr.headers.set(h_name,h_val_23449);

var G__23450 = seq__23441_23445;
var G__23451 = chunk__23442_23446;
var G__23452 = count__23443_23447;
var G__23453 = (i__23444_23448 + (1));
seq__23441_23445 = G__23450;
chunk__23442_23446 = G__23451;
count__23443_23447 = G__23452;
i__23444_23448 = G__23453;
continue;
} else {
var temp__4425__auto___23454 = cljs.core.seq.call(null,seq__23441_23445);
if(temp__4425__auto___23454){
var seq__23441_23455__$1 = temp__4425__auto___23454;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23441_23455__$1)){
var c__17122__auto___23456 = cljs.core.chunk_first.call(null,seq__23441_23455__$1);
var G__23457 = cljs.core.chunk_rest.call(null,seq__23441_23455__$1);
var G__23458 = c__17122__auto___23456;
var G__23459 = cljs.core.count.call(null,c__17122__auto___23456);
var G__23460 = (0);
seq__23441_23445 = G__23457;
chunk__23442_23446 = G__23458;
count__23443_23447 = G__23459;
i__23444_23448 = G__23460;
continue;
} else {
var h_val_23461 = cljs.core.first.call(null,seq__23441_23455__$1);
xhr.headers.set(h_name,h_val_23461);

var G__23462 = cljs.core.next.call(null,seq__23441_23455__$1);
var G__23463 = null;
var G__23464 = (0);
var G__23465 = (0);
seq__23441_23445 = G__23462;
chunk__23442_23446 = G__23463;
count__23443_23447 = G__23464;
i__23444_23448 = G__23465;
continue;
}
} else {
}
}
break;
}

var G__23466 = seq__23433;
var G__23467 = chunk__23438;
var G__23468 = count__23439;
var G__23469 = (i__23440 + (1));
seq__23433 = G__23466;
chunk__23438 = G__23467;
count__23439 = G__23468;
i__23440 = G__23469;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__23433);
if(temp__4425__auto__){
var seq__23433__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23433__$1)){
var c__17122__auto__ = cljs.core.chunk_first.call(null,seq__23433__$1);
var G__23470 = cljs.core.chunk_rest.call(null,seq__23433__$1);
var G__23471 = c__17122__auto__;
var G__23472 = cljs.core.count.call(null,c__17122__auto__);
var G__23473 = (0);
seq__23433 = G__23470;
chunk__23438 = G__23471;
count__23439 = G__23472;
i__23440 = G__23473;
continue;
} else {
var h_name = cljs.core.first.call(null,seq__23433__$1);
var seq__23434_23474 = cljs.core.seq.call(null,cljs.core.vals.call(null,headers));
var chunk__23435_23475 = null;
var count__23436_23476 = (0);
var i__23437_23477 = (0);
while(true){
if((i__23437_23477 < count__23436_23476)){
var h_val_23478 = cljs.core._nth.call(null,chunk__23435_23475,i__23437_23477);
xhr.headers.set(h_name,h_val_23478);

var G__23479 = seq__23434_23474;
var G__23480 = chunk__23435_23475;
var G__23481 = count__23436_23476;
var G__23482 = (i__23437_23477 + (1));
seq__23434_23474 = G__23479;
chunk__23435_23475 = G__23480;
count__23436_23476 = G__23481;
i__23437_23477 = G__23482;
continue;
} else {
var temp__4425__auto___23483__$1 = cljs.core.seq.call(null,seq__23434_23474);
if(temp__4425__auto___23483__$1){
var seq__23434_23484__$1 = temp__4425__auto___23483__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23434_23484__$1)){
var c__17122__auto___23485 = cljs.core.chunk_first.call(null,seq__23434_23484__$1);
var G__23486 = cljs.core.chunk_rest.call(null,seq__23434_23484__$1);
var G__23487 = c__17122__auto___23485;
var G__23488 = cljs.core.count.call(null,c__17122__auto___23485);
var G__23489 = (0);
seq__23434_23474 = G__23486;
chunk__23435_23475 = G__23487;
count__23436_23476 = G__23488;
i__23437_23477 = G__23489;
continue;
} else {
var h_val_23490 = cljs.core.first.call(null,seq__23434_23484__$1);
xhr.headers.set(h_name,h_val_23490);

var G__23491 = cljs.core.next.call(null,seq__23434_23484__$1);
var G__23492 = null;
var G__23493 = (0);
var G__23494 = (0);
seq__23434_23474 = G__23491;
chunk__23435_23475 = G__23492;
count__23436_23476 = G__23493;
i__23437_23477 = G__23494;
continue;
}
} else {
}
}
break;
}

var G__23495 = cljs.core.next.call(null,seq__23433__$1);
var G__23496 = null;
var G__23497 = (0);
var G__23498 = (0);
seq__23433 = G__23495;
chunk__23438 = G__23496;
count__23439 = G__23497;
i__23440 = G__23498;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Takes an XhrIo object and sets response-type if not nil.
 */
cljs_http.core.apply_response_type_BANG_ = (function cljs_http$core$apply_response_type_BANG_(xhr,response_type){
return xhr.setResponseType((function (){var G__23500 = response_type;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),G__23500)){
return goog.net.XhrIo.ResponseType.ARRAY_BUFFER;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"blob","blob",1636965233),G__23500)){
return goog.net.XhrIo.ResponseType.BLOB;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"document","document",-1329188687),G__23500)){
return goog.net.XhrIo.ResponseType.DOCUMENT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"text","text",-1790561697),G__23500)){
return goog.net.XhrIo.ResponseType.TEXT;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),G__23500)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
if(cljs.core._EQ_.call(null,null,G__23500)){
return goog.net.XhrIo.ResponseType.DEFAULT;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(response_type)].join('')));

}
}
}
}
}
}
})());
});
/**
 * Builds an XhrIo object from the request parameters.
 */
cljs_http.core.build_xhr = (function cljs_http$core$build_xhr(p__23501){
var map__23505 = p__23501;
var map__23505__$1 = ((((!((map__23505 == null)))?((((map__23505.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23505.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23505):map__23505);
var request = map__23505__$1;
var with_credentials_QMARK_ = cljs.core.get.call(null,map__23505__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var default_headers = cljs.core.get.call(null,map__23505__$1,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094));
var response_type = cljs.core.get.call(null,map__23505__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var timeout = (function (){var or__16319__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return (0);
}
})();
var send_credentials = (((with_credentials_QMARK_ == null))?true:with_credentials_QMARK_);
var G__23507 = (new goog.net.XhrIo());
cljs_http.core.apply_default_headers_BANG_.call(null,G__23507,default_headers);

cljs_http.core.apply_response_type_BANG_.call(null,G__23507,response_type);

G__23507.setTimeoutInterval(timeout);

G__23507.setWithCredentials(send_credentials);

return G__23507;
});
cljs_http.core.error_kw = cljs.core.PersistentHashMap.fromArrays([(0),(7),(1),(4),(6),(3),(2),(9),(5),(8)],[new cljs.core.Keyword(null,"no-error","no-error",1984610064),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"custom-error","custom-error",-1565161123),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"ff-silent-error","ff-silent-error",189390514),new cljs.core.Keyword(null,"file-not-found","file-not-found",-65398940),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318)]);
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.xhr = (function cljs_http$core$xhr(p__23508){
var map__23535 = p__23508;
var map__23535__$1 = ((((!((map__23535 == null)))?((((map__23535.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23535.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23535):map__23535);
var request = map__23535__$1;
var request_method = cljs.core.get.call(null,map__23535__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__23535__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.call(null,map__23535__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__23535__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var cancel = cljs.core.get.call(null,map__23535__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var request_url = cljs_http.util.build_url.call(null,request);
var method = cljs.core.name.call(null,(function (){var or__16319__auto__ = request_method;
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return new cljs.core.Keyword(null,"get","get",1683182755);
}
})());
var headers__$1 = cljs_http.util.build_headers.call(null,headers);
var xhr__$1 = cljs_http.core.build_xhr.call(null,request);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,xhr__$1);

xhr__$1.listen(goog.net.EventType.COMPLETE,((function (channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (evt){
var target = evt.target;
var response = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"status","status",-1997798413),target.getStatus(),new cljs.core.Keyword(null,"success","success",1890645906),target.isSuccess(),new cljs.core.Keyword(null,"body","body",-2049205669),target.getResponse(),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs_http.util.parse_headers.call(null,target.getAllResponseHeaders()),new cljs.core.Keyword(null,"trace-redirects","trace-redirects",-1149427907),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [request_url,target.getLastUri()], null),new cljs.core.Keyword(null,"error-code","error-code",180497232),cljs_http.core.error_kw.call(null,target.getLastErrorCode()),new cljs.core.Keyword(null,"error-text","error-text",2021893718),target.getLastError()], null);
if(cljs.core.not.call(null,cljs_http.core.aborted_QMARK_.call(null,xhr__$1))){
cljs.core.async.put_BANG_.call(null,channel,response);
} else {
}

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

xhr__$1.send(request_url,method,body,headers__$1);

if(cljs.core.truth_(cancel)){
var c__19399__auto___23561 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function (state_23547){
var state_val_23548 = (state_23547[(1)]);
if((state_val_23548 === (1))){
var state_23547__$1 = state_23547;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23547__$1,(2),cancel);
} else {
if((state_val_23548 === (2))){
var inst_23538 = (state_23547[(2)]);
var inst_23539 = xhr__$1.isComplete();
var inst_23540 = cljs.core.not.call(null,inst_23539);
var state_23547__$1 = (function (){var statearr_23549 = state_23547;
(statearr_23549[(7)] = inst_23538);

return statearr_23549;
})();
if(inst_23540){
var statearr_23550_23562 = state_23547__$1;
(statearr_23550_23562[(1)] = (3));

} else {
var statearr_23551_23563 = state_23547__$1;
(statearr_23551_23563[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23548 === (3))){
var inst_23542 = xhr__$1.abort();
var state_23547__$1 = state_23547;
var statearr_23552_23564 = state_23547__$1;
(statearr_23552_23564[(2)] = inst_23542);

(statearr_23552_23564[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23548 === (4))){
var state_23547__$1 = state_23547;
var statearr_23553_23565 = state_23547__$1;
(statearr_23553_23565[(2)] = null);

(statearr_23553_23565[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23548 === (5))){
var inst_23545 = (state_23547[(2)]);
var state_23547__$1 = state_23547;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23547__$1,inst_23545);
} else {
return null;
}
}
}
}
}
});})(c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
;
return ((function (switch__19334__auto__,c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel){
return (function() {
var cljs_http$core$xhr_$_state_machine__19335__auto__ = null;
var cljs_http$core$xhr_$_state_machine__19335__auto____0 = (function (){
var statearr_23557 = [null,null,null,null,null,null,null,null];
(statearr_23557[(0)] = cljs_http$core$xhr_$_state_machine__19335__auto__);

(statearr_23557[(1)] = (1));

return statearr_23557;
});
var cljs_http$core$xhr_$_state_machine__19335__auto____1 = (function (state_23547){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_23547);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e23558){if((e23558 instanceof Object)){
var ex__19338__auto__ = e23558;
var statearr_23559_23566 = state_23547;
(statearr_23559_23566[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23547);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23558;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23567 = state_23547;
state_23547 = G__23567;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs_http$core$xhr_$_state_machine__19335__auto__ = function(state_23547){
switch(arguments.length){
case 0:
return cljs_http$core$xhr_$_state_machine__19335__auto____0.call(this);
case 1:
return cljs_http$core$xhr_$_state_machine__19335__auto____1.call(this,state_23547);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$xhr_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$xhr_$_state_machine__19335__auto____0;
cljs_http$core$xhr_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$xhr_$_state_machine__19335__auto____1;
return cljs_http$core$xhr_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
})();
var state__19401__auto__ = (function (){var statearr_23560 = f__19400__auto__.call(null);
(statearr_23560[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___23561);

return statearr_23560;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___23561,channel,request_url,method,headers__$1,xhr__$1,map__23535,map__23535__$1,request,request_method,headers,body,with_credentials_QMARK_,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the JSONP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.jsonp = (function cljs_http$core$jsonp(p__23568){
var map__23585 = p__23568;
var map__23585__$1 = ((((!((map__23585 == null)))?((((map__23585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23585):map__23585);
var request = map__23585__$1;
var timeout = cljs.core.get.call(null,map__23585__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318));
var callback_name = cljs.core.get.call(null,map__23585__$1,new cljs.core.Keyword(null,"callback-name","callback-name",336964714));
var cancel = cljs.core.get.call(null,map__23585__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var channel = cljs.core.async.chan.call(null);
var jsonp__$1 = (new goog.net.Jsonp(cljs_http.util.build_url.call(null,request),callback_name));
jsonp__$1.setRequestTimeout(timeout);

var req_23601 = jsonp__$1.send(null,((function (channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_success_callback(data){
var response = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"success","success",1890645906),true,new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
cljs.core.async.put_BANG_.call(null,channel,response);

cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel))
,((function (channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel){
return (function cljs_http$core$jsonp_$_error_callback(){
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.dissoc,channel);

if(cljs.core.truth_(cancel)){
cljs.core.async.close_BANG_.call(null,cancel);
} else {
}

return cljs.core.async.close_BANG_.call(null,channel);
});})(channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel))
);
cljs.core.swap_BANG_.call(null,cljs_http.core.pending_requests,cljs.core.assoc,channel,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"jsonp","jsonp",226119588),jsonp__$1,new cljs.core.Keyword(null,"request","request",1772954723),req_23601], null));

if(cljs.core.truth_(cancel)){
var c__19399__auto___23602 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel){
return (function (){
var f__19400__auto__ = (function (){var switch__19334__auto__ = ((function (c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel){
return (function (state_23591){
var state_val_23592 = (state_23591[(1)]);
if((state_val_23592 === (1))){
var state_23591__$1 = state_23591;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23591__$1,(2),cancel);
} else {
if((state_val_23592 === (2))){
var inst_23588 = (state_23591[(2)]);
var inst_23589 = jsonp__$1.cancel(req_23601);
var state_23591__$1 = (function (){var statearr_23593 = state_23591;
(statearr_23593[(7)] = inst_23588);

return statearr_23593;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23591__$1,inst_23589);
} else {
return null;
}
}
});})(c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel))
;
return ((function (switch__19334__auto__,c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel){
return (function() {
var cljs_http$core$jsonp_$_state_machine__19335__auto__ = null;
var cljs_http$core$jsonp_$_state_machine__19335__auto____0 = (function (){
var statearr_23597 = [null,null,null,null,null,null,null,null];
(statearr_23597[(0)] = cljs_http$core$jsonp_$_state_machine__19335__auto__);

(statearr_23597[(1)] = (1));

return statearr_23597;
});
var cljs_http$core$jsonp_$_state_machine__19335__auto____1 = (function (state_23591){
while(true){
var ret_value__19336__auto__ = (function (){try{while(true){
var result__19337__auto__ = switch__19334__auto__.call(null,state_23591);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19337__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19337__auto__;
}
break;
}
}catch (e23598){if((e23598 instanceof Object)){
var ex__19338__auto__ = e23598;
var statearr_23599_23603 = state_23591;
(statearr_23599_23603[(5)] = ex__19338__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23591);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23598;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19336__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23604 = state_23591;
state_23591 = G__23604;
continue;
} else {
return ret_value__19336__auto__;
}
break;
}
});
cljs_http$core$jsonp_$_state_machine__19335__auto__ = function(state_23591){
switch(arguments.length){
case 0:
return cljs_http$core$jsonp_$_state_machine__19335__auto____0.call(this);
case 1:
return cljs_http$core$jsonp_$_state_machine__19335__auto____1.call(this,state_23591);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_http$core$jsonp_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_http$core$jsonp_$_state_machine__19335__auto____0;
cljs_http$core$jsonp_$_state_machine__19335__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_http$core$jsonp_$_state_machine__19335__auto____1;
return cljs_http$core$jsonp_$_state_machine__19335__auto__;
})()
;})(switch__19334__auto__,c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel))
})();
var state__19401__auto__ = (function (){var statearr_23600 = f__19400__auto__.call(null);
(statearr_23600[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19399__auto___23602);

return statearr_23600;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19401__auto__);
});})(c__19399__auto___23602,req_23601,channel,jsonp__$1,map__23585,map__23585__$1,request,timeout,callback_name,cancel))
);

} else {
}

return channel;
});
/**
 * Execute the HTTP request corresponding to the given Ring request
 *   map and return a core.async channel.
 */
cljs_http.core.request = (function cljs_http$core$request(p__23605){
var map__23608 = p__23605;
var map__23608__$1 = ((((!((map__23608 == null)))?((((map__23608.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23608.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23608):map__23608);
var request__$1 = map__23608__$1;
var request_method = cljs.core.get.call(null,map__23608__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core._EQ_.call(null,request_method,new cljs.core.Keyword(null,"jsonp","jsonp",226119588))){
return cljs_http.core.jsonp.call(null,request__$1);
} else {
return cljs_http.core.xhr.call(null,request__$1);
}
});

//# sourceMappingURL=core.js.map?rel=1446554829348