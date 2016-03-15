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

      <Route name="upload" handler={require('./components/upload/uploadPage')} />
      <Route name="signIn" handler={require('./components/SignInPage')} />
      <Route name="profilePage" path="/:userName" handler={require('./components/userProfile/profilePage')} />
      <Route name="searchResults" path="/search/" handler={require('./components/search/searchResultsPage')} />
      <NotFoundRoute handler={require('./components/NotFoundPage')} />
    </Route>
);

module.exports = routes;
