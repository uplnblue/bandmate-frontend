import React from 'react';
import './index.css';
import BandmatePlayer from '../bandmatePlayer'

class SpotifyPlayer extends React.Component {

  constructor() {
    super();

    this.state = {
      device_id : null,
      loading_state: "loading"
    }
  }

  componentWillUnmount() {
    // disconnect the Spotify Web Player if the user navigates away
    let discon_player = document.getElementById('discon-player');
    discon_player.click()
  }

  componentDidMount() {

    // LOAD SPOTIFY PLAYER
    let loadSpotify = () => {
      let spotifyJS = document.createElement('script');
      spotifyJS.src = 'https://sdk.scdn.co/spotify-player.js';
      spotifyJS.id = 'spotifyJS';
      spotifyJS.type = 'text/javascript';
      if (!document.getElementById('spotifyJS')) {
        document.body.appendChild(spotifyJS);
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
      // get spotify_uri from state, to play the song
      let spotify_uri = this.props.track.uri;
      // get the track_id from the spotify_uri to request the audio analysis
      // spotify:track:1hIQPCM3oWXrpnXmgTDaKG
      let track_id = spotify_uri.split(':')[2]
      // temporarily this is always False
      // TODO: make UI to choose precision
      let bySection = false;

      let theta_array = [];
      let start_array = [];

      // REQUEST AUDIO ANALYSIS from BandMate backend (--> Spotify)
      const URL = `https://bandmate-backend-1001.herokuapp.com/api/timbre_analysis?track_id=${track_id}&bySection=${bySection}`

      this.setState({
        loaded_state: "loading"
      });

      fetch(URL, { method: 'GET' })
      .then(res => res.json()) // the .json method handles the promise
      .then(res_json => {
        theta_array = Array.from(res_json.data.thetas);
        start_array = Array.from(res_json.data.start_times);
        this.setState({
          loaded_state: "loaded"
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({loaded_state: "error"})
      })
      // takes position in song in microseconds and returns
      // the theta that should be displayed for that time in the song
      // start_array unit is seconds so convert to ms

      let theta_start = 0;
      let getCurrentTheta = (position) => {
        for (let ind=0; ind < start_array.length; ind++) {
          if (parseInt(position) <= (parseInt(start_array[ind]*1000))) {
            theta_start = `${parseFloat(theta_array[ind-1]).toFixed(2)}:${ind}`;
            return theta_start;
          }
        }
      }

      loadSpotify()
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
      const sdk = new Player({name: "BandMate Web Playback SDK",
                              volume: 1.0,
                              getOAuthToken: callback => { callback(this.props.access_token);
                              }
                            });

      sdk.addListener('ready', ({ device_id }) => {
        this.setState({device_id});
      });

      let connected = await sdk.connect();

      if (connected) {
        await waitForDeviceId();
        // play the song!
        play({spotify_uri, sdk})
      }

      let togglePlay = async(e) => {
        e.preventDefault();
        sdk.getCurrentState()
        .then(player_state => {
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

      // controls polling for current position of song to sync with visualisation of timbre vectors
      let ani_running = false;
      let ani_interval = '';
      //  on-click function to start and stop the polling
      let toggleAnimation = () => {
        if (!ani_running) {
          ani_running = true;
          let prevInd = 0;
          let text_pos = document.getElementById('text-pos');
          let text_theta_start = document.getElementById('text-theta-start');
          let ani_theta = document.getElementById('ani-theta')
          let gs_3 = document.getElementById('gs-3');
          let gs_4 = document.getElementById('gs-4');
          // initialise animation color to Spotify brand green
          gs_3.style.backgroundColor = 'rgb(29, 185, 84)'
          gs_4.style.backgroundColor = 'rgb(29, 185, 84)'
          // visualisation definition
          ani_interval = setInterval(async () => {
             sdk.getCurrentState()
                .then(response => { if (response) {
                  text_pos.value = `${response.position} ms`;
                  let theta = 0;
                  let currentInd = 0;
                  let theta_and_ind = getCurrentTheta(parseInt(response.position));
                  if (theta_and_ind !== undefined) {
                    theta_and_ind = theta_and_ind.split(':');
                    theta = theta_and_ind[0];
                    currentInd = theta_and_ind[1];
                  }

                  text_theta_start.value = theta + '\xb0';
                  // rotate to the current theta
                  ani_theta.style.transform=`rotate(-${theta}deg)`;
                  // toggle color of ani_theta between Spotify green and black
                  if (currentInd !== prevInd) {
                    if (gs_3.style.backgroundColor === 'rgb(29, 185, 84)') {
                      gs_3.style.backgroundColor = 'rgb(25, 20, 20)'
                      gs_4.style.backgroundColor = 'rgb(25, 20, 20)'
                    } else {
                      gs_3.style.backgroundColor = 'rgb(29, 185, 84)'
                      gs_4.style.backgroundColor = 'rgb(29, 185, 84)'
                    }
                  }

                  prevInd = currentInd;


                } else {
                  text_pos.value = 'nothing playing';
                  text_theta_start.value = 'nothing playing';
                }
              });
            },
                  100);
        } else {
          clearInterval(ani_interval);
          ani_running = false;
        }
      };
      // add the onclick function to the button
      let tog_ani = document.getElementById('toggle-ani');
      tog_ani.onclick = toggleAnimation;

    })();

  } // end componentDidMount

  render() {

    return (
      <div className="SpotifyPlayer">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {/* Component: player and segment creation controls */}
            <BandmatePlayer track={this.props.track} {...this.state} />
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
