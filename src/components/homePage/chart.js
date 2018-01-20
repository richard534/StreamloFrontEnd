import React from "react";
import ChartListing from "./chartListing";
let noResultImg = require("images/noResultsSearch.png");

class Chart extends React.Component {
  render() {
    let tracks = this.props.trackResults;

    let results = (
      <div>
        <img src={noResultImg} className="center-block search-result-image" />
        <p className="text-center text-muted">No Tracks found for this city, unable to produce chart.</p>
      </div>
    );

    let trackNum = 0;
    let createChartListing = function(track) {
      trackNum++;
      return (
        <ChartListing
          key={track._id}
          chartNumber={trackNum}
          title={track.title}
          genre={track.genre}
          fullURL={track.fullURL}
          numComments={track.numComments}
          numLikes={track.numLikes}
          numPlays={track.numPlays}
        />
      );
    };

    if (tracks) {
      let trackListing = tracks.map(createChartListing);
      results = (
        <div className="container">
          <div className="row>">
            <h2 className="text-center">
              Top 10 Tracks In "<strong>{this.props.resultsHeader}</strong>"
            </h2>
          </div>
          <br />
          <hr />
          {trackListing}
        </div>
      );
    }

    return <div>{results}</div>;
  }
}

export default Chart;
