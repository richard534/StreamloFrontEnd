import React from 'react';

class DescriptionPanel extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12">
                            <h4><span className="glyphicon glyphicon-book"></span> Description</h4>
                            <hr />
                            {this.props.description}
                        </div>
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
