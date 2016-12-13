import { createSelector } from 'reselect';

const planetIdSelector = state => state.planet.id;
const sithLordsSelector = state => state.sithLords;

export const homeworldMatchesPlanet = createSelector(
  sithLordsSelector,
  planetIdSelector,
  (sithLords, planetId) => {
    const doesMatch = sithLords.filter(i => {
      return i.getIn(['homeworld', 'id']) === planetId;
    }).size > 0;

    return doesMatch;
  }
);
