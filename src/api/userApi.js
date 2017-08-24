/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from 'axios';

class UserApi {
  static getUsersByDisplayname(displayName, cb) {
    axios.get(ApiUrl + "users?q=" + displayName)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error);
    });




    /*
    return $.ajax({
      type: "get",
      dataType: 'json',
      url: 'http://localhost:3001/users?q=' + displayName
    }).done(function(result) {
      this.setState({
        peopleResults: result.users,
        numPeople: result.numMatchingUsers
      });
    }.bind(this));
    */
  }
}

export default UserApi;
