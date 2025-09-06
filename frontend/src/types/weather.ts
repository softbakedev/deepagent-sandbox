export interface CurrentWeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  weatherCode: number
  description: string
  isDay: boolean
}

export interface DailyWeatherData {
  date: string
  temperatureMax: number
  temperatureMin: number
  weatherCode: number
  description: string
  precipitationProbability: number
  windSpeed: number
}

export interface WeatherData {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeatherData
  daily: DailyWeatherData[]
}