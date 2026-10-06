"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ChevronRight, Briefcase } from "lucide-react";

import HeroLogoStrip from "./HeroLogoStrip";
import SocialLinks from "./SocialLinks";
import RotatingText from "./RotatingText";

export default function HomeHero() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-10 py-24 relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            <motion.h1
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 text-center lg:text-left leading-tight"
            >
              Faris Zenunović
              <span className="sr-only">{t("srOnly")}</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-4 opacity-90 text-center lg:text-left"
            >
              {t("role")}
            </motion.p>

            <motion.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="text-lg text-gray-500 max-w-3xl mx-auto lg:mx-0 mb-8 text-center lg:text-left flex items-center gap-2 flex-wrap justify-center lg:justify-start"
            >
              {locale === "bs" ? "Specijaliziran kao" : "Specialized in"}{" "}
              <RotatingText words={t.raw("rotatingWords") as string[]} />
            </motion.p>

            <motion.p
              initial={{ y: 16 }}
              animate={{ y: 0 }}
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
              <span aria-hidden="true" className="text-gray-700">·</span>
              {/* Internal link to the entity home — passes authority to /o-meni */}
              <Link
                href={`/${locale}/o-meni`}
                className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-4 decoration-teal-500/30"
              >
                {t("aboutLink")}
              </Link>
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
              {/* Shown in both languages — /en/usluge was previously unreachable from the UI */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                <Link
                  href={`/${locale}/usluge`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-[0_0_40px_-8px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_-8px_rgba(249,115,22,0.6)] transition-shadow"
                >
                  {t("ctaServices")} <Briefcase size={16} />
                </Link>
              </motion.div>
            </motion.div>
            <div className="mt-6 flex justify-center lg:justify-start">
              <SocialLinks />
            </div>
          </div>

          {/* RIGHT: Photo */}
          <motion.div
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
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
  );
}
