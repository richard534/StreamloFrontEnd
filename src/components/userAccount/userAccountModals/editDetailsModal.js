var React = require('react');

var EditDetailsModal = React.createClass({


   render: function() {
       return (



           <div className="modal fade" id="editDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
             <div className="modal-dialog" role="document">
               <div className="modal-content">
                 <div className="modal-header">
                   <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   <h4 className="modal-title" id="myModalLabel">Edit Your Profile</h4>
                 </div>
                 <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange}>
                 <div className="modal-body">
                     <div className="row">
                         <div className="col-md-6">
                             <img className="img-circle center-block" src="images/account-icon.png" width="200" height="200"></img>
                         </div>
                         <div className="col-md-6 pull-right">
                             <div className="form-group">
                                 <label>Display Name</label>
                                 <input className="form-control" placeholder="Enter Display Name..." disabled/>
                             </div>
                             <div className="form-group">
                                 <label>Password</label>
                                 <input className="form-control" placeholder="Enter Password..." disabled/>
                             </div>
                             <div className="form-group">
                                 <label>City</label>
                                 <input className="form-control" placeholder="Enter City..." disabled/>
                             </div>
                         </div>
                     </div>

                     <div className="row">
                         <div className="col-md-6 pull-left">
                             <div className="form-group">
                                 <button className="btn btn-default center-block disabled" type="button">Update Profile Picture</button>
                             </div>
                         </div>
                     </div>

                 </div>


                 <div className="modal-footer">
                   <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                   <button type="submit" className="btn btn-primary">Save changes</button>
                 </div>
                </form>
               </div>
             </div>
           </div>

       );
     }
});

module.exports = EditDetailsModal;
