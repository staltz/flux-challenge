var ddom_1 = require('ddom');
var immutable_1 = require('immutable');
var derivable_1 = require('derivable');
var request_1 = require('./request');
var model_1 = require('./model');
var util_1 = require('./util');
var React = { createElement: ddom_1.dom };
var obiwanIsHere = derivable_1.atom(null);
var _a = derivable_1.destruct(obiwanIsHere, 'id', 'name'), currentWorldId = _a[0], currentWorldName = _a[1];
new WebSocket('ws://localhost:4000').onmessage = function (msg) {
    obiwanIsHere.set(JSON.parse(msg.data));
};
var siths = derivable_1.atom(immutable_1.List([
    null, null, 'http://localhost:3000/dark-jedis/3616', null, null
]));
function sithMatches(sith, currentWorldId) {
    return sith && !util_1.isString(sith) && sith.homeworld.id === currentWorldId;
}
var matchingSith = currentWorldId.derive(function (id) {
    return siths.get().filter(function (s) { return sithMatches(s, id); }).first();
});
var currentSithRequests = siths.derive(function (ss) { return immutable_1.Set(ss.filter(util_1.isString)); });
var activeSithRequests = matchingSith.then(immutable_1.Set(), currentSithRequests);
var requestReactor = (function () {
    var oldRequests = immutable_1.Set();
    return activeSithRequests.reactor(function (newRequests) {
        var toKill = oldRequests.subtract(newRequests);
        toKill.forEach(request_1.Request.cancel);
        var toStart = newRequests.subtract(oldRequests);
        toStart.forEach(function (url) {
            request_1.Request.create(url, function (sith) { return siths.swap(model_1.completeRequest, url, sith); });
        });
        oldRequests = newRequests;
    });
})();
var numSiths = siths.derive(function (ss) { return ss.filter(function (s) { return s !== null; }).count(); });
var oneSith = numSiths.is(1);
var firstSith = siths.derive(function (ss) { return ss.first(); });
var lastSith = siths.derive(function (ss) { return ss.last(); });
var oneSithAtBottom = oneSith.and(lastSith);
var firstSithHasNoMaster = firstSith.mDerive(function (s) { return !util_1.isString(s) && !s.master.url; });
var upDisabled = matchingSith.or(oneSithAtBottom)
    .or(firstSithHasNoMaster);
var oneSithAtTop = oneSith.and(firstSith);
var lastSithHasNoApprentice = lastSith.mDerive(function (s) { return !util_1.isString(s) && !s.apprentice.url; });
var downDisabled = matchingSith.or(oneSithAtTop)
    .or(lastSithHasNoApprentice);
var twoSiths = numSiths.is(2);
var twoSithsAtBottom = twoSiths.and(lastSith);
var numToMoveUp = twoSithsAtBottom.then(1, 2);
var twoSithsAtTop = twoSiths.and(firstSith);
var numToMoveDown = twoSithsAtTop.then(1, 2);
function scrollButton(klass, disabled, fn, num) {
    return (React.createElement("button", {"$class": ["css-button-" + klass, { "css-button-disabled": disabled }], "onclick": disabled.then(null, function () { return siths.swap(fn, num.get()); })}));
}
var upButton = scrollButton('up', upDisabled, model_1.up, numToMoveUp);
var downButton = scrollButton('down', downDisabled, model_1.down, numToMoveDown);
function sithListItem(name, homeworld) {
    var atHomeworld = currentWorldName.is(homeworld);
    var textColor = atHomeworld.then("red", "white");
    return (React.createElement("li", {"$class": "css-slot", "$style": { color: textColor }}, React.createElement("h3", null, name), React.createElement("h6", null, homeworld && "Homeworld: " + homeworld)));
}
function renderSith(sith) {
    if (sith && !util_1.isString(sith)) {
        return sithListItem(sith.name, sith.homeworld.name);
    }
    else {
        return sithListItem("", "");
    }
}
var sithList = (React.createElement("ul", {"$class": "css-slots"}, siths.derive(function (ss) { return ss.map(renderSith); })));
var app = (React.createElement("div", {"$class": "css-root"}, React.createElement("h1", {"$class": "css-planet-monitor"}, "Obi-Wan currently on ", currentWorldName), React.createElement("section", {"$class": "css-scrollable-list"}, sithList, React.createElement("div", {"$class": "css-scroll-buttons"}, " ", [upButton, downButton], " "))));
var ready = obiwanIsHere.is(null).not();
ddom_1.root(document.body, (React.createElement("div", {"$class": "app-container"}, ready.then(app, "loading..."))));
ready.react(function (ready) {
    if (ready) {
        requestReactor.start().force();
    }
});
