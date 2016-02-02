"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var navbarBrandStyle = {
  paddingTop: "3px"
};

var Header = React.createClass({
  render: function() {
    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">

          <div className="navbar-header">
            <a href="#" className="btn btn-success btn-sm navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="glyphicon glyphicon-menu-hamburger"></span>
            </a>
            <Link to="app" className="navbar-brand" style={navbarBrandStyle}>
              <img src="images/StreamloWithAlpha.png" className="img-responsive pull-left" width="125"/>
            </Link>
          </div>

          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-left">
              <li className="nav">
                <Link to="app">Home</Link>
              </li>
              <li>
                <form className="navbar-form" role="search">
                  <div className="input-group input-group-sm">
                    <input type="text" className="form-control" placeholder="Search by tracks or artists..."/>
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">
                        <span className="glyphicon glyphicon-search"></span>
                      </button>
                    </span>
                  </div>
                </form>
              </li>
              <li>


              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav">
                <Link to="app">Upload</Link>
              </li>
              <li className="nav">
                <Link to="app">Login</Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    );
  }
});

module.exports = Header;
