"use strict";

var React = require('react');
var Comment = require('./comment');

var descriptionPanel = React.createClass({


    render: function() {
        var self = this;
        var comments = self.props.comments;
        var userURL = self.props.userURL;
        console.log(userURL);

        var createCommentRow = function(comment) {
            return (
                <li key={comment._id} className="list-group-item">
                        <Comment
                            commentUserId={comment.user}
                            commentDate={comment.datePosted}
                            commentBody={comment.body}
                            commentUserURL={userURL}
                        />
                </li>

            );
        };

        var noComments = function() {
            return (
                <div>
                    <p>No Comments</p>
                </div>
            );
        }();

        var results;
        var numcomments;
        if (self.props.comments.length > 0) {
            results = <ul className="list-group">{comments.map(createCommentRow)}</ul>;
         } else {
             results = <div className="text-center">{noComments}</div>;
         }

        return (
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {results}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = descriptionPanel;
