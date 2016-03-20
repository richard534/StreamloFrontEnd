"use strict";

var React = require('react');

// TODO get search result filters working
var SearchFilter = React.createClass({

  render: function() {
    return (
            <div className="col-md-2">
                <h4>Filters</h4>
                    <ul className="nav nav-pills nav-stacked">
                        <li role="presentation" className="active"><a href="">Tracks</a></li>
                        <li role="presentation"><a href="">People</a></li>
                    </ul>
            </div>
    );
  }
});

module.exports = SearchFilter;
