"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = [
  "Strategic",
  "Data-driven",
  "Growth-focused",
  "Technical",
  "Innovative",
  "Analytical",
  "Result-oriented",
  "Curious",
] as const;

// How long each word is visible (ms)
const INTERVAL_MS = 2400;

export default function AnimatedHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 leading-snug">
      Hi, I&apos;m{" "}
      <span className="font-semibold text-white">Faris Zenunović</span>
      {" "}—{" "}a{" "}

      {/*
        Outer span reserves vertical space so layout never shifts.
        It must be `inline-block` with `overflow-hidden` so the
        exiting word slides out without expanding the line height.
      */}
      <span
        className="relative inline-block align-bottom overflow-hidden"
        style={{ minWidth: "1ch" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            initial={{ opacity: 0, y: "60%", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: "0%",  filter: "blur(0px)" }}
            exit={{    opacity: 0, y: "-55%", filter: "blur(4px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "inline-block",
              "font-semibold",
              // Gradient text
              "bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400",
              "bg-clip-text text-transparent",
              // Soft glow via drop-shadow (works on gradient text)
              "[filter:drop-shadow(0_0_12px_rgba(20,184,166,0.55))]",
            ].join(" ")}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {" "}SEO Specialist.
    </p>
  );
}
