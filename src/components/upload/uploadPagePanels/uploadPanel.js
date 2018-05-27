import React from "react";
import { Link } from "react-router";
import isEmpty from "lodash/isEmpty";

import TrackApi from "api/trackApi";
import MiscApi from "api/miscApi";

var tempAlbumArt = MiscApi.getAltAlbumArtImgUri();

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
  paddingLeft: "0px",
  paddingRight: "0px"
};

var uploadLabelDivStyle = {
  paddingLeft: "0px",
  paddingTop: "10px",
  paddingRight: "0px"
};

let progressBarStyle = {
  width: "60%"
};

class UploadPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
    var errorsList;
    var uploadTrackButton;

    var populateErrorsList = function() {
      return (
        <div className="div-md-12 alert alert-danger" id="dangerDiv">
          <div>{self.props.errors.title}</div>
          <div>{self.props.errors.trackURL}</div>
          <div>{self.props.errors.genre}</div>
          <div>{self.props.errors.city}</div>
          <div>{self.props.errors.description}</div>
          <div>{self.props.errors.track}</div>
        </div>
      );
    };

    var disableduploadTrackButton = function() {
      return (
        <button type="submit" className="btn btn-primary btn-block" disabled>
          Upload Track
        </button>
      );
    };

    var enableduploadTrackButton = function() {
      return (
        <button type="submit" className="btn btn-primary btn-block">
          Upload Track
        </button>
      );
    };

    let uploadProgressBar;
    if (this.props.isUploading) {
      uploadProgressBar = (() => {
        return (
          <div className="col-md-12" style={labelDivStyle}>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped active"
                style={{ width: this.props.uploadProgress + "%" }}
              >
                <span className="sr-only" />
              </div>
            </div>
          </div>
        );
      })();
    }

    if (!isEmpty(self.props.errors)) {
      errorsList = populateErrorsList();
      uploadTrackButton = disableduploadTrackButton();
    } else {
      if (!this.props.isUploading) {
        uploadTrackButton = enableduploadTrackButton();
      }
    }

    let albumArtPreviewImage = tempAlbumArt;
    if (this.props.data.albumArtLocalFilePath) {
      albumArtPreviewImage = this.props.data.albumArtLocalFilePath;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          {errorsList}
          <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange} id="uploadForm">
            <div className="col-md-12">
              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  name="title"
                  value={this.props.data.title}
                  placeholder="Enter Track Title..."
                />
              </div>

              <div className="form-group">
                <div className="col-md-12" style={trackURLLabel}>
                  <label>Track URL</label>
                </div>
                <div className="col-md-5" style={trackURLText}>
                  <p className="text-muted">
                    streamlo.com/{this.props.uploaderURL}/{this.props.data.trackURL}
                  </p>
                </div>
                <div className="col-md-6 pull-right" style={trackURLInput}>
                  <input
                    maxLength="18"
                    className="form-control"
                    name="trackURL"
                    value={this.props.data.trackURL}
                    placeholder="Enter Track URL..."
                  />
                </div>
              </div>

              <div className="col-md-12 nopadding">
                <div className="col-md-9" style={uploadLabelDivStyle}>
                  <div className="form-group">
                    <label>Select Track to Upload</label>
                    <input className="form-control" name="track" type="file" accept="audio/*" />
                  </div>

                  <div className="form-group">
                    <label>Select Track Album Art (Optional)</label>
                    <input className="form-control" name="albumArt" type="file" accept="image/*" />
                  </div>
                </div>
                <div className="col-md-3 center-upload-albumArt">
                  <img
                    className="img-responsive pull-right upload-album-art-img"
                    src={albumArtPreviewImage}
                    width="215"
                    height="215"
                  />
                </div>
              </div>

              <div className="col-md-12" style={labelDivStyle}>
                <div className="form-group">
                  <label>Genre</label>
                  <select value={this.props.value} className="form-control" name="genre">
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Dance">Dance</option>
                    <option value="Country">Country</option>
                    <option value="Alternative">Alternative</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12" style={labelDivStyle}>
                <div className="form-group">
                  <label>City</label>
                  <select value={this.props.value} className="form-control" name="city">
                    <option value="Belfast">Belfast</option>
                    <option value="Derry">Derry</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12" style={labelDivStyle}>
                <div className="form-group">
                  <label>Desciption</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={this.props.data.description}
                    placeholder="Enter Track Description..."
                  />
                </div>
              </div>
              {uploadProgressBar}
              {uploadTrackButton}
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadPanel;
