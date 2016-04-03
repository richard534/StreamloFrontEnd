"use strict";

var React = require('react');
var TrackJumbotron = require('./trackJumbotron');

var commentsPanelStyle = {
    marginTop: "10px"
};

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

var commentThumbnail = {
    padding: 0
};

var TrackPage = React.createClass({
    getInitialState: function() {
        return {
            uploadDate: Date.now(),
            trackId: "",
            numPlays: 0,
            numLikes: 0,
            numComments: 0
        };
    },

    render: function() {
    return (
        <div className="container">
            <TrackJumbotron />

            <div className="col-md-12" style={commentsPanelStyle}>
                <div className="col-md-8">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="col-md-3" style={commentsHeaderStyle}>
                                <h4><span className="glyphicon glyphicon-comment"></span> Comments</h4>
                            </div>
                            <div className="col-md-9" style={numCommentsStyle}>
                                <p className="text-muted">Number of comments: {this.state.numComments}</p>
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
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <div className="col-md-1" style={commentThumbnail}>
                                    <img className="img-circle" src="images/belfast1.jpg" width="50" height="50"></img>
                                </div>
                                <div className="col-md-11">
                                    <div className="col-md-6">
                                        <p className="text-muted">Richard at 12:00</p>

                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-muted pull-right">12th April 2015</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p>Test Comment</p>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h4>Description</h4>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
  }
});

module.exports = TrackPage;
