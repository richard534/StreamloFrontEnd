"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var SearchCity = React.createClass({
   render: function() {
       return (
         <div className="container-full">
            <div className="jumbotron text-center">
                 <h1>Streamlo</h1>
                 <p>Discover your local musicians</p>

                   <form className="navbar-form" role="search">
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
