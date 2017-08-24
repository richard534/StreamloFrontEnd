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
  }
}

export default UserApi;
