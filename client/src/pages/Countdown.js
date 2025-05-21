import React, { useState, useRef, useEffect } from "react";

function Countdown() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00:00");

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  };

  const format = (num) => (num < 10 ? "0" + num : num);

  const startTimer = (endTime) => {
    const { total, days, hours, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      setTimer(
        `${format(days)}:${format(hours)}:${format(minutes)}:${format(seconds)}`
      );
    } else {
      clearInterval(Ref.current);
    }
  };

  const clearTimer = (endTime) => {
    if (Ref.current) clearInterval(Ref.current);
    startTimer(endTime); // update immediately
    Ref.current = setInterval(() => startTimer(endTime), 1000);
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 100000); // ~1 day 3 hours
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => clearInterval(Ref.current); // cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h3>Countdown Timer</h3>
      <h2>{timer}</h2>
      <button onClick={() => clearTimer(getDeadTime())}>Reset</button>
    </div>
  );
}

export default Countdown;