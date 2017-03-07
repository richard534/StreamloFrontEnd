import React from 'react';
import TrackJumbotron from './trackPagePanels/trackJumbotron';
import CommentsPanel from './trackPagePanels/commentsPanel';
import PostCommentPanel from './trackPagePanels/postCommentPanel';
import DescriptionPanel from './trackPagePanels/descriptionPanel';

var commentsPanelStyle = {
    marginTop: "10px"
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
    }

    componentWillMount() {
        this.setState({ trackURL: this.props.params.trackURL });
        this.setState({ userURL: this.props.params.userURL });
    }

    componentDidMount() {
        this.tracksDataSource();
    }

    // AJAX helper method thats sets state to returned ajax query
    tracksDataSource(){
        var state = this.state;

        return $.ajax({
          type: "get",
          dataType: 'json',
          url: 'http://localhost:3001/tracks/' + state.trackURL
      }).done(function(result){
            this.setState({ title: result.title });
            this.setState({ artist: result.artist });
            this.setState({ genre: result.genre });
            this.setState({ description: result.description });
            this.setState({ uploadDate: result.dateUploaded });
            this.setState({ numPlays: result.numPlays });
            this.setState({ numLikes: result.numLikes });
            this.setState({ numComments: result.numComments });
            this.setState({ trackBinaryURL: "http://localhost:3001/tracks/" + result.trackBinary + "/stream" });
            this.setState({ comments: result.comments });
        }.bind(this));
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
                            requestComments={this.tracksDataSource} />
                        <CommentsPanel comments={this.state.comments} />
                    </div>
                    <DescriptionPanel description={this.state.description} />
                </div>
            </div>
        );
    }
}

export default TrackPage;
