class SearchHistoryEntry {
  constructor(id, locationName, dateTime, query) {
    this.id = id
    this.locationName = locationName
    this.dateTime = dateTime
    this.query = query
  }
}

function getFormattedDateTime() {
  const date = new Date()
  const timeString = date
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
  return `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${timeString}`
}

export { SearchHistoryEntry, getFormattedDateTime }
