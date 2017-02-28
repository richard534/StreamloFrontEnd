import React from 'react';
import {Link} from 'react-router';

var ThumbnailStyle = {
    marginBottom: "0px"
};

var profileNameStyle = {
    paddingLeft: "5px",
    marginTop: "5px"
};

class Person extends React.Component {
  render() {
      var self = this;

      var TrackUploadDate = function() {
           var date = new Date(self.props.uploadDate);
           return (date.toString());
      }();

      return (
        <div className="media">
            <div className="media-left">
                <img className="media-object thumbnail img-circle accountThumbnail" src={this.props.profilePicURL} width="160" height="160" style={ThumbnailStyle} />
            </div>
            <div className="media-body">
                <div className="col-md-12">
                    <Link to="profilePage" params={{userURL: this.props.userURL}}><h3 style={profileNameStyle}>{this.props.displayName}</h3></Link>
                        <div className="col-md-12">
                            <span className="text-center"><span className="glyphicon glyphicon-user"></span> {this.props.numFollowers} </span>
                            <span className="text-center">| <span className="glyphicon glyphicon-upload"></span> {this.props.numUploadedTracks} </span>
                        </div>
                </div>
            </div>
        </div>
    );
  }
}

Person.getDefaultProps = {
    numFollowers: "0",
    numUploadedTracks: "0",
    profilePicURL: ""
}

export default Person;
