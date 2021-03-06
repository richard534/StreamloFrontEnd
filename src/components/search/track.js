import React from "react";
import { Link } from "react-router";
import ReactPlayer from "react-player";

import UserApi from "api/userApi";
import TrackApi from "api/trackApi";

var ThumbnailStyle = {
  marginBottom: "0px"
};

var mediaDivStyle = {
  paddingLeft: "2px"
};

var likesRowstyle = {
  paddingLeft: "5px",
  paddingTop: "15px"
};

var audioTagStyle = {
  width: "100%"
};

var audioDivStyle = {
  paddingLeft: "4px",
  paddingTop: "30px"
};

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userURL: "",
      numComments: 0
    };

    this.userURLDataSource = this.userURLDataSource.bind(this);
  }

  componentDidMount() {
    this.userURLDataSource();
  }

  componentWillReceiveProps(nextProps) {
    this.userURLDataSource(nextProps);
  }

  userURLDataSource(props) {
    props = props || this.props;
    let uploaderId = props.uploaderId;

    UserApi.getUserByUserId(uploaderId, (err, result) => {
      this.setState({ userURL: result.userURL });
    });
  }

  render() {
    var self = this;

    var TrackUploadDate = (function() {
      var date = new Date(self.props.uploadDate);
      var dateString = date.toDateString();
      return dateString;
    })();

    let TrackBinaryURL = TrackApi.getTrackStreamURIByGridFSId(self.props.trackId);

    return (
      <div className="media">
        <div className="media-left">
          <a>
            <img
              className="media-object thumbnail ThumbnailStyle"
              src={this.props.trackAlbumArtURI}
              width="160"
              height="160"
            />
          </a>
        </div>
        <div className="media-body">
          <div className="col-md-12" style={mediaDivStyle}>
            <div className="col-md-8" style={mediaDivStyle}>
              <p className="text-muted">{this.props.artist}</p>
              <Link to={"/track/" + this.state.userURL + "/" + this.props.trackURL}>
                <h4 className="media-heading">{this.props.title}</h4>
              </Link>
              <p>Genre: {this.props.genre}</p>
            </div>

            <div className="col-md-4 pull-right">
              <p className="pull-right">{TrackUploadDate}</p>
            </div>

            <div className="col-md-12" style={likesRowstyle}>
              <div className="col-md-4">
                <div className="btn-toolbar" role="toolbar">
                  <div className="btn-group-xs" role="group">
                    <p>
                      <span className="glyphicon glyphicon-thumbs-up" />
                      {" " + this.props.numLikes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-8 pull-right">
                <div className="col-md-9">
                  <p className="pull-right">
                    <span className="glyphicon glyphicon-play" />
                    {" " + this.props.numPlays}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="pull-right">
                    <span className="glyphicon glyphicon-comment" />
                    {" " + this.props.numComments}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-12" style={audioDivStyle}>
              <ReactPlayer
                id={this.props.trackId}
                style={audioTagStyle}
                url={TrackBinaryURL}
                width="100%"
                height="100%"
                config={{
                  file: {
                    forceAudio: true,
                    attributes: { controls: "true", controlsList: "nodownload", preload: "none" }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
