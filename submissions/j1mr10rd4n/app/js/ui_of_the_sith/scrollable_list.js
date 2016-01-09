// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('ui_of_the_sith.scrollable_list');
goog.require('cljs.core');
goog.require('om.next');
goog.require('om.dom');
goog.require('ui_of_the_sith.config');
ui_of_the_sith.scrollable_list.set_scroll_button_state = (function ui_of_the_sith$scrollable_list$set_scroll_button_state(button,p__27976){
var map__27986 = p__27976;
var map__27986__$1 = ((((!((map__27986 == null)))?((((map__27986.cljs$lang$protocol_mask$partition0$ & (64))) || (map__27986.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__27986):map__27986);
var direction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27986__$1,cljs.core.cst$kw$direction);
var obi_wan_planet_match_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27986__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet_DASH_match_QMARK_);
var at_start_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27986__$1,cljs.core.cst$kw$at_DASH_start_QMARK_);
var at_end_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27986__$1,cljs.core.cst$kw$at_DASH_end_QMARK_);
var scroll_button_callback = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__27986__$1,cljs.core.cst$kw$scroll_DASH_button_DASH_callback);
var enabled_QMARK_ = (function (){var and__18231__auto__ = (obi_wan_planet_match_QMARK_ == null);
if(and__18231__auto__){
var pred__27991 = cljs.core._EQ_;
var expr__27992 = direction;
if(cljs.core.truth_((pred__27991.cljs$core$IFn$_invoke$arity$2 ? pred__27991.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$up,expr__27992) : pred__27991.call(null,cljs.core.cst$kw$up,expr__27992)))){
return cljs.core.not(at_start_QMARK_);
} else {
if(cljs.core.truth_((pred__27991.cljs$core$IFn$_invoke$arity$2 ? pred__27991.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$down,expr__27992) : pred__27991.call(null,cljs.core.cst$kw$down,expr__27992)))){
return cljs.core.not(at_end_QMARK_);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__27992)].join('')));
}
}
} else {
return and__18231__auto__;
}
})();
var css_class = (function (){var button_class = [cljs.core.str("css-button-"),cljs.core.str(cljs.core.name(direction))].join('');
if(!(enabled_QMARK_)){
return [cljs.core.str(button_class),cljs.core.str(" css-button-disabled")].join('');
} else {
return button_class;
}
})();
var on_click = ((enabled_QMARK_)?((function (enabled_QMARK_,css_class,map__27986,map__27986__$1,direction,obi_wan_planet_match_QMARK_,at_start_QMARK_,at_end_QMARK_,scroll_button_callback){
return (function (e){
return (scroll_button_callback.cljs$core$IFn$_invoke$arity$1 ? scroll_button_callback.cljs$core$IFn$_invoke$arity$1(direction) : scroll_button_callback.call(null,direction));
});})(enabled_QMARK_,css_class,map__27986,map__27986__$1,direction,obi_wan_planet_match_QMARK_,at_start_QMARK_,at_end_QMARK_,scroll_button_callback))
:((function (enabled_QMARK_,css_class,map__27986,map__27986__$1,direction,obi_wan_planet_match_QMARK_,at_start_QMARK_,at_end_QMARK_,scroll_button_callback){
return (function (e){
var G__27994 = e;
G__27994.preventDefault();

G__27994.stopPropagation();

return G__27994;
});})(enabled_QMARK_,css_class,map__27986,map__27986__$1,direction,obi_wan_planet_match_QMARK_,at_start_QMARK_,at_end_QMARK_,scroll_button_callback))
);
return om.next.set_state_BANG_(button,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$enabled_QMARK_,enabled_QMARK_,cljs.core.cst$kw$css_DASH_class,css_class,cljs.core.cst$kw$on_DASH_click,on_click], null));
});
/**
 * @constructor
 */
ui_of_the_sith.scrollable_list.ScrollButton = (function ui_of_the_sith$scrollable_list$ScrollButton(){
var this__20443__auto__ = this;
React.Component.apply(this__20443__auto__,arguments);

if(!((this__20443__auto__.initLocalState == null))){
this__20443__auto__.state = this__20443__auto__.initLocalState();
} else {
this__20443__auto__.state = {};
}

return this__20443__auto__;
});

ui_of_the_sith.scrollable_list.ScrollButton.prototype = goog.object.clone(React.Component.prototype);

