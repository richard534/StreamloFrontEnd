import React from 'react';
import {Link} from 'react-router';
import validate from 'validate.js';
import _ from 'lodash';
import toastr from 'toastr';
import update from 'immutability-helper';

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

var constraints = {
    title: {
        presence: true
    },
    trackURL: {
        presence: true
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

// TODO "artist" property of data post object needs to be set to displayname of logged in user
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
                track: ""
            },
            errors: {
                title: "Enter Track Details"
            }
        }

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        var validationErrors = validate(this.state.data, constraints);

            if(validationErrors){
                this.setState({errors: validationErrors});
            } else {
                this.setState({errors: {}});
            }
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        var newState = update(this.state, {
            data: {
                [name]: { $set: target.value }
            }
        });

        this.setState(newState, this.validate);
    }


    // TODO check if uploading track works with new ref syntax
    // TODO fix transitionTo function call (mixins not supported by react es6 Classes)
    handleSubmit(e) {
        var self = this;
        e.preventDefault();

        var fd = new FormData();
        fd.append('title', this.state.data.title);
        fd.append('genre', this.state.data.genre);
        fd.append('city', this.state.data.city);
        fd.append('trackURL', this.state.data.trackURL);
        fd.append('dateUploaded', Date.now());
        fd.append('uploaderId', this.state.data.uploaderId);
        fd.append('description', this.state.data.description);
        fd.append('track', this.trackNode.files[0] );

        return $.ajax({
          type: "post",
          data: fd,
          cache: false,
          contentType: false,
          url: 'http://localhost:3001/tracks/',
          processData: false,
          dataType: false,
          success: function(results) {
              toastr.success('Upload Successful');
              self.transitionTo('app');
          },
          error: function(jqXHR, textStatus, errorThrown) {
              toastr.error('Error Uploading Track');
          }
        });
    }

    render() {
        var self = this;
        var errorsList;
        var uploadTrackButton;

        var populateErrorsList = function() {
            return (
                <div className="div-md-12 alert alert-danger" id="dangerDiv">
                    <div>{self.state.errors.title}</div>
                    <div>{self.state.errors.trackURL}</div>
                    <div>{self.state.errors.genre}</div>
                    <div>{self.state.errors.city}</div>
                    <div>{self.state.errors.description}</div>
                    <div>{self.state.errors.track}</div>
                </div>
            );
        };

        var disableduploadTrackButton = function() {
            return (
                <button type="submit" className="btn btn-primary btn-block" disabled>Upload Track</button>
            );
        };

        var enableduploadTrackButton = function() {
            return (
                <button type="submit" className="btn btn-primary btn-block">Upload Track</button>
            );
        };

         if(!_.isEmpty(self.state.errors)) {
             errorsList = populateErrorsList();
             uploadTrackButton = disableduploadTrackButton();
         } else {
             uploadTrackButton = enableduploadTrackButton();
         }

        return (
            <div className="panel panel-default">
               <div className="panel-body">
                   {errorsList}
                   <form onSubmit={this.handleSubmit} onChange={this.handleChange} id="uploadForm">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" name="title" value={this.state.title} placeholder="Enter Track Title..." />
                            </div>

                            <div className="form-group">
                                <div className="col-md-12" style={trackURLLabel}>
                                    <label>Track URL</label>
                                </div>
                                <div className="col-md-5" style={trackURLText}>
                                    <p className="text-muted">streamlo.com/{this.state.uploaderURL}/</p>
                                </div>
                                <div className="col-md-6 pull-right" style={trackURLInput}>
                                    <input className="form-control" name="trackURL" value={this.state.trackURL} placeholder="Enter Track URL..." />
                                </div>
                            </div>
                            <br />
                            <div className="col-md-12" style={uploadLabelDivStyle}>
                                <div className="form-group">
                                    <label>Select Track to Upload</label>
                                    <input className="form-control" name="track" ref={trackNode => this.trackNode = trackNode} value={this.state.track} type="file" accept="audio/*" />
                                </div>
                            </div>

                            <div className="col-md-12" style={labelDivStyle}>
                                <div className="form-group">
                                    <label>Genre</label>
                                    <select value={this.state.value} className="form-control" name="genre" >
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
                                    <select value={this.state.value} className="form-control" name="city" >
                                        <option value="Belfast">Belfast</option>
                                        <option value="Derry">Derry</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12" style={labelDivStyle}>
                                <div className="form-group">
                                    <label>Desciption</label>
                                    <textarea className="form-control" rows="3" name="description" value={this.state.description} placeholder="Enter Track Title..." />
                                </div>
                            </div>
                            {uploadTrackButton}
                            <br />
                        </div>
                   </form>
               </div>
            </div>
    );
  }
}

export default UploadPage;
