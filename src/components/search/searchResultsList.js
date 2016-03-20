"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var trackListingStyle = {
    marginBottom: "10px"
};

var SearchResultsList = React.createClass({
    propTypes: {
    trackResults: React.PropTypes.array.isRequired,
    tracksReturned: React.PropTypes.bool.isRequired
},

componentWillReceiveProps: function(nextProps) {
    this.setState({ trackResults: nextProps.trackResults });
    this.setState({ tracksReturned: nextProps.tracksReturned });
},


// TODO: Add total tracks found for search string
  render: function() {
      var tracks = this.props.trackResults;

      var createTrackResultRow = function(track) {
          return (
              <li key={track._id} className="list-group-item" style={trackListingStyle}>
                  <div className="media">
                      <div className="media-left">
                          <a>
                              <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" style={ThumbnailStyle} />
                          </a>
                      </div>
                      <div className="media-body">
                          <h4 className="media-heading">{track.title}</h4>
                          {track.arist}
                      </div>
                  </div>
              </li>
          );
      };

    return (
            <div className="col-md-10">
                <ul className="list-group">
                  {tracks.map(createTrackResultRow)}
                </ul>
            </div>
    );
  }
});

module.exports = SearchResultsList;
