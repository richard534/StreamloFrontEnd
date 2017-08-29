import React from 'react';
import { Link } from 'react-router';
import UploadPanel from './uploadPagePanels/uploadPanel.js';

var uploadDiv = {
  marginTop: "30px"
};

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
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
