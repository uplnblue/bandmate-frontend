import React from 'react';
import './index.css';

function SearchTableItem(props) {
  return (
    <tr>
      <td>{props.track.name}</td>
      <td>{props.track.artists[0].name}</td>
      <td>{props.track.album.name}</td>
      <td>{props.track.duration_ms / 1000}</td>
      <td>{props.track.popularity}</td>
      <td><button id={props.track.uri} onClick={props.play}>Play</button></td>
    </tr>
  );
}

export default SearchTableItem;
