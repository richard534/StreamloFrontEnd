import React from 'react';
import toastr from 'toastr';
import EditDetailsModal from './userAccountModals/editDetailsModal';
import UploadedTracksList from './userAccountPanels/uploadedTracksList';
import UserApi from 'api/userApi';
import TrackApi from 'api/trackApi';
var accountIcon = require('images/account-icon.png');

var followersStyle = {
  paddingTop: "10px"
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userURL: "",
      profileDisplayname: "",
      numFollowers: "0",
      numFollowing: "0",
      uploadedTracks: [],
      followedUsers: [],
      likedTracks: []
    }

    this.profileDataSource = this.profileDataSource.bind(this);
    this.tracksUploadedDataSource = this.tracksUploadedDataSource.bind(this);
  }

  componentWillMount() {
    this.setState({ userURL: this.props.params.userURL });
  }

  componentDidMount() {
    this.profileDataSource();
  }

  profileDataSource(props) {
    UserApi.getUserByUserURL(this.state.userURL, (err, result) => {
      if (err) {
        toastr.error('Error retrieving profile');
      } else {
        let newState = {
          uploaderId: result._id,
          profileDisplayname: result.displayName,
          numFollowers: result.numberOfFollowers,
          numFollowing: result.numberOfFollowedUsers,
          followedUsers: result.followedUsers,
          likedTracks: result.likedTracks
        };
        this.setState(newState);
        this.tracksUploadedDataSource(result._id);
      }
    });
  }

  tracksUploadedDataSource(uploaderId) {
    TrackApi.getTrackByUserId(uploaderId, (err, result) => {
      if (err) {
        toastr.error('Error retireving uploaded tracks list')
      } else {
        this.setState({ uploadedTracks: result });
      }
    });
  }

  render() {
    return (
      <div>
       <div className="container-full">
          <div className="jumbotron text-center" id="userJumbotron">
              <img className="img-circle" src={accountIcon} width="150" height="150"></img>
              <h4 className="text-center">{this.state.profileDisplayname}</h4>
              <span className="text-center"><span className="glyphicon glyphicon-user"></span> Followers: {this.state.numFollowers} </span>
              <span className="text-center">| <span className="glyphicon glyphicon-eye-open"></span> Following: {this.state.numFollowing}</span>
              <div className="btn-group-sm" role="group" style={followersStyle}>
                  <button type="button" className="btn btn-default" data-toggle="modal" data-target="#editDetailsModal"><span className="glyphicon glyphicon-edit"></span> Edit</button>
                  <span> </span>
                  <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-plus"></span> Follow</button>
              </div>
              <br />
          </div>
      </div>
      <div className="container-full">
          <div className="row" id="profileNav">
              <div className="col-md-8 col-md-offset-2">
                  <ul className="nav nav-pills nav-justified">
                      <li role="presentation"><a>Liked</a></li>
                      <li role="presentation" className="active"><a href="#">Uploaded</a></li>
                      <li role="presentation"><a>Playlists</a></li>
                  </ul>
              </div>
          </div>
      </div>
      <div className="container">
          <UploadedTracksList uploadedTracks={this.state.uploadedTracks} />
          <EditDetailsModal />
      </div>
   </div>
    );
  }
}

export default ProfilePage;