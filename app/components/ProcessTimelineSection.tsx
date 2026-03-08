"use client";

import { motion } from "framer-motion";

const STEPS = [
  { label: "Audit", desc: "Technical & content baseline, gap analysis" },
  { label: "Strategy", desc: "Goals, priorities, roadmap" },
  { label: "Implementation", desc: "Build, optimize, launch" },
  { label: "Automation", desc: "Scale with systems & tools" },
  { label: "Scaling", desc: "Iterate, expand, compound" },
];

export default function ProcessTimelineSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-6 py-24 md:py-32 bg-[#0a0a0f]"
    >
      <motion.h2
        id="process-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white text-center mb-16"
      >
        Process
      </motion.h2>

      <div className="mx-auto max-w-4xl">
        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold text-cyan-400">
                    {step.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                </div>
                <motion.div
                  className="relative z-10 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-[#0a0a0f]"
                  whileHover={{ scale: 1.3 }}
                />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
