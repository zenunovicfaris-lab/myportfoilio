"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Scene06ContactEnd() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute left-[30%] top-[20%] h-[500px] w-[500px] rounded-full blur-3xl bg-indigo-500/10" />
        <div className="absolute right-[30%] bottom-[20%] h-[400px] w-[400px] rounded-full blur-3xl bg-cyan-500/10" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-full blur-3xl bg-white/5" />
      </div>

      <div className="relative z-10 flex h-dvh items-center justify-center px-6">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Let's build your growth system
          </h2>
          <p className="mt-6 text-gray-300/85 text-base sm:text-lg leading-relaxed">
            If you want SEO that behaves like a system - measurable, shippable, and built for compounding returns -
            let's talk.
          </p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href="mailto:hello@fariszenunovic.com"
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
                Get in touch
              </span>
            </Link>

            <Link
              href="https://linkedin.com/in/fariszenunovic"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-gray-300/85 hover:text-cyan-200 transition-colors group/link"
            >
              hello@fariszenunovic.com
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover/link:w-full" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <div className="text-xs tracking-[0.24em] text-gray-400/60">
              ŽIVINICE, BOSNIA AND HERZEGOVINA · WORKING GLOBALLY
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

