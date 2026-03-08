"use client";

import { motion } from "framer-motion";

const MODULES = [
  {
    t: "Technical SEO",
    bullets: ["Crawl & indexation", "CWV / performance", "Schema", "Audits + fixes"],
  },
  {
    t: "Content Operations",
    bullets: ["Architecture", "Workflows", "Editorial QA", "Topical authority"],
  },
  {
    t: "Programmatic SEO",
    bullets: ["Templates", "Data pipelines", "Internal linking", "Scale"],
  },
  {
    t: "Affiliate Growth",
    bullets: ["SERP strategy", "Intent mapping", "Conversion uplift", "Risk mitigation"],
  },
  {
    t: "SaaS / PLG",
    bullets: ["Resources & docs", "Integration pages", "Sign-up loops", "Attribution"],
  },
];

export default function Scene03SystemsConsole() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-[15%] top-[25%] h-[380px] w-[380px] rounded-full blur-3xl bg-purple-500/10" />
        <div className="absolute right-[20%] bottom-[20%] h-[320px] w-[320px] rounded-full blur-3xl bg-cyan-500/10" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[800px] rounded-full blur-3xl bg-white/5" />
      </div>

      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <motion.div
            className="flex items-end justify-between gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Systems console
              </h2>
              <p className="mt-4 text-gray-300/85 max-w-2xl">
                Modular frameworks that behave like a control panel - composable, measurable, and built to scale.
              </p>
            </div>
            <div className="text-[10px] tracking-[0.24em] text-gray-400/60">
              DEPTH · SIGNAL · ITERATION
            </div>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [transform:perspective(1200px)]">
            {MODULES.map((m, i) => (
              <motion.article
                key={m.t}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, rotateX: 6, rotateY: i % 2 ? -8 : 8 }}
                className="transform-gpu rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_40px_rgba(34,211,238,0.06)] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold text-cyan-200/90">
                    {m.t}
                  </h3>
                  <div className="h-2 w-2 rounded-full bg-cyan-400/70 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300/85">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