var x27999_28014 = ui_of_the_sith.scrollable_list.ScrollButton.prototype;
x27999_28014.componentWillUpdate = ((function (x27999_28014){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
om.next.merge_pending_props_BANG_(this__20383__auto__);

return om.next.merge_pending_state_BANG_(this__20383__auto__);
});})(x27999_28014))
;

x27999_28014.shouldComponentUpdate = ((function (x27999_28014){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
var or__18243__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(om.next.props(this__20383__auto__),goog.object.get(next_props__20384__auto__,"omcljs$value"));
if(or__18243__auto__){
return or__18243__auto__;
} else {
var and__18231__auto__ = this__20383__auto__.state;
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__28002 = this__20383__auto__.state;
var G__28003 = "omcljs$state";
return goog.object.get(G__28002,G__28003);
})(),goog.object.get(next_state__20385__auto__,"omcljs$state"));
} else {
return and__18231__auto__;
}
}
});})(x27999_28014))
;

x27999_28014.componentWillUnmount = ((function (x27999_28014){
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
});})(x27999_28014))
;

x27999_28014.componentDidUpdate = ((function (x27999_28014){
return (function (prev_props__20386__auto__,prev_state__20387__auto__){
var this__20383__auto__ = this;
return om.next.clear_prev_props_BANG_(this__20383__auto__);
});})(x27999_28014))
;

x27999_28014.isMounted = ((function (x27999_28014){
return (function (){
var this__20383__auto__ = this;
return cljs.core.boolean$(goog.object.getValueByKeys(this__20383__auto__,"_reactInternalInstance","_renderedComponent"));
});})(x27999_28014))
;

x27999_28014.componentWillMount = ((function (x27999_28014){
return (function (){
var this__20375__auto__ = this;
var this$ = this__20375__auto__;
var indexer__20376__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(om.next.get_reconciler(this__20375__auto__),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$indexer], null));
if((indexer__20376__auto__ == null)){
} else {
om.next.protocols.index_component_BANG_(indexer__20376__auto__,this__20375__auto__);
}

return ui_of_the_sith.scrollable_list.set_scroll_button_state(this$,om.next.props(this$));
});})(x27999_28014))
;

x27999_28014.componentWillReceiveProps = ((function (x27999_28014){
return (function (next_props__20367__auto__){
var this__20366__auto__ = this;
var this$ = this__20366__auto__;
var nextProps = om.next._next_props(next_props__20367__auto__,this__20366__auto__);
return ui_of_the_sith.scrollable_list.set_scroll_button_state(this$,nextProps);
});})(x27999_28014))
;

