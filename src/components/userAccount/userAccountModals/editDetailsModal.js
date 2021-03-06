import React from "react";

class EditDetailsModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    let updateProfilePicBtnClass = "btn btn-primary center-block updateProfilePictureBtn disabled";
    if (this.props.candidateUserData.profileImage) {
      updateProfilePicBtnClass = "btn btn-primary center-block updateProfilePictureBtn";
    }

    return (
      <div className="modal show" id="editDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange}>
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
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 ">
                    <img
                      className="img-circle center-block"
                      src={this.props.profileImageURI}
                      width="200"
                      height="200"
                    />
                    <div className="col-md-10 col-md-offset-1">
                      <div className="form-group">
                        <input
                          className="form-control editProfilePicInput"
                          name="profileImage"
                          type="file"
                          accept="image/*"
                        />

                        <button
                          className={updateProfilePicBtnClass}
                          onClick={this.props.updateImageHandler}
                          type="button"
                        >
                          Update Profile Picture
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 editProfileModalCol pull-right">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        defaultValue={this.props.candidateUserData.email}
                        type="email"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Display Name</label>
                      <input
                        className="form-control"
                        defaultValue={this.props.candidateUserData.displayName}
                        name="displayName"
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input className="form-control" defaultValue={this.props.candidateUserData.city} name="city" />
                    </div>
                    <hr />
                    <p className="text-muted">If you want to change password:</p>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        defaultValue={this.props.candidateUserData.password}
                        name="password"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        className="form-control"
                        defaultValue={this.props.candidateUserData.confPassword}
                        name="confPassword"
                        type="password"
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={this.props.deleteAccountHandler} className="btn btn-danger pull-left">
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
