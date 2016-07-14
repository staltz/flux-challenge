import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { PlanetDriver, IPlanet } from './drivers/planets';

export interface ISources {
  dom: DOMSource;
  planets: PlanetDriver;
}

export interface ISinks {
  dom: Stream<VNode>;
}

export interface IState {
  planet: IPlanet;
  jedis: IJedi[];
}

export interface IJedi {
  name: string;
  home: string;
}
