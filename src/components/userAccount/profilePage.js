import React from "react";
import toastr from "toastr";
import update from "immutability-helper";
import EditDetailsModal from "./userAccountModals/editDetailsModal";
import UploadedTracksList from "components/search/trackSearchResultsList.js";
import UserApi from "api/userApi";
import TrackApi from "api/trackApi";
var accountIcon = require("images/account-icon.png");

var followersStyle = {
  paddingTop: "10px"
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileUserId: "",
      profileUserURL: "",
      profileDisplayname: "",
      numFollowers: 0,
      numFollowing: 0,
      pageData: {
        pageNum: 0,
        perPage: 0
      },
      uploadedTracksMetadata: {
        hasMoreTracks: false,
        numTracks: 0
      },
      uploadedTracks: [],
      followedUsers: [],
      likedTracks: [],
      showEditModal: false,
      candidateUserData: {
        email: "",
        password: "",
        confPassword: "",
        displayName: "",
        city: ""
      }
    };

    this.profileDataSource = this.profileDataSource.bind(this);
    this.tracksUploadedDataSource = this.tracksUploadedDataSource.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitUpdateUserDataHandler = this.submitUpdateUserDataHandler.bind(this);
  }

  componentDidMount() {
    this.setInitialPageStateFromURI();
  }

  // lifecycle hook called when profile page component recieves props from react router (on next/previous page naviagation)
  componentWillReceiveProps(nextProps) {
    this.setInitialPageStateFromURI(nextProps);
  }

  setInitialPageStateFromURI(props) {
    props = props || this.props; // if props variable passed to this method then use it

    this.setState(
      {
        profileUserURL: props.params.userURL,
        pageData: {
          pageNum: props.location.query.page,
          perPage: props.location.query.per_page
        }
      },
      () => {
        this.profileDataSource();
      }
    );
  }

  profileDataSource() {
    UserApi.getUserByUserURL(this.state.profileUserURL, (err, result) => {
      if (err) {
        toastr.error("Error retrieving profile");
      } else {
        let returnedUser = result.users[0];
        let newState = {
          profileUserId: returnedUser._id,
          profileDisplayname: returnedUser.displayName,
          numFollowers: returnedUser.numberOfFollowers,
          numFollowing: returnedUser.numberOfFollowedUsers,
          followedUsers: returnedUser.followedUsers,
          likedTracks: returnedUser.likedTracks,
          candidateUserData: {
            email: returnedUser.email,
            displayName: returnedUser.displayName,
            city: returnedUser.city
          }
        };
        this.setState(newState);
        this.tracksUploadedDataSource(returnedUser._id);
      }
    });
  }

  tracksUploadedDataSource(uploaderId) {
    let pageNum = this.state.pageData.pageNum;
    let perPage = this.state.pageData.perPage;

    TrackApi.getTracksByUploaderId(uploaderId, pageNum, perPage, (err, result) => {
      if (err) {
        return;
      } else {
        let hasMoreTracks = true;
        if (result.page == result.pageCount) hasMoreTracks = false;
        this.setState({
          uploadedTracks: result.tracks,
          uploadedTracksMetadata: {
            numTracks: result.total,
            hasMoreTracks: hasMoreTracks
          }
        });
      }
    });
  }

  submitUpdateUserDataHandler(e) {
    e.preventDefault();
    let signedInUserjwtToken = this.props.auth.getToken();
    let signedInUserId = this.props.auth.getProfile().id;

    // check if new password and conf password match
    if (this.state.candidateUserData.password != this.state.candidateUserData.confPassword) {
      toastr.error("New password and confirm password do not match");
      return;
    }

    // if nothing has been changed, do nothing

    let candidateUserData = {
      email: this.state.candidateUserData.email,
      password: this.state.candidateUserData.password,
      displayName: this.state.candidateUserData.displayName,
      city: this.state.candidateUserData.city
    };

    UserApi.updateUserById(signedInUserId, candidateUserData, signedInUserjwtToken, (errorList, response) => {
      if (errorList) {
        for (let err in errorList) {
          toastr.error(errorList[err]);
        }
      } else {
        toastr.success(response.message);
        this.toggleModal();
        this.profileDataSource();
      }
    });
  }

  toggleModal(e) {
    this.setState({
      showEditModal: !this.state.showEditModal
    });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;

    let newState = update(this.state, {
      candidateUserData: {
        [name]: {
          $set: target.value
        }
      }
    });

    this.setState(newState);
  }

  render() {
    let editButton;
    // if user is logged in and profilePage is the logged in users profile, display edit details button
    if (this.props.auth.loggedIn() && this.props.auth.getProfile().id == this.state.profileUserId) {
      editButton = (
        <button type="button" className="btn btn-default" onClick={this.toggleModal}>
          <span className="glyphicon glyphicon-edit" /> Edit
        </button>
      );
    }

    return (
      <div>
        <div className="container-full">
          <div className="jumbotron text-center" id="userJumbotron">
            <img className="img-circle" src={accountIcon} width="150" height="150" />
            <h4 className="text-center">{this.state.profileDisplayname}</h4>
            <span className="text-center">
              <span className="glyphicon glyphicon-user" /> Followers: {this.state.numFollowers}{" "}
            </span>
            <span className="text-center">
              | <span className="glyphicon glyphicon-eye-open" /> Following: {this.state.numFollowing}
            </span>
            <div className="btn-group-sm" role="group" style={followersStyle}>
              {editButton}
              <span> </span>
              <button type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-plus" /> Follow
              </button>
            </div>
            <br />
          </div>
        </div>
        <div className="container-full">
          <div className="row" id="profileNav">
            <div className="col-md-8 col-md-offset-2">
              <ul className="nav nav-pills nav-justified">
                <li role="presentation">
                  <a>Liked</a>
                </li>
                <li role="presentation" className="active">
                  <a>Uploaded</a>
                </li>
                <li role="presentation">
                  <a>Following</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <UploadedTracksList
            trackResults={this.state.uploadedTracks}
            numTracks={this.state.uploadedTracksMetadata.numTracks}
            pageNum={this.state.pageData.pageNum}
            perPage={this.state.pageData.perPage}
            hasMoreTracks={this.state.uploadedTracksMetadata.hasMoreTracks}
            userURL={this.state.profileUserURL}
          />
          <EditDetailsModal
            show={this.state.showEditModal}
            onClose={this.toggleModal}
            handleChange={this.handleChange}
            candidateUserData={this.state.candidateUserData}
            handleSubmit={this.submitUpdateUserDataHandler}
          />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
