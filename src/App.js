import { useEffect, useState } from 'react';
import './styles/NavBar.scss';
import './styles/App.css';
import { fetchWeather } from './components/FetchWeather';

const App = () => {

  const [query, setQuery] = useState('Manila');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery('');
    }
  }

  useEffect(() => {
    const onloading = async () => {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
    onloading();
  }, [])

  return (
    <div className="main-container ">
      <div className="mb-3 text-center">
        <h4 className="app-name">Weather<sup>2</sup> Lang</h4>
        <p className="app-develop text-light">Developed by <strong>Kurt</strong></p>
      </div>
      <input type="text" className="search text-center" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      {weather.main && (
        <div className="city container">
          <div className="row">
            <div className="col-lg-6 col-md-12 pt-4 text-center">
              <h2 className="city-name text-center">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p className="weather-description text-center">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 pt-3">
              <p className="highlight-title text-center">Today's Highlights</p>
              <hr />
              <div className="highlights row pt-3">
                <div className="col">
                  <div className="mb-5 text-center">
                    <p className="highlight-info">Min Temp.</p>
                    <h3 className="highlight-value">{weather.main.temp_min}<sup>&deg;C</sup></h3>
                  </div>
                  <div className="mb-3 text-center">
                    <p className="highlight-info">Humidity</p>
                    <h3 className="highlight-value">{weather.main.humidity}<small>%</small></h3>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-5 text-center">
                    <p className="highlight-info">Max Temp.</p>
                    <h3 className="highlight-value">{weather.main.temp_max}<sup>&deg;C</sup></h3>
                  </div>
                  <div className="mb-3 text-center">
                    <p className="highlight-info">Wind</p>
                    <h3 className="highlight-value">{weather.wind.speed}<small>m/s</small></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
