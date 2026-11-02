"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Megaphone, Phone, MessageCircle } from "lucide-react";

import { META_ADS_CLIENTS, type MetaAdsFeaturedMsg } from "../../lib/metaAds";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Goal icon per featured client: conversations vs. calls
const GOAL_ICON = { epoxy387: MessageCircle, vorbild: Phone } as const;

export default function MetaAdsSection() {
  const t = useTranslations("metaAds");
  const featured = META_ADS_CLIENTS.filter((c) => c.shot);

  return (
    <section id="ads" className="py-24 px-6 md:px-10 bg-[#0f1117]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{t("description")}</p>
        </motion.div>

        {/* Clients */}
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">{t("clientsLabel")}</p>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-14"
          role="list"
        >
          {META_ADS_CLIENTS.map((c) => (
            <motion.li
              key={c.id}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#111218] px-4 py-3 lg:flex-col lg:items-start lg:gap-2"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-400">
                <Megaphone size={15} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white leading-snug">{c.name}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{t(`clients.${c.id}`)}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Featured results */}
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((c, i) => {
            const msg = t.raw(`featured.${c.id}`) as MetaAdsFeaturedMsg;
            const Icon = GOAL_ICON[c.id as keyof typeof GOAL_ICON] ?? Megaphone;
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                className="flex flex-col rounded-2xl border border-white/8 bg-[#111218] p-6 hover:border-teal-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{t(`clients.${c.id}`)}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold text-teal-300">
                    <Icon size={12} /> {msg.goal}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{msg.summary}</p>

                <dl className="grid grid-cols-3 gap-2 mb-4">
                  {msg.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-teal-500/15 bg-teal-500/[0.04] px-3 py-3">
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block whitespace-nowrap font-[family-name:var(--font-space)] text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                          {m.value}
                        </span>
                        <span className="block text-[11px] leading-snug text-gray-500 mt-1">{m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                {msg.extra && <p className="text-xs text-gray-400 mb-5">{msg.extra}</p>}

                {c.shot && (
                  <figure className="mt-auto">
                    <div className="group/proof relative overflow-hidden rounded-xl border border-white/10 bg-white">
                      <Image
                        src={c.shot.src}
                        alt={msg.caption}
                        width={c.shot.w}
                        height={c.shot.h}
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="w-full h-auto transition-transform duration-500 ease-out group-hover/proof:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="mt-2 text-[11px] text-gray-500">{msg.caption}</figcaption>
                  </figure>
                )}
              </motion.article>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-gray-600">{t("sourceNote")}</p>
      </div>
    </section>
  );
}
