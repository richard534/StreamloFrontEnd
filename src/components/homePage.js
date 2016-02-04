"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
   render: function() {
       return (


        <div className="container-full">


           <div className="jumbotron">
                <h1 className="text-center">Streamlo</h1>
                <p className="text-center">Discover your local musicians</p>

                
                  <form className="navbar-form text-center" role="search">
                    <div className="input-group input-group-sm">
                      <input type="text" className="form-control" placeholder="Enter name of city..."/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                          <span className="glyphicon glyphicon-search"></span>
                        </button>
                      </span>
                    </div>
                  </form>
           </div>

           <div className="col-md-6">
             <p>Lorem ipsum dolor sit amet, odio sem neque non ante fames, et pede tempus diam semper vestibulum, neque suscipit sem purus, eu congue rutrum aliquet semper lacus semper. Dictum at imperdiet sollicitudin ante velit, vel dui orci mauris, sapien in sed sed amet pellentesque leo, interdum venenatis augue, libero ante suspendisse est cursus. Justo ipsum cum magna, vitae enim, vel diam fermentum orci vivamus, nulla tincidunt non, nunc sapien eros. Dui auctor rutrum luctus mi, ipsum sed magna, arcu magna nonummy morbi, nulla risus. Eros suspendisse cras nunc quisque sed imperdiet, dapibus vulputate facilisi pulvinar condimentum felis integer, in dui pede, pede aliquam et a imperdiet. Vulputate aliquam ac, ornare placerat vitae turpis. Id diam commodo, scelerisque blandit luctus velit ligula, semper dui ridiculus dictum lobortis tortor quam, volutpat ut.</p>
           </div>

           <div className="col-md-6">
             <p>Lorem ipsum dolor sit amet, odio sem neque non ante fames, et pede tempus diam semper vestibulum, neque suscipit sem purus, eu congue rutrum aliquet semper lacus semper. Dictum at imperdiet sollicitudin ante velit, vel dui orci mauris, sapien in sed sed amet pellentesque leo, interdum venenatis augue, libero ante suspendisse est cursus. Justo ipsum cum magna, vitae enim, vel diam fermentum orci vivamus, nulla tincidunt non, nunc sapien eros. Dui auctor rutrum luctus mi, ipsum sed magna, arcu magna nonummy morbi, nulla risus. Eros suspendisse cras nunc quisque sed imperdiet, dapibus vulputate facilisi pulvinar condimentum felis integer, in dui pede, pede aliquam et a imperdiet. Vulputate aliquam ac, ornare placerat vitae turpis. Id diam commodo, scelerisque blandit luctus velit ligula, semper dui ridiculus dictum lobortis tortor quam, volutpat ut.</p>
           </div>

       </div>
       );
     }
});

module.exports = Home;
