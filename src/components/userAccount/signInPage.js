var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var auth = require('../auth/auth.js');
var validate = require('validate.js');
var toastr = require('toastr');

var imgStyle = {
  paddingTop: "30px"
};

var constraints = {
    email: {
        presence: true
    },
    password: {
        presence: true
    }
};

var SignInPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            loggedIn: auth.loggedIn(),
            data: {
                email: "",
                password: ""
            },
            errors: {
                email: "",
                password: ""
            }
        };
    },

    changeState: function () {
        this.setState({
            data: {
                email: this.refs.email.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
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

        if(self.state.loggedIn){
            auth.logout();
            self.setState({loggedIn: false});
        } else {
            var email = this.state.data.email;
            var password = this.state.data.password;
            auth.login(email, password, function(userLoggedIn) {
                if(userLoggedIn) {
                    toastr.success('SignIn Successful');
                    self.setState({loggedIn: true});
                    self.transitionTo('profilePage', {userURL: auth.getUserURL()});
                } else {
                    toastr.error('SignIn Unsuccessful');
                }
            });
        }
    },

    render: function() {
        var self = this;
        var header;
        var result;
        var loggedInUser = auth.getUserDisplayname();

        if(this.state.loggedIn){
            header = <p>Signed in as <Link to="profilePage" params={{userURL: auth.getUserURL()}}><strong>{loggedInUser}</strong></Link></p>;
            result =
            <div>
                <button type="submit" className="btn btn-danger btn-block">Logout</button>
            </div>;

        } else {
            header = <p>Sign in to StreamLo</p>;
            result =
            <div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" ref="email" value={this.props.email} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref="password" value={this.props.password} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Sign in</button>
            </div>;

        }



        return (
          <div className="container">
              <div className="row col-md-4 col-md-offset-4">
                <img src="images/StreamloWithAlpha.png" className="img-responsive center-block" width="250" style={imgStyle}/>
                <div className="text-center text-muted">
                  {header}
                </div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                  <div className="panel panel-default">
                    <div className="panel-body">
                      {result}
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
