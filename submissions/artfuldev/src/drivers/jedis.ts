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
var requestedJedis:number[] = [];

export class JedisSource {
  jedi$: Stream<IJedi>;
  constructor(jediRequest$: Stream<number>) {
    const xs = Stream;
    const id$ = jediRequest$.filter(req => req !== -1);
    const cancel$ = jediRequest$.filter(req => req === -1).mapTo(true);
    const request$ =
      id$
        .filter(id => requestedJedis.indexOf(id) === -1)
        .map(id => {
          requestedJedis = requestedJedis.concat(id);
          const requestOptions:RequestOptions = {
            url: JEDI_URL + id,
            category: 'jedis'
          };
          return requestOptions;
        });
    const http: HTTPSource = makeHTTPDriver()(request$, XStreamAdapter);
    const cancel$$ = cancel$.mapTo(xs.of(null));
    const response$$: Stream<Stream<Response>> = http.select('jedis');
    this.jedi$ =
      xs
        .merge(response$$, cancel$$)
        .flatten()
        .filter((response: Response) => {
          const cancelled = !response;
          if(cancelled)
            requestedJedis = [];
          return !cancelled;
        }).map((response: Response) => {
          const jedi: IJedi = JSON.parse(response.text);
          requestedJedis = requestedJedis.filter(id => id !== jedi.id);
          return jedi;
        }).remember();
  }
}

export function makeJedisDriver() {
  function jedisDriver(jediRequest$: Stream<number>) {
    return new JedisSource(jediRequest$);
  }
  return jedisDriver;
}
