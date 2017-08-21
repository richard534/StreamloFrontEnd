import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import validate from 'validate.js';
import toastr from 'toastr';
import update from 'immutability-helper';
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
            },
            profile: {
              email: ""
            }
        }

        // listen to profile_updated events to update internal state
        props.auth.on('profile_updated', (newProfile) => {
            var newState = {
              data: {
                  email: "",
                  password: ""
              },
              errors: {
                  email: "",
                  password: ""
              },
              profile: {
                email: newProfile.email
              }
            }

            this.setState(newState);
        });

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillMount() {
      let profile = this.props.auth.getProfile();
      let newState = {
        profile: {
          email: profile.email,
        }
      };
      this.setState(newState);
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

    login(e) {
      e.preventDefault();
      toastr.remove();
      const form = this.state.data;
      this.props.auth.login(form, (err) => {
        if(err) {
          toastr.error(err);
        } else {
          toastr.remove();
          toastr.success('Logged in');
          this.context.router.push('/signin');
        }
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
            header = <p>Signed in as <Link to={"user/test"}><strong>{this.state.profile.email}</strong></Link></p>;
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

SignInPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default SignInPage;
