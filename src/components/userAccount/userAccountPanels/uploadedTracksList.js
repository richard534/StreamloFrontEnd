import React from 'react';
import Track from './uploadedTrack';
var noResultImg = require('../../../images/noResultsSearch.png');

class UploadedTrackList extends React.Component {
   render() {
       var self = this;
       var tracks = self.props.uploadedTracks;
       var results;

       var createTrackResultRow = function(track) {
           return (
               <li key={track._id} className="list-group-item">
                   <Track trackId={track._id}
                   uploaderId={track.uploaderId}
                   trackBinaryId={track.trackBinary}
                   title={track.title}
                   artist={track.artist}
                   genre={track.genre}
                   trackURL={track.trackURL}
                   uploadDate={track.dateUploaded}
                   numLikes={track.numLikes}
                   numPlays={track.numPlays} />
               <hr />
               </li>
           );
       };

       var noTracksUploaded = function() {
           return (
               <div>
                   <img src={noResultImg} className="center-block search-result-image"></img>
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
}

export default UploadedTrackList;
