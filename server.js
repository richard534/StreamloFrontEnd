/**
 * Module dependencies.
 */
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

/**
 * Create Express server.
 */
const app = express();

/**
 * Load environment variables from .env file.
 * if there is a variable in the .env file which collides with one that already
 * exists in your environment, then that variable will be skipped
 */
dotenv.config();
const port = process.env.PORT;

/**
 * Express configuration.
 */
app.use(express.static(path.join(__dirname, "dist")));

// Redirect all of your server requests to /index.html (client-side router (react router) handles routing)
app.get("/*", function(request, response) {
  response.sendFile(__dirname + "/dist/index.html");
});

app.listen(
  port,
  error =>
    error
      ? console.log(error)
      : console.log(`Streamlo Frontend Application Server Initialized. Listening on port ${port}`)
);
