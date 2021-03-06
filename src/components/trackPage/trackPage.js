import React from "react";
import toastr from "toastr";
import update from "immutability-helper";
import { browserHistory } from "react-router";

import TrackJumbotron from "./trackPagePanels/trackJumbotron";
import CommentsPanel from "./trackPagePanels/commentsPanel";
import PostCommentPanel from "./trackPagePanels/postCommentPanel";
import DescriptionPanel from "./trackPagePanels/descriptionPanel";
import NotFoundPage from "../notFoundPage";
import CommentsSection from "./commentsSection";
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
      trackAlbumArtURI: "",
      comments: [],
      commentsPageNum: 1,
      commentsPerPage: 5,
      hasMoreComments: false,
      postCommentBody: "",
      trackFound: true,
      uploaderUserId: "",
      uploaderLoggedIn: false,
      loggedInUserHasLikedThisTrack: false
    };

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.uploaderProfileDataSource = this.uploaderProfileDataSource.bind(this);
    this.handleNextCommentsPager = this.handleNextCommentsPager.bind(this);
    this.handlePreviousCommentsPager = this.handlePreviousCommentsPager.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.deleteTrackHandler = this.deleteTrackHandler.bind(this);
    this.clickLikeButtonHandler = this.clickLikeButtonHandler.bind(this);
  }

  componentWillMount() {
    this.tracksDataSource();
  }

  tracksDataSource() {
    let trackURL = this.state.trackURL;

    TrackApi.getTrackByTrackURL(trackURL, 1, 5, (err, track) => {
      if (err) {
        // show 404 page if trackURL does not map to a track on the system
        this.setState({ trackFound: false });
      } else {
        let loggedInUserId = this.props.auth.getProfile().id;
        let trackUploaderId = track.uploaderId;
        let uploaderLoggedIn = false;
        if (loggedInUserId == trackUploaderId) {
          uploaderLoggedIn = true;
        }

        let newState = {
          id: track._id,
          title: track.title,
          genre: track.genre,
          description: track.description,
          uploadDate: track.dateUploaded,
          numPlays: track.numPlays,
          numLikes: track.numLikes,
          numComments: track.numComments,
          trackBinaryURL: TrackApi.getTrackStreamURIByGridFSId(track._id),
          trackAlbumArtURI: TrackApi.getTrackAlbumArtURIByTrackId(track._id),
          uploaderUserId: track.uploaderId,
          uploaderLoggedIn: uploaderLoggedIn
        };
        this.uploaderProfileDataSource(trackUploaderId, (err, userDisplayName, likedTracks) => {
          if (err) return toastr.error("Unable to retrieve uploader info");

          newState.artist = userDisplayName;

          let hasLoggedInUserLikedThisTrack = false;
          likedTracks.forEach(likedTrack => {
            if (likedTrack.trackId == track._id) {
              hasLoggedInUserLikedThisTrack = true;
            }
          });

          newState.loggedInUserHasLikedThisTrack = hasLoggedInUserLikedThisTrack;
          this.setState(newState);
          this.commentsDataSource(track._id, this.state.commentsPageNum, this.state.commentsPerPage);
        });
      }
    });
  }

  uploaderProfileDataSource(userId, cb) {
    UserApi.getUserByUserId(userId, (err, user) => {
      if (err) {
        toastr.error(err);
      } else {
        cb(null, user.displayName, user.likedTracks);
      }
    });
  }

  commentsDataSource(trackId, pageNum = 1, perPage = 5) {
    TrackApi.getTrackCommentsById(trackId, pageNum, perPage, (err, result) => {
      this.setStateToCommentDataSourceResults(result);
    });
  }

  setStateToCommentDataSourceResults(result) {
    let newState = {};
    if (result) {
      newState.comments = result.comments;
      newState.commentsPageNum = result.page;
      newState.numComments = result.total;
      if (result.page == result.pageCount) {
        newState.hasMoreComments = false;
      } else {
        newState.hasMoreComments = true;
      }
    } else {
      newState.comments = {};
      newState.commentsPageNum = 1;
      newState.numComments = 0;
      newState.hasMoreComments = false;
    }
    this.setState(newState);
  }

  handleNextCommentsPager(e) {
    e.preventDefault();
    let trackId = this.state.id;
    let nextPageNum = this.state.commentsPageNum + 1;
    let perPage = this.state.commentsPerPage;

    this.commentsDataSource(trackId, nextPageNum, perPage);
  }

  handlePreviousCommentsPager(e) {
    e.preventDefault();
    let trackId = this.state.id;
    let previousPageNum = this.state.commentsPageNum - 1;
    let perPage = this.state.commentsPerPage;

    this.commentsDataSource(trackId, previousPageNum, perPage);
  }

  postComment(e) {
    e.preventDefault();
    if (this.state.postCommentBody.trim() == "") {
      toastr.remove();
      toastr.error("Unable to submit empty comment");
      return;
    }

    if (this.props.auth.loggedIn()) {
      let trackURL = this.state.trackURL;
      let userId = this.props.auth.getProfile().id;
      let jwtToken = this.props.auth.getToken();

      let data = {
        user: userId,
        date: Date.now(),
        body: this.state.postCommentBody
      };

      TrackApi.postCommentToTrack(trackURL, data, jwtToken, (err, result) => {
        if (err) {
          toastr.error("Error adding comment");
        } else {
          let commentsPageNum = this.state.commentsPageNum;
          let perPage = this.state.commentsPerPage;
          this.commentsDataSource(this.state.id, commentsPageNum, perPage, (err, track) => {
            toastr.success("Comment Added");
            this.setState({ postCommentBody: "" });
          });
        }
      });
    } else {
      toastr.error("Please Log in before commenting");
    }
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

  handleDeleteComment(commentId) {
    let jwtToken = this.props.auth.getToken();

    TrackApi.deleteCommentByCommentId(commentId, jwtToken, (err, result) => {
      if (err) return toastr.error("Error removing comment");

      let commentsPageNum = this.state.commentsPageNum;
      let perPage = this.state.commentsPerPage;
      this.commentsDataSource(this.state.id, commentsPageNum, perPage, (err, track) => {
        toastr.success("Comment Deleted");
      });
    });
  }

  deleteTrackHandler() {
    let trackId = this.state.id;
    let jwtToken = this.props.auth.getToken();

    TrackApi.deleteTrackByTrackId(trackId, jwtToken, (err, result) => {
      if (err) return toastr.error("Error deleting track");
      toastr.success("Track Deleted");
      browserHistory.push("");
    });
  }

  clickLikeButtonHandler(e) {
    e.preventDefault();

    let loggedInUserHasLikedThisTrack = this.state.loggedInUserHasLikedThisTrack;

    let userIdOfTrackUploader = this.state.uploaderUserId;
    let trackId = this.state.id;
    let jwtToken = this.props.auth.getToken();

    if (loggedInUserHasLikedThisTrack) {
      UserApi.deleteLikedTrackFromUserByLikedTrackId(userIdOfTrackUploader, trackId, jwtToken, (err, result) => {
        if (err) return toastr.error("Error Unliking track");
        this.tracksDataSource();
      });
    } else {
      UserApi.putLikedTrackToUserByLikedTrackId(userIdOfTrackUploader, trackId, jwtToken, (err, result) => {
        if (err) return toastr.error("Error liking track");
        this.tracksDataSource();
      });
    }
  }

  render() {
    if (this.state.trackFound) {
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
            trackAlbumArtURI={this.state.trackAlbumArtURI}
            loggedIn={this.props.auth.loggedIn()}
            clickLikeButtonHandler={this.clickLikeButtonHandler}
            loggedInUserHasLikedThisTrack={this.state.loggedInUserHasLikedThisTrack}
          />

          <div className="col-md-12" style={commentsAndDescriptionStyle}>
            <CommentsSection
              numComments={this.state.numComments}
              comments={this.state.comments}
              pageNum={this.state.commentsPageNum}
              hasMoreComments={this.state.hasMoreComments}
              handleNextCommentsPager={this.handleNextCommentsPager}
              handlePreviousCommentsPager={this.handlePreviousCommentsPager}
              postComment={this.postComment}
              postCommentBody={this.state.postCommentBody}
              handleChange={this.handleChange}
              loggedIn={this.props.auth.loggedIn()}
              profileId={this.props.auth.getProfile().id}
              handleDeleteComment={this.handleDeleteComment}
            />
            <div className="col-md-4" style={descriptionDivStyle}>
              <DescriptionPanel
                description={this.state.description}
                uploaderLoggedIn={this.state.uploaderLoggedIn}
                deleteTrackHandler={this.deleteTrackHandler}
                loggedIn={this.props.auth.loggedIn()}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <NotFoundPage />;
    }
  }
}

TrackPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TrackPage;
