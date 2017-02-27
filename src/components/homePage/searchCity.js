var React = require('react');

// TODO possibly add html5 geolocation and google maps get administrative_area_level_1 to get city
var SearchCity = React.createClass({
   render: function() {
       return (
         <div className="container-full">
            <div className="jumbotron text-center" id="homeJumbotron">
                 <h1>Streamlo</h1>
                 <p>Discover your local musicians</p>

                   <form className="navbar-form" role="search" onSubmit={this.props.onSearchSubmit}>
                     <div className="input-group input-group-sm">
                       <input type="text"
                            className="form-control"
                            value={this.props.searchString}
                            onChange={this.props.onChange}
                            placeholder="Enter name of city..." />
                       <span className="input-group-btn">
                         <button type="submit" className="btn btn-default">
                           <span className="glyphicon glyphicon-search"></span>
                         </button>
                       </span>
                     </div>
                   </form>
            </div>
          </div>
       );
     }
});

module.exports = SearchCity;
