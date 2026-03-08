"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    
    const handleMouseMove = (e: PointerEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, [reduce]);

  const bg1 = useMotionTemplate`radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.18), transparent 50%)`;
  const bg2 = useMotionTemplate`radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167,139,250,0.15), transparent 55%)`;
  const bg3 = useMotionTemplate`radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.12), transparent 45%)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Multi-layer spotlight glow */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: reduce ? undefined : bg1 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: reduce ? undefined : bg2 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: reduce ? undefined : bg3 }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_40%,transparent_0%,rgba(0,0,0,0.3)_70%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
