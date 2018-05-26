import React from "react";
import Track from "./track";
import { Link } from "react-router";
import TrackApi from "api/trackApi";
import MiscApi from "api/miscApi";

let noResultImg = MiscApi.getNoSearchResultsImgUrl();

var trackListingStyle = {
  marginBottom: "10px"
};

class TrackSearchResultsList extends React.Component {
  render() {
    var tracks = this.props.trackResults;
    let searchString = this.props.searchString;

    let previousButtonClass = this.props.pageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = this.props.hasMoreTracks == false ? "next disabled disableClick" : "next";

    var results;
    var numTracks;

    let nextTrackPageNumber = parseInt(this.props.pageNum) + 1;
    let previousTrackPageNumber = parseInt(this.props.pageNum) - 1;
    let perPage = this.props.perPage;

    let searchResultsMessage1;
    let searchResultsMessage2;

    let nextPaginationLinkAttribute;
    let prevPaginationLinkAttribute;

    // If userURL is passed down as props then assume user is on profile page
    // and set react router path names accordingly
    if (this.props.userURL) {
      let selectedTab = "uploadedTracks";
      searchResultsMessage1 = "This user has not uploaded any tracks :(";

      if (this.props.isLikedTracksList) {
        selectedTab = "likedTracks";
        searchResultsMessage1 = "This user has not liked any tracks :(";
      }

      nextPaginationLinkAttribute = {
        pathname: "/user/" + this.props.userURL,
        query: {
          selectedTab: selectedTab,
          page: nextTrackPageNumber,
          per_page: perPage
        }
      };

      prevPaginationLinkAttribute = {
        pathname: "/user/" + this.props.userURL,
        query: {
          selectedTab: selectedTab,
          page: previousTrackPageNumber,
          per_page: perPage,
          filter: "tracks"
        }
      };
    } else {
      let linkPathName = "/search";
      let linkFilter = "tracks";

      nextPaginationLinkAttribute = {
        pathname: linkPathName,
        query: {
          q: searchString,
          page: nextTrackPageNumber,
          per_page: perPage,
          filter: linkFilter
        }
      };

      prevPaginationLinkAttribute = {
        pathname: linkPathName,
        query: {
          q: searchString,
          page: previousTrackPageNumber,
          per_page: perPage,
          filter: "tracks"
        }
      };

      searchResultsMessage1 = "Sorry we didn't find any results for \"" + searchString + '"';
      searchResultsMessage2 = "Check the spelling, or try a different search.";
    }

    var createTrackResultRow = function(track) {
      return (
        <li key={track._id} className="list-group-item" style={trackListingStyle}>
          <Track
            trackId={track._id}
            uploaderId={track.uploaderId}
            title={track.title}
            artist={track.artist}
            genre={track.genre}
            trackURL={track.trackURL}
            uploadDate={track.dateUploaded}
            numLikes={track.numLikes}
            numPlays={track.numPlays}
            numComments={track.numComments}
            trackAlbumArtURI={TrackApi.getTrackAlbumArtURIByTrackId(track._id)}
          />
          <hr />
        </li>
      );
    };

    let loadingSpinner = <div className="loader" />;

    var resultsNotFound = (
      <div>
        <img src={noResultImg} className="center-block search-result-image" />
        <p className="text-center text-muted">{searchResultsMessage1}</p>
        <p className="text-center text-muted">{searchResultsMessage2}</p>
      </div>
    );

    if (this.props.trackResults && this.props.trackResults.length > 0) {
      numTracks = <p className="text-muted">Found {this.props.numTracks} tracks</p>;
      results = (
        <div>
          <ul className="list-group">{tracks.map(createTrackResultRow)}</ul>
          <nav>
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link to={prevPaginationLinkAttribute}>
                  <span aria-hidden="true">&larr;</span> Previous
                </Link>
              </li>
              <li className={nextButtonClass}>
                <Link to={nextPaginationLinkAttribute}>
                  Next <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else if (!this.props.loaded) {
      results = loadingSpinner;
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
