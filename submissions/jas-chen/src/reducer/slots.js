import { TOTAL_SLOT_COUNT, MOVE_SLOT_COUNT } from '../constants.js';
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
  case 'NEXT_SITH_LORD': {
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
  case 'SCROLL_UP': {
    const sliced = state
      .slice(0, TOTAL_SLOT_COUNT - MOVE_SLOT_COUNT);
    const nextState = emptySlots.concat(sliced);
    // ckeck if slots are empty
    return allEmpty(nextState) ? state : nextState;
  }
  case 'SCROLL_DOWN': {
    const sliced = state.slice(MOVE_SLOT_COUNT);
    const nextState = sliced.concat(emptySlots);
    // ckeck if slots are empty
    return allEmpty(nextState) ? state : nextState;
  }
  default:
    return state;
  }
}
