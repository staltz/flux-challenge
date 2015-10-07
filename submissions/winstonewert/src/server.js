function missingDarkJedi(state) {
	var obiwan_should_investigate = _.some(state.dark_jedi, (dark_jedi) => dark_jedi.homeworld && dark_jedi.homeworld.id == state.obiwan_location.id);
	var missing = [];
	if (!obiwan_should_investigate) {
		for (var entry of state.dark_jedi) {
			if (entry.id && !entry.name) {
				missing.push(entry.id);
			}
		}
	}
	return missing;
}

export function serverMiddleware(store) {
	var obiwan_socket = new WebSocket("ws://localhost:4000");
	obiwan_socket.onmessage = function (event) {
		store.dispatch({
			type: "OBIWAN_LOCATION_CHANGE",
			payload: JSON.parse(event.data)
		});
	}

	var dark_jedi_requests = {}

	return function(next) {
		return function(action) {
			var result = next(action);

			var old_dark_jedi_requests = dark_jedi_requests;
			dark_jedi_requests = {};
			for(var id of missingDarkJedi(store.getState())) {
				var request = old_dark_jedi_requests[id];
				delete old_dark_jedi_requests[id];

				if (!request) {
					var request = new XMLHttpRequest();
					request.open("GET", "http://localhost:3000/dark-jedis/" + id);
					request.responseType = "json";
					request.addEventListener("load", (event) => {
						store.dispatch({
							type: "LOAD_DARK_JEDI",
							payload: request.response
						});
					});
					dark_jedi_requests[id] = request;
					request.send();
				}
			}

			_.forIn(old_dark_jedi_requests, (request) => {
				request.abort();
			});
			return result;
		}
	}
}
