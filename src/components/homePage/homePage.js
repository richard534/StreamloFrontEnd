import React from "react";
import toastr from "toastr";
import update from "immutability-helper";

import SearchCity from "./searchCity";
import Chart from "./chart";
import TrackApi from "api/trackApi";
import UserApi from "api/userApi";
import MiscApi from "api/miscApi";

let derryImg = MiscApi.getDerryImageUri();
let belfastImg = MiscApi.getBelfastImageUrl();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      citySearchString: "Belfast",
      trackResults: [],
      resultsCityHeader: "Belfast"
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchSubmit();
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;

    var newState = update(this.state, {
      [name]: {
        $set: target.value
      }
    });

    this.setState(newState);
  }

  onSearchSubmit(e) {
    if (e) e.preventDefault();

    let cityName = this.state.citySearchString;

    TrackApi.getCityChartByName(cityName, (err, result) => {
      if (err) {
        toastr.error(err);
        return;
      }
      result.map(track => {
        UserApi.getUserByUserId(track.uploaderId, (err, user) => {
          track.fullURL = "track/" + user.userURL + "/" + track.trackURL;
          this.setState({
            trackResults: result,
            resultsCityHeader: cityName
          });
        });
      });
    });
  }

  render() {
    let divStyle;
    if (this.state.resultsCityHeader == "Derry") {
      divStyle = {
        backgroundImage: "url(" + derryImg + ")"
      };
    } else {
      divStyle = {
        backgroundImage: "url(" + belfastImg + ")"
      };
    }

    return (
      <div>
        <SearchCity
          handleChange={this.handleChange}
          searchString={this.state.citySearchString}
          onSearchSubmit={this.onSearchSubmit}
          cityImg={divStyle}
        />
        <Chart trackResults={this.state.trackResults} resultsHeader={this.state.resultsCityHeader} />
      </div>
    );
  }
}

export default Home;
