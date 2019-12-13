import React from 'react'
import './index.css';

export default function SpotifyLogo() {
  return(
    <div className="SpotifyLogo">
      <img className="SpotifyLogoPNG img-fluid" src={require("../../static/images/Spotify_Logo_RGB_Black.png")} alt="Spotify_Logo_RGB"/>
    </div>
  );
}
