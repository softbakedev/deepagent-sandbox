# Weather App v3

A modern weather application with 7-day forecasts, built with React frontend and Node.js backend, powered by Open-Meteo API.

## 🌟 Features

- **Location Search**: Find weather for any city worldwide
- **Current Weather**: Real-time weather conditions with detailed information
- **7-Day Forecast**: Extended weather predictions with daily highs/lows
- **Responsive Design**: Beautiful UI that works on all devices
- **Open Source API**: Uses Open-Meteo for accurate weather data

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/softbakedev/deepagent-sandbox.git
   cd deepagent-sandbox
   git checkout feature/weather-app-v3
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The API will be available at `http://localhost:3001`

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```
   The app will open at `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

### Search Locations
```
GET /api/weather/search?location={city_name}
```

### Get Weather Forecast
```
GET /api/weather/forecast?latitude={lat}&longitude={lng}
```

### Health Check
```
GET /api/health
```

## 🏗️ Architecture

- **Frontend**: React 18 with modern hooks and functional components
- **Backend**: Express.js API server proxying Open-Meteo data  
- **Styling**: Custom CSS with responsive design
- **Testing**: Jest for backend, React Testing Library for frontend
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📦 Project Structure

```
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── tests/
│       └── api.test.js     # API tests
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.test.js     # Component tests
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Styles
│   ├── public/
│   │   └── index.html      # HTML template
│   └── package.json        # Frontend dependencies
├── workflows/
│   └── ci-cd.yml           # GitHub Actions workflow
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🌐 Data Source

Weather data provided by [Open-Meteo](https://open-meteo.com/) - a free weather API for non-commercial use.