import React from 'react';
import {Link} from 'react-router';
import UploadPanel from './uploadPagePanels/uploadPanel.js';
//var auth = require('../auth/auth.js');

var uploadDiv = {
    marginTop: "30px"
};

class UploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //loggedIn: auth.loggedIn()
        }

        this.updateAuth = this.updateAuth.bind(this);
    }

    componentWillMount() {
        /*
      auth.onChange = this.updateAuth;
      auth.login();
      */
    }

    updateAuth(loggedIn) {
        /*
        this.setState({
            loggedIn: loggedIn
        });
        */
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
