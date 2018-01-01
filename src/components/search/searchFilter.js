import React from "react";

class SearchFilter extends React.Component {
  render() {
    var filterSelected = this.props.filterSelected;

    var trackSelected;
    var peopleSelected;
    if (filterSelected == "tracks") {
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
          <li
            role="presentation"
            name="tracks"
            className={trackSelected ? "active" : ""}
            onClick={this.props.onChangeFilter}
          >
            <a href="">
              <span className="glyphicon glyphicon-music" /> Tracks
            </a>
          </li>
          <li
            role="presentation"
            name="people"
            className={peopleSelected ? "active" : ""}
            onClick={this.props.onChangeFilter}
          >
            <a href="">
              <span className="glyphicon glyphicon-user" /> People
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SearchFilter;
