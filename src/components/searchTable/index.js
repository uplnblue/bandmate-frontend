import React from 'react';
import './index.css';

class SearchTable extends React.Component {
  render() {
    return (
      <table className="eventsTable table table-light">
        { this.props && this.props.tracks &&
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
        </tbody>

        <tfoot></tfoot>
      </table>
    );
  }
}

export default SearchTable;
