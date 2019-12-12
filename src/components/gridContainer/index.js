import React from 'react';
import './index.css';

class GridContainer extends React.Component {

  render() {
    return(
      <div className="GridContainer">

        <div className="mask">
          <div className="row" id="transp">
          </div>
          <div className="row" id='opaque'>
            The angle is the angle between the current and previous 12-d timbre vectors as provided by <a rel="noopener noreferrer" target="_blank" href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">Spotify's Audio Analsyis API</a>
          </div>
        </div>

        <div className="grid-container" id="ani-theta">
          <div className="row">
            <div className="grid-square" id="gs-1">
            </div>
            <div className="grid-square" id="gs-2">
            </div>
          </div>

          <div className="row">
            <div className="grid-square" id="gs-3">
            </div>
            <div className="grid-square" id="gs-4">
            </div>
          </div>

        </div>
      </div>
    ); // end return
  } // end render
} // end class



export default GridContainer;
