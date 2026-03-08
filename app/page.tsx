"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  ChevronRight,
} from "lucide-react";

import PortfolioSection  from "./components/PortfolioSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroLogoStrip     from "./components/HeroLogoStrip";

const EffectsLayer          = dynamic(() => import("./components/EffectsLayer"),          { ssr: false });
const GrowthScrollAnimation = dynamic(() => import("./components/GrowthScrollAnimation"), { ssr: false });

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {

  // Smooth anchor scroll
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.body.addEventListener("click", onClick);
    return () => document.body.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative">
      <EffectsLayer />

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO  (also serves as "About Me" — id="about")
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="min-h-screen flex items-center px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Text ──────────────────────────────────────────── */}
            <div className="order-2 lg:order-1 text-center lg:text-left">

              {/* Intro line */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase text-gray-500 mb-5"
              >
                Hi, I&apos;m Faris Zenunović — a{" "}
                <span className="text-teal-400">passionate</span>
              </motion.p>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
                className="font-[family-name:var(--font-space)] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  SEO
                </span>{" "}
                <span className="text-white">Specialist</span>
                <br />
                <span className="text-white/80 text-4xl sm:text-5xl lg:text-6xl">
                  &amp; Growth Partner
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4"
              >
                I specialize in technical SEO, content optimization, and scaling
                multi-language projects. Explore my most powerful projects below.
              </motion.p>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 mb-10"
              >
                <MapPin size={13} className="text-teal-500 shrink-0" />
                Živinice, Bosnia and Herzegovina
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-400
                             text-[#0f1117] font-semibold rounded-xl
                             shadow-[0_0_40px_-8px_rgba(20,184,166,0.55)]
                             hover:shadow-[0_0_60px_-8px_rgba(20,184,166,0.8)] transition-shadow"
                >
                  View Portfolio <ChevronRight size={16} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1d27] border border-white/10
                             text-white font-semibold rounded-xl
                             hover:border-teal-500/40 hover:bg-teal-500/5 transition-colors"
                >
                  Contact Me <Mail size={16} />
                </motion.a>
              </motion.div>
            </div>

            {/* ── RIGHT: Photo ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Ambient glow rings */}
                <div className="absolute -inset-6 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-400/10 blur-xl pointer-events-none" />

                {/* Photo circle */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden
                                border-2 border-teal-500/30
                                shadow-[0_0_60px_-10px_rgba(20,184,166,0.45),0_32px_80px_-20px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/images/faris-about-me.jpg"
                    alt="Faris Zenunović"
                    fill
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0a0a0f]/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating "Available" badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6 -right-4 sm:-right-8 inline-flex items-center gap-2 rounded-full
                             border border-teal-500/25 bg-[#0d0f16]/90 backdrop-blur-sm
                             px-4 py-2 text-xs text-teal-300 font-medium shadow-lg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Available for projects
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Logo strip — full-width, below both columns */}
          <HeroLogoStrip />

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. GROWTH SCROLL ANIMATION
      ═══════════════════════════════════════════════════════════════════ */}
      <GrowthScrollAnimation />

      {/* ════════════════════════════════════════════════════════════════════
          3. PORTFOLIO  (id="projects")
      ═══════════════════════════════════════════════════════════════════ */}
      <PortfolioSection />

      {/* ════════════════════════════════════════════════════════════════════
          4 + 5. SKILLS & EXPERIENCE  (id="resume" via TimelineSection)
      ═══════════════════════════════════════════════════════════════════ */}
      <ExperienceSection />

      {/* ════════════════════════════════════════════════════════════════════
          6. CONTACT  (id="contact")
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 md:px-10 pb-32 bg-[#0a0a0f]">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
              Contact
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-12">
              Have a project in mind? Reach out — I&apos;d love to discuss how we can grow your organic traffic.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "fariszenunovic@gmail.com",
                href: "mailto:fariszenunovic@gmail.com",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "linkedin.com/in/fariszenunovic",
                href: "https://linkedin.com/in/fariszenunovic",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/zenunovicfaris-lab",
                href: "https://github.com/zenunovicfaris-lab",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Živinice, Bosnia and Herzegovina",
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="flex items-center gap-4 bg-[#111218] border border-white/8 rounded-2xl p-5
                           hover:border-teal-500/25 transition-colors duration-200 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20
                               flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-teal-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-0.5">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-teal-400 truncate block transition-colors duration-200"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-300 truncate block">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
