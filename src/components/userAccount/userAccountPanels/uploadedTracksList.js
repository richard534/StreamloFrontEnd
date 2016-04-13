"use strict";

var React = require('react');

var uploadedTracksList = React.createClass({


   render: function() {
       var self = this;
       var tracks = self.props.uploadedTracks;
       var results;

       var createTrackResultRow = function(track) {
           return (
               <li key={track._id} className="list-group-item">
                   <Track
                   />
               <hr />
               </li>
           );
       };

       var noTracksUploaded = function() {
           return (
               <div>
                   <img src="/images/noResultsSearch.svg" className="center-block search-result-image"></img>
                   <p className="text-center text-muted">This user had not uploaded any tracks</p>
               </div>
           );
       };

       if (tracks.length > 0) {
           results = <ul className="list-group">{tracks.map(createTrackResultRow)}</ul>;
        } else {
            results = <div>{noTracksUploaded()}</div>;
        }

       return (
           <div className="col-md-12">
             <div className="panel panel-default">
                 <div className="panel-body">
                     {results}
                 </div>
             </div>
           </div>
       );
     }
});

module.exports = uploadedTracksList;
