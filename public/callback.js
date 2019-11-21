window.onSpotifyWebPlaybackSDKReady = () => {
  /* EXAMPLE OF URL user is redirected to
    http://localhost:3000/listen#access_token=BQDTe_f-uhjG6pFMqP4_90QOOugR5upJjMMPCT5u_ZJpEmdZ6WlBeJHgBdlNm1n65_HGmI7Oe-sjfE-b0ViN5Y7y5sKP0pxwKQQtn_fctH5W5M_WYk40lvh7jHNt-jHe7KB_boS9_yO_S5t6lIBBL0lmrWoTYHs&token_type=Bearer&expires_in=3600
   */
  let location_hash = window.location.hash;
  let token = '';
  console.log(location_hash);
  if (location_hash) {
    console.log('there is a callback hash');
    // remove '#' and separate into query params
    let location_hash_array = window.location.hash.slice(1).split('&')
    for (let i in location_hash_array) {
      // split each query param into key value pairs
      let key_value = location_hash_array[i].split('=')
      let pkey = key_value[0];
      let pvalue = key_value[1];
      console.log(pkey+' '+ pvalue);
      if (pkey === 'access_token') {
        token = pvalue;
        console.log('got' + ' ' + token);
      }
    }
  }
  const access_token = token ? token : 'no-access-token';
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
  console.log("callback ran");
}; // end onSpotifyWebPlaybackSDKReady
