import React from 'react';
import './index.css';

class SpotifyPlayer extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="SpotifyPlayer row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <button onClick={this.props.getPlayerState}>Get State</button>
          </div>
        </div>
      </div>
    );
  }
}



export default SpotifyPlayer;
