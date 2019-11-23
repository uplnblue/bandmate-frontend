import React, { Component } from 'react';
import Config from '../../config.js';
import './index.css';
import { NavLink } from 'react-router-dom';
import SearchForm from '../../components/searchForm';
import SearchTable from '../../components/searchTable';
import LoginSpotify from '../../components/loginSpotify';
import SpotifyPlayer from '../../components/spotifyPlayer';


class Listen extends Component {
  constructor() {
    super();

    this.state = {
      'access_token' : '',
      'token_type' : '',
      'expires': '',
      'time_granted': '',
      'time_expires' : '',
      'error' : '',
      'state' : '',
      'cur_tracks': '',
      'tracks_paging': {
        'next_tracks': '',
        'prev_tracks' : '',
        'total_tracks' : ''
      },
      'spotify_uri' : ''
    }
  }

  componentDidMount() {
    let location_hash = window.location.hash;

    /* EXAMPLE OF URL user is redirected to
      http://localhost:3000/listen#access_token=BQDTe_f-uhjG6pFMqP4_90QOOugR5upJjMMPCT5u_ZJpEmdZ6WlBeJHgBdlNm1n65_HGmI7Oe-sjfE-b0ViN5Y7y5sKP0pxwKQQtn_fctH5W5M_WYk40lvh7jHNt-jHe7KB_boS9_yO_S5t6lIBBL0lmrWoTYHs&token_type=Bearer&expires_in=3600
     */

    // get response values from window.location.hash

    if (location_hash) {
      console.log('there is a hash');
      // remove '#' and separate into query params
      let location_hash_array = window.location.hash.slice(1).split('&')
      for (let i in location_hash_array) {
        // split each query param into key value pairs
        let key_value = location_hash_array[i].split('=')
        let pkey = key_value[0];
        let pvalue = key_value[1];
        console.log(pkey+' '+ pvalue);
        if (pkey === 'access_token') {
          this.setState({ 'access_token' : pvalue });
          // it expires an hour from now (3600000ms)
          this.setState({ 'time_expires' : Date.now() + 3550000 })
        }
        if (pkey === 'error') {
          this.setState({ 'error' : pvalue });
        }

      }
    }
  }


  async getImplicitGrantToken(e) {
    e.preventDefault();

    let c = new Config();
    const client_id = encodeURIComponent(c.getClientId());
    // redirect url must inlude protocol, e.g. start with http://
    const redirectURL = encodeURIComponent('http://localhost:3000/listen');
    // authorise with spotify using implicit grant auth flow
    // Required scopes: ["streaming", "user-read-email", "user-read-private"] form searching and loading web player
    // required scopes for controlling spotify devices: user-modify-playback-state
    const URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectURL}&scope=user-read-private,streaming,user-read-email,user-modify-playback-state&response_type=token`;

    console.log(URL);
    // make the call
    window.location = URL;
    // this will redirect to a URL that includes an access token
  }

  searchSpotify = async(e) => {
    e.preventDefault();
    // let artist = e.target.elements.artist.value;
    // let album = e.target.elements.album.value;
    let track = e.target.elements.song.value;

    // replaces spaces with +
    track = track.split(' ');
    track = track.join('+');
    console.log(track);

    // URL is Spotify search endpoint https://api.spotify/v1/search/
    const URL = `https://api.spotify.com/v1/search?q=${track}&type=track`;
    console.log(URL);

    if (this.state.access_token) {
      console.log(this.state.access_token);

      fetch(URL, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + ' ' + this.state.access_token,
      }
    })
    .then(result => result.json())
    .then(json_result => {
      console.log(json_result);
      if (json_result.tracks) {
          console.log('about to setState with tracks')
          // store data about the tracks in state
          this.setState({'cur_tracks' : json_result.tracks});
          let temp_paging = {
            'next' : json_result.tracks.next,
            'previous' : json_result.tracks.previous,
            'total' : json_result.tracks.total
          }
          this.setState({'tracks_paging' : temp_paging})
      }
    })
    .catch(err => console.log(err))
    }
  }

  pageTracks = async(e) => {
    e.preventDefault();
    const URL = e.target.getAttribute('id');

    if (this.state.access_token) {
      console.log(this.state.access_token);

      fetch(URL, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + ' ' + this.state.access_token,
      }
    })
    .then(result => result.json())
    .then(json_result => {
      console.log(json_result);
      if (json_result.tracks) {
          console.log('about to setState with tracks')
          // store data about the tracks in state
          this.setState({'cur_tracks' : json_result.tracks});
          let temp_paging = {
            'next' : json_result.tracks.next,
            'previous' : json_result.tracks.previous,
            'total' : json_result.tracks.total
          }
          this.setState({'tracks_paging' : temp_paging})
      }
    })
    .catch(err => console.log(err))
    }
  }

  play = async(e) => {
    e.preventDefault();
    let spotify_uri = e.target.getAttribute('id');
    alert(spotify_uri);
    // TODO: the play function will play that track in the player
    this.setState({spotify_uri});

  }


  render() {
    return (
      <div className="Listen">
      {
        (!this.state.access_token || (Date.now() >= this.state.time_expires)) &&
        <LoginSpotify getImplicitGrantToken={this.getImplicitGrantToken}/>
      }
      {
        (this.state.access_token && (Date.now() < this.state.time_expires) && (!this.state.spotify_uri)) &&
              <div>
                <SearchForm searchSpotify={this.searchSpotify}/>
                <SearchTable tracks={this.state.cur_tracks.items} previous={this.state.tracks_paging.previous} next={this.state.tracks_paging.next}
                pageTracks={this.pageTracks}
                play={this.play}/>
              </div>
        }
        {
          (this.state.access_token && (Date.now() < this.state.time_expires) && (this.state.spotify_uri)) &&
                <div>
                  <SpotifyPlayer access_token={this.state.access_token}
                  spotify_uri={this.state.spotify_uri}/>
                </div>
        }

      </div>
    );
  }
};

export default Listen;
