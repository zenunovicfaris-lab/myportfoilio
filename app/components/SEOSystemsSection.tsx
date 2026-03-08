"use client";

import { motion } from "framer-motion";

const MODULES = [
  {
    title: "Technical SEO",
    bullets: [
      "Core Web Vitals & page speed",
      "Indexation & crawl budget",
      "Schema & structured data",
      "Technical audits",
    ],
  },
  {
    title: "Content Operations",
    bullets: [
      "Content architecture",
      "Editorial workflows",
      "AI-assisted scaling",
      "Quality gates",
    ],
  },
  {
    title: "AI Automation",
    bullets: [
      "LLM-powered content",
      "Automated audits",
      "Rank tracking pipelines",
      "Reporting dashboards",
    ],
  },
  {
    title: "Programmatic SEO",
    bullets: [
      "Template-based scaling",
      "Location / vertical pages",
      "Data-driven content",
      "Hub & spoke models",
    ],
  },
  {
    title: "SaaS / Product-Led Growth",
    bullets: [
      "Blog & resource strategy",
      "PLG content loops",
      "Sign-up attribution",
      "Integration SEO",
    ],
  },
];

export default function SEOSystemsSection() {
  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="px-6 py-24 md:py-32 bg-[#0a0a0f]"
    >
      <motion.h2
        id="systems-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white text-center mb-16"
      >
        SEO systems
      </motion.h2>

      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((mod, i) => (
          <motion.article
            key={mod.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          >
            <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold text-cyan-400 mb-3">
              {mod.title}
            </h3>
            <ul className="space-y-2">
              {mod.bullets.map((bullet) => (
                <li key={bullet} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
