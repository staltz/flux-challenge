import { ISources, ISinks, IPlanet } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';

function main(sources: ISources): ISinks {
  const ws = sources.ws;
  const planet$ =
    ws.message$
      .map(message => (JSON.parse(message) as IPlanet).name);
  return view(model(planet$, intent(sources)));
}

export default main;
