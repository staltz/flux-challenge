import _ from 'lodash';
import Store from 'Store';

import {ADD_SITH, DELETE_SITH} from 'actions/SithActions';

/*
  Sith: {
    id: Number,
    name: String,
    url: String,
    homeworld: {
      id: Number,
      name: String
    },
    master: {
      url: String,
      id: Number
    },
    apprentice: {
      url: String,
      id: Number
    }
  }
}

*/

let exampleSith1 = {"id":5956,"name":"Darth Tenebrous","homeworld":{"id":90,"name":"Clak'dor VII"},"master":{"url":"http://localhost:3000/dark-jedis/1121","id":1121},"apprentice":{"url":"http://localhost:3000/dark-jedis/2350","id":2350}};
let exampleSith2 = {"id":2350,"name":"Darth Plagueis","homeworld":{"id":83,"name":"Mygeeto"},"master":{"url":"http://localhost:3000/dark-jedis/5956","id":5956},"apprentice":{"url":"http://localhost:3000/dark-jedis/3616","id":3616}};
let exampleSith3 = {'id':3616,'name':'Darth Sidious','homeworld':{'id':7,'name':'Naboo'},'master':{'url':'http://localhost:3000/dark-jedis/2350','id':2350},'apprentice':{'url':'http://localhost:3000/dark-jedis/1489','id':1489}}; //eslint-disable-line
let exampleSith4 = {"id":1489,"name":"Darth Vader","homeworld":{"id":18,"name":"Tatooine"},"master":{"url":"http://localhost:3000/dark-jedis/3616","id":3616},"apprentice":{"url":"http://localhost:3000/dark-jedis/1330","id":1330}};
let exampleSith0 = {"id":1330,"name":"Antinnis Tremayne","homeworld":{"id":58,"name":"Coruscant"},"master":{"url":"http://localhost:3000/dark-jedis/1489","id":1489},"apprentice":{"url":null,"id":null}};
class SithStore {

  getSiths() {
    return Store.getState().siths;
  }

  // initialState = [
  //   {name: 'Skeere Khan', homeworld: 'Coruscant', id: 0},
  //   {name: 'Skeere Khan', homeworld: 'Coruscant', id: 1},
  //   {name: 'Skeere Khan', homeworld: 'Coruscant', id: 2},
  //   {name: 'Skeere Khan', homeworld: 'Coruscant', id: 3},
  //   {name: 'Skeere Khan', homeworld: 'Coruscant', id: 4},
  // ]

  initialState =  {
    5956: exampleSith1,
    2350: exampleSith2,
    3616: exampleSith3,
    1489: exampleSith4,
    1330: exampleSith0,
  }

  reduce(siths = this.initialState, action) {
    switch (action.type) {
    case ADD_SITH:
      let update = {}; update[action.data.id] = action.data;
      return _.assign({}, siths, update);
    case DELETE_SITH:
      return _.omit(siths, action.data);
    default:
      return siths;
    }
  }
}

export default new SithStore();
