import searchWeathers from './utility/search'

export default function WeatherSearchButton({ query, onSearchComplete }) {
  async function onSearchClicked(e) {
    e.preventDefault()
    try {
      // Fetch weather API
      const dataWeather = await searchWeathers(query)

      // Pass back up to App to update current weather and record history entry
      onSearchComplete(dataWeather)
    } catch (e) {
      // Error
    }
  }

  return <button onClick={onSearchClicked}>Search</button>
}
