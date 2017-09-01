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

    this.userURLDataSource = this.userURLDataSource.bind(this);
  }

  componentDidMount() {
    this.userURLDataSource();
  }

  componentWillReceiveProps() {
    this.userURLDataSource();
  }

  userURLDataSource() {
    UserApi.getUserByUserId(this.props.commentUserId, (err, result) => {
      if (err) {
        toastr.error(err);
      } else {
        this.setState({ commentUsername: result.displayName });
        this.setState({ commentUserURL: result.userURL });
      }
    });

    /*
    return $.ajax({
      type: "get",
      dataType: 'json',
      url: 'http://localhost:3001/users/id/' + self.props.commentUserId,
      success: function(result) {
        self.setState({ commentUsername: result.displayName });
        self.setState({ commentUserURL: result.userURL });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log(textStatus + ': ' + errorThrown);
      }
    });
    */
  }

  // TODO replace old react router params attribute with this format "to={"profilePage/" + this.state.commentUserURL}"
  render() {
    return (
      <div className="media">
        <div className="col-md-1" style={commentThumbnail}>
            <img className="img-circle" src="/images/account-icon.png" width="50" height="50"></img>
        </div>
        <div className="col-md-11">
            <div className="col-md-6">
                <Link to='profilePage' params={{userURL: this.state.commentUserURL}}><p className="text-muted">{this.state.commentUsername}</p></Link>
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