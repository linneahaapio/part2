import { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${WEATHER_API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        width={200}
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <h2>Weather in {country.capital}</h2>
      {weather && (
        <div>
          <p>Temperature {weather.main.temp} °C</p>
          <img
            width={100}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={`${country.capital} weather`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
