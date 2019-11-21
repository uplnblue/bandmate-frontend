window.onSpotifyWebPlaybackSDKReady = () => {
  const access_token = 'BQDYYP8wHX_htNJheJskSB0Akz6fUzx0QRUFf-IIj4_mNwttkPG5wjQ55aIqfRTChii7be7oCtNHnPtc0rim3p1sZNU9Nmv9jB40QRDU3_W-VZBBlwGmr6rhwWpatli4PrJkUcGG58Hfif2psY-Q5sl7LXqJos4cRGA';
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
