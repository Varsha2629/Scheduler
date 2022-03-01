import { useState } from "react";

const useVisualMode = (initial) => {
  // const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
    }
    // setMode(mode);
    // console.log([...history, mode]);
    // setHistory([...history, mode]);
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
