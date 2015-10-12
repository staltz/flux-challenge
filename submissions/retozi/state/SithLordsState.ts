import * as Flux from '../Flux';
import {AllState} from './AllState';
import {
    GET_SITH_APPRENTICE,
    GET_SITH_MASTER,
    GET_SIDIOUS
} from '../Actions';


export enum SithLordStatus {
    ABSENT, PENDING, PRESENT
}

export interface SithLord {
    apprenticeUrl: string;
    masterUrl: string;
    name: string;
    id: number;
    homeworldName: string;
    homeworldId: number;
    request: Flux.Request;
    status: SithLordStatus;
}

export function emptySithLord(): SithLord {
    return {
        apprenticeUrl: null,
        masterUrl: null,
        name: null,
        id: null,
        homeworldName: null,
        homeworldId: null,
        request: null,
        status: SithLordStatus.ABSENT
    };
}

export function twoAbsentSithLords(): SithLord[] {
    return [emptySithLord(), emptySithLord()];
}

export type StateSlice = Flux.Immutable<SithLord[]>;

export function getInitialState(): StateSlice {
    return new Flux.Immutable([
        emptySithLord(),
        emptySithLord(),
        emptySithLord(),
        emptySithLord(),
        emptySithLord()
    ]);
}

export function someArePending(lords: SithLord[]): boolean {
    return lords.some((l: SithLord): boolean => l.status === SithLordStatus.PENDING);
}

export function cancel(...lords: SithLord[]): void {
    for (const l of lords) {
        if (l.status === SithLordStatus.PENDING) {
            l.request.abort();
            // mutate here, it will not matter but help recoverability
            l.status = SithLordStatus.ABSENT;
            l.request = null;
        }
    }
}

function indexOfLord(lords: SithLord[], id: number) {
    for (var i = 0; i < lords.length; i++) {
        if (lords[i].id === id) {
            return i;
        }
    }
    return -1;
}

export function writeMaster(state: StateSlice, lord: SithLord, apprenticeId: number): StateSlice {
    return state.set((s: SithLord[]): SithLord[] => {
        const writeIndex = indexOfLord(s, apprenticeId) - 1;
        if (writeIndex < 0) {
            return s;
        }
        s[writeIndex] = lord;
        return s;
    });
}

export function writeApprentice(state: StateSlice, lord: SithLord, masterId: number): StateSlice {
    return state.set((s: SithLord[]): SithLord[] => {
        const writeIndex = indexOfLord(s, masterId) + 1;
        if (writeIndex === 0 || writeIndex > 4) {
            return s;
        }
        s[writeIndex] = lord;
        return s;
    });
}

export function writeSidious(state: StateSlice, sidious: SithLord): StateSlice {
    return state.set((s: SithLord[]): SithLord[] => {
        s[0] = sidious;
        return s;
    });
}

export function writeScrollUp(state: StateSlice): StateSlice {
    return state.set((s: SithLord[]): SithLord[] => {
        s = s.concat(twoAbsentSithLords());
        cancel(s[0], s[1]);
        return s.slice(2, s.length);
    });
}

export function writeScrollDown(state: StateSlice): StateSlice {
    return state.set((s: SithLord[]): SithLord[] => {
        s = twoAbsentSithLords().concat(s);
        cancel(s[5], s[6]);
        return s.slice(0, 5);
    });
}

function fetchApprenticeIfNeeded(lords: SithLord[], actionCreator: Flux.ActionCreator): void {
    if (someArePending(lords) || lords[4].status !== SithLordStatus.ABSENT) {
        return;
    }
    for (let l of lords.reverse()) {
        if (l.status === SithLordStatus.PRESENT) {
            if (l.apprenticeUrl) {
                actionCreator.send(new GET_SITH_APPRENTICE(l.apprenticeUrl, l.id));
            }
            return;
        }
    }
}

function fetchMasterIfNeeded(lords: SithLord[], actionCreator: Flux.ActionCreator): void {
    if (someArePending(lords) || lords[0].status !== SithLordStatus.ABSENT) {
        return;
    }
    for (let l of lords) {
        if (l.status === SithLordStatus.PRESENT) {
            if (l.masterUrl) {
                actionCreator.send(new GET_SITH_MASTER(l.masterUrl, l.id));
            }
            return;
        }
    }
}

function fetchSidiousIfNeeded(lords: SithLord[], actionCreator: Flux.ActionCreator): void {
    if (lords.every((l: SithLord): boolean => l.status === SithLordStatus.ABSENT)) {
        actionCreator.send(new GET_SIDIOUS());
    }
}

export function selector(state: AllState, actionCreator: Flux.ActionCreator): StateSlice {
    fetchApprenticeIfNeeded(state.sithLords.v, actionCreator);
    fetchMasterIfNeeded(state.sithLords.v, actionCreator);
    fetchSidiousIfNeeded(state.sithLords.v, actionCreator);
    return state.sithLords;
}