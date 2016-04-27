"use strict";

var patch = require("snabbdom").init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);
var h = require("snabbdom/h");

var theme = require("./theme");

var root = document.querySelector("#app");

var view = {
    init: function initView(model, action) {
        return h("div.app-container", [
            h("div.css-root", [
                theme.header(model.planet),
                h("section.css-scrollable-list", [
                    theme.sithList(model.siths),
                    theme.buttons(false, false, action)
                ])
            ])
        ]);
    },

    display: function display(representation) {
        root = patch(root, representation);
    }
};

module.exports = view;