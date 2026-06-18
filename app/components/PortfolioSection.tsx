"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const PROJECTS_VISIBLE_DEFAULT = 6;

// Non-translatable data (links, flags, image paths) — same for all locales
const PROJECTS_STATIC = [
  { id: 1, image: "/images/esports.net SEMrush.jpg", link: "https://www.esports.net/",                 newTab: true,  nofollow: true  },
  { id: 2, image: "/images/99bitcoins-semrush.jpg",  link: "https://99bitcoins.com/",                  newTab: true,  nofollow: true  },
  { id: 3, image: "/images/kakolako-gsc.jpg",        link: "https://kakolako.org/",                    newTab: true,  nofollow: false },
  { id: 4, image: "/images/alfa-metabo-seo-site.jpg",link: null,                                       newTab: false, nofollow: false },
  { id: 5, image: "/images/ai-saas-project.jpg",     link: "https://www.instagram.com/salecloser.ba/", newTab: true,  nofollow: false },
  { id: 6, image: "/images/auratherm-website.jpg",   link: "https://www.auratherm.ba/",                newTab: true,  nofollow: false },
  { id: 7, image: "/images/casino-bih.jpg",          link: "https://www.casino-bih.com/",              newTab: true,  nofollow: false },
] as const;

type ProjectMsg = { title: string; description: string; tags: string[] };
type Project    = ProjectMsg & (typeof PROJECTS_STATIC)[number];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(4px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0, y: 24, scale: 0.96, filter: "blur(4px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function ProjectCard({ p, t, revealed }: { p: Project; t: ReturnType<typeof useTranslations>; revealed?: boolean }) {
  // Cards revealed via "Show more" animate themselves in/out; the initial
  // cards inherit their enter animation from the parent grid's scroll stagger.
  const animationProps = revealed
    ? { variants: cardVariants, initial: "hidden" as const, animate: "show" as const, exit: "exit" as const }
    : { variants: cardVariants };

  return (
    <motion.article
      {...animationProps}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative flex flex-col bg-[#111218] border border-white/8 rounded-2xl overflow-hidden hover:border-teal-500/35 will-change-transform transition-colors duration-300 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_48px_-12px_rgba(20,184,166,0.18)]"
    >
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-teal-500/0 group-hover:bg-teal-500/8 blur-3xl transition-all duration-700 pointer-events-none" />

      <div className="relative aspect-video bg-[#1a1d27] overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          unoptimized
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111218]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(ellipse_at_50%_0%,rgba(20,184,166,0.13),transparent_70%)]" />
        <span className="absolute top-3 left-3 text-[10px] font-bold font-mono text-white/20 group-hover:text-teal-400/50 transition-colors duration-300 select-none">
          {String(p.id).padStart(2, "0")}
        </span>
        {p.link && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider bg-teal-500/20 border border-teal-500/30 text-teal-300 px-2 py-1 rounded-full backdrop-blur-sm">
              <ExternalLink size={9} />
              {t("live")}
            </span>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-semibold text-white text-base mb-2 leading-snug group-hover:text-teal-100 transition-colors duration-200">
          {p.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{p.description}</p>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="flex flex-wrap gap-1.5 mb-5"
        >
          {p.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-gray-500 group-hover:border-teal-500/20 group-hover:text-gray-400 transition-colors duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex justify-end border-t border-white/6 pt-4">
          {p.link ? (
            <motion.a
              href={p.link}
              target={p.newTab ? "_blank" : undefined}
              rel={[p.newTab ? "noopener noreferrer" : "", p.nofollow ? "nofollow" : ""].filter(Boolean).join(" ")}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              {t("viewDetails")} <ArrowUpRight size={14} />
            </motion.a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 cursor-default select-none">
              {t("viewDetails")} <ArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [showAll, setShowAll] = useState(false);

  // Merge translated strings with static data by index
  const projects: Project[] = (t.raw("projects") as ProjectMsg[]).map((msg, i) => ({
    ...msg,
    ...PROJECTS_STATIC[i],
  }));

  const visibleProjects = showAll ? projects : projects.slice(0, PROJECTS_VISIBLE_DEFAULT);
  const hiddenCount     = projects.length - PROJECTS_VISIBLE_DEFAULT;

  return (
    <section id="projects" className="py-24 px-6 md:px-10 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{t("description")}</p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence initial={false}>
            {visibleProjects.map((p, i) => (
              <ProjectCard key={p.id} p={p} t={t} revealed={i >= PROJECTS_VISIBLE_DEFAULT} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hiddenCount > 0 && (
          <div className="flex justify-center mt-12">
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors duration-200 px-5 py-2.5 rounded-full border border-white/10 hover:border-teal-500/30 bg-[#111218] hover:bg-teal-500/5"
            >
              {showAll ? t("showLess") : t("showMore", { count: hiddenCount })}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex"
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
