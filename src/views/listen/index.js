import React, { Component } from 'react';
import Config from '../../config.js';
import './index.css';
import { NavLink } from 'react-router-dom';
import SearchForm from '../../components/searchForm';
import LoginSpotify from '../../components/loginSpotify'

class Listen extends Component {
  constructor() {
    super();

    this.state = {
      'access_token' : '',
      'token_type' : '',
      'expires' : '',
      'error' : '',
      'state' : '',
    }
  }

  componentDidMount() {
    // TODO: set state "token" object to the access_token in the url query string, if it exists
    let location_hash = window.location.hash;

    /*
      http://localhost:3000/listen#access_token=BQDTe_f-uhjG6pFMqP4_90QOOugR5upJjMMPCT5u_ZJpEmdZ6WlBeJHgBdlNm1n65_HGmI7Oe-sjfE-b0ViN5Y7y5sKP0pxwKQQtn_fctH5W5M_WYk40lvh7jHNt-jHe7KB_boS9_yO_S5t6lIBBL0lmrWoTYHs&token_type=Bearer&expires_in=3600
     */

    // parse the url to get the access token

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
        }
        if (pkey === 'error') {
          this.setState({ 'error' : pvalue });
        }

      }
    }
    // let checkError = /^[#]error/;
    // let checkSuccess = /^[#]access_token=([\S]+)/;
    //
    // let location_hash_array = window.location.hash.split('&')
    // let token = false;
    // for (let i in location_hash_array) {
    //   token = location_hash_array[i].match(checkSuccess);
    //   console.log(location_hash_array[i]);
    //   console.log(token);
    // }

  }


// TODO: is there any difference between how I declared this fxn and how I declared searchSpotify?  is there any difference between "async" and the whole "promise object" thing?
  async getImplicitGrantToken(e) {
    e.preventDefault();

    let c = new Config();
    const client_id = encodeURIComponent(c.getClientId());
    // has to start with http:// apparently... this might actually work for this simply stuff, might not have to set up a whole server
    const redirectURL = encodeURIComponent('http://localhost:3000/listen');
    // authorise with spotify using implicit grant auth flow
    // this supposendly can b`e down entirely throw javascript
    // and you pass info around in the url...
    const URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectURL}&scope=user-read-private&response_type=token`;

    console.log(URL);
    // make the call
    window.location = URL;
    // this will redirect to a URL that includes an access token_type
  }

  searchSpotify = async(e) => {
    e.preventDefault();
    // let artist = e.target.elements.year.value;
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
    .then(res => res.json())
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err))

    }
}


  render() {
    // TODO: set up a conditional render that depends on the location
    // maybe can use switch ... maybe just use if statement
    return (
      <div className="Listen">
      {
        window.location.hash ?
        (<SearchForm searchSpotify={this.searchSpotify}/>) :
        (<LoginSpotify getImplicitGrantToken={this.getImplicitGrantToken}/>)
      }

      </div>
    );
  }
};

export default Listen;
