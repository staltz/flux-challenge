// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.planet_monitor');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('om.next');
goog.require('om.dom');
goog.require('goog.net.WebSocket');
ui_of_the_sith.planet_monitor.base_url = "ws://localhost:4000";
ui_of_the_sith.planet_monitor.socket = (function ui_of_the_sith$planet_monitor$socket(update_planet_callback){
var socket__$1 = (new goog.net.WebSocket());
var G__28125_28132 = socket__$1;
var G__28126_28133 = [goog.net.WebSocket.EventType.CLOSED,goog.net.WebSocket.EventType.ERROR,goog.net.WebSocket.EventType.MESSAGE,goog.net.WebSocket.EventType.OPENED];
var G__28127_28134 = ((function (G__28125_28132,G__28126_28133,socket__$1){
return (function (e){
var log_message_content = (function (){var pred__28128 = cljs.core._EQ_;
var expr__28129 = e.type;
if(cljs.core.truth_((pred__28128.cljs$core$IFn$_invoke$arity$2 ? pred__28128.cljs$core$IFn$_invoke$arity$2(goog.net.WebSocket.EventType.MESSAGE,expr__28129) : pred__28128.call(null,goog.net.WebSocket.EventType.MESSAGE,expr__28129)))){
return e.message;
} else {
if(cljs.core.truth_((pred__28128.cljs$core$IFn$_invoke$arity$2 ? pred__28128.cljs$core$IFn$_invoke$arity$2(goog.net.WebSocket.EventType.ERROR,expr__28129) : pred__28128.call(null,goog.net.WebSocket.EventType.ERROR,expr__28129)))){
return e.data;
} else {
return null;
}
}
})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.type,goog.net.WebSocket.EventType.MESSAGE)){
var planet_name = ((function (){var G__28131 = (e["message"]);
return (JSON.parse.cljs$core$IFn$_invoke$arity$1 ? JSON.parse.cljs$core$IFn$_invoke$arity$1(G__28131) : JSON.parse.call(null,G__28131));
})()["name"]);
return (update_planet_callback.cljs$core$IFn$_invoke$arity$1 ? update_planet_callback.cljs$core$IFn$_invoke$arity$1(planet_name) : update_planet_callback.call(null,planet_name));
} else {
return null;
}
});})(G__28125_28132,G__28126_28133,socket__$1))
;
goog.events.listen(G__28125_28132,G__28126_28133,G__28127_28134);

return socket__$1;
});
ui_of_the_sith.planet_monitor.planet_monitor_text = (function ui_of_the_sith$planet_monitor$planet_monitor_text(planet){
if(cljs.core.truth_(planet)){
return [cljs.core.str("Obi-Wan currently on "),cljs.core.str(planet)].join('');
} else {
return null;
}
});
/**
 * @constructor
 */
ui_of_the_sith.planet_monitor.PlanetMonitor = (function ui_of_the_sith$planet_monitor$PlanetMonitor(){
var this__20443__auto__ = this;
React.Component.apply(this__20443__auto__,arguments);

if(!((this__20443__auto__.initLocalState == null))){
this__20443__auto__.state = this__20443__auto__.initLocalState();
} else {
this__20443__auto__.state = {};
}

return this__20443__auto__;
});

ui_of_the_sith.planet_monitor.PlanetMonitor.prototype = goog.object.clone(React.Component.prototype);

var x28139_28155 = ui_of_the_sith.planet_monitor.PlanetMonitor.prototype;
x28139_28155.componentWillUpdate = ((function (x28139_28155){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
om.next.merge_pending_props_BANG_(this__20383__auto__);

return om.next.merge_pending_state_BANG_(this__20383__auto__);
});})(x28139_28155))
;

x28139_28155.shouldComponentUpdate = ((function (x28139_28155){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
var or__18243__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(om.next.props(this__20383__auto__),goog.object.get(next_props__20384__auto__,"omcljs$value"));
if(or__18243__auto__){
return or__18243__auto__;
} else {
var and__18231__auto__ = this__20383__auto__.state;
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__28142 = this__20383__auto__.state;
var G__28143 = "omcljs$state";
return goog.object.get(G__28142,G__28143);
})(),goog.object.get(next_state__20385__auto__,"omcljs$state"));
} else {
return and__18231__auto__;
}
}
});})(x28139_28155))
;

x28139_28155.componentDidUpdate = ((function (x28139_28155){
return (function (prev_props__20386__auto__,prev_state__20387__auto__){
var this__20383__auto__ = this;
return om.next.clear_prev_props_BANG_(this__20383__auto__);
});})(x28139_28155))
;

x28139_28155.isMounted = ((function (x28139_28155){
return (function (){
var this__20383__auto__ = this;
return cljs.core.boolean$(goog.object.getValueByKeys(this__20383__auto__,"_reactInternalInstance","_renderedComponent"));
});})(x28139_28155))
;

