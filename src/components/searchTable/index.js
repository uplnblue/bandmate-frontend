import React from 'react';
import './index.css';
import SearchTableItem from '../searchTableItem';

class SearchTable extends React.Component {
  render() {
    console.log(this.props);
    return (
      <table className="SearchTable table table-light">
        {
          this.props && this.props.tracks &&
          <thead>
            <tr>
              <td>Name</td>
              <td>Artist</td>
              <td>Album</td>
              <td>Duration</td>
              <td>Popularity</td>
              <td>Play It!</td>
            </tr>
          </thead>
        }
        <tbody>
          {
            this.props && this.props.tracks && this.props.tracks.map(track =>
          <SearchTableItem play={this.props.play} track={track} key={track.uri}/>)
          }
        </tbody>
        <tfoot>
          <tr>
            {
              this.props && this.props.previous &&
              <td colSpan='3'>
                <button id={this.props.previous} onClick={this.props.pageTracks}>Previous
                </button>
              </td>
            }
            {
              this.props && this.props.next &&
              <td colSpan='3'>
                <button id={this.props.next} onClick={this.props.pageTracks}>Next
                </button>
              </td>
            }
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default SearchTable;
