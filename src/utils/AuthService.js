// To prevent "no-undef" eslint rule firing
/* global __API_DOMAIN__ */

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import { browserHistory } from 'react-router'
import axios from 'axios';

export default class AuthService extends EventEmitter {
    constructor(domain) {
        super()
        this.domain = domain;

        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.getProfile = this.getProfile.bind(this);
    }

    login(form, cb) {
      // TODO implement login to streamlo web service

      let data = {
        email: form.email,
        password: form.password
      };

      axios.post(this.domain + "auth/login", data)
      .then((response) => {
        const data = response.data;
        if (data && data.token && data.profile) {
          this.setToken(data.token);
          this.setProfile(data.profile);
          cb();
        } else {
          cb("Error logging in");
        }
      })
      .catch(function (error) {
        cb(error);
      });
    }

    signup(form, cb) {
      let data = {
          email: form.email,
          password: form.password,
          userURL: form.profileURL,
          displayName: form.dispName,
          city: form.city
      };

      axios.post(this.domain + "auth/signup", data)
      .then(function (response) {
        cb(response);
      })
      .catch(function (error) {
        cb(error.response, error.response.data);
      });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }

    setToken(jwtToken) {
        // Saves user access token and ID token into local storage
        localStorage.setItem('jwtToken', jwtToken);
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('jwtToken')
    }

    // removes the user's tokens from local storage which effectively logs them out of the application.
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('profile')
    }
}
