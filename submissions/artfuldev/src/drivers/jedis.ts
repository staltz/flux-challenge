import { Stream, Producer, Listener } from 'xstream';
import { HTTPSource, RequestOptions, Response, makeHTTPDriver } from '@cycle/http';
import { StreamAdapter } from '@cycle/base';
import XStreamAdapter from '@cycle/xstream-adapter';

interface IEntity {
  id: number;
}

export interface INamedEntity extends IEntity {
  name: string;
}

export interface ILinkableEntity extends IEntity {
  url: string;
}

export interface IJedi extends INamedEntity {
  homeworld: INamedEntity;
  master: ILinkableEntity;
  apprentice: ILinkableEntity;
}

const JEDI_URL = 'http://localhost:3000/dark-jedis/';
var requestedJedis = [];

export class JedisSource {
  jedi$: Stream<IJedi>;
  constructor(id$: Stream<number>) {
    const xs = Stream;
    const request$ =
      id$
        // .filter(id => requestedJedis.indexOf(id) !== -1)
        .map(id => {
          requestedJedis = requestedJedis.concat(id);
          const requestOptions = {
            url: JEDI_URL + id,
            category: 'jedis'
          } as RequestOptions;
          return requestOptions;
        });
    const http = makeHTTPDriver()(request$, XStreamAdapter);
    this.jedi$ =
      http
        .select('jedis')
        .flatten()
        .map((response: Response) => {
          const jedi = JSON.parse(response.text) as IJedi;
          requestedJedis = requestedJedis.filter(id => id !== jedi.id);
          return jedi;
        });
  }
}

export function makeJedisDriver() {
  function jedisDriver(jediRequest$: Stream<number>) {
    return new JedisSource(jediRequest$);
  }
  return jedisDriver;
}
