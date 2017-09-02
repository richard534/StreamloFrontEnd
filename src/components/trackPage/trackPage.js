import React from 'react';
import toastr from 'toastr';
import update from 'immutability-helper';

import TrackJumbotron from './trackPagePanels/trackJumbotron';
import CommentsPanel from './trackPagePanels/commentsPanel';
import PostCommentPanel from './trackPagePanels/postCommentPanel';
import DescriptionPanel from './trackPagePanels/descriptionPanel';
import TrackApi from 'api/trackApi';

var commentsPanelStyle = {
  marginTop: "10px",
  padding: "0px",
  paddingTop: "10px"
};

class TrackPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackURL: "",
      userURL: "",
      title: "",
      artist: "",
      genre: "",
      uploadDate: "",
      numPlays: 0,
      numLikes: 0,
      numComments: 0,
      description: "",
      trackBinaryURL: "",
      comments: []
    }

    this.tracksDataSource = this.tracksDataSource.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ trackURL: this.props.params.trackURL });
    this.setState({ userURL: this.props.params.userURL });
  }

  componentDidMount() {
    this.tracksDataSource();
  }

  tracksDataSource() {
    let trackURL = this.state.trackURL;

    TrackApi.getTrackByTrackURL(trackURL, (err, result) => {
      if (err) {
        toastr.error(err);
      } else {
        let newState = { 
          title: result.title,
          artist: result.artist,
          genre: result.genre,
          description: result.description,
          uploadDate: result.dateUploaded,
          numPlays: result.numPlays,
          numLikes: result.numLikes,
          numComments: result.numComments,
          trackBinaryURL: "http://localhost:3001/tracks/" + result.trackBinary + "/stream",
          comments: result.comments
        };
        this.setState(newState);
      }
    })
  }
  
  postComment(e) {
    e.preventDefault();
    //var trackURL = this.props.trackURL;
    //var self = this;
    
    if(this.props.auth.loggedIn()) {
      console.log("Logged In");
    }
    
    /*
    return $.ajax({
      type: "post",
      data: data,
      url: 'http://localhost:3001/tracks/' + trackURL + '/addComment',
      dataType: 'text',
      success: function(results) {
        toastr.success('Comment Added To Track');
        self.props.requestComments();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log(textStatus + ': ' + errorThrown);
        toastr.error('Error Uploading Track');
      }
    });
    */
  }
  
  handleChange(e) {
    const target = e.target;
    const name = target.name;

    var newState = update(this.state, {
      [name]: {
        $set: target.value
      }
    });

    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <TrackJumbotron title={this.state.title}
            artist={this.state.artist}
            genre={this.state.genre}
            uploadDate={this.state.uploadDate}
            numPlays={this.state.numPlays}
            numLikes={this.state.numLikes}
            numComments={this.state.numComments}
            trackBinaryURL={this.state.trackBinaryURL}
            userURL={this.state.userURL} />
            
        <div className="col-md-12" style={commentsPanelStyle}>
          <div className="col-md-8">
            <PostCommentPanel numComments={this.state.numComments}
              trackURL={this.state.trackURL} 
              postComment={this.postComment} 
              handleChange={this.handleChange} />
            <CommentsPanel comments={this.state.comments} />
          </div>
          <DescriptionPanel description={this.state.description} />
        </div>
    </div>
    );
  }
}

export default TrackPage;
