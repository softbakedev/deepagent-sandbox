import fetch from 'node-fetch'

interface GeocodeResult {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

interface OpenMeteoCurrentWeather {
  temperature_2m: number
  relative_humidity_2m: number
  wind_speed_10m: number
  wind_direction_10m: number
  weather_code: number
  is_day: number
}

interface OpenMeteoHourlyWeather {
  temperature_2m: number[]
  relative_humidity_2m: number[]
  wind_speed_10m: number[]
  wind_direction_10m: number[]
  weather_code: number[]
  is_day: number[]
}

interface OpenMeteoDailyWeather {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
  precipitation_probability_max: number[]
  wind_speed_10m_max: number[]
}

interface WeatherData {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    windDirection: number
    weatherCode: number
    description: string
    isDay: boolean
  }
  daily: Array<{
    date: string
    temperatureMax: number
    temperatureMin: number
    weatherCode: number
    description: string
    precipitationProbability: number
    windSpeed: number
  }>
}

export class WeatherService {
  private readonly GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
  private readonly WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

  private getWeatherDescription(weatherCode: number): string {
    const descriptions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    }
    return descriptions[weatherCode] || 'Unknown'
  }

  private async geocodeCity(city: string): Promise<GeocodeResult> {
    const url = `${this.GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`)
    }

    const data = await response.json() as { results?: GeocodeResult[] }
    
    if (!data.results || data.results.length === 0) {
      throw new Error(`City not found: ${city}`)
    }

    return data.results[0]
  }

  private async fetchWeatherData(latitude: number, longitude: number, timezone: string) {
    const url = new URL(this.WEATHER_URL)
    url.searchParams.set('latitude', latitude.toString())
    url.searchParams.set('longitude', longitude.toString())
    url.searchParams.set('timezone', timezone)
    url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day')
    url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,wind_speed_10m_max')
    url.searchParams.set('forecast_days', '7')

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json() as {
      current: OpenMeteoCurrentWeather
      daily: OpenMeteoDailyWeather
    }

    return data
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    // Get coordinates for the city
    const location = await this.geocodeCity(city)
    
    // Fetch weather data
    const weatherData = await this.fetchWeatherData(
      location.latitude,
      location.longitude,
      location.timezone
    )

    // Transform the data to our format
    return {
      city: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
      current: {
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        windDirection: weatherData.current.wind_direction_10m,
        weatherCode: weatherData.current.weather_code,
        description: this.getWeatherDescription(weatherData.current.weather_code),
        isDay: weatherData.current.is_day === 1
      },
      daily: weatherData.daily.time.map((date, index) => ({
        date: date,
        temperatureMax: weatherData.daily.temperature_2m_max[index],
        temperatureMin: weatherData.daily.temperature_2m_min[index],
        weatherCode: weatherData.daily.weather_code[index],
        description: this.getWeatherDescription(weatherData.daily.weather_code[index]),
        precipitationProbability: weatherData.daily.precipitation_probability_max[index] || 0,
        windSpeed: weatherData.daily.wind_speed_10m_max[index]
      }))
    }
  }
}