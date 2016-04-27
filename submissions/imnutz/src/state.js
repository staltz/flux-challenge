"use strict";

var h = require("snabbdom/h");
var theme = require("./theme");

var _action,
    _view;

var state = {
    init: function initState(action, view) {
        _action = action;
        _view = view;
    },

    representation: function representation(model) {
        var representation = h("div.app-container", [
            h("div.css-root", [
                theme.header(model.planet.name),
                h("section.css-scrollable-list", [
                    theme.sithList(model.siths),
                    theme.buttons(model.disabledUp, model.disabledDown, _action)
                ])
            ])
        ]);       

        _view.display(representation);
    },

    nap: function nextAction(model) {
        if(model.initialize) {
            _action.fetchSith(model.sithId);
        } else if(!model.hasWebSocketData && (model.shouldFetchApprentice || model.shouldFetchMaster)) {
            _action.fetchSith(model.sithId);
        }
    },

    render: function(model) {
        state.representation(model);
        state.nap(model);
    }
}

module.exports = state;