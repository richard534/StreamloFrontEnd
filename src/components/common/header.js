import React from 'react';
import {Link} from 'react-router';
import SearchBox from './searchBox';

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
                <Link to="/" className="navbar-brand" style={navbarBrandStyle}>
                  <img src="images/StreamloWithAlpha.png" className="img-responsive pull-left" width="125"/>
                </Link>
              </div>

                <ul className="nav navbar-nav navbar-left col-md-8">
                  <li className="nav">
                    <Link to="/">Home</Link>
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
