import React from 'react';
import {Link} from 'react-router';
var toastr = require('toastr');
var auth = require('../../auth/auth.js');

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

// TODO Change hardcoded ajax post to user currently logged in
var postCommentPanel = React.createClass({
    getInitialState: function() {
        return {
            user: "",
            date: "",
            body: ""
        };
    },

    getDefaultProps: function() {
        return {
            numComments: "0"
        };
    },

    submit: function(event) {
        var userId = auth.getUserId();
        event.preventDefault();

        // Must be logged in to post comment
        if(auth.loggedIn()){
            var data = {
                user: userId,
                date: Date.now(),
                body: this.state.body
            };
            this.postComment(data);
        } else {
            toastr.error('You must be logged in to post a comment');
        }


    },

    postComment: function(data){
        var trackURL = this.props.trackURL;
        var self = this;

        return $.ajax({
          type: "post",
          data: data,
          url: 'http://localhost:3001/tracks/' + trackURL + '/addComment',
          dataType: 'text',
          success: function(results) {
              toastr.success('Comment Added To Track');
              self.props.requestComments();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
              toastr.error('Error Uploading Track');
          }
        });
    },

    setCommentInputString: function(event) { // Handles user input, refreshes DOM every key press
      var value = event.target.value;
      this.setState({body: value});
    },


    // TODO add signed in user to form sumbission
    render: function() {

        return (
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-3" style={commentsHeaderStyle}>
                            <h4><span className="glyphicon glyphicon-comment"></span> Comments</h4>
                        </div>
                        <div className="col-md-9" style={numCommentsStyle}>
                            <p className="text-muted">Number of comments: {this.props.numComments}</p>
                        </div>
                        <form>
                            <div className="col-md-12" style={addCommentInputDiv}>
                                    <div className="form-group">
                                        <div className="col-md-3" style={CommentLabelStyle} >
                                            <p className="text-muted">Add a comment</p>
                                        </div>
                                        <div className="col-md-6" style={commentInput}>
                                            <input rows="4" className="form-control" onChange={this.setCommentInputString} placeholder="Enter Comment..." />
                                        </div>
                                        <div className="col-md-3" style={commentSubmit}>
                                            <button type="submit" onClick={this.submit} className="btn btn-primary btn-block">Post Comment</button>
                                        </div>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
  }
});

export default postCommentPanel;
