"use client";

import { motion } from "framer-motion";

export type CaseStudy = {
  id: string;
  brand: string;
  industry: string;
  challenge: string;
  outcome: string;
  trafficGrowth: number[];
  rankingImprovement: number[];
  kpis: { label: string; before: string; after: string }[];
};

type Props = { data: CaseStudy; index: number };

function MiniLineChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const barHeight = 48;
  return (
    <div className="flex items-end gap-0.5 h-12 mt-2">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-t bg-cyan-500/60 flex-shrink-0"
          initial={{ height: 0 }}
          whileInView={{ height: (v / max) * barHeight }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

function MiniRankingBar({ positions }: { positions: number[] }) {
  return (
    <div className="flex gap-1 mt-2 flex-wrap">
      {positions.map((pos, i) => (
        <motion.span
          key={i}
          className="rounded px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          #{pos}
        </motion.span>
      ))}
    </div>
  );
}

export default function CaseStudyCard({ data, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold text-white">
            {data.brand}
          </h3>
          <span className="text-xs text-cyan-400/80">{data.industry}</span>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          <span className="text-gray-500">Challenge:</span> {data.challenge}
        </p>
        <p className="text-sm text-gray-300 mb-4">
          <span className="text-emerald-500/80">Outcome:</span> {data.outcome}
        </p>

        <div className="space-y-3">
          <div>
            <span className="text-xs text-gray-500">Traffic growth (6 months)</span>
            <MiniLineChart values={data.trafficGrowth} />
          </div>
          <div>
            <span className="text-xs text-gray-500">Top keyword positions</span>
            <MiniRankingBar positions={data.rankingImprovement} />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="flex justify-between">
                <span className="text-gray-500">{kpi.label}</span>
                <span>
                  <span className="text-gray-400 line-through">{kpi.before}</span>
                  <span className="text-cyan-400 ml-1">→ {kpi.after}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
