
var Request = (function () {
	
	var post = function(call,params,cb) {
		var opts = {
			send: 'POST',
			call: call,
			params: makeParams(params)
		}
		sendRequest(opts,function(data){
			cb(data);
		});
	};

	var get = function(call,params,cb) {
		var opts = {
			send: 'GET',
			call: call,
			params: makeParams(params)
		}
		sendRequest(opts,function(data){
			cb(data);
		});
	};

	function makeParams(params) {
		var rs = '', n = 0, i;
		for(i in params) {
			if (n > 0 ) rs+= "&";
			rs+= i+'='+params[i];
			n++;
		}
		return rs;
	}

	function sendRequest(opts,cb){		
		var xhr = createXHR();
		xhr.onreadystatechange = function(){	
			if (xhr.readyState === 4){
				//console.log(xhr.responseText);
				//cb(xhr.responseText);
				cb(JSON.parse(xhr.responseText));
			}
		}
		xhr.open(opts.send, opts.call, true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader("Content-length", opts.params.length);
		xhr.setRequestHeader("Connection", "close");
		xhr.send(opts.params);
	}

	function createXHR() {
		var xhr;
		if (window.ActiveXObject){		
			try {		
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				console.log(e.message);
				xhr = null;
			}
		} else {
			xhr = new XMLHttpRequest();
		}
		return xhr;
	}

	return {
		post: post,
		get: get
	};

})();
