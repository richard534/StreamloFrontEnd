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
            searchString: ""
        };
    },

    componentDidMount: function() {
        if(this.isMounted()) {
            this.setState({ searchString: this.props.query.q });
        }
    },

  render: function() {

    return (
        <div>
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter />
            <SearchResultsList searchString={this.state.searchString} />
        </div>
    );
  }
});

module.exports = SearchResultsPage;
