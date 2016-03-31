"use strict";

var React = require('react');

// TODO get search result filters working
var SearchFilter = React.createClass({
    getDefaultProps: function() {
        return {
            isTrackFilterSelected: true
        };
    },

  render: function() {
      var isTrackSelected = this.props.isTrackFilterSelected;

      var trackSelected;
      var peopleSelected;
      if(isTrackSelected) {
          trackSelected = true;
          peopleSelected = false;
      } else {
          trackSelected = false;
          peopleSelected = true;
      }

    return (
            <div className="col-md-2">
                <h4>Filters</h4>
                    <ul className="nav nav-pills nav-stacked">
                        <li role="presentation" className={trackSelected ? "active" : ""}><a href="#" onClick={this.props.onChangeFilter}><span className="glyphicon glyphicon-music"></span> Tracks</a></li>
                        <li role="presentation" className={peopleSelected ? "active" : ""}><a href="#" onClick={this.props.onChangeFilter}><span className="glyphicon glyphicon-user"></span> People</a></li>
                    </ul>
            </div>
    );
  }
});

module.exports = SearchFilter;
