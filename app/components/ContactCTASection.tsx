"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EMAIL = "zenunovicfaris@gmail.com";

export default function ContactCTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative px-6 py-32 md:py-40 overflow-hidden bg-[#050508]"
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl"
      >
        {/* Card */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] px-8 py-14 md:px-16 md:py-20 text-center shadow-[0_0_80px_rgba(34,211,238,0.07)] backdrop-blur-sm">

          {/* Eyebrow */}
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-cyan-400/70 mb-8 select-none">
            Get in touch
          </p>

          {/* Headline */}
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            Ready to grow
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              organically?
            </span>
          </h2>

          {/* Body */}
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            Whether you need a full SEO audit, content strategy, or a long-term growth partner — let&apos;s talk about what&apos;s possible for your brand.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 px-8 py-4 font-medium text-cyan-300 ring-1 ring-cyan-500/40 transition-all duration-300 hover:bg-cyan-500/25 hover:ring-cyan-400/60 hover:shadow-[0_0_32px_rgba(34,211,238,0.2)]"
            >
              Book a strategy call
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-medium text-gray-400 ring-1 ring-white/10 transition-all duration-300 hover:text-white hover:ring-white/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {EMAIL}
            </a>
          </div>

          {/* Location note */}
          <p className="mt-10 text-[12px] text-gray-600 tracking-wide">
            Based in Bosnia & Herzegovina · Working with clients globally
          </p>
        </div>
      </motion.div>
    </section>
  );
}