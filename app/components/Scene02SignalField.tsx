"use client";

import { motion } from "framer-motion";

const PILLS = [
  { k: "Technical SEO", d: "Crawl, indexation, CWV, schema." },
  { k: "AI Content Systems", d: "Workflows, templates, quality gates." },
  { k: "Programmatic Growth", d: "Data → pages → internal links." },
  { k: "Affiliate SEO", d: "Intent, SERP capture, conversions." },
];

export default function Scene02SignalField() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <div className="absolute inset-0" />

      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-[18%] h-[340px] w-[340px] rounded-full bg-cyan-500/10" />
        <div className="absolute right-[8%] bottom-[18%] h-[420px] w-[420px] rounded-full bg-indigo-500/10" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[900px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Signals → systems → compounding growth.
            </h2>
            <p className="mt-6 text-gray-300/85 text-base sm:text-lg leading-relaxed">
              I'm Faris Zenunović - Senior SEO & Growth Specialist and full-stack developer. I build fast web
              experiences and growth systems for global companies, SaaS products, affiliate brands (iGaming/crypto),
              and AI-driven startups.
            </p>
            <p className="mt-4 text-gray-400/85 text-sm">
              Based in Živinice, Bosnia and Herzegovina. Working globally.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 [transform:perspective(1100px)]">
            {PILLS.map((p, i) => (
              <motion.div
                key={p.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6, rotateX: 6, rotateY: i % 2 ? -6 : 6 }}
                className="transform-gpu rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(34,211,238,0.06)] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)]"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="text-xs tracking-[0.22em] text-cyan-200/70">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-2 font-[family-name:var(--font-space)] text-lg font-semibold text-white">
                  {p.k}
                </div>
                <div className="mt-2 text-sm text-gray-300/85">{p.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

