import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

var searchBarStyle = {
  paddingTop: "3px"
};

var searchBoxStyle = {
  width: "400px"
};

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            ReactDOM.findDOMNode(this.refs.search).click();
        }
    }

    render() {
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
}

SearchBox.propTypes = {
    searchString: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default SearchBox;