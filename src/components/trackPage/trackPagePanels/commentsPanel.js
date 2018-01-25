import React from "react";
import Comment from "./comment";

class CommentsPanel extends React.Component {
  render() {
    var self = this;
    var comments = self.props.comments;

    let renderedCommentCounter = 0;
    var createCommentRow = comment => {
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
            <Comment
              commentId={comment._id}
              commentUserId={comment.user}
              commentDate={comment.datePosted}
              commentBody={comment.body}
              loggedInUserId={this.props.profileId}
              handleDeleteComment={this.props.handleDeleteComment}
            />
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

    let previousButtonClass = this.props.pageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = this.props.hasMoreComments == false ? "next disabled disableClick" : "next";

    let pagerControls = undefined;
    // if there are more comments to show or on last page show pagerControls
    if (this.props.numComments)
      pagerControls = (
        <nav>
          <ul className="pager">
            <li className={previousButtonClass} onClick={this.props.handlePreviousCommentsPager}>
              <a href="">
                <span aria-hidden="true">&larr;</span> Previous
              </a>
            </li>
            <li className={nextButtonClass} onClick={this.props.handleNextCommentsPager}>
              <a href="">
                Next <span aria-hidden="true">&rarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      );

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">{results}</div>
        </div>
        {pagerControls}
      </div>
    );
  }
}

export default CommentsPanel;
