import './App.css'
import './assets/fonts.css'

import WeatherSearchBar from './component/WeatherSearchBar'
import WeatherBoard from './component/WeatherBoard'
import WeatherDetails from './component/WeatherDetails'
import WeatherSearchHistory from './component/WeatherSearchHistory'
import ToggleButton from './component/ToggleButton'
import { SearchHistoryEntry } from './component/class/SearchHistoryEntry'

import { useState, useEffect } from 'react'

function App() {
  let localStorageSearchHistory = JSON.parse(
    localStorage.getItem('searchHistory')
  )
  if (localStorageSearchHistory == null) localStorageSearchHistory = []

  const [currentWeather, setCurrentWeather] = useState(null)
  const [searchHistoryEntries, setSearchHistoryEntries] = useState(
    localStorageSearchHistory
  )
  const [currentHistoryId, setCurrentHistoryId] = useState(
    Math.max(
      ...localStorageSearchHistory.map((history) => Number(history.id) + 1),
      0
    )
  )
  const [searchErrorMessage, setSearchErrorMessage] = useState('')

  // Light / Dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  // App Title
  useEffect(() => {
    document.title = 'Merquri Weather'
  }, [])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryEntries))
  }, [searchHistoryEntries])

  function handleOnSearchComplete(dataWeather, apiMessage) {
    if (dataWeather !== null) {
      // Set current weather
      // console.log(dataWeather)
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

      // Clear API Error
      setSearchErrorMessage('')
    } else {
      // API Error
      setSearchErrorMessage(apiMessage)
    }
  }

  function handleOnDeleteHistoryEntry(historyId) {
    // Delete search history
    setSearchHistoryEntries(
      searchHistoryEntries.filter((entry) => entry.id !== historyId)
    )
  }

  return (
    <div className={('App', isDarkMode ? 'DarkMode' : '')}>
      <div className="App-container">
        <div className="DarkModeToggle">
          <ToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? 'Dark' : 'Light'}
          </ToggleButton>
        </div>
        <WeatherSearchBar onSearchComplete={handleOnSearchComplete} />
        {searchErrorMessage && (
          <div className="SearchError">{searchErrorMessage}</div>
        )}
        {searchHistoryEntries && searchHistoryEntries.length > 0 && (
          <WeatherBoard>
            <WeatherDetails currentWeather={currentWeather} />
            <WeatherSearchHistory
              searchHistoryEntries={searchHistoryEntries}
              onSearchComplete={handleOnSearchComplete}
              onDeleteHistoryEntry={handleOnDeleteHistoryEntry}
            />
          </WeatherBoard>
        )}
      </div>
    </div>
  )
}

export default App
