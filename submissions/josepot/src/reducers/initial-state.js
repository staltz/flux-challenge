import { List } from 'immutable';
import { MAX_VISIBLE_SITHS } from '../config';

export default {
  currentPlanet: { id: null, name: '' },
  siths: new List(),
  paddingTop: Math.floor(MAX_VISIBLE_SITHS / 2),
};
