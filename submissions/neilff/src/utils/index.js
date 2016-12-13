export function isPromise(val) {
  return val && typeof val.then === 'function';
}

export function isDefined(val) {
  return val && typeof val !== 'undefined' && val !== null;
}

export function isArray(val) {
  return val && Array.isArray(val);
}

export default {
  isPromise,
  isDefined,
  isArray,
};
