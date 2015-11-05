// Compiled by ClojureScript 1.7.122 {}
goog.provide('cljs_http.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs_http.core');
goog.require('cljs.core.async');
goog.require('no.en.core');
goog.require('cljs_http.util');
goog.require('clojure.string');
goog.require('cljs.reader');
cljs_http.client.if_pos = (function cljs_http$client$if_pos(v){
if(cljs.core.truth_((function (){var and__16307__auto__ = v;
if(cljs.core.truth_(and__16307__auto__)){
return (v > (0));
} else {
return and__16307__auto__;
}
})())){
return v;
} else {
return null;
}
});
/**
 * Parse `s` as query params and return a hash map.
 */
cljs_http.client.parse_query_params = (function cljs_http$client$parse_query_params(s){
if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,s))){
return cljs.core.reduce.call(null,(function (p1__24334_SHARP_,p2__24333_SHARP_){
var vec__24336 = clojure.string.split.call(null,p2__24333_SHARP_,/=/);
var k = cljs.core.nth.call(null,vec__24336,(0),null);
var v = cljs.core.nth.call(null,vec__24336,(1),null);
return cljs.core.assoc.call(null,p1__24334_SHARP_,cljs.core.keyword.call(null,no.en.core.url_decode.call(null,k)),no.en.core.url_decode.call(null,v));
}),cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.call(null,[cljs.core.str(s)].join(''),/&/));
} else {
return null;
}
});
/**
 * Parse `url` into a hash map.
 */
cljs_http.client.parse_url = (function cljs_http$client$parse_url(url){
if(cljs.core.not.call(null,clojure.string.blank_QMARK_.call(null,url))){
var uri = goog.Uri.parse(url);
var query_data = uri.getQueryData();
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"scheme","scheme",90199613),cljs.core.keyword.call(null,uri.getScheme()),new cljs.core.Keyword(null,"server-name","server-name",-1012104295),uri.getDomain(),new cljs.core.Keyword(null,"server-port","server-port",663745648),cljs_http.client.if_pos.call(null,uri.getPort()),new cljs.core.Keyword(null,"uri","uri",-774711847),uri.getPath(),new cljs.core.Keyword(null,"query-string","query-string",-1018845061),((cljs.core.not.call(null,query_data.isEmpty()))?[cljs.core.str(query_data)].join(''):null),new cljs.core.Keyword(null,"query-params","query-params",900640534),((cljs.core.not.call(null,query_data.isEmpty()))?cljs_http.client.parse_query_params.call(null,[cljs.core.str(query_data)].join('')):null)], null);
} else {
return null;
}
});
cljs_http.client.unexceptional_status_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [(205),null,(206),null,(300),null,(204),null,(307),null,(303),null,(301),null,(201),null,(302),null,(202),null,(200),null,(203),null,(207),null], null), null);
cljs_http.client.encode_val = (function cljs_http$client$encode_val(k,v){
return [cljs.core.str(no.en.core.url_encode.call(null,cljs.core.name.call(null,k))),cljs.core.str("="),cljs.core.str(no.en.core.url_encode.call(null,[cljs.core.str(v)].join('')))].join('');
});
cljs_http.client.encode_vals = (function cljs_http$client$encode_vals(k,vs){
return clojure.string.join.call(null,"&",cljs.core.map.call(null,(function (p1__24337_SHARP_){
return cljs_http.client.encode_val.call(null,k,p1__24337_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__24338){
var vec__24340 = p__24338;
var k = cljs.core.nth.call(null,vec__24340,(0),null);
var v = cljs.core.nth.call(null,vec__24340,(1),null);
if(cljs.core.coll_QMARK_.call(null,v)){
return cljs_http.client.encode_vals.call(null,k,v);
} else {
return cljs_http.client.encode_val.call(null,k,v);
}
});
cljs_http.client.generate_query_string = (function cljs_http$client$generate_query_string(params){
return clojure.string.join.call(null,"&",cljs.core.map.call(null,cljs_http.client.encode_param,params));
});
cljs_http.client.regex_char_esc_smap = (function (){var esc_chars = "()*&^%$#!+";
return cljs.core.zipmap.call(null,esc_chars,cljs.core.map.call(null,((function (esc_chars){
return (function (p1__24341_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__24341_SHARP_)].join('');
});})(esc_chars))
,esc_chars));
})();
/**
 * Escape special characters -- for content-type.
 */
cljs_http.client.escape_special = (function cljs_http$client$escape_special(string){
return cljs.core.reduce.call(null,cljs.core.str,cljs.core.replace.call(null,cljs_http.client.regex_char_esc_smap,string));
});
/**
 * Decocde the :body of `response` with `decode-fn` if the content type matches.
 */
cljs_http.client.decode_body = (function cljs_http$client$decode_body(response,decode_fn,content_type,request_method){
if(cljs.core.truth_((function (){var and__16307__auto__ = cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"head","head",-771383919),request_method);
if(and__16307__auto__){
var and__16307__auto____$1 = cljs.core.not_EQ_.call(null,(204),new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(response));
if(and__16307__auto____$1){
return cljs.core.re_find.call(null,cljs.core.re_pattern.call(null,[cljs.core.str("(?i)"),cljs.core.str(cljs_http.client.escape_special.call(null,content_type))].join('')),[cljs.core.str(cljs.core.get.call(null,new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(response),"content-type",""))].join(''));
} else {
return and__16307__auto____$1;
}
} else {
return and__16307__auto__;
}
})())){
return cljs.core.update_in.call(null,response,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"body","body",-2049205669)], null),decode_fn);
} else {
return response;
}
});
/**
 * Encode :edn-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_edn_params = (function cljs_http$client$wrap_edn_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"edn-params","edn-params",894273052).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
var headers = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/edn"], null),new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(request));
return client.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"edn-params","edn-params",894273052)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs.core.pr_str.call(null,params)),new cljs.core.Keyword(null,"headers","headers",-835030129),headers));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/edn responses.
 */
