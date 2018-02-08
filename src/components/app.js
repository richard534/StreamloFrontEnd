import React, { PropTypes } from "react";
import Header from "./common/header";
import Footer from "./common/footer";

class App extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance to children
      });
    }

    return (
      <div>
        <Header auth={this.props.route.auth} />
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
