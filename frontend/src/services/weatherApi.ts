import { WeatherData } from '../types/weather'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:3001/api'

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }
  
  const data = await response.json()
  return data
}