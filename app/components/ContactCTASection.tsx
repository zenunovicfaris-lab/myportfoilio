"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Replace with your actual email
const EMAIL = "hello@fariszenunovic.com";

export default function ContactCTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-6 py-24 md:py-32 bg-gradient-to-b from-[#0d0d14] to-[#050508]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 id="contact-heading" className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-4">
          Let&apos;s build scalable growth.
        </h2>
        <p className="text-gray-400 mb-2">
          From audit to automation - I help brands and products grow through SEO and content systems.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Based in Živinice, Bosnia and Herzegovina. Working with clients globally.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-cyan-500/25 px-8 py-4 font-medium text-cyan-400 ring-1 ring-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all hover:bg-cyan-500/35 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          >
            Book a strategy call
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {EMAIL}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
