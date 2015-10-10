import React from 'react';
import {createStore} from 'redux';
import {SithUI} from './SithUI';
import {createBehaviour} from './behaviour';
import $ from 'jquery'

/* create our store */
const store = createStore(state => state);

/* create the behaviour (I call it that, because the reducer accesses the store has side-effects) */
function fnReqJedi(url) {
  return $.get(url)
          .done(() => store.dispatch({type: "listUpdate"}));
}
store.replaceReducer(
  createBehaviour(fnReqJedi).reducer
);

/* connect store to UI */
store.subscribe(() => {
  React.render(
    <SithUI state={store.getState()}
            dispatch={store.dispatch} />,
    document.getElementById('app')
  )
})

/* start hopping */
const ws = new WebSocket("ws://localhost:4000")
ws.onmessage = (event) => {
  store.dispatch(Object.assign(JSON.parse(event.data), {type: "planetChanged"}));
}
