"use strict";

var reqwest = require("reqwest");

var url = "http://localhost:3000/dark-jedis";

var _present,
    _xhrs = {};

var action = {
    init: function initAction(present) {
        _present = present;
    },

    handleWebSocketData: function(wsData) {
        var data = {
            hasWebSocketData: true,
            planet: wsData
        };

        _present(data);
    },

    fetchSith: function fetchSith(sithId) {
        var xhr = reqwest({
                url: [url, sithId].join("/"),
                success: function(response) {
                    if(_xhrs[sithId]) {
                        _xhrs[sithId] = null;
                    }

                    _present({ sith: response });
                }
        });
       
        _xhrs[sithId] = xhr; 
    },

    moveUp: function moveUp() {
        // abort all pending requests
        action.abortXhrs();
        
        _present({ moveUp: true });
    },

    moveDown: function moveUp() {
        // abort all pending requests
        action.abortXhrs();

        _present({ moveDown: true });
    },

    toggleUpDown: function toggleUpDown() {
        _present({ shouldToggleUpDown: true });
    },

    abortXhrs: function abortXhrs() {
        Object.keys(_xhrs).forEach(function(xhrKey) {
            if(_xhrs[xhrKey]) {
                _xhrs[xhrKey].abort();
            }
        });
    }
};

module.exports = action;