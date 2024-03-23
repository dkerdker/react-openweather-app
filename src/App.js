import './App.css'
import './assets/fonts.css'

import WeatherSearchBar from './component/WeatherSearchBar'
import WeatherBoard from './component/WeatherBoard'
import WeatherDetails from './component/WeatherDetails'
import WeatherSearchHistory from './component/WeatherSearchHistory'
import { SearchHistoryEntry } from './component/class/SearchHistoryEntry'

import { useState } from 'react'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [searchHistoryEntries, setSearchHistoryEntries] = useState([])
  const [currentHistoryId, setCurrentHistoryId] = useState(0)

  function handleOnSearchComplete(dataWeather) {
    if (dataWeather !== null) {
      // Set current weather
      console.log(dataWeather)
      setCurrentWeather(dataWeather)

      // Add to search history
      setSearchHistoryEntries((entries) => {
        const newHistoryEntries = [
          new SearchHistoryEntry(
            currentHistoryId,
            dataWeather.locationName,
            dataWeather.dateTime,
            dataWeather.query
          ),
          ...entries,
        ]
        setCurrentHistoryId(currentHistoryId + 1)
        return newHistoryEntries
      })
    }
  }

  function handleOnDeleteHistoryEntry(historyId) {
    // Delete search history
    setSearchHistoryEntries(
      searchHistoryEntries.filter((entry) => entry.id !== historyId)
    )
  }

  return (
    <div className="App">
      <div className="App-container">
        <WeatherSearchBar onSearchComplete={handleOnSearchComplete} />
        <WeatherBoard>
          <WeatherDetails currentWeather={currentWeather} />
          <WeatherSearchHistory
            searchHistoryEntries={searchHistoryEntries}
            onSearchComplete={handleOnSearchComplete}
            onDeleteHistoryEntry={handleOnDeleteHistoryEntry}
          />
        </WeatherBoard>
      </div>
    </div>
  )
}

export default App
