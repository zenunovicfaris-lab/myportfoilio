"use client";

import { motion } from "framer-motion";

const TECH_ITEMS = [
  { name: "Next.js", category: "dev" },
  { name: "React", category: "dev" },
  { name: "TypeScript", category: "dev" },
  { name: "Tailwind", category: "dev" },
  { name: "Vercel", category: "platform" },
  { name: "WordPress", category: "platform" },
  { name: "Ahrefs", category: "seo" },
  { name: "Semrush", category: "seo" },
  { name: "GSC", category: "seo" },
  { name: "GA4", category: "analytics" },
  { name: "AI / LLMs", category: "automation" },
  { name: "Git", category: "dev" },
];

export default function TechStackSection() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-heading"
      className="px-6 py-24 md:py-32 bg-gradient-to-b from-[#0d0d14] to-[#0a0a0f]"
    >
      <motion.h2
        id="tech-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white text-center mb-16"
      >
        Tech stack
      </motion.h2>

      <div className="mx-auto max-w-4xl flex flex-wrap justify-center gap-4">
        {TECH_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 flex items-center gap-2 transition-colors hover:border-cyan-500/30 hover:bg-white/10"
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-cyan-500/80"
            />
            <span className="text-sm font-medium text-gray-300">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
