import React from "react";
import { Link } from "react-router";
import SearchBox from "./searchBox";
var streamloLogo = require("images/StreamloWithAlpha.png");

var navbarBrandStyle = {
  paddingTop: "3px"
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ""
    };

    this.setSearchStringState = this.setSearchStringState.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  setSearchStringState(e) {
    // Handles user input, refreshes DOM every key press
    const target = e.target;
    this.setState({ searchString: target.value });
  }

  onSearchSubmit(e) {
    e.preventDefault();
  }

  logout() {
    this.props.auth.logout();
    this.context.router.push("/signin");
  }

  render() {
    let loggedIn = this.props.auth.loggedIn();
    let leftNav;

    if (loggedIn) {
      let userProfile = this.props.auth.getProfile();
      leftNav = (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="nav">
            <Link
              to={{
                pathname: "/user/" + userProfile.userURL,
                query: {
                  page: 1,
                  per_page: 5
                }
              }}
            >
              Signed in as {userProfile.displayName}
            </Link>
          </li>
          <li className="nav">
            <button onClick={this.logout} className="btn btn-default navbar-btn">
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      leftNav = (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav">
            <Link to="/upload">Upload</Link>
          </li>
          <li className="nav">
            <Link to="signin">Sign In</Link>
          </li>
        </ul>
      );
    }

    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" style={navbarBrandStyle}>
              <img src={streamloLogo} className="img-responsive pull-left" width="125" />
            </Link>
          </div>

          <ul className="nav navbar-nav navbar-left col-md-5 pull-left">
            <li className="nav">
              <Link to="/">Home</Link>
            </li>
            <li>
              <SearchBox
                searchString={this.state.searchString}
                onChange={this.setSearchStringState}
                onSearchSubmit={this.onSearchSubmit}
              />
            </li>
          </ul>
          {leftNav}
        </nav>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;
