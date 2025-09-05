# Weather App Implementation Guide

## 🎯 Quick Setup Instructions

This guide provides the exact steps to implement the complete weather application designed by our specialized development teams.

## 📁 Project Structure Setup

Create the following directory structure in your project:

```
weather-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   ├── CitySearch.tsx
│   │   │   ├── CitySearch.module.css
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── CurrentWeather.module.css
│   │   │   ├── WeeklyForecast.tsx
│   │   │   └── WeeklyForecast.module.css
│   │   ├── services/
│   │   │   └── weatherApi.ts
│   │   ├── types/
│   │   │   └── weather.ts
│   │   ├── App.tsx
│   │   ├── App.module.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── jest.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── weather.ts
│   │   ├── services/
│   │   │   └── openMeteoService.ts
│   │   ├── types/
│   │   │   └── weather.ts
│   │   ├── __tests__/
│   │   │   └── weather.test.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
└── .github/
    └── workflows/
        ├── ci.yml
        └── release.yml
```

## ⚡ Quick Implementation

### Step 1: Initialize Projects

**Frontend:**
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

**Backend:**
```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv axios
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon jest @types/jest ts-jest eslint
```

### Step 2: Copy Implementation Files

All implementation code has been provided by our specialized teams:

1. **UI Developer Team**: Complete React frontend with TypeScript, CSS Modules, and unit tests
2. **Backend Developer Team**: Node.js API with OpenMeteo integration and Jest testing
3. **DevOps Team**: GitHub Actions CI/CD pipelines with security scanning

### Step 3: Configuration Files

**Frontend vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

**Backend tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Step 4: Scripts Setup

**Frontend package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint src --ext ts,tsx"
  }
}
```

**Backend package.json scripts:**
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  }
}
```

## 🚀 Running the Application

### Development Mode

1. **Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
```

2. **Start Frontend:**
```bash
cd frontend  
npm run dev
# Client runs on http://localhost:5173
```

### Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Run linting
npm run lint
```

### Production Build

```bash
# Build frontend
cd frontend && npm run build

# Build backend  
cd backend && npm run build

# Start production
cd backend && npm start
```

## 🔧 Key Features Implemented

### Frontend Features
- ✅ City search with form validation
- ✅ Current weather display with temperature, humidity, wind
- ✅ 7-day forecast with high/low temperatures
- ✅ Responsive CSS Modules styling
- ✅ Loading states and error handling
- ✅ TypeScript interfaces for type safety
- ✅ Unit tests with Jest + React Testing Library

### Backend Features  
- ✅ Express.js server with CORS enabled
- ✅ OpenMeteo API integration (geocoding + forecast)
- ✅ `/api/weather?city=` endpoint
- ✅ Comprehensive error handling
- ✅ Health check endpoint at `/health`
- ✅ TypeScript with strict mode
- ✅ Jest unit tests with mocking

### DevOps Features
- ✅ GitHub Actions CI pipeline with matrix builds
- ✅ Automated testing and linting
- ✅ Security scanning with Trivy
- ✅ Coverage reporting with Codecov
- ✅ Release pipeline with Docker builds
- ✅ Multi-platform artifact generation

## 📖 API Usage

**Test the API:**
```bash
# Health check
curl http://localhost:3001/health

# Weather data
curl "http://localhost:3001/api/weather?city=London"
curl "http://localhost:3001/api/weather?city=New%20York"
```

**Response Format:**
```json
{
  "city": "London",
  "country": "United Kingdom",
  "coordinates": { "latitude": 51.5074, "longitude": -0.1278 },
  "current": {
    "temperature": 20.5,
    "windSpeed": 10.2,
    "weatherCode": 0,
    "time": "2023-12-01T12:00"
  },
  "forecast": {
    "time": ["2023-12-01T13:00"],
    "temperature": [21.0],
    "precipitation": [0.0],
    "weatherCode": [0]
  }
}
```

## 🔐 Environment Setup

**Backend .env (optional):**
```env
PORT=3001
NODE_ENV=development
```

## 📋 Troubleshooting

### Common Issues

1. **CORS Errors**: Backend includes CORS middleware for cross-origin requests
2. **API Failures**: OpenMeteo API is free and requires no key
3. **Build Errors**: Ensure all dependencies are installed with `npm ci`
4. **Test Failures**: Run `npm test` to verify all tests pass

### Verification Steps

1. ✅ Backend starts on port 3001
2. ✅ Frontend starts on port 5173  
3. ✅ Health endpoint responds: `GET /health`
4. ✅ Weather endpoint works: `GET /api/weather?city=London`
5. ✅ Frontend loads and can search for weather
6. ✅ All tests pass in both frontend and backend

## 🎉 Success Criteria

Your weather application is fully functional when:

- [x] Users can search for any city
- [x] Current weather displays with temperature and conditions
- [x] 7-day forecast shows in responsive grid
- [x] Error handling works for invalid cities  
- [x] Loading states provide user feedback
- [x] All unit tests pass
- [x] CI/CD pipeline runs successfully
- [x] Production builds complete without errors

## 📞 Support

This implementation was created by specialized development teams:
- **UI Team**: React frontend with TypeScript and testing
- **Backend Team**: Node.js API with OpenMeteo integration  
- **DevOps Team**: Complete CI/CD pipeline with security scanning

All code is production-ready with comprehensive testing, type safety, and modern development practices.