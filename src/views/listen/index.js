import React, { Component } from 'react';
import Config from '../../config.js';
import './index.css';
import { NavLink } from 'react-router-dom';
import SearchForm from '../../components/searchForm';

class Listen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // TODO: set state "token" object to the access_token in the url query string, if it exists
  }
// TODO: is there any difference between how I declared this fxn and how I declared searchSpotify?  is there any difference between "async" and the whole "promise object" thing?
  async getImplicitGrantToken() {
    let c = new Config();
    const client_id = encodeURIComponent(c.getClientId());
    // has to start with http:// apparently... this might actually work for this simply stuff, might not have to set up a whole server
    const redirectURL = encodeURIComponent('http://localhost:3000/listen');
    // authorise with spotify using implicit grant auth flow
    // this supposendly can b`e down entirely throw javascript
    // and you pass info around in the url...
    const URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirectURL}&scope=user-read-private&response_type=token`;
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


    // TODO: this doesn't really work, so just make a separate view with a login button and then it reloads Listen but with the access token
    await this.getImplicitGrantToken();
    setTimeout(function() {console.log(window.location.hash)}, 1000)

    /*
      http://localhost:3000/listen#access_token=BQDTe_f-uhjG6pFMqP4_90QOOugR5upJjMMPCT5u_ZJpEmdZ6WlBeJHgBdlNm1n65_HGmI7Oe-sjfE-b0ViN5Y7y5sKP0pxwKQQtn_fctH5W5M_WYk40lvh7jHNt-jHe7KB_boS9_yO_S5t6lIBBL0lmrWoTYHs&token_type=Bearer&expires_in=3600
     */

    // parse the url to get the access token

    // URL is Spotify search endpoint https://api.spotify/v1/search/
  //   const URL = `https://api.spotify/v1/search/?q=${track}&type=track`;



}


  render() {
    // TODO: set up a conditional render that depends on the location
    // maybe can use switch ... maybe just use if statement
    return (
      <div className="Listen">
        <SearchForm searchSpotify={this.searchSpotify}/>
      </div>
    );
  }
};

export default Listen;
