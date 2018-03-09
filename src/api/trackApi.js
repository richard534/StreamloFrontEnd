/* global __API_DOMAIN__ */
let ApiUrl = __API_DOMAIN__;

import axios from "axios";
import authService from "utils/AuthService";

class TrackApi {
  static getTrackStreamURIByGridFSId(trackGridFSId) {
    let trackStreamURI = "http://localhost:3001/tracks/" + trackGridFSId + "/stream";
    return trackStreamURI;
  }

  static getCityChartByName(cityName, cb) {
    if (cityName.length > 0) {
      axios
        .get(ApiUrl + "tracks?page=1&per_page=10&city=" + cityName)
        .then(response => {
          if (response.data.tracks.length > 0) {
            cb(null, response.data.tracks);
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            let err = "No tracks found for this city";
            cb(err);
          }
        });
    }
  }

  static getTracksByName(searchString, pageNum = 1, perPage = 5, cb) {
    axios
      .get(ApiUrl + "tracks?title=" + searchString + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error);
      });
  }

  static getTrackByTrackURL(trackURL, pageNum = 1, perPage = 5, cb) {
    axios
      .get(ApiUrl + "tracks?trackURL=" + trackURL + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data.tracks[0]);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getTracksByUploaderId(uploaderId, pageNum = 1, perPage = 5, cb) {
    axios
      .get(ApiUrl + "tracks?uploaderId=" + uploaderId + "&page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
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

  static getTrackCommentsById(trackId, pageNum = 1, perPage = 5, cb) {
    axios
      .get(ApiUrl + "tracks/" + trackId + "/comments?page=" + pageNum + "&per_page=" + perPage)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static deleteCommentByCommentId(commentId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .delete(ApiUrl + "tracks/comments/" + commentId)
      .then(response => {
        cb(null, response.data.message);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static deleteTrackByTrackId(trackId, jwtToken, cb) {
    let instance = axios.create({
      headers: { "x-access-token": jwtToken }
    });

    instance
      .delete(ApiUrl + "tracks/" + trackId)
      .then(response => {
        cb(null, response.data.message);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static getTrackAlbumArtByTrackId(trackId) {
    let trackAlbumArtURI = ApiUrl + "tracks/" + trackId + "/albumArt?t=" + new Date().getTime();
    return trackAlbumArtURI;
  }
}

export default TrackApi;
