import React from "react";
import Person from "./person";
import { Link } from "react-router";

import UserApi from "api/userApi";

var noResultImg = require("images/noResultsSearch.png");

var ThumbnailStyle = {
  marginBottom: "0px"
};

var PersonListingStyle = {
  marginBottom: "10px"
};

class PeopleSearchResultsList extends React.Component {
  render() {
    var people = this.props.peopleResults;
    let searchString = this.props.searchString;

    let linkPathName;
    let linkFilter;

    let searchResultsMessage1;
    let searchResultsMessage2;

    // If userURL is passed down as props then assume user is on profile page
    // and set react router path names accordingly
    if (this.props.userURL) {
      linkPathName = "/user/" + this.props.userURL;
      searchResultsMessage1 = "This user has not followed any people :(";
    } else {
      linkPathName = "/search";
      linkFilter = "tracks";
      searchResultsMessage1 = "Sorry we didn't find any results for \"" + searchString + '"';
      searchResultsMessage2 = "Check the spelling, or try a different search.";
    }

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
        <p className="text-center text-muted">{searchResultsMessage1}</p>
        <p className="text-center text-muted">{searchResultsMessage2}</p>
      </div>
    );

    let previousButtonClass = this.props.pageNum == 1 ? "previous disabled disableClick" : "previous";
    let nextButtonClass = this.props.hasMorePeople == false ? "next disabled disableClick" : "next";

    var results;
    var numPeople;

    let nextPeoplePageNumber = parseInt(this.props.pageNum) + 1;
    let previousTrackPageNumber = parseInt(this.props.pageNum) - 1;
    let perPage = this.props.perPage;

    if (this.props.peopleResults.length > 0) {
      numPeople = <p className="text-muted">Found {this.props.numPeople} people</p>;
      results = (
        <div>
          <ul className="list-group">{people.map(createPersonResultRow)}</ul>
          <nav>
            <ul className="pager">
              <li className={previousButtonClass}>
                <Link
                  to={{
                    pathname: "/search",
                    query: {
                      q: this.props.searchString,
                      page: previousTrackPageNumber,
                      per_page: perPage,
                      filter: "people"
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
                      q: this.props.searchString,
                      page: nextPeoplePageNumber,
                      per_page: perPage,
                      filter: "people"
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
        {numPeople}
        {results}
      </div>
    );
  }
}

export default PeopleSearchResultsList;
