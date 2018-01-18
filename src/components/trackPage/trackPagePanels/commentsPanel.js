import React from "react";
import Comment from "./comment";

class CommentsPanel extends React.Component {
  render() {
    var self = this;
    var comments = self.props.comments;

    let renderedCommentCounter = 0;
    var createCommentRow = function(comment) {
      let lastComment = false;
      if (renderedCommentCounter >= comments.length - 1) {
        lastComment = true;
      }
      renderedCommentCounter++;

      let postCommentSeperator;
      // if not last comment on comment page render comment seperator
      if (!lastComment) {
        postCommentSeperator = (
          <div className="col-md-12">
            <hr />
          </div>
        );
      }

      return (
        <div key={comment._id} className="col-md-12">
          <li key={comment._id} className="list-group-item">
            <Comment commentUserId={comment.user} commentDate={comment.datePosted} commentBody={comment.body} />
          </li>
          {postCommentSeperator}
        </div>
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

    if (comments && comments.length > 0) {
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
