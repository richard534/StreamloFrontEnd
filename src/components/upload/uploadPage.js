import React from "react";
import { Link } from "react-router";
import validate from "validate.js";
import update from "immutability-helper";
import toastr from "toastr";
import moment from "moment";
import validator from "validator";
import UploadPanel from "./uploadPagePanels/uploadPanel.js";
import TrackApi from "api/trackApi";

var uploadDiv = {
  marginTop: "30px"
};

validate.validators.trackURLValidator = function(value, options, key, attributes) {
  if (validator.isURL(value, { require_tld: false })) {
    return undefined;
  } else {
    return "is invalid";
  }
};

var constraints = {
  title: {
    presence: true
  },
  trackURL: {
    presence: { message: "can't be blank " },
    trackURLValidator: true
  },
  genre: {
    presence: true
  },
  city: {
    presence: true
  },
  description: {
    presence: true,
    length: { maximum: 4000 }
  },
  track: {
    presence: true
  }
};

class UploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaderURL: "",
      data: {
        title: "",
        trackURL: "",
        genre: "Pop",
        city: "Belfast",
        uploaderId: "",
        description: "",
        track: []
      },
      errors: {
        title: "Enter Track Details"
      }
    };

    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(data) {
    var validationErrors = validate(this.state.data, constraints);

    if (validationErrors) {
      this.setState({
        errors: validationErrors
      });
    } else {
      this.setState({
        errors: {}
      });
    }
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    let newState;
    if (name == "track") {
      newState = update(this.state, {
        data: {
          track: {
            $set: e.target.files[0]
          }
        }
      });
    } else {
      newState = update(this.state, {
        data: {
          [name]: {
            $set: target.value
          }
        }
      });
    }
    this.setState(newState, this.validate);
  }

  handleSubmit(e) {
    e.preventDefault();

    let jwtToken = this.props.auth.getToken();
    let uploaderId = this.props.auth.getProfile().id;

    var fd = new FormData();
    fd.append("title", this.state.data.title);
    fd.append("genre", this.state.data.genre);
    fd.append("city", this.state.data.city);
    fd.append("trackURL", this.state.data.trackURL);
    fd.append("dateUploaded", moment().toISOString());
    fd.append("uploaderId", uploaderId);
    fd.append("description", this.state.data.description);
    fd.append("track", this.state.data.track);

    TrackApi.postTrack(fd, jwtToken, err => {
      if (err) {
        toastr.remove();
        toastr.error("Error Uploading Track");
      } else {
        toastr.remove();
        toastr.success("Upload Successful");
        this.context.router.push("/signin");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2" style={uploadDiv}>
          <h1 className="text-center">Upload to Streamlo</h1>
          <br />
          <UploadPanel
            handleChange={this.handleChange}
            onTrackSelected={this.onTrackSelected}
            handleSubmit={this.handleSubmit}
            uploaderURL={this.props.auth.getProfile().userURL}
            data={this.state.data}
            errors={this.state.errors}
          />
        </div>
      </div>
    );
  }
}

UploadPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UploadPage;
