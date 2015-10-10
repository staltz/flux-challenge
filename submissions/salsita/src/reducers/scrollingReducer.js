import { Range } from 'immutable';

import * as Configuration from '../constants/configuration';
import { SithRecord } from '../constants/records';

import * as Queries from './queries';
import * as Predicates from './predicates';

const PAGINATION_RANGE = new Range(0, Configuration.PAGINATION_STEP);

export const enableOrDisableControlButtons = reduction => {
  const siths = reduction.getIn(Queries.siths);
  const disabledUp = siths.skipLast(Configuration.PAGINATION_STEP + 1).every(Predicates.newSith) || reduction.getIn(Queries.sithSpotted);
  const disabledDown = siths.skip(Configuration.PAGINATION_STEP + 1).every(Predicates.newSith) || reduction.getIn(Queries.sithSpotted);

  return reduction
    .setIn(Queries.disabledUp, disabledUp)
    .setIn(Queries.disabledDown, disabledDown);
};

// Responsible just for scrolling down
// All the API calls are done in sithLoadingReducer
export const scrollDown = reduction => reduction.withMutations(mutableReduction => {
  mutableReduction
    .setIn(Queries.scrollingDown, true)
    .updateIn(Queries.siths, siths =>
        PAGINATION_RANGE.reduce(memoSiths =>
          memoSiths
            .shift()
            .push(new SithRecord()
        ), siths)
    );

  const lastLoadedSithIndex = mutableReduction
    .getIn(Queries.siths)
    .findLastIndex(Predicates.loadedSith);

  mutableReduction
    .setIn(Queries.sithId(lastLoadedSithIndex + 1), mutableReduction.getIn(Queries.sithApprentice(lastLoadedSithIndex)));
});

// Responsible just for scrolling up
// All the API calls are done in sithLoadingReducer
export const scrollUp = reduction => reduction.withMutations(mutableReduction => {
  mutableReduction
      .setIn(Queries.scrollingDown, false)
      .updateIn(Queries.siths, siths =>
          PAGINATION_RANGE.reduce(memoSiths =>
            memoSiths
              .pop()
              .unshift(new SithRecord()
          ), siths)
      );

  const firstLoadedSithIndex = mutableReduction
    .getIn(Queries.siths)
    .findIndex(Predicates.loadedSith);

  mutableReduction
    .setIn(Queries.sithId(firstLoadedSithIndex - 1), mutableReduction.getIn(Queries.sithMaster(firstLoadedSithIndex)));
});

