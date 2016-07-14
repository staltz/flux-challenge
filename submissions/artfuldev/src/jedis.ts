import { Stream, Producer, Listener } from 'xstream';
import { HTTPSource } from '@cycle/http';
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

export function isJediUrl(url: string): boolean {
  return url.indexOf(JEDI_URL) === 0;
}

function jediRequests(http: HTTPSource, state$: Stream<IApplicationState>): Stream<string> {
  const xs = Stream;
  const jediRequest$ =
    state$
      .map(state => xs.fromArray(state.jediRequests))
      .flatten()
      .map(id => JEDI_URL + id);
  return jediRequest$;
}

export default jediRequests;
