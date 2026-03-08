"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, animate } from "framer-motion";

export type CaseStudy = {
  id: string;
  brand: string;
  industry: string;
  challenge: string;
  outcome: string;
  metrics: Array<{ label: string; from: number; to: number; suffix?: string }>;
  rankFrom: number;
  rankTo: number;
  series: number[];
};

function Chart({ values, active }: { values: number[]; active: boolean }) {
  const max = Math.max(...values);
  const d = useMemo(() => {
    const w = 260;
    const h = 88;
    const step = w / (values.length - 1);
    return values
      .map((v, i) => {
        const x = i * step;
        const y = h - (v / max) * (h - 10) - 5;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, [values, max]);

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.22em] text-gray-400/70">GROWTH TRACE</div>
        <div className="text-[10px] text-cyan-200/70">6–12 months</div>
      </div>
      <svg viewBox="0 0 260 88" className="mt-3 h-[92px] w-full">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(34,211,238,0.0)" />
            <stop offset="0.35" stopColor="rgba(34,211,238,0.55)" />
            <stop offset="1" stopColor="rgba(167,139,250,0.45)" />
          </linearGradient>
        </defs>
        <motion.path
          d={d}
          fill="none"
          stroke="url(#g)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0.15, opacity: active ? 1 : 0.5 }}
          transition={{ duration: active ? 0.9 : 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d={`${d} L 260 88 L 0 88 Z`}
          fill="rgba(34,211,238,0.08)"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.25 }}
          transition={{ duration: 0.6 }}
        />
      </svg>
    </div>
  );
}

function RankTicker({ 
  from, 
  to, 
  active 
}: { 
  from: number; 
  to: number; 
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const [currentRank, setCurrentRank] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!active) {
      setCurrentRank(from);
      setIsAnimating(false);
      return;
    }
    if (reduce) {
      setCurrentRank(to);
      return;
    }

    setIsAnimating(true);
    const ranks = [from, Math.floor((from + to) / 2), to];
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < ranks.length) {
        setCurrentRank(ranks[index]);
        index++;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [active, from, to, reduce]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[10px] tracking-[0.22em] text-gray-400/70">RANK PROGRESSION</div>
      <div className="mt-2 font-[family-name:var(--font-space)] text-2xl font-semibold text-white flex items-center gap-2">
        <span>#{currentRank}</span>
        {isAnimating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
        )}
      </div>
      <div className="mt-2 text-xs text-cyan-200/70">
        {from > to ? "↑ Climbing" : "→ Maintaining"}
      </div>
    </div>
  );
}

function MetricCounter({
  label,
  from,
  to,
  suffix,
  active,
}: {
  label: string;
  from: number;
  to: number;
  suffix?: string;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!active) {
      setVal(from);
      return;
    }
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(from, to, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [active, from, to, reduce]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[10px] tracking-[0.22em] text-gray-400/70">{label.toUpperCase()}</div>
      <div className="mt-2 font-[family-name:var(--font-space)] text-2xl font-semibold text-white">
        {Math.round(val).toLocaleString()}
        {suffix ?? ""}
      </div>
      <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
    </div>
  );
}

export default function CaseStudyPanel({
  data,
  expanded,
  onToggle,
}: {
  data: CaseStudy;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div layout className="rounded-2xl border border-white/10 bg-white/[0.04]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-2xl"
        aria-expanded={expanded}
        aria-controls={`case-${data.id}`}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-[10px] tracking-[0.24em] text-cyan-200/70">
              {data.industry.toUpperCase()}
            </div>
            <div className="mt-2 font-[family-name:var(--font-space)] text-xl sm:text-2xl font-semibold text-white">
              {data.brand}
            </div>
            <div className="mt-2 text-sm text-gray-300/75 max-w-2xl">{data.outcome}</div>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-gray-400/70">Expand</span>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-200/90"
              aria-hidden="true"
            >
              +
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`case-${data.id}`}
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[10px] tracking-[0.22em] text-gray-400/70">CHALLENGE</div>
                <div className="mt-2 text-sm text-gray-300/75">{data.challenge}</div>
                <div className="mt-4 text-[10px] tracking-[0.22em] text-gray-400/70">OUTCOME</div>
                <div className="mt-2 text-sm text-gray-200/80">{data.outcome}</div>
              </div>

              <div>
                <Chart values={data.series} active />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {data.metrics.slice(0, 2).map((m) => (
                    <MetricCounter
                      key={m.label}
                      label={m.label}
                      from={m.from}
                      to={m.to}
                      suffix={m.suffix}
                      active
                    />
                  ))}
                </div>
              </div>

              <div>
                <RankTicker from={data.rankFrom} to={data.rankTo} active />
                <div className="mt-4">
                  <MetricCounter
                    label={data.metrics[2].label}
                    from={data.metrics[2].from}
                    to={data.metrics[2].to}
                    suffix={data.metrics[2].suffix}
                    active
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] tracking-[0.22em] text-gray-400/60">
              NOTE: Placeholder data - replace with real KPIs.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

