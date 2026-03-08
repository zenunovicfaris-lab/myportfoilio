"use client";

import { motion } from "framer-motion";
import CaseStudyCard, { type CaseStudy } from "./CaseStudyCard";

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    brand: "iGaming Affiliate Network",
    industry: "iGaming / Affiliate",
    challenge: "New domain, zero authority. Needed to rank in 6 months.",
    outcome: "120% organic traffic in 6 months. Top 3 for 15 commercial keywords.",
    trafficGrowth: [10, 25, 45, 70, 95, 120],
    rankingImprovement: [24, 12, 8, 5, 3],
    kpis: [
      { label: "Sessions", before: "2.1k", after: "4.6k" },
      { label: "Revenue", before: "€800", after: "€2.1k" },
    ],
  },
  {
    id: "2",
    brand: "SaaS Product",
    industry: "SaaS",
    challenge: "Stagnant blog. No programmatic or scale strategy.",
    outcome: "Built AI content ops. 3x content output, 85% more sign-ups from organic.",
    trafficGrowth: [100, 115, 140, 180, 220, 285],
    rankingImprovement: [18, 9, 4, 2, 1],
    kpis: [
      { label: "Sign-ups", before: "340/mo", after: "629/mo" },
      { label: "Pages indexed", before: "120", after: "840" },
    ],
  },
  {
    id: "3",
    brand: "Crypto News Portal",
    industry: "Crypto / Media",
    challenge: "Core Web Vitals failing. Dropped rankings after algo update.",
    outcome: "Technical overhaul + content consolidation. Recovered 90% of lost traffic.",
    trafficGrowth: [60, 50, 55, 75, 95, 108],
    rankingImprovement: [32, 18, 11, 6, 4],
    kpis: [
      { label: "LCP", before: "4.2s", after: "1.8s" },
      { label: "Sessions", before: "18k", after: "16.2k" },
    ],
  },
  {
    id: "4",
    brand: "ClickOut Media (affiliate)",
    industry: "Affiliate / iGaming",
    challenge: "Multi-site portfolio. Needed consistent systems.",
    outcome: "Audit + content system. 40% efficiency gain, scalable templates.",
    trafficGrowth: [100, 110, 125, 145, 165, 190],
    rankingImprovement: [15, 8, 5, 3, 2],
    kpis: [
      { label: "Sites managed", before: "4", after: "8" },
      { label: "Content/mo", before: "60", after: "120" },
    ],
  },
];

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="px-6 py-24 md:py-32 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d14]"
    >
      <motion.h2
        id="case-studies-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white text-center mb-16"
      >
        Case studies
      </motion.h2>

      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 gap-6">
        {CASE_STUDIES.map((study, i) => (
          <CaseStudyCard key={study.id} data={study} index={i} />
        ))}
      </div>
    </section>
  );
}
