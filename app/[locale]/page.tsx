"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Mail, Phone, Linkedin, Github, MapPin, ChevronRight } from "lucide-react";

import PortfolioSection  from "../components/PortfolioSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection  from "../components/EducationSection";
import HeroLogoStrip     from "../components/HeroLogoStrip";
import SocialLinks       from "../components/SocialLinks";
import RotatingText      from "../components/RotatingText";

const EffectsLayer          = dynamic(() => import("../components/EffectsLayer"),          { ssr: false });
const GrowthScrollAnimation = dynamic(() => import("../components/GrowthScrollAnimation"), { ssr: false });

export default function Home() {
  const t      = useTranslations("hero");
  const tc     = useTranslations("contact");
  const locale = useLocale();

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

      {/* ═══ 1. HERO (id="about") ══════════════════════════════════════════ */}
      <section id="about" className="min-h-screen flex items-center px-6 md:px-10 py-24 relative">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 text-center lg:text-left leading-tight"
              >
                Faris Zenunović
                <span className="sr-only">{t("srOnly")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-4 opacity-90 text-center lg:text-left"
              >
                {t("role")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="text-lg text-gray-500 max-w-3xl mx-auto lg:mx-0 mb-8 text-center lg:text-left flex items-center gap-2 flex-wrap justify-center lg:justify-start"
              >
                {locale === "bs" ? "Specijaliziran kao" : "Specialized in"}{" "}
                <RotatingText words={t.raw("rotatingWords") as string[]} />
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4"
              >
                {t("description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 mb-10"
              >
                <MapPin size={13} className="text-teal-500 shrink-0" />
                {t("location")}
              </motion.div>

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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-400 text-[#0f1117] font-semibold rounded-xl shadow-[0_0_40px_-8px_rgba(20,184,166,0.55)] hover:shadow-[0_0_60px_-8px_rgba(20,184,166,0.8)] transition-shadow"
                >
                  {t("ctaPortfolio")} <ChevronRight size={16} />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1d27] border border-white/10 text-white font-semibold rounded-xl hover:border-teal-500/40 hover:bg-teal-500/5 transition-colors"
                >
                  {t("ctaContact")} <Mail size={16} />
                </motion.a>
                {locale === "bs" && (
                  <motion.a
                    href="/bs/usluge"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-[0_0_40px_-8px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_-8px_rgba(249,115,22,0.6)] transition-shadow"
                  >
                    💼 SEO Usluge BiH
                  </motion.a>
                )}
              </motion.div>
              <div className="mt-6">
                <SocialLinks />
              </div>
            </div>

            {/* RIGHT: Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-teal-500/15 pointer-events-none" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-400/10 pointer-events-none" />
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-teal-500/30 shadow-[0_0_60px_-10px_rgba(20,184,166,0.45),0_32px_80px_-20px_rgba(0,0,0,0.8)]">
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
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6 -right-4 sm:-right-8 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-[#0d0f16]/90 px-4 py-2 text-xs text-teal-300 font-medium shadow-lg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  {t("available")}
                </motion.div>
              </div>
            </motion.div>

          </div>
          <HeroLogoStrip />
        </div>
      </section>

      {/* ═══ 2. GROWTH SCROLL ANIMATION ════════════════════════════════════ */}
      <GrowthScrollAnimation />

      {/* ═══ 3. PORTFOLIO (id="projects") ══════════════════════════════════ */}
      <PortfolioSection />

      {/* ═══ 4+5. SKILLS & EXPERIENCE (id="resume") ════════════════════════ */}
      <ExperienceSection />

      {/* ═══ 5b. EDUCATION & LANGUAGES (id="education") ════════════════════ */}
      <EducationSection />

      {/* ═══ 6. CONTACT (id="contact") ══════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 md:px-10 pb-32 bg-[#0a0a0f]">
        <div className="max-w-2xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
              {tc("label")}
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {tc("heading")}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {tc("description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href="tel:+387603055894"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="group bg-gradient-to-r from-cyan-500/10 bg-cyan-500/5 border border-cyan-500/30 p-8 rounded-2xl text-center hover:scale-105 hover:border-cyan-400/50 transition-all duration-300 block"
            >
              <Phone className="w-16 h-16 mx-auto mb-6 text-cyan-400 group-hover:text-cyan-300 transition" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{tc("phone")}</h3>
              <span className="text-xl font-mono group-hover:text-cyan-400 transition-all duration-300 block">+387 60 305 5894</span>
            </motion.a>

            <motion.a
              href="mailto:zenunovicfaris@gmail.com"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="group bg-gradient-to-r from-emerald-500/10 bg-emerald-500/5 border border-emerald-500/30 p-8 rounded-2xl text-center hover:scale-105 transition-all block"
            >
              <Mail className="w-16 h-16 mx-auto mb-6 text-emerald-400 group-hover:text-emerald-300 transition" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-center">{tc("email")}</h3>
              <span className="text-xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors block w-full text-center break-all">zenunovicfaris@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/fariszenunovic"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="group bg-gradient-to-r from-blue-500/10 bg-blue-500/5 border border-blue-500/30 p-8 rounded-2xl text-center hover:scale-105 transition-all block"
            >
              <Linkedin className="w-16 h-16 mx-auto mb-6 text-blue-400 group-hover:text-blue-300 transition" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{tc("linkedin")}</h3>
              <span className="text-xl font-mono group-hover:text-blue-400 transition">/fariszenunovic</span>
            </motion.a>

            <motion.a
              href="https://github.com/zenunovicfaris-lab"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="group bg-gradient-to-r from-gray-800/50 bg-gray-800/30 border border-gray-500/30 p-8 rounded-2xl text-center hover:scale-105 transition-all block"
            >
              <Github className="w-16 h-16 mx-auto mb-6 text-gray-400 group-hover:text-white transition" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">{tc("github")}</h3>
              <span className="text-xl font-mono group-hover:text-white transition">/zenunovicfaris-lab</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
