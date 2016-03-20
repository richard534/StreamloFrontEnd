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
            tracksReturned: false
        };
    },

    componentWillMount: function() {
            this.setState({ searchString: this.props.query.q });
    },

    componentDidMount: function() {
        $.ajax({
            url: 'http://localhost:3001/tracks/search?q=' + this.state.searchString,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({trackResults: data});
                if(this.state.trackResults.length > 0){
                    this.setState({tracksReturned: true});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('http://localhost:3001/tracks/', status, err.toString());
            }
        });
    },

    // Lifecycle method run when component revieves new props from searchbox
    componentWillReceiveProps: function(nextProps) {
        this.setState({ searchString: nextProps.query.q });
    },

    componentDidUpdate: function() {
        $.ajax({
            url: 'http://localhost:3001/tracks/search?q=' + this.state.searchString,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({trackResults: data});
                if(this.state.trackResults.length > 0){
                    this.setState({tracksReturned: true});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('http://localhost:3001/tracks/', status, err.toString());
            }
        });
    },

  render: function() {

    return (
        <div className="container">
            <SearchHeader searchString={this.state.searchString}/>
            <SearchFilter />
            <SearchResultsList trackResults={this.state.trackResults} tracksReturned={this.state.tracksReturned}/>
        </div>
    );
  }
});

module.exports = SearchResultsPage;
