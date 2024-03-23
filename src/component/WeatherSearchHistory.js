import WeatherSearchButton from './WeatherSearchButton'

export default function WeatherSearchHistoryComponent({
  searchHistoryEntries,
  onSearchComplete,
  onDeleteHistoryEntry,
}) {
  function deleteHistoryEntry(historyId) {
    onDeleteHistoryEntry(historyId)
  }

  return (
    <div style={{ backgroundColor: 'blue' }}>
      {searchHistoryEntries.map((history) => (
        <div key={history.id}>
          {history.id}
          {history.locationName} {history.dateTime}
          <WeatherSearchButton
            query={history.query}
            onSearchComplete={onSearchComplete}
          />
          <button onClick={() => deleteHistoryEntry(history.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
