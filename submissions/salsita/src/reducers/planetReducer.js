import { fromJS } from 'immutable';

import * as Queries from './queries';
import * as Predicates from './predicates';

export const planetChanged = (reduction, payload) => reduction.setIn(Queries.planet, fromJS(payload));

export const checkObiwanSpottedSith = reduction => {
  const currentObiwanPlanet = reduction.getIn(Queries.planetId);

  return reduction.withMutations(mutableReduction => {
    mutableReduction
      .updateIn(Queries.siths, siths =>
          siths.map(sith => sith.set('spotted', sith.get('homeworldId') === currentObiwanPlanet)));

    const sithSpotted = mutableReduction
      .getIn(Queries.siths)
      .some(Predicates.sithSpotted);

    mutableReduction.setIn(Queries.sithSpotted, sithSpotted);
  });
};