x27999_28014.render = ((function (x27999_28014){
return (function (){
var this__20382__auto__ = this;
var this$ = this__20382__auto__;
var _STAR_reconciler_STAR_28004 = om.next._STAR_reconciler_STAR_;
var _STAR_depth_STAR_28005 = om.next._STAR_depth_STAR_;
var _STAR_shared_STAR_28006 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_28007 = om.next._STAR_instrument_STAR_;
var _STAR_parent_STAR_28008 = om.next._STAR_parent_STAR_;
om.next._STAR_reconciler_STAR_ = om.next.get_reconciler(this__20382__auto__);

om.next._STAR_depth_STAR_ = (om.next.depth(this__20382__auto__) + (1));

om.next._STAR_shared_STAR_ = om.next.shared.cljs$core$IFn$_invoke$arity$1(this__20382__auto__);

om.next._STAR_instrument_STAR_ = om.next.instrument(this__20382__auto__);

om.next._STAR_parent_STAR_ = this__20382__auto__;

try{var map__28009 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$);
var map__28009__$1 = ((((!((map__28009 == null)))?((((map__28009.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28009.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28009):map__28009);
var css_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28009__$1,cljs.core.cst$kw$css_DASH_class);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28009__$1,cljs.core.cst$kw$on_DASH_click);
var G__28011 = {"className": css_class, "onClick": on_click};
return React.DOM.button(G__28011);
}finally {om.next._STAR_parent_STAR_ = _STAR_parent_STAR_28008;

om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_28007;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_28006;

om.next._STAR_depth_STAR_ = _STAR_depth_STAR_28005;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_28004;
}});})(x27999_28014))
;


ui_of_the_sith.scrollable_list.ScrollButton.prototype.constructor = ui_of_the_sith.scrollable_list.ScrollButton;

ui_of_the_sith.scrollable_list.ScrollButton.prototype.om$isComponent = true;

var x28012_28015 = ui_of_the_sith.scrollable_list.ScrollButton;


var x28013_28016 = ui_of_the_sith.scrollable_list.ScrollButton.prototype;


ui_of_the_sith.scrollable_list.ScrollButton.cljs$lang$type = true;

ui_of_the_sith.scrollable_list.ScrollButton.cljs$lang$ctorStr = "ui-of-the-sith.scrollable-list/ScrollButton";

ui_of_the_sith.scrollable_list.ScrollButton.cljs$lang$ctorPrWriter = (function (this__20445__auto__,writer__20446__auto__,opt__20447__auto__){
return cljs.core._write(writer__20446__auto__,"ui-of-the-sith.scrollable-list/ScrollButton");
});
ui_of_the_sith.scrollable_list.scroll_button = (function ui_of_the_sith$scrollable_list$scroll_button(state,direction){
return om.next.factory.cljs$core$IFn$_invoke$arity$1(ui_of_the_sith.scrollable_list.ScrollButton).call(null,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([state,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$direction,direction], null)], 0)));
});
ui_of_the_sith.scrollable_list.abort_xhr = (function ui_of_the_sith$scrollable_list$abort_xhr(p__28017){
var map__28020 = p__28017;
var map__28020__$1 = ((((!((map__28020 == null)))?((((map__28020.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28020.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28020):map__28020);
var xhr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28020__$1,cljs.core.cst$kw$xhr);
if(cljs.core.truth_(xhr)){
return xhr.abort();
} else {
return null;
}
});
ui_of_the_sith.scrollable_list.abort_and_restart_xhr_if_required = (function ui_of_the_sith$scrollable_list$abort_and_restart_xhr_if_required(p__28022){
var map__28025 = p__28022;
var map__28025__$1 = ((((!((map__28025 == null)))?((((map__28025.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28025.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28025):map__28025);
var xhr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28025__$1,cljs.core.cst$kw$xhr);
var matching_planet_in_list_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28025__$1,cljs.core.cst$kw$matching_DASH_planet_DASH_in_DASH_list_QMARK_);
if(cljs.core.truth_(xhr)){
if(cljs.core.truth_(matching_planet_in_list_QMARK_)){
return xhr.abort();
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((7),xhr.getLastErrorCode())){
return xhr.send(xhr.getLastUri());
} else {
return null;
}
}
} else {
return null;
}
});
/**
 * @constructor
 */
ui_of_the_sith.scrollable_list.Slot = (function ui_of_the_sith$scrollable_list$Slot(){
var this__20443__auto__ = this;
React.Component.apply(this__20443__auto__,arguments);

if(!((this__20443__auto__.initLocalState == null))){
this__20443__auto__.state = this__20443__auto__.initLocalState();
} else {
this__20443__auto__.state = {};
}

return this__20443__auto__;
});

ui_of_the_sith.scrollable_list.Slot.prototype = goog.object.clone(React.Component.prototype);

var x28031_28066 = ui_of_the_sith.scrollable_list.Slot.prototype;
x28031_28066.componentWillUpdate = ((function (x28031_28066){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
om.next.merge_pending_props_BANG_(this__20383__auto__);

return om.next.merge_pending_state_BANG_(this__20383__auto__);
});})(x28031_28066))
;

x28031_28066.shouldComponentUpdate = ((function (x28031_28066){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
var or__18243__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(om.next.props(this__20383__auto__),goog.object.get(next_props__20384__auto__,"omcljs$value"));
if(or__18243__auto__){
return or__18243__auto__;
} else {
var and__18231__auto__ = this__20383__auto__.state;
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__28034 = this__20383__auto__.state;
var G__28035 = "omcljs$state";
return goog.object.get(G__28034,G__28035);
})(),goog.object.get(next_state__20385__auto__,"omcljs$state"));
} else {
return and__18231__auto__;
}
}
});})(x28031_28066))
;

x28031_28066.isMounted = ((function (x28031_28066){
return (function (){
var this__20383__auto__ = this;
return cljs.core.boolean$(goog.object.getValueByKeys(this__20383__auto__,"_reactInternalInstance","_renderedComponent"));
});})(x28031_28066))
;

x28031_28066.componentWillMount = ((function (x28031_28066){
return (function (){
var this__20375__auto__ = this;
var this$ = this__20375__auto__;
var indexer__20376__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(om.next.get_reconciler(this__20375__auto__),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$indexer], null));
if((indexer__20376__auto__ == null)){
} else {
om.next.protocols.index_component_BANG_(indexer__20376__auto__,this__20375__auto__);
}

return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3(this$,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$css_DASH_class,"css-slot"], null));
});})(x28031_28066))
;

