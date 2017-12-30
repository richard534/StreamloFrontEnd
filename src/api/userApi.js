/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from 'axios';

class UserApi {
  static getUsersByDisplaynameLimitedByPageNum(displayName, pageNum = 0, cb) {
    axios.get(ApiUrl + "users?display_name=" + displayName + "&page=" + pageNum)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error.response);
    });
  }

  static getUserByUserId(userId, cb) {
    axios.get(ApiUrl + 'users/' + userId)
    .then((response) => {
      cb(null, response.data.users[0]);
    })
    .catch((error) => {
      cb(error.response);
    });
  }
  
  static getUserByUserURL(userURL, cb) {
    axios.get(ApiUrl + 'users/' + userURL)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error.response);
    });
  }
}

export default UserApi;
