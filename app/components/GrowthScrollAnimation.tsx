"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// ─── SVG geometry ─────────────────────────────────────────────────────────────

// ViewBox: 1040 × 380.  Chart area: x 60–1000, y 20–340.  Baseline: y = 340.
const CURVE =
  "M 60 330 " +
  "C 130 325,165 315,200 310 " +
  "C 260 298,295 290,340 285 " +
  "C 395 275,435 252,480 245 " +
  "C 530 232,565 198,600 190 " +
  "C 650 178,685 143,720 135 " +
  "C 768 120,800 90,840 80 " +
  "C 900 60,945 38,980 30";

// Closed fill area: same curve → drop to baseline → close
const AREA = CURVE + " L 980 340 L 60 340 Z";

// ─── Data nodes ───────────────────────────────────────────────────────────────

// `at` = the pathLength value (0–1) at which this node should appear
const NODES = [
  { cx: 200, cy: 310, at: 0.14, above: false, label: "Q1",    metric: "+12%"    },
  { cx: 340, cy: 285, at: 0.28, above: true,  label: "Q2",    metric: "+48%"    },
  { cx: 480, cy: 245, at: 0.43, above: false, label: "Q3",    metric: "+115%"   },
  { cx: 600, cy: 190, at: 0.56, above: true,  label: "Q4",    metric: "+280%"   },
  { cx: 720, cy: 135, at: 0.68, above: false, label: "18 mo", metric: "+530%"   },
  { cx: 840, cy:  80, at: 0.80, above: true,  label: "21 mo", metric: "+1,100%" },
  { cx: 980, cy:  30, at: 0.94, above: false, label: "24 mo", metric: "+3,200%" },
] as const;

const GRID_Y  = [280, 230, 180, 130, 80, 30];
const Y_AXIS  = [
  { y: 340, text: "—"    },
  { y: 280, text: "200K" },
  { y: 230, text: "500K" },
  { y: 180, text: "1M"   },
  { y: 130, text: "2M"   },
  { y:  80, text: "3M+"  },
];
const X_AXIS  = [
  { x:  60, t: "Start"  },
  { x: 340, t: "6 mo"   },
  { x: 600, t: "12 mo"  },
  { x: 840, t: "18 mo"  },
  { x: 980, t: "24 mo"  },
];

// ─── Single animated node (hooks must live at component level, not in a loop) ─

