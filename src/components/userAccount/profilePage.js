"use strict";

var React = require('react');

// TODO: Create user profile page
var ProfilePage = React.createClass({
  getInitialState: function() {
    return {
      user: { id: '', username: ''}
    };
  },

   render: function() {
       return (
         <div className="container-full">
            <div className="jumbotron text-center">
                 <h1 className="text-center">ProfileName</h1>
            </div>
          </div>
       );
     }
});

module.exports = ProfilePage;
