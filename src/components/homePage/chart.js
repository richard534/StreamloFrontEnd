"use strict";

var React = require('react');

var Chart = React.createClass({

    render: function() {
        var self = this;
        var tracks = self.props.trackResults;
        var results;
        var trackNum = 0;

        var createChartRow = function(track) {
            trackNum++;
            return (
                <tr key={track._id}>
                    <td>{trackNum}</td>
                    <td>{track.title}</td>
                    <td>{track.numPlays}</td>
                </tr>
            );

        };

        var resultsNotFound = function() {
            return (
                <p>Select a city</p>
            );
        };

        if (self.props.trackResults.length > 0) {
            results = <tbody>{tracks.map(createChartRow)}</tbody>;
        } else {
            results =
            <tbody>
                <tr>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                </tr>
            </tbody>;
        }

       return (
         <div className="container">
           <div className="row>">
             <h2 className="text-center">Top 10 Tracks for "<strong>{this.props.resultsHeader}</strong>"</h2>
           </div>
           <br/>
           <hr/>
           <div className="row">
             <table className="table table-striped table-hover">
               <thead>
                 <tr>
                   <th>Track #</th>
                   <th>Track Name</th>
                   <th>Plays(All Time)</th>
                 </tr>
               </thead>
               {results}
             </table>
           </div>
          </div>
       );
     }
});

module.exports = Chart;
