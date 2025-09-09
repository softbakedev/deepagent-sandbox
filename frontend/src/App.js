import React, { useState } from 'react';
import axios from 'axios';

const WEATHER_CODES = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '⛈️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '❄️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocations = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/weather/search?location=${encodeURIComponent(searchTerm)}`);
      setLocations(response.data.results || []);
    } catch (err) {
      setError('Failed to search locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectLocation = async (location) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `/api/weather/forecast?latitude=${location.latitude}&longitude=${location.longitude}`
      );
      
      setCurrentWeather(response.data.current);
      setForecast(response.data.daily);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherInfo = (code) => {
    return WEATHER_CODES[code] || { description: 'Unknown', icon: '❓' };
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather App v3</h1>
        <p>Get 7-day weather forecasts for any location</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchLocations()}
        />
        <button 
          className="search-button" 
          onClick={searchLocations}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {locations.length > 0 && !selectedLocation && (
        <div className="location-results">
          <h3>Select a location:</h3>
          {locations.map((location, index) => (
            <div
              key={index}
              className="location-item"
              onClick={() => selectLocation(location)}
            >
              <strong>{location.name}</strong>
              {location.admin1 && `, ${location.admin1}`}
              {location.country && `, ${location.country}`}
            </div>
          ))}
        </div>
      )}

      {currentWeather && selectedLocation && (
        <div className="current-weather">
          <h2>{selectedLocation.name}, {selectedLocation.country}</h2>
          <div className="current-temp">
            {Math.round(currentWeather.temperature_2m)}°C
          </div>
          <div style={{ fontSize: '2rem', margin: '10px 0' }}>
            {getWeatherInfo(currentWeather.weather_code).icon}
          </div>
          <p>{getWeatherInfo(currentWeather.weather_code).description}</p>
          
          <div className="current-details">
            <div className="detail-item">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">{currentWeather.wind_speed_10m} km/h</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Wind Direction</div>
              <div className="detail-value">{currentWeather.wind_direction_10m}°</div>
            </div>
          </div>
        </div>
      )}

      {forecast && (
        <div className="forecast-container">
          <h3>7-Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.time.map((date, index) => (
              <div key={index} className="forecast-day">
                <div className="forecast-date">
                  {formatDate(date)}
                </div>
                <div style={{ fontSize: '1.5rem', margin: '10px 0' }}>
                  {getWeatherInfo(forecast.weather_code[index]).icon}
                </div>
                <div className="forecast-temps">
                  <span className="temp-max">
                    {Math.round(forecast.temperature_2m_max[index])}°
                  </span>
                  <span className="temp-min">
                    {Math.round(forecast.temperature_2m_min[index])}°
                  </span>
                </div>
                <div className="forecast-details">
                  <div>💧 {forecast.precipitation_sum[index]}mm</div>
                  <div>💨 {Math.round(forecast.wind_speed_10m_max[index])} km/h</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;