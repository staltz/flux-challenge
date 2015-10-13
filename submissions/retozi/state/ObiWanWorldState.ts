
import * as Flux from '../Flux';
import {AllState} from './AllState';

export interface State {
    id: number;
    name: string;
}

export type StateSlice = Flux.Immutable<State>;

export function getInitialState(): StateSlice {
    return new Flux.Immutable({id: undefined, name: ''});
}

export function selector(state: AllState): StateSlice {
    return state.obiWanWorld;
}