x28139_28155.componentWillMount = ((function (x28139_28155){
return (function (){
var this__20375__auto__ = this;
var this$ = this__20375__auto__;
var indexer__20376__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(om.next.get_reconciler(this__20375__auto__),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$indexer], null));
if((indexer__20376__auto__ == null)){
} else {
om.next.protocols.index_component_BANG_(indexer__20376__auto__,this__20375__auto__);
}

var cb = cljs.core.cst$kw$update_DASH_planet_DASH_callback.cljs$core$IFn$_invoke$arity$1(om.next.get_computed.cljs$core$IFn$_invoke$arity$1(om.next.props(this$)));
om.next.set_state_BANG_(this$,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$socket,ui_of_the_sith.planet_monitor.socket(cb)], null));

return om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$).call(null,cljs.core.cst$kw$socket).open(ui_of_the_sith.planet_monitor.base_url);
});})(x28139_28155))
;

x28139_28155.componentWillUnmount = ((function (x28139_28155){
return (function (){
var this__20377__auto__ = this;
var this$ = this__20377__auto__;
var r__20378__auto__ = om.next.get_reconciler(this__20377__auto__);
var cfg__20379__auto__ = cljs.core.cst$kw$config.cljs$core$IFn$_invoke$arity$1(r__20378__auto__);
var st__20380__auto__ = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(cfg__20379__auto__);
var indexer__20381__auto__ = cljs.core.cst$kw$indexer.cljs$core$IFn$_invoke$arity$1(cfg__20379__auto__);
if((st__20380__auto__ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(st__20380__auto__,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$om$next_SLASH_queries], null),cljs.core.dissoc,cljs.core.array_seq([this__20377__auto__], 0));
}

if((indexer__20381__auto__ == null)){
} else {
om.next.protocols.drop_component_BANG_(indexer__20381__auto__,this__20377__auto__);
}

var socket = om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$).call(null,cljs.core.cst$kw$socket);
return socket.close();
});})(x28139_28155))
;

x28139_28155.render = ((function (x28139_28155){
return (function (){
var this__20382__auto__ = this;
var this$ = this__20382__auto__;
var _STAR_reconciler_STAR_28144 = om.next._STAR_reconciler_STAR_;
var _STAR_depth_STAR_28145 = om.next._STAR_depth_STAR_;
var _STAR_shared_STAR_28146 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_28147 = om.next._STAR_instrument_STAR_;
var _STAR_parent_STAR_28148 = om.next._STAR_parent_STAR_;
om.next._STAR_reconciler_STAR_ = om.next.get_reconciler(this__20382__auto__);

om.next._STAR_depth_STAR_ = (om.next.depth(this__20382__auto__) + (1));

om.next._STAR_shared_STAR_ = om.next.shared.cljs$core$IFn$_invoke$arity$1(this__20382__auto__);

om.next._STAR_instrument_STAR_ = om.next.instrument(this__20382__auto__);

om.next._STAR_parent_STAR_ = this__20382__auto__;

try{var props = om.next.props(this$);
var map__28149 = props;
var map__28149__$1 = ((((!((map__28149 == null)))?((((map__28149.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28149.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28149):map__28149);
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28149__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var G__28151 = {"className": "css-planet-monitor"};
var G__28152 = om.util.force_children(ui_of_the_sith.planet_monitor.planet_monitor_text(obi_wan_planet));
return React.DOM.h1(G__28151,G__28152);
}finally {om.next._STAR_parent_STAR_ = _STAR_parent_STAR_28148;

om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_28147;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_28146;

om.next._STAR_depth_STAR_ = _STAR_depth_STAR_28145;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_28144;
}});})(x28139_28155))
;


ui_of_the_sith.planet_monitor.PlanetMonitor.prototype.constructor = ui_of_the_sith.planet_monitor.PlanetMonitor;

ui_of_the_sith.planet_monitor.PlanetMonitor.prototype.om$isComponent = true;

var x28153_28156 = ui_of_the_sith.planet_monitor.PlanetMonitor;
x28153_28156.om$next$IQuery$ = true;

x28153_28156.om$next$IQuery$query$arity$1 = ((function (x28153_28156){
return (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$obi_DASH_wan_DASH_planet], null);
});})(x28153_28156))
;


var x28154_28157 = ui_of_the_sith.planet_monitor.PlanetMonitor.prototype;
x28154_28157.om$next$IQuery$ = true;

x28154_28157.om$next$IQuery$query$arity$1 = ((function (x28154_28157){
return (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$obi_DASH_wan_DASH_planet], null);
});})(x28154_28157))
;


ui_of_the_sith.planet_monitor.PlanetMonitor.cljs$lang$type = true;

ui_of_the_sith.planet_monitor.PlanetMonitor.cljs$lang$ctorStr = "ui-of-the-sith.planet-monitor/PlanetMonitor";

ui_of_the_sith.planet_monitor.PlanetMonitor.cljs$lang$ctorPrWriter = (function (this__20445__auto__,writer__20446__auto__,opt__20447__auto__){
return cljs.core._write(writer__20446__auto__,"ui-of-the-sith.planet-monitor/PlanetMonitor");
});
ui_of_the_sith.planet_monitor.planet_monitor = om.next.factory.cljs$core$IFn$_invoke$arity$2(ui_of_the_sith.planet_monitor.PlanetMonitor,null);
