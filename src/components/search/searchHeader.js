"use strict";

var React = require('react');

var SearchHeader = React.createClass({

  render: function() {
    return (
        <div className="container">
            <h3>Search results for {this.props.searchString}</h3>
        </div>
    );
  }
});

module.exports = SearchHeader;
