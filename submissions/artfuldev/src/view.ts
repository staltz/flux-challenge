import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, h1, section, ul, li, h3, h6, button, VNode } from '@cycle/dom';
import { IApplicationState, IJedi } from './definitions';

function renderSlot(jedi: IJedi): VNode {
  var name = '',
    info = '';
  if (jedi) {
    name = jedi.name || '';
    if (jedi.home)
      info = 'Homeworld: ' + jedi.home;
  }
  return li('.css-slot', [
    h3([name]),
    h6([info])
  ]);
}

function view(state$: Stream<IApplicationState>): ISinks {
  const vTree$ =
    state$
      .map(state => {
        var planetName = '';
        if (state.planet)
          planetName = state.planet.name || '';
        return div('.css-root', [
          h1('.css-planet-monitor', 'Obi-Wan currently on ' + planetName),
          section('.css-scrollable-list', [
            ul('.css-slots', state.jedis.map(renderSlot)),
            div('.css-scroll-buttons', [
              button('.css-button-up'),
              button('.css-button-down')
            ])
          ])
        ]);
      });
  const sinks = {
    dom: vTree$
  };
  return sinks;
}

export default view;
