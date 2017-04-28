/* global __API_URL__ */

class TrackApi {
  static getCityChartByName(cityName, cb) {
    if(cityName.length > 0){
      return $.ajax({
        type: "get",
        url: __API_URL__ + 'tracks/' + cityName + '/chart',
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
