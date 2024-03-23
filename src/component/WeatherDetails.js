import './Weather.scss'

export default function WeatherDetailsComponent({ currentWeather }) {
  if (currentWeather !== null) {
    const temp = Math.round(currentWeather.main.temp)
    const temp_max = Math.round(currentWeather.main.temp_max)
    const temp_min = Math.round(currentWeather.main.temp_min)
    const locationName = currentWeather.locationName
    const dateTime = currentWeather.dateTime
    const humidity = Math.round(currentWeather.main.humidity)
    const description = currentWeather.weather[0].description

    function WeatherImage(description) {
      let image_url = 'suncloud.png'

      if (description) {
        if (description.includes('cloud')) {
          if (description === 'few clouds') {
            image_url = 'suncloud.png'
          } else {
            image_url = 'cloud.png'
          }
        } else if (description.includes('rain')) {
          image_url = 'rain.png'
        } else if (description.includes('clear')) {
          image_url = 'sun.png'
        }
      }

      return process.env.PUBLIC_URL + '/' + image_url
    }

    return (
      <div className="DetailsContainer">
        <div className="DetailsLeft">
          <p>Today's Weather</p>
          <p className="WeatherDegree">{temp}°</p>
          <p>
            H:{temp_max}° L:{temp_min}°
          </p>
          <p className="WeatherDetailsLeft TextBold">{locationName}</p>
        </div>

        <div className="DetailsRight">
          <div className="WeatherDetailsRight">
            <p>{dateTime}</p>
            <p>Humidity: {humidity}%</p>
            <p className="TextCapitalize">{description}</p>
          </div>
        </div>

        <img

          className="DetailsImage"
          src={WeatherImage(description)}
          alt="WeatherDescription"
        />
      </div>
    )
  }
}
