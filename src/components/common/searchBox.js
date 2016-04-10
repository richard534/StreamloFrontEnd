"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var searchBarStyle = {
  paddingTop: "3px"
};

var searchBoxStyle = {
  width: "400px"
};


var SearchBox = React.createClass({

    propTypes: {
        searchString: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired

    },

    handleKeyDown: function(e) {
        if (e.key === 'Enter') {
            React.findDOMNode(this.refs.search).click();
        }
    },

    render: function() {
        return (

            <form className="navbar-form" role="search" style={searchBarStyle} onSubmit={this.props.onSearchSubmit}>
              <div className="input-group input-group-sm">
                <input type="text"
                    className="form-control"
                    value={this.props.searchString}
                    placeholder="Search..."
                    onChange={this.props.onChange}
                    style={searchBoxStyle}
                    onKeyDown={this.handleKeyDown}/>

                <span className="input-group-btn">
                    <Link to="searchResults" query={{q: this.props.searchString}} ref="search">
                      <button className="btn btn-default btn-sm" type="button">
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </Link>
                </span>
              </div>
            </form>

        );
  }
});

module.exports = SearchBox;
