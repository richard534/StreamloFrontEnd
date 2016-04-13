'use strict';

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');

// cb stands for callback
function requestAuthentication(email, pass, cb) {
        var data = {
            email: email,
            password: pass
        };

        return $.ajax({
            type: "post",
            data: data,
            dataType: 'json',
            url: 'http://localhost:3001/auth/signin',
            success: function(results) {
                cb({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7),
                    userId: results._id,
                    userDisplayname: results.displayName,
                    userURL: results.userURL
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ': ' + errorThrown);
                cb({ authenticated: false });
            }
        });
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
        requestAuthentication(email, pass, function (res) {
            if (res.authenticated) {
                localStorage.token = res.token;
                localStorage.userId = res.userId;
                localStorage.userDisplayname = res.userDisplayname;
                localStorage.userURL = res.userURL;
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

    getUserId: function getUserId() {
        return localStorage.userId;
    },

    getUserDisplayname: function() {
        return localStorage.userDisplayname;
    },

    getUserURL: function() {
        return localStorage.userURL;
    },

    logout: function logout(cb) {
        delete localStorage.token;
        delete localStorage.userId;
        delete localStorage.userDisplayname;
        delete localStorage.userURL;
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
                        callback();
                    } else {
                        toastr.error('You must be logged in to access this page');
                        transition.redirect('signIn');
                        callback();
                    }
                }
            },

            render: function() {
                return (<Component {...this.props}/>);
            }
        });
    }
};
