/* global __API_URL__ */
let ApiUrl = __API_URL__;

class TrackApi {
  static getCityChartByName(cityName, cb) {
    if(cityName.length > 0){
      return $.ajax({
        type: "get",
        url: ApiUrl + 'tracks/' + cityName + '/chart',
        dataType: 'json',
        success: function(result) {
          if(result.length > 0) {
            cb(null, result);
          } else {
            let err = 'Enter Valid City (Belfast or Derry)';
            cb(err);
          }
        }
      });
    }
  }
}

export default TrackApi;
