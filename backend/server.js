const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache for geocoding results (simple implementation)
const geocodeCache = new Map();

// Helper function to geocode city names to coordinates
async function geocodeCity(cityName) {
  // Check cache first
  if (geocodeCache.has(cityName.toLowerCase())) {
    return geocodeCache.get(cityName.toLowerCase());
  }

  try {
    // Use Open-Meteo's geocoding API
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }

    const result = {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name,
      country: data.results[0].country
    };

    // Cache the result
    geocodeCache.set(cityName.toLowerCase(), result);
    return result;
  } catch (error) {
    throw new Error(`Failed to geocode city: ${error.message}`);
  }
}

// Helper function to fetch weather data from Open-Meteo
async function fetchWeatherData(latitude, longitude) {
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    // Geocode the city name to get coordinates
    const location = await geocodeCity(city);
    
    // Fetch weather data using the coordinates
    const weatherData = await fetchWeatherData(location.latitude, location.longitude);

    // Transform the data to a more frontend-friendly format
    const response = {
      location: `${location.name}, ${location.country}`,
      current: {
        temperature: weatherData.current.temperature_2m,
        apparentTemperature: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        weatherCode: weatherData.current.weather_code,
        windSpeed: weatherData.current.wind_speed_10m
      },
      forecast: weatherData.daily.time.map((date, index) => ({
        date: date,
        maxTemp: weatherData.daily.temperature_2m_max[index],
        minTemp: weatherData.daily.temperature_2m_min[index],
        weatherCode: weatherData.daily.weather_code[index]
      }))
    };

    res.json(response);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch weather data' 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});

module.exports = app;