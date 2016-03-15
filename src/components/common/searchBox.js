"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var searchBarStyle = {
  paddingTop: "3px"
};

var searchBoxStyle = {
  width: "400px"
};


var SearchBox = React.createClass({

  render: function() {
    return (

        <form className="navbar-form" role="search" style={searchBarStyle}>
          <div className="input-group input-group-sm">
            <input type="text" className="form-control" name="searchString" value="" placeholder="Search..." style={searchBoxStyle}/>
            <span className="input-group-btn">
                <Link to="searchResults">
                  <button className="btn btn-default btn-sm" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                </button>
              </Link>
            </span>
          </div>
        </form>

    );
  }
});

module.exports = SearchBox;
