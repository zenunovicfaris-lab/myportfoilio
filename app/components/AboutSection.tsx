"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PILLS = [
  "Technical SEO",
  "Content Systems",
  "Automation",
  "Growth Strategy",
];

export default function AboutSection() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="px-6 py-24 md:py-32 bg-[#0a0a0f]"
    >
      <div className="mx-auto max-w-5xl">

        {/* ── Section label + heading ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[10px] font-semibold tracking-[0.26em] uppercase text-cyan-500/55 mb-3 select-none"
        >
          About
        </motion.p>

        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white text-center mb-14 tracking-tight"
        >
          Hybrid growth partner
        </motion.h2>

        {/* ── 2-column grid ── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── LEFT: photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative group"
          >
            {/* Ambient cyan glow behind the card */}
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[2.5rem] bg-cyan-500/10 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
            />

            {/* Photo card */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_80px_-18px_rgba(0,0,0,0.75)]">
              <Image
                src="/images/faris-about-me.jpg"
                alt="Faris Zenunović"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
              />

              {/* Bottom vignette so the card blends into the dark background */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </motion.div>

          {/* ── RIGHT: text + pills ── */}
          <motion.div
            initial={{ opacity: 0, x: 44 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="flex flex-col gap-6"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              I combine{" "}
              <span className="text-white font-medium">SEO strategy</span> with
              hands-on execution. Not just audits and recommendations — I
              architect{" "}
              <span className="text-white font-medium">content systems</span>,
              build automation, and implement{" "}
              <span className="text-white font-medium">programmatic SEO</span>{" "}
              that scales.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              I work with{" "}
              <span className="text-white font-medium">SaaS</span>, affiliate
              brands in{" "}
              <span className="text-white font-medium">
                iGaming &amp; crypto
              </span>
              , and AI-driven startups. Based in Živinice, Bosnia and
              Herzegovina.
            </p>

            {/* Pills */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
              className="flex flex-wrap gap-2.5 pt-2"
            >
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-cyan-400/90 text-sm font-medium hover:border-cyan-500/55 hover:bg-cyan-500/15 transition-colors duration-300"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
