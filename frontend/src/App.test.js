import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');
const mockedAxios = axios;

describe('Weather App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders weather app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Weather App v3/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter city name.../i);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('searches for locations when button is clicked', async () => {
    const mockSearchResponse = {
      data: {
        results: [
          {
            name: 'London',
            country: 'United Kingdom',
            admin1: 'England',
            latitude: 51.5074,
            longitude: -0.1278
          }
        ]
      }
    };

    mockedAxios.get.mockResolvedValueOnce(mockSearchResponse);

    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/Enter city name.../i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/weather/search?location=London');
    });

    await waitFor(() => {
      expect(screen.getByText('Select a location:')).toBeInTheDocument();
      expect(screen.getByText('London')).toBeInTheDocument();
    });
  });

  test('fetches weather data when location is selected', async () => {
    const mockSearchResponse = {
      data: {
        results: [
          {
            name: 'London',
            country: 'United Kingdom',
            admin1: 'England',
            latitude: 51.5074,
            longitude: -0.1278
          }
        ]
      }
    };

    const mockWeatherResponse = {
      data: {
        current: {
          temperature_2m: 20,
          weather_code: 1,
          wind_speed_10m: 10,
          wind_direction_10m: 180
        },
        daily: {
          time: ['2023-01-01', '2023-01-02'],
          temperature_2m_max: [22, 24],
          temperature_2m_min: [18, 16],
          weather_code: [1, 2],
          precipitation_sum: [0, 2],
          wind_speed_10m_max: [15, 12]
        }
      }
    };

    mockedAxios.get
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(mockWeatherResponse);

    render(<App />);
    
    const searchInput = screen.getByPlaceholderText(/Enter city name.../i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    const locationItem = screen.getByText('London');
    fireEvent.click(locationItem);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        '/api/weather/forecast?latitude=51.5074&longitude=-0.1278'
      );
    });

    await waitFor(() => {
      expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('7-Day Forecast')).toBeInTheDocument();
    });
  });
});