import React from 'react';

function WeatherDisplay({ data }) {
  if (!data) return null;

  const { current, forecast, location } = data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeatherDescription = (weatherCode) => {
    // Weather code descriptions from Open-Meteo
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[weatherCode] || 'Unknown';
  };

  return (
    <div>
      <div className="current-weather">
        <h2>{location}</h2>
        <div className="current-temp">{Math.round(current.temperature)}°C</div>
        <div className="current-description">
          {getWeatherDescription(current.weatherCode)}
        </div>
        <div>Feels like {Math.round(current.apparentTemperature)}°C</div>
        <div>Humidity: {current.humidity}%</div>
        <div>Wind: {Math.round(current.windSpeed)} km/h</div>
      </div>

      <h3>7-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-date">{formatDate(day.date)}</div>
            <div className="forecast-temps">
              <div>{Math.round(day.maxTemp)}°C</div>
              <div style={{ opacity: 0.7 }}>{Math.round(day.minTemp)}°C</div>
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              {getWeatherDescription(day.weatherCode)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;