"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    id: 1,
    title: "SEO Growth – esports.net",
    image: "/images/esports.net SEMrush.jpg",
    description:
      "Contributed to long-form SEO content and technical optimization for esports.net, supporting organic traffic growth and visibility across competitive search queries.",
    tags: ["SEO", "Content Strategy", "SEMrush"],
    link: "https://www.esports.net/",
    newTab: true,
    nofollow: true,
  },
  {
    id: 2,
    title: "Crypto SEO – 99Bitcoins",
    image: "/images/99bitcoins-semrush.jpg",
    description:
      "SEO strategy and keyword optimization for a high-authority crypto affiliate platform targeting competitive blockchain and cryptocurrency search queries.",
    tags: ["SEO", "Affiliate SEO", "Crypto"],
    link: "https://99bitcoins.com/",
    newTab: true,
    nofollow: true,
  },
  {
    id: 3,
    title: "Startup SEO – kakolako.com",
    image: "/images/kakolako-gsc.jpg",
    description:
      "Built SEO landing pages and optimized site structure to improve keyword rankings and organic traffic for a startup project.",
    tags: ["SEO", "Google Search Console", "Technical SEO"],
    link: "https://kakolako.org/",
    newTab: true,
    nofollow: false,
  },
  {
    id: 4,
    title: "SEO Proposal Landing Page – Alfa Metabo",
    image: "/images/alfa-metabo-seo-site.jpg",
    description:
      "Custom SEO proposal website created to demonstrate how targeted SEO strategy and content optimization could increase inbound leads for a local PVC window company.",
    tags: ["SEO Strategy", "Landing Page", "Lead Generation"],
    link: null,
    newTab: false,
    nofollow: false,
  },
  {
    id: 5,
    title: "AI Sales Automation Concept",
    image: "/images/ai-saas-project.jpg",
    description:
      "Concept and prototype for an AI-powered sales automation tool designed to help local businesses manage Instagram and WhatsApp customer inquiries.",
    tags: ["AI", "SaaS", "Automation"],
    link: "https://www.instagram.com/salecloser.ba/",
    newTab: true,
    nofollow: false,
  },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
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

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <motion.article
      variants={cardVariants}
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
              Live
            </span>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-semibold text-white text-base mb-2 leading-snug group-hover:text-teal-100 transition-colors duration-200">
          {p.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {p.description}
        </p>

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
              rel={[
                p.newTab ? "noopener noreferrer" : "",
                p.nofollow ? "nofollow" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              View Details
              <ArrowUpRight size={14} />
            </motion.a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 cursor-default select-none">
              View Details
              <ArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection() {
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
            Portfolio
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Selected Work
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            A selection of SEO campaigns, web projects, and digital strategies I&apos;ve worked on.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
