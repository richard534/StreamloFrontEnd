import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import validate from 'validate.js';
import toastr from 'toastr';
import update from 'immutability-helper';
import AuthService from '../../utils/AuthService';
var streamloLogo = require('../../images/StreamloWithAlpha.png');

var imgStyle = {
  paddingTop: "30px"
};

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: {
                email: "",
                password: ""
            },
            errors: {
                email: "",
                password: ""
            }
        }
        
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        var validationErrors = validate(this.state.data);

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

    // TODO fix transitionTo function call (mixins not supported by react es6 Classes)
    // TODO fix toasr popups (no styling)
    /*
    handleSubmit(e) {
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
    }
    */
    
    login(e) {
      e.preventDefault()
      toastr.remove()
      const email = this.state.data.email;
      const password = this.state.data.password;
      this.props.auth.login(email, password, (errDesc) => {
          toastr.error(errDesc);
      });
    }
    
    logout() {
        // destroys the session data
        this.props.auth.logout()
        // redirects to login page
        this.context.router.push('/signin');
    }

    render() {
        var header;
        var result;
        //var loggedInUser = auth.getUserDisplayname();
        
        if(this.props.auth.loggedIn()){
            header = <p>Signed in as <Link to={"user/test"}><strong>Someone</strong></Link></p>;
            result =
            <div>
                <button onClick={this.logout.bind(this)} className="btn btn-danger btn-block">Logout</button>
            </div>;

        } else {
            header = <p>Sign in to StreamLo</p>;
            result =
            <div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={this.props.email} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={this.props.password} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Login</button>
            </div>;
        }

        return (
          <div className="container">
              <div className="row col-md-4 col-md-offset-4">
                <img src={streamloLogo} className="img-responsive center-block" width="250" style={imgStyle}/>
                <div className="text-center text-muted">
                  {header}
                </div>
                <form onSubmit={this.login.bind(this)} onChange={this.handleChange}>
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
}

SignInPage.propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
}

SignInPage.contextTypes = {
router: React.PropTypes.object.isRequired
}
  
export default SignInPage;
