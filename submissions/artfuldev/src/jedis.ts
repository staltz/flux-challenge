import { Stream, Producer, Listener } from 'xstream';
import { HTTPSource, RequestOptions, Response } from '@cycle/http';
import { IApplicationState } from './definitions';

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

export function jediRequests(http: HTTPSource, state$: Stream<IApplicationState>): Stream<RequestOptions> {
  const xs = Stream;
  const jediRequest$ =
    state$
      .map(state => xs.fromArray(state.jediRequests))
      .flatten()
      .filter(id => requestedJedis.indexOf(id) === -1)
      .map(id => {
        requestedJedis.push(id);
        const requestOptions = {
          url: JEDI_URL + id,
          category: 'jedis'
        } as RequestOptions;
        return requestOptions;
      });
  return jediRequest$;
}

export function jedis(http: HTTPSource): Stream<IJedi> {
  const jedi$ =
    http
      .select('jedis')
      .flatten()
      .map((response: Response) => {
        const jedi = JSON.parse(response.text) as IJedi;
        requestedJedis = requestedJedis.filter(x => x !== jedi.id);
        return jedi;
      });
  return jedi$;
}
