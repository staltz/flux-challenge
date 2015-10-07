import { Record } from 'immutable';

import { NEW } from './sithStates';

export const SithRecord = new Record({
  id: null,
  name: null,
  apprentice: null,
  master: null,
  homeworldId: null,
  homeworldName: null,
  correlationId: null,
  spotted: false,
  state: NEW
});
