import React from 'react';
import toastr from 'toastr';
import SearchCity from './searchCity';
import Chart from './chart';

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

        var self = this;
        if(self.state.citySearchString.length > 0){
            return $.ajax({
              type: "get",
              url: 'http://localhost:3001/tracks/' + self.state.citySearchString + '/chart',
              dataType: 'json',
              success: function(result) {
                  if(result.length > 0) {
                      self.setState({ trackResults: result });
                      self.setState({ resultsCityHeader: self.state.citySearchString});
                  } else {
                      toastr.error('Enter Valid City (Belfast or Derry)');
                  }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  // console.log(textStatus + ": " + errorThrown);
              }
            });
        }
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
