"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ThumbnailStyle = {
    marginBottom: "0px"
};

var mediaDivStyle = {
    paddingLeft: "20px"
};

var likesRowstyle = {
    paddingLeft: "15px",
    paddingTop: "15px"
};

var audioTagStyle = {
    width: "100%"
};

var audioDivStyle = {
    paddingLeft: "4px"
};

var Track = React.createClass({
    getInitialState: function() {
        return {
            userURL: "",
            numLikes: 0,
            numPlays: 0,
            numComments: 0
        };
    },

    componentDidMount: function() {
        this.userURLDataSource();
    },

    // AJAX helper method thats sets state to returned ajax query
    userURLDataSource: function(){
        var self = this;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/id/' + self.props.uploaderId,
          success: function(result) {
              self.setState({ userURL: result.userURL });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
          }
        });
    },


    render: function() {
      var self = this;

      var TrackUploadDate = function() {
           var date = new Date(self.props.uploadDate);
           var dateString = date.toDateString();
           return (dateString);
      }();

      var TrackBinaryURL = function() {
          var trackBinaryURL = "http://localhost:3001/tracks/" + self.props.trackBinaryId + "/stream";
          return trackBinaryURL;
      }();


    return (
            <div className="media">
                <div className="media-left">
                    <a>
                        <img className="media-object thumbnail trackThumbnail" src={this.props.albumArtURL} width="160" height="160" style={ThumbnailStyle} />
                    </a>
                </div>
                <div className="media-body">
                    <div className="col-md-12" style={mediaDivStyle}>
                        <div className="col-md-8" style={mediaDivStyle}>
                            <p className="text-muted">{this.props.artist}</p>
                            <Link to="track" params={{userURL: this.state.userURL, trackURL: this.props.trackURL}}><h4 className="media-heading">{this.props.title}</h4></Link>
                            <p>Genre: {this.props.genre}</p>
                        </div>

                        <div className="col-md-4 pull-right">
                            <p className="pull-right">{TrackUploadDate}</p>
                        </div>

                        <div className="col-md-12" style={audioDivStyle}>
                            <audio id={this.props.trackId} style={audioTagStyle} controls>
                              <source src={TrackBinaryURL} type="audio/mp3"/>
                            </audio>
                        </div>



                        <div className="col-md-12" style={likesRowstyle}>
                            <div className="col-md-7" >
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group-xs" role="group">
                                        <p><span className="glyphicon glyphicon-thumbs-up"></span> {this.props.numLikes}</p>
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
