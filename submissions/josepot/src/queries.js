import R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import { DOWN, UP } from './actions';
import { MAX_VISIBLE_SITHS } from './config';

const getCurrentPlanet = R.prop('currentPlanet');
const getPaddingTop = R.prop('paddingTop');
const getSiths = R.prop('siths');
const getNSiths = createSelector([getSiths], x => x.size);

const getPaddingBottom = createSelector(
  [getPaddingTop, getNSiths],
  R.compose(R.subtract(MAX_VISIBLE_SITHS), R.add)
);

const getPadding = direction =>
  direction === UP ?
    getPaddingTop :
    getPaddingBottom;

const getNextSithId = direction => direction === UP ?
  createSelector(getSiths, siths => R.path(['master', 'id'], siths.first())) :
  createSelector(getSiths, siths => R.path(['apprentice', 'id'], siths.last()));

export const getNextSithIdToLoad = direction =>
  createSelector([getPadding(direction), getNextSithId(direction)], R.and);

export const getCurrentPlanetMatch = createSelector(
  [getSiths, getCurrentPlanet],
  (siths, { id }) => !!siths.find(sith => sith.homeworld.id === id)
);

const isScrollDisabled = direction => createSelector(
  [getCurrentPlanetMatch, getNextSithId(direction), getPadding(direction)],
  (currentPlanetMatch, nextSithId, padding) =>
    currentPlanetMatch || !nextSithId || padding === MAX_VISIBLE_SITHS - 1
);

export const storeToProps = createStructuredSelector({
  currentPlanet: getCurrentPlanet,
  siths: getSiths,
  paddingTop: getPaddingTop,
  paddingBottom: getPaddingBottom,
  isScrollUpDisabled: isScrollDisabled(UP),
  isScrollDownDisabled: isScrollDisabled(DOWN),
});
