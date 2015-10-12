export const NEXT_PLANET = 'NEXT_PLANET';
export const NEXT_DARK_JEDI = 'NEXT_DARK_JEDI';
export const SCROLL_UP = 'SCROLL_UP';
export const SCROLL_DOWN = 'SCROLL_DOWN';

export function nextPlanet(planet) {
  return {
    type: NEXT_PLANET,
    payload: planet
  };
}

export function nextDarkJedi(darkJedi) {
  return {
    type: NEXT_DARK_JEDI,
    payload: darkJedi
  };
}

export function scrollUp() {
  return {
    type: SCROLL_UP
  };
}

export function scrollDown() {
  return {
    type: SCROLL_DOWN
  };
}
