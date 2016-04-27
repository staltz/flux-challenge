"use strict";

var run = function(state, action, model, view, websocket) {
    state.init(action, view);
    model.setRender(state.render);

    action.init(model.present);
    websocket.bootstrap(action.handleWebSocketData);

    view.display(view.init(model.init(), action));
};

module.exports = {
    run: run
};