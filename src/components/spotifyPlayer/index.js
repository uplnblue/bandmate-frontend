import React from 'react';
import './index.css';

class SpotifyPlayer extends React.Component {

  constructor() {
    super();

    this.state = {
      device_id : null
    }
  }

  componentDidMount() {

    let loadSpotify = () => {
      let spotifyJS = document.createElement('script');
      spotifyJS.src = 'https://sdk.scdn.co/spotify-player.js';
      spotifyJS.id = 'spotifyJS';
      spotifyJS.type = 'text/javascript';
      if (!document.getElementById('spotifyJS')) {
        document.body.appendChild(spotifyJS);
        spotifyJS.onload = () => {
          console.log('Spotify loaded');
        }
      }
    }; // end loadSpotify

    async function waitForSpotifyWebPlaybackSDKToLoad() {
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

    let waitForDeviceId = async() => {
      return new Promise(resolve => {
        let interval = setInterval(async () => {
          let device_id = this.state.device_id;
          // wait for sdk "ready" event and setState to set device_id
          if (device_id !== null) {
            resolve(device_id);
            clearInterval(interval);
          }
        })
      });
    }

    // function to play the chosen track in the web sdk
    const play = ({ spotify_uri,
                    sdk: {
                            _options: {
                                      getOAuthToken,
                                      id
                                    }
                          }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.device_id}`,
              { method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.props.access_token}`
                          },
              })
              .catch(err => console.log(err))
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
        this.setState({device_id});
      });

      let connected = await sdk.connect()
      if (connected) {
        let spotify_uri = this.props.spotify_uri;
        let device_id = await waitForDeviceId();
        console.log(spotify_uri, ' ', device_id);
        play({spotify_uri, sdk})
      }
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
