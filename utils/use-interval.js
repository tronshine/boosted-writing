import { useState } from 'react';

const useInterval = (init_time, interval_step) => {
  const [intervall, setIntervall] = useState(null);

  const [time, setTime] = useState(init_time);

  const initInterval = () => {
    setTime(init_time);
  };

  const startInterval = () => {
    const interval = intervall || setInterval(
      () => setTime(time => Math.max(time - interval_step, 0)),
      interval_step
    );
    setIntervall(interval);
  };
  
  const stopInterval = () => {
    clearInterval(intervall);
    setIntervall(null);
  };

  return [time, initInterval, startInterval, stopInterval];
};

export default useInterval;