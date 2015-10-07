import { Range, List } from 'immutable';

import buildMessage from '../messageBuilder';
import * as Effects from '../constants/effects';
import * as SithStates from '../constants/sithStates';
import * as Configuration from '../constants/configuration';
import { SithRecord } from '../constants/records';
import * as Queries from './queries';
import * as Predicates from './predicates';

const emitCancelRequestsForSiths = (reduction, sithsToCancel) => reduction.withMutations(mutableReduction => {
  mutableReduction.updateIn(Queries.siths, siths => siths.map(sith => {
    if (sithsToCancel.some(Predicates.sithById(sith.get('id')))) {
      return sith.set('state', SithStates.NEW);
    } else {
      return sith;
    }
  }));

  mutableReduction
    .updateIn(Queries.effects, effects => effects
      .concat(sithsToCancel.map(sith => buildMessage(Effects.API_CANCEL_REQUEST, sith.get('correlationId')))));
});

// This simply initializes the application state and triggers loading of first Sith
export const applicationMounting = reduction => reduction.withMutations(mutableReduction => {
  mutableReduction
    .setIn(Queries.disabledUp, true)
    .setIn(Queries.disabledDown, true)
    .setIn(Queries.scrollingDown, true)
    .setIn(Queries.sithSpotted, false)
    .setIn(Queries.planet, null)
    .setIn(Queries.siths, new Range(0, Configuration.SITH_SLOTS).map(() => new SithRecord()).toList())
    .setIn(Queries.sithId(0), Configuration.INITIAL_SITH_TO_LOAD)
    .setIn(Queries.sithState(0), SithStates.LOADING)
    .updateIn(Queries.effects, effects => effects
      .push(buildMessage(Effects.API_LOAD_SITH, {
        sithId: Configuration.INITIAL_SITH_TO_LOAD,
        scrollingDown: true
      }))
      .push(buildMessage(Effects.API_CONNECT_WS)));
});

// Let's store the correlation ID of the request so that we can cancel it later on if necessary
export const sithLoadingStarted = (reduction, payload) => {
  const sithIndex = reduction
    .getIn(Queries.siths)
    .findIndex(Predicates.sithById(payload.sithId));

  return reduction
    .setIn(Queries.sithState(sithIndex), SithStates.LOADING)
    .setIn(Queries.sithCorrelationId(sithIndex), payload.correlationId);
};

export const sithLoaded = (reduction, payload) => {
  const scrollingDown = payload.scrollingDown;
  const { homeworld, name, master, apprentice, id } = payload.sith;

  const loadedSithIndex = reduction
    .getIn(Queries.siths)
    .findIndex(Predicates.sithById(id));

  return reduction.withMutations(mutableReduction => {
    // Let's store the newly loaded Sith
    mutableReduction
      .updateIn(Queries.sithByIndex(loadedSithIndex), sith => sith
        .set('id', id)
        .set('state', SithStates.LOADED)
        .set('correlationId', null)
        .set('apprentice', apprentice.id)
        .set('master', master.id)
        .set('homeworldId', homeworld.id)
        .set('homeworldName', homeworld.name)
        .set('name', name));

    if (scrollingDown && apprentice && loadedSithIndex < (Configuration.SITH_SLOTS - 1)) {
      mutableReduction.setIn(Queries.sithId(loadedSithIndex + 1), apprentice.id);
    } else if (!scrollingDown && master && loadedSithIndex > 0) {
      mutableReduction.setIn(Queries.sithId(loadedSithIndex - 1), master.id);
    }
  });
};

export const cancelRequestsBeforeScrollUp = reduction => {
  const loadingSithPotentialyOffScreen = reduction
    .getIn(Queries.siths)
    .takeLast(Configuration.PAGINATION_STEP)
    .find(Predicates.loadingSith);

  if (loadingSithPotentialyOffScreen) {
    return emitCancelRequestsForSiths(reduction, List.of(loadingSithPotentialyOffScreen));
  } else {
    return reduction;
  }
};

export const cancelRequestsBeforeScrollDown = reduction => {
  const loadingSithPotentialyOffScreen = reduction
    .getIn(Queries.siths)
    .take(Configuration.PAGINATION_STEP)
    .find(Predicates.loadingSith);

  if (loadingSithPotentialyOffScreen) {
    return emitCancelRequestsForSiths(reduction, List.of(loadingSithPotentialyOffScreen));
  } else {
    return reduction;
  }
};

export const triggerSithLoading = reduction => reduction.withMutations(mutableReduction => {
  const loadNewSithsEffects = mutableReduction
    .getIn(Queries.siths)
    .filter(Predicates.newSithWithId)
    .filterNot(() => mutableReduction.getIn(Queries.sithSpotted)) // Very important condition, there must be no visible Sith spotted by Obiwan
    .map(sith => buildMessage(Effects.API_LOAD_SITH, {
      sithId: sith.get('id'),
      scrollingDown: mutableReduction.getIn(Queries.scrollingDown)
    }))
    .toList();

  mutableReduction.updateIn(Queries.effects, effects => effects.concat(loadNewSithsEffects));
});

export const cancelAnyRequestIfObiwanSpottedSith = reduction => {
  const loadingSiths = reduction
    .getIn(Queries.siths)
    .filter(Predicates.loadingSith);

  if (reduction.getIn(Queries.sithSpotted) && loadingSiths) {
    return emitCancelRequestsForSiths(reduction, loadingSiths);
  } else {
    return reduction;
  }
};
