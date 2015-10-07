import { combineReducers } from 'redux';

function dark_jedi_apply_action(dark_jedi, action) {
	switch (action.type) {
		case "LOAD_DARK_JEDI":
			// Replace the dark jedi that was loaded with
			// data from the server.
			return _.map(dark_jedi, (jedi, index) => {
				if (jedi.id == action.payload.id) {
					return action.payload;
				} else {
					return jedi;
				}
			});
		case "UP_CLICKED":
			// We lose the two at the end, and create two blank
			// entries at the front.
			return [{}, {}].concat(_.dropRight(dark_jedi, 2));
		case "DOWN_CLICKED":
			// We lose entries at the front, and create
			// two blank entries at the back.
			return _.drop(dark_jedi, 2).concat([{}, {}]);
		default:			
			return dark_jedi;
	}
}

function infer_dark_jedi_ids(dark_jedi) {
	// This function updates the list of dark_jedi, filling in
	// the id numbers we can can infer from the nearby records.
	return _.map(dark_jedi, (jedi, index) => {
		if (!jedi.id) {
			// We don't currently know the id of this jedi.
			// Try the jedi before/after to look master/apprentice.
			if (dark_jedi[index-1] 
				&& dark_jedi[index-1].apprentice) {
				return {id: dark_jedi[index-1].apprentice.id};
			}
			if (dark_jedi[index+1] 
				&& dark_jedi[index+1].master) {
				return {id: dark_jedi[index+1].master.id};
			}
		}
		return jedi;			
	});
}


const INITIAL_DARK_JEDI_STATE = [
	{id: 3616},
	{},
	{},
	{},
	{}
]

function dark_jedi_reducer(state = INITIAL_DARK_JEDI_STATE, action) {
	return infer_dark_jedi_ids(dark_jedi_apply_action(state, action))
}

function obiwan_location_reducer(state = {}, action) {
	switch (action.type) {
		case "OBIWAN_LOCATION_CHANGE":
			return action.payload;
		default:
			return state;
	}
}

export default combineReducers({
	obiwan_location: obiwan_location_reducer,
	dark_jedi: dark_jedi_reducer
});