cljs_http.client.wrap_edn_response = (function cljs_http$client$wrap_edn_response(client){
return (function (request){
return cljs.core.async.map.call(null,(function (p1__24342_SHARP_){
return cljs_http.client.decode_body.call(null,p1__24342_SHARP_,cljs.reader.read_string,"application/edn",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24347 = arguments.length;
var i__17378__auto___24348 = (0);
while(true){
if((i__17378__auto___24348 < len__17377__auto___24347)){
args__17384__auto__.push((arguments[i__17378__auto___24348]));

var G__24349 = (i__17378__auto___24348 + (1));
i__17378__auto___24348 = G__24349;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__24345){
var vec__24346 = p__24345;
var default_headers = cljs.core.nth.call(null,vec__24346,(0),null);
return ((function (vec__24346,default_headers){
return (function (request){
var temp__4423__auto__ = (function (){var or__16319__auto__ = new cljs.core.Keyword(null,"default-headers","default-headers",-43146094).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return default_headers;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var default_headers__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc.call(null,request,new cljs.core.Keyword(null,"default-headers","default-headers",-43146094),default_headers__$1));
} else {
return client.call(null,request);
}
});
;})(vec__24346,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq24343){
var G__24344 = cljs.core.first.call(null,seq24343);
var seq24343__$1 = cljs.core.next.call(null,seq24343);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__24344,seq24343__$1);
});
cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24354 = arguments.length;
var i__17378__auto___24355 = (0);
while(true){
if((i__17378__auto___24355 < len__17377__auto___24354)){
args__17384__auto__.push((arguments[i__17378__auto___24355]));

var G__24356 = (i__17378__auto___24355 + (1));
i__17378__auto___24355 = G__24356;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__24352){
var vec__24353 = p__24352;
var accept = cljs.core.nth.call(null,vec__24353,(0),null);
return ((function (vec__24353,accept){
return (function (request){
var temp__4423__auto__ = (function (){var or__16319__auto__ = new cljs.core.Keyword(null,"accept","accept",1874130431).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return accept;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var accept__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"accept"], null),accept__$1));
} else {
return client.call(null,request);
}
});
;})(vec__24353,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq24350){
var G__24351 = cljs.core.first.call(null,seq24350);
var seq24350__$1 = cljs.core.next.call(null,seq24350);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__24351,seq24350__$1);
});
cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24361 = arguments.length;
var i__17378__auto___24362 = (0);
while(true){
if((i__17378__auto___24362 < len__17377__auto___24361)){
args__17384__auto__.push((arguments[i__17378__auto___24362]));

var G__24363 = (i__17378__auto___24362 + (1));
i__17378__auto___24362 = G__24363;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__24359){
var vec__24360 = p__24359;
var content_type = cljs.core.nth.call(null,vec__24360,(0),null);
return ((function (vec__24360,content_type){
return (function (request){
var temp__4423__auto__ = (function (){var or__16319__auto__ = new cljs.core.Keyword(null,"content-type","content-type",-508222634).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return content_type;
}
})();
if(cljs.core.truth_(temp__4423__auto__)){
var content_type__$1 = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"content-type"], null),content_type__$1));
} else {
return client.call(null,request);
}
});
;})(vec__24360,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq24357){
var G__24358 = cljs.core.first.call(null,seq24357);
var seq24357__$1 = cljs.core.next.call(null,seq24357);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__24358,seq24357__$1);
});
cljs_http.client.default_transit_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"encoding","encoding",1728578272),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"encoding-opts","encoding-opts",-1805664631),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"decoding","decoding",-568180903),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"decoding-opts","decoding-opts",1050289140),cljs.core.PersistentArrayMap.EMPTY], null);
/**
 * Encode :transit-params in the `request` :body and set the appropriate
 *   Content Type header.
 * 
 *   A :transit-opts map can be optionally provided with the following keys:
 * 
 *   :encoding                #{:json, :json-verbose}
 *   :decoding                #{:json, :json-verbose}
 *   :encoding/decoding-opts  appropriate map of options to be passed to
 *                         transit writer/reader, respectively.
 */
