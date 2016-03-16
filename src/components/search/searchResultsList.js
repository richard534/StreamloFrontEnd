"use strict";

var React = require('react');

var SearchResultsList = React.createClass({

    getInitialState: function() {
      return {
        trackResults: ''
      };
    },

    componentDidMount: function() {
        $.ajax({
             url: 'http://localhost:3001/tracks/TestTitle',
             dataType: 'json',
             cache: false,
             success: function(data) {
               this.setState({trackResults: data});
            }.bind(this),
             error: function(xhr, status, err) {
               console.error('http://localhost:3001/tracks/', status, err.toString());
             }.bind(this)
            });
    },

  render: function() {
    return (
        <div className="container">
            <div className="col-md-8">
                <h1>Test</h1>
                <ul>
                    <li>{this.state.trackResults}</li>
                </ul>
            </div>
        </div>


    );
  }
});

module.exports = SearchResultsList;
