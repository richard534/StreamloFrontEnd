"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
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
                        <img className="media-object thumbnail img-circle" src="/images/account-icon.png" alt="" width="160" height="160" style={ThumbnailStyle} />
                    </a>
                </div>
                <div className="media-body">
                    <p>{this.props.displayName}</p>

                </div>
            </div>
    );
  }
});

module.exports = Track;
