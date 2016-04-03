"use strict";

var React = require('react');

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

var postCommentPanel = React.createClass({
    getDefaultProps: function() {
        return {
            numComments: "0"
        };
    },



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
                                            <input rows="4" className="form-control" placeholder="Enter Comment..." />
                                        </div>
                                        <div className="col-md-3" style={commentSubmit}>
                                            <button type="submit" className="btn btn-primary btn-block">Post Comment</button>
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

module.exports = postCommentPanel;
