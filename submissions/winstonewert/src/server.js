import {obiwanShouldInvestigate} from './data';

function missingDarkJedi(state) {
	// Given the state, return the list of dark jedi we should be looking up.
	var missing = [];
	if (obiwanShouldInvestigate(state)) {
		// If obiwan is investigating, don't make any requests.
		return [];
	} else {
		// We should be looking up every jedi for whom
		// we have an id, but not the name.
		return _.chain(state.dark_jedi)
			.filter((jedi) => jedi.id && !jedi.name)
			.map((jedi) => jedi.id)
			.value();
	}
}

export function serverMiddleware(store) {
	// Listen to the websocket for obi-wan changes.
	var obiwan_socket = new WebSocket("ws://localhost:4000");
	obiwan_socket.addEventListener("message", function (event) {
		store.dispatch({
			type: "OBIWAN_LOCATION_CHANGE",
			payload: JSON.parse(event.data)
		});
	});

	var dark_jedi_requests = {}

	function update_requests() {
		// The approach here is inspired by the react approach to 
		// dom diffing. At any point in time the missingDarkJedi function
		// will give me the list of dark jedi I should be requesting. I
		// compare to the list of requests I'm currently making and
		// either add or cancel requests to make sure my current requests
		// matches with what I want to request.
		var old_dark_jedi_requests = dark_jedi_requests;
		dark_jedi_requests = {};
		for(var id of missingDarkJedi(store.getState())) {
			var request = old_dark_jedi_requests[id];

			if (!request) {
				// In this case, we aren't already making a request for
				// this dark jedi, so we go ahead and do that.
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
			} else {
				// We already started this request, so remove it from
				// the list of old requests, that way when this function
				// finished, we'll know that all remaining requests
				// aren't wanted anymore.
				delete old_dark_jedi_requests[id];
			}
		}

		// Cancel all the requests that weren't wanted anymore.
		_.forIn(old_dark_jedi_requests, (request) => {
			request.abort();
		});
	}

	update_requests();

	return function(next) {
		return function(action) {
			var result = next(action);
			update_requests();
			return result;
		}
	}
}
