import { ISources } from './definitions';
import { Stream } from 'xstream';

export interface IIntent {
  nameChanged$: Stream<string>
}

function intent(sources: ISources): IIntent {
  const dom = sources.dom;
  const intent = {
    nameChanged$: dom
      .select('.field')
      .events('input')
      .map(ev => (ev.target as HTMLInputElement).value)
      .startWith('')
  };
  return intent;
}

export default intent;