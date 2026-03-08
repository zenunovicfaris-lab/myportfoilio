"use client";

import { useEffect, useRef } from "react";
import { useClickSound } from "../../src/hooks/useClickSound";

function isClickable(origin: Element): boolean {
  let node: Element | null = origin;

  while (node && node !== document.body) {
    // Hard stops - disabled or explicitly muted
    if ((node as HTMLButtonElement).disabled) return false;
    if (node.classList.contains("no-sound"))  return false;

    const tag = node.tagName.toLowerCase();
    const cls = node.getAttribute("class") ?? "";

    if (tag === "button")                           return true;
    if (tag === "a" && node.getAttribute("href"))   return true;
    if (cls.includes("cursor-pointer"))             return true;
    if (/\bhover:scale-/.test(cls))                 return true;

    node = node.parentElement;
  }

  return false;
}

export default function ClickSoundProvider() {
  const playClick  = useClickSound();
  const lastFired  = useRef(0);

  useEffect(() => {
    const DEBOUNCE_MS = 150;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const now = Date.now();
      if (now - lastFired.current < DEBOUNCE_MS) return;

      if (isClickable(target)) {
        lastFired.current = now;
        playClick();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [playClick]);

  return null;
}