cljs_http.client.wrap_transit_params = (function cljs_http$client$wrap_transit_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"transit-params","transit-params",357261095).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
var map__24366 = cljs.core.merge.call(null,cljs_http.client.default_transit_opts,new cljs.core.Keyword(null,"transit-opts","transit-opts",1104386010).cljs$core$IFn$_invoke$arity$1(request));
var map__24366__$1 = ((((!((map__24366 == null)))?((((map__24366.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24366.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24366):map__24366);
var encoding = cljs.core.get.call(null,map__24366__$1,new cljs.core.Keyword(null,"encoding","encoding",1728578272));
var encoding_opts = cljs.core.get.call(null,map__24366__$1,new cljs.core.Keyword(null,"encoding-opts","encoding-opts",-1805664631));
var headers = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/transit+json"], null),new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(request));
return client.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"transit-params","transit-params",357261095)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.util.transit_encode.call(null,params,encoding,encoding_opts)),new cljs.core.Keyword(null,"headers","headers",-835030129),headers));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/transit+json responses.
 */
cljs_http.client.wrap_transit_response = (function cljs_http$client$wrap_transit_response(client){
return (function (request){
var map__24372 = cljs.core.merge.call(null,cljs_http.client.default_transit_opts,new cljs.core.Keyword(null,"transit-opts","transit-opts",1104386010).cljs$core$IFn$_invoke$arity$1(request));
var map__24372__$1 = ((((!((map__24372 == null)))?((((map__24372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24372):map__24372);
var decoding = cljs.core.get.call(null,map__24372__$1,new cljs.core.Keyword(null,"decoding","decoding",-568180903));
var decoding_opts = cljs.core.get.call(null,map__24372__$1,new cljs.core.Keyword(null,"decoding-opts","decoding-opts",1050289140));
var transit_decode = ((function (map__24372,map__24372__$1,decoding,decoding_opts){
return (function (p1__24368_SHARP_){
return cljs_http.util.transit_decode.call(null,p1__24368_SHARP_,decoding,decoding_opts);
});})(map__24372,map__24372__$1,decoding,decoding_opts))
;
return cljs.core.async.map.call(null,((function (map__24372,map__24372__$1,decoding,decoding_opts,transit_decode){
return (function (p1__24369_SHARP_){
return cljs_http.client.decode_body.call(null,p1__24369_SHARP_,transit_decode,"application/transit+json",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
});})(map__24372,map__24372__$1,decoding,decoding_opts,transit_decode))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
/**
 * Encode :json-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_json_params = (function cljs_http$client$wrap_json_params(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"json-params","json-params",-1112693596).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var params = temp__4423__auto__;
var headers = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(request));
return client.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"json-params","json-params",-1112693596)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.util.json_encode.call(null,params)),new cljs.core.Keyword(null,"headers","headers",-835030129),headers));
} else {
return client.call(null,request);
}
});
});
/**
 * Decode application/json responses.
 */
cljs_http.client.wrap_json_response = (function cljs_http$client$wrap_json_response(client){
return (function (request){
return cljs.core.async.map.call(null,(function (p1__24374_SHARP_){
return cljs_http.client.decode_body.call(null,p1__24374_SHARP_,cljs_http.util.json_decode,"application/json",new cljs.core.Keyword(null,"request-method","request-method",1764796830).cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.call(null,request)], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__24378){
var map__24379 = p__24378;
var map__24379__$1 = ((((!((map__24379 == null)))?((((map__24379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24379):map__24379);
var req = map__24379__$1;
var query_params = cljs.core.get.call(null,map__24379__$1,new cljs.core.Keyword(null,"query-params","query-params",900640534));
if(cljs.core.truth_(query_params)){
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"query-params","query-params",900640534)),new cljs.core.Keyword(null,"query-string","query-string",-1018845061),cljs_http.client.generate_query_string.call(null,query_params)));
} else {
return client.call(null,req);
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__24384){
var map__24385 = p__24384;
var map__24385__$1 = ((((!((map__24385 == null)))?((((map__24385.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24385.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24385):map__24385);
var request = map__24385__$1;
var form_params = cljs.core.get.call(null,map__24385__$1,new cljs.core.Keyword(null,"form-params","form-params",1884296467));
var request_method = cljs.core.get.call(null,map__24385__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
var headers = cljs.core.get.call(null,map__24385__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
if(cljs.core.truth_((function (){var and__16307__auto__ = form_params;
if(cljs.core.truth_(and__16307__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"patch","patch",380775109),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null).call(null,request_method);
} else {
return and__16307__auto__;
}
})())){
var headers__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-www-form-urlencoded"], null),headers);
return client.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"form-params","form-params",1884296467)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.client.generate_query_string.call(null,form_params)),new cljs.core.Keyword(null,"headers","headers",-835030129),headers__$1));
} else {
return client.call(null,request);
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__24393_24399 = cljs.core.seq.call(null,params);
var chunk__24394_24400 = null;
var count__24395_24401 = (0);
var i__24396_24402 = (0);
while(true){
if((i__24396_24402 < count__24395_24401)){
var vec__24397_24403 = cljs.core._nth.call(null,chunk__24394_24400,i__24396_24402);
var k_24404 = cljs.core.nth.call(null,vec__24397_24403,(0),null);
var v_24405 = cljs.core.nth.call(null,vec__24397_24403,(1),null);
if(cljs.core.coll_QMARK_.call(null,v_24405)){
form_data.append(cljs.core.name.call(null,k_24404),cljs.core.first.call(null,v_24405),cljs.core.second.call(null,v_24405));
} else {
form_data.append(cljs.core.name.call(null,k_24404),v_24405);
}

var G__24406 = seq__24393_24399;
var G__24407 = chunk__24394_24400;
var G__24408 = count__24395_24401;
var G__24409 = (i__24396_24402 + (1));
seq__24393_24399 = G__24406;
chunk__24394_24400 = G__24407;
count__24395_24401 = G__24408;
i__24396_24402 = G__24409;
continue;
} else {
var temp__4425__auto___24410 = cljs.core.seq.call(null,seq__24393_24399);
if(temp__4425__auto___24410){
var seq__24393_24411__$1 = temp__4425__auto___24410;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24393_24411__$1)){
var c__17122__auto___24412 = cljs.core.chunk_first.call(null,seq__24393_24411__$1);
var G__24413 = cljs.core.chunk_rest.call(null,seq__24393_24411__$1);
var G__24414 = c__17122__auto___24412;
var G__24415 = cljs.core.count.call(null,c__17122__auto___24412);
var G__24416 = (0);
seq__24393_24399 = G__24413;
chunk__24394_24400 = G__24414;
count__24395_24401 = G__24415;
i__24396_24402 = G__24416;
continue;
} else {
var vec__24398_24417 = cljs.core.first.call(null,seq__24393_24411__$1);
var k_24418 = cljs.core.nth.call(null,vec__24398_24417,(0),null);
var v_24419 = cljs.core.nth.call(null,vec__24398_24417,(1),null);
if(cljs.core.coll_QMARK_.call(null,v_24419)){
form_data.append(cljs.core.name.call(null,k_24418),cljs.core.first.call(null,v_24419),cljs.core.second.call(null,v_24419));
} else {
form_data.append(cljs.core.name.call(null,k_24418),v_24419);
}

var G__24420 = cljs.core.next.call(null,seq__24393_24411__$1);
var G__24421 = null;
var G__24422 = (0);
var G__24423 = (0);
seq__24393_24399 = G__24420;
chunk__24394_24400 = G__24421;
count__24395_24401 = G__24422;
i__24396_24402 = G__24423;
continue;
}
} else {
}
}
break;
}

return form_data;
});
cljs_http.client.wrap_multipart_params = (function cljs_http$client$wrap_multipart_params(client){
return (function (p__24427){
var map__24428 = p__24427;
var map__24428__$1 = ((((!((map__24428 == null)))?((((map__24428.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24428.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24428):map__24428);
var request = map__24428__$1;
var multipart_params = cljs.core.get.call(null,map__24428__$1,new cljs.core.Keyword(null,"multipart-params","multipart-params",-1033508707));
var request_method = cljs.core.get.call(null,map__24428__$1,new cljs.core.Keyword(null,"request-method","request-method",1764796830));
if(cljs.core.truth_((function (){var and__16307__auto__ = multipart_params;
if(cljs.core.truth_(and__16307__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"patch","patch",380775109),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null).call(null,request_method);
} else {
return and__16307__auto__;
}
})())){
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,request,new cljs.core.Keyword(null,"multipart-params","multipart-params",-1033508707)),new cljs.core.Keyword(null,"body","body",-2049205669),cljs_http.client.generate_form_data.call(null,multipart_params)));
} else {
return client.call(null,request);
}
});
});
cljs_http.client.wrap_method = (function cljs_http$client$wrap_method(client){
return (function (req){
var temp__4423__auto__ = new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4423__auto__)){
var m = temp__4423__auto__;
return client.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"method","method",55703592)),new cljs.core.Keyword(null,"request-method","request-method",1764796830),m));
} else {
return client.call(null,req);
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__24430_SHARP_){
return client.call(null,cljs.core.assoc.call(null,p1__24430_SHARP_,new cljs.core.Keyword(null,"server-name","server-name",-1012104295),server_name));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__24435){
var map__24436 = p__24435;
var map__24436__$1 = ((((!((map__24436 == null)))?((((map__24436.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24436.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24436):map__24436);
var req = map__24436__$1;
var query_params = cljs.core.get.call(null,map__24436__$1,new cljs.core.Keyword(null,"query-params","query-params",900640534));
var temp__4423__auto__ = cljs_http.client.parse_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__4423__auto__)){
var spec = temp__4423__auto__;
return client.call(null,cljs.core.update_in.call(null,cljs.core.dissoc.call(null,cljs.core.merge.call(null,req,spec),new cljs.core.Keyword(null,"url","url",276297046)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"query-params","query-params",900640534)], null),((function (spec,temp__4423__auto__,map__24436,map__24436__$1,req,query_params){
return (function (p1__24431_SHARP_){
return cljs.core.merge.call(null,p1__24431_SHARP_,query_params);
});})(spec,temp__4423__auto__,map__24436,map__24436__$1,req,query_params))
));
} else {
return client.call(null,req);
}
});
});
/**
 * Middleware converting the :basic-auth option or `credentials` into
 *   an Authorization header.
 */
cljs_http.client.wrap_basic_auth = (function cljs_http$client$wrap_basic_auth(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24442 = arguments.length;
var i__17378__auto___24443 = (0);
while(true){
if((i__17378__auto___24443 < len__17377__auto___24442)){
args__17384__auto__.push((arguments[i__17378__auto___24443]));

var G__24444 = (i__17378__auto___24443 + (1));
i__17378__auto___24443 = G__24444;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__24440){
var vec__24441 = p__24440;
var credentials = cljs.core.nth.call(null,vec__24441,(0),null);
return ((function (vec__24441,credentials){
return (function (req){
var credentials__$1 = (function (){var or__16319__auto__ = new cljs.core.Keyword(null,"basic-auth","basic-auth",-673163332).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__16319__auto__)){
return or__16319__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_.call(null,credentials__$1))){
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"basic-auth","basic-auth",-673163332)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"authorization"], null),cljs_http.util.basic_auth.call(null,credentials__$1)));
} else {
return client.call(null,req);
}
});
;})(vec__24441,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq24438){
var G__24439 = cljs.core.first.call(null,seq24438);
var seq24438__$1 = cljs.core.next.call(null,seq24438);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__24439,seq24438__$1);
});
/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__4423__auto__ = new cljs.core.Keyword(null,"oauth-token","oauth-token",311415191).cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__4423__auto__)){
var oauth_token = temp__4423__auto__;
return client.call(null,cljs.core.assoc_in.call(null,cljs.core.dissoc.call(null,req,new cljs.core.Keyword(null,"oauth-token","oauth-token",311415191)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join('')));
} else {
return client.call(null,req);
}
});
});
/**
 * Pipe the response-channel into the request-map's
 * custom channel (e.g. to enable transducers)
 */
cljs_http.client.wrap_channel_from_request_map = (function cljs_http$client$wrap_channel_from_request_map(client){
return (function (request){
var temp__4423__auto__ = new cljs.core.Keyword(null,"channel","channel",734187692).cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__4423__auto__)){
var custom_channel = temp__4423__auto__;
return cljs.core.async.pipe.call(null,client.call(null,request),custom_channel);
} else {
return client.call(null,request);
}
});
});
/**
 * Returns a batteries-included HTTP request function coresponding to the given
 * core client. See client/request
 */
cljs_http.client.wrap_request = (function cljs_http$client$wrap_request(request){
return cljs_http.client.wrap_default_headers.call(null,cljs_http.client.wrap_channel_from_request_map.call(null,cljs_http.client.wrap_url.call(null,cljs_http.client.wrap_method.call(null,cljs_http.client.wrap_oauth.call(null,cljs_http.client.wrap_basic_auth.call(null,cljs_http.client.wrap_query_params.call(null,cljs_http.client.wrap_content_type.call(null,cljs_http.client.wrap_json_response.call(null,cljs_http.client.wrap_json_params.call(null,cljs_http.client.wrap_transit_response.call(null,cljs_http.client.wrap_transit_params.call(null,cljs_http.client.wrap_edn_response.call(null,cljs_http.client.wrap_edn_params.call(null,cljs_http.client.wrap_multipart_params.call(null,cljs_http.client.wrap_form_params.call(null,cljs_http.client.wrap_accept.call(null,request)))))))))))))))));
});
/**
 * Executes the HTTP request corresponding to the given map and returns the
 * response map for corresponding to the resulting HTTP response.
 * 
 * In addition to the standard Ring request keys, the following keys are also
 * recognized:
 * * :url
 * * :method
 * * :query-params
 */
cljs_http.client.request = cljs_http.client.wrap_request.call(null,cljs_http.core.request);
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.delete$ = (function cljs_http$client$delete(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24449 = arguments.length;
var i__17378__auto___24450 = (0);
while(true){
if((i__17378__auto___24450 < len__17377__auto___24449)){
args__17384__auto__.push((arguments[i__17378__auto___24450]));

var G__24451 = (i__17378__auto___24450 + (1));
i__17378__auto___24450 = G__24451;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24447){
var vec__24448 = p__24447;
var req = cljs.core.nth.call(null,vec__24448,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq24445){
var G__24446 = cljs.core.first.call(null,seq24445);
var seq24445__$1 = cljs.core.next.call(null,seq24445);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__24446,seq24445__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24456 = arguments.length;
var i__17378__auto___24457 = (0);
while(true){
if((i__17378__auto___24457 < len__17377__auto___24456)){
args__17384__auto__.push((arguments[i__17378__auto___24457]));

var G__24458 = (i__17378__auto___24457 + (1));
i__17378__auto___24457 = G__24458;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24454){
var vec__24455 = p__24454;
var req = cljs.core.nth.call(null,vec__24455,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq24452){
var G__24453 = cljs.core.first.call(null,seq24452);
var seq24452__$1 = cljs.core.next.call(null,seq24452);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__24453,seq24452__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24463 = arguments.length;
var i__17378__auto___24464 = (0);
while(true){
if((i__17378__auto___24464 < len__17377__auto___24463)){
args__17384__auto__.push((arguments[i__17378__auto___24464]));

var G__24465 = (i__17378__auto___24464 + (1));
i__17378__auto___24464 = G__24465;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24461){
var vec__24462 = p__24461;
var req = cljs.core.nth.call(null,vec__24462,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"head","head",-771383919),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq24459){
var G__24460 = cljs.core.first.call(null,seq24459);
var seq24459__$1 = cljs.core.next.call(null,seq24459);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__24460,seq24459__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24470 = arguments.length;
var i__17378__auto___24471 = (0);
while(true){
if((i__17378__auto___24471 < len__17377__auto___24470)){
args__17384__auto__.push((arguments[i__17378__auto___24471]));

var G__24472 = (i__17378__auto___24471 + (1));
i__17378__auto___24471 = G__24472;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24468){
var vec__24469 = p__24468;
var req = cljs.core.nth.call(null,vec__24469,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"jsonp","jsonp",226119588),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq24466){
var G__24467 = cljs.core.first.call(null,seq24466);
var seq24466__$1 = cljs.core.next.call(null,seq24466);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__24467,seq24466__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24477 = arguments.length;
var i__17378__auto___24478 = (0);
while(true){
if((i__17378__auto___24478 < len__17377__auto___24477)){
args__17384__auto__.push((arguments[i__17378__auto___24478]));

var G__24479 = (i__17378__auto___24478 + (1));
i__17378__auto___24478 = G__24479;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24475){
var vec__24476 = p__24475;
var req = cljs.core.nth.call(null,vec__24476,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"move","move",-2110884309),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq24473){
var G__24474 = cljs.core.first.call(null,seq24473);
var seq24473__$1 = cljs.core.next.call(null,seq24473);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__24474,seq24473__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24484 = arguments.length;
var i__17378__auto___24485 = (0);
while(true){
if((i__17378__auto___24485 < len__17377__auto___24484)){
args__17384__auto__.push((arguments[i__17378__auto___24485]));

var G__24486 = (i__17378__auto___24485 + (1));
i__17378__auto___24485 = G__24486;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24482){
var vec__24483 = p__24482;
var req = cljs.core.nth.call(null,vec__24483,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq24480){
var G__24481 = cljs.core.first.call(null,seq24480);
var seq24480__$1 = cljs.core.next.call(null,seq24480);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__24481,seq24480__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24491 = arguments.length;
var i__17378__auto___24492 = (0);
while(true){
if((i__17378__auto___24492 < len__17377__auto___24491)){
args__17384__auto__.push((arguments[i__17378__auto___24492]));

var G__24493 = (i__17378__auto___24492 + (1));
i__17378__auto___24492 = G__24493;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24489){
var vec__24490 = p__24489;
var req = cljs.core.nth.call(null,vec__24490,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"patch","patch",380775109),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq24487){
var G__24488 = cljs.core.first.call(null,seq24487);
var seq24487__$1 = cljs.core.next.call(null,seq24487);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__24488,seq24487__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24498 = arguments.length;
var i__17378__auto___24499 = (0);
while(true){
if((i__17378__auto___24499 < len__17377__auto___24498)){
args__17384__auto__.push((arguments[i__17378__auto___24499]));

var G__24500 = (i__17378__auto___24499 + (1));
i__17378__auto___24499 = G__24500;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24496){
var vec__24497 = p__24496;
var req = cljs.core.nth.call(null,vec__24497,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq24494){
var G__24495 = cljs.core.first.call(null,seq24494);
var seq24494__$1 = cljs.core.next.call(null,seq24494);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__24495,seq24494__$1);
});
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__17384__auto__ = [];
var len__17377__auto___24505 = arguments.length;
var i__17378__auto___24506 = (0);
while(true){
if((i__17378__auto___24506 < len__17377__auto___24505)){
args__17384__auto__.push((arguments[i__17378__auto___24506]));

var G__24507 = (i__17378__auto___24506 + (1));
i__17378__auto___24506 = G__24507;
continue;
} else {
}
break;
}

var argseq__17385__auto__ = ((((1) < args__17384__auto__.length))?(new cljs.core.IndexedSeq(args__17384__auto__.slice((1)),(0))):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17385__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__24503){
var vec__24504 = p__24503;
var req = cljs.core.nth.call(null,vec__24504,(0),null);
return cljs_http.client.request.call(null,cljs.core.merge.call(null,req,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"url","url",276297046),url], null)));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq24501){
var G__24502 = cljs.core.first.call(null,seq24501);
var seq24501__$1 = cljs.core.next.call(null,seq24501);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__24502,seq24501__$1);
});

//# sourceMappingURL=client.js.map?rel=1446554830308