import React from 'react';
import './index.css';
import BandmatePlayer from '../bandmatePlayer'

class SpotifyPlayer extends React.Component {

  constructor() {
    super();

    this.state = {
      device_id : null
    }
  }

  componentWillUnmount() {
    // disconnect the Spotify Web Player if the user navigates away
    let discon_player = document.getElementById('discon-player');
    discon_player.click()
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
    };

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

    // main function, add all listeners to UI elements inside of it
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
        let spotify_uri = this.props.track.uri;
        await waitForDeviceId();
        // play the song!
        play({spotify_uri, sdk})
      }

      let togglePlay = async(e) => {
        e.preventDefault();
        sdk.getCurrentState().then(player_state => {
          if (player_state) {
            sdk.togglePlay().catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
      };
      // add togglePlay onclick so user can play/pause track
      let play_pause = document.getElementById('play-pause');
      play_pause.onclick = togglePlay;

      let discon_player = document.getElementById('discon-player');
      discon_player.onclick = (e) => { sdk.disconnect() };
    })();

  } // end componentDidMount

  render() {

    return (
      <div className="SpotifyPlayer">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {/* Component: player and segment creation controls */}
            <BandmatePlayer track={this.props.track} />
          </div>
        </div>


          {/* Component: table displays existing segments */}
          {/* segment #, start, end, seek btn, notes, save */}
          {/* save causes a Form component to appear */}

          {/* Component: form */}
          {/* "Add instrumemt" btn */}
          {/* table with selectable inputs:
            category-->list of instruments
            notes (user can be more specific...)
            */}
      </div>
    );
  } // end render
} // end class



export default SpotifyPlayer;
