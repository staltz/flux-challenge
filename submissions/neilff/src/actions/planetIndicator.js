import { ON_PLANET_UPDATE } from '../constants';

function onPlanetUpdate({id, name}) {
  return {
    type: ON_PLANET_UPDATE,
    payload: {
      id,
      name,
    },
  };
}

export default {
  onPlanetUpdate,
};
