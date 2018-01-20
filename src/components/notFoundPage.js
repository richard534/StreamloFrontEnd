import React from "react";
import { Link } from "react-router";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="col-md-12 text-center">
        <h1>404 Page not found</h1>
        <p>Whoops! nothing found here!</p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
