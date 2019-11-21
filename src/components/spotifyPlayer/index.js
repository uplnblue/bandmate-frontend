import React from 'react';
import './index.css';

class SpotifyPlayer extends React.Component {

  componentDidMount() {

    let loadCallback = () => {
      if (!document.getElementById('callback')) {
        let callbackJS = document.createElement('script');
        callbackJS.defer = true;
        callbackJS.id = 'callbackJS';
        callbackJS.src = './callback.js';
        callbackJS.type = 'text/javascript';
        document.body.appendChild(callbackJS);
        callbackJS.onload = () => {
          loadSpotify()
          console.log("it's alright now, in fact it's an ideal gas");
        }
      }
    } // end loadCallback

    let loadSpotify = () => {
      let spotifyJS = document.createElement('script');
      spotifyJS.src = 'https://sdk.scdn.co/spotify-player.js';
      spotifyJS.id = 'spotifyJS'
      spotifyJS.type = 'text/javascript';
      spotifyJS.defer = true;
      if (!document.getElementById('spotifyJS')) {
        document.body.appendChild(spotifyJS);
        spotifyJS.onload = () => {
          console.log('spotify loaded');
        }
      }
    } // end loadSpotify

    // load both scripts
    loadCallback();

  } // end componentDidMount

  render() {

    return (
      <div className="SpotifyPlayer row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <button className="nowplaying" id={this.props.spotify_uri}>Play</button>
            <button id="getstate">Get State</button>
          </div>
        </div>
      </div>
    );
  }
}



export default SpotifyPlayer;
