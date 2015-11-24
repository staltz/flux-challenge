var immutable_1 = require('immutable');
var util_1 = require('./util');
function discoverApprentice(state, i) {
    var sithCache = state.sithCache, sithIDs = state.sithIDs;
    var result = state;
    if (i < sithIDs.size - 1) {
        var sith = sithCache.get(sithIDs.get(i));
        if (sith) {
            if (sith.apprentice.id === null) {
                result = up(state, (sithIDs.size - 1) - i);
            }
            else {
                result = util_1.assoc(state, { sithIDs: sithIDs.set(i + 1, sith.apprentice.id) });
            }
        }
    }
    return result;
}
function discoverMaster(state, i) {
    var sithCache = state.sithCache, sithIDs = state.sithIDs;
    var result = state;
    if (i > 0) {
        var sith = sithCache.get(sithIDs.get(i));
        if (sith.master.id === null) {
            result = down(state, i);
        }
        else {
            result = util_1.assoc(state, { sithIDs: sithIDs.set(i - 1, sith.master.id) });
        }
    }
    return result;
}
function discoverSiths(state) {
    var firstIDidx = state.sithIDs.size;
    var lastIDidx = 0;
    state.sithIDs.forEach(function (id, i) {
        if (id !== null) {
            if (i < firstIDidx)
                firstIDidx = i;
            if (i > lastIDidx)
                lastIDidx = i;
        }
    });
    return discoverApprentice(discoverMaster(state, firstIDidx), lastIDidx);
}
function cleanCache(state) {
    var sithIDs = state.sithIDs, sithCache = state.sithCache;
    var newCache = immutable_1.Map().asMutable();
    sithIDs.forEach(function (id) {
        var local = sithCache.get(id);
        if (local != null) {
            newCache.set(id, local);
        }
    });
    return util_1.assoc(state, { sithCache: newCache });
}
function _modifySithIDs(state, n, f) {
    var sithIDs = state.sithIDs;
    immutable_1.Range(0, n).forEach(function () {
        sithIDs = f(sithIDs);
    });
    return cleanCache(discoverSiths(util_1.assoc(state, { sithIDs: sithIDs })));
}
function down(state, n) {
    var lastIDidx = state.sithIDs.reduce(function (last, id, idx) {
        return id !== null ? idx : last;
    }, -1);
    return _modifySithIDs(state, Math.min(lastIDidx, n), function (ids) { return ids.push(null).shift(); });
}
exports.down = down;
function up(state, n) {
    var sithIDs = state.sithIDs;
    var i = 0;
    while (i < sithIDs.size && sithIDs.get(i) === null) {
        i++;
    }
    var maxUp = sithIDs.size - i;
    return _modifySithIDs(state, Math.min(maxUp, n), function (ids) { return ids.unshift(null).pop(); });
}
exports.up = up;