x28031_28066.componentDidMount = ((function (x28031_28066){
return (function (){
var this$ = this;
var map__28036 = om.next.props(this$);
var map__28036__$1 = ((((!((map__28036 == null)))?((((map__28036.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28036.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28036):map__28036);
var sith = map__28036__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28036__$1,cljs.core.cst$kw$sith_SLASH_id);
var remote_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28036__$1,cljs.core.cst$kw$sith_SLASH_remote_DASH_id);
if(!((remote_id == null))){
return om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sith_SLASH_populate_DASH_from_DASH_remote),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$sith,sith], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null))))))))))));
} else {
return null;
}
});})(x28031_28066))
;

x28031_28066.componentWillReceiveProps = ((function (x28031_28066){
return (function (next_props__20367__auto__){
var this__20366__auto__ = this;
var this$ = this__20366__auto__;
var nextProps = om.next._next_props(next_props__20367__auto__,this__20366__auto__);
var map__28038 = om.next.props(this$);
var map__28038__$1 = ((((!((map__28038 == null)))?((((map__28038.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28038.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28038):map__28038);
var remote_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28038__$1,cljs.core.cst$kw$sith_SLASH_remote_DASH_id);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28038__$1,cljs.core.cst$kw$sith_SLASH_name);
var homeworld = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28038__$1,cljs.core.cst$kw$sith_SLASH_homeworld);
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28038__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var matching_planet_in_list_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28038__$1,cljs.core.cst$kw$matching_DASH_planet_DASH_in_DASH_list_QMARK_);
var next_remote_id = cljs.core.cst$kw$sith_SLASH_remote_DASH_id.cljs$core$IFn$_invoke$arity$1(nextProps);
var next_name = cljs.core.cst$kw$sith_SLASH_name.cljs$core$IFn$_invoke$arity$1(nextProps);
var remote_id_changed_QMARK_ = (!((next_remote_id == null))) && (!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(remote_id,next_remote_id)));
var populated_from_remote_QMARK_ = !(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,next_name));
return om.next.update_state_BANG_.cljs$core$IFn$_invoke$arity$3(this$,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$remote_DASH_id_DASH_changed_QMARK_,remote_id_changed_QMARK_,cljs.core.cst$kw$populated_DASH_from_DASH_remote_QMARK_,populated_from_remote_QMARK_,cljs.core.cst$kw$matching_DASH_planet_DASH_in_DASH_list_QMARK_,matching_planet_in_list_QMARK_,cljs.core.cst$kw$css_DASH_class,(((!((homeworld == null))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(homeworld,obi_wan_planet)))?"css-slot homeworld-alert":"css-slot")], null));
});})(x28031_28066))
;

x28031_28066.componentDidUpdate = ((function (x28031_28066){
return (function (prev_props__20373__auto__,prev_state__20374__auto__){
var this__20372__auto__ = this;
var this$ = this__20372__auto__;
var prevProps = om.next._prev_props(prev_props__20373__auto__,this__20372__auto__);
var prevState = goog.object.get(prev_state__20374__auto__,"omcljs$previousState");
var map__28040_28067 = om.next.props(this$);
var map__28040_28068__$1 = ((((!((map__28040_28067 == null)))?((((map__28040_28067.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28040_28067.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28040_28067):map__28040_28067);
var sith_28069 = map__28040_28068__$1;
var id_28070 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28040_28068__$1,cljs.core.cst$kw$sith_SLASH_id);
var map__28041_28071 = om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$);
var map__28041_28072__$1 = ((((!((map__28041_28071 == null)))?((((map__28041_28071.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28041_28071.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28041_28071):map__28041_28071);
var remote_id_changed_QMARK__28073 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28041_28072__$1,cljs.core.cst$kw$remote_DASH_id_DASH_changed_QMARK_);
var populated_from_remote_QMARK__28074 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28041_28072__$1,cljs.core.cst$kw$populated_DASH_from_DASH_remote_QMARK_);
var matching_planet_in_list_QMARK__28075 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28041_28072__$1,cljs.core.cst$kw$matching_DASH_planet_DASH_in_DASH_list_QMARK_);
if(cljs.core.truth_(remote_id_changed_QMARK__28073)){
om.next.transact_BANG_.cljs$core$IFn$_invoke$arity$2(this$,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sith_SLASH_populate_DASH_from_DASH_remote),cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$sith,sith_28069], null)))))),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id_28070], null))))))))))));
} else {
}

