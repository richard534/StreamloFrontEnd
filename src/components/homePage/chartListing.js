import React from "react";
import { Link } from "react-router";

var defaultAlbumArt = require("images/altAlbumArtLogo.png");

class ChartListing extends React.Component {
  render() {
    return (
      <div className="row>">
        <div className="col-md-9 col-centered">
          <div className="media">
            <div className="media-left">
              <a>
                <img className="media-object thumbnail ThumbnailStyle" src={defaultAlbumArt} width="160" height="160" />
              </a>
            </div>
            <div className="media-body chartMediaBody">
              <div className="col-md-12">
                <strong>#{this.props.chartNumber}</strong>
                <Link to={"track/"}>
                  <h4 className="media-heading">{this.props.title}</h4>
                </Link>
                <div className="text-muted">{this.props.genre}</div>
              </div>

              <div className="col-md-12 chartLikesBarSeperator">
                <div className="col-md-3">
                  <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group-xs" role="group">
                      <span className="glyphicon glyphicon-thumbs-up" />
                      {" " + this.props.numLikes}
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <span className="glyphicon glyphicon-play" />
                  {" " + this.props.numPlays}
                </div>
                <div className="col-md-3">
                  <span className="glyphicon glyphicon-comment" />
                  {" " + this.props.numComments}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default ChartListing;
