/*
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SearchBox = require('./searchbox');
*/

import React from 'react';
import { Link, IndexLink } from 'react-router';
import SearchBox from './searchBox';

var navbarBrandStyle = {
  paddingTop: "3px"
};

//var Header = React.createClass({
class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchString: ""
        };
    }
    
    setSearchStringState(event) { // Handles user input, refreshes DOM every key press
      var value = event.target.value;
      this.state.searchString = value;
      return this.setState({searchString: this.state.searchString});
    }

    onSearchSubmit(e) {
        e.preventDefault();
    }

    render() {
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
                    <SearchBox searchString={this.state.searchString}
                        onChange={this.setSearchStringState}
                        onSearchSubmit={this.onSearchSubmit} />
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
}

export default Header;
//module.exports = Header;
