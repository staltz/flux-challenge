import { combineReducers } from 'redux';

const initialState = {
  3616: { id: 3616, fetching: true, position: 0 }
};

function hasJediAtPosition(state, position) {
  return Object.keys(state).filter(id =>
    state[id].position === position
  ).length > 0;
}

function fillJediLineage(darkJedisById) {
  return Object.keys(darkJedisById).reduce((jedis, id) => {
    const jedi = darkJedisById[id];

    jedis[id] = jedi;
    if (!jedi.fetching) {
      if (jedi.position > 0 && !hasJediAtPosition(darkJedisById, jedi.position - 1) && jedi.master.id) {
        jedis[jedi.master.id] = {
          ...jedi.master,
          fetching: true,
          position: jedi.position - 1
        };
      }

      if (jedi.position < 4 && !hasJediAtPosition(darkJedisById, jedi.position + 1) && jedi.apprentice.id) {
        jedis[jedi.apprentice.id] = {
          ...jedi.apprentice,
          fetching: true,
          position: jedi.position + 1
        };
      }
    }
    return jedis;
  }, {});
}

function darkJedisById(state = initialState, action) {
  if (action.type === 'RECEIVE_JEDI') {
    state = fillJediLineage({
      ...state,
      [action.jedi.id]: {
        ...state[action.jedi.id],
        fetching: false,
        ...action.jedi
      }
    });
  } else if (action.type === 'GO_UP' || action.type === 'GO_DOWN') {
    const fn = action.type === 'GO_UP' ? (x => x + 2) : (x => x - 2);

    return fillJediLineage(Object.keys(state).reduce((jedis, id) => {
      const nextPosition = fn(state[id].position);

      if (nextPosition >= 0 && nextPosition <= 4) {
        jedis[id] = { ...state[id], position: nextPosition };
      }
      return jedis;
    }, {}));
  }

  return state;
}

function currentPlanet(state = null, action) {
  if (action.type === 'CHANGE_PLANET') {
    return action.planet;
  }

  return state;
}

export default combineReducers({
  currentPlanet,
  darkJedisById
});
