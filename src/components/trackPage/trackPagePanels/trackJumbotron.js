import React from "react";
import { Link } from "react-router";
import ReactPlayer from "react-player";

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
  render() {
    var self = this;

    var trackUploadDate = (function() {
      var date = new Date(self.props.uploadDate);
      var dateString = date.toDateString();
      return dateString;
    })();

    let likeButton;
    if (this.props.loggedIn) {
      let likeButtonClass = "btn btn-default";
      if (this.props.loggedInUserHasLikedThisTrack) {
        likeButtonClass += " active";
      }

      likeButton = (
        <div className="btn-group-sm" role="group" onClick={this.props.clickLikeButtonHandler}>
          <button type="button" className={likeButtonClass}>
            <span className="glyphicon glyphicon-thumbs-up" /> {this.props.numLikes}
          </button>
        </div>
      );
    }

    return (
      <div className="jumbotron text-center" id="userJumbotron">
        <div className="col-md-9" style={colHeight}>
          <div className="col-md-6" style={detailsColStyle}>
            <Link to={"/user/" + this.props.userURL + "?page=1&per_page=5"}>
              <p className="text-muted" style={artistStyle}>
                {this.props.artist}
              </p>
            </Link>
            <h3 style={trackNameStyle}>{this.props.title}</h3>
            <p>Genre: {this.props.genre}</p>
            <h5>
              <span className="glyphicon glyphicon-play" /> {this.props.numPlays}
            </h5>
            {likeButton}
          </div>
          <div className="col-md-6 trackJumbotronDateDiv">
            <span className="pull-right">{trackUploadDate}</span>
          </div>

          <div className="col-md-12" style={bottomAlignText}>
            <ReactPlayer
              style={audioTagStyle}
              url={this.props.trackBinaryURL}
              width="100%"
              height="100%"
              config={{
                file: { forceAudio: true, preload: true, attributes: { controls: "true", controlsList: "nodownload" } }
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <img
            className="img-responsive pull-right"
            src={this.props.trackAlbumArtURI}
            alt=""
            width="215"
            height="215"
          />
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
