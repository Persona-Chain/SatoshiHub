import { useEffect, useState } from 'react';

const INITIAL_NOW = Date.now();

export const useNodeClock = () => {
  const [now, setNow] = useState(INITIAL_NOW);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
};
