const API_KEY = '638bffd9569966bf90363d4598dba1cd'

class GeoCodingAPI {
  async fetch(query) {
    const result = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
    )
    const data = await result.json()
    return data.length === 0 ? null : data
  }
}

class WeatherAPI {
  async fetch(lat, lon) {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    const data = await result.json()
    return data.cod !== 200 ? null : data
  }
}

export { GeoCodingAPI, WeatherAPI }
