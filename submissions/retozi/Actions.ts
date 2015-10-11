import {Action, RequestAction} from './Flux';
import {AllState} from './state/AllState';
import * as SithLordsState from './state/SithLordsState';
import * as Flux from './Flux';

function makePendingSithLord(res: Flux.Request): SithLordsState.SithLord {
    const template = SithLordsState.emptySithLord();
    template.status = SithLordsState.SithLordStatus.PENDING;
    template.request = res;
    return template;
}

function makeSithLord(res: Flux.Request): SithLordsState.SithLord {
    var body: any = res.body;

    return {
        apprenticeUrl: (body.apprentice) ? body.apprentice.url : null,
        masterUrl: (body.master) ? body.master.url : null,
        name: body.name,
        id: body.id,
        homeworldName: body.homeworld.name,
        homeworldId: body.homeworld.id,
        status: SithLordsState.SithLordStatus.PRESENT,
        request: null
    };
}

function parseSithLordFromRequest(res: Flux.Request): SithLordsState.SithLord {
    return (res.pending) ? makePendingSithLord(res) : makeSithLord(res);
}

export class GET_SIDIOUS extends RequestAction {
    constructor() {
        super('http://localhost:3000/dark-jedis/3616');
    }

    write(state: AllState) {
        const sidious = parseSithLordFromRequest(this.req);
        state.sithLords = SithLordsState.writeSidious(state.sithLords, sidious);
    }
}


export class GET_SITH_APPRENTICE extends RequestAction {
    masterId: number;

    constructor(url: string, masterId: number) {
        this.masterId = masterId;
        super(url);
    }

    write(state: AllState) {
        const lord = parseSithLordFromRequest(this.req);
        state.sithLords = SithLordsState.writeApprentice(state.sithLords, lord, this.masterId);
    }
}

export class GET_SITH_MASTER extends RequestAction {
    apprenticeId: number;

    constructor(url: string, apprenticeId: number) {
        this.apprenticeId = apprenticeId;
        super(url);
    }

    write(state: AllState) {
        const lord = parseSithLordFromRequest(this.req);
        state.sithLords = SithLordsState.writeMaster(state.sithLords, lord, this.apprenticeId);
    }
}

export class RECEIVE_OBI_WORLD extends Action {
    worldId: number;
    worldName: string;

    constructor(id: number, name: string) {
        this.worldId = id;
        this.worldName = name;
        super();
    }

    write(state: AllState) {
        state.obiWanWorld = new Flux.Immutable({id: this.worldId, name: this.worldName});
    }
}

export class SCROLL_UP extends Action {
    write(state: AllState) {
        state.sithLords = SithLordsState.writeScrollUp(state.sithLords);
    }
}


export class SCROLL_DOWN extends Action {
    write(state: AllState) {
        state.sithLords = SithLordsState.writeScrollDown(state.sithLords);
    }
}