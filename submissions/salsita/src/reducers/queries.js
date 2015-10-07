export const effects = ['effects'];
export const disabledUp = ['appState', 'disabledUp'];
export const disabledDown = ['appState', 'disabledDown'];
export const siths = ['appState', 'siths'];
export const scrollingDown = ['appState', 'scrollingDown'];
export const sithSpotted = ['appState', 'sithSpotted'];
export const planet = ['appState', 'planet'];
export const planetId = ['appState', 'planet', 'id'];
export const sithByIndex = index => ['appState', 'siths', index];
export const sithId = index => ['appState', 'siths', index, 'id'];
export const sithApprentice = index => ['appState', 'siths', index, 'apprentice'];
export const sithMaster = index => ['appState', 'siths', index, 'master'];
export const sithState = index => ['appState', 'siths', index, 'state'];
export const sithCorrelationId = index => ['appState', 'siths', index, 'correlationId'];

