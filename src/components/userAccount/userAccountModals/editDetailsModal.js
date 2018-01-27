import React from "react";

var accountIcon = require("images/account-icon.png");

class EditDetailsModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal show" id="editDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Edit Your Profile
              </h4>
            </div>
            <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img className="img-circle center-block" src={accountIcon} width="200" height="200" />
                  </div>
                  <div className="col-md-6 pull-right editProfileModalCol">
                    <div className="form-group">
                      <label>Display Name</label>
                      <input className="form-control" placeholder="Enter Display Name..." disabled />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" placeholder="Enter Password..." disabled />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input className="form-control" placeholder="Enter City..." disabled />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 pull-left">
                    <div className="form-group">
                      <button className="btn btn-default center-block disabled" type="button">
                        Update Profile Picture
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-danger pull-left">
                  Delete Account
                </button>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.onClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDetailsModal;
