"use client";

import { motion } from "framer-motion";

export default function BackgroundNoise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Animated grain overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        animate={{
          backgroundImage: [
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          ],
        }}
        transition={{ duration: 8, ease: "linear" }}
        style={{ willChange: "background-image" }}
      />
      
      {/* Subtle animated light orbs */}
      <motion.div
        className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[15%] bottom-[25%] h-[250px] w-[250px] rounded-full bg-indigo-500/5"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.06, 0.04, 0.06],
        }}
        transition={{ duration: 7, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-purple-500/4"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.07, 0.04],
        }}
        transition={{ duration: 5, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_5px)]" />
    </div>
  );
}
