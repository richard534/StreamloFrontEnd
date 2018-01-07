import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

var searchBarStyle = {
  paddingTop: "3px"
};

var searchBoxStyle = {
  width: "400px"
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form
        className="navbar-form"
        role="search"
        style={searchBarStyle}
        onSubmit={this.props.onSearchSubmit}
        onChange={this.props.onChange}
      >
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            value={this.props.searchString}
            placeholder="Search..."
            style={searchBoxStyle}
          />

          <span className="input-group-btn">
            <Link to={{ pathname: "/search", query: { q: this.props.searchString, page: 1, per_page: 5 } }}>
              <button className="btn btn-default btn-sm" type="submit">
                <span className="glyphicon glyphicon-search" />
              </button>
            </Link>
          </span>
        </div>
      </form>
    );
  }
}

SearchBox.propTypes = {
  searchString: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBox;
