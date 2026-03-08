"use client";

import { useMemo, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

const CaseStudyPanel = lazy(() => import("./CaseStudyPanel"));

export default function Scene04CaseStudies() {
  const cases = useMemo(() => [
    {
      id: "01",
      brand: "iGaming Affiliate Network",
      industry: "iGaming / Affiliate",
      challenge: "New domain, low trust. Needed rankings for commercial pages without tripping over compliance and volatility.",
      outcome: "Built a technical + topical authority system. Achieved Top 3 placements for money terms and stabilized traffic.",
      metrics: [
        { label: "Sessions", from: 2100, to: 4600 },
        { label: "Revenue", from: 800, to: 2100, suffix: "€" },
        { label: "Top-3 KW", from: 2, to: 15 },
      ],
      rankFrom: 28,
      rankTo: 4,
      series: [12, 18, 24, 40, 55, 70, 92, 115],
    },
    {
      id: "02",
      brand: "SaaS Product",
      industry: "SaaS",
      challenge: "Content output was slow, internal linking was weak, and search intent coverage was inconsistent.",
      outcome: "AI-assisted content ops + programmatic templates. Organic sign-ups grew while keeping quality and speed.",
      metrics: [
        { label: "Sign-ups", from: 340, to: 629 },
        { label: "Pages", from: 120, to: 840 },
        { label: "Trial CVR", from: 2, to: 4, suffix: "%" },
      ],
      rankFrom: 45,
      rankTo: 12,
      series: [100, 112, 128, 156, 180, 210, 245, 285],
    },
    {
      id: "03",
      brand: "Crypto Media Site",
      industry: "Crypto / Media",
      challenge: "CWV failures and thin pages triggered a post-update drop. Needed recovery without pumping out fluff.",
      outcome: "Performance overhaul + consolidation + internal link graph. Recovery with a stronger baseline.",
      metrics: [
        { label: "LCP", from: 4, to: 2, suffix: "s" },
        { label: "Sessions", from: 18000, to: 16200 },
        { label: "Index health", from: 48, to: 82, suffix: "%" },
      ],
      rankFrom: 15,
      rankTo: 8,
      series: [70, 58, 60, 72, 84, 92, 100, 108],
    },
  ], []);

  const [openId, setOpenId] = useState<string>(cases[0]?.id ?? "01");

  return (
    <section id="case-studies" className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-[25%] top-[15%] h-[400px] w-[400px] rounded-full blur-3xl bg-indigo-500/10" />
        <div className="absolute right-[15%] bottom-[15%] h-[360px] w-[360px] rounded-full blur-3xl bg-cyan-500/10" />
      </div>

      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Case studies
              </h2>
              <p className="mt-4 text-gray-300/85 max-w-2xl">
                Not a grid. A set of expandable panels that reveal the system: challenge → execution → measurable outcome.
              </p>
            </div>
            <div className="text-xs tracking-[0.22em] text-gray-400/60">CLICK TO EXPAND</div>
          </motion.div>

          <motion.div
            className="mt-10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Suspense fallback={
              <div className="space-y-4">
                {cases.map((c) => (
                  <div key={c.id} className="h-24 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse" />
                ))}
              </div>
            }>
              {cases.map((c) => (
                <CaseStudyPanel
                  key={c.id}
                  data={c}
                  expanded={openId === c.id}
                  onToggle={() => setOpenId((prev) => (prev === c.id ? "" : c.id))}
                />
              ))}
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

