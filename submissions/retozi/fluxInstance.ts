import * as Flux from './Flux';
import * as ObiWanWorldState from './state/ObiWanWorldState';
import * as SithLordsState from './state/SithLordsState';

export const store = new Flux.Store({
    obiWanWorld: ObiWanWorldState.getInitialState(),
    sithLords: SithLordsState.getInitialState()
});