"use strict";

var React = require('react');


var SearchCity = React.createClass({
   render: function() {
       return (
         <div className="container-full">


            <div className="jumbotron">
                 <h1 className="text-center">Streamlo</h1>
                 <p className="text-center">Discover your local musicians</p>


                   <form className="navbar-form text-center" role="search">
                     <div className="input-group input-group-sm">
                       <input type="text" className="form-control" placeholder="Enter name of city..."/>
                       <span className="input-group-btn">
                         <button className="btn btn-default" type="button">
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
