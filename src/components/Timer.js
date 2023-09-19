import React, { useEffect, useState } from 'react';

const Timer = ({ moveToNextQuestion }) => {
  const [secondsLeft, setSecondsLeft] = useState(15);

  // Added moveToNextQuestion in the dependency array
  useEffect(() => {
    const timerID = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timerID);
          moveToNextQuestion();
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [moveToNextQuestion]);  // <-- Commented change: added moveToNextQuestion as a dependency

  return (
    <div>
      {secondsLeft} seconds left
    </div>
  );
};

export default Timer;
