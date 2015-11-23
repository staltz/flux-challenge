import Store from 'Store';

class SithStore {

  getSiths() {
    return Store.getState().siths;
  }

  initialState = [
    {name: 'Skeere Khan', homeworld: 'Coruscant', id: 0},
    {name: 'Skeere Khan', homeworld: 'Coruscant', id: 1},
    {name: 'Skeere Khan', homeworld: 'Coruscant', id: 2},
    {name: 'Skeere Khan', homeworld: 'Coruscant', id: 3},
    {name: 'Skeere Khan', homeworld: 'Coruscant', id: 4},
  ]
  reduce(siths = this.initialState, action) {
    switch (action.type) {
    default:
      return siths;
    }
  }
}

export default new SithStore();
