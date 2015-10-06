export function serverMiddleware(store) {
	var obiwan_socket = new WebSocket("ws://localhost:4000");
	obiwan_socket.onmessage = function (event) {
		store.dispatch({
			type: "OBIWAN_LOCATION_CHANGE",
			payload: JSON.parse(event.data)
		});
	}

	return function(next) {
		return function(action) {
			return next(action);
		}
	}
}
