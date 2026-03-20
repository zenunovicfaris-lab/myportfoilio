"use client";

import { useEffect, useState } from "react";

interface RotatingTextProps {
  words: string[];
}

export default function RotatingText({ words }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && displayed.length < currentWord.length) {
      const timer = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && displayed.length === currentWord.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayed.length > 0) {
      const timer = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 45);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }
  }, [displayed, isDeleting, isPaused, currentIndex, words]);

  return (
    <span className="text-teal-400 font-semibold">
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] bg-teal-400 ml-[2px] align-middle animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
