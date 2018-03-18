/* global __API_DOMAIN__ */

import React from "react";
import { Route, IndexRoute } from "react-router";
import AuthService from "./utils/AuthService";
import toastr from "toastr";

import App from "./components/app";
import HomePage from "./components/homePage/homePage";
import SearchResultsPage from "./components/search/searchResultsPage";
import TrackPage from "./components/trackPage/trackPage";
import UploadPage from "./components/upload/uploadPage";
import SignInPage from "./components/userAccount/signInPage";
import CreateAccountPage from "./components/userAccount/createAccountPage";
import ProfilePage from "./components/userAccount/profilePage";
import NotFoundPage from "./components/notFoundPage";

// Construct URL to Auth Service from environment variables
const ApiProtocol = process.env.BACKEND_API_PROTOCOL;
const ApiDomainName = process.env.BACKEND_API_DOMAIN_NAME;
const ApiPort = process.env.BACKEND_API_PORT;
const ApiUrl = ApiProtocol + ApiDomainName + ":" + ApiPort + "/";

const auth = new AuthService(ApiUrl);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: "/signin" });
    toastr.remove();
    toastr.error("Please sign in to access this page");
  }
};

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={HomePage} />
    <Route path="search" component={SearchResultsPage} />
    <Route path="track/:userURL/:trackURL" component={TrackPage} />

    <Route path="upload" component={UploadPage} onEnter={requireAuth} />
    <Route path="signin" component={SignInPage} />
    <Route path="createAccount" component={CreateAccountPage} />
    <Route path="user/:userURL" component={ProfilePage} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
