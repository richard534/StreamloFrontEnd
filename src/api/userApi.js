/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from 'axios';

class UserApi {
  static getUsersByDisplaynameLimitedByPageNum(displayName, pageNum = 0, cb) {
    axios.get(ApiUrl + "users?q=" + displayName + "&page=" + pageNum)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error.response);
    });
  }

  static getUserByUserId(userId, cb) {
    axios.get(ApiUrl + 'users/id/' + userId)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error.response);
    });
  }
}

export default UserApi;
