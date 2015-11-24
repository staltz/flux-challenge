exports.isString = function (x) { return typeof x === 'string'; };
function assoc(obj, other) {
    return Object.assign({}, obj, other);
}
exports.assoc = assoc;
