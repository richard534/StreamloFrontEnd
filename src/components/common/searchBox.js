import React, { PropTypes } from "react";
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
    let searchString = this.props.searchString;

    let searchButton = (
      <Link to={{ pathname: "/search", query: { q: searchString, page: 1, per_page: 5, filter: "tracks" } }}>
        <button className="btn btn-default btn-sm" type="submit">
          <span className="glyphicon glyphicon-search" />
        </button>
      </Link>
    );

    if (!searchString) {
      searchButton = (
        <button className="btn btn-default btn-sm" type="submit">
          <span className="glyphicon glyphicon-search" />
        </button>
      );
    }

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
            value={searchString}
            placeholder="Search..."
            style={searchBoxStyle}
          />

          <span className="input-group-btn">{searchButton}</span>
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
