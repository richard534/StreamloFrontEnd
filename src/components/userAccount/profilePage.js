"use strict";

var React = require('react');
var EditDetailsModal = require('./userAccountModals/editDetailsModal');
var UploadedTracksList = require('./userAccountPanels/uploadedTracksList');

var followersStyle = {
    paddingTop: "10px"
};

// TODO: Create user profile page
var ProfilePage = React.createClass({
    getInitialState: function() {
        return {
            userURL: "",
            profileDisplayname: "",
            numFollowers: "0",
            numFollowing: "0",
            uploadedTracks: [],
            followedUsers: [],
            likedTracks: []
        };
    },

    componentWillMount: function() {
        this.setState({ userURL: this.props.params.userURL });
    },

    componentDidMount: function() {
        this.profileDataSource();
    },

    // AJAX helper method thats sets state to returned ajax query
    profileDataSource: function(props){
        var self = this;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/' + self.state.userURL
        }).done(function(result){
            self.setState({ uploaderId: result._id });
            self.setState({ profileDisplayname: result.displayName });
            self.setState({ numFollowers: result.numberOfFollowers });
            self.setState({ numFollowing: result.numberOfFollowedUsers });
            self.setState({ followedUsers: result.followedUsers });
            self.setState({ likedTracks: result.likedTracks });
            self.tracksUploadedDataSource(result._id);
          });
    },

    tracksUploadedDataSource: function(uploaderId){
        var self = this;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/uploaderId/' + uploaderId
        }).done(function(result){
            self.setState({ uploadedTracks: result });
          });
    },

   render: function() {
       return (
           <div>
               <div className="container-full">
                  <div className="jumbotron text-center" id="userJumbotron">
                      <img className="img-circle" src="images/account-icon.png" width="150" height="150"></img>
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
});

module.exports = ProfilePage;
