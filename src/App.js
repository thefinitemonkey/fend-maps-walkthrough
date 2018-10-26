import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';

class App extends Component {
  state = {
    lat: 29.7844913,
    lon: -95.7800231,
    zoom: 13,
    all: locations
  }

  render = () => {
    return (
      <div className="App">
        <div>
          <h1>Katy, TX Mexican Restaurants</h1>
        </div>
        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
      </div>
    );
  }
}

export default App;
