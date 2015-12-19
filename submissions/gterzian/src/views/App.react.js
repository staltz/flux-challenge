
import React from 'react';
import JediContainer from '../containers/JediContainer.react.js'
import WorldContainer from '../containers/WorldContainer.react.js'

export default class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <div className="css-root">
          <WorldContainer />
          <JediContainer />
        </div>
      </div>
  );
  }

}
