"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { FormEvent } from "react";
import { Mail, Phone, Linkedin, MessageCircle, Send } from "lucide-react";

import { EMAIL, PROFILES, TELEPHONE } from "../../lib/entity";

const EASE = [0.16, 1, 0.3, 1] as const;
const WHATSAPP_NUMBER = TELEPHONE.replace(/\D/g, "");

export default function ContactSection() {
  const t = useTranslations("contact");

  const cards = [
    {
      href: `tel:${TELEPHONE}`,
      icon: Phone,
      title: t("phone"),
      value: "+387 60 305 5894",
      tone: "from-cyan-400 to-blue-400 border-cyan-500/30 text-cyan-400",
    },
    {
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      icon: MessageCircle,
      title: t("whatsapp"),
      value: "+387 60 305 5894",
      tone: "from-green-400 to-emerald-400 border-green-500/30 text-green-400",
      external: true,
    },
    {
      href: `mailto:${EMAIL}`,
      icon: Mail,
      title: t("email"),
      value: EMAIL,
      tone: "from-emerald-400 to-teal-400 border-emerald-500/30 text-emerald-400",
    },
    {
      href: PROFILES.linkedin,
      icon: Linkedin,
      title: t("linkedin"),
      value: "/fariszenunovic",
      tone: "from-blue-400 to-indigo-400 border-blue-500/30 text-blue-400",
      external: true,
    },
  ];

  // No backend: the form composes the message and hands it to the visitor's
  // email client or WhatsApp, so nothing has to be stored or secured here.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const website = String(form.get("website") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = [
      `${t("formName")}: ${name}`,
      `${t("formWebsite")}: ${website}`,
      "",
      message,
    ].join("\n");

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "whatsapp") {
      const text = `${t("formSubject")}\n\n${body}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t("formSubject"))}&body=${encodeURIComponent(body)}`;
    }
  };

  const inputCls =
    "w-full rounded-xl bg-[#0f1117] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition";

  return (
    <section id="contact" className="py-24 px-6 md:px-10 pb-32 bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-400 mb-4 px-3.5 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/8">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t("heading")}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">{t("description")}</p>
        </motion.div>

        {/* Free audit request */}
        <motion.form
          id="audit-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl border border-teal-500/20 bg-[#111218] p-6 md:p-8 mb-10"
        >
          <h3 className="font-[family-name:var(--font-space)] text-xl md:text-2xl font-bold text-white mb-2">
            {t("auditHeading")}
          </h3>
          <p className="text-sm text-gray-400 mb-6">{t("auditDesc")}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formName")}</span>
              <input name="name" required autoComplete="name" className={inputCls} />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formWebsite")}</span>
              <input name="website" required inputMode="url" placeholder="https://" className={inputCls} />
            </label>
          </div>
          <label className="block mb-6">
            <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formMessage")}</span>
            <textarea name="message" rows={4} className={`${inputCls} resize-y`} />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              value="email"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-400 text-[#0f1117] font-semibold rounded-xl hover:shadow-[0_0_40px_-8px_rgba(20,184,166,0.7)] transition-shadow"
            >
              {t("formSubmitEmail")} <Send size={15} />
            </button>
            <button
              type="submit"
              value="whatsapp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1d27] border border-green-500/30 text-white font-semibold rounded-xl hover:border-green-400/60 hover:bg-green-500/5 transition-colors"
            >
              {t("formSubmitWhatsApp")} <MessageCircle size={15} />
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-500">{t("formNote")}</p>
        </motion.form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const [from, to, border, text] = c.tone.split(" ");
            return (
              <motion.a
                key={c.title}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                className={`group flex items-center gap-4 bg-white/[0.02] border ${border} p-5 rounded-2xl hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all`}
              >
                <Icon className={`w-8 h-8 shrink-0 ${text}`} />
                <span className="min-w-0">
                  <span className={`block text-sm font-bold bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent`}>
                    {c.title}
                  </span>
                  <span className="block text-sm text-gray-300 break-all">{c.value}</span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
