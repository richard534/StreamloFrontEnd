"use strict";

var React = require('react');

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

var UploadPage = React.createClass({
    getDefaultProps: function() {
        return {
            profileDisplayname: "richard534"
        };
    },

    render: function() {
        return (

            <div className="panel panel-default">
               <div className="panel-body">
                   <form>
                       <div className="row">
                           <div className="col-md-5">
                            <img className="center-block trackThumbnail" src={this.props.uploadedImage} width="250" height="250" id="uploadImage"></img>
                            <br />
                            <div className="col-md-12">
                               <div className="form-group">
                                   <label>Add Album Art</label>
                                   <input className="form-control" type="file" name="track" accept="image/*" />
                               </div>
                            </div>

                            </div>
                            <div className="col-md-7 pull-right">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input className="form-control" placeholder="Enter Track Title..." />
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12" style={trackURLLabel}>
                                        <label>Track URL</label>
                                    </div>
                                    <div className="col-md-6" style={trackURLText}>
                                        <p className="text-muted">streamlo.com/{this.props.profileDisplayname}/</p>
                                    </div>
                                    <div className="col-md-6" style={trackURLInput}>
                                        <input className="form-control"placeholder="Enter Track URL..." />
                                    </div>
                                </div>
                                <br />
                                <div className="col-md-12" style={uploadLabelDivStyle}>
                                    <div className="form-group">
                                        <label>Select Track to Upload</label>
                                        <input className="form-control" type="file" name="track" accept="audio/*" />
                                    </div>
                                </div>

                                <div className="col-md-12" style={labelDivStyle}>
                                    <div className="form-group">
                                        <label>Genre</label>
                                        <select className="form-control">
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
                                        <label>Desciption</label>
                                        <textarea className="form-control" rows="3" placeholder="Enter Track Title..." />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success btn-block">Upload Track</button>
                                <br />
                            </div>
                       </div>
                   </form>
               </div>
            </div>

    );
  }
});

module.exports = UploadPage;
