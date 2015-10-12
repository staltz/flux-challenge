import { NEXT_PLANET } from '../actions.js';

export default function(state = {}, action) {
  switch (action.type) {
  case NEXT_PLANET: {    
    return action.payload;
  }
  default:
    return state;
  }
}
