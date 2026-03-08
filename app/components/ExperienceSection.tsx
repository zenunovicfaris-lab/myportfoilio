"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const TOOLS = [
  { name: "CSS3",                  file: "CSS3.png"                  },
  { name: "GitHub",                file: "GitHub.png"                },
  { name: "Google Search Console", file: "google-search-console.png" },
  { name: "HTML5",                 file: "HTML5.png"                 },
  { name: "JavaScript",            file: "JavaScript.png"            },
  { name: "Next.js",               file: "Next.js.png"               },
  { name: "React",                 file: "React.png"                 },
  { name: "SEMrush",               file: "semrush.png"               },
  { name: "Tailwind CSS",          file: "Tailwind.png"              },
  { name: "TypeScript",            file: "TypeScript.png"            },
  { name: "WordPress",             file: "wordpress.png"             },
] as const;

const TOOLS_VISIBLE_DEFAULT = 6;

type TimelineEntry = {
  period:   string;
  role:     string;
  company:  string;
  bullets:  string[];
  current?: boolean;
  proof?:   string;
  caption?: string;
  muted?:   boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    period:  "2022",
    role:    "Foundations in SEO",
    company: "Self-directed Learning",
    muted:   true,
    bullets: [
      "Immersed in core SEO disciplines - technical auditing, on-page optimization, keyword research, and content strategy.",
      "Applied knowledge through personal test sites, studying organic ranking factors and algorithm behavior hands-on.",
      "Built a structured workflow for competitive analysis and SERP evaluation that became the foundation of all future client work.",
    ],
  },
  {
    period:  "2022 – Present",
    role:    "Freelance SEO Specialist",
    company: "Independent Clients",
    bullets: [
      "Planned and executed end-to-end SEO strategies for local and regional clients across multiple industries.",
      "Developed and optimized SEO landing pages for kakolako.com, improving keyword coverage and click-through rates in the local Bosnian market.",
      "Delivered consistent organic traffic growth through structured content planning, internal linking, and on-page improvements.",
    ],
    proof:   "/images/kakolako-gsc.jpg",
    caption: "Google Search Console - kakolako.com: Organic click growth following on-page SEO and content optimization.",
  },
  {
    period:  "2022 – 2024",
    role:    "SEO Manager",
    company: "Imperia Marketing / Finixio",
    bullets: [
      "Led SEO strategy for a portfolio of affiliate websites in the crypto, fintech, and regulated financial sectors.",
      "Identified and targeted high-intent financial keywords - covering cards, payments, investing, and crypto exchanges - using Ahrefs and SEMrush.",
      "Executed content gap analysis and competitor benchmarking to capture underserved search demand in competitive regulated markets.",
      "Collaborated with editorial and dev teams to implement technical SEO improvements, improving crawlability and indexation across key properties.",
    ],
    proof:   "/images/99bitcoins-semrush.jpg",
    caption: "SEMrush - 99bitcoins.com: Domain authority score of 51 with 76K+ monthly organic visits across crypto content.",
  },
  {
    period:   "2024 – 2026",
    role:     "Content Creator & SEO Specialist",
    company:  "ClickOut Media",
    current:  true,
    bullets: [
      "Produced and optimized long-form SEO content - including comparison guides, review articles, and topical hubs - across finance, crypto, and online services verticals.",
      "Contributed to organic performance improvements on esports.net by supporting content restructuring, internal linking, and technical SEO initiatives.",
      "Used Ahrefs and SEMrush for continuous keyword opportunity analysis, ensuring content aligned with evolving search intent and SERP features.",
      "Worked within large-scale editorial systems, balancing SEO best practices with brand voice and content quality standards.",
    ],
    proof:   "/images/esports.net SEMrush.jpg",
    caption: "SEMrush - esports.net: 43K+ organic keywords tracked, contributing to technical SEO and content restructuring efforts.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const toolItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit:   { opacity: 0, scale: 0.7, transition: { duration: 0.2 } },
};

