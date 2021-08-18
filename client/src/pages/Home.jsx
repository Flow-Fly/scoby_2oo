import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/global.css'
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
      const data = await apiHandler.getItems();
      this.setState({
        items: data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (this.state.items === null)
      return <div className="loading">Loading...</div>;
      const center = [2.3488, 48.8534]
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={center}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {this.state.items.map((item) => {
            console.log(item.location.coordinates);
            return (
              <Marker
                key={item._id}
                id={item._id}
                anchor="center"
                coordinates={[
                  item.location.coordinates[1],
                  item.location.coordinates[0],
                ]}
              >
                <img className="marker" src={item.image} alt="Gotcha" />
              </Marker>
            );
          })}
        </Map>
        ;
      </div>
    );
  }
}

export default Home;
