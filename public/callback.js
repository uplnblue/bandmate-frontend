window.onSpotifyWebPlaybackSDKReady = () => {
  const access_token = 'BQBjHn9F4xfKjBXiwtaL1OovUNxLEtFyLCg0nWpBXXG53s_ObnpD06pxSWMn1J_vRUFA7HXpzfaDTTiE-fOnB6Y6opc8sYO1SVWvCj8unZOWRVB1zs8VMp-rHJLPL04iwm32J_Me0Ud03GYOyQki_fCpoqp0dqo9vm4';
  const player = new Spotify.Player({
    name: 'BandMate Player',
    getOAuthToken: cb => { cb(access_token); }
  });
  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    console.log('player-state-changed');
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });


  // Connect to the player!
  player.connect();

  let getState = async (e) => {
    console.log('in on-click function of Get State button');
    e.preventDefault();
    player.getCurrentState().then(state => {
      if (!state) {
        console.error('nothing playing');
        return;
      }
      console.log(state.position);
    });
  }
  document.getElementById('getstate').onclick = getState;
  console.log("this ran");
}; // end onSpotifyWebPlaybackSDKReady
