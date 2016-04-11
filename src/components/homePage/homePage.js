"use strict";

var React = require('react');
var toastr = require('toastr');
var SearchCity = require('./searchCity');
var Chart = require('./chart');

var Home = React.createClass({
    // TODO: Populate table with track information
    getInitialState: function() {
      return {
          citySearchString: "Belfast",
          trackResults: [],
          resultsCityHeader: "Belfast"
      };
    },

    // TODO: Add call to tracklist API and set state to tracklist
    componentDidMount: function() {
    if(this.isMounted()){
        this.setState({ });
      }
    },

    setCitySearchStringState: function(event) { // Handles user input, refreshes DOM every key press
        var value = event.target.value;
        this.state.citySearchString = value;
        return this.setState({searchString: this.state.searchString});
    },

    onSearchSubmit: function(e) {
        e.preventDefault();
        var self = this;
        if(self.state.citySearchString.length > 0){
            return $.ajax({
              type: "get",
              url: 'http://localhost:3001/tracks/' + self.state.citySearchString + '/chart',
              dataType: 'json',
              success: function(result) {
                  if(result.length > 0) {
                      self.setState({ trackResults: result });
                      self.setState({ resultsCityHeader: self.state.citySearchString});
                  } else {
                      toastr.error('Enter Valid City (Belfast or Derry)');
                  }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus + ": " + errorThrown);
              }
            });
        }
    },


   render: function() {
       return (
         <div>
           <SearchCity onChange={this.setCitySearchStringState}
               searchString={this.state.citySearchString}
               onSearchSubmit={this.onSearchSubmit} />
           <Chart trackResults={this.state.trackResults}
               resultsHeader={this.state.resultsCityHeader} />
         </div>
       );
     }
});

module.exports = Home;
