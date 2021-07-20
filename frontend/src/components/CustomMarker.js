import * as React from 'react';
import {MapContext, Popup} from 'react-map-gl';
import mark from "../imgs/marker.png"
import "../App.css"


function CustomMarker(props) {
    const context = React.useContext(MapContext);
    
    const {longitude, latitude} = props;
  
    const [x, y] = context.viewport.project([longitude, latitude]);
  
    const markerStyle = {
      position: 'absolute',
      left: x,
      top: y,
    };

    
    const [showPopup, togglePopup] = React.useState(false);
  
    return (
      <div style={markerStyle} onClick={() => togglePopup(!showPopup)}>
        <img id='marker-img' src={mark} alt={({longitude}, {latitude})} />
        {showPopup &&
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <p>Some text in the Modal..</p>
            </div>        
          </div>
        }
      </div>
    );
}


export default CustomMarker;