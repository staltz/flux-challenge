export function allEmpty(slots) {
  return slots.every(slot => !slot);
}

export function isMatchCurrentPlanet(state) {
  return state.slots.some(slot => {
    return slot && slot.homeworld.id === state.obiWanLocation.id;
  });
}
