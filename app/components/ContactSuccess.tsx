"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Globe, Mail, MessageCircle, ArrowRight, RotateCcw } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type SentRequest = { name: string; email: string; website: string };

type Props = {
  sent: SentRequest;
  whatsappHref: string;
  onReset: () => void;
};

export default function ContactSuccess({ sent, whatsappHref, onReset }: Props) {
  const t = useTranslations("contact.success");
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen readers announce it and keyboard
  // users aren't left on a button that no longer exists.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const firstName = sent.name.split(/\s+/)[0] || sent.name;
  const site = sent.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const steps = [
    { title: t("step1Title"), text: t("step1Text", { website: site }) },
    { title: t("step2Title"), text: t("step2Text", { email: sent.email }) },
    { title: t("step3Title"), text: t("step3Text") },
  ];

  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.35 + i * 0.08, ease: EASE },
  });

  return (
    <div role="status" aria-live="polite" className="relative pt-3">
      {/* Soft glow behind the badge */}
      <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        {/* Animated check badge */}
        <div className="relative mb-7 h-24 w-24">
          {!reduce &&
            [0, 1].map((ring) => (
              <motion.span
                key={ring}
                className="absolute inset-0 rounded-full border border-teal-400/40"
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 2.2, delay: 0.5 + ring * 1.1, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          <motion.div
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 shadow-[0_0_60px_-10px_rgba(45,212,191,0.8)]"
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="#0f1117"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.span
          {...item(0)}
          className="mb-3 inline-block rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h3
          {...item(1)}
          ref={headingRef}
          tabIndex={-1}
          className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold text-white tracking-tight outline-none"
        >
          {t("title", { name: firstName })}
        </motion.h3>

        <motion.p {...item(2)} className="mt-3 max-w-md text-sm md:text-base text-gray-400 leading-relaxed">
          {t("text")}
        </motion.p>

        {/* What was sent */}
        <motion.div {...item(3)} className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-gray-300">
            <Globe size={13} className="shrink-0 text-teal-400" />
            <span className="truncate">{site}</span>
          </span>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-gray-300">
            <Mail size={13} className="shrink-0 text-teal-400" />
            <span className="truncate">{sent.email}</span>
          </span>
        </motion.div>
      </div>

      {/* Next steps */}
      <motion.div {...item(4)} className="relative mt-9">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("nextTitle")}
        </p>
        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              {...item(5 + i)}
              className="rounded-xl border border-white/8 bg-[#0f1117] p-4 text-left"
            >
              <span className="mb-3 grid h-7 w-7 place-items-center rounded-lg bg-teal-500/15 text-xs font-bold text-teal-300">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-white">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500 break-words">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* Actions */}
      <motion.div {...item(8)} className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-[#0f1117] hover:shadow-[0_0_40px_-8px_rgba(20,184,166,0.7)] transition-shadow"
        >
          {t("ctaProjects")} <ArrowRight size={15} />
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-[#1a1d27] px-5 py-3 text-sm font-semibold text-white hover:border-green-400/60 hover:bg-green-500/5 transition-colors"
        >
          {t("ctaWhatsApp")} <MessageCircle size={15} />
        </a>
      </motion.div>

      <motion.div {...item(9)} className="relative mt-5 text-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <RotateCcw size={12} /> {t("again")}
        </button>
      </motion.div>
    </div>
  );
}
