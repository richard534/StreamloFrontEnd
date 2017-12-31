import React from 'react';
import Track from './track';
var noResultImg = require('images/noResultsSearch.png');

var trackListingStyle = {
    marginBottom: "10px"
};

class TrackSearchResultsList extends React.Component {
  render() {
    var self = this;
    var tracks = self.props.trackResults;

    var createTrackResultRow = function(track) {
      return (
          <li key={track._id} className="list-group-item" style={trackListingStyle}>
              <Track
                  trackId={track._id}
                  uploaderId={track.uploaderId}
                  trackBinaryId={track.trackBinaryId}
                  title={track.title}
                  artist={track.artist}
                  genre={track.genre}
                  trackURL={track.trackURL}
                  uploadDate={track.dateUploaded}
                  numLikes={track.numLikes}
                  numPlays={track.numPlays}
              />
          <hr />
          </li>
      );
    };

    var resultsNotFound = function() {
      return (
          <div>
              <img src={noResultImg} className="center-block search-result-image"></img>
              <p className="text-center text-muted">Sorry we didn't find any results for "{self.props.searchString}".</p>
              <p className="text-center text-muted">Check the spelling, or try a different search.</p>
          </div>
      );
    }();
    
    let previousButtonClass = self.props.trackPageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = self.props.hasMoreTracks == false ? "next disabled disableClick" : "next";
    
    var results;
    var numTracks;
    if (self.props.trackResults.length > 0) {
      numTracks = <p className="text-muted">Found {self.props.numTracks} tracks</p>;
      results =
      <div>
          <ul className="list-group">{tracks.map(createTrackResultRow)}</ul>
          <nav>
              <ul className="pager">
                  <li className={previousButtonClass} onClick={this.props.handlePreviousPager}><a href="" ><span aria-hidden="true">&larr;</span> Previous</a></li>
                  <li className={nextButtonClass} onClick={this.props.handleNextPager}><a href="" >Next <span aria-hidden="true">&rarr;</span></a></li>
               </ul>
          </nav>
      </div>;

    } else {
       results = <div>{resultsNotFound}</div>;
    }

    return (
    <div className="col-md-10">
        {numTracks}
        {results}
    </div>
    );
  }
}

export default TrackSearchResultsList;
