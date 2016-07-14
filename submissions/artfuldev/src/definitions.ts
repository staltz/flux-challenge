import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { IPlanet, PlanetsSource } from './drivers/planets';
import { IJedi } from './jedis';
import { HTTPSource, RequestOptions } from '@cycle/http';

export interface ISources {
  dom: DOMSource;
  planets: PlanetsSource;
  http: HTTPSource;
}

export interface ISinks {
  dom: Stream<VNode>;
  http: Stream<RequestOptions>;
}

export interface IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  jediRequests: number[];
}
