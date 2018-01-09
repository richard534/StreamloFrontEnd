import React from "react";
import Track from "./track";
import { Link } from "react-router";

var noResultImg = require("images/noResultsSearch.png");

var trackListingStyle = {
  marginBottom: "10px"
};

class TrackSearchResultsList extends React.Component {
  render() {
    var tracks = this.props.trackResults;
    let searchString = this.props.searchString;

    var createTrackResultRow = function(track) {
      return (
        <li key={track._id} className="list-group-item" style={trackListingStyle}>
          <Track
            trackId={track._id}
            uploaderId={track.uploaderId}
            trackBinaryId={track.trackBinaryId}
            title={track.title}
            artist={track.artist}
            genre={track.genre}
            trackURL={track.trackURL}
            uploadDate={track.dateUploaded}
            numLikes={track.numLikes}
            numPlays={track.numPlays}
          />
          <hr />
        </li>
      );
    };

    var resultsNotFound = (() => {
      return (
        <div>
          <img src={noResultImg} className="center-block search-result-image" />
          <p className="text-center text-muted">Sorry we didn't find any results for "{searchString}".</p>
          <p className="text-center text-muted">Check the spelling, or try a different search.</p>
        </div>
      );
    })();

    let previousButtonClass = this.props.pageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = this.props.hasMoreTracks == false ? "next disabled disableClick" : "next";

    var results;
    var numTracks;

    let nextTrackPageNumber = parseInt(this.props.pageNum) + 1;
    let previousTrackPageNumber = parseInt(this.props.pageNum) - 1;
    let perPage = this.props.perPage;

    if (this.props.trackResults.length > 0) {
      numTracks = <p className="text-muted">Found {this.props.numTracks} tracks</p>;
      results = (
        <div>
          <ul className="list-group">{tracks.map(createTrackResultRow)}</ul>
          <nav>
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link
                  to={{
                    pathname: "/search",
                    query: {
                      q: searchString,
                      page: previousTrackPageNumber,
                      per_page: perPage,
                      filter: "tracks"
                    }
                  }}
                >
                  <span aria-hidden="true">&larr;</span> Previous
                </Link>
              </li>
              <li className={nextButtonClass}>
                <Link
                  to={{
                    pathname: "/search",
                    query: {
                      q: searchString,
                      page: nextTrackPageNumber,
                      per_page: perPage,
                      filter: "tracks"
                    }
                  }}
                >
                  Next <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      results = <div>{resultsNotFound}</div>;
    }

    return (
      <div className="col-md-10">
        {numTracks}
        {results}
      </div>
    );
  }
}

export default TrackSearchResultsList;
