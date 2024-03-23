import { getFormattedDateTime } from '../class/SearchHistoryEntry'
import { GeoCodingAPI, WeatherAPI } from './API'

export default async function searchWeathers(query) {
  // Fetch the coordinate of the location in query for the weather API.
  const dataCoordinate = await new GeoCodingAPI().fetch(query)

  if (dataCoordinate === null) {
    throw new Error('Location not found.')
  } else {
    // Extract lat lon data from geocoding api for the weather API.
    const location = dataCoordinate[0]
    const locationName = location.name
    const [lat, lon] = [location.lat, location.lon]

    // Call weather API
    const dataWeather = await new WeatherAPI().fetch(lat, lon)
    if (dataWeather === null) {
      throw new Error(`Weather data unavailable for ${locationName}`)
    } else {
      if (dataWeather.weather.length !== 0) {
        // Location and country
        const locationAndCountry = `${locationName}, ${dataWeather.sys.country}`
        dataWeather.locationName = locationAndCountry

        // Date time formatted
        const formattedDateTime = getFormattedDateTime()
        dataWeather.dateTime = formattedDateTime

        // Save the query for history entry
        dataWeather.query = query

        return dataWeather
      }
    }
  }

  return null
}
