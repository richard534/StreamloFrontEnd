import React from 'react';

class Footer extends React.Component {
   render() {
     let currentYear = new Date().getFullYear();
       return (
           <footer>
               <div className="container">
                   <div className='row'>
                     <div className='col-md-5'>
                       <br />
                       <p>Powered by <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong> and <strong>React</strong></p>
                       <p>{currentYear} Richard Taylor</p>
                     </div>
                 </div>
               </div>
           </footer>
       );
     }
}

export default Footer
