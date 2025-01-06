import  { useState, useEffect } from 'react';
import axios from 'axios';

const UserLocationCountry = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountry = async (latitude:any, longitude:any) => {
      try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
          params: {
            q: `${latitude}+${longitude}`,
            key: "7abc0dd2d312441a9c2cc89a634adcaa",
          },
        });
        const country = response.data.results[0].components.country;
        setCountry(country);
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
            fetchCountry(latitude, longitude);
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
    return <p>Error fetching country: {error.message}</p>;
  }

  return (
    <div>
      <p>{country}</p>
    </div>
  );
};

export default UserLocationCountry;