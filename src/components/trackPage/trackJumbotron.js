"use strict";

var React = require('react');

var trackNameStyle = {
    marginTop: "0px"
};

var detailsColStyle = {
    textAlign: "left"
};

var artistStyle = {
    marginBottom: "5px"
};

var audioTagStyle = {
    width: "100%"
};

var bottomAlignText = {
    position: "absolute",
    bottom: "0px"
};

var colHeight = {
    height: "100%"
};

var trackJumbotron = React.createClass({
    getDefaultProps: function() {
        return {
            uploadDate: Date.now(),
            trackId: "",
            numPlays: 0,
            numLikes: 0
        };
    },


  render: function() {
    var self = this;

    var TrackUploadDate = function() {
       var date = new Date(self.props.uploadDate);
       var dateString = date.toDateString();
       return (dateString);
    }();

    return (

       <div className="jumbotron text-center" id="userJumbotron">
           <div className="col-md-9" style={colHeight}>
               <div className="col-md-6" style={detailsColStyle}>
                   <p className="text-muted" style={artistStyle}>Test Artist</p>
                   <h3 style={trackNameStyle}>Test Song</h3>
                   <h5><span className="glyphicon glyphicon-play"></span> {this.props.numPlays}</h5>

                   <div className="btn-group-sm" role="group">
                       <button type="button" className="btn btn-default" ><span className="glyphicon glyphicon-thumbs-up"></span> {this.props.numLikes}</button>
                   </div>
               </div>
               <div className="col-md-6">
                   <span className="pull-right">{TrackUploadDate}</span>
               </div>
               <div className="col-md-12" style={bottomAlignText}>
                   <audio id={this.props.trackId} style={audioTagStyle} controls>
                     <source src="" type="audio/mp3"/>
                   </audio>
               </div>

           </div>
           <div className="col-md-3">
               <img className="img-responsive pull-right" src="/images/altAlbumArtLogo.png" alt="" width="215" height="215" />
           </div>

           </div>
    );
  }
});

module.exports = trackJumbotron;
