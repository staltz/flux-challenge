var immutable_1 = require('immutable');
var util_1 = require('./util');
function completeRequest(siths, url, sith) {
    var idx = siths.indexOf(url);
    siths = siths.set(idx, sith);
    if (sith.apprentice.url &&
        idx < siths.size - 1 &&
        siths.get(idx + 1) === null) {
        siths = siths.set(idx + 1, sith.apprentice.url);
    }
    if (sith.master.url &&
        idx > 0 &&
        siths.get(idx - 1) === null) {
        siths = siths.set(idx - 1, sith.master.url);
    }
    if (!sith.master.url && idx > 0) {
        siths = down(siths, idx);
    }
    else if (!sith.apprentice.url && idx < siths.size - 1) {
        siths = up(siths, (siths.size - 1) - idx);
    }
    return siths;
}
exports.completeRequest = completeRequest;
function down(siths, n) {
    immutable_1.Range(0, n).forEach(function () {
        siths = siths.push(null).shift();
    });
    for (var i = siths.size; i--;) {
        var s = siths.get(i);
        if (s) {
            if (!util_1.isString(s)) {
                siths = siths.set(i + 1, s.apprentice.url);
            }
            break;
        }
    }
    return siths;
}
exports.down = down;
function up(siths, n) {
    immutable_1.Range(0, n).forEach(function () {
        siths = siths.unshift(null).pop();
    });
    for (var i = 0; i < siths.size; i++) {
        var s = siths.get(i);
        if (s) {
            if (!util_1.isString(s)) {
                siths = siths.set(i - 1, s.master.url);
            }
            break;
        }
    }
    return siths;
}
exports.up = up;
