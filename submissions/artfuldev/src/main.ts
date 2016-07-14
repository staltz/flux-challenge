import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';

function main(sources: ISources): ISinks {
  const planet$ = sources.planets.planet$;
  return view(model(planet$, intent(sources)));
}

export default main;
