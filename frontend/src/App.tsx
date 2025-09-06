import React, { useState } from 'react'
import CitySearch from './components/CitySearch'
import CurrentWeather from './components/CurrentWeather'
import WeeklyForecast from './components/WeeklyForecast'
import { WeatherData } from './types/weather'
import { getWeather } from './services/weatherApi'
import './index.css'

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCitySearch = async (city: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await getWeather(city)
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Weather App</h1>
        <p>Search for current weather and 7-day forecast</p>
      </header>
      
      <div className="weather-container">
        <CitySearch onSearch={handleCitySearch} loading={loading} />
        
        {error && <div className="error">{error}</div>}
        
        {loading && <div className="loading">Fetching weather data...</div>}
        
        {weatherData && !loading && (
          <>
            <CurrentWeather data={weatherData.current} city={weatherData.city} />
            <WeeklyForecast forecast={weatherData.daily} />
          </>
        )}
      </div>
    </div>
  )
}

export default App