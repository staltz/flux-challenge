
var Dispatcher = (function (Event) {

	return {
		trigger: Event.trigger,
		on: Event.on
	};

})(Event);
