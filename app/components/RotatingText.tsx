"use client";

import { useEffect, useState } from "react";

interface RotatingTextProps {
  words: string[];
}

export default function RotatingText({ words }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentIndex];

    // Fully typed: hold the word, then start deleting
    if (!isDeleting && displayed.length === currentWord.length) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pauseTimer);
    }

    // Fully deleted: move on to the next word
    if (isDeleting && displayed.length === 0) {
      const nextTimer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 45);
      return () => clearTimeout(nextTimer);
    }

    const timer = setTimeout(
      () => setDisplayed(isDeleting ? displayed.slice(0, -1) : currentWord.slice(0, displayed.length + 1)),
      isDeleting ? 45 : 80,
    );
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, currentIndex, words]);

  return (
    <span className="text-teal-400 font-semibold">
      {/* Screen readers get the full list once instead of a stream of letters */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{displayed}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-teal-400 ml-[2px] align-middle animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