export default function ExperienceSection() {
  const timelineRef    = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const visibleTools = showAll ? TOOLS : TOOLS.slice(0, TOOLS_VISIBLE_DEFAULT);
  const hiddenCount  = TOOLS.length - TOOLS_VISIBLE_DEFAULT;

  return (
    <section id="resume" className="py-24 px-6 md:px-10 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
            Background
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Skills &amp; Experience
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            An overview of my key skills, technologies I work with, tools I use, and my professional journey so far.
          </p>
        </motion.div>

        {/* ── Tool icons row ───────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-600 mb-6"
          >
            Technologies &amp; Tools
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">

            {/* Visible tools */}
            <AnimatePresence mode="popLayout">
              {visibleTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={toolItemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.12, y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="group relative flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-full bg-[#1a1d27] border border-white/10
                                 group-hover:border-teal-500/40 group-hover:bg-teal-500/6
                                 transition-colors duration-300 overflow-hidden
                                 flex items-center justify-center p-2.5
                                 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.6)]">
                    <Image
                      src={`/tools/${tool.file}`}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain select-none"
                      draggable={false}
                    />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2
                                 text-[9px] font-medium text-gray-500 group-hover:text-teal-400
                                 whitespace-nowrap opacity-0 group-hover:opacity-100
                                 transition-all duration-200 pointer-events-none">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show more / Show less button */}
            <motion.button
              layout
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400
                         hover:text-teal-400 transition-colors duration-200
                         px-3 py-1.5 rounded-full border border-white/10
                         hover:border-teal-500/30 bg-[#1a1d27] hover:bg-teal-500/5
                         whitespace-nowrap"
            >
              {showAll ? (
                <>Show less</>
              ) : (
                <>Show {hiddenCount} more</>
              )}
            </motion.button>

          </motion.div>
        </motion.div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* ── Journey label ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-600 mb-8">
            Changelog from my journey
          </p>
        </motion.div>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <div className="relative" ref={timelineRef}>

          {/* Background static line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/6" />

          {/* Scroll-driven fill line */}
          <motion.div
            className="absolute left-[7px] top-2 w-px origin-top
                       bg-gradient-to-b from-teal-400 via-teal-500/70 to-teal-500/20
                       shadow-[0_0_8px_rgba(20,184,166,0.6)]"
            style={{
              scaleY: lineProgress,
              height: "calc(100% - 16px)",
            }}
          />

          <div className="space-y-10">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={`${entry.period}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex gap-5 items-start"
              >
                {/* ── Node ──────────────────────────────────────────────── */}
                <div className="relative z-10 shrink-0 mt-[3px]">
                  <div className={`w-[15px] h-[15px] rounded-full border bg-[#0d0f16] flex items-center justify-center
                    ${entry.muted ? "border-gray-600/40" : "border-teal-500/40"}`}>
                    <div className={`w-[7px] h-[7px] rounded-full
                      ${entry.muted
                        ? "bg-gray-500"
                        : "bg-teal-400 shadow-[0_0_6px_rgba(20,184,166,0.8)]"
                      }`}
                    />
                  </div>
                </div>

                {/* ── Card ──────────────────────────────────────────────── */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={`flex-1 border rounded-2xl p-6 transition-colors duration-200
                    ${entry.muted
                      ? "bg-[#0f1017] border-white/5 hover:border-white/10"
                      : "bg-[#111218] border-white/8 hover:border-teal-500/20"
                    }`}
                >
                  {/* Period + role */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold text-base leading-snug ${entry.muted ? "text-gray-400" : "text-white"}`}>
                      {entry.role}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {entry.current && (
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full
                                         bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                      <span className={`text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border
                        ${entry.muted
                          ? "bg-gray-500/10 border-gray-500/20 text-gray-500"
                          : "bg-teal-500/10 border-teal-500/22 text-teal-400"
                        }`}>
                        {entry.period}
                      </span>
                    </div>
                  </div>

                  {/* Company */}
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {entry.company}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {entry.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
                        <span className={`mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full
                          ${entry.muted ? "bg-gray-600" : "bg-teal-500/60"}`}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* ── Proof screenshot ──────────────────────────────────── */}
                  {entry.proof && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-gray-600">
                          Traffic Growth Proof
                        </p>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full
                                         bg-teal-500/10 border border-teal-500/20 text-teal-500 tracking-wide">
                          ✦ Live Data
                        </span>
                      </div>

                      <div className="group/proof relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#1a1d27]">
                        <Image
                          src={entry.proof}
                          alt={entry.caption ?? "Traffic growth proof"}
                          width={1200}
                          height={600}
                          quality={100}
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 700px"
                          className="w-full h-auto object-contain
                                     transition-transform duration-500 ease-out
                                     group-hover/proof:scale-[1.02]
                                     group-hover/proof:brightness-110"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
                        />
                        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover/proof:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="text-[9px] font-medium text-white/60 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                            Hover to zoom
                          </span>
                        </div>
                      </div>

                      {entry.caption && (
                        <p className="mt-2 text-[11px] text-gray-500 leading-snug">
                          {entry.caption}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
