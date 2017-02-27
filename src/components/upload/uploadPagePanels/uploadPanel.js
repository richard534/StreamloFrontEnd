var React = require('react');
var Router = require('react-router');
var validate = require('validate.js');
var _ = require('lodash');
var toastr = require('toastr');
var auth = require('../../auth/auth.js');

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

// TODO replace "yourURL" placeholder with url of logged in user
// TODO "artist" property of data post object needs to be set to displayname of logged in user
var UploadPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            uploaderURL: "",
            data: {
                title: "",
                trackURL: "",
                genre: "",
                city: "",
                uploaderId: "",
                description: "",
                track: ""
            },
            errors: {
                title: "Enter Track Details"
            }
        };
    },

    componentWillMount: function() {
        var uploaderURL = auth.getUserURL();
        this.setState({ uploaderURL: uploaderURL});
    },

    changeState: function () {
        var uploaderId = auth.getUserId();
        this.setState({
            data: {
                title: this.refs.title.getDOMNode().value,
                genre: this.refs.genre.getDOMNode().value,
                city: this.refs.city.getDOMNode().value,
                uploaderId: uploaderId,
                trackURL: this.refs.trackURL.getDOMNode().value,
                track: this.refs.track.getDOMNode().value,
                description: this.refs.description.getDOMNode().value
            }
        }, this.validate);
    },

    validate: function () {
        var validationErrors = validate(this.state.data, constraints);

            if(validationErrors){
                this.setState({errors: validationErrors});
            } else {
                this.setState({errors: {}});
            }
    },

    handleChange: function(e) {
        this.changeState();
    },

    handleSubmit: function(e) {
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
        fd.append('track', this.refs.track.getDOMNode().files[0] );

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
              // console.log(textStatus + ': ' + errorThrown);
              toastr.error('Error Uploading Track');
          }
        });
    },

    render: function() {
        var self = this;
        var errorsList;
        var createAccountButton;

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

        var disabledCreateAccountButton = function() {
            return (
                <button type="submit" className="btn btn-primary btn-block disabled">Upload Track</button>
            );
        };

        var enabledCreateAccountButton = function() {
            return (
                <button type="submit" className="btn btn-primary btn-block">Upload Track</button>
            );
        };

         if(!_.isEmpty(self.state.errors)) {
             errorsList = populateErrorsList();
             createAccountButton = disabledCreateAccountButton();
         } else {
             createAccountButton = enabledCreateAccountButton();
         }



        return (

            <div className="panel panel-default">
               <div className="panel-body">
                   {errorsList}
                   <form onSubmit={this.handleSubmit} onChange={this.handleChange} id="uploadForm">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" ref="title" value={this.state.title} placeholder="Enter Track Title..." />
                            </div>

                            <div className="form-group">
                                <div className="col-md-12" style={trackURLLabel}>
                                    <label>Track URL</label>
                                </div>
                                <div className="col-md-5" style={trackURLText}>
                                    <p className="text-muted">streamlo.com/{this.state.uploaderURL}/</p>
                                </div>
                                <div className="col-md-6 pull-right" style={trackURLInput}>
                                    <input className="form-control" ref="trackURL" value={this.state.trackURL} placeholder="Enter Track URL..." />
                                </div>
                            </div>
                            <br />
                            <div className="col-md-12" style={uploadLabelDivStyle}>
                                <div className="form-group">
                                    <label>Select Track to Upload</label>
                                    <input className="form-control" ref="track" value={this.state.track} type="file" accept="audio/*" />
                                </div>
                            </div>

                            <div className="col-md-12" style={labelDivStyle}>
                                <div className="form-group">
                                    <label>Genre</label>
                                    <select className="form-control" ref="genre" >
                                        <option>Pop</option>
                                        <option>Rock</option>
                                        <option>Dance</option>
                                        <option>Country</option>
                                        <option>Alternative</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12" style={labelDivStyle}>
                                <div className="form-group">
                                    <label>City</label>
                                    <select className="form-control" ref="city" >
                                        <option>Belfast</option>
                                        <option>Derry</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12" style={labelDivStyle}>
                                <div className="form-group">
                                    <label>Desciption</label>
                                    <textarea className="form-control" rows="3" ref="description" value={this.state.description} placeholder="Enter Track Title..." />
                                </div>
                            </div>
                            {createAccountButton}
                            <br />
                        </div>
                   </form>
               </div>
            </div>

    );
  }
});

module.exports = UploadPage;
