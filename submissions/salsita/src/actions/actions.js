import buildMessage from '../messageBuilder';
import * as Actions from '../constants/actions';

export const applicationMounting = () => buildMessage(Actions.APPLICATION_MOUNTING);
export const scrolledUp = () => buildMessage(Actions.SCROLLED_UP);
export const scrolledDown = () => buildMessage(Actions.SCROLLED_DOWN);
export const sithLoadingStarted = (sithId, correlationId) => buildMessage(Actions.SITH_LOADING_STARTED, {sithId, correlationId});
export const sithLoaded = (sith, scrollingDown) => buildMessage(Actions.SITH_LOADED, {sith, scrollingDown});
export const planetChanged = payload => buildMessage(Actions.PLANET_CHANGED, payload);
