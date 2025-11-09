
import type { TimeLeft } from '../types';

export const calculateTimeLeft = (expiration: Date): TimeLeft | null => {
  const difference = +expiration - +new Date();
  
  if (difference <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
  };
};

export const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};
