import _ from 'lodash'

export function obiwanShouldInvestigate(state) {
	return _.some(state.dark_jedi, (dark_jedi) => dark_jedi.homeworld && dark_jedi.homeworld.id == state.obiwan_location.id);
}
