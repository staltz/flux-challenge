export function createNullArray(size) {
  const arr = [];
  for ( let i = 0 ; i < size ; i += 1) {
    arr.push(null);
  }

  return arr;
}

export function allEmpty(slots) {
  return slots.every(slot => !slot);
}

export function isMatchCurrentPlanet(state) {
  return state.slots.some(slot => {
    return slot && slot.homeworld.id === state.obiWanLocation.id;
  });
}
