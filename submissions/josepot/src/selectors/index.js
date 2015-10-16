import R from 'ramda';
import { createSelector } from 'reselect';
import { MAX_VISIBLE_SITHS, INITIAL_SITH_ID } from '../config';
import { UP, DOWN } from '../actions';

export const redMatch = createSelector(
  R.path(['list', 'siths']),
  R.prop('currentPlanet'),
  (siths, planet) => R.containsWith(
    (planet, sith) => planet.id == sith.homeworld.id,
    planet, siths
  )
);

export const getAvailableSpots = createSelector(
  R.path(['list', 'paddingTop']),
  R.path(['list', 'siths', 'length']),
  (paddingTop, nSiths) => (direction) => direction === UP ?
    paddingTop :
    MAX_VISIBLE_SITHS - nSiths - paddingTop
);

function getNextSith(siths, direction) {
  return (
    siths.length > 0 &&
    (direction === UP ? R.head(siths).master : R.last(siths).apprentice)
  ) || (siths.length === 0 && { id: INITIAL_SITH_ID });
}

export const getNextSithToLoad = createSelector(
  redMatch,
  getAvailableSpots,
  R.prop('onGoingRequests'),
  R.path(['list', 'siths']),
  (redMatch, getAvailableSpots, onGoingRequests, siths) => (direction) => {
    return !redMatch &&
      getAvailableSpots(direction) > 0 &&
      R.isNil(onGoingRequests[direction]) &&
      getNextSith(siths, direction);
  }
);

export const ui = createSelector(
  R.path(['list', 'siths']),
  R.prop('currentPlanet'),
  redMatch,
  getAvailableSpots,
  (siths, currentPlanet, redMatch, getAvailableSpots) => {
    const paddingTop = getAvailableSpots(UP);
    const paddingBottom = getAvailableSpots(DOWN);
    let isScrollUpDisabled = true;
    let isScrollDownDisabled = true;

    if(siths.length > 0 && !redMatch) {
      isScrollUpDisabled =
        paddingTop === MAX_VISIBLE_SITHS - 1 ||
        R.isNil(R.head(siths).master.id);

      isScrollDownDisabled =
        paddingBottom === MAX_VISIBLE_SITHS - 1 ||
        R.isNil(R.last(siths).apprentice.id);
    }

    return {
      currentPlanet,
      siths,
      paddingTop,
      paddingBottom,
      isScrollUpDisabled,
      isScrollDownDisabled
    };
  }
);
