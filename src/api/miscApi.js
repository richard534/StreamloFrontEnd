/* global __API_DOMAIN__ */
const ApiProtocol = process.env.BACKEND_API_PROTOCOL;
const ApiDomainName = process.env.BACKEND_API_DOMAIN_NAME;
const ApiPort = process.env.BACKEND_API_PORT;
const ApiUrl = ApiProtocol + ApiDomainName + ":" + ApiPort + "/";

import axios from "axios";

class MiscApi {
  static getBelfastImageUrl() {
    let belfastImgUrl = ApiUrl + "static/belfast1.jpg";
    return belfastImgUrl;
  }

  static getDerryImageUrl() {
    let derryImgUrl = ApiUrl + "static/derry.jpg";
    return derryImgUrl;
  }

  static getNoSearchResultsImgUrl() {
    let noSearchResultsImgUrl = ApiUrl + "static/noResultsSearch.png";
    return noSearchResultsImgUrl;
  }

  static getStreamloLogoImgUrl() {
    let streamloLogoImgUrl = ApiUrl + "static/StreamloWithAlpha.png";
    return streamloLogoImgUrl;
  }

  static getAltAlbumArtImgUrl() {
    let altAlbumArtImgUrl = ApiUrl + "static/defaultalbumart.png";
    return altAlbumArtImgUrl;
  }
}

export default MiscApi;
