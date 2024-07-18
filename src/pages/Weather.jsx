import React, { useState} from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // State for handling errors
  const [isCelsius, setIsCelsius] = useState(true); // State to track temperature unit

  const fetchWeather = async () => {
    if (city.trim() === '' || city === null){
      setError('No city entered.');
      return;
    }
    try {
      const response = await axios.get(`https://weatherappbackendapi.azurewebsites.net/api/weather/${city}`);
      setWeatherData(response.data);
      setError(null); // Reset error state if successful response
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch data.'); // Set error message
      setWeatherData(null); // Reset weather data on error
    }
  };

  const changeUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const convertTemperature = (temperature) => {
    if (isCelsius) {
      return temperature;
    } else {
      return (temperature * 9) / 5 + 32; // Celsius to Fahrenheit conversion formula
    }
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather Forecast</h2>
      <div className="input-container">
        <label className="input-label">
          Enter City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
        </label>
        <button onClick={fetchWeather} className="my-button" id="fetch-button">
          Get Weather
        </button>
      </div>

      <div className="weather-info">
        {!error && weatherData && (
          <>
            <h3 className="city-name">Weather in {weatherData.name}</h3>
            <p className="temperature" id='temp'>
              Temperature: {convertTemperature(weatherData.main.temp)}°
              {isCelsius ? 'C' : 'F'}
            </p>
            <p className="temperature" id='feels_like'>
              Feels Like: {convertTemperature(weatherData.main.feels_like)}°
              {isCelsius ? 'C' : 'F'}
            </p>
            <p className="temperature" id='humidity'>
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="weather-description">
              Weather: {weatherData.weather[0].description}
            </p>
          </>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        <button onClick={changeUnit} className="my-button" id="unit-button">
          Change Unit
        </button>
      </div>
    </div>
  );
};

export default Weather;
