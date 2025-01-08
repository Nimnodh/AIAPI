import  { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude:any, longitude:any) => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            appid: '1694ab79037c4ecd40723f024ba74257',
            units: 'metric',
          },
        });
        setWeather(response.data);
        setLoading(false);
      } catch (error:any) {
        setError(error);
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error:any) => {
            setError(error);
            setLoading(false);
          }
        );
      } else {
        setError(new Error('Geolocation is not supported by this browser.'));
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p>Error fetching weather: {error.message}</p>;
  }

  return (
    <div>
      <h1>Current Weather</h1>
      {weather && (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;