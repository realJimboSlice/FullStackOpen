import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const request = axios.get(weatherUrl);
  return request.then((response) => response.data);
};

export default { getWeather };
