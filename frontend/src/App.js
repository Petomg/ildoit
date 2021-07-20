import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {
      FlyToInterpolator, _useMapControl as useMapControl,
      Source, Layer
      } from 'react-map-gl';
import CustomMarker from "./components/CustomMarker"


function CustomControl(props) {
  const [counter, setCounter] = React.useState(0);
  const {context, containerRef} = useMapControl({
    onDragStart: evt => {
      // prevent the base map from panning
      evt.stopPropagation();
    },
    onClick: evt => {
      if (evt.type === 'click') {
        setCounter(v => v + 1);
      }
    }
  });

  return (
    <div ref={containerRef} >
      Clicked {counter} times
    </div>
  );
}


function App() {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoicGV0b21nMSIsImEiOiJja3F4NWo1YzQwdjYxMnFyZ3E0a290Z24zIn0.72F3WpPQz_9ay3pfzpLZ1A'; 

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 1000,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2
  });


  const goToNYC = () => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };


  

  return (
    <div>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v9"
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
      <CustomMarker longitude={-122.45} latitude={37.78}/>
      <CustomControl />
      </ReactMapGL>
      <button onClick={goToNYC}>New York City</button>
    </div>
  );
}
export default App;
