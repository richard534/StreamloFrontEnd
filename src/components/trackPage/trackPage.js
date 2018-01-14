import React from "react";
import toastr from "toastr";
import update from "immutability-helper";

import TrackJumbotron from "./trackPagePanels/trackJumbotron";
import CommentsPanel from "./trackPagePanels/commentsPanel";
import PostCommentPanel from "./trackPagePanels/postCommentPanel";
import DescriptionPanel from "./trackPagePanels/descriptionPanel";
import TrackApi from "api/trackApi";
import UserApi from "api/userApi";

var commentsAndDescriptionStyle = {
  marginTop: "10px",
  padding: "0px",
  paddingTop: "10px"
};

var descriptionDivStyle = {
  paddingRight: "0px"
};

var commentsDivStyle = {
  paddingLeft: "0px"
};

class TrackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackURL: "",
      userURL: "",
      title: "",
      artist: "",
      genre: "",
      uploadDate: "",
      numPlays: 0,
      numLikes: 0,
      numComments: 0,
      description: "",
      trackBinaryURL: "",
      comments: []
    };

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploaderNameDataSource = this.uploaderNameDataSource.bind(this);
  }

  componentWillMount() {
    this.setState({ trackURL: this.props.params.trackURL });
    this.setState({ userURL: this.props.params.userURL });
  }

  componentDidMount() {
    this.tracksDataSource();
  }

  tracksDataSource() {
    let trackURL = this.state.trackURL;

    TrackApi.getTrackByTrackURL(trackURL, 1, 5, (err, result) => {
      if (err) {
        toastr.error(err);
      } else {
        let uploaderId = result.uploaderId;
        let newState = {
          title: result.title,
          genre: result.genre,
          description: result.description,
          uploadDate: result.dateUploaded,
          numPlays: result.numPlays,
          numLikes: result.numLikes,
          numComments: result.numComments,
          trackBinaryURL: "http://localhost:3001/tracks/" + result.trackBinaryId + "/stream",
          comments: result.comments
        };
        this.uploaderNameDataSource(uploaderId, (err, result) => {
          if (err) {
            toastr.error("Unable to retrieve artist name");
          } else {
            newState.artist = result.displayName;
            this.setState(newState);
          }
        });
      }
    });
  }

  uploaderNameDataSource(userId, cb) {
    UserApi.getUserByUserId(userId, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;

    var newState = update(this.state, {
      [name]: {
        $set: target.value
      }
    });

    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <TrackJumbotron
          title={this.state.title}
          artist={this.state.artist}
          genre={this.state.genre}
          uploadDate={this.state.uploadDate}
          numPlays={this.state.numPlays}
          numLikes={this.state.numLikes}
          numComments={this.state.numComments}
          trackBinaryURL={this.state.trackBinaryURL}
          userURL={this.state.userURL}
        />

        <div className="col-md-12" style={commentsAndDescriptionStyle}>
          <div className="col-md-8" style={commentsDivStyle}>
            <PostCommentPanel
              numComments={this.state.numComments}
              trackURL={this.state.trackURL}
              loggedIn={this.props.auth.loggedIn()}
              profile={this.props.auth.getProfile()}
              jwtToken={this.props.auth.getToken()}
            />
            <CommentsPanel comments={this.state.comments} />
          </div>
          <div className="col-md-4" style={descriptionDivStyle}>
            <DescriptionPanel description={this.state.description} />
          </div>
        </div>
      </div>
    );
  }
}

export default TrackPage;
