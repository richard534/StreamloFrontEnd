import React from "react";
import toastr from "toastr";
import update from "immutability-helper";
import { browserHistory } from "react-router";

import EditDetailsModal from "./userAccountModals/editDetailsModal";
import TracksList from "components/search/trackSearchResultsList.js";
import FollowingUsersList from "components/search/peopleSearchResultsList.js";

import UserApi from "api/userApi";
import TrackApi from "api/trackApi";

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
      profileImageURI: "",
      pageData: {
        pageNum: 0,
        perPage: 0
      },
      uploadedTracksData: {
        uploadedTracks: [],
        hasMoreTracks: false,
        numTracks: 0
      },
      followeeData: {
        followees: [],
        hasMoreFollowees: false,
        numFollowees: 0
      },
      likedTracksData: {
        likedTracks: [],
        hasMoreLikedTracks: false,
        numLikedTracks: 0
      },
      showEditModal: false,
      selectedProfileTab: {
        uploaded: false,
        liked: false,
        following: false
      },
      candidateUserData: {
        email: "",
        password: "",
        confPassword: "",
        displayName: "",
        city: "",
        profileImage: ""
      }
    };

    this.profileDataSource = this.profileDataSource.bind(this);
    this.uploadedTracksDataSource = this.uploadedTracksDataSource.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitUpdateUserDataHandler = this.submitUpdateUserDataHandler.bind(this);
    this.deleteAccountHandler = this.deleteAccountHandler.bind(this);
    this.updateImageHandler = this.updateImageHandler.bind(this);
    this.changeSelectedProfileTab = this.changeSelectedProfileTab.bind(this);
  }

  componentDidMount() {
    this.setInitialPageStateFromURI();
  }

  // lifecycle hook called when profile page component recieves props from react router
  componentWillReceiveProps(nextProps) {
    this.setInitialPageStateFromURI(nextProps);
  }

  setInitialPageStateFromURI(props) {
    props = props || this.props; // if props variable passed to this method then use it

    let selectedTabState = {
      uploaded: false,
      liked: false,
      following: false
    };

    let selectedTabFromURI = props.location.query.selectedTab;
    switch (selectedTabFromURI) {
      case "uploadedTracks":
        selectedTabState.uploaded = true;
        break;
      case "likedTracks":
        selectedTabState.liked = true;
        break;
      case "followingUsers":
        selectedTabState.following = true;
        break;
      default:
        selectedTabState.uploaded = true;
    }

    this.setState(
      {
        profileUserURL: props.params.userURL,
        pageData: {
          pageNum: props.location.query.page,
          perPage: props.location.query.per_page
        },
        selectedProfileTab: selectedTabState
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
        if (!result) return;

        let returnedUser = result.users[0];
        let userId = returnedUser._id;
        let userProfileImage = UserApi.getUserProfilePictureURIByUserId(userId);

        let newState = {
          profileUserId: userId,
          profileDisplayname: returnedUser.displayName,
          profileImageURI: userProfileImage,
          candidateUserData: {
            email: returnedUser.email,
            displayName: returnedUser.displayName,
            city: returnedUser.city
          }
        };

        this.setState(newState, () => {
          let uploaderId = this.state.profileUserId;
          let pageNum = this.state.pageData.pageNum;
          let perPage = this.state.pageData.perPage;

          if (this.state.selectedProfileTab.uploaded) this.uploadedTracksDataSource(uploaderId, pageNum, perPage);
          if (this.state.selectedProfileTab.following) this.followedUsersDataSource(uploaderId, pageNum, perPage);
          if (this.state.selectedProfileTab.liked) this.likedUsersDataSource(uploaderId, pageNum, perPage);
        });
      }
    });
  }

  uploadedTracksDataSource(uploaderId, pageNum, perPage) {
    TrackApi.getTracksByUploaderId(uploaderId, pageNum, perPage, (err, result) => {
      if (err) return;

      let hasMoreTracks = true;
      if (result.page == result.pageCount) hasMoreTracks = false;

      let newState = {
        uploadedTracksData: {
          uploadedTracks: result.tracks,
          numTracks: result.total,
          hasMoreTracks: hasMoreTracks
        }
      };

      this.setState(newState);
    });
  }

  followedUsersDataSource(uploaderId, pageNum, perPage) {
    UserApi.getFolloweesByFollowerUserId(uploaderId, pageNum, perPage, (err, result) => {
      if (err) return;
      if (!result) return;

      let hasMoreFollowees = true;
      if (result.page == result.pageCount) hasMoreFollowees = false;

      let numFollowees = result.total;

      // for each followee userid retrieved get the full user profile
      let followeeFullProfiles = Array.apply(null, Array(result.followees.length));
      let numFullProfilesRetieved = 0;

      result.followees.forEach((followee, index, array) => {
        UserApi.getUserByUserId(followee.userId, (err, user) => {
          followeeFullProfiles[index] = user;
          numFullProfilesRetieved++;
          if (numFullProfilesRetieved === array.length) {
            this.setFullProfileState(followeeFullProfiles, hasMoreFollowees, numFollowees);
          }
        });
      });
    });
  }

  setFullProfileState(followeeFullProfiles, hasMoreFollowees, numFollowees) {
    let newState = {
      followeeData: {
        followees: followeeFullProfiles,
        numFollowees: numFollowees,
        hasMoreFollowees: hasMoreFollowees
      }
    };

    this.setState(newState);
  }

  likedUsersDataSource(uploaderId, pageNum, perPage) {
    // TODO likedUsersDataSource
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
    let newState;

    if (name == "profileImage") {
      newState = update(this.state, {
        candidateUserData: {
          profileImage: {
            $set: e.target.files[0]
          }
        }
      });
    } else {
      newState = update(this.state, {
        candidateUserData: {
          [name]: {
            $set: target.value
          }
        }
      });
    }
    this.setState(newState);
  }

  deleteAccountHandler(e) {
    e.preventDefault();

    let profileId = this.state.profileUserId;
    let jwtToken = this.props.auth.getToken();

    UserApi.deleteUserById(profileId, jwtToken, (err, result) => {
      if (err) {
        toastr.error("Error deleting account");
      } else {
        this.props.auth.logout();
        this.context.router.push("/signin");
        toastr.success("Account deleted");
      }
    });
  }

  updateImageHandler() {
    let candidateProfileImageURI;

    let jwtToken = this.props.auth.getToken();
    let userId = this.props.auth.getProfile().id;

    var fd = new FormData();
    fd.append("image", this.state.candidateUserData.profileImage);

    UserApi.updateUserProfilePictureById(userId, fd, jwtToken, (err, response) => {
      if (err) {
        toastr.error("Error updating profile picture");
      } else {
        toastr.success("Profile picture updated successfuly");
        this.profileDataSource();
      }
    });
  }

  changeSelectedProfileTab(e) {
    let selectedProfileTab = e.target.name;

    browserHistory.push(
      "/user/" + this.state.profileUserURL + "?selectedTab=" + selectedProfileTab + "&page=" + "1" + "&per_page=" + "5"
    );
  }

  render() {
    let profileOwnerLoggedIn =
      this.props.auth.loggedIn() && this.props.auth.getProfile().id == this.state.profileUserId;

    let editButton;
    let followButton = (
      <button type="button" className="btn btn-default">
        <span className="glyphicon glyphicon-plus" /> Follow
      </button>
    );
    // if user is logged in and profilePage is the logged in users profile, display edit details button
    // && hide follow button
    if (profileOwnerLoggedIn) {
      editButton = (
        <button type="button" className="btn btn-default" onClick={this.toggleModal}>
          <span className="glyphicon glyphicon-edit" /> Edit
        </button>
      );
      followButton = undefined;
    }

    // Determine which tab body to render
    let uploadedTracksList = (
      <TracksList
        trackResults={this.state.uploadedTracksData.uploadedTracks}
        numTracks={this.state.uploadedTracksData.numTracks}
        pageNum={this.state.pageData.pageNum}
        perPage={this.state.pageData.perPage}
        hasMoreTracks={this.state.uploadedTracksData.hasMoreTracks}
        userURL={this.state.profileUserURL}
      />
    );

    let followingUsersList = (
      <FollowingUsersList
        peopleResults={this.state.followeeData.followees}
        numPeople={this.state.followeeData.numFollowees}
        pageNum={this.state.pageData.pageNum}
        perPage={this.state.pageData.perPage}
        hasMorePeople={this.state.followeeData.hasMoreFollowees}
        userURL={this.state.profileUserURL}
        profileUserId={this.state.profileUserId}
      />
    );

    let likedTracksList = (
      <TracksList
        trackResults={this.state.likedTracksData.likedTracks}
        numTracks={this.state.likedTracksData.numTracks}
        pageNum={this.state.pageData.pageNum}
        perPage={this.state.pageData.perPage}
        hasMoreTracks={this.state.likedTracksData.hasMoreTracks}
        userURL={this.state.profileUserURL}
        isLikedTracksList={true}
      />
    );

    let likedTracksTabClass = "";
    let uploadedTracksTabClass = "";
    let followingUsersTabClass = "";
    let profileTabBody;

    if (this.state.selectedProfileTab.liked) {
      likedTracksTabClass = "active";
      profileTabBody = likedTracksList;
    }
    if (this.state.selectedProfileTab.uploaded) {
      uploadedTracksTabClass = "active";
      profileTabBody = uploadedTracksList;
    }
    if (this.state.selectedProfileTab.following) {
      followingUsersTabClass = "active";
      profileTabBody = followingUsersList;
    }

    let profileTabList = (
      <ul className="nav nav-pills nav-justified">
        <li className={likedTracksTabClass} onClick={e => this.changeSelectedProfileTab(e)}>
          <a name="likedTracks">Liked</a>
        </li>
        <li className={uploadedTracksTabClass} onClick={e => this.changeSelectedProfileTab(e)}>
          <a name="uploadedTracks">Uploaded</a>
        </li>
        <li className={followingUsersTabClass} onClick={e => this.changeSelectedProfileTab(e)}>
          <a name="followingUsers">Following</a>
        </li>
      </ul>
    );

    return (
      <div>
        <div className="container-full">
          <div className="jumbotron text-center" id="userJumbotron">
            <img className="img-circle" src={this.state.profileImageURI} width="150" height="150" />
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
              {followButton}
            </div>
            <br />
          </div>
        </div>
        <div className="container-full">
          <div className="row" id="profileNav">
            <div className="col-md-8 col-md-offset-2">{profileTabList}</div>
          </div>
        </div>
        <div className="container">{profileTabBody}</div>
        <EditDetailsModal
          show={this.state.showEditModal}
          onClose={this.toggleModal}
          handleChange={this.handleChange}
          candidateUserData={this.state.candidateUserData}
          profileImageURI={this.state.profileImageURI}
          handleSubmit={this.submitUpdateUserDataHandler}
          deleteAccountHandler={this.deleteAccountHandler}
          updateImageHandler={this.updateImageHandler}
        />
      </div>
    );
  }
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProfilePage;
