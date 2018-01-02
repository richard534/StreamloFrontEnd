import React from "react";

var searchResultsHeaderStyle = {
  borderBottom: "solid 1px #f2f2f2",
  paddingBottom: "5px"
};

class SearchHeader extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 style={searchResultsHeaderStyle}>Search results for "{this.props.searchString}"</h3>
      </div>
    );
  }
}

export default SearchHeader;
