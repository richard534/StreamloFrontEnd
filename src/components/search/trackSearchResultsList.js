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

    let linkPathName;
    let linkFilter;

    let searchResultsMessage1;
    let searchResultsMessage2;
    // If userURL is passed down as props then assume user is on profile page
    // and set react router path names accordingly
    if (this.props.userURL) {
      linkPathName = "/user/" + this.props.userURL;
      searchResultsMessage1 = "This user has not uploaded any tracks :(";
    } else {
      linkPathName = "/search";
      linkFilter = "tracks";
      searchResultsMessage1 = "Sorry we didn't find any results for \"" + searchString + '"';
      searchResultsMessage2 = "Check the spelling, or try a different search.";
    }

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
            numComments={track.numComments}
          />
          <hr />
        </li>
      );
    };

    var resultsNotFound = (
      <div>
        <img src={noResultImg} className="center-block search-result-image" />
        <p className="text-center text-muted">{searchResultsMessage1}</p>
        <p className="text-center text-muted">{searchResultsMessage2}</p>
      </div>
    );

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
                    pathname: linkPathName,
                    query: {
                      q: searchString,
                      page: previousTrackPageNumber,
                      per_page: perPage,
                      filter: linkFilter
                    }
                  }}
                >
                  <span aria-hidden="true">&larr;</span> Previous
                </Link>
              </li>
              <li className={nextButtonClass}>
                <Link
                  to={{
                    pathname: linkPathName,
                    query: {
                      q: searchString,
                      page: nextTrackPageNumber,
                      per_page: perPage,
                      filter: linkFilter
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
      <div className="col-md-12">
        {numTracks}
        {results}
      </div>
    );
  }
}

export default TrackSearchResultsList;
