import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { WebSocketDriver } from './drivers';

export interface ISources {
  dom: DOMSource;
  ws: WebSocketDriver;
}

export interface ISinks {
  dom: Stream<VNode>;
}

export interface IState {
  planet: string;
  jedis: IJedi[];
}

export interface IJedi {
  name: string;
  home: string;
}

export interface IPlanet {
  id: number;
  name: string;
}
