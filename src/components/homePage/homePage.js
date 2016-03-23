"use strict";

var React = require('react');
var SearchCity = require('./searchCity');
var Chart = require('./chart');

var Home = React.createClass({
  // TODO: Populate table with track information
  getInitialState: function() {
      return {
          citySearchString: "",
          trackResults: []
      };
  },

  // TODO: Add call to tracklist API and set state to tracklist
  componentDidMount: function(){
    if(this.isMounted()){
        this.setState({ });
      }
  },

   render: function() {
       return (
         <div>
           <SearchCity />
           <Chart />
         </div>
       );
     }
});

module.exports = Home;
