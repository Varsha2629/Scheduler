import { useState } from "react";

const useVisualMode = (initial) => {
 
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      // history.pop();
      return setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    }
    setHistory((prev) => [...prev, mode]);
  };
  const back = () => {
    const updateHistory = [...history];
    if (updateHistory.length > 1) {
      updateHistory.pop();
      setHistory(updateHistory);
    }
    // setMode(updateHistory[updateHistory.length - 1]);
  };

  return { mode: history[history.length - 1], transition, back, history };
};

export default useVisualMode;
