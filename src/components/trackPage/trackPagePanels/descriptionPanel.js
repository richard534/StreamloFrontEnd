import React from "react";

class DescriptionPanel extends React.Component {
  render() {
    let deleteTrackButton;

    if (this.props.uploaderLoggedIn) {
      deleteTrackButton = (
        <div className="panel-footer clearfix">
          <button onClick={this.props.deleteTrackHandler} className="btn btn-danger pull-left">
            Delete Track
          </button>
        </div>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-md-12">
            <h4>
              <span className="glyphicon glyphicon-book" /> Description
            </h4>
            <hr />
            <p className="wrap">{this.props.description}</p>
          </div>
        </div>
        {deleteTrackButton}
      </div>
    );
  }
}

DescriptionPanel.getDefaultProps = {
  description: ""
};

export default DescriptionPanel;
