"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var trackListingStyle = {
    marginBottom: "10px"
};

var Track = React.createClass({

  render: function() {
      var self = this;

      var TrackUploadDate = function() {
           var date = new Date(self.props.uploadDate);
           return (date.toString());
      }();



    return (
            <div className="media">
                <div className="media-left">
                    <a>
                        <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" style={ThumbnailStyle} />
                    </a>
                </div>
                <div className="media-body">
                    <div className="col-md-6">
                        <p className="text-muted">{this.props.artist}</p>
                        <h4 className="media-heading">{this.props.title}</h4>
                    </div>
                    <div className="col-md-6">
                        <p className="pull-right">{TrackUploadDate}</p>
                    </div>

                </div>
            </div>
    );
  }
});

module.exports = Track;
