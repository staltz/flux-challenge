import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { PlanetsDriver, IPlanet } from './drivers/planets';
import { IJedi, JedisDriver } from './drivers/jedis';

export interface ISources {
  dom: DOMSource;
  planets: PlanetsDriver;
  jedis: JedisDriver;
}

export interface ISinks {
  dom: Stream<VNode>;
  jedis: JedisDriver;
}

export interface IApplicationState {
  planet: IPlanet;
  jedis: IJedi[];
}
