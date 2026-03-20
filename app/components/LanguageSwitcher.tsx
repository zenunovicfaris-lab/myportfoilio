"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LOCALES = ["bs", "en"] as const;

export default function LanguageSwitcher() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    });
  };

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 uppercase tracking-wide ${loc === locale ? "bg-teal-500 text-white font-semibold" : "text-[#9ca3af] hover:text-white hover:bg-white/8"}`}
          aria-current={loc === locale ? "true" : undefined}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
