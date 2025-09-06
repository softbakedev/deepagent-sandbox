# Weather Application Project

## Overview
A full-stack weather application with React frontend, Node.js backend, and CI/CD pipeline.

## Architecture
```
├── /frontend          # React UI application
│   ├── /src
│   │   ├── /components
│   │   ├── /services
│   │   └── /utils
│   └── package.json
├── /backend           # Node.js API server
│   ├── /src
│   │   ├── /routes
│   │   ├── /services
│   │   └── /utils
│   └── package.json
└── /.github/workflows # CI/CD pipeline
    ├── test.yml
    └── release.yml
```

## Features
- **Search**: Location-based weather search
- **7-Day Forecast**: Extended weather predictions
- **API Integration**: Open-Meteo weather service proxy
- **CI/CD**: Automated testing and deployment

## Development Teams
1. **UI Developer**: React frontend implementation
2. **Backend Developer**: Node.js API development
3. **DevOps Engineer**: CI/CD pipeline setup

## Getting Started
Each team will receive specific requirements and implementation guidelines.

## Tech Stack
- **Frontend**: React, TypeScript, CSS/SCSS
- **Backend**: Node.js, Express, TypeScript
- **API**: Open-Meteo Weather API
- **CI/CD**: GitHub Actions
- **Testing**: Jest, React Testing Library