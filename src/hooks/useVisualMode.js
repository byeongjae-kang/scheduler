const { useState } = require("react");

//set and store modes in array and return them accordingly
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  //set mode or replace existing mode with new one
  const transition = (newMode, replace = false) => {
    const newHistory = replace ? history.slice(0, -1) : history;
    setHistory([...newHistory, newMode]);
  };

  //remove last mode
  const back = () => {
    if (history.length >= 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}
