import React from 'react';
import { Link } from 'react-router';
import toastr from 'toastr';
import UserApi from 'api/userApi';

var commentThumbnail = {
  padding: 0
};

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentUsername: "",
      commentUserURL: ""
    }

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
        this.setState({ commentUsername: result.displayName });
        this.setState({ commentUserURL: result.userURL });
      }
    });
  }

  render() {
    return (
      <div className="media">
        <div className="col-md-1" style={commentThumbnail}>
            <img className="img-circle" src="/images/account-icon.png" width="50" height="50"></img>
        </div>
        <div className="col-md-11">
            <div className="col-md-6">
                <Link to={'user/' + this.state.commentUserURL}><p className="text-muted">{this.state.commentUsername}</p></Link>
            </div>
            <div className="col-md-6">
                <p className="text-muted pull-right">{this.props.datePosted}</p>
            </div>
            <div className="col-md-12">
                <p>{this.props.commentBody}</p>
            </div>

        </div>
        <div className="col-md-12">
            <hr />
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