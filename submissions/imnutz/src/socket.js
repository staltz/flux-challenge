"use strict";

var _ws;

var websocket = {
    bootstrap: function bootstrap(handler) {
        _ws = new WebSocket("ws://localhost:4000");
        _ws.onmessage = function (event) {
            handler(JSON.parse(event.data));
        };
    }
};

module.exports = websocket;