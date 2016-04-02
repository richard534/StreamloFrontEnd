"use strict";

var React = require('react');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var playButtonDivStyle = {
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "5px"
};

var mediaDivStyle = {
    paddingLeft: "2px"
};

var likesRowstyle = {
    paddingLeft: "5px",
    paddingTop: "15px"
};

var likeButtonStyle = {
    marginRight: "5px"
};

var audioTagStyle = {
    width: "100%"
};

var audioDivStyle = {
    paddingLeft: "4px"
};

var Track = React.createClass({

  render: function() {
      var self = this;

      var TrackUploadDate = function() {
           var date = new Date(self.props.uploadDate);
           var dateString = date.toDateString();
           return (dateString);
      }();


    return (
            <div className="media">
                <div className="media-left">
                    <a>
                        <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" style={ThumbnailStyle} />
                    </a>
                </div>
                <div className="media-body">
                    <div className="col-md-12" style={mediaDivStyle}>
                        <div className="col-md-8" style={mediaDivStyle}>
                            <p className="text-muted">{this.props.artist}</p>
                            <h4 className="media-heading">{this.props.title}</h4>
                            <p>Genre: {this.props.genre}</p>
                        </div>

                        <div className="col-md-4 pull-right">
                            <p className="pull-right">{TrackUploadDate}</p>
                        </div>

                        <div className="col-md-12" style={audioDivStyle}>
                            <audio id={this.props.trackId} style={audioTagStyle} controls>
                              <source src="" type="audio/mp3"/>
                            </audio>
                        </div>



                        <div className="col-md-12" style={likesRowstyle}>
                            <div className="col-md-7" >
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group-xs" role="group">
                                        <button type="button" className="btn btn-default active" style={likeButtonStyle}><span className="glyphicon glyphicon-thumbs-up"></span> {this.props.numLikes}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 pull-right">
                                <div className="col-md-8">
                                    <p className="pull-right"><span className="glyphicon glyphicon-play"></span> {this.props.numPlays}</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="pull-right"><span className="glyphicon glyphicon-comment"></span> {this.props.numPlays}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
});

module.exports = Track;
