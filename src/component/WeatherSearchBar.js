import { useState } from 'react'

import WeatherSearchButton from './WeatherSearchButton'

export default function WeatherSearchBar({ onSearchComplete }) {
  const [query, setQuery] = useState('')

  function handleQueryChange(e) {
    setQuery(e.target.value)
  }

  return (
    <form>
      <label>Query:</label>
      <input type="text" value={query} onChange={handleQueryChange}></input>
      <WeatherSearchButton query={query} onSearchComplete={onSearchComplete} />
    </form>
  )
}
