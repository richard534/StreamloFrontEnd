import React from 'react';
import Person from './person';
var noResultImg = require('images/noResultsSearch.png');

var ThumbnailStyle = {
    marginBottom: "0px"
};

var PersonListingStyle = {
    marginBottom: "10px"
};

class PeopleSearchResultsList extends React.Component {
    render() {
      var self = this;
      var people = self.props.peopleResults;

      var createPersonResultRow = function(person) {
          return (
              <li key={person._id} className="list-group-item" style={PersonListingStyle}>
                  <Person displayName={person.displayName}
                      userURL={person.userURL}/>
              <hr />
              </li>
          );
      };

      var resultsNotFound = function() {
          return (
              <div>
                  <img src={noResultImg} className="center-block search-result-image"></img>
                  <p className="text-center text-muted">Sorry we didn't find any results for "{self.props.searchString}".</p>
                  <p className="text-center text-muted">Check the spelling, or try a different search.</p>
              </div>
          );
      }();

      let previousButtonClass = self.props.peoplePageNum == 0 ? "previous disabled disableClick" : "previous";

      var results;
      var numPeople;
      if (self.props.peopleResults.length > 0) {
          numPeople = <p className="text-muted">Found {self.props.numPeople} people</p>;
          results =
              <div>
                  <ul className="list-group">{people.map(createPersonResultRow)}</ul>
                  <nav>
                      <ul className="pager">
                          <li className={previousButtonClass} onClick={this.props.handlePreviousPager}><a href=""><span aria-hidden="true">&larr;</span> Previous</a></li>
                          <li className="next" onClick={this.props.handleNextPager}><a href="">Next <span aria-hidden="true">&rarr;</span></a></li>
                       </ul>
                  </nav>
              </div>;

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
