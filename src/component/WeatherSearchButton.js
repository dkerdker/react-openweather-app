import { motion } from 'framer-motion'
import searchWeather from './utility/Search'

export default function WeatherSearchButton({ query, onSearchComplete }) {
  async function onSearchClicked(e) {
    e.preventDefault()
    if (query) {
      let dataWeather = null
      let apiMessage = 'OK'
      try {
        // Fetch weather API
        dataWeather = await searchWeather(query)
      } catch (e) {
        // API Error
        apiMessage = e.message
      }

      // Pass back up to App to update current weather and record history entry
      onSearchComplete(dataWeather, apiMessage)
    }
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        transition: { type: 'spring', stiffness: 400, damping: 50 },
      }}
      className="WeatherSearchButton"
      onClick={onSearchClicked}
    >
      <img
        className="ImageIcon"
        src={`${process.env.PUBLIC_URL}/search.png`}
        alt="Search"
      />
    </motion.button>
  )
}
