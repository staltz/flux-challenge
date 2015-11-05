// Compiled by ClojureScript 1.7.122 {}
goog.provide('chord.format');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.reader');
goog.require('clojure.walk');
goog.require('cognitect.transit');

/**
 * @interface
 */
chord.format.ChordFormatter = function(){};

chord.format.freeze = (function chord$format$freeze(_,obj){
if((!((_ == null))) && (!((_.chord$format$ChordFormatter$freeze$arity$2 == null)))){
return _.chord$format$ChordFormatter$freeze$arity$2(_,obj);
} else {
var x__16974__auto__ = (((_ == null))?null:_);
var m__16975__auto__ = (chord.format.freeze[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,_,obj);
} else {
var m__16975__auto____$1 = (chord.format.freeze["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,_,obj);
} else {
throw cljs.core.missing_protocol.call(null,"ChordFormatter.freeze",_);
}
}
}
});

chord.format.thaw = (function chord$format$thaw(_,s){
if((!((_ == null))) && (!((_.chord$format$ChordFormatter$thaw$arity$2 == null)))){
return _.chord$format$ChordFormatter$thaw$arity$2(_,s);
} else {
var x__16974__auto__ = (((_ == null))?null:_);
var m__16975__auto__ = (chord.format.thaw[goog.typeOf(x__16974__auto__)]);
if(!((m__16975__auto__ == null))){
return m__16975__auto__.call(null,_,s);
} else {
var m__16975__auto____$1 = (chord.format.thaw["_"]);
if(!((m__16975__auto____$1 == null))){
return m__16975__auto____$1.call(null,_,s);
} else {
throw cljs.core.missing_protocol.call(null,"ChordFormatter.thaw",_);
}
}
}
});

if(typeof chord.format.formatter_STAR_ !== 'undefined'){
} else {
chord.format.formatter_STAR_ = (function (){var method_table__17232__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17233__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17234__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17235__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17236__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"chord.format","formatter*"),new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17236__auto__,method_table__17232__auto__,prefer_table__17233__auto__,method_cache__17234__auto__,cached_hierarchy__17235__auto__));
})();
}
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"edn","edn",1317840885),(function (_){
if(typeof chord.format.t_chord$format24197 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format24197 = (function (_,meta24198){
this._ = _;
this.meta24198 = meta24198;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format24197.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24199,meta24198__$1){
var self__ = this;
var _24199__$1 = this;
return (new chord.format.t_chord$format24197(self__._,meta24198__$1));
});

chord.format.t_chord$format24197.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24199){
var self__ = this;
var _24199__$1 = this;
return self__.meta24198;
});

chord.format.t_chord$format24197.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format24197.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return cljs.core.pr_str.call(null,obj);
});

chord.format.t_chord$format24197.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return cljs.reader.read_string.call(null,s);
});

chord.format.t_chord$format24197.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta24198","meta24198",1117723139,null)], null);
});

chord.format.t_chord$format24197.cljs$lang$type = true;

chord.format.t_chord$format24197.cljs$lang$ctorStr = "chord.format/t_chord$format24197";

chord.format.t_chord$format24197.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.format/t_chord$format24197");
});

chord.format.__GT_t_chord$format24197 = (function chord$format$__GT_t_chord$format24197(___$1,meta24198){
return (new chord.format.t_chord$format24197(___$1,meta24198));
});

}

return (new chord.format.t_chord$format24197(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"json","json",1279968570),(function (_){
if(typeof chord.format.t_chord$format24200 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format24200 = (function (_,meta24201){
this._ = _;
this.meta24201 = meta24201;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format24200.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24202,meta24201__$1){
var self__ = this;
var _24202__$1 = this;
return (new chord.format.t_chord$format24200(self__._,meta24201__$1));
});

chord.format.t_chord$format24200.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24202){
var self__ = this;
var _24202__$1 = this;
return self__.meta24201;
});

chord.format.t_chord$format24200.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format24200.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return JSON.stringify(cljs.core.clj__GT_js.call(null,obj));
});

chord.format.t_chord$format24200.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (this$,s){
var self__ = this;
var this$__$1 = this;
return cljs.core.js__GT_clj.call(null,JSON.parse(s));
});

chord.format.t_chord$format24200.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta24201","meta24201",132406301,null)], null);
});

chord.format.t_chord$format24200.cljs$lang$type = true;

chord.format.t_chord$format24200.cljs$lang$ctorStr = "chord.format/t_chord$format24200";

