function missingDarkJedi(state) {
	var missing = [];
	for (var entry of state.dark_jedi) {
		if (entry.id && !entry.name) {
			missing.push(entry.id);
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
				var request = new XMLHttpRequest();
				request.open("GET", "http://localhost:3000/dark-jedis/" + id);
				request.responseType = "json";
				request.addEventListener("load", (event) => {
					store.dispatch({
						type: "LOAD_DARK_JEDI",
						payload: request.response
					});
				});
				request.send();

			}
			return result;
		}
	}
}