if(cljs.core.truth_(populated_from_remote_QMARK__28074)){
cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback.cljs$core$IFn$_invoke$arity$1(om.next.get_computed.cljs$core$IFn$_invoke$arity$1(this$)).call(null,id_28070);
} else {
}

ui_of_the_sith.scrollable_list.abort_and_restart_xhr_if_required(om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$));

return om.next.clear_prev_props_BANG_(this__20372__auto__);
});})(x28031_28066))
;

x28031_28066.componentWillUnmount = ((function (x28031_28066){
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

return ui_of_the_sith.scrollable_list.abort_xhr(om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$));
});})(x28031_28066))
;

x28031_28066.render = ((function (x28031_28066){
return (function (){
var this__20382__auto__ = this;
var this$ = this__20382__auto__;
var _STAR_reconciler_STAR_28044 = om.next._STAR_reconciler_STAR_;
var _STAR_depth_STAR_28045 = om.next._STAR_depth_STAR_;
var _STAR_shared_STAR_28046 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_28047 = om.next._STAR_instrument_STAR_;
var _STAR_parent_STAR_28048 = om.next._STAR_parent_STAR_;
om.next._STAR_reconciler_STAR_ = om.next.get_reconciler(this__20382__auto__);

om.next._STAR_depth_STAR_ = (om.next.depth(this__20382__auto__) + (1));

om.next._STAR_shared_STAR_ = om.next.shared.cljs$core$IFn$_invoke$arity$1(this__20382__auto__);

om.next._STAR_instrument_STAR_ = om.next.instrument(this__20382__auto__);

om.next._STAR_parent_STAR_ = this__20382__auto__;

try{var map__28049 = om.next.props(this$);
var map__28049__$1 = ((((!((map__28049 == null)))?((((map__28049.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28049.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28049):map__28049);
var props = map__28049__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28049__$1,cljs.core.cst$kw$sith_SLASH_name);
var homeworld = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28049__$1,cljs.core.cst$kw$sith_SLASH_homeworld);
var G__28051 = {"className": cljs.core.cst$kw$css_DASH_class.cljs$core$IFn$_invoke$arity$1(om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$))};
var G__28052 = om.util.force_children((function (){var G__28054 = null;
var G__28055 = om.util.force_children(name);
return React.DOM.h3(G__28054,G__28055);
})());
var G__28053 = om.util.force_children(((!((homeworld == null)))?(function (){var G__28056 = null;
var G__28057 = om.util.force_children([cljs.core.str("Homeworld: "),cljs.core.str(homeworld)].join(''));
return React.DOM.h6(G__28056,G__28057);
})():null));
return React.DOM.li(G__28051,G__28052,G__28053);
}finally {om.next._STAR_parent_STAR_ = _STAR_parent_STAR_28048;

om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_28047;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_28046;

om.next._STAR_depth_STAR_ = _STAR_depth_STAR_28045;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_28044;
}});})(x28031_28066))
;


ui_of_the_sith.scrollable_list.Slot.prototype.constructor = ui_of_the_sith.scrollable_list.Slot;

ui_of_the_sith.scrollable_list.Slot.prototype.om$isComponent = true;

var x28058_28076 = ui_of_the_sith.scrollable_list.Slot;
x28058_28076.om$next$Ident$ = true;

x28058_28076.om$next$Ident$ident$arity$2 = ((function (x28058_28076){
return (function (this$,p__28059){
var map__28060 = p__28059;
var map__28060__$1 = ((((!((map__28060 == null)))?((((map__28060.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28060.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28060):map__28060);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28060__$1,cljs.core.cst$kw$sith_SLASH_id);
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null);
});})(x28058_28076))
;

x28058_28076.om$next$IQuery$ = true;

x28058_28076.om$next$IQuery$query$arity$1 = ((function (x28058_28076){
return (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sith_SLASH_id,cljs.core.cst$kw$sith_SLASH_name,cljs.core.cst$kw$sith_SLASH_homeworld,cljs.core.cst$kw$sith_SLASH_remote_DASH_id,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,cljs.core.cst$kw$sith_SLASH_master_DASH_id,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id], null);
});})(x28058_28076))
;


var x28062_28077 = ui_of_the_sith.scrollable_list.Slot.prototype;
x28062_28077.om$next$Ident$ = true;

x28062_28077.om$next$Ident$ident$arity$2 = ((function (x28062_28077){
return (function (this$,p__28063){
var map__28064 = p__28063;
var map__28064__$1 = ((((!((map__28064 == null)))?((((map__28064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28064):map__28064);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28064__$1,cljs.core.cst$kw$sith_SLASH_id);
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$siths_SLASH_by_DASH_id,id], null);
});})(x28062_28077))
;

x28062_28077.om$next$IQuery$ = true;

x28062_28077.om$next$IQuery$query$arity$1 = ((function (x28062_28077){
return (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sith_SLASH_id,cljs.core.cst$kw$sith_SLASH_name,cljs.core.cst$kw$sith_SLASH_homeworld,cljs.core.cst$kw$sith_SLASH_remote_DASH_id,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_id,cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id,cljs.core.cst$kw$sith_SLASH_master_DASH_id,cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id], null);
});})(x28062_28077))
;


ui_of_the_sith.scrollable_list.Slot.cljs$lang$type = true;

ui_of_the_sith.scrollable_list.Slot.cljs$lang$ctorStr = "ui-of-the-sith.scrollable-list/Slot";

ui_of_the_sith.scrollable_list.Slot.cljs$lang$ctorPrWriter = (function (this__20445__auto__,writer__20446__auto__,opt__20447__auto__){
return cljs.core._write(writer__20446__auto__,"ui-of-the-sith.scrollable-list/Slot");
});
ui_of_the_sith.scrollable_list.slot = (function ui_of_the_sith$scrollable_list$slot(p__28078,sith){
var map__28081 = p__28078;
var map__28081__$1 = ((((!((map__28081 == null)))?((((map__28081.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28081.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28081):map__28081);
var state = map__28081__$1;
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28081__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var obi_wan_planet_match_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28081__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet_DASH_match_QMARK_);
var populate_from_remote_callback = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28081__$1,cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback);
var props = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([sith,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$obi_DASH_wan_DASH_planet,obi_wan_planet,cljs.core.cst$kw$matching_DASH_planet_DASH_in_DASH_list_QMARK_,obi_wan_planet_match_QMARK_], null)], 0));
var computed_props = om.next.computed(props,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback,populate_from_remote_callback], null));
return om.next.factory.cljs$core$IFn$_invoke$arity$2(ui_of_the_sith.scrollable_list.Slot,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$keyfn,cljs.core.cst$kw$sith_SLASH_id], null)).call(null,computed_props);
});
ui_of_the_sith.scrollable_list.set_list_state = (function ui_of_the_sith$scrollable_list$set_list_state(scrollable_list,p__28085){
var map__28088 = p__28085;
var map__28088__$1 = ((((!((map__28088 == null)))?((((map__28088.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28088.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28088):map__28088);
var props = map__28088__$1;
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28088__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var list = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28088__$1,cljs.core.cst$kw$siths_SLASH_list);
return om.next.set_state_BANG_(scrollable_list,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$at_DASH_start_QMARK_,(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(list,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$sith_SLASH_master_DASH_remote_DASH_id], null)) == null),cljs.core.cst$kw$at_DASH_end_QMARK_,(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(list,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(ui_of_the_sith.config.list_size - (1)),cljs.core.cst$kw$sith_SLASH_apprentice_DASH_remote_DASH_id], null)) == null),cljs.core.cst$kw$obi_DASH_wan_DASH_planet,obi_wan_planet,cljs.core.cst$kw$obi_DASH_wan_DASH_planet_DASH_match_QMARK_,cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__28088,map__28088__$1,props,obi_wan_planet,list){
return (function (p1__28083_SHARP_){
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(obi_wan_planet,p1__28083_SHARP_)) && (!((p1__28083_SHARP_ == null)));
});})(map__28088,map__28088__$1,props,obi_wan_planet,list))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__28088,map__28088__$1,props,obi_wan_planet,list){
return (function (p1__28084_SHARP_){
return cljs.core.cst$kw$sith_SLASH_homeworld.cljs$core$IFn$_invoke$arity$1(p1__28084_SHARP_);
});})(map__28088,map__28088__$1,props,obi_wan_planet,list))
,list))),cljs.core.cst$kw$scroll_DASH_button_DASH_callback,cljs.core.cst$kw$scroll_DASH_callback.cljs$core$IFn$_invoke$arity$1(om.next.get_computed.cljs$core$IFn$_invoke$arity$1(list)),cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback,cljs.core.cst$kw$populate_DASH_from_DASH_remote_DASH_callback.cljs$core$IFn$_invoke$arity$1(om.next.get_computed.cljs$core$IFn$_invoke$arity$1(list))], null));
});
/**
 * @constructor
 */
