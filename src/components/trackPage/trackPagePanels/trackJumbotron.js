import React from "react";
import { Link } from "react-router";

var altAlbumArtLogo = require("images/altAlbumArtLogo.png");

var trackNameStyle = {
  marginTop: "0px"
};

var detailsColStyle = {
  textAlign: "left"
};

var artistStyle = {
  marginBottom: "5px"
};

var audioTagStyle = {
  width: "100%"
};

var bottomAlignText = {
  position: "absolute",
  bottom: "0px"
};

var colHeight = {
  height: "100%"
};

class TrackJumbotron extends React.Component {
  componentWillReceiveProps(nextProps) {
    var audio = document.getElementById("audioElement");
    audio.load();
  }

  render() {
    var self = this;

    var trackUploadDate = (function() {
      var date = new Date(self.props.uploadDate);
      var dateString = date.toDateString();
      return dateString;
    })();

    return (
      <div className="jumbotron text-center" id="userJumbotron">
        <div className="col-md-9" style={colHeight}>
          <div className="col-md-6" style={detailsColStyle}>
            <Link to={"/user/" + this.props.userURL}>
              <p className="text-muted" style={artistStyle}>
                {this.props.artist}
              </p>
            </Link>
            <h3 style={trackNameStyle}>{this.props.title}</h3>
            <p>Genre: {this.props.genre}</p>
            <h5>
              <span className="glyphicon glyphicon-play" /> {this.props.numPlays}
            </h5>

            <div className="btn-group-sm" role="group">
              <button type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-thumbs-up" /> {this.props.numLikes}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <span className="pull-right">{trackUploadDate}</span>
          </div>

          <div className="col-md-12" style={bottomAlignText}>
            <audio id="audioElement" style={audioTagStyle} controls>
              <source src={this.props.trackBinaryURL} type="audio/mp3" />
            </audio>
          </div>
        </div>
        <div className="col-md-3">
          <img className="img-responsive pull-right" src={altAlbumArtLogo} alt="" width="215" height="215" />
        </div>
      </div>
    );
  }
}

TrackJumbotron.getdefaultProps = {
  title: "",
  artist: "",
  genre: "",
  uploadDate: "",
  numPlays: 0,
  numLikes: 0,
  numComments: 0,
  trackBinaryURL: ""
};

export default TrackJumbotron;
