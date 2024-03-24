//API Key for OpenWeather API
const API_KEY = process.env.REACT_APP_API_KEY;

//API base URL by OpenWeather to get longitude and latitude data from a location query
class GeoCodingAPI {
  async fetch(query) {
    const result = await fetch(
      `${process.env.REACT_APP_GEO_CODING_BASE_API}?q=${query}&limit=1&appid=${API_KEY}`
    );
    const data = await result.json();
    return data.length === 0 ? null : data;
  }
}

//API base URL by OpenWeather to get weather data based on longitude and latitude data
class WeatherAPI {
  async fetch(lat, lon) {
    const result = await fetch(
      `${process.env.REACT_APP_OPENWEATHER_BASE_API}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await result.json();
    return data.cod !== 200 ? null : data;
  }
}

export { GeoCodingAPI, WeatherAPI };
