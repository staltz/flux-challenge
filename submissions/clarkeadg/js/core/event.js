
var Event = (function () {

	var _evts = {};

    var on = function(key,cb){
        var evt = _getEvt(key)
        evt.subs.push({
            cb: cb
        });
    };

    var ready = function(key,cb){
        var evt = _getEvt(key);
        if (evt.fired_once) {
            cb(evt.error,evt.data);
        } else {
            evt.subs.push({
                cb: cb,
                type_ready: true
            });
        }
    };

    var off = function(key,cb){
        var evt;
        if (!_evts[key]) return;
        evt = _getEvt(key);
        if (typeof(cb) == 'undefined') {
            evt.subs = [];
        } else {
        	for (var i in evt.subs) {
        		var sub = evt.subs[i];
                // checking !sub in case this is called in callback inside fireSubs
                if (!sub || sub.cb == cb) {
                    evt.subs[i] = null;
                }
            };
            _arrayFilter(evt.subs,function(sub){
                return sub !== null;
            });
        }
    };

    var trigger = function(key,error,data){
        var evt = _getEvt(key);
        evt.fired_once = true;
        evt.error = error;
        evt.data = data;
        _fireSubs(key);
    };

    var _getEvt = function(key){
        if (typeof(_evts[key]) == 'undefined') {
            _evts[key] = {
                subs: []
            };
        }
        return _evts[key];
    };

    var _fireSubs = function(key){
        var evt = _getEvt(key);
        for (var i in evt.subs.slice(0)) {
        	var sub = evt.subs.slice(0)[i];
            sub.cb(evt.error,evt.data);
        };
		for (var i in evt.subs) {
			var sub = evt.subs[i];
            if (sub.type_ready)
                evt.subs[i] = null;
        };
        _arrayFilter(evt.subs,function(sub){
            return sub !== null;
        });
    };

    var _arrayFilter = function(arr,cb,start){
        var i,c;
        start = typeof(start) == 'number' ? start : 0;
        for (i=start,c=arr.length;i<c;++i) {
            if (!cb(arr[i])) {
                arr.splice(i,1);
                _arrayFilter(arr,cb,i);
                break;
            }
        };
        return arr;
    };

    return {
        on: on,
        ready: ready,
        off: off,
        trigger: trigger
    };

})();
