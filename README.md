# Weather Application 🌤️

A complete full-stack weather application built with React frontend and Node.js backend, featuring city search and 7-day weather forecasts.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + CSS Modules
- **Backend**: Node.js + Express + TypeScript  
- **API**: Open-Meteo weather service integration
- **CI/CD**: GitHub Actions with security scanning

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development  
```bash
cd backend
npm install
npm run dev
```

### Full Application
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

Visit: http://localhost:3000

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test

# With coverage
npm run test:coverage
```

### Integration Testing
```bash
# Start backend first
cd backend && npm run dev

# Test API endpoints
curl http://localhost:3001/health
curl "http://localhost:3001/api/weather?city=London"
```

## 📦 Production Build

### Frontend Build
```bash
cd frontend
npm run build
# Output: dist/ directory
```

### Backend Build
```bash
cd backend  
npm run build
npm start
# Output: dist/ directory, runs on port 3001
```

## 🔧 API Endpoints

### Health Check
```
GET /health
```

### Weather Data
```
GET /api/weather?city={cityName}
```

Example:
```bash
curl "http://localhost:3001/api/weather?city=London"
```

## 🌟 Features

### UI Components
- **CitySearch**: Form-based city search with validation
- **CurrentWeather**: Real-time weather display with icons
- **WeeklyForecast**: 7-day forecast grid with detailed info
- **Responsive Design**: Mobile-first CSS with modern styling

### Backend Services  
- **WeatherService**: Open-Meteo API integration
- **Geocoding**: City name to coordinates conversion
- **Error Handling**: Comprehensive validation and responses
- **CORS Support**: Cross-origin request handling

### DevOps Features
- **CI Pipeline**: Multi-platform testing (Node 18/20/22)
- **Security Scanning**: Trivy vulnerability scanning
- **Code Coverage**: Codecov integration
- **Release Pipeline**: Automated builds and GitHub releases
- **Docker Support**: Multi-architecture container builds

## 🔒 Security

- **Helmet.js**: Security headers
- **CORS**: Configured origin restrictions
- **Input Validation**: API request validation
- **Dependency Auditing**: Automated security checks
- **Vulnerability Scanning**: Trivy filesystem scanning

## 📊 Project Structure

```
weather-app/
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API communication  
│   │   ├── types/            # TypeScript interfaces
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   └── server.ts
│   ├── package.json  
│   └── tsconfig.json
└── .github/workflows/        # CI/CD pipelines
```

## 🌍 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001/api
```

### Backend (.env)
```bash
PORT=3001
NODE_ENV=development
```

## 📈 Performance

- **Frontend**: Vite for fast development and optimized builds
- **Backend**: Express.js for efficient API handling  
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression for API responses

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push branch: `git push origin feature/my-feature`
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Open-Meteo**: Free weather API service
- **React Team**: Amazing frontend framework
- **Node.js Community**: Excellent backend ecosystem
- **GitHub Actions**: Powerful CI/CD platform

---

Built with ❤️ by the Weather Subagents Team