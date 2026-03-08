"use client";

import { motion } from "framer-motion";

const STEPS = [
  { t: "Audit", d: ["Technical baseline", "Gap analysis", "Priority matrix"] },
  { t: "Architecture", d: ["Content hub", "Internal links", "Topic clusters"] },
  { t: "Production", d: ["AI workflows", "Templates", "Quality gates"] },
  { t: "Amplification", d: ["Digital PR", "Entity signals", "Link velocity"] },
  { t: "Measurement", d: ["Rank tracking", "Revenue attribution", "Compound growth"] },
];

export default function Scene05Pipeline() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-[20%] top-[30%] h-[450px] w-[450px] rounded-full bg-cyan-500/10" />
        <div className="absolute right-[25%] bottom-[25%] h-[380px] w-[380px] rounded-full bg-purple-500/10" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Growth pipeline
            </h2>
            <p className="mt-4 text-gray-300/85 max-w-2xl">
              A cinematic workflow: each step is a trigger that unlocks the next layer of growth.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-5 [transform:perspective(1200px)]">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, rotateX: 8, rotateY: i % 2 ? -10 : 10 }}
                className="transform-gpu rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="text-[10px] tracking-[0.24em] text-gray-400/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-[family-name:var(--font-space)] text-lg font-semibold text-white">
                  {s.t}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300/85">{s.d}</ul>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

