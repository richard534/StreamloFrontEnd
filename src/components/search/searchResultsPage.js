"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('lodash');
var SearchHeader = require('./searchHeader');
var SearchFilter = require('./searchFilter');
var TrackSearchResultsList = require('./trackSearchResultsList');
var PeopleSearchResultsList = require('./peopleSearchResultsList');

/*
this.props.params.search // Gives params
this.props.query.searchString // Gives query string
this.props.path // Gives full path in url
*/


var SearchResultsPage = React.createClass({

    getInitialState: function() {
        return {
            searchString: "",
            trackResults: [],
            peopleResults: [],
            isTrackFilterSelected: true,
            numTracks: 0,
            numPeople: 0,
            trackPageNum: 0,
            peoplePageNum: 0
        };
    },

    componentWillMount: function() {
        this.setState({ searchString: this.props.query.q });
    },

    componentDidMount: function() {
        this.tracksDataSource();
        this.numTracksDataSource();

        this.peopleDatasource();
        this.numPeopleDatasource();
    },

    // Lifecycle method run when component revieves new props from searchbox
    componentWillReceiveProps: function(nextProps) {
        this.setState({ searchString: nextProps.query.q });

        this.tracksDataSource(nextProps);
        this.numTracksDataSource(nextProps);

        this.peopleDatasource(nextProps);
        this.numPeopleDatasource(nextProps);
    },

    // AJAX helper method thats sets state to returned ajax query
    tracksDataSource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks?q=' + props.query.q
        }).done(function(result){
          this.setState({ trackResults: result });
        }.bind(this));
    },

    // AJAX helper method thats sets state to returned ajax query
    // TODO remove if backend not working
    numTracksDataSource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/getNumOfTracks?q=' + props.query.q
        }).done(function(result){
          this.setState({ numTracks: result });
        }.bind(this));
    },

    peopleDatasource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users?q=' + props.query.q
        }).done(function(result){
          this.setState({ peopleResults: result });
        }.bind(this));
    },

    // TODO remove if backend not working
    numPeopleDatasource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/users/getNumOfPeople?q=' + props.query.q
        }).done(function(result){
          this.setState({ numPeople: result });
        }.bind(this));
    },

    changeSelectedFilter: function(event) {
        event.preventDefault();
        this.setState({ isTrackFilterSelected: !this.state.isTrackFilterSelected });
    },

    // Track Pagination handlers
    handlePreviousPagerTracks: function(e) {
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
              console.log(textStatus + ': ' + errorThrown);
          }
        });
    },

    handleNextPagerTracks: function(e) {
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
              console.log(textStatus + ': ' + errorThrown);
          }
        });
    },

    // People Pagination handlers
    handlePreviousPagerPeople: function(e) {
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
              console.log(textStatus + ': ' + errorThrown);
          }
        });
    },

    handleNextPagerPeople: function(e) {
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
              console.log(textStatus + ': ' + errorThrown);
          }
        });
    },



  render: function() {
      var self = this;

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

      var resultsList;
      if(self.state.isTrackFilterSelected === true){
           resultsList = trackResultsList;
      } else {
          resultsList = peopleResultsList;
      }


    return (
        <div className="container">
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter onChangeFilter={this.changeSelectedFilter} isTrackFilterSelected={this.state.isTrackFilterSelected}/>
            {resultsList}
        </div>
    );
  }
});

module.exports = SearchResultsPage;
