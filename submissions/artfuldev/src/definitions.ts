import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { IPlanet, PlanetsSource } from './drivers/planets';
import { IJedi, JedisSource } from './drivers/jedis';
import { HTTPSource, RequestOptions } from '@cycle/http';

export interface ISources {
  dom: DOMSource;
  planets: PlanetsSource;
  jedis: JedisSource;
}

export interface ISinks {
  dom: Stream<VNode>;
  jedis: Stream<number>;
}

export interface IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
  nextId: number;
  pendingIds: number[];
  down: boolean;
  up: boolean;
}
