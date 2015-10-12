import { OBI_WAN_MOVED } from '../actions';

const initialState = { id: null, name: '' };

export default function currentPlanet(state = initialState, action) {
  return action.type === OBI_WAN_MOVED ? action.planet : state;
}
