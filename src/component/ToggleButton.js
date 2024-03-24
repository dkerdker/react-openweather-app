import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./ToggleButton.scss";

export default function ToggleButton({ onClick, children }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="SwitcherContainer">
      <label className="Label">{children}</label>
      <div
        className="Switcher"
        data-ison={isOn}
        onClick={() => {
          setIsOn(!isOn);
          onClick();
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            className="Handler"
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
