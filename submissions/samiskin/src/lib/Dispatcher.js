import Store from 'Store';


class Dispatcher {

  dispatch(payload) {
    Store.dispatch(payload);
  }

}

export default new Dispatcher();
