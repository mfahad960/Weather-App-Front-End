import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Weather from './pages/Weather';
import axios from 'axios';

jest.mock('axios');

describe('Weather Component', () => {
  it('renders Weather component correctly', () => {
    render(<Weather />);
    const weatherTitle = screen.getByText('Weather Forecast');
    expect(weatherTitle).toBeInTheDocument();
  });
  
    it('renders Get Weather button', () => {
      render(<Weather />);
      const getWeatherButton = screen.getByText('Get Weather');
      expect(getWeatherButton).toBeInTheDocument();
    });
  
    it('renders Toggle Unit button', () => {
      render(<Weather />);
      const toggleUnitButton = screen.getByText('Toggle Unit');
      expect(toggleUnitButton).toBeInTheDocument();
    });
  })
  it('updates city state on input change', () => {
    render(<Weather />);
    const input = screen.getByLabelText('Enter City:');

    fireEvent.change(input, { target: { value: 'New York' } });

    expect(input.value).toBe('New York');
  });

  it('does not render weather info initially', () => {
    render(<Weather />);
    const cityName = screen.queryByText(/Weather in/);
    const temperature = screen.queryByText(/Temperature:/);
    const weatherDescription = screen.queryByText(/Weather:/);

    expect(cityName).toBeNull();
    expect(temperature).toBeNull();
    expect(weatherDescription).toBeNull();
  });
  


jest.mock('axios');

describe('Weather Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 

  it('displays error message when city input is empty on button click', async () => {
    render(<Weather />);
    const button = screen.getByText('Get Weather');

    fireEvent.click(button);

    const errorMessage = await screen.findByText('Failed to fetch data');
    expect(errorMessage).toBeInTheDocument();
  });

it('fetches weather data upon button click', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'Karachi',
        main: { temp: 25 },
        weather: [{ description: 'Cloudy' }],
      },
    });

    render(<Weather />);
    const input = screen.getByLabelText('Enter City:');
    const button = screen.getByText('Get Weather');

    fireEvent.change(input, { target: { value: 'Karachi' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/weather/Karachi');
    });

    // const cityName = screen.getByText("Weather in Karachi");
    // // // const temperature = screen.getByText('Temperature: 25°C');
    // const weatherDescription = screen.getByText('Weather: Cloudy');

    // expect(cityName).toBeInTheDocument();
    // // expect(temperature).toBeInTheDocument();
    // expect(weatherDescription).toBeInTheDocument();
  });

  
    it('handles error when fetching weather data', async () => {
      const errorMessage = 'Failed to fetch data';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
  
      render(<Weather />);
  
      const input = screen.getByLabelText('Enter City:');
      const button = screen.getByText('Get Weather');
  
      fireEvent.change(input, { target: { value: 'TestCity' } });
      fireEvent.click(button);
  
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/weather/TestCity');
      });
  
      const errorElement = await screen.findByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
    });
  
    
});

