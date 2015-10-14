import R from 'ramda';
import {
  SITH_LOADED, OBI_WAN_MOVED
} from '../actions';

export default function redMatch(state, action) {
  const { list, currentPlanet } = state;
  const siths = (list && list.siths) || [];
  const result = R.compose(
    R.merge(state),
    R.createMapEntry('redMatch')
  );

  switch (action.type) {
    case SITH_LOADED:
      return result(
        action.sith.homeworld.id === currentPlanet.id
      );

    case OBI_WAN_MOVED: {
      return result(
        R.containsWith(
          (planet, sith) => planet.id == sith.homeworld.id,
            action.planet, siths
        )
      );
    }

    default:
      return state;
  }
}
