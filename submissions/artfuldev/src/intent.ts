import { ISources, IPlanet } from './definitions';
import { Stream } from 'xstream';

export interface IIntent {
  planet$: Stream<string>;
}

function intent(sources: ISources): IIntent {
  const dom = sources.dom;
  const ws = sources.ws;
  const intent = {
    planet$: ws.message$
      .map(message => (JSON.parse(message) as IPlanet).name)
  };
  return intent;
}

export default intent;
