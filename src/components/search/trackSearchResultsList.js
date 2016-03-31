"use strict";

var React = require('react');
var Track = require('./track');

var trackListingStyle = {
    marginBottom: "10px"
};

var TrackSearchResultsList = React.createClass({
    propTypes: {
    trackResults: React.PropTypes.array.isRequired
},

// TODO: Add total tracks found for search string
  render: function() {
      var self = this;
      var tracks = self.props.trackResults;

      var createTrackResultRow = function(track) {
          return (
              <li key={track._id} className="list-group-item" style={trackListingStyle}>
                  <Track title={track.title}
                      artist={track.artist}
                      genre={track.genre}
                      trackURL={track.trackURL}
                      uploadDate={track.dateUploaded}
                  />
              </li>
          );
      };

      var resultsNotFound = function() {
          return (
              <div>
                  <img src="/images/noResultsSearch.svg" className="center-block search-result-image"></img>
                  <p className="text-center text-muted">Sorry we didn't find any results for "{self.props.searchString}".</p>
                  <p className="text-center text-muted">Check the spelling, or try a different search.</p>
              </div>
          );
      }();

      var results;
      var numTracks;
      if (self.props.trackResults.length > 0) {
          numTracks = <p className="text-muted">Found {self.props.numTracks} tracks</p>;
          results = <ul className="list-group">{tracks.map(createTrackResultRow)}</ul>;
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
});

module.exports = TrackSearchResultsList;
