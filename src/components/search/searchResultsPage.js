"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
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
            numPeople: 0
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



  render: function() {
      var self = this;

      var trackResultsList = function() {
          return (
              <TrackSearchResultsList trackResults={self.state.trackResults}
                  searchString={self.state.searchString}
                  numTracks={self.state.numTracks}/>
          );
      }();

      var peopleResultsList = function() {
          return (
              <PeopleSearchResultsList peopleResults={self.state.peopleResults}
                  searchString={self.state.searchString}
                  numPeople={self.state.numPeople}/>
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
