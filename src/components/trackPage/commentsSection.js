import React from "react";
import toastr from "toastr";
import update from "immutability-helper";
import TrackApi from "api/trackApi";
import CommentsPanel from "./trackPagePanels/commentsPanel";
import PostCommentPanel from "./trackPagePanels/postCommentPanel";

var commentsDivStyle = {
  paddingLeft: "0px"
};

class CommentsSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-8" style={commentsDivStyle}>
        <PostCommentPanel
          numComments={this.props.numComments}
          postComment={this.props.postComment}
          postCommentBody={this.props.postCommentBody}
          handleChange={this.props.handleChange}
          loggedIn={this.props.loggedIn}
        />
        <CommentsPanel
          comments={this.props.comments}
          pageNum={this.props.pageNum}
          hasMoreComments={this.props.hasMoreComments}
          numComments={this.props.numComments}
          handleNextCommentsPager={this.props.handleNextCommentsPager}
          handlePreviousCommentsPager={this.props.handlePreviousCommentsPager}
        />
      </div>
    );
  }
}

export default CommentsSection;
