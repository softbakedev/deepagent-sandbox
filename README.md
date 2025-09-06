# Weather App

A full-stack weather application with React frontend and Node.js backend, providing current weather and 7-day forecasts.

## Features

- 🔍 **City Search**: Search for weather in any city worldwide
- 🌡️ **Current Weather**: Real-time temperature, humidity, and wind data
- 📅 **7-Day Forecast**: Extended weather forecast with daily highs and lows
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast API**: Efficient backend with caching
- 🧪 **Tested**: Unit tests for both frontend and backend

## Architecture

```
weather-app/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherSearch.js
│   │   │   └── WeatherDisplay.js
│   │   ├── App.js
│   │   └── index.js
│   └── public/
├── backend/           # Node.js Express API
│   ├── server.js
│   └── server.test.js
└── .github/workflows/ # CI/CD pipelines
    ├── ci-cd.yml
    └── release.yml
```

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Modern CSS** - Responsive design with glassmorphism
- **Fetch API** - HTTP client for backend communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Open-Meteo API** - Weather data provider
- **CORS** - Cross-origin resource sharing

### DevOps
- **GitHub Actions** - CI/CD automation
- **Jest** - Testing framework
- **Supertest** - API testing

## API Integration

The app integrates with [Open-Meteo](https://open-meteo.com/), a free weather API that provides:
- Current weather conditions
- 7-day forecasts
- Geocoding for city names
- No API key required

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:3001
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   # App runs on http://localhost:3000
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Testing

**Backend tests:**
```bash
cd backend
npm test
```

**Frontend tests:**
```bash
cd frontend
npm test
```

### Production Build

**Build frontend:**
```bash
cd frontend
npm run build
```

**Start production backend:**
```bash
cd backend
npm start
```

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-06T10:43:05.123Z"
}
```

### GET /api/weather?city={cityName}
Get weather data for a specific city.

**Parameters:**
- `city` (required) - City name (e.g., "London", "New York")

**Response:**
```json
{
  "location": "London, United Kingdom",
  "current": {
    "temperature": 15.2,
    "apparentTemperature": 14.1,
    "humidity": 82,
    "weatherCode": 3,
    "windSpeed": 12.5
  },
  "forecast": [
    {
      "date": "2025-01-06",
      "maxTemp": 16.8,
      "minTemp": 12.1,
      "weatherCode": 61
    }
    // ... 6 more days
  ]
}
```

## Weather Codes

The app uses Open-Meteo weather codes:
- 0: Clear sky
- 1: Mainly clear
- 2: Partly cloudy
- 3: Overcast
- 45, 48: Fog
- 51, 53, 55: Drizzle
- 61, 63, 65: Rain
- 71, 73, 75: Snow
- 80, 81, 82: Rain showers
- 95, 96, 99: Thunderstorm

## CI/CD Pipeline

The project includes automated workflows:

### Continuous Integration
- Runs tests on every push and PR
- Tests both frontend and backend
- Uploads test coverage reports
- Security scanning with Trivy

### Release Pipeline
- Triggers on version tags (e.g., v1.0.0)
- Builds production artifacts
- Creates GitHub releases
- Uploads deployment packages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.