import React from 'react';
import './index.css';

class SpotifyPlayer extends React.Component {

  componentDidMount() {
    let loadCallback = () => {
      if (!document.getElementById('callback')) {
        let callbackJS = document.createElement('script');
        callbackJS.setAttribute('id', 'callbackJS');
        callbackJS.setAttribute('src', './callback.js');
        callbackJS.setAttribute('type', 'text/javascript')
        document.body.appendChild(callbackJS);
        callbackJS.onload = () => {
          console.log("it's alright now, in fact it's an ideal gas");
        }
      }
    }

    let spotifyJS = document.createElement('script');
    spotifyJS.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
    spotifyJS.setAttribute('type', 'text/javascript')
    if (!document.getElementById('spotifyJS')) {
      document.body.appendChild(spotifyJS);
      loadCallback()
      spotifyJS.onload = () => {
        console.log('spotify-loaded');
        loadCallback()
      }
    }

  } // end componentDidMount

  render() {

    return (
      <div className="SpotifyPlayer row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <button id="getstate">Get State</button>
          </div>
        </div>
      </div>
    );
  }
}



export default SpotifyPlayer;
