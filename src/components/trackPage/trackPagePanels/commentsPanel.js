"use strict";

var React = require('react');

var commentThumbnail = {
    padding: 0
};

var descriptionPanel = React.createClass({


    render: function() {
        return (
            <div className="col-md-12">
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
        );
    }
});

module.exports = descriptionPanel;
