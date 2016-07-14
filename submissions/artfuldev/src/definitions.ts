import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { PlanetsDriver, IPlanet } from './drivers/planets';

export interface ISources {
  dom: DOMSource;
  planets: PlanetsDriver;
}

export interface ISinks {
  dom: Stream<VNode>;
}

export interface IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
}

export interface IJedi {
  name: string;
  home: string;
}
