import { useState, useEffect } from "react";
import WeatherService from "../services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);
  const lat = country.latlng[0];
  const lon = country.latlng[1];

  useEffect(() => {
    WeatherService.getWeather(lat, lon)
      .then((weatherData) => {
        console.log("Weather successfully fetched");
        setWeather(weatherData);
      })
      .catch((err) => {
        console.log("OpenWeather API call error", err);
      });
  }, [lat, lon]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Official name: {country.name.official}</p>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>Flag:</p> <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>
            Average wind speed: {Math.round(weather.wind.speed * 10) / 10} m/s
          </p>
          {weather.wind.gust !== undefined && (
            <p>
              Average wind gust: {Math.round(weather.wind.gust * 10) / 10} m/s
            </p>
          )}
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Country;
