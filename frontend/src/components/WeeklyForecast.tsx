import React from 'react'
import { DailyWeatherData } from '../types/weather'
import styles from './WeeklyForecast.module.css'

interface WeeklyForecastProps {
  forecast: DailyWeatherData[]
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  const getWeatherIcon = (weatherCode: number) => {
    const iconMap: Record<number, string> = {
      0: '☀️',
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌫️',
      51: '🌦️',
      53: '🌦️',
      55: '🌦️',
      61: '🌧️',
      63: '🌧️',
      65: '🌧️',
      71: '🌨️',
      73: '🌨️',
      75: '🌨️',
      95: '⛈️',
    }
    return iconMap[weatherCode] || '🌤️'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>📅 7-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.forecastCard}>
            <div className={styles.date}>{formatDate(day.date)}</div>
            <div className={styles.icon}>{getWeatherIcon(day.weatherCode)}</div>
            <div className={styles.description}>{day.description}</div>
            <div className={styles.temperature}>
              <span className={styles.high}>{Math.round(day.temperatureMax)}°</span>
              <span className={styles.low}>{Math.round(day.temperatureMin)}°</span>
            </div>
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span>🌧️ {day.precipitationProbability}%</span>
              </div>
              <div className={styles.detailRow}>
                <span>💨 {day.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast