import React from "react";
import { Link } from "react-router";
import toastr from "toastr";
import moment from "moment";

import UserApi from "api/userApi";
var accountIcon = require("images/account-icon.png");

var commentThumbnail = {
  padding: 0
};

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentUsername: "",
      commentUserURL: ""
    };

    this.commentUserDataSource = this.commentUserDataSource.bind(this);
  }

  componentDidMount() {
    this.commentUserDataSource();
  }

  componentWillReceiveProps() {
    this.commentUserDataSource();
  }

  commentUserDataSource() {
    UserApi.getUserByUserId(this.props.commentUserId, (err, result) => {
      if (err) {
        toastr.error(err);
      } else {
        this.setState({
          commentUsername: result.displayName,
          commentUserURL: result.userURL
        });
      }
    });
  }

  render() {
    return (
      <div className="media">
        <div className="col-md-1" style={commentThumbnail}>
          <img className="img-circle" src={accountIcon} width="100%" height="100%" />
        </div>
        <div className="col-md-11">
          <div className="col-md-6">
            <Link to={"/user/" + this.state.commentUserURL}>
              <p className="text-muted">{this.state.commentUsername}</p>
            </Link>
          </div>
          <div className="col-md-6">
            <p className="text-muted pull-right">{moment(this.props.commentDate).format("dddd, MMMM Do YYYY")}</p>
          </div>
          <div className="col-md-12">
            <p className="wrap">{this.props.commentBody}</p>
          </div>
        </div>
      </div>
    );
  }
}

Comment.getDefaultProps = {
  commentUserId: "",
  commentDate: "",
  commentBody: ""
};

export default Comment;
