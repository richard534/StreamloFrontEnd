import React from "react";
import { Link } from "react-router";
import SearchBox from "./searchBox";
import MiscApi from "api/miscApi";

var streamloLogo = MiscApi.getStreamloLogoImgUri();

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
    let rightNav;

    if (loggedIn) {
      let userProfile = this.props.auth.getProfile();
      rightNav = (
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
      rightNav = (
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
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand" style={navbarBrandStyle}>
            <img src={streamloLogo} className="img-responsive pull-left" width="125" />
          </Link>
        </div>

        <ul className="nav navbar-nav navbar-left">
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
        {rightNav}
      </nav>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Header;
