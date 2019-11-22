import React from 'react';
import './index.css';

class SpotifyPlayer extends React.Component {

  componentDidMount() {

    let loadSpotify = () => {
      let spotifyJS = document.createElement('script');
      spotifyJS.src = 'https://sdk.scdn.co/spotify-player.js';
      spotifyJS.id = 'spotifyJS'
      spotifyJS.type = 'text/javascript';
      if (!document.getElementById('spotifyJS')) {
        document.body.appendChild(spotifyJS);
        spotifyJS.onload = () => {
          console.log('spotify loaded');
        }
      }
    } // end loadSpotify

    async function waitForSpotifyWebPlaybackSDKToLoad () {
      return new Promise(resolve => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
          };
        }
      });
    };

    (async () => {
      loadSpotify()
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
      console.log("The Web Playback SDK has loaded.");
      const sdk = new Player({name: "BandMate Web Playback SDK",
                              volume: 1.0,
                              getOAuthToken: callback => { callback(this.props.access_token);
                              }
                            });
      sdk.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
    })();


  } // end componentDidMount

  render() {

    return (
      <div className="SpotifyPlayer row">
        <div className="col-md-6 offset-md-3">

        </div>
      </div>
    );
  }
}



export default SpotifyPlayer;
