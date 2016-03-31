"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SearchHeader = require('./searchHeader');
var SearchFilter = require('./searchFilter');
var SearchResultsList = require('./SearchResultsList');

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
            isTrackFilterSelected: true,
            numTracks: ""
        };
    },

    componentWillMount: function() {
        this.setState({ searchString: this.props.query.q });
    },

    componentDidMount: function() {
        this.dataSource();
        this.numTracksdataSource();
    },

    // Lifecycle method run when component revieves new props from searchbox
    componentWillReceiveProps: function(nextProps) {
        this.setState({ searchString: nextProps.query.q });
        this.dataSource(nextProps);
        this.numTracksdataSource(nextProps);
    },

    // AJAX helper method thats sets state to returned ajax query
    dataSource: function(props){
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
    numTracksdataSource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/getNumOfTracks?q=' + props.query.q
        }).done(function(result){
          this.setState({ numTracks: result });
        }.bind(this));
    },

    changeSelectedFilter: function(event) { // Handles user input, refreshes DOM every key press
        event.preventDefault();
        this.setState({ isTrackFilterSelected: !this.state.isTrackFilterSelected });
    },


  render: function() {

    return (
        <div className="container">
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter onChangeFilter={this.changeSelectedFilter} isTrackFilterSelected={this.state.isTrackFilterSelected}/>
            <SearchResultsList trackResults={this.state.trackResults}
                searchString={this.state.searchString}
                numTracks={this.state.numTracks}/>
        </div>
    );
  }
});

module.exports = SearchResultsPage;
