import { motion, AnimatePresence } from "framer-motion";
import WeatherSearchButton from "./WeatherSearchButton";

export default function WeatherSearchHistoryComponent({
  searchHistoryEntries,
  onSearchComplete,
  onDeleteHistoryEntry,
}) {
  return (
    <div className="HistoryContainer">
      <div className="HistoryTitle">Search History</div>
      <AnimatePresence>
        {searchHistoryEntries.map((history) => {
          const { id, locationName, dateTime, query } = history;

          const animations = {
            initial: { y: -10, scale: 0.5, opacity: 0 },
            animate: { y: 0, scale: 1, opacity: 1 },
            exit: { y: 0, scale: 0.5, opacity: 0 },
            transition: { stiffness: 400, damping: 50 },
          };
          return (
            <motion.div
              {...animations}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 50 },
              }}
              className="HistoryEntry"
              key={id}
            >
              <div className="HistoryDetails">
                <div>{locationName}</div>
                <div className="WeatherDateTime">{dateTime}</div>
              </div>
              <div className="HistoryControls">
                {/* call search button component, sharing with search button in WeatherSearchBar */}
                <WeatherSearchButton
                  query={query}
                  onSearchComplete={onSearchComplete}
                />

                {/* delete button */}
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400, damping: 50 },
                  }}
                  className="RoundButton"
                  onClick={() => onDeleteHistoryEntry(id)}
                >
                  <img
                    className="ImageIcon"
                    src={`${process.env.PUBLIC_URL}/delete.png`}
                    alt="Delete"
                  />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
