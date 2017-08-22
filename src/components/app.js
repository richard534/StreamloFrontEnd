/*eslint-disable strict */ // Disabling strict on eslint. Cant run strict mode becuase we require global variables, jquery

import React, {PropTypes} from 'react';
import Header from './common/header';
import Footer from './common/footer';
window.$ = window.jQuery = require('jquery');

class App extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance to children
      })
    }

    return (
    <div>
        <Header />
            {children}
        <Footer />
    </div>
  );
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
