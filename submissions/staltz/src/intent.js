import {Observable} from 'rx'

function intent(DOM) {
  return {
    scroll$: Observable.merge(
      DOM.select('.scroll-up').events('click').map(() => +2),
      DOM.select('.scroll-down').events('click').map(() => -2)
    )
  }
}

export default intent