chord.format.t_chord$format24200.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.format/t_chord$format24200");
});

chord.format.__GT_t_chord$format24200 = (function chord$format$__GT_t_chord$format24200(___$1,meta24201){
return (new chord.format.t_chord$format24200(___$1,meta24201));
});

}

return (new chord.format.t_chord$format24200(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"json-kw","json-kw",341203175),(function (opts){
var json_formatter = chord.format.formatter_STAR_.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570)));
if(typeof chord.format.t_chord$format24203 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format24203 = (function (opts,json_formatter,meta24204){
this.opts = opts;
this.json_formatter = json_formatter;
this.meta24204 = meta24204;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format24203.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (json_formatter){
return (function (_24205,meta24204__$1){
var self__ = this;
var _24205__$1 = this;
return (new chord.format.t_chord$format24203(self__.opts,self__.json_formatter,meta24204__$1));
});})(json_formatter))
;

chord.format.t_chord$format24203.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (json_formatter){
return (function (_24205){
var self__ = this;
var _24205__$1 = this;
return self__.meta24204;
});})(json_formatter))
;

chord.format.t_chord$format24203.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format24203.prototype.chord$format$ChordFormatter$freeze$arity$2 = ((function (json_formatter){
return (function (_,obj){
var self__ = this;
var ___$1 = this;
return chord.format.freeze.call(null,self__.json_formatter,obj);
});})(json_formatter))
;

chord.format.t_chord$format24203.prototype.chord$format$ChordFormatter$thaw$arity$2 = ((function (json_formatter){
return (function (_,s){
var self__ = this;
var ___$1 = this;
return clojure.walk.keywordize_keys.call(null,chord.format.thaw.call(null,self__.json_formatter,s));
});})(json_formatter))
;

chord.format.t_chord$format24203.getBasis = ((function (json_formatter){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"json-formatter","json-formatter",-485654307,null),new cljs.core.Symbol(null,"meta24204","meta24204",860520916,null)], null);
});})(json_formatter))
;

chord.format.t_chord$format24203.cljs$lang$type = true;

chord.format.t_chord$format24203.cljs$lang$ctorStr = "chord.format/t_chord$format24203";

chord.format.t_chord$format24203.cljs$lang$ctorPrWriter = ((function (json_formatter){
return (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.format/t_chord$format24203");
});})(json_formatter))
;

chord.format.__GT_t_chord$format24203 = ((function (json_formatter){
return (function chord$format$__GT_t_chord$format24203(opts__$1,json_formatter__$1,meta24204){
return (new chord.format.t_chord$format24203(opts__$1,json_formatter__$1,meta24204));
});})(json_formatter))
;

}

return (new chord.format.t_chord$format24203(opts,json_formatter,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"transit-json","transit-json",1168016579),(function (_){
if(typeof chord.format.t_chord$format24206 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format24206 = (function (_,meta24207){
this._ = _;
this.meta24207 = meta24207;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format24206.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24208,meta24207__$1){
var self__ = this;
var _24208__$1 = this;
return (new chord.format.t_chord$format24206(self__._,meta24207__$1));
});

chord.format.t_chord$format24206.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24208){
var self__ = this;
var _24208__$1 = this;
return self__.meta24207;
});

chord.format.t_chord$format24206.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format24206.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return cognitect.transit.write.call(null,cognitect.transit.writer.call(null,new cljs.core.Keyword(null,"json","json",1279968570)),obj);
});

chord.format.t_chord$format24206.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return cognitect.transit.read.call(null,cognitect.transit.reader.call(null,new cljs.core.Keyword(null,"json","json",1279968570)),s);
});

chord.format.t_chord$format24206.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta24207","meta24207",1113688603,null)], null);
});

chord.format.t_chord$format24206.cljs$lang$type = true;

chord.format.t_chord$format24206.cljs$lang$ctorStr = "chord.format/t_chord$format24206";

chord.format.t_chord$format24206.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.format/t_chord$format24206");
});

chord.format.__GT_t_chord$format24206 = (function chord$format$__GT_t_chord$format24206(___$1,meta24207){
return (new chord.format.t_chord$format24206(___$1,meta24207));
});

}

