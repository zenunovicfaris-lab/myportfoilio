"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HEADLINE = "Growth Systems That Scale";
const SUB = "Technical SEO · Content Operations · Automation";

export default function Scene01Boot() {
  return (
    <header className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[520px] w-[980px] rounded-full bg-cyan-500/10" />
        <div className="absolute left-[12%] top-[62%] h-[420px] w-[420px] rounded-full bg-indigo-500/10" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute right-[15%] top-[25%] h-[320px] w-[320px] rounded-full bg-purple-500/8" />
        <div className="absolute left-[20%] bottom-[30%] h-[280px] w-[280px] rounded-full bg-blue-500/8" />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.12),transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.h1
            className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          >
            {HEADLINE}
          </motion.h1>
          
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-300/90"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {SUB}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              href="#case-studies"
              className="group relative inline-flex items-center justify-center rounded-xl px-8 py-4 font-medium text-white transform transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/35 via-cyan-400/20 to-indigo-400/25" />
              <motion.span
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    "inset 0 0 0 1px rgba(34,211,238,0.35)",
                    "inset 0 0 0 1px rgba(34,211,238,0.65), 0 0 32px rgba(34,211,238,0.22)",
                    "inset 0 0 0 1px rgba(34,211,238,0.35)",
                  ],
                }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
              <span className="relative text-cyan-100 transition-transform duration-300 group-hover:scale-[1.02]">
                Enter the Growth System
              </span>
            </Link>

            <Link
              href="#case-studies"
              className="relative inline-block text-gray-300/85 hover:text-cyan-200 transition-colors group/link"
            >
              View case studies
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover/link:w-full" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

