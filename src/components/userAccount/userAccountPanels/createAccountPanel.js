import React, {PropTypes} from 'react';
import { Link, browserHistory } from 'react-router';
import validate from 'validate.js';
import _ from 'lodash';
import toastr from 'toastr';
import update from 'immutability-helper';
import AuthService from '../../../utils/AuthService';

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
    password: {
        presence: true,
        length: { minimum: 5 }
    },
    confpassword: {
        presence: true,
        equality: "password"
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

class CreateAccountPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: {
                email: "",
                confEmail: "",
                password: "",
                confpassword: "",
                dispName: "",
                city: "Belfast",
                profileURL: ""
            },
            errors: {
                email: "Enter Account Details"
            }
        }
        
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        const target = e.target;
        const name = target.name;
        
        var newState = update(this.state, {
            data: {
                [name]: {
                    $set: target.value
                }
            }
        });
        this.setState(newState, this.validate);
    }
    
    validate() {
        var validationErrors = validate(this.state.data, constraints);
        if (validationErrors) {
            this.setState({
                errors: validationErrors
            });
        } else {
            this.setState({
                errors: {}
            });
        }
    }

    /*
    // TODO fix transitionTo function call (mixins not supported by react es6 Classes)
    handleSubmit(e) {
        var self = this;
        e.preventDefault();
        var data = {
            email: this.state.data.email,
            password: this.state.data.password,
            userURL: this.state.data.profileURL,
            displayName: this.state.data.dispName,
            city: this.state.data.city
        };
        return $.ajax({
          type: "post",
          data: data, // Data to be sent to the server
          contentType: 'application/x-www-form-urlencoded',
          url: 'http://localhost:3001/users/',
          dataType: 'text', // The type of data that you're expecting back from the server
          success: function(results) {
              toastr.success('Account Created');
              browserHistory.push('signin/');
              //self.transitionTo('signIn');
          },
          error: function(jqXHR, textStatus, errorThrown) {
              toastr.error('Error creating account');
          }
        });
    }
    */
    
    signup() {
        const email = this.state.data.email;
        const password = this.state.data.password;
        this.props.auth.signup(email, password);
        this.context.router.push('/signin');
    }

    render() {
        var self = this;
        var errorsList;
        var createAccountButton;

        var populateErrorsList = function() {
            return (
               <div className="div-md-12 alert alert-danger" id="dangerDiv">
                   <div>{self.state.errors.email}</div>
                   <div>{self.state.errors.confEmail}</div>
                   <div>{self.state.errors.password}</div>
                   <div>{self.state.errors.confpassword}</div>
                   <div>{self.state.errors.dispName}</div>
                   <div>{self.state.errors.city}</div>
                   <div>{self.state.errors.profileURL}</div>
               </div>
            );
        };

       var disabledCreateAccountButton = function() {
           return (
               <button type="submit" className="btn btn-primary btn-block disabled" disabled>Create Account</button>
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
                    <form onSubmit={this.signup.bind(this)} onChange={this.handleChange}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input className="form-control" type="email" name="email" value={this.state.email} placeholder="Enter Email Address..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Confirm Email Address</label>
                                    <input className="form-control" type="email" name="confEmail" value={this.state.confEmail} placeholder="Confrim Email Address..." />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>password</label>
                                <input className="form-control" type="password" name="password" value={this.state.password} placeholder="Enter password..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Confirm password</label>
                                    <input className="form-control" type="password" name="confpassword" value={this.state.confpassword} placeholder="Confrim password..." />
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
                                    <input className="form-control" name="dispName" value={this.state.dispName} placeholder="Enter First Name..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>City</label>
                                    <select className="form-control" name="city" >
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
                                        <input className="form-control" name="profileURL" value={this.state.profileURL} placeholder="Enter Profile URL..." />
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
}

CreateAccountPanel.propTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

CreateAccountPanel.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CreateAccountPanel;
