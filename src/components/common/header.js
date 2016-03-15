"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SearchBox = require('./searchbox');

var navbarBrandStyle = {
  paddingTop: "3px"
};

var Header = React.createClass({
  render: function() {
    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">

          <div className="navbar-header">
            <Link to="app" className="navbar-brand" style={navbarBrandStyle}>
              <img src="images/StreamloWithAlpha.png" className="img-responsive pull-left" width="125"/>
            </Link>
          </div>

            <ul className="nav navbar-nav navbar-left col-md-8">
              <li className="nav">
                <Link to="app">Home</Link>
              </li>
              <li>
                <SearchBox />
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav">
                <Link to="upload">Upload</Link>
              </li>
              <li className="nav">
                <Link to="signIn">Sign In</Link>
              </li>
            </ul>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
