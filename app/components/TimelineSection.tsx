"use client";

import { motion } from "framer-motion";

// ─── Dummy timeline data - fill in your real work history here ────────────────

const ENTRIES = [
  {
    year:    "2024",
    role:    "Senior Position Title",
    company: "Company Name",
    desc:    "Replace this with a concise description of what you did here - key responsibilities, technologies used, and measurable outcomes you're proud of.",
  },
  {
    year:    "2022",
    role:    "Mid-Level Position",
    company: "Previous Company",
    desc:    "Describe your role, the scope of your work, and any notable achievements. Specific numbers and results make the strongest impression.",
  },
  {
    year:    "2020",
    role:    "Junior Role",
    company: "Your First Company",
    desc:    "How you got started in the industry. What you learned, what you shipped, and how it shaped the way you work today.",
  },
  {
    year:    "2018",
    role:    "Internship / Freelance",
    company: "Early Experience",
    desc:    "Optional entry for early freelance work, internships, or personal projects that are relevant to your career story.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelineSection() {
  return (
    <section id="resume" className="py-24 px-6 md:px-10 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
            Journey
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Work History
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            A timeline of positions, projects, and milestones. Fill in your own dates and details.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-teal-500/60 via-teal-500/20 to-transparent" />

          <div className="space-y-10">
            {ENTRIES.map((entry, i) => (
              <motion.div
                key={`${entry.year}-${i}`}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 items-start"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0 flex flex-col items-center mt-1">
                  {/* Outer glow ring */}
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                    {/* Year dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.7)]" />
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="flex-1 bg-[#111218] border border-white/8 rounded-2xl p-6 hover:border-teal-500/22 transition-colors duration-200"
                >
                  {/* Year badge + role row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <h3 className="font-bold text-white text-base leading-snug">
                      {entry.role}
                    </h3>
                    <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 font-mono">
                      {entry.year}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="text-sm font-medium text-gray-500 mb-3">
                    {entry.company}
                  </p>

                  {/* Separator */}
                  <div className="h-px bg-white/6 mb-3" />

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {entry.desc}
                  </p>
                </motion.div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
