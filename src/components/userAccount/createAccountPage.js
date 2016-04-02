"use strict";

var React = require('react');
var CreateAccountPanel = require('./userAccountPanels/createAccountPanel');

var createAccountDiv = {
    marginTop: "30px"
};

var CreateAccountPage = React.createClass({

   render: function() {
       return (
           <div className="container">
               <div className="col-md-8 col-md-offset-2" style={createAccountDiv}>
                   <h1>Create An Account</h1>
                   <br/>
               </div>
               <CreateAccountPanel />
            </div>
       );
     }
});

module.exports = CreateAccountPage;
