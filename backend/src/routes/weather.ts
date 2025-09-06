import express from 'express'
import { WeatherService } from '../services/WeatherService.js'

const router = express.Router()
const weatherService = new WeatherService()

router.get('/weather', async (req, res) => {
  try {
    const { city } = req.query

    if (!city || typeof city !== 'string') {
      return res.status(400).json({ 
        error: 'City parameter is required',
        example: '/api/weather?city=London'
      })
    }

    const weatherData = await weatherService.getWeatherByCity(city)
    res.json(weatherData)
    
  } catch (error) {
    console.error('Weather API error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('City not found')) {
        return res.status(404).json({ error: error.message })
      }
      if (error.message.includes('Rate limit')) {
        return res.status(429).json({ error: error.message })
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export { router as weatherRouter }