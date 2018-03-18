/* global __API_DOMAIN__ */
const ApiProtocol = process.env.BACKEND_API_PROTOCOL;
const ApiDomainName = process.env.BACKEND_API_DOMAIN_NAME;
const ApiPort = process.env.BACKEND_API_PORT;
const ApiUrl = ApiProtocol + ApiDomainName + ":" + ApiPort + "/";

import axios from "axios";

class UserApi {
  static getUsersByDisplayname(displayName, pageNum = 0, perPage = 5, cb) {
    axios
      .get(ApiUrl + "users?display_name=" + displayName + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getUserByUserId(userId, cb) {
    axios
      .get(ApiUrl + "users/" + userId)
      .then(response => {
        cb(null, response.data.users[0]);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getUserByUserURL(userURL, cb) {
    axios
      .get(ApiUrl + "users?userURL=" + userURL)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getUserProfilePictureURIByUserId(userId) {
    let profilePictureURI = ApiUrl + "users/" + userId + "/profileImage?t=" + new Date().getTime();
    return profilePictureURI;
  }

  static updateUserProfilePictureById(userId, candidateUserData, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .patch(ApiUrl + "users/" + userId + "/profileImage", candidateUserData)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error);
      });
  }

  static updateUserById(userId, candidateUserData, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .patch(ApiUrl + "users/" + userId, candidateUserData)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }

  static deleteUserById(userId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .delete(ApiUrl + "users/" + userId)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }

  static getFolloweesByFollowerUserId(userId, pageNum, perPage, cb) {
    axios
      .get(ApiUrl + "users/" + userId + "/followees" + "?page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static postUserToFolloweesByFollowerUserId(followeeUserId, jwtToken, postBodyData, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .post(ApiUrl + "users/" + followeeUserId + "/followees", postBodyData)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }

  static deleteUserFromFolloweesByFollowerUserId(followerUserId, followeeId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .delete(ApiUrl + "users/" + followerUserId + "/followees/" + followeeId)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }

  static putLikedTrackToUserByLikedTrackId(userId, likedTrackId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .put(ApiUrl + "users/" + userId + "/liked/" + likedTrackId)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }

  static deleteLikedTrackFromUserByLikedTrackId(userId, likedTrackId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .delete(ApiUrl + "users/" + userId + "/liked/" + likedTrackId)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response.data.errors);
      });
  }
}

export default UserApi;
