export function getJediSlots(state) {
  return Object.keys(state.darkJedisById).reduce((slots, id) => {
    const jedi = state.darkJedisById[id];
    slots[jedi.position] = jedi;
    return slots;
  }, [null, null, null, null, null]);
}

export function wasJediBornInCurrentPlanet(state, jedi) {
  return jedi.homeworld && state.currentPlanet &&
    jedi.homeworld.id === state.currentPlanet.id;
}

export function wasAnyJediBornInCurrentPlanet(state) {
  return Object.keys(state.darkJedisById).filter(id =>
    wasJediBornInCurrentPlanet(state, state.darkJedisById[id])
  ).length > 0;
}
