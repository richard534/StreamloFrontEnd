import React from "react";
import { Link } from "react-router";
import SearchHeader from "./searchHeader";
import SearchFilter from "./searchFilter";
import TrackSearchResultsList from "./trackSearchResultsList";
import PeopleSearchResultsList from "./peopleSearchResultsList";
import update from "immutability-helper";
import _ from "lodash";
import toastr from "toastr";
import TrackApi from "api/trackApi";
import UserApi from "api/userApi";

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
      pageNum: 0,
      perPage: 0,
      hasMoreTracks: false,
      hasMorePeople: false,
      selectedFilter: {
        tracks: true,
        people: false
      }
    };

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.peopleDatasource = this.peopleDatasource.bind(this);
    this.changeSelectedFilter = this.changeSelectedFilter.bind(this);
  }

  componentDidMount() {
    this.setInitialResultsPageState();
  }

  // Lifecycle method run when component revieves new props from router (i.e when another search performed)
  componentWillReceiveProps(nextProps) {
    this.setInitialResultsPageState(nextProps);
  }

  setInitialResultsPageState(props) {
    props = props || this.props; // if props variable passed to this method then use it
    this.setState(
      {
        searchString: props.location.query.q,
        pageNum: props.location.query.page,
        perPage: props.location.query.per_page,
        trackResults: [],
        peopleResults: []
      },
      () => {
        this.tracksDataSource();
        this.peopleDatasource();
      }
    );
  }

  tracksDataSource(pagenum = 1) {
    if (!this.state.selectedFilter.tracks) return;

    let trackNameQuery = this.state.searchString;
    let pageNum = this.state.pageNum;
    let perPage = this.state.perPage;

    TrackApi.getTracksByName(trackNameQuery, pageNum, perPage, (err, result) => {
      if (!err) {
        let hasMoreTracks = true;
        if (result.page == result.pageCount) hasMoreTracks = false;
        this.setState({
          trackResults: result.tracks,
          numTracks: result.total,
          hasMoreTracks: hasMoreTracks
        });
      }
    });
  }

  peopleDatasource(pagenum = 1) {
    if (!this.state.selectedFilter.people) return;

    let displayNameQuery = this.state.searchString;
    let pageNum = this.state.pageNum;
    let perPage = this.state.perPage;

    UserApi.getUsersByDisplayname(displayNameQuery, pageNum, perPage, (err, result) => {
      if (err) return;
      else if (!_.isEmpty(result.users)) {
        let hasMorePeople = true;
        if (result.page == result.pageCount) hasMorePeople = false;
        this.setState({
          peopleResults: result.users,
          numPeople: result.total,
          hasMorePeople: hasMorePeople
        });
      }
    });
  }

  changeSelectedFilter(e) {
    e.preventDefault();
    const name = e.target.parentNode.getAttribute("name");

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

    this.setState(newState, () => {
      if (this.state.selectedFilter.tracks) {
        this.tracksDataSource();
      } else {
        this.peopleDatasource();
      }
    });
  }

  render() {
    var self = this;
    var resultsList;

    var trackResultsList = (function() {
      return (
        <TrackSearchResultsList
          trackResults={self.state.trackResults}
          searchString={self.state.searchString}
          numTracks={self.state.numTracks}
          pageNum={self.state.pageNum}
          perPage={self.state.perPage}
          hasMoreTracks={self.state.hasMoreTracks}
        />
      );
    })();

    var peopleResultsList = (function() {
      return (
        <PeopleSearchResultsList
          peopleResults={self.state.peopleResults}
          searchString={self.state.searchString}
          numPeople={self.state.numPeople}
          pageNum={self.state.pageNum}
          perPage={self.state.perPage}
          hasMorePeople={self.state.hasMorePeople}
        />
      );
    })();

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
        <SearchHeader searchString={this.state.searchString} />
        <SearchFilter onChangeFilter={this.changeSelectedFilter} filterSelected={selectedFilter} />
        {resultsList}
      </div>
    );
  }
}

export default SearchResultsPage;
