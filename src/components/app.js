/*eslint-disable strict */ // Disabling strict on eslint. Cant run strict mode becuase we require global variables, jquery

/*
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');
var Footer = require('./common/footer');
*/
import React, {PropTypes} from 'react';
import Header from './common/header';
import Footer from './common/footer';
window.$ = window.jQuery = require('jquery');

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
  );
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;


/*
var App = React.createClass({
   render: function() {
       return (
           <div>
             <Header />
             <RouteHandler />
             <Footer />
           </div>
       );
   }
});

module.exports = App;
*/