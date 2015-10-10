import { handleActions } from 'redux-actions';
import { ON_PLANET_UPDATE } from '../constants';

const INITIAL_STATE = {
  id: null,
  name: null,
};

const planetReducer = handleActions({
  [ON_PLANET_UPDATE]: (state, { payload }) => (Object.assign({}, state, payload)),
}, INITIAL_STATE);

export default planetReducer;
