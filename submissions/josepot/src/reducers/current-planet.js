import { OBI_WAN_MOVED } from '../actions';
import initialState from './initial-state';

export default (state = initialState.currentPlanet, { type, payload }) =>
  type === OBI_WAN_MOVED ?
    payload.obi :
    state;
