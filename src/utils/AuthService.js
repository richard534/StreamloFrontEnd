/* global __AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__ */

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import { browserHistory } from 'react-router'
import auth0 from 'auth0-js'

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super()
        // Configure Auth0
        this.auth0 = new auth0.WebAuth({
            clientID: __AUTH0_CLIENT_ID__,
            domain: __AUTH0_DOMAIN__,
            responseType: 'token id_token',
            redirectUri: 'http://localhost:3000/signin'
        })

        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    login(username, password, cb) {
        this.auth0.redirect.loginWithCredentials({
            connection: 'Username-Password-Authentication',
            username,
            password,
            scope: 'openid'
        }, err => {
            //if (err) return alert(err.description)
            if(err){
                cb(err.description);
            }
        })
    }

    signup(email, password) {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password
        }, function(err) {
            if (err) {
                alert('Error: ' + err.description)
            }
        })
    }

    // parseHash method is necessary to get the authentication result from the URL in redirect-based authentication transactions.
    parseHash(hash) {
        this.auth0.parseHash({
            hash,
            _idTokenVerification: false
        }, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setToken(authResult.accessToken, authResult.idToken)
                this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        console.log('Error loading the Profile', error)
                    } else {
                        this.setProfile(profile)
                    }
                })
            } else if (authResult && authResult.error) {
                alert('Error: ' + authResult.error)
            }
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !isTokenExpired(token)
    }

    setToken(accessToken, idToken) {
        // Saves user access token and ID token into local storage
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('id_token', idToken)
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
        return localStorage.getItem('id_token')
    }

    // removes the user's tokens from local storage which effectively logs them out of the application.
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token')
        localStorage.removeItem('profile')
        localStorage.removeItem('access_token')
    }
}