import React from "react";
import Person from "./person";
import { Link } from "react-router";

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

    var createPersonResultRow = function(person) {
      return (
        <li key={person._id} className="list-group-item" style={PersonListingStyle}>
          <Person displayName={person.displayName} userURL={person.userURL} />
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
                      per_page: perPage
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
                      per_page: perPage
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
        {numPeople}
        {results}
      </div>
    );
  }
}

export default PeopleSearchResultsList;
