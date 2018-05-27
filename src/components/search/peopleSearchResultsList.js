import React from "react";
import Person from "./person";
import { Link } from "react-router";

import UserApi from "api/userApi";
import MiscApi from "api/miscApi";

let noResultImg = MiscApi.getNoSearchResultsImgUri();

var ThumbnailStyle = {
  marginBottom: "0px"
};

var PersonListingStyle = {
  marginBottom: "10px"
};

class PeopleSearchResultsList extends React.Component {
  render() {
    let searchString = this.props.searchString;

    let nextPeoplePageNumber = parseInt(this.props.pageNum) + 1;
    let previousTrackPageNumber = parseInt(this.props.pageNum) - 1;
    let perPage = this.props.perPage;

    let noPeopleFoundMessage1;
    let noPeopleFoundMessage2;

    // If userURL is passed down as props then assume user is on profile page
    // and set react router path names accordingly
    let nextPaginationLinkAttribute;
    let prevPaginationLinkAttribute;

    if (this.props.userURL) {
      nextPaginationLinkAttribute = {
        pathname: "/user/" + this.props.userURL,
        query: {
          selectedTab: "followingUsers",
          page: nextPeoplePageNumber,
          per_page: perPage
        }
      };

      prevPaginationLinkAttribute = {
        pathname: "/user/" + this.props.userURL,
        query: {
          selectedTab: "followingUsers",
          page: previousTrackPageNumber,
          per_page: perPage
        }
      };

      noPeopleFoundMessage1 = "This user has not followed any people :(";
    } else {
      nextPaginationLinkAttribute = {
        pathname: "/search",
        query: {
          q: this.props.searchString,
          page: nextPeoplePageNumber,
          per_page: perPage,
          filter: "people"
        }
      };

      prevPaginationLinkAttribute = {
        pathname: "/search",
        query: {
          q: this.props.searchString,
          page: previousTrackPageNumber,
          per_page: perPage,
          filter: "people"
        }
      };

      noPeopleFoundMessage1 = "Sorry we didn't find any results for \"" + searchString + '"';
      noPeopleFoundMessage2 = "Check the spelling, or try a different search.";
    }

    let loadingSpinner = <div className="loader" />;

    var createPersonResultRow = function(person) {
      let userProfileImageURI = UserApi.getUserProfilePictureURIByUserId(person._id);

      return (
        <li key={person._id} className="list-group-item" style={PersonListingStyle}>
          <Person
            displayName={person.displayName}
            userURL={person.userURL}
            numFollowers={person.numberOfFollowers}
            numUploadedTracks={person.numberOfTracksUploaded}
            profilePictureURI={userProfileImageURI}
          />
          <hr />
        </li>
      );
    };

    var resultsNotFound = (
      <div>
        <img src={noResultImg} className="center-block search-result-image" />
        <p className="text-center text-muted">{noPeopleFoundMessage1}</p>
        <p className="text-center text-muted">{noPeopleFoundMessage2}</p>
      </div>
    );

    let previousButtonClass = this.props.pageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = this.props.hasMorePeople == false ? "next disabled disableClick" : "next";

    let results;
    let numPeople;

    if (this.props.peopleResults.length > 0) {
      numPeople = <p className="text-muted">Found {this.props.numPeople} people</p>;

      results = (
        <div>
          <ul className="list-group">{this.props.peopleResults.map(createPersonResultRow)}</ul>
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
        {numPeople}
        {results}
      </div>
    );
  }
}

export default PeopleSearchResultsList;
