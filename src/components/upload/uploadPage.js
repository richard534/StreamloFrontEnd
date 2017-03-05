import React from 'react';
import {Link} from 'react-router';
import UploadPanel from './uploadPagePanels/uploadPanel.js';
var auth = require('../auth/auth.js');

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
//var UploadPage = auth.requireAuth(React.createClass({
class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: auth.loggedIn()
        }
        
        this.updateAuth = this.updateAuth.bind(this);
    }
    
    componentWillMount() {
      auth.onChange = this.updateAuth;
      auth.login();
    }

    updateAuth(loggedIn) {
      this.setState({
        loggedIn: loggedIn
        });
    }

    render() {
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
}

export default UploadPage;
