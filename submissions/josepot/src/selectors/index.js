import R from 'ramda';
import { createSelector } from 'reselect';
import { MAX_VISIBLE_SITHS, INITIAL_SITH_ID } from '../config';
import { UP, DOWN } from '../actions';

const siths = R.path(['list', 'siths']);
const nSiths = R.path(['list', 'siths', 'length']);
const currentPlanet = R.prop('currentPlanet');
const paddingTop = R.path(['list', 'paddingTop']);
const onGoingRequestsUp = R.path(['onGoingRequests', 'UP']);
const onGoingRequestsDown = R.path(['onGoingRequests', 'DOWN']);
const nextMasterId = R.compose(R.path(['master', 'id']), R.head, siths);
const nextApprenticeId = R.compose(R.path(['apprentice', 'id']), R.last, siths);

export const redMatch = createSelector(
  [siths, currentPlanet],
  (siths, planet) => R.containsWith(
    (planet, sith) => planet.id == sith.homeworld.id,
    planet, siths
  )
);

const paddingBottom = createSelector(
  [nSiths, paddingTop],
  (nSiths, paddingTop) => MAX_VISIBLE_SITHS - nSiths - paddingTop
);

const nextMasterIdToLoad = createSelector(
  [redMatch, paddingTop, onGoingRequestsUp, nextMasterId],
  (redMatch, padding, request, masterId) =>
    !redMatch && padding > 0 && !request && masterId
);

const nextApprenticeIdToLoad = createSelector(
  [redMatch, paddingBottom, onGoingRequestsDown, nSiths, nextApprenticeId],
  (redMatch, padding, request, nSiths, apprenticeId) =>
    !redMatch && padding > 0 && !request && (
      apprenticeId ||
      (nSiths === 0 && INITIAL_SITH_ID)
    )
);

export const sithsToLoad = createSelector(
  [nextMasterIdToLoad, nextApprenticeIdToLoad],
  (masterId, apprenticeId) => [
    { direction: UP, id: masterId },
    { direction: DOWN, id: apprenticeId }
  ].filter(R.prop('id'))
);

export const requestsToCancel = createSelector(
  [redMatch, paddingTop, paddingBottom, onGoingRequestsUp, onGoingRequestsDown],
  (redMatch, paddingTop, paddingBottom, masterRequest, apprenticeRequest) => {
    const upReq = (redMatch || paddingTop === 0) && masterRequest;
    const downReq = (redMatch || paddingBottom === 0) && apprenticeRequest;
    return [
      { direction: UP, request: upReq },
      { direction: DOWN, request: downReq }
    ].filter(R.prop('request'));
  }
);

export const ui = createSelector(
  [
    paddingTop, paddingBottom, siths, currentPlanet,
    redMatch, nextMasterId, nextApprenticeId
  ],
  (
    paddingTop, paddingBottom, siths, currentPlanet,
    redMatch, nextMasterId, nextApprenticeId
  ) => {
    let isScrollUpDisabled = true;
    let isScrollDownDisabled = true;

    if(siths.length > 0 && !redMatch) {
      isScrollUpDisabled =
        paddingTop === MAX_VISIBLE_SITHS - 1 || !nextMasterId;
      isScrollDownDisabled =
        paddingBottom === MAX_VISIBLE_SITHS - 1 || !nextApprenticeId;
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
