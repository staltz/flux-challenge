import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, h1, section, ul, li, h3, h6, button, VNode } from '@cycle/dom';
import { IApplicationState } from './definitions';
import { IJedi } from './drivers/jedis';

function renderJediSlot(jedi: IJedi): VNode {
  return li('.css-slot',
    jedi
      ? [
        h3([jedi.name]),
        h6(['Homeworld: ' + jedi.homeworld.name])
      ]
      : []
  );
}

function disableIfNotAllowed(allowed: boolean): string {
 return (allowed ? '' : '.css-button-disabled')
}

function view(state$: Stream<IApplicationState>): Stream<VNode> {
  const vNode$ =
    state$
      .map(state => {
        const down = state.down;
        const up = state.up;
        const planetName = (state.planet && state.planet.name) || '';
        return div('.css-root', [
          h1('.css-planet-monitor', 'Obi-Wan currently on ' + planetName),
          section('.css-scrollable-list', [
            ul('.css-slots', state.jedis.map(renderJediSlot)),
            div('.css-scroll-buttons', [
              button('.css-button-up' + disableIfNotAllowed(up)),
              button('.css-button-down' + disableIfNotAllowed(down))
            ])
          ])
        ]);
      });
  return vNode$;
}

export default view;
