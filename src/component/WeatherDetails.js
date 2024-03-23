export default function WeatherDetailsComponent({ currentWeather }) {
  return (
    currentWeather && (
      <div style={{ backgroundColor: 'red' }}>
        <div>Today's Weather</div>
        <div>{Math.round(currentWeather.main.temp)}°</div>
        <div>
          H:{Math.round(currentWeather.main.temp_max)}° L:
          {Math.round(currentWeather.main.temp_min)}°
        </div>
        <div>{currentWeather.locationName}</div>
        <div>{currentWeather.dateTime}</div>
        <div>Humidity {Math.round(currentWeather.main.humidity)}%</div>
        <div>{currentWeather.weather[0].description}</div>
      </div>
    )
  )
}
