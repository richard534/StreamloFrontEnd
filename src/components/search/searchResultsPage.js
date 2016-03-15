"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SearchHeader = require('./SearchHeader');

var SearchResultsPage = React.createClass({

  render: function() {
    return (

      <SearchHeader />

    );
  }
});

module.exports = SearchResultsPage;
