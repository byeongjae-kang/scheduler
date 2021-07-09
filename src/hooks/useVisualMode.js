const { useState } = require("react");


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    const newHistory = replace ? history.slice(0, -1) : history;
    setHistory([...newHistory, newMode]);
  }
  
  function back() {
    if (history.length >= 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)])
    }
  }
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}