"use strict";

var React = require('react');
var Router = require('react-router');
var validate = require('validate.js');
var _ = require('lodash');
var toastr = require('toastr');

var profileURLText = {
    paddingTop: "6px",
    paddingRight: "0px"
};

var profURLLabel = {
    paddingLeft: "0px"
};

var profileURLInput = {
    padding: "0px"
};

var constraints = {
    email: {
        presence: true,
        email: true
    },
    confEmail: {
        presence: true,
        equality: "email"
    },
    pass: {
        presence: true,
        length: { minimum: 5 }
    },
    confPass: {
        presence: true,
        equality: "pass"
    },
    dispName: {
        presence: true,
        length: { minimum: 5 }
    },
    city: {
        presence: true
    },
    profileURL: {
        presence: true
    }
};

var CreateAccountPanel = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            data: {
                email: "",
                confEmail: "",
                pass: "",
                confPass: "",
                dispName: "",
                city: "",
                profileURL: ""
            },
            errors: {
                email: "Enter Account Details"
            }
        };
    },

    changeState: function () {
        this.setState({
            data: {
                email: this.refs.email.getDOMNode().value,
                confEmail: this.refs.confEmail.getDOMNode().value,
                pass: this.refs.password.getDOMNode().value,
                confPass: this.refs.confPassword.getDOMNode().value,
                dispName: this.refs.dispName.getDOMNode().value,
                city: this.refs.city.getDOMNode().value,
                profileURL: this.refs.profURL.getDOMNode().value
            }
        }, this.validate);
    },

    validate: function () {
        var validationErrors = validate(this.state.data, constraints);

            if(validationErrors){
                this.setState({errors: validationErrors});
            } else {
                this.setState({errors: {}});
            }

    },

    handleChange: function(e) {
        this.changeState();
    },

    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        var data = {
            email: this.state.data.email,
            password: this.state.data.pass,
            userURL: this.state.data.profileURL,
            displayName: this.state.data.dispName,
            city: this.state.data.city
        };
        return $.ajax({
          type: "post",
          data: data,
          contentType: 'application/x-www-form-urlencoded',
          url: 'http://localhost:3001/users/',
          dataType: 'text',
          success: function(results) {
              toastr.success('Account Created');
              self.transitionTo('signIn');
          },
          error: function(jqXHR, textStatus, errorThrown) {
              toastr.error('Error creating account');
          }
        });
    },


   render: function() {
       var self = this;
       var errorsList;
       var createAccountButton;

       var populateErrorsList = function() {
           return (
               <div className="div-md-12 alert alert-danger" id="dangerDiv">
                   <div>{self.state.errors.email}</div>
                   <div>{self.state.errors.confEmail}</div>
                   <div>{self.state.errors.pass}</div>
                   <div>{self.state.errors.confPass}</div>
                   <div>{self.state.errors.dispName}</div>
                   <div>{self.state.errors.city}</div>
                   <div>{self.state.errors.profileURL}</div>
               </div>
           );
       };

       var disabledCreateAccountButton = function() {
           return (
               <button type="submit" className="btn btn-primary btn-block disabled">Create Account</button>
           );
       };

       var enabledCreateAccountButton = function() {
           return (
               <button type="submit" className="btn btn-primary btn-block">Create Account</button>
           );
       };

        if(!_.isEmpty(self.state.errors)) {
            errorsList = populateErrorsList();
            createAccountButton = disabledCreateAccountButton();
        } else {
            createAccountButton = enabledCreateAccountButton();
        }


       return (
               <div className="col-md-8 col-md-offset-2">
                   <div className="panel panel-default">
                        <div className="panel-body">
                        <h4>Sign In Details</h4>
                        <br/>
                        {errorsList}
                        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group" error={this.state.errors.email}>
                                        <label>Email Address</label>
                                        <input className="form-control" type="email" ref="email" value={this.state.email} placeholder="Enter Email Address..." />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Confirm Email Address</label>
                                        <input className="form-control" type="email" ref="confEmail" value={this.state.confEmail} placeholder="Confrim Email Address..." />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="form-control" type="password" ref="password" value={this.state.pass} placeholder="Enter Password..." />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input className="form-control" type="password" ref="confPassword" value={this.state.confPass} placeholder="Confrim Password..." />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h4>Profile Details</h4>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Display Name</label>
                                        <input className="form-control" ref="dispName" value={this.state.dispName} placeholder="Enter First Name..." />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <select className="form-control" ref="city" >
                                            <option>Belfast</option>
                                            <option>Derry</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="col-md-12" style={profURLLabel}>
                                            <label>Profile URL</label>
                                        </div>
                                        <div className="col-md-2" style={profileURLText}>
                                            <p className="text-muted">streamlo.com/</p>
                                        </div>
                                        <div className="col-md-10" style={profileURLInput}>
                                            <input className="form-control" ref="profURL" value={this.state.profURL} placeholder="Enter Profile URL..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                            {createAccountButton}
                        </form>
                       </div>
                   </div>
               </div>
       );
     }
});

module.exports = CreateAccountPanel;
