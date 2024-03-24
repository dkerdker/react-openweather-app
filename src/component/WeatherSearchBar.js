import { motion } from "framer-motion";
import { useState } from "react";
import WeatherSearchButton from "./WeatherSearchButton";

export default function WeatherSearchBar({ onSearchComplete }) {
  const [query, setQuery] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(!isFocus);
  };

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  //reset search bar query
  function handleOnSearchComplete(dataWeather, apiMessage) {
    onSearchComplete(dataWeather, apiMessage);
    setQuery("");
  }

  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* search bar */}
      <form>
        <div className="SearchBar">
          <label
            className={`${isFocus ? "SearchLabel Focus" : "SearchLabel"}`}
            htmlFor="search"
          >
            Location
          </label>
          <input
            className={`${isFocus ? "SearchInput Focus" : "SearchInput"}`}
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

          {/* call search button component, sharing with search buttons in entries in WeatherSearchHistory */}
          <WeatherSearchButton
            query={query}
            onSearchComplete={handleOnSearchComplete}
          />
        </div>
      </form>
    </motion.div>
  );
}
