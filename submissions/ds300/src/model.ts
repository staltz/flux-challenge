import { Range } from 'immutable'
import { isString } from './util'

// when request completes, we need to check whether more siths should be loaded
// or whether we accidentally let the list scroll too far
export function completeRequest (siths, url, sith) {
  let idx = siths.indexOf(url);
  siths = siths.set(idx, sith);
  // check whether we need to fetch the sith's apprentice
  if (sith.apprentice.url &&
      idx < siths.size - 1 &&
      siths.get(idx + 1) === null) {
    siths = siths.set(idx + 1, sith.apprentice.url);
  }
  // check whether we need to fetch the sith's master
  if (sith.master.url &&
      idx > 0 &&
      siths.get(idx - 1) === null) {
    siths = siths.set(idx - 1, sith.master.url);
  }

  // check whether we reached the end going up, and correct if so
  if (!sith.master.url && idx > 0) {
    siths = down(siths, idx);

  // check whether we reached the end going down, and correct if so
} else if (!sith.apprentice.url && idx < siths.size - 1) {
    siths = up(siths, (siths.size - 1) - idx);
  }
  // console.log("mah siths: ", siths.toJS())
  return siths;
}

export function down (siths, n) {
  Range(0, n).forEach(() => {
    siths = siths.push(null).shift();
  });
  // find out whether we need to load more apprentices
  for (let i = siths.size; i--;) {
    let s = siths.get(i);
    if (s) {
      // if s is string, it's already being loaded so we don't need to
      // do anything
      if (!isString(s)) {
        // otherwise s is a loaded sith with apprentice not being loaded
        // let's fix that
        siths = siths.set(i+1, s.apprentice.url);
      }
      break;
    }
  }
  return siths;
}

export function up (siths, n) {
  Range(0, n).forEach(() => {
    siths = siths.unshift(null).pop();
  });
  // find out whether we need to load more masters
  for (let i = 0; i < siths.size; i++) {
    let s = siths.get(i);
    if (s) {
      // if s is string, it's already being loaded so we don't need to
      // do anything
      if (!isString(s)) {
        // else s is sith with master not being loaded, so let's fix that
        siths = siths.set(i-1, s.master.url);
      }
      break;
    }
  }
  return siths;
}
