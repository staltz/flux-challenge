
(function (App) {

    var _evts = {};

    var on = function(key,cb){
        var evt = _getEvt(key)
        evt.subs.push({
            cb: cb
        });
    };

    var trigger = function(key,error,data){
        var evt = _getEvt(key);
        evt.fired_once = true;
        evt.error = error;
        evt.data = data;
        _fireSubs(key);
    };

    function _getEvt(key){
        if (typeof(_evts[key]) == 'undefined') {
            _evts[key] = {
                subs: []
            };
        }
        return _evts[key];
    }

    function _fireSubs(key){
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
    }

    function _arrayFilter(arr,cb,start){
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
    }

	App.dispatcher = {
		trigger: trigger,
		on: on
	};

})(App);
