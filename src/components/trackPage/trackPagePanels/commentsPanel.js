import React from "react";
import Comment from "./comment";

class CommentsPanel extends React.Component {
  render() {
    var self = this;
    var comments = self.props.comments;

    var createCommentRow = function(comment) {
      return (
        <li key={comment._id} className="list-group-item">
          <Comment commentUserId={comment.user} commentDate={comment.datePosted} commentBody={comment.body} />
        </li>
      );
    };

    var noComments = (function() {
      return (
        <div>
          <p>No Comments</p>
        </div>
      );
    })();

    var results;
    var numcomments;
    if (self.props.comments.length > 0) {
      results = <ul className="list-group">{comments.map(createCommentRow)}</ul>;
    } else {
      results = <div className="text-center">{noComments}</div>;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">{results}</div>
      </div>
    );
  }
}

export default CommentsPanel;
