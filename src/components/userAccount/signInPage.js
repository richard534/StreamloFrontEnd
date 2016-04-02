"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var imgStyle = {
  paddingTop: "30px"
};

var SignInPage = React.createClass({
  render: function() {
    return (
      <div className="container">
          <div className="row col-md-4 col-md-offset-4">
            <img src="images/StreamloWithAlpha.png" className="img-responsive center-block" width="250" style={imgStyle}/>
            <div className="text-center text-muted">
              <p>Sign in to StreamLo</p>
            </div>
            <form>
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"/>
                  </div>
                  <button className="btn btn-success btn-block">Sign in</button>
                  </div>
                </div>
            </form>

            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <p>New to StreamLo? <Link to="createAccount">Create an account</Link></p>
                </div>
              </div>
            </div>

            </div>

      </div>

    );
  }
});

module.exports = SignInPage;
