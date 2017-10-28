/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from 'axios';
import authService from 'utils/AuthService';

class TrackApi {
  static getCityChartByName(cityName, cb) {
    if (cityName.length > 0) {
      axios.get(ApiUrl + 'tracks/' + cityName + '/chart')
        .then((response) => {
          if (response.data.length > 0) {
            cb(null, response.data);
          } else {
            let err = 'Enter Valid City (Belfast or Derry)';
            cb(err);
          }
        })
        .catch((error) => {
          cb(error.response);
        });
    }
  }

  static getTracksByNameLimitedByPageNum(searchString, pageNum = 0, cb) {
    axios.get(ApiUrl + 'tracks?q=' + searchString + '&page=' + pageNum)
      .then((response) => {
        cb(null, response.data);
      })
      .catch((error) => {
        cb(error.response);
      });
  }

  static getTrackByTrackURL(trackURL, cb) {
    axios.get(ApiUrl + 'tracks/' + trackURL)
      .then((response) => {
        cb(null, response.data);
      })
      .catch((error) => {
        cb(error.response);
      });
  }

  static getTrackByUserId(userId, cb) {
    axios.get(ApiUrl + 'tracks/uploaderId/' + userId)
      .then((response) => {
        cb(null, response.data);
      })
      .catch((error) => {
        cb(error.response);
      });
  }

  static postTrack(formdata, jwtToken, cb) {
    let instance = axios.create({
      headers: { 'x-access-token': jwtToken }
    });

    instance.post(ApiUrl + "tracks/", formdata)
      .then((response) => {
        cb(null);
      })
      .catch(function(error) {
        cb(error.response);
      });
  }

  static postCommentToTrack(trackURL, data, jwtToken, cb) {
    let instance = axios.create({
      headers: { 'x-access-token': jwtToken }
    });
    
    console.log(ApiUrl + "tracks/" + trackURL + "/addComment")

    instance.post(ApiUrl + "tracks/" + trackURL + "/addComment", data)
      .then((response) => {
        cb(null);
      })
      .catch(function(error) {
        cb(error.response);
      });
  }
}

export default TrackApi;