ui_of_the_sith.scrollable_list.ScrollableList = (function ui_of_the_sith$scrollable_list$ScrollableList(){
var this__20443__auto__ = this;
React.Component.apply(this__20443__auto__,arguments);

if(!((this__20443__auto__.initLocalState == null))){
this__20443__auto__.state = this__20443__auto__.initLocalState();
} else {
this__20443__auto__.state = {};
}

return this__20443__auto__;
});

ui_of_the_sith.scrollable_list.ScrollableList.prototype = goog.object.clone(React.Component.prototype);

var x28096_28113 = ui_of_the_sith.scrollable_list.ScrollableList.prototype;
x28096_28113.componentWillUpdate = ((function (x28096_28113){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
om.next.merge_pending_props_BANG_(this__20383__auto__);

return om.next.merge_pending_state_BANG_(this__20383__auto__);
});})(x28096_28113))
;

x28096_28113.shouldComponentUpdate = ((function (x28096_28113){
return (function (next_props__20384__auto__,next_state__20385__auto__){
var this__20383__auto__ = this;
var or__18243__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(om.next.props(this__20383__auto__),goog.object.get(next_props__20384__auto__,"omcljs$value"));
if(or__18243__auto__){
return or__18243__auto__;
} else {
var and__18231__auto__ = this__20383__auto__.state;
if(cljs.core.truth_(and__18231__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((function (){var G__28099 = this__20383__auto__.state;
var G__28100 = "omcljs$state";
return goog.object.get(G__28099,G__28100);
})(),goog.object.get(next_state__20385__auto__,"omcljs$state"));
} else {
return and__18231__auto__;
}
}
});})(x28096_28113))
;

x28096_28113.componentWillUnmount = ((function (x28096_28113){
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
});})(x28096_28113))
;

