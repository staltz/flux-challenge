import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, h1, section, ul, li, h3, h6, button } from '@cycle/dom';
import { IState } from './definitions';

function view(state$: Stream<IState>): ISinks {
  const vTree$ =
    state$
      .map(state =>
        div('.css-root', [
          h1('.css-planet-monitor', 'Obi-Wan currently on ' + state.planet),
          section('.css-scrollable-list', [
            ul('.css-slots', state.jedis.map(jedi =>
              li('.css-slot', [
                h3([jedi.name]),
                h6(['Homeworld: ' + jedi.home])
              ]))),
            div('.css-scroll-buttons', [
              button('.css-button-up'),
              button('.css-button-down')
            ])
          ])
        ])
      );
  const sinks = {
    dom: vTree$
  };
  return sinks;
}

export default view;
