import React from 'react'
import { CurrentWeatherData } from '../types/weather'
import styles from './CurrentWeather.module.css'

interface CurrentWeatherProps {
  data: CurrentWeatherData
  city: string
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, city }) => {
  const getWeatherIcon = (weatherCode: number, isDay: boolean) => {
    const iconMap: Record<number, string> = {
      0: isDay ? '☀️' : '🌙',
      1: isDay ? '🌤️' : '🌙',
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.city}>📍 {city}</h2>
        <div className={styles.mainWeather}>
          <div className={styles.iconTemp}>
            <span className={styles.icon}>
              {getWeatherIcon(data.weatherCode, data.isDay)}
            </span>
            <span className={styles.temperature}>{Math.round(data.temperature)}°C</span>
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>💧</span>
          <span className={styles.detailLabel}>Humidity</span>
          <span className={styles.detailValue}>{data.humidity}%</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>💨</span>
          <span className={styles.detailLabel}>Wind Speed</span>
          <span className={styles.detailValue}>{data.windSpeed} km/h</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>🧭</span>
          <span className={styles.detailLabel}>Wind Direction</span>
          <span className={styles.detailValue}>{data.windDirection}°</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather