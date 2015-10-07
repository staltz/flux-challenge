/**
 * @flow
 */

'use strict';

import Immutable from 'immutable';

const record = Immutable.Record({
  // This is some metadata so we know what request this Sith's data came from.
  requestID: undefined,

  apprenticeID: undefined,
  homeworldName: undefined,
  masterID: undefined,
  name: undefined,
});

// TODO: Could add flow types here.
export default class Sith extends record {};
