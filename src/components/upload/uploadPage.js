var React = require('react');
var UploadPanel = require('./uploadPagePanels/uploadPanel.js');
var auth = require('../auth/auth.js');
var Router = require('react-router');

var uploadDiv = {
    marginTop: "30px"
};

var trackURLText = {
    paddingTop: "6px",
    paddingRight: "0px"
};

var trackURLLabel = {
    paddingLeft: "0px"
};

var trackURLInput = {
    padding: "0px"
};

var labelDivStyle = {
    paddingLeft: "0px"
};

var uploadLabelDivStyle = {
    paddingLeft: "0px",
    paddingTop: "10px"
};

// Require auth wrapper prevents this class from being rendered unless user is logged in
var UploadPage = auth.requireAuth(React.createClass({

    getInitialState: function() {
      return {
        loggedIn: auth.loggedIn()
        };
    },

    updateAuth: function(loggedIn) {
      this.setState({
        loggedIn: loggedIn
        });
    },

    componentWillMount: function() {
      auth.onChange = this.updateAuth;
      auth.login();
    },

    render: function() {
        return (

        <div className="container">
            <div className="col-md-8 col-md-offset-2" style={uploadDiv}>
                <h1 className="text-center">Upload to Streamlo</h1>
                <br/>
                <UploadPanel />
           </div>
        </div>

    );
  }
}));

module.exports = UploadPage;
