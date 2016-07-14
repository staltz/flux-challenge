import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { IPlanet, PlanetsSource } from './drivers/planets';
import { IJedi } from './jedis';
import { HTTPSource } from '@cycle/http';

export interface ISources {
  dom: DOMSource;
  planets: PlanetsSource;
  http: HTTPSource;
}

export interface ISinks {
  dom: Stream<VNode>;
  http: Stream<string>;
}

export interface IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  jediRequests: number[];
}
