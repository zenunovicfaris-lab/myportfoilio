"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const LOCALES = ["bs", "en"] as const;

const LABELS: Record<(typeof LOCALES)[number], string> = {
  bs: "Bosanski",
  en: "English",
};

// Real links rather than buttons, so crawlers can follow the language versions
// and users can open them in a new tab.
export default function LanguageSwitcher() {
  const locale   = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
      {LOCALES.map((loc) => (
        <Link
          key={loc}
          href={pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${loc}`)}
          hrefLang={loc}
          aria-label={LABELS[loc]}
          aria-current={loc === locale ? "true" : undefined}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 uppercase tracking-wide ${loc === locale ? "bg-teal-500 text-white font-semibold" : "text-[#9ca3af] hover:text-white hover:bg-white/8"}`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
