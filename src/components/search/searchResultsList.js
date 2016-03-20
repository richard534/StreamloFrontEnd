"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var SearchResultsList = React.createClass({
    propTypes: {
    trackResults: React.PropTypes.array.isRequired,
    tracksReturned: React.PropTypes.bool.isRequired
},

componentWillMount: function() {

},

// TODO: Add total tracks found for search string
  render: function() {
      var tracks = this.props.trackResults;

      var createTrackResultRow = function(track) {
          return (
              <li key={track._id} className="list-group-item">
                  <div className="media">
                      <div className="media-left">
                          <a href="#">
                              <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" style={ThumbnailStyle} />
                          </a>
                      </div>
                      <div className="media-body">
                          <h4 className="media-heading">Media Heading</h4>
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
