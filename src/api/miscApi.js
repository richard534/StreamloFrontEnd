/* global __API_DOMAIN__ */
const ApiProtocol = process.env.BACKEND_API_PROTOCOL;
const ApiDomainName = process.env.BACKEND_API_DOMAIN_NAME;
const ApiPort = process.env.BACKEND_API_PORT;
const ApiUrl = ApiProtocol + ApiDomainName + ":" + ApiPort + "/";

import axios from "axios";

class MiscApi {
  static getBelfastImageUrl() {
    let belfastImgUrl = "https://s3.eu-west-2.amazonaws.com/streamlo/static/belfast1.jpg";
    return belfastImgUrl;
  }

  static getDerryImageUri() {
    let derryImgUrl = "https://s3.eu-west-2.amazonaws.com/streamlo/static/derry.jpg";
    return derryImgUrl;
  }

  static getNoSearchResultsImgUri() {
    let noSearchResultsImgUrl = "https://s3.eu-west-2.amazonaws.com/streamlo/static/noResultsSearch.png";
    return noSearchResultsImgUrl;
  }

  static getStreamloLogoImgUri() {
    let streamloLogoImgUrl = "https://s3.eu-west-2.amazonaws.com/streamlo/static/StreamloWithAlpha.png";
    return streamloLogoImgUrl;
  }

  static getAltAlbumArtImgUri() {
    let altAlbumArtImgUrl = "https://s3.eu-west-2.amazonaws.com/streamlo/static/defaultAlbumArt.png";
    return altAlbumArtImgUrl;
  }
}

export default MiscApi;
