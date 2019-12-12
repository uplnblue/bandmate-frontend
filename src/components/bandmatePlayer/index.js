import React from 'react';
import './index.css';
import GridContainer from '../gridContainer';

class BandmatePlayer extends React.Component {

  render() {
    return(
      <div className="BandmatePlayer">
        <div className="card">
          {/* Track name */}
          {/* Track artist */}
          <h3 className="card-title">{this.props.track.name} &#8212; {this.props.track.artists[0].name}</h3>
          {/* Album cover art */}
          <img id="cover_art" className="img-fluid" src={this.props.track.album.images[0].url} alt="cover art"
                width={this.props.track.album.width} height={this.props.track.album.height}/>
          {/* Play-Pause button */}
          <div className="btn-group mt-2 mb-2">
            <button id="play-pause" className="btn" onClick={this.props.togglePlay}>=</button>
          </div>
          {/* Hidden disconnect button */}
          <button type="button" id="discon-player"></button>
          {/* Start-End segment button */}
          {/* Start+End Segment button */}


          {/*   (HIDE non-functional buttons for now)
            <div className="btn-group mt-2 mb-2">
              <button type="button" id="start-end_segment" className="segment_ctl btn mr-2"  onClick={this.props.startEndSegment}>Seg: st/end</button>
              <button type="button" id="div_segment" className="segment_ctl btn mr-2" onClick={this.props.divSegment}>Seg: st+end</button>
            </div>

            */}

          <div className="row">
            <div className="col-md-3">
              <button type="button" id="toggle-ani" onClick={this.props.toggleAnimation}>ani</button>
            </div>
            <div className="form-group col-md-9">
              <input type="text" id="text-pos" placeholder="pos"/>
              <input type="text" id="text-theta-start" placeholder="theta start"/>
            </div>
          </div>

          <GridContainer />

        </div>
      </div>
    );
  } // end render
} // end class



export default BandmatePlayer;
