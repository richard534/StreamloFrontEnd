"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
    getInitialState: function() {
        return {
            userURL: ""
        };
    },

    componentDidMount: function() {
        this.userURLDataSource();
    },

    componentWillReceiveProps: function(nextProps) {
        this.userURLDataSource(nextProps);
    },

    // AJAX helper method thats sets state to returned ajax query
    userURLDataSource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/' + props.uploaderId
        }).done(function(result){
            this.setState({ userURL: result.userURL });
        }.bind(this));
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
          console.log(trackBinaryURL);
          return trackBinaryURL;
      }();


    return (
            <div className="media">
                <div className="media-left">
                    <a>
                        <img className="media-object thumbnail" src="/images/altAlbumArtLogo.png" alt="" width="160" height="160" style={ThumbnailStyle} />
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
