import { Stream } from 'xstream';
import { ISinks } from './definitions';
import { div, h1, section, ul, li, h3, h6, button, VNode } from '@cycle/dom';
import { IApplicationState } from './definitions';
import { IJedi } from './drivers/jedis';

function renderJediSlot(jedi: IJedi, state: IApplicationState): VNode {
  const matched = state.matchedId == (jedi && jedi.id);
  const props = { style: { color: matched ? 'red' : null } };
  return li('.css-slot', props,
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
        const matched = state.matchedId !== -1;
        return div('.css-root', [
          h1('.css-planet-monitor', 'Obi-Wan currently on ' + planetName),
          section('.css-scrollable-list', [
            ul('.css-slots', state.jedis.map(jedi => renderJediSlot(jedi, state))),
            div('.css-scroll-buttons', [
              button('.css-button-up' + disableIfNotAllowed(up && !matched)),
              button('.css-button-down' + disableIfNotAllowed(down && !matched))
            ])
          ])
        ]);
      });
  return vNode$;
}

export default view;
