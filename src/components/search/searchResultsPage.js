import React from 'react';
import {Link} from 'react-router';
import SearchHeader from './searchHeader';
import SearchFilter from './searchFilter';
import TrackSearchResultsList from './trackSearchResultsList';
import PeopleSearchResultsList from './peopleSearchResultsList';
import update from 'immutability-helper';
import _ from 'lodash';
import toastr from 'toastr';
import TrackApi from 'api/trackApi';
import UserApi from 'api/userApi';

/*
this.props.params.search // Gives params
this.props.location.query.q // Gives query string
this.props.path // Gives full path in url
*/

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      trackResults: [],
      peopleResults: [],
      numTracks: 0,
      numPeople: 0,
      trackPageNum: 0,
      peoplePageNum: 0,
      selectedFilter: {
        tracks: true,
        people: false
      }
    };

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.peopleDatasource = this.peopleDatasource.bind(this);
    this.changeSelectedFilter = this.changeSelectedFilter.bind(this);
    this.handlePreviousPagerTracks = this.handlePreviousPagerTracks.bind(this);
    this.handleNextPagerTracks = this.handleNextPagerTracks.bind(this);
    this.handlePreviousPagerPeople = this.handlePreviousPagerPeople.bind(this);
    this.handleNextPagerPeople = this.handleNextPagerPeople.bind(this);
  }

  componentWillMount() {
    this.resetSearchResults();
  }

  componentDidMount() {
    this.tracksDataSource();
    this.peopleDatasource();
  }

  // Lifecycle method run when component revieves new props from router (i.e when another search performed)
  componentWillReceiveProps(nextProps) {
    this.resetSearchResults(nextProps);
    this.tracksDataSource(nextProps);
    this.peopleDatasource(nextProps);
  }

  resetSearchResults(props) {
    props = props || this.props;
    this.setState({
      searchString: props.location.query.q,
      trackResults: [],
      peopleResults: [],
      numTracks: 0,
      numPeople: 0
    });
  }

  tracksDataSource(props, pagenum = 0) {
    props = props || this.props;

    let trackNameQuery = props.location.query.q;
    let pageNum = pagenum;

    TrackApi.getTracksByNameLimitedByPageNum(trackNameQuery, pageNum, (err, result) => {
      if (!err) {
        this.setState({
          trackResults: result.tracks,
          numTracks: result.total,
          trackPageNum: pageNum
        });
      }
    });
  }

  peopleDatasource(props, pagenum = 0) {
    props = props || this.props;

    let displayName = props.location.query.q;
    let pageNum = pagenum;

    UserApi.getUsersByDisplaynameLimitedByPageNum(displayName, pageNum, (err, result) => {
      if(err) return;
      else if (!_.isEmpty(result.users)) {
        this.setState({
          peopleResults: result.users,
          numPeople: result.total,
          peoplePageNum: pageNum
        });
      }
    });
  }

  changeSelectedFilter(e) {
    e.preventDefault();
    const name = e.target.parentNode.getAttribute('name');

    var newState = update(this.state, {
      selectedFilter: {
        tracks: {
          $set: false
        },
        people: {
          $set: false
        },
        [name]: {
          $set: true
        }
      }
    });

    this.setState(newState);
  }

  // Track Pagination handlers
  handlePreviousPagerTracks(e) {
    e.preventDefault();
    if (this.state.trackPageNum === 0) { // If first page do nothing
      return;
    }
    this.tracksDataSource(null, this.state.trackPageNum - 1);
  }

  handleNextPagerTracks(e) {
    e.preventDefault();
    this.tracksDataSource(null, this.state.trackPageNum + 1);
  }

  // People Pagination handlers
  handlePreviousPagerPeople(e) {
    e.preventDefault();
    if (this.state.peoplePageNum === 0) { // If first page do nothing
      return;
    }
    this.peopleDatasource(null, this.state.peoplePageNum - 1);
  }

  handleNextPagerPeople(e) {
      e.preventDefault();
      this.peopleDatasource(null, this.state.peoplePageNum + 1);
  }

  render() {
    var self = this;
    var resultsList;

    var trackResultsList = function() {
      return (
        <TrackSearchResultsList trackResults={self.state.trackResults}
                  searchString={self.state.searchString}
                  numTracks={self.state.numTracks}
                  handlePreviousPager={self.handlePreviousPagerTracks}
                  handleNextPager={self.handleNextPagerTracks} />
      );
    }();

    var peopleResultsList = function() {
      return (
        <PeopleSearchResultsList peopleResults={self.state.peopleResults}
                  searchString={self.state.searchString}
                  numPeople={self.state.numPeople}
                  handlePreviousPager={self.handlePreviousPagerPeople}
                  handleNextPager={self.handleNextPagerPeople} />
      );
    }();

    function determineSelectedFilter() {
      if (self.state.selectedFilter.tracks == true) {
        return "tracks";
      } else if (self.state.selectedFilter.people == true) {
        return "people";
      }
    }

    let selectedFilter = determineSelectedFilter();

    switch (selectedFilter) {
      case "tracks":
        resultsList = trackResultsList;
        break;
      case "people":
        resultsList = peopleResultsList;
        break;
    }

    return (
      <div className="container">
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter onChangeFilter={this.changeSelectedFilter} filterSelected={selectedFilter}/>
            {resultsList}
        </div>
    );
  }
}

export default SearchResultsPage;
