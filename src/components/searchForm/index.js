import React, { Component } from 'react';
import './index.css';


class SearchForm extends Component {
  render() {
    return (
      <div className="SearchForm">
        <form onSubmit={this.props.searchSpotify}>
          <input type="text" name="song" placeholder="Song title..." />
          <input type="submit" value="Search Spotify"/>
        </form>
      </div>
    );
  }
};


export default SearchForm;
