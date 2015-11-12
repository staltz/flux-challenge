const isNotNull = (x => x !== null)
const isNull = (x => x === null)

exports.hasEmptySlots = (list => list.count(isNull) > 0)
exports.firstNonNullValue = (list => list.skipUntil(isNotNull).first())
exports.lastNonNullValue = (list => list.reverse().skipUntil(isNotNull).first())
