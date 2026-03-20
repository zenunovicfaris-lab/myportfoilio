"use client";

import { motion } from "framer-motion";

// ─── Skill data ───────────────────────────────────────────────────────────────
// Two rows scroll in opposite directions for a layered marquee effect.
// Replace or extend these arrays with your real skills.

const ROW_ONE = [
  { name: "Technical SEO",     emoji: "🔍" },
  { name: "Keyword Research",  emoji: "📊" },
  { name: "Link Building",     emoji: "🔗" },
  { name: "Content Strategy",  emoji: "✍️"  },
  { name: "GA4 & GSC",         emoji: "📈" },
  { name: "Ahrefs",            emoji: "🛠"  },
  { name: "SEMrush",           emoji: "🛠"  },
  { name: "Schema Markup",     emoji: "🗂"  },
  { name: "Core Web Vitals",   emoji: "⚡" },
  { name: "Site Migrations",   emoji: "🚀" },
  { name: "Programmatic SEO",  emoji: "⚙️"  },
  { name: "International SEO", emoji: "🌍" },
] as const;

const ROW_TWO = [
  { name: "React",       emoji: "⚛️"  },
  { name: "Next.js",     emoji: "▲"   },
  { name: "TypeScript",  emoji: "📘" },
  { name: "WordPress",   emoji: "🌐" },
  { name: "Tailwind CSS",emoji: "🎨" },
  { name: "Python",      emoji: "🐍" },
  { name: "Claude AI",   emoji: "🤖" },
  { name: "ChatGPT",     emoji: "🤖" },
  { name: "Elementor",   emoji: "🔧" },
  { name: "Git",         emoji: "🌿" },
  { name: "REST APIs",   emoji: "🔌" },
  { name: "Figma",       emoji: "🎭" },
] as const;

// Double each row so the CSS loop is seamless
const TRACK_ONE = [...ROW_ONE, ...ROW_ONE];
const TRACK_TWO = [...ROW_TWO, ...ROW_TWO];

// ─── Single skill pill ────────────────────────────────────────────────────────

function SkillPill({ emoji, name }: { emoji: string; name: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-[#111218] hover:border-teal-500/30 hover:bg-teal-500/6 transition-colors duration-300 cursor-default select-none group">
      <span
        aria-hidden
        className="text-base leading-none group-hover:scale-110 transition-transform duration-300"
      >
        {emoji}
      </span>
      <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  return (
    <section className="py-24 bg-[#0d0f16] overflow-hidden">

      {/* Top separator */}
      <div className="inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-0" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 mb-14"
      >
        <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
          Toolkit
        </span>
        <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Skills &amp; Experience
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
          The tools and disciplines I reach for every day - from strategy and research to code and automation.
        </p>
      </motion.div>

      {/*
        Two-row marquee.
        Row 1 scrolls left  (uses the animate-marquee keyframe from globals.css).
        Row 2 scrolls right (same keyframe, animation-direction: reverse).
        Each row's inner track is doubled so the loop is seamless.
      */}

      {/* ── Row 1 - scrolls left ────────────────────────────────────────── */}
      <div
        className="relative mb-4"
        style={{
          maskImage:   "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="flex overflow-hidden [--gap:theme(spacing.3)]">
          <div className="flex shrink-0 gap-[var(--gap)] animate-marquee">
            {TRACK_ONE.map((skill, i) => (
              <SkillPill key={`r1-${skill.name}-${i}`} {...skill} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2 - scrolls right ───────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          maskImage:   "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="flex overflow-hidden [--gap:theme(spacing.3)]">
          <div
            className="flex shrink-0 gap-[var(--gap)] animate-marquee"
            style={{ animationDirection: "reverse" }}
          >
            {TRACK_TWO.map((skill, i) => (
              <SkillPill key={`r2-${skill.name}-${i}`} {...skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mt-0" />

    </section>
  );
}
