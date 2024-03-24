import "./App.css";
import "./assets/fonts.css";

import WeatherSearchBar from "./component/WeatherSearchBar";
import WeatherBoard from "./component/WeatherBoard";
import WeatherDetails from "./component/WeatherDetails";
import WeatherSearchHistory from "./component/WeatherSearchHistory";
import ToggleButton from "./component/ToggleButton";
import { SearchHistoryEntry } from "./component/class/SearchHistoryEntry";

import { useState, useEffect, useRef } from "react";

function App() {
  //retrieve existing search history data in localstorage if any into a variable
  let localStorageSearchHistory = JSON.parse(
    localStorage.getItem("searchHistory")
  );
  //if not let variable be an empty array
  if (localStorageSearchHistory == null) localStorageSearchHistory = [];

  //currentWeather state starting out as null
  const [currentWeather, setCurrentWeather] = useState(null);
  //searchHistoryEntries state starting out as localStorageSearchHistory variable
  const [searchHistoryEntries, setSearchHistoryEntries] = useState(
    localStorageSearchHistory
  );

  //key id handling for history entries
  const currentHistoryId = useRef(
    Math.max(
      ...localStorageSearchHistory.map((history) => Number(history.id)),
      0
    )
  );

  useEffect(() => {
    currentHistoryId.current++;
  }, [currentWeather]);

  //error handling state if invalid search
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  //light mode / dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  //App title on render
  useEffect(() => {
    document.title = "Merquri Weather";
  }, []);

  //save to localstorage every time a state searchHistoryEntries make a change
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryEntries));
  }, [searchHistoryEntries]);

  //function that returns new history entries data on search complete
  function handleOnSearchComplete(dataWeather, apiMessage) {
    if (dataWeather !== null) {
      //set current weather
      setCurrentWeather(dataWeather);

      //add to search history
      setSearchHistoryEntries((entries) => {
        const newHistoryEntries = [
          new SearchHistoryEntry(
            currentHistoryId.current,
            dataWeather.locationName,
            dataWeather.dateTime,
            dataWeather.query
          ),
          ...entries,
        ];
        return newHistoryEntries;
      });

      //clear API error once successfully setCurrentWeather&setSearchHistoryEntries
      setSearchErrorMessage("");
    } else {
      //API Error
      setSearchErrorMessage(apiMessage);
    }
  }

  //function for delete by filtering by historyId
  function handleOnDeleteHistoryEntry(historyId) {
    //delete search history
    setSearchHistoryEntries(
      searchHistoryEntries.filter((entry) => entry.id !== historyId)
    );
  }

  return (
    <div className={("App", isDarkMode ? "DarkMode" : "")}>
      <div className="App-container">
        {/* toggle for dark mode */}
        <div className="DarkModeToggle">
          <ToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "Dark" : "Light"}
          </ToggleButton>
        </div>

        {/* App title */}
        {currentWeather == null && (
          <h1 className="MerquriTitle">Merquri Weathers</h1>
        )}

        <WeatherSearchBar onSearchComplete={handleOnSearchComplete} />
        {/* conditional rendering for error message */}
        {searchErrorMessage && (
          <div className="SearchError">{searchErrorMessage}</div>
        )}

        {/* conditional rendering for displaying WeatherBoard UI otherwise only render WeatherSearchBar */}
        {(currentWeather ||
          (searchHistoryEntries && searchHistoryEntries.length > 0)) && (
          <WeatherBoard>
            <WeatherDetails currentWeather={currentWeather} />

            {/* conditional rendering for displaying WeatherSearchHistory UI */}
            {searchHistoryEntries && searchHistoryEntries.length > 0 && (
              <WeatherSearchHistory
                searchHistoryEntries={searchHistoryEntries}
                onSearchComplete={handleOnSearchComplete}
                onDeleteHistoryEntry={handleOnDeleteHistoryEntry}
              />
            )}
          </WeatherBoard>
        )}
      </div>
    </div>
  );
}

export default App;
