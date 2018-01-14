/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from "axios";
import authService from "utils/AuthService";

class TrackApi {
  static getCityChartByName(cityName, cb) {
    if (cityName.length > 0) {
      axios
        .get(ApiUrl + "tracks/" + cityName + "/chart")
        .then(response => {
          if (response.data.length > 0) {
            cb(null, response.data);
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            let err = "Enter Valid City (Belfast or Derry)";
            cb(err);
          }
        });
    }
  }

  static getTracksByName(searchString, pageNum = 1, perPage = 5, cb) {
    axios
      .get(ApiUrl + "tracks?q=" + searchString + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case "404":
              cb(error.response.data);
              break;
          }
        } else {
          cb(error);
        }
      });
  }

  static getTrackByTrackURL(trackURL, cb, pageNum = 1, perPage = 5) {
    axios
      .get(ApiUrl + "tracks?trackURL=" + trackURL + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data.tracks[0]);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getTracksByUploaderId(uploaderId, cb, pageNum = 1, perPage = 5) {
    axios
      .get(ApiUrl + "tracks?uploaderId=" + uploaderId + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data.tracks);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static postTrack(formdata, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .post(ApiUrl + "tracks/", formdata)
      .then(response => {
        cb(null);
      })
      .catch(function(error) {
        cb(error.response);
      });
  }

  static postCommentToTrack(trackURL, data, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .post(ApiUrl + "tracks/" + trackURL + "/comments", data)
      .then(response => {
        cb(null);
      })
      .catch(function(error) {
        cb(error.response);
      });
  }
}

export default TrackApi;
