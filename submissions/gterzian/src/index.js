
import React from 'react';
import ReactDom from 'react-dom';
import App from './views/App.react';
import webApi from './utils/web-api';
import WorldActions from './actions/WorldActions'
import JediActions from './actions/JediActions'

ReactDom.render(<App/>, document.getElementById('app'));
webApi.openWs();
webApi.getOne('http://localhost:3000/dark-jedis/3616').then((first) =>{
  webApi.getJedi(first.apprentice.url);
});
