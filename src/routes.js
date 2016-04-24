"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
      <DefaultRoute handler={require('./components/homePage/homePage')} />

      <Route name="searchResults" path="search" handler={require('./components/search/searchResultsPage')} />
      <Route name="track" path=":userURL/:trackURL" handler={require('./components/trackPage/trackPage')} />

      <Route name="upload" path="upload/" handler={require('./components/upload/uploadPage')} />
      <Route name="signIn" path="signin/" handler={require('./components/userAccount/SignInPage')} />
      <Route name="createAccount" path="createAccount/" handler={require('./components/userAccount/createAccountPage')} />
      <Route name="profilePage" path="user/:userURL/" handler={require('./components/userAccount/profilePage')} />

      <NotFoundRoute handler={require('./components/NotFoundPage')} />
    </Route>
);

module.exports = routes;
