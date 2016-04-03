"use strict";

var React = require('react');
var TrackJumbotron = require('./trackPagePanels/trackJumbotron');
var CommentsPanel = require('./trackPagePanels/commentsPanel');
var PostCommentPanel = require('./trackPagePanels/postCommentPanel');
var DescriptionPanel = require('./trackPagePanels/descriptionPanel');

var commentsPanelStyle = {
    marginTop: "10px"
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
                    <PostCommentPanel />
                    <CommentsPanel />
                </div>
                <DescriptionPanel />
            </div>
        </div>

    );
  }
});

module.exports = TrackPage;
