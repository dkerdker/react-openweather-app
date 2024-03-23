import { motion } from 'framer-motion'
import { useState } from 'react'
import WeatherSearchButton from './WeatherSearchButton'

export default function WeatherSearchBar({ onSearchComplete }) {
  const [query, setQuery] = useState('')

  const [isFocus, setIsFocus] = useState(false)
  const handleFocus = () => {
    setIsFocus(!isFocus)
  }

  function handleQueryChange(e) {
    setQuery(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form>
        <div className="SearchBar">
          <label
            className={`${isFocus ? 'SearchLabel Focus' : 'SearchLabel'}`}
            htmlFor="search"
          >
            Location
          </label>
          <input
            className={`${isFocus ? 'SearchInput Focus' : 'SearchInput'}`}
            type="text"
            id="search"
            placeholder="Enter city, country, or region..."
            value={query}
            onChange={handleQueryChange}
            onFocus={handleFocus}
            onBlur={handleFocus}
            autoComplete="off"
            autoFocus
          />
          <WeatherSearchButton
            query={query}
            onSearchComplete={onSearchComplete}
          />
        </div>
      </form>
    </motion.div>
  )
}
