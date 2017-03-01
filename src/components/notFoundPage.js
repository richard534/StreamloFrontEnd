import React from 'react';
import {Link} from 'react-router';

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div className="col-md-8">
        <h1>Page not found</h1>
        <p>Whoops! nothing found here!</p>
        <p><Link to="/">Back to home</Link></p>
      </div>
    );
  }
});

export default NotFoundPage;
