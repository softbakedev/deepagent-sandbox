const request = require('supertest');
const app = require('./server');

describe('Weather API', () => {
  describe('GET /api/health', () => {
    it('should return OK status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/weather/search', () => {
    it('should require location parameter', async () => {
      const response = await request(app)
        .get('/api/weather/search')
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Location parameter is required');
    });

    it('should return location search results', async () => {
      const response = await request(app)
        .get('/api/weather/search?location=London')
        .expect(200);
      
      expect(response.body).toHaveProperty('results');
    }, 10000); // Increased timeout for API call
  });

  describe('GET /api/weather/forecast', () => {
    it('should require latitude and longitude parameters', async () => {
      const response = await request(app)
        .get('/api/weather/forecast')
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Latitude and longitude parameters are required');
    });

    it('should return weather forecast data', async () => {
      const response = await request(app)
        .get('/api/weather/forecast?latitude=51.5074&longitude=-0.1278')
        .expect(200);
      
      expect(response.body).toHaveProperty('daily');
      expect(response.body).toHaveProperty('current');
    }, 10000); // Increased timeout for API call
  });
});