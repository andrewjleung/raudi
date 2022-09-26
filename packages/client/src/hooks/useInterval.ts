import { useEffect, useRef } from 'react';

// Credit: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default (callback: () => void, delay: number, shouldPoll: boolean) => {
  const savedCallback = useRef<typeof callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (shouldPoll) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, shouldPoll]);
};
