import React from 'react';
import {Link} from 'react-router';
import SearchHeader from './searchHeader';
import SearchFilter from './searchFilter';
import TrackSearchResultsList from './trackSearchResultsList';
import PeopleSearchResultsList from './peopleSearchResultsList';
import update from 'immutability-helper';
import _ from 'lodash';

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
            //isTrackFilterSelected: true,
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
        this.numTracksDataSource = this.numTracksDataSource.bind(this); 
        this.peopleDatasource = this.peopleDatasource.bind(this); 
        this.numPeopleDatasource = this.numPeopleDatasource.bind(this); 
        this.changeSelectedFilter = this.changeSelectedFilter.bind(this); 
        this.handlePreviousPagerTracks =this.handlePreviousPagerTracks.bind(this); 
        this.handleNextPagerTracks = this.handleNextPagerTracks.bind(this); 
    }

    componentWillMount() {
        this.setState({ searchString: this.props.location.query.q });
    }
    
    componentDidMount() {
        this.tracksDataSource();
        this.numTracksDataSource();

        this.peopleDatasource();
        this.numPeopleDatasource();
    }

    // Lifecycle method run when component revieves new props from searchbox
    componentWillReceiveProps(nextProps) {
        this.setState({ searchString: nextProps.location.query.q });

        this.tracksDataSource(nextProps);
        this.numTracksDataSource(nextProps);

        this.peopleDatasource(nextProps);
        this.numPeopleDatasource(nextProps);
    }

    // AJAX helper method thats sets state to returned ajax query
    tracksDataSource(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks?q=' + props.location.query.q
        }).done(function(result){
          this.setState({ trackResults: result });
        }.bind(this));
    }

    // AJAX helper method thats sets state to returned ajax query
    numTracksDataSource(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/getNumOfTracks?q=' + props.location.query.q
        }).done(function(result){
          this.setState({ numTracks: result });
        }.bind(this));
    }

    peopleDatasource(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users?q=' + props.location.query.q
        }).done(function(result){
          this.setState({ peopleResults: result });
        }.bind(this));
    }

    numPeopleDatasource(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/getNumOfPeople?q=' + props.location.query.q
        }).done(function(result){
          this.setState({ numPeople: result });
        }.bind(this));
    }

    changeSelectedFilter(e) {
        e.preventDefault();
        const name = e.target.parentNode.getAttribute('name');
    
        
        var newState = update(this.state, {
            selectedFilter: {
                tracks: { $set: false },
                people: { $set: false },
                [name]: { $set: true }
            }
        });
        
        this.setState(newState);
    }

    // Track Pagination handlers
    handlePreviousPagerTracks(e) {
        var self = this;
        e.preventDefault();
        if(self.state.trackPageNum === 0){ // If first page do nothing
            return;
        }
        var previousPage = this.state.trackPageNum - 1;


        $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks?q=' + self.state.searchString + "&page=" + previousPage,
          success: function(results) {
              self.setState({trackResults: results});
              self.setState({trackPageNum: previousPage});
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
          }
        });
    }

    handleNextPagerTracks(e) {
        var self = this;
        e.preventDefault();
        var nextPage = this.state.trackPageNum + 1;

        $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks?q=' + self.state.searchString + "&page=" + nextPage,
          success: function(results) {
              if(_.isEmpty(results)){ // If results object is empty then there are no more pages
                  return;
              }
              self.setState({trackResults: results});
              self.setState({trackPageNum: nextPage});
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
          }
        });
    }

    // People Pagination handlers
    handlePreviousPagerPeople(e) {
        var self = this;
        e.preventDefault();
        if(self.state.peoplePageNum === 0){ // If first page do nothing
            return;
        }
        var previousPage = this.state.peoplePageNum - 1;

        $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users?q=' + self.state.searchString + "&page=" + previousPage,
          success: function(results) {
              self.setState({peopleResults: results});
              self.setState({peoplePageNum: previousPage});
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
          }
        });
    }

    handleNextPagerPeople(e) {
        var self = this;
        e.preventDefault();
        var nextPage = this.state.peoplePageNum + 1;

        $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users?q=' + self.state.searchString + "&page=" + nextPage,
          success: function(results) {
              if(_.isEmpty(results)) { // If results object is empty then there are no more pages
                  return;
              }
              self.setState({peopleResults: results});
              self.setState({peoplePageNum: nextPage});
          },
          error: function(jqXHR, textStatus, errorThrown) {
              // console.log(textStatus + ': ' + errorThrown);
          }
        });
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
          if(self.state.selectedFilter.tracks == true) {
              return "tracks";
          } else if (self.state.selectedFilter.people == true) {
              return "people";
          }
      }
      
      let selectedFiler = determineSelectedFilter();
      
      switch(selectedFiler) {
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
            <SearchFilter onChangeFilter={this.changeSelectedFilter} filterSelected={selectedFiler}/>
            {resultsList}
        </div>
    );
  }
}

export default SearchResultsPage;
