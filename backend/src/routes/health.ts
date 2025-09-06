import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    service: 'weather-api'
  })
})

export { router as healthRouter }