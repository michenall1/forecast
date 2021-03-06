/**
 * Created by bowenliu on 2017/5/7.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import _ from 'lodash';
import GoogleMap from '../components/google_map'


class WeatherList extends Component {
  renderWeather = (cityData) => {
    const name = cityData.city.name;
    const temp = _.map(cityData.list.map(weather => weather.main.temp),temps => temps - 273);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const {lat, lon} = cityData.city.coord;


    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat}/></td>
        <td><Chart data={temp} color='orange' units="C"/></td>
        <td><Chart data={pressure} color='green' units="hPa"/></td>
        <td><Chart data={humidity} color='pink' units="%"/></td>
      </tr>
    )
  };

  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr>
          <th>City</th>
          <th>Temperature (C)</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
        </tr>
        </thead>
        <tbody>
        {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

// function mapStateToProps(state) {
//   const weather = state.weather;
//   return {weather: state.weather}
// }     ES6 syntax

function mapStateToProps({weather}) {
  return {weather}
}

export default connect(mapStateToProps)(WeatherList)