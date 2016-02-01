"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
   render: function() {
       return (
       <div className="jumbotron">
            <h1>Streamlo</h1>
            <p>Discover your local musicians</p>
       </div>
       );
   }
});

module.exports = Home;
