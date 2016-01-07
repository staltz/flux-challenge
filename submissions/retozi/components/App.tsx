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

function lessThanThreeSithLoaded(lords: SithLordsState.SithLord[]): boolean {
    let count = 0;
    for (const l of lords) {
        if (l.status === SithLordsState.SithLordStatus.PRESENT) {
            count += 1;
        }
    }
    return count < 3;
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

function lastLordHasNoApprentice(lords: SithLordsState.SithLord[]): boolean {
    for (const l of lords.reverse()) {
        if (l.status === SithLordsState.SithLordStatus.PRESENT) {
            return !l.apprenticeUrl;
        }
    }
}

function scrollDownDisabled(state: State): boolean {
    const lords = state.sithLords.v;
    return state.obiWanWorld.v.sithPresent || lessThanThreeSithLoaded(lords) || lastLordHasNoApprentice(lords);
}

function firstLordHasNoMaster(lords: SithLordsState.SithLord[]): boolean {
    for (const l of lords) {
        if (l.status === SithLordsState.SithLordStatus.PRESENT) {
            return !l.masterUrl;
        }
    }
}

function scrollUpDisabled(state: State): boolean {
    const lords = state.sithLords.v;
    return state.obiWanWorld.v.sithPresent || lessThanThreeSithLoaded(lords) || firstLordHasNoMaster(lords);
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
        return (
            <AppBlock
                obiWanPlanet={this.state.obiWanWorld.v.name}
                scrollUpDisabled={scrollUpDisabled(this.state)}
                scrollDownDisabled={scrollDownDisabled(this.state)}
                sith={sithProps(this.state)}
                actionCreator={new Flux.ActionCreator(this.props.store)}
            />
        );
    }
}