x28096_28113.componentDidUpdate = ((function (x28096_28113){
return (function (prev_props__20386__auto__,prev_state__20387__auto__){
var this__20383__auto__ = this;
return om.next.clear_prev_props_BANG_(this__20383__auto__);
});})(x28096_28113))
;

x28096_28113.isMounted = ((function (x28096_28113){
return (function (){
var this__20383__auto__ = this;
return cljs.core.boolean$(goog.object.getValueByKeys(this__20383__auto__,"_reactInternalInstance","_renderedComponent"));
});})(x28096_28113))
;

x28096_28113.componentWillMount = ((function (x28096_28113){
return (function (){
var this__20375__auto__ = this;
var this$ = this__20375__auto__;
var indexer__20376__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(om.next.get_reconciler(this__20375__auto__),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$config,cljs.core.cst$kw$indexer], null));
if((indexer__20376__auto__ == null)){
} else {
om.next.protocols.index_component_BANG_(indexer__20376__auto__,this__20375__auto__);
}

return ui_of_the_sith.scrollable_list.set_list_state(this$,om.next.props(this$));
});})(x28096_28113))
;

x28096_28113.componentWillReceiveProps = ((function (x28096_28113){
return (function (next_props__20367__auto__){
var this__20366__auto__ = this;
var this$ = this__20366__auto__;
var nextProps = om.next._next_props(next_props__20367__auto__,this__20366__auto__);
return ui_of_the_sith.scrollable_list.set_list_state(this$,nextProps);
});})(x28096_28113))
;

