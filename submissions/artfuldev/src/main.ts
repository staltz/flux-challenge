import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';

function main(sources: ISources): ISinks {
  return view(model(intent(sources)));
}

export default main;
