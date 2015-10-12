import { TOTAL_SLOT_COUNT, MOVE_SLOT_COUNT } from '../constants.js';
import { NEXT_DARK_JEDI, SCROLL_UP, SCROLL_DOWN } from '../actions.js';
import { allEmpty } from '../utils.js';

const defaultSlots = [];
for ( let i = 0 ; i < TOTAL_SLOT_COUNT ; i += 1) {
  defaultSlots.push(null);
}

const emptySlots = [];
for ( let i = 0 ; i < MOVE_SLOT_COUNT ; i += 1) {
  emptySlots.push(null);
}

export default function(state = defaultSlots, action) {
  switch (action.type) {
  case NEXT_DARK_JEDI: {
    const nextSithLord = action.payload;

    if (allEmpty(state)) {
      return state.map((slot, i) => (i === 0) ? nextSithLord : null);
    }

    return state.map((slot, i) => {
      if (slot) {
        return slot;
      }

      if ((state[i + 1] && state[i + 1].master.id === nextSithLord.id)
          || (state[i - 1] && state[i - 1].apprentice.id === nextSithLord.id)) {
        return nextSithLord;
      }

      return null;
    });
  }
  case SCROLL_UP: {
    const sliced = state
      .slice(0, TOTAL_SLOT_COUNT - MOVE_SLOT_COUNT);
    const nextState = emptySlots.concat(sliced);
    return nextState;
  }
  case SCROLL_DOWN: {
    const sliced = state.slice(MOVE_SLOT_COUNT);
    const nextState = sliced.concat(emptySlots);
    return nextState;
  }
  default:
    return state;
  }
}
