import { ISources, IPlanet } from './definitions';
import { Stream } from 'xstream';

export interface IIntent {
  planet$: Stream<string>;
  scrollUp$: Stream<boolean>;
  scrollDown$: Stream<boolean>;

}

function intent(sources: ISources): IIntent {
  const dom = sources.dom;
  const ws = sources.ws;
  const intent = {
    scrollUp$: dom
      .select('.css-button-up')
      .events('click')
      .filter(ev => (ev.target as HTMLElement).className.indexOf('disabled') === -1)
      .mapTo(true),
    scrollDown$: dom
      .select('.css-button-down')
      .events('click')
      .filter(ev => (ev.target as HTMLElement).className.indexOf('disabled') === -1)
      .mapTo(true)
  };
  return intent;
}

export default intent;
