"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div className="col-md-8">
        <h1>Page not found</h1>
        <p>Whoops! nothing found here!</p>
        <p><Link to='app'>Back to home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
