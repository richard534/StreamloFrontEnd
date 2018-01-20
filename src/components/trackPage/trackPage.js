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
      trackURL: this.props.params.trackURL,
      userURL: this.props.params.userURL,
      id: "",
      title: "",
      artist: "",
      genre: "",
      uploadDate: "",
      numPlays: 0,
      numLikes: 0,
      numComments: 0,
      description: "",
      trackBinaryURL: "",
      comments: [],
      commentsPageNum: 1,
      commentsPerPage: 5,
      hasMoreComments: false
    };

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.uploaderNameDataSource = this.uploaderNameDataSource.bind(this);
    this.handleNextCommentsPager = this.handleNextCommentsPager.bind(this);
    this.handlePreviousCommentsPager = this.handlePreviousCommentsPager.bind(this);
  }

  componentDidMount() {
    this.tracksDataSource();
  }

  tracksDataSource() {
    let trackURL = this.state.trackURL;

    TrackApi.getTrackByTrackURL(trackURL, 1, 5, (err, track) => {
      if (err) {
        toastr.error(err);
      } else {
        let uploaderId = track.uploaderId;
        let newState = {
          id: track._id,
          title: track.title,
          genre: track.genre,
          description: track.description,
          uploadDate: track.dateUploaded,
          numPlays: track.numPlays,
          numLikes: track.numLikes,
          numComments: track.numComments,
          trackBinaryURL: "http://localhost:3001/tracks/" + track.trackBinaryId + "/stream",
          comments: track.comments
        };
        this.uploaderNameDataSource(uploaderId, (err, userDisplayName) => {
          if (err) {
            toastr.error("Unable to retrieve artist name");
          } else {
            newState.artist = userDisplayName;
            this.commentsDataSource(track._id, this.state.commentsPageNum, this.state.commentsPerPage, (err, result) =>
              this.setStateToCommentDataSourceResults(err, result)
            );
            this.setState(newState);
          }
        });
      }
    });
  }

  uploaderNameDataSource(userId, cb) {
    UserApi.getUserByUserId(userId, (err, user) => {
      if (err) {
        toastr.error(err);
      } else {
        cb(null, user.displayName);
      }
    });
  }

  commentsDataSource(trackId, pageNum = 1, perPage = 5, cb) {
    TrackApi.getTrackCommentsById(trackId, pageNum, perPage, (err, result) => {
      cb(null, result);
    });
  }

  setStateToCommentDataSourceResults(err, result) {
    let newState = {};
    if (result) {
      newState.comments = result.comments;
      newState.commentsPageNum = result.page;
      if (result.page == result.pageCount) {
        newState.hasMoreComments = false;
      } else {
        newState.hasMoreComments = true;
      }
    }
    this.setState(newState);
  }

  handleNextCommentsPager(e) {
    e.preventDefault();
    let trackId = this.state.id;
    let nextPageNum = this.state.commentsPageNum + 1;
    let perPage = this.state.commentsPerPage;

    this.commentsDataSource(trackId, nextPageNum, perPage, (err, result) =>
      this.setStateToCommentDataSourceResults(err, result)
    );
  }

  handlePreviousCommentsPager(e) {
    e.preventDefault();
    let trackId = this.state.id;
    let previousPageNum = this.state.commentsPageNum - 1;
    let perPage = this.state.commentsPerPage;

    this.commentsDataSource(trackId, previousPageNum, perPage, (err, result) =>
      this.setStateToCommentDataSourceResults(err, result)
    );
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
            <CommentsPanel
              comments={this.state.comments}
              pageNum={this.state.commentsPageNum}
              hasMoreComments={this.state.hasMoreComments}
              numComments={this.state.numComments}
              handleNextCommentsPager={this.handleNextCommentsPager}
              handlePreviousCommentsPager={this.handlePreviousCommentsPager}
            />
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
