"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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

var CreateAccountPanel = React.createClass({

   render: function() {
       return (
               <div className="col-md-8 col-md-offset-2">
                   <div className="panel panel-default">
                        <div className="panel-body">
                        <h4>Sign In Details</h4>
                        <br/>
                        <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input className="form-control" id="email" placeholder="Enter Email Address..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="confEmail">Confirm Email Address</label>
                                    <input className="form-control" id="confEmail" placeholder="Confrim Email Address..." />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" id="password" placeholder="Enter Password..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="confPassword">Confirm Password</label>
                                    <input className="form-control" id="confPassword" placeholder="Confrim Password..." />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h4>Profile Details</h4>
                        <br/>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">Display Name</label>
                                    <input className="form-control" id="firstName" placeholder="Enter First Name..." />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input className="form-control" id="city" placeholder="Enter City Name..." />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="col-md-12" style={profURLLabel}>
                                        <label htmlFor="profURL">Profile URL</label>
                                    </div>
                                    <div className="col-md-2" style={profileURLText}>
                                        <p className="text-muted">streamlo.com/</p>
                                    </div>
                                    <div className="col-md-10" style={profileURLInput}>
                                        <input className="form-control" id="profURL" placeholder="Enter Profile URL..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        <Link to="app"><button type="submit" className="btn btn-primary btn-block">Create Account</button></Link>
                        </form>
                       </div>
                   </div>
               </div>
       );
     }
});

module.exports = CreateAccountPanel;
