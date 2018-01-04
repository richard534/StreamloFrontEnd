import React from "react";
import { Link } from "react-router";
import toastr from "toastr";
import update from "immutability-helper";
import TrackApi from "api/trackApi";

var numCommentsStyle = {
  paddingTop: "12px",
  paddingLeft: "0px"
};

var CommentLabelStyle = {
  paddingTop: "6px",
  paddingRight: "0px"
};

var commentsHeaderStyle = {
  paddingRight: "0px"
};

var addCommentInputDiv = {
  paddingTop: "5px"
};

var commentInput = {
  paddingLeft: "0px",
  paddingRight: "0px"
};

var commentSubmit = {
  paddingRight: "0px"
};

class PostCommentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postCommentBody: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  postComment(e) {
    e.preventDefault();
    if (this.props.loggedIn) {
      let trackURL = this.props.trackURL;
      let userId = this.props.profile.id;
      let jwtToken = this.props.jwtToken;

      let data = {
        user: userId,
        date: Date.now(),
        body: this.state.postCommentBody
      };

      TrackApi.postCommentToTrack(trackURL, data, jwtToken, (err, result) => {
        if (err) {
          toastr.error("Error adding comment");
        } else {
          toastr.success("Comment Added");
          this.setState({ postCommentBody: "" });
        }
      });
    } else {
      toastr.error("Please Log in before commenting");
    }
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;

    var newState = update(this.state, {
      [name]: {
        $set: target.value
      }
    });

    this.setState(newState);
  }

  render() {
    let postCommentButton = (
      <div className="col-md-3" style={commentSubmit}>
        <button type="submit" className="btn btn-primary btn-block" disabled>
          Post Comment
        </button>
      </div>
    );

    if (this.props.loggedIn) {
      postCommentButton = (
        <div className="col-md-3" style={commentSubmit}>
          <button type="submit" className="btn btn-primary btn-block">
            Post Comment
          </button>
        </div>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-md-3" style={commentsHeaderStyle}>
            <h4>
              <span className="glyphicon glyphicon-comment" /> Comments
            </h4>
          </div>
          <div className="col-md-9" style={numCommentsStyle}>
            <p className="text-muted">Number of comments: {this.props.numComments}</p>
          </div>
          <form onSubmit={this.postComment} onChange={this.handleChange}>
            <div className="col-md-12" style={addCommentInputDiv}>
              <div className="form-group">
                <div className="col-md-3" style={CommentLabelStyle}>
                  <p className="text-muted">Add a comment</p>
                </div>
                <div className="col-md-6" style={commentInput}>
                  <input
                    value={this.state.postCommentBody}
                    name="postCommentBody"
                    rows="4"
                    className="form-control"
                    placeholder="Enter Comment..."
                  />
                </div>
                {postCommentButton}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostCommentPanel.getDefaultProps = {
  numComments: "0"
};

export default PostCommentPanel;