x28096_28113.render = ((function (x28096_28113){
return (function (){
var this__20382__auto__ = this;
var this$ = this__20382__auto__;
var _STAR_reconciler_STAR_28101 = om.next._STAR_reconciler_STAR_;
var _STAR_depth_STAR_28102 = om.next._STAR_depth_STAR_;
var _STAR_shared_STAR_28103 = om.next._STAR_shared_STAR_;
var _STAR_instrument_STAR_28104 = om.next._STAR_instrument_STAR_;
var _STAR_parent_STAR_28105 = om.next._STAR_parent_STAR_;
om.next._STAR_reconciler_STAR_ = om.next.get_reconciler(this__20382__auto__);

om.next._STAR_depth_STAR_ = (om.next.depth(this__20382__auto__) + (1));

om.next._STAR_shared_STAR_ = om.next.shared.cljs$core$IFn$_invoke$arity$1(this__20382__auto__);

om.next._STAR_instrument_STAR_ = om.next.instrument(this__20382__auto__);

om.next._STAR_parent_STAR_ = this__20382__auto__;

try{var map__28106 = om.next.props(this$);
var map__28106__$1 = ((((!((map__28106 == null)))?((((map__28106.cljs$lang$protocol_mask$partition0$ & (64))) || (map__28106.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__28106):map__28106);
var obi_wan_planet = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28106__$1,cljs.core.cst$kw$obi_DASH_wan_DASH_planet);
var list = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__28106__$1,cljs.core.cst$kw$siths_SLASH_list);
var G__28108 = {"className": "css-scrollable-list"};
var G__28109 = om.util.force_children(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(om.dom.ul,{"className": "css-slots"},cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__28108,map__28106,map__28106__$1,obi_wan_planet,list,_STAR_reconciler_STAR_28101,_STAR_depth_STAR_28102,_STAR_shared_STAR_28103,_STAR_instrument_STAR_28104,_STAR_parent_STAR_28105,this$,this__20382__auto__,x28096_28113){
return (function (p1__28090_SHARP_){
return ui_of_the_sith.scrollable_list.slot(om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$),p1__28090_SHARP_);
});})(G__28108,map__28106,map__28106__$1,obi_wan_planet,list,_STAR_reconciler_STAR_28101,_STAR_depth_STAR_28102,_STAR_shared_STAR_28103,_STAR_instrument_STAR_28104,_STAR_parent_STAR_28105,this$,this__20382__auto__,x28096_28113))
,list)));
var G__28110 = om.util.force_children(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(om.dom.div,{"className": "css-scroll-buttons"},cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__28108,G__28109,map__28106,map__28106__$1,obi_wan_planet,list,_STAR_reconciler_STAR_28101,_STAR_depth_STAR_28102,_STAR_shared_STAR_28103,_STAR_instrument_STAR_28104,_STAR_parent_STAR_28105,this$,this__20382__auto__,x28096_28113){
return (function (p1__28091_SHARP_){
return ui_of_the_sith.scrollable_list.scroll_button(om.next.get_state.cljs$core$IFn$_invoke$arity$1(this$),p1__28091_SHARP_);
});})(G__28108,G__28109,map__28106,map__28106__$1,obi_wan_planet,list,_STAR_reconciler_STAR_28101,_STAR_depth_STAR_28102,_STAR_shared_STAR_28103,_STAR_instrument_STAR_28104,_STAR_parent_STAR_28105,this$,this__20382__auto__,x28096_28113))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$up,cljs.core.cst$kw$down], null))));
return React.DOM.section(G__28108,G__28109,G__28110);
}finally {om.next._STAR_parent_STAR_ = _STAR_parent_STAR_28105;

om.next._STAR_instrument_STAR_ = _STAR_instrument_STAR_28104;

om.next._STAR_shared_STAR_ = _STAR_shared_STAR_28103;

om.next._STAR_depth_STAR_ = _STAR_depth_STAR_28102;

om.next._STAR_reconciler_STAR_ = _STAR_reconciler_STAR_28101;
}});})(x28096_28113))
;


ui_of_the_sith.scrollable_list.ScrollableList.prototype.constructor = ui_of_the_sith.scrollable_list.ScrollableList;

ui_of_the_sith.scrollable_list.ScrollableList.prototype.om$isComponent = true;

var x28111_28114 = ui_of_the_sith.scrollable_list.ScrollableList;


var x28112_28115 = ui_of_the_sith.scrollable_list.ScrollableList.prototype;


ui_of_the_sith.scrollable_list.ScrollableList.cljs$lang$type = true;

ui_of_the_sith.scrollable_list.ScrollableList.cljs$lang$ctorStr = "ui-of-the-sith.scrollable-list/ScrollableList";

ui_of_the_sith.scrollable_list.ScrollableList.cljs$lang$ctorPrWriter = (function (this__20445__auto__,writer__20446__auto__,opt__20447__auto__){
return cljs.core._write(writer__20446__auto__,"ui-of-the-sith.scrollable-list/ScrollableList");
});
ui_of_the_sith.scrollable_list.scrollable_list = om.next.factory.cljs$core$IFn$_invoke$arity$1(ui_of_the_sith.scrollable_list.ScrollableList);
