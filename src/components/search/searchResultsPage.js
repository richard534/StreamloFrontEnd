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
            trackResults: []
        };
    },

    componentWillMount: function() {
        this.setState({ searchString: this.props.query.q });
    },

    componentDidMount: function() {
        this.dataSource();
    },

    // Lifecycle method run when component revieves new props from searchbox
    componentWillReceiveProps: function(nextProps) {
        this.setState({ searchString: nextProps.query.q });
        this.dataSource(nextProps);
    },

    // AJAX helper method thats sets state to returned ajax query
    dataSource: function(props){
        props = props || this.props;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/search?q=' + props.query.q
        }).done(function(result){
          this.setState({ trackResults: result });
        }.bind(this));
    },


  render: function() {

    return (
        <div className="container">
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter />
            <SearchResultsList trackResults={this.state.trackResults} searchString={this.state.searchString}/>
        </div>
    );
  }
});

module.exports = SearchResultsPage;
