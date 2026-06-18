"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GraduationCap, Languages } from "lucide-react";

type EduItem = { degree: string; institution: string; period: string };
type LangItem = { name: string; level: string };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function EducationSection() {
  const t = useTranslations("education");

  const items     = t.raw("items") as EduItem[];
  const languages = t.raw("languages") as LangItem[];

  return (
    <section id="education" className="py-24 px-6 md:px-10 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
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
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Education */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={16} className="text-teal-400" />
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                {t("educationLabel")}
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="border border-white/8 rounded-2xl p-5 bg-[#111218] hover:border-teal-500/20 transition-colors duration-200"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-base text-white leading-snug">{item.degree}</h3>
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border bg-teal-500/10 border-teal-500/22 text-teal-400 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{item.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Languages size={16} className="text-teal-400" />
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                {t("languagesLabel")}
              </p>
            </div>

            <div className="space-y-4">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="border border-white/8 rounded-2xl p-5 bg-[#111218] hover:border-teal-500/20 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-base text-white mb-1">{lang.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{lang.level}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
