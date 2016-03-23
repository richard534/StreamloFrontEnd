"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var trackListingStyle = {
    marginBottom: "10px"
};

var Track = React.createClass({
    propTypes: {
    track: React.PropTypes.object.isRequired
},

  render: function() {
      var track = this.props.track;

    return (
        <li key={track._id} className="list-group-item" style={trackListingStyle}>
            <div className="media">
                <div className="media-left">
                    <a>
                        <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" style={ThumbnailStyle} />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.title}</h4>
                </div>
            </div>
        </li>
    );
  }
});

module.exports = Track;
