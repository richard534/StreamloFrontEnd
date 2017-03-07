import React from 'react';
import CreateAccountPanel from './userAccountPanels/createAccountPanel';

var createAccountDiv = {
    marginTop: "30px"
};

class CreateAccountPage extends React.Component {
   render() {
       return (
           <div className="container">
               <div className="col-md-8 col-md-offset-2" style={createAccountDiv}>
                   <h1 className="text-center">Create An Account</h1>
                   <br/>
               </div>
               <CreateAccountPanel />
            </div>
       );
    }
}

export default CreateAccountPage;
