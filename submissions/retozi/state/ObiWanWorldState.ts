
import * as Flux from '../Flux';
import {AllState} from './AllState';
import {SithLord, cancel} from './SithLordsState';

export interface State {
    id: number;
    name: string;
    sithPresent: boolean;
}

export type StateSlice = Flux.Immutable<State>;

export function getInitialState(): StateSlice {
    return new Flux.Immutable({id: undefined, name: '', sithPresent: false});
}

export function sithOnSamePlanet(id: number, lords: SithLord[]): boolean {
    for (const l of lords) {
        if (l.homeworldId === id) {
            cancel(...lords);
            return true;
        }
    }
    return false;
}

export function writeWorld(id: number, name: string, currentLords: SithLord[]): StateSlice {
    return new Flux.Immutable({id: id, name: name, sithPresent: sithOnSamePlanet(id, currentLords)});
}

export function writeSithPresent(state: StateSlice, lords: SithLord[]): StateSlice {
    return state.set((s: State): State => {
        s.sithPresent = sithOnSamePlanet(s.id, lords);
        return s;
    });
}

export function selector(state: AllState): StateSlice {
    return state.obiWanWorld;
}