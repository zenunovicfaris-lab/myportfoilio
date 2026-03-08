'use client';

import { useEffect, useRef } from 'react';

export function useClickSound() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/click.mp3');
    audioRef.current.volume = 0.6; // malo tiši
    audioRef.current.preload = 'auto';
  }, []);

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // restart zvuka
      audioRef.current.play().catch(() => {}); // ignore autoplay errors
    }
  };

  return playClick;
}
