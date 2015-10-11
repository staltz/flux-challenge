/// <reference path="../typings/references.d.ts" />

import * as React from 'react';
import * as Flux from '../Flux';
import {AllState} from '../state/AllState';
import {RECEIVE_OBI_WORLD} from '../Actions';
import * as SithLordsState from '../state/SithLordsState';
import * as ObiWanWorldState from '../state/ObiWanWorldState';
import {AppBlock, SithProps} from './AppBlock';

interface State {
    sithLords: SithLordsState.StateSlice;
    obiWanWorld: ObiWanWorldState.StateSlice;
}

function onlyOneSithLoaded(lords: SithLordsState.SithLord[]): boolean {
    let count = 0;
    for (const l of lords) {
        if (l.status === SithLordsState.SithLordStatus.PRESENT) {
            count += 1;
        }
    }
    return count < 2;
}

function obiWanIsOnSamePlanetAsSith(state: State): boolean {
    const obiPlanetId = state.obiWanWorld.v.id;
    for (const l of state.sithLords.v) {
        if (l.homeworldId === obiPlanetId) {
            return true;
        }
    }
    return false;
}

function sithProps(state: State): SithProps[] {
    const obiPlanetId = state.obiWanWorld.v.id;
    return state.sithLords.v.map((l: SithLordsState.SithLord, index: number): SithProps => {
        return {
            name: l.name || '',
            homeworld: l.homeworldName || '',
            onObiWansPlanet: l.homeworldId === obiPlanetId,
            key: index
        };
    });
}


function scrollUpDisabled(state: State, obiWanSamePlanet: boolean): boolean {
    const lords = state.sithLords.v;
    const lastLordHasNoApprentice = (
        lords[4].status === SithLordsState.SithLordStatus.PRESENT &&
        !lords[4].apprenticeUrl
    );
    return obiWanSamePlanet || onlyOneSithLoaded(lords) || lastLordHasNoApprentice;
}

function scrollDownDisabled(state: State, obiWanSamePlanet: boolean): boolean {
    const lords = state.sithLords.v;
    const firstLordHasNoMaster = (
        lords[0].status === SithLordsState.SithLordStatus.PRESENT &&
        !lords[0].masterUrl
    );
    return obiWanSamePlanet || onlyOneSithLoaded(lords) || firstLordHasNoMaster;
}

export class App extends Flux.Container<State> {
    private socket: WebSocket;

    stateSelector(allState: AllState): State {
        const actionCreator = new Flux.ActionCreator(this.props.store);
        return {
            sithLords: SithLordsState.selector(allState, actionCreator),
            obiWanWorld: ObiWanWorldState.selector(allState)
        };
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.socket = new WebSocket("ws://localhost:4000");
        this.socket.addEventListener("message", (event: MessageEvent) => {
            const actionCreator = new Flux.ActionCreator(this.props.store);
            const data = JSON.parse(event.data);
            actionCreator.write(new RECEIVE_OBI_WORLD(data.id, data.name));
        });
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.socket.close();
    }

    render(): JSX.Element {
        const obiWanSamePlanet = obiWanIsOnSamePlanetAsSith(this.state);
        if (obiWanSamePlanet) {
            SithLordsState.cancel(...this.state.sithLords.v);
        }
        return (
            <AppBlock
                obiWanPlanet={this.state.obiWanWorld.v.name}
                scrollUpDisabled={scrollUpDisabled(this.state, obiWanSamePlanet)}
                scrollDownDisabled={scrollDownDisabled(this.state, obiWanSamePlanet)}
                sith={sithProps(this.state)}
                actionCreator={new Flux.ActionCreator(this.props.store)}
            />
        );
    }
}
