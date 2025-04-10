import { useEffect, useRef, useState } from "react";

function ReverseTimer({ onTimeUp }) {
  const [seconds, setSeconds] = useState(150);
  const intervalRef = useRef(null);

  useEffect(() => {
    reverseTimer();

    return () => clearInterval(intervalRef.current);
  }, []);

  const reverseTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatOfTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="timer">
      <h1>{formatOfTimer(seconds)}</h1>
    </div>
  );
}

export default ReverseTimer;
