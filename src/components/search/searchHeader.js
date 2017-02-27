var React = require('react');

var searchResultsHeaderStyle = {
  borderBottom: "solid 1px #f2f2f2",
  paddingBottom: "5px"
};

var SearchHeader = React.createClass({

  render: function() {
    return (
        <div className="container">
            <h3 style={searchResultsHeaderStyle} >Search results for "{this.props.searchString}"</h3>
        </div>
    );
  }
});

module.exports = SearchHeader;
