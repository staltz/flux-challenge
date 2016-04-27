"use strict";

var model = {
    initialize: true,

    sithsOnPage: 5,
    planet: "",
    siths: [],

    lastFetchedSith: null,
    disabledUp: false,
    disabledDown: false,

    sithId: 3616
};

var _render,
    _ws;

model.setRender = function setRender(render) {
    _render = render;
};

model.present = function present(data) {
    if(data.hasWebSocketData) {
        model.hasWebSocketData = data.hasWebSocketData;
        model.planet = data.planet;

        if(model.shouldHighlightSith(data.planet)) {
            model.disabledDown = true;
            model.disabledUp = true;
        } else {
            model.toggleUpDown(model.siths);
        }
        model.toggleHighlight(data.planet);

        _render(model);
        return;
    } else {
        model.hasWebSocketData = false;
    }

    if(model.initialize && data.sith) {
        model.initialize = false;
        model.appendSith(data.sith);

        if(data.sith.apprentice.id) {
            model.shouldFetchApprentice = true;
            model.sithId = data.sith.apprentice.id;
        }

        _render(model);
        return;
    }

    if(model.shouldFetchApprentice && data.sith) {
        model.appendSith(data.sith);

        if (!data.sith.apprentice.id) {
            model.disabledDown = true;
            model.shouldFetchApprentice = false;
        } else if(!model.hasRoom()) {
            model.shouldFetchApprentice = false;
        } else {
            model.sithId = data.sith.apprentice.id;
        }

        _render(model);
        return;
    }

    if(model.shouldFetchMaster && data.sith) {
        model.prependSith(data.sith);

        if (!data.sith.master.id) {
            model.disabledUp = true;
            model.shouldFetchMaster = false;
        } else if(!model.hasRoom()) {
            model.shouldFetchMaster = false;
        } else {
            model.disabledUp = false;
            model.sithId = data.sith.master.id;
        }

        _render(model);
        return;       
    }

    if(data.moveUp) {
        var firstSith = model.siths[0],
            lastSith;

        if(firstSith.id && firstSith.master.id) {
            model.shouldFetchMaster = true;
            model.sithId = firstSith.master.id;
        }

        model.moveListUp();

        lastSith = model.siths[model.siths.length - 1];
        if(lastSith.apprentice.id) {
            model.disabledDown = false;
        }

        _render(model);
        return;
    }

    if(data.moveDown) {
        var firstSith,
            lastSith = model.siths[model.siths.length - 1];

        if(lastSith.id && lastSith.apprentice.id) {
            model.shouldFetchApprentice = true;
            model.sithId = lastSith.apprentice.id;
        }

        model.moveListDown();

        firstSith = model.siths[0];
        if(firstSith.master.id) {
            model.disabledUp = false;
        }

        _render(model);
        return;
    }
};

model.init = function initModel() {
    for(var i = 0; i < model.sithsOnPage; i++) {
        model.siths.push({});
    }

    return model;
};

model.shouldHighlightSith = function getSithOnPlanet(planet) {
    return model.siths.filter(function(sith) {
        return sith.id && sith.homeworld.id === planet.id;
    }).length;
};

model.toggleHighlight = function checkSithForCurrentPlanet(planet) {
    model.siths.forEach(function(sith) {
        if(sith.id && sith.homeworld.id === planet.id) {
            sith.highlight = true;
        } else {
            sith.highlight = false;
        }
    });
};

model.moveListUp = function moveListUp() {
    model.siths.splice(-2);
    model.siths.unshift({});
    model.siths.unshift({});
};

model.moveListDown = function moveListUp() {
    model.siths.splice(0, 2);
    model.siths.push({});
    model.siths.push({});
};

model.appendSith = function appendSith(appendedSith) {
    for(var i = 0; i < model.siths.length; i++) {
        if(!model.siths[i].id) {
            model.siths[i].id = appendedSith.id;
            model.siths[i].name = appendedSith.name;
            model.siths[i].homeworld = appendedSith.homeworld;
            model.siths[i].apprentice = appendedSith.apprentice;
            model.siths[i].master = appendedSith.master;

            break;
        }
    }
};
model.prependSith = function prependSith(prependedSith) {
    for(var i = model.siths.length - 1; i >= 0; i--) {
        if(!model.siths[i].id) {
            model.siths[i].id = prependedSith.id;
            model.siths[i].name = prependedSith.name;
            model.siths[i].homeworld = prependedSith.homeworld;
            model.siths[i].apprentice = prependedSith.apprentice;
            model.siths[i].master = prependedSith.master;

            break;
        }
    }
};

model.toggleUpDown = function toggleUpDown(siths) {
    var firstSith = siths[0],
        lastSith = siths[siths.length - 1];

    if(firstSith.id && firstSith.master.id) {
        model.disabledUp = false;
    }

    if(lastSith.id && lastSith.apprentice.id) {
        model.disabledDown = false;
    }   
};

model.hasRoom = function isListFull() {
    return model.siths.filter(function(sith) {
        return !sith.id;
    }).length;
};

module.exports = model;