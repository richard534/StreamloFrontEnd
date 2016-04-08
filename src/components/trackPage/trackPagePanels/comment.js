"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var commentThumbnail = {
    padding: 0
};

var comment = React.createClass({

    getInitialState: function() {
        return {
            commentUsername: ""
        };
    },

    getDefaultProps: function() {
        return {
            userURL: ""
        };
    },

    componentDidMount: function() {
        this.userDataSource();
    },

    userDataSource: function(){
        var self = this;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/' + self.props.commentUserURL
        }).done(function(result){
            this.setState({ commentUsername: result.displayName });
        }.bind(this));
    },

    render: function() {
        console.log(this.props.userURL);

        return (
            <div className="media">
                <div className="col-md-1" style={commentThumbnail}>
                    <img className="img-circle" src="images/account-icon.png" width="50" height="50"></img>
                </div>
                <div className="col-md-11">
                    <div className="col-md-6">
                        <Link to='profilePage' params={{userURL: this.props.commentUserURL}}><p className="text-muted">{this.state.commentUsername}</p></Link>
                    </div>
                    <div className="col-md-6">
                        <p className="text-muted pull-right">{this.props.datePosted}</p>
                    </div>
                    <div className="col-md-12">
                        <p>{this.props.commentBody}</p>
                    </div>

                </div>
                <div className="col-md-12">
                    <hr />
                </div>
            </div>


        );
    }
});

module.exports = comment;