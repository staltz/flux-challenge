
var Store = (function () {

	return {
		get: function() {},
		set: function(store,id,data) {
			if (!store[id]) return store[id] = data;
			store[id].push(data);
		}
	};

})();
