'use strict';

import {SITH_LORD_LIST} from 'constants.js' ;

/* create list, full filled with 'empty' objects */
export function emptyList(size = SITH_LORD_LIST.SIZE) {
  return _.fill(Array(size), { isEmptyObject: true });
}