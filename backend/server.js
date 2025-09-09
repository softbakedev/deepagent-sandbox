const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Weather search endpoint - gets coordinates for location
app.get('/api/weather/search', async (req, res) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    const geocodingResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: location,
        count: 5,
        language: 'en',
        format: 'json'
      }
    });

    res.json(geocodingResponse.data);
  } catch (error) {
    console.error('Geocoding API error:', error.message);
    res.status(500).json({ error: 'Failed to search location' });
  }
});

// 7-day weather forecast endpoint
app.get('/api/weather/forecast', async (req, res) => {
  const { latitude, longitude } = req.query;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ 
      error: 'Latitude and longitude parameters are required' 
    });
  }

  try {
    const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_sum',
          'wind_speed_10m_max',
          'wind_direction_10m_dominant'
        ].join(','),
        current: [
          'temperature_2m',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m'
        ].join(','),
        timezone: 'auto',
        forecast_days: 7
      }
    });

    res.json(weatherResponse.data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});

module.exports = app;