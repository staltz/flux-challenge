import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, label, input, hr, h1 } from '@cycle/dom';
import { IState } from './definitions';

function view(state$: Stream<IState>): ISinks {
  const vTree$ =
    state$
      .map(state =>
        div('#root', [
          label('Name:'),
          input('.field', { attr: { type: 'text' } }),
          hr(),
          h1([state.message]),
        ])
      );
  const sinks = {
    dom: vTree$
  };
  return sinks;
}

export default view;