"use strict";

var React = require('react');
var EditDetailsModal = require('./userAccountModals/editDetailsModal');

var followersStyle = {
    paddingTop: "10px"
};

// TODO: Create user profile page
var ProfilePage = React.createClass({
    getDefaultProps: function() {
        return {
            numFollowers: "0",
            numFollowing: "0"
        };
    },

   render: function() {
       return (
           <div>
               <div className="container-full">
                  <div className="jumbotron text-center" id="userJumbotron">
                      <img className="img-circle" src="images/belfast1.jpg" width="150" height="150"></img>
                      <h4 className="text-center">ProfileName</h4>
                      <span className="text-center"><span className="glyphicon glyphicon-user"></span> Followers: {this.props.numFollowers} </span>
                      <span className="text-center">| <span className="glyphicon glyphicon-eye-open"></span> Following: {this.props.numFollowing}</span>
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
                              <li role="presentation" className="active"><a href="#">Liked</a></li>
                              <li role="presentation"><a href="#">Uploaded</a></li>
                              <li role="presentation"><a href="#">Playlists</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="container">
                <div className="col-md-12">
                  <div className="panel panel-default">
                      <div className="panel-body">

                      </div>
                  </div>
                </div>

                <EditDetailsModal />


              </div>
           </div>

       );
     }
});

module.exports = ProfilePage;
