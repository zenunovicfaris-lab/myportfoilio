"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";

const HEADLINE = "I build SEO systems that generate traffic, authority and revenue.";
const SUBHEADLINE = "Technical SEO · AI Content Systems · Programmatic Growth · Affiliate SEO";

const FLOATING_CARDS = [
  {
    domain: "example.com",
    title: "iGaming SEO growth",
    chart: [30, 45, 55, 70, 85, 95],
    floatDur: 4.2,
    floatDelay: 0,
    rotDur: 8,
    left: "8%",
    top: "15%",
  },
  {
    domain: "saas-tool.com",
    title: "Scaling SaaS signups",
    chart: [100, 115, 130, 155, 180],
    floatDur: 5.1,
    floatDelay: 0.4,
    rotDur: 10,
    left: "62%",
    top: "22%",
  },
  {
    domain: "growth.io",
    title: "Technical SEO audit checklist",
    chart: [20, 40, 65, 90],
    floatDur: 3.8,
    floatDelay: 0.8,
    rotDur: 12,
    left: "75%",
    top: "58%",
  },
  {
    domain: "affiliate-hub.com",
    title: "Programmatic content at scale",
    chart: [10, 35, 70, 110, 150],
    floatDur: 4.6,
    floatDelay: 0.2,
    rotDur: 9,
    left: "12%",
    top: "62%",
  },
  {
    domain: "rank-tracker.io",
    title: "Keyword velocity dashboard",
    chart: [50, 60, 75, 88, 95, 100],
    floatDur: 5.4,
    floatDelay: 0.6,
    rotDur: 11,
    left: "45%",
    top: "72%",
  },
];

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  }),
  exit: { opacity: 0 },
};

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function MiniChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-6 mt-2">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t bg-cyan-400/50 flex-shrink-0"
          style={{ height: `${(v / max) * 24}px` }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardX1 = useTransform(mouseX, [-400, 400], [-12, 12]);
  const cardY1 = useTransform(mouseY, [-400, 400], [-12, 12]);
  const cardX2 = useTransform(mouseX, [-400, 400], [8, -8]);
  const cardY2 = useTransform(mouseY, [-400, 400], [8, -8]);
  const cardX3 = useTransform(mouseX, [-400, 400], [-8, 8]);
  const cardY3 = useTransform(mouseY, [-400, 400], [10, -10]);
  const cardX4 = useTransform(mouseX, [-400, 400], [10, -10]);
  const cardY4 = useTransform(mouseY, [-400, 400], [-8, 8]);
  const cardX5 = useTransform(mouseX, [-400, 400], [-6, 6]);
  const cardY5 = useTransform(mouseY, [-400, 400], [-6, 6]);

  const parallaxX = [cardX1, cardX2, cardX3, cardX4, cardX5];
  const parallaxY = [cardY1, cardY2, cardY3, cardY4, cardY5];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const words = HEADLINE.split(" ");

  return (
    <section
      aria-label="Hero"
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#030306]"
      onMouseMove={handleMouseMove}
    >
      {/* Base gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(15, 23, 42, 0.6) 0%, rgba(3, 3, 6, 0.95) 60%, #030306 100%)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay bg-repeat bg-[length:100px_100px]"
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
      />

      {/* Light orbs */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-cyan-500/15"
        style={{ left: "10%", top: "20%" }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-indigo-500/10"
        style={{ right: "15%", bottom: "25%" }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full blur-[80px] bg-cyan-400/10"
        style={{ left: "50%", top: "60%", transform: "translateX(-50%)" }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spotlight / vignette behind headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34, 211, 238, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating cards: outer = mouse parallax, inner = continuous float */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={card.domain}
            className="absolute"
            style={{
              left: card.left,
              top: card.top,
              x: parallaxX[i],
              y: parallaxY[i],
            }}
          >
            <motion.div
              className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 shadow-[0_0_20px_rgba(34,211,238,0.06)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.5 + i * 0.1 },
                scale: { duration: 0.6, delay: 0.5 + i * 0.1 },
                y: {
                  duration: card.floatDur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.floatDelay,
                },
                rotate: {
                  duration: card.rotDur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.floatDelay * 2,
                },
              }}
            >
              <div className="text-[10px] text-cyan-400/70 tracking-wide">{card.domain}</div>
              <div className="font-[family-name:var(--font-space)] text-xs font-medium text-white mt-0.5">
                {card.title}
              </div>
              <MiniChart values={card.chart} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 text-center">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-5xl mx-auto"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 font-light"
        >
          {SUBHEADLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="#case-studies"
            className="group relative rounded-lg px-8 py-4 font-medium overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute inset-0 rounded-lg opacity-70"
              style={{
                background: "linear-gradient(135deg, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.15) 100%)",
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-lg"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(34, 211, 238, 0.4)",
              }}
              animate={{
                boxShadow: [
                  "inset 0 0 0 1px rgba(34, 211, 238, 0.4)",
                  "inset 0 0 0 1px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.2)",
                  "inset 0 0 0 1px rgba(34, 211, 238, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative text-cyan-400">Enter the Growth System</span>
          </Link>
          <Link
            href="#case-studies"
            className="relative text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base font-medium group/link inline-block"
          >
            View case studies
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover/link:w-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
