'use strict';

var React = require('react');
var Router = require('react-router');

// cb stands for callback
function pretendRequest(email, pass, cb) {
  setTimeout(function () {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({ authenticated: false });
    }
  }, 0);
}

module.exports = {
    login: function login(email, pass, cb) {
        var _this = this;

        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
          if (cb) {cb(true); }
          this.onChange(true);
          return;
        }
        pretendRequest(email, pass, function (res) {
          if (res.authenticated) {
            localStorage.token = res.token;
            if (cb) {cb(true); }
            _this.onChange(true);
            } else {
            if (cb) {cb(false); }
            _this.onChange(false);
          }
        });
    },

    getToken: function getToken() {
        return localStorage.token;
    },

    logout: function logout(cb) {
        delete localStorage.token;
        if (cb) {cb(); }
        this.onChange(false);
    },

    loggedIn: function loggedIn() {
        return !!localStorage.token;
    },

    onChange: function onChange() {},

    requireAuth: function(Component) {
        var self = this;
        return React.createClass({
            statics: {
                willTransitionTo: function(transition, params, query, callback) {
                    if(self.loggedIn()) {
                        console.log("Logged in");
                        callback();
                    } else {
                        console.log("notloggedin");
                        transition.redirect('signIn');
                        callback();
                    }
                }
            },

            render: function() {
                console.log("hererere");
                return (<Component {...this.props}/>);
            }
        });
    }
};
