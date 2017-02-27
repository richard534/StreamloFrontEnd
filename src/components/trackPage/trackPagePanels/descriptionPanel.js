var React = require('react');

var descriptionPanel = React.createClass({
    getDefaultProps: function() {
        return {
            description: ""
        };
    },


    render: function() {
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
});

module.exports = descriptionPanel;
