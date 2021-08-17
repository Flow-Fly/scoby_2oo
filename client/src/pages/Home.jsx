import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import apiHandler from '../api/apiHandler';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    items: null,
  };

  async componentDidMount() {
    try {
      const { data } = await apiHandler.getItems;
      console.log("datat received",data)
      this.setState({
        items: data,
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    console.log(this.state.items)
    if (this.state.items === null)
      return <div className="loading">Loading...</div>;
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[48.852209, 2.355411]} />
          </Layer>
        </Map>
        ;
      </div>
    );
  }
}

export default Home;
