import React, { Component } from 'react';
import './index.css';


class SearchForm extends Component {
  render() {
    return (
      <div className="row SearchForm">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.props.searchSpotify}>
            <input type="text" name="artist" placeholder="Artist..."/>
            <input type="text" name="album" placeholder="Album..." />
            <input type="text" name="song" placeholder="Song title..." />
            <input type="submit" value="Search Spotify"/>
          </form>
        </div>
      </div>
    );
  }
};


export default SearchForm;
