import Freezer from 'freezer-js';

export default new Freezer({
	// We are ready to fetch the first sith
	siths: [{id: 3616}, {}, {}, {}, {}],
	currentPlanet: {id: 0, name: 'Naboo'},
	sithAtHome: false,
	upDisabled: true,
	downDisabled: true
});

