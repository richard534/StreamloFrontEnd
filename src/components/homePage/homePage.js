import React from 'react';
import toastr from 'toastr';
import SearchCity from './searchCity';
import Chart from './chart';
import TrackApi from 'api/trackApi';

class Home extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          citySearchString: "Belfast",
          trackResults: [],
          resultsCityHeader: "Belfast"
      }

      this.setCitySearchStringState = this.setCitySearchStringState.bind(this);
      this.onSearchSubmit = this.onSearchSubmit.bind(this);

      this.onSearchSubmit();
  }

  setCitySearchStringState(event) { // Handles user input, refreshes DOM every key press
    var value = event.target.value;
    this.state.citySearchString = value;
    return this.setState({searchString: this.state.searchString});
  }

  onSearchSubmit(e) {
    if(e){
      e.preventDefault();
    }

    let cityName = this.state.citySearchString;

    TrackApi.getCityChartByName(cityName, (err, result) => {
      if(err) {
        toastr.error(err);
        return;
      }
      this.setState({ trackResults: result });
      this.setState({ resultsCityHeader: cityName});
    });
  }

  render() {
    return (
      <div>
         <SearchCity onChange={this.setCitySearchStringState}
             searchString={this.state.citySearchString}
             onSearchSubmit={this.onSearchSubmit} />
         <Chart trackResults={this.state.trackResults}
             resultsHeader={this.state.resultsCityHeader} />
      </div>
    );
  }
}

export default Home;
