"use strict";

var state = require("./src/state");
var action = require("./src/action");
var model = require("./src/model");
var view = require("./src/view");

var websocket = require("./src/socket");
var main = require("./src/main");

main.run(state, action, model, view, websocket);