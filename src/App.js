import { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

class App extends Component {
  state = {
    coords: {
      latitude: 45,
      longitude: 60
    },
    data: {}
  }

  //Getting Device location
  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ coords: newCoords });

        //APi Call
        axios.get(`http://api.weatherstack.com/current?access_key=025fc26d1d1ef93ce9d21c96c38f9be7&query=${this.state.coords.latitude},${this.state.coords.longitude}`)
          .then(res => {

            let weatherData = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              img: res.data.current.weather_icons
            }

            this.setState({ data: weatherData });

          })
      })
    } else {
      console.log('not supported')
    }
  }
  render() {
    return (
      <div className="App">
        <h2>React Weather App</h2>
      </div>
    );
  }
}

export default App;
