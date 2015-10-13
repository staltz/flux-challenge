import * as React from 'react';
import {AllState} from './state/AllState';
var shallowCompare = require('react/lib/shallowCompare');


interface ChangeCallback {
    (): void;
}

// the single state atom wrapper
export class Store {
    state: AllState;
    private callbacks: ChangeCallback[];

    constructor(initialState: AllState) {
        this.callbacks = [];
        this.state = initialState;
    }
    addChangeListener(callback: ChangeCallback): void {
        this.callbacks.push(callback);
    }

    removeChangeListener(callback: ChangeCallback): void {
        var index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    writeAction(action: Action): void {
        action.write(this.state, new ActionCreator(this));
        this.callbacks.forEach((cb: ChangeCallback) => cb());
    }
}

// a synchronous action
export abstract class Action {
    // an action must implement a write method that changes the state atom
    abstract write(state: AllState, actionCreator?: ActionCreator): void
    name(): string {
        return this.constructor.toString().match(/function (\w*)/)[1];
    }
}

// a small wrapper arround XMLHttpRequest to remove complexity
export class Request {
    private req: XMLHttpRequest;
    private url: string;

    constructor(url: string) {
        this.url = url;
        this.req = new XMLHttpRequest();
    }

    get pending(): boolean {
        return this.req.readyState < 4;
    }

    get returnedSucessfully(): boolean {
        return this.req.readyState === 4 && this.req.status === 200;
    }

    send(cb: () => void): void {
        this.req.onreadystatechange = () => {
            if (this.returnedSucessfully) {
                cb();
            }
        };
        this.req.open("GET", this.url);
        this.req.send();
    }

    get body(): any {
        if (this.returnedSucessfully) {
            return JSON.parse(this.req.response);
        }
    }

    abort(): void {
        this.req.abort();
    }
}

// An action that gets sent to the writer twice. once when request sent, once
// when request returns
export abstract class RequestAction extends Action {
    req: Request;

    constructor(url: string) {
        super();
        this.req = new Request(url);
    }
    /*
    a request Action additionally implements a send method
    so that the action can be dispatched twice. Once synchronously
    ("pending"), once asynchrounsly when returning

    this is the only place where asynchronicity happens!
    */
    send(writer: (a: Action) => void): void {
        writer(this);
        this.req.send(() => writer(this));
    }
}


export class ActionCreator {
    private store: Store;
    constructor(store: Store) {
        this.store = store;
    }
    write(action: Action): void {
        this.store.writeAction(action);
    }

    send(requestAction: RequestAction): void {
        requestAction.send(this.write.bind(this));
    }
}

interface ContainerProps {
    store: Store;
}

export abstract class Container<S> extends React.Component<ContainerProps, S> {
    private onAction: () => void;
    abstract stateSelector(state: AllState, actionCreator?: ActionCreator): S

    constructor(props: ContainerProps) {
        super(props);
        this.state = this.getStoreState();

        // bound method
        this.onAction = (): void => {
            this.setState(this.getStoreState());
        };
    }

    private getStoreState(): S {
        return this.stateSelector(this.props.store.state, new ActionCreator(this.props.store));
    }


    shouldComponentUpdate(nextProps: ContainerProps, nextState: S): boolean {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidMount(): void {
        this.props.store.addChangeListener(this.onAction);
    }

    componentWillUnmount(): void {
        this.props.store.removeChangeListener(this.onAction);
    }

}

// a typed immutable wrapper for any object. Returns a copy if
// the value getter is called.
export class Immutable<S> {
    private obj: S;

    constructor(obj: S) {
        this.obj = obj;
    }

    get v(): S {
        if (Array.isArray(this.obj)) {
            return (<any> this.obj).slice();
        } else if (this.obj && typeof this.obj === 'object') {
            // to lazy to define typing for Object.assign
            return (<any> Object).assign({}, this.obj);
        } else {
            return this.obj;
        }
    }

    set(f: (obj: S) => S): Immutable<S> {
        return new Immutable(f(this.v));
    }
}
