import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import HomePage from './components/homePage/homePage';
import SearchResultsPage from './components/search/searchResultsPage';
import TrackPage from './components/trackPage/trackPage';
import UploadPage from './components/upload/uploadPage';
import SignInPage from './components/userAccount/signInPage';
import CreateAccountPage from './components/userAccount/createAccountPage';
import ProfilePage from './components/userAccount/profilePage';
import NotFoundPage from './components/notFoundPage';


/*
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
*/

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="search" component={SearchResultsPage} />
    <Route path="track/:userURL/:trackURL" component={TrackPage} />
    
    <Route path="upload" component={UploadPage} />
    <Route path="signin" component={SignInPage} />
    <Route path="createAccount" component={CreateAccountPage} />
    <Route path="user/:userURL" component={ProfilePage} />
    
    <Route path="*" component ={NotFoundPage} />
  </Route>
);

/*
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
*/
