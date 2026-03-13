"use client";

/**
 * AnimatedWords.tsx
 * Pure CSS + vanilla DOM — zero Framer Motion, zero hydration errors.
 *
 * HOW HYDRATION IS AVOIDED:
 *  • Server renders an empty <span suppressHydrationWarning>.
 *  • React never tries to reconcile that span's children.
 *  • useEffect fills it in after first client paint — fully safe.
 */

import { useEffect, useRef } from "react";

// ─── Edit these ───────────────────────────────────────────────────────────────

const WORDS = [
  "Strategic",
  "Data-driven",
  "Growth-focused",
  "Technical",
  "Innovative",
  "Analytical",
  "Result-oriented",
  "Curious",
];

const INTERVAL_MS  = 2400; // how long each word is shown
const ANIM_MS      = 480;  // must match CSS transition-duration below

// ─── Keyframe CSS (injected once into <head>) ─────────────────────────────────

const STYLES = `
  .aw-rotator {
    display: inline-block;
    vertical-align: bottom;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    min-width: 4ch;
  }

  /* Each word spans full parent width so baseline stays stable */
  .aw-word {
    display: inline-block;
    font-weight: 600;

    /* Teal → Cyan gradient */
    background: linear-gradient(90deg, #14b8a6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    /* Glow */
    filter: drop-shadow(0 0 12px rgba(20, 184, 166, 0.6));

    /* Start position: below the container, blurred, invisible */
    opacity: 0;
    transform: translateY(60%);
    filter: blur(8px) drop-shadow(0 0 12px rgba(20, 184, 166, 0.6));
    transition:
      opacity     ${ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
      transform   ${ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
      filter      ${ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Word is fully visible at rest */
  .aw-word.aw-active {
    opacity: 1;
    transform: translateY(0%);
    filter: drop-shadow(0 0 12px rgba(20, 184, 166, 0.6));
  }

  /* Exit: slide up and fade out */
  .aw-word.aw-leaving {
    opacity: 0;
    transform: translateY(-55%);
    filter: blur(6px) drop-shadow(0 0 12px rgba(20, 184, 166, 0));
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnimatedWords() {
  const rotatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Inject styles once (idempotent — skips if already present)
    if (!document.getElementById("aw-styles")) {
      const tag = document.createElement("style");
      tag.id = "aw-styles";
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }

    const rotator = rotatorRef.current;
    if (!rotator) return;

    let current = 0;

    // Helper: create a word span
    const makeWord = (text: string) => {
      const el = document.createElement("span");
      el.className = "aw-word";
      el.textContent = text;
      return el;
    };

    // 2. Mount first word already in "active" state (no enter animation on load)
    const first = makeWord(WORDS[0]);
    first.classList.add("aw-active");
    rotator.appendChild(first);

    // 3. Cycle: exit current → enter next
    const cycle = () => {
      const active = rotator.querySelector<HTMLElement>(".aw-active");
      if (!active) return;

      // Trigger exit animation
      active.classList.remove("aw-active");
      active.classList.add("aw-leaving");

      // After exit finishes: remove old, show next
      setTimeout(() => {
        active.remove();

        current = (current + 1) % WORDS.length;
        const next = makeWord(WORDS[current]);
        rotator.appendChild(next);

        // Force reflow so transition fires correctly
        // (reading offsetWidth flushes pending style recalculations)
        void next.offsetWidth;

        next.classList.add("aw-active");
      }, ANIM_MS);
    };

    const id = setInterval(cycle, INTERVAL_MS);
    return () => {
      clearInterval(id);
      // Clean rotator on unmount so React HMR stays clean
      if (rotator) rotator.innerHTML = "";
    };
  }, []);

  return (
    <p className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 leading-snug">
      Hi, I&apos;m{" "}
      <span className="font-semibold text-white">Faris Zenunović</span>
      {" — "}a{" "}

      {/*
        suppressHydrationWarning tells React: "the server sent this empty,
        don't panic if the client has different children here."
        We manage this span's DOM entirely in useEffect — React never touches it.
      */}
      <span
        ref={rotatorRef}
        className="aw-rotator"
        suppressHydrationWarning
      />

      {" "}SEO Specialist &amp; Growth Partner.
    </p>
  );
}
