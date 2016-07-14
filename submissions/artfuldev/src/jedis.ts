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

export function jediRequests(http: HTTPSource, state$: Stream<IApplicationState>): Stream<RequestOptions> {
  const xs = Stream;
  const jediRequest$ =
    state$
      .map(state =>
        xs.fromArray(
          state.jediRequests
            .filter(r =>
              state.jedis
                .filter(j => !!j)
                .map(j => j.id)
                .indexOf(r) === -1)))
      .flatten()
      .map(id => {
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
      .map((response: Response) =>
        JSON.parse(response.text) as IJedi
      );
  return jedi$;
}
