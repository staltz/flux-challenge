/// <reference path="../typings/references.d.ts" />

import * as React from 'react';
import * as Flux from '../Flux';
import {SCROLL_UP, SCROLL_DOWN} from '../Actions';

interface SlotProps {
    red: boolean;
    children?: JSX.Element;
}

class Slot extends React.Component<SlotProps, void> {
    render() {
        const color = (this.props.red) ? 'red' : null;
        return (
            <li className="css-slot" style={{color: color} as any}>
                {this.props.children}
            </li>
        );
    }
}


export interface SithProps {
    name: string;
    homeworld: string;
    onObiWansPlanet: boolean;
    key: number;
}

class Sith extends React.Component<SithProps, void> {
    render() {
        if (!this.props.name) {
            return <Slot red={false}/>;
        }
        return (
            <Slot red={this.props.onObiWansPlanet}>
                <h3 key="name">{this.props.name}</h3>
                <h6 key="homeworld">Homeworld: {this.props.homeworld}</h6>
            </Slot>
        );
    }
}


export interface Props {
    obiWanPlanet: string;
    scrollUpDisabled: boolean;
    scrollDownDisabled: boolean;
    sith: SithProps[];
    actionCreator: Flux.ActionCreator;

}


export class AppBlock extends React.Component<Props, void> {

    render() {
        return (
            <div className="css-root">
                <h1 className="css-planet-monitor" key="monitor">Obi-Wan currently on {this.props.obiWanPlanet}</h1>
                <section className="css-scrollable-list" key="list">
                    <ul className="css-slots" key="list">
                        {this.props.sith.map((jedi, index) => <Sith key={index} {...jedi}/>)}
                    </ul>
                    <div className="css-scroll-buttons" key="buttons">
                        <button
                            key="up"
                            disabled={this.props.scrollUpDisabled}
                            className={(!this.props.scrollUpDisabled) ? "css-button-up" : "css-button-up css-button-disabled"}
                            onClick={() => {
                                if ((!this.props.scrollUpDisabled)) {
                                    this.props.actionCreator.write(new SCROLL_UP());
                                }
                            }}
                        >
                        </button>
                        <button
                            key="down"
                            disabled={this.props.scrollDownDisabled}
                            className={(!this.props.scrollDownDisabled) ? "css-button-down" : "css-button-down css-button-disabled"}
                            onClick={() => {
                                if ((!this.props.scrollDownDisabled)) {
                                    this.props.actionCreator.write(new SCROLL_DOWN());
                                }
                            }}
                        >
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}
