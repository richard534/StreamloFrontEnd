import React from 'react';

// TODO stop search results filters from alternating on click
class SearchFilter extends React.Component {
    
  render() {
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
}

SearchFilter.getDefaultProps = {
    isTrackFilterSelected: true
}

export default SearchFilter;
