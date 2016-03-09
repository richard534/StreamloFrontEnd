"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

//TODO: make header for charts dynamic, ie changes for selected city
var Chart = React.createClass({
   render: function() {
       return (
         <div className="container">
           <div className="row>">
             <h2 className="text-center">Top 10 Tracks for Belfast</h2>
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
               <tbody>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
                 <tr>
                   <td>Test</td>
                   <td>Test</td>
                   <td>Test</td>
                 </tr>
               </tbody>
             </table>
           </div>
          </div>
       );
     }
});

module.exports = Chart;