return (new chord.format.t_chord$format24206(_,cljs.core.PersistentArrayMap.EMPTY));
}));
cljs.core._add_method.call(null,chord.format.formatter_STAR_,new cljs.core.Keyword(null,"str","str",1089608819),(function (_){
if(typeof chord.format.t_chord$format24209 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {chord.format.ChordFormatter}
*/
chord.format.t_chord$format24209 = (function (_,meta24210){
this._ = _;
this.meta24210 = meta24210;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
chord.format.t_chord$format24209.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_24211,meta24210__$1){
var self__ = this;
var _24211__$1 = this;
return (new chord.format.t_chord$format24209(self__._,meta24210__$1));
});

chord.format.t_chord$format24209.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_24211){
var self__ = this;
var _24211__$1 = this;
return self__.meta24210;
});

chord.format.t_chord$format24209.prototype.chord$format$ChordFormatter$ = true;

chord.format.t_chord$format24209.prototype.chord$format$ChordFormatter$freeze$arity$2 = (function (___$1,obj){
var self__ = this;
var ___$2 = this;
return obj;
});

chord.format.t_chord$format24209.prototype.chord$format$ChordFormatter$thaw$arity$2 = (function (___$1,s){
var self__ = this;
var ___$2 = this;
return s;
});

chord.format.t_chord$format24209.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Symbol(null,"meta24210","meta24210",-617084847,null)], null);
});

chord.format.t_chord$format24209.cljs$lang$type = true;

chord.format.t_chord$format24209.cljs$lang$ctorStr = "chord.format/t_chord$format24209";

chord.format.t_chord$format24209.cljs$lang$ctorPrWriter = (function (this__16917__auto__,writer__16918__auto__,opt__16919__auto__){
return cljs.core._write.call(null,writer__16918__auto__,"chord.format/t_chord$format24209");
});

chord.format.__GT_t_chord$format24209 = (function chord$format$__GT_t_chord$format24209(___$1,meta24210){
return (new chord.format.t_chord$format24209(___$1,meta24210));
});

}

return (new chord.format.t_chord$format24209(_,cljs.core.PersistentArrayMap.EMPTY));
}));
chord.format.formatter = (function chord$format$formatter(opts){
return chord.format.formatter_STAR_.call(null,(((opts instanceof cljs.core.Keyword))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"format","format",-1306924766),opts], null):opts));
});
chord.format.wrap_format = (function chord$format$wrap_format(p__24213,p__24214){
var map__24223 = p__24213;
var map__24223__$1 = ((((!((map__24223 == null)))?((((map__24223.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24223.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24223):map__24223);
var read_ch = cljs.core.get.call(null,map__24223__$1,new cljs.core.Keyword(null,"read-ch","read-ch",-38486414));
var write_ch = cljs.core.get.call(null,map__24223__$1,new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599));
var map__24224 = p__24214;
var map__24224__$1 = ((((!((map__24224 == null)))?((((map__24224.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24224.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24224):map__24224);
var opts = map__24224__$1;
var format = cljs.core.get.call(null,map__24224__$1,new cljs.core.Keyword(null,"format","format",-1306924766));
var fmtr = chord.format.formatter.call(null,(cljs.core.truth_(format)?opts:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"edn","edn",1317840885)], null)));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",-38486414),cljs.core.async.map_LT_.call(null,((function (fmtr,map__24223,map__24223__$1,read_ch,write_ch,map__24224,map__24224__$1,opts,format){
return (function (p__24227){
var map__24228 = p__24227;
var map__24228__$1 = ((((!((map__24228 == null)))?((((map__24228.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24228.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24228):map__24228);
var message = cljs.core.get.call(null,map__24228__$1,new cljs.core.Keyword(null,"message","message",-406056002));
try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),chord.format.thaw.call(null,fmtr,message)], null);
}catch (e24230){if((e24230 instanceof Error)){
var e = e24230;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-format","invalid-format",-72676108),new cljs.core.Keyword(null,"cause","cause",231901252),e,new cljs.core.Keyword(null,"invalid-msg","invalid-msg",-1474361625),message], null);
} else {
throw e24230;

}
}});})(fmtr,map__24223,map__24223__$1,read_ch,write_ch,map__24224,map__24224__$1,opts,format))
,read_ch),new cljs.core.Keyword(null,"write-ch","write-ch",-1766585599),cljs.core.async.map_GT_.call(null,((function (fmtr,map__24223,map__24223__$1,read_ch,write_ch,map__24224,map__24224__$1,opts,format){
return (function (p1__24212_SHARP_){
return chord.format.freeze.call(null,fmtr,p1__24212_SHARP_);
});})(fmtr,map__24223,map__24223__$1,read_ch,write_ch,map__24224,map__24224__$1,opts,format))
,write_ch)], null);
});

//# sourceMappingURL=format.js.map?rel=1446554830032