"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Mail, Phone, Linkedin, MessageCircle, Send, Loader2 } from "lucide-react";

import { EMAIL, PROFILES, TELEPHONE, WEB3FORMS_ACCESS_KEY } from "../../lib/entity";
import ContactSuccess, { type SentRequest } from "./ContactSuccess";

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

  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sent, setSent] = useState<SentRequest | null>(null);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("formSubject"))}`;

  // Web3Forms emails the submission straight to the inbox tied to the access
  // key — no backend of our own, and nothing opens on the visitor's side.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "").trim();

    // Sent as FormData, not JSON: a JSON content type triggers a CORS preflight,
    // which the Web3Forms API rejects. multipart/form-data is a simple request.
    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_ACCESS_KEY);
    payload.append("subject", `${t("formSubject")} - ${field("website")}`);
    payload.append("from_name", "fariszenunovic.com");
    payload.append("name", field("name"));
    payload.append("email", field("email")); // Web3Forms uses this as the reply-to address
    payload.append("website", field("website"));
    payload.append("message", field("message"));
    payload.append("page", window.location.href);
    if (form.get("botcheck")) payload.append("botcheck", "on");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setSent({ name: field("name"), email: field("email"), website: field("website") });
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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
        <motion.div
          id="audit-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`relative overflow-hidden rounded-2xl border bg-[#111218] p-6 md:p-8 mb-10 transition-colors duration-500 ${sent ? "border-teal-400/40" : "border-teal-500/20"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <ContactSuccess sent={sent} whatsappHref={whatsappHref} onReset={() => { setSent(null); setStatus("idle"); }} />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
            <h3 className="font-[family-name:var(--font-space)] text-xl md:text-2xl font-bold text-white mb-2">
              {t("auditHeading")}
            </h3>
            <p className="text-sm text-gray-400 mb-6">{t("auditDesc")}</p>
            <fieldset disabled={status === "sending"} className="contents">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formName")}</span>
                  <input name="name" required autoComplete="name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formEmail")}</span>
                  <input name="email" type="email" required autoComplete="email" className={inputCls} />
                </label>
              </div>
              <label className="block mb-4">
                <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formWebsite")}</span>
                <input name="website" required inputMode="url" placeholder="https://" className={inputCls} />
              </label>
              <label className="block mb-6">
                <span className="block text-xs font-medium text-gray-400 mb-1.5">{t("formMessage")}</span>
                <textarea name="message" rows={4} className={`${inputCls} resize-y`} />
              </label>

              {/* Honeypot: hidden from people, bots fill it and Web3Forms drops the submission */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {status === "error" && (
                <p role="alert" className="mb-4 text-sm text-red-400">
                  {t("formError")}{" "}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-400 text-[#0f1117] font-semibold rounded-xl hover:shadow-[0_0_40px_-8px_rgba(20,184,166,0.7)] transition-shadow disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>{t("formSending")} <Loader2 size={15} className="animate-spin" /></>
                  ) : (
                    <>{t("formSubmit")} <Send size={15} /></>
                  )}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("formSubject"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1d27] border border-green-500/30 text-white font-semibold rounded-xl hover:border-green-400/60 hover:bg-green-500/5 transition-colors"
                >
                  {t("formSubmitWhatsApp")} <MessageCircle size={15} />
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-500">{t("formNote")}</p>
            </fieldset>
            </motion.form>
          )}
          </AnimatePresence>
        </motion.div>

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
