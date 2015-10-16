import { TOTAL_SLOT_COUNT, MOVE_SLOT_COUNT } from '../constants.js';
import { NEXT_DARK_JEDI, SCROLL_UP, SCROLL_DOWN } from '../actions.js';
import { createNullArray, allEmpty } from '../utils.js';

const defaultSlots = createNullArray(TOTAL_SLOT_COUNT);
const emptySlots = createNullArray(MOVE_SLOT_COUNT);

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
    const sliced = state.slice(0, TOTAL_SLOT_COUNT - MOVE_SLOT_COUNT);
    return emptySlots.concat(sliced);
  }
  case SCROLL_DOWN: {
    const sliced = state.slice(MOVE_SLOT_COUNT);
    return sliced.concat(emptySlots);
  }
  default:
    return state;
  }
}
