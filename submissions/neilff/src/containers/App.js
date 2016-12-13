import React, { Component } from 'react';

import PlanetIndicator from '../components/PlanetIndicator';
import SithLordsList from '../components/SithLordsList';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="css-root">
          <PlanetIndicator />
          <SithLordsList />
        </div>
      </div>
    );
  }
}

export default App;
