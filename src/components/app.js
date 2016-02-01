/*eslint-disable strict */ // Disabling strict on eslint. We cant run strict mode becuase we require global variables, jquery

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

var App = React.createClass({
   render: function() {
       return (
           <div>
               <div className="container-fluid">
                  <RouteHandler />
               </div>
           </div>
       );
   }
});

module.exports = App;
