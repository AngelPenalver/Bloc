import { useState, useEffect } from 'react';

const useTimer = (initialState: number) => {
  const [timer, setTimer] = useState<number>(initialState);
  const [start, setStart] = useState<boolean>(false);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (start && timer > 0) {
      setResend(false);
      interval = setInterval(() => {
        setTimer((prevTimer: number) => prevTimer - 1);
      }, 1000);
    }
    if (timer <= 0) {
      setResend(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, timer]);

  return { timer, setTimer, setStart, resend, setResend };
};

export default useTimer;
