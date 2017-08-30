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
        cb(error);
      });
    }
  }

  static getTracksByNameLimitedByPageNum(searchString, pageNum = 0, cb) {
    axios.get(ApiUrl + 'tracks?q=' + searchString + '&page=' + pageNum)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error);
    });
  }

  static uploadTrack(formdata, jwtToken, cb) {
    let instance = axios.create({
      headers: {'x-access-token': jwtToken}
    });

    instance.post(ApiUrl + "tracks/", formdata)
      .then((response) => {
        cb(null);
      })
      .catch(function(error) {
        cb(error);
      });
  }
}

export default TrackApi;
