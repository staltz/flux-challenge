import * as ObiWanPositionState from './ObiWanWorldState';
import * as SithLordsState from './SithLordsState';

export interface AllState {
    obiWanWorld: ObiWanPositionState.StateSlice;
    sithLords: SithLordsState.StateSlice;
}