function GraphNode({
  node,
  pathLengthValue,
}: {
  node: (typeof NODES)[number];
  pathLengthValue: MotionValue<number>;
}) {
  const { cx, cy, at, above, label, metric } = node;

  // Fade in over a small window around the node's arrival point
  const opacity = useTransform(pathLengthValue, [at - 0.04, at + 0.03], [0, 1]);

  const metricY = above ? cy - 22 : cy + 30;
  const labelY  = above ? cy - 10 : cy + 42;

  return (
    <motion.g style={{ opacity }}>
      {/* Soft outer ring */}
      <circle
        cx={cx} cy={cy} r={13}
        fill="rgba(20,184,166,0.08)"
        stroke="rgba(20,184,166,0.22)"
        strokeWidth={1}
      />
      {/* Glowing inner dot */}
      <circle
        cx={cx} cy={cy} r={5}
        fill="#14b8a6"
        filter="url(#nd-glow)"
      />
      {/* Metric value */}
      <text
        x={cx} y={metricY}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#2dd4bf"
        fontFamily="ui-monospace, monospace"
      >
        {metric}
      </text>
      {/* Period label */}
      <text
        x={cx} y={labelY}
        textAnchor="middle"
        fontSize={9}
        fill="rgba(156,163,175,0.65)"
      >
        {label}
      </text>
    </motion.g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GrowthScrollAnimation() {
  // The outer div is tall so the user has scroll room.
  // The inner div is sticky, keeping the graphic on-screen the whole time.
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Core animations driven by scroll
  const pathLength  = useTransform(scrollYProgress, [0.05, 0.88], [0, 1]);
  const areaOpacity = useTransform(scrollYProgress, [0.05, 0.45], [0, 0.38]);
  const headingOp   = useTransform(scrollYProgress, [0.00, 0.10], [0, 1]);
  const headingY    = useTransform(scrollYProgress, [0.00, 0.10], [20, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0.00, 0.14], [1, 0]);

  return (
    // 220 vh gives ~120 vh of usable scroll distance (220 − 100)
    <div ref={containerRef} className="relative h-[220vh] bg-[#0a0a0f]">

      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-14 overflow-hidden">

        {/* Edge rules */}
        <div className="absolute top-0    inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: headingOp, y: headingY }}
          className="text-center mb-6 sm:mb-10 max-w-2xl"
        >
          <span className="inline-block text-[10px] font-semibold tracking-[0.22em] uppercase text-teal-400/60 mb-3 select-none">
            Organic Growth
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl md:text-[2.15rem] font-bold text-white tracking-tight leading-snug">
            Scaling your organic presence,{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              steadily and predictably.
            </span>
          </h2>
        </motion.div>

        {/* ── SVG graph ─────────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto">
          <svg
            viewBox="0 0 1040 380"
            width="100%"
            overflow="visible"
            aria-hidden="true"
          >
            <defs>
              {/* Stroke gradient: teal → cyan */}
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0d9488" />
                <stop offset="55%"  stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>

              {/* Area fill gradient: teal top → transparent bottom */}
              <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="rgba(20,184,166,0.42)" />
                <stop offset="100%" stopColor="rgba(20,184,166,0)"    />
              </linearGradient>

              {/* Line glow: two blurred copies behind the crisp stroke */}
              <filter id="ln-glow" x="-8%" y="-120%" width="116%" height="340%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="b1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" />
                <feMerge>
                  <feMergeNode in="b2" />
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Node glow */}
              <filter id="nd-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Chart furniture ─────────────────────────────────────── */}

            {/* Horizontal grid lines */}
            {GRID_Y.map((y) => (
              <line
                key={y}
                x1={60} y1={y} x2={1000} y2={y}
                stroke="rgba(255,255,255,0.035)"
                strokeWidth={1}
                strokeDasharray="3 7"
              />
            ))}

            {/* Y axis */}
            <line x1={60} y1={20}  x2={60}   y2={345} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            {/* X axis */}
            <line x1={55} y1={340} x2={1005} y2={340} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

            {/* Y labels */}
            {Y_AXIS.map(({ y, text }) => (
              <text key={y} x={48} y={y + 4} textAnchor="end" fontSize={9} fill="rgba(107,114,128,0.5)">
                {text}
              </text>
            ))}

            {/* X labels */}
            {X_AXIS.map(({ x, t }) => (
              <text key={x} x={x} y={358} textAnchor="middle" fontSize={9} fill="rgba(107,114,128,0.5)">
                {t}
              </text>
            ))}

            {/* ── Animated elements ───────────────────────────────────── */}

            {/* Area fill (fades in as line draws) */}
            <motion.path
              d={AREA}
              fill="url(#area-grad)"
              style={{ opacity: areaOpacity }}
            />

            {/* The growth line itself */}
            <motion.path
              d={CURVE}
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth={3}
              strokeLinecap="round"
              filter="url(#ln-glow)"
              style={{ pathLength }}
            />

            {/* Data nodes — each is its own component so hooks are valid */}
            {NODES.map((node) => (
              <GraphNode
                key={node.label}
                node={node}
                pathLengthValue={pathLength}
              />
            ))}
          </svg>
        </div>

        {/* ── Scroll hint (fades out once the user starts scrolling) ──── */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="mt-4 sm:mt-6 text-[10px] text-gray-600 tracking-[0.18em] uppercase flex items-center gap-2 select-none"
        >
          Scroll to reveal
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.p>

      </div>
    </div>
  );
}
