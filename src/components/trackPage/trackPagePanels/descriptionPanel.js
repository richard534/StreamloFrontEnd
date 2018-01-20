import React from "react";

class DescriptionPanel extends React.Component {
  render() {
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
      </div>
    );
  }
}

DescriptionPanel.getDefaultProps = {
  description: ""
};

export default DescriptionPanel;
