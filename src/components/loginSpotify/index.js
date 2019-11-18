import React, { Component } from 'react';
import './index.css';


class LoginSpotify extends Component {
  render() {
    return (
      <div className="row LoginSpotify">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.props.getImplicitGrantToken}>
            <input type="submit" value="Login to Spotify"/>
          </form>
        </div>
      </div>
    );
  }
};


export default LoginSpotify;
