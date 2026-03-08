"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { User, Code, FileText, Phone, type LucideIcon } from "lucide-react";

const SECTIONS = ["about", "projects", "resume", "contact"] as const;
type Section = (typeof SECTIONS)[number];

type NavItem = { href: string; label: string; id: Section; icon: LucideIcon };

const NAV_ITEMS: NavItem[] = [
  { href: "#about",    label: "About Me",  id: "about",    icon: User     },
  { href: "#projects", label: "Portfolio", id: "projects", icon: Code     },
  { href: "#resume",   label: "Resume",    id: "resume",   icon: FileText },
  { href: "#contact",  label: "Contact",   id: "contact",  icon: Phone    },
];

export default function Sidebar() {
  // ── Mounted gate ──────────────────────────────────────────────────────────
  // Must be false on first render so SSR output === first client render.
  // Every dynamic className and every conditional Framer Motion element that
  // depends on client state (active section, scroll position) is hidden until
  // after hydration completes.
  const [mounted, setMounted] = useState(false);

  const [activeSection, setActiveSection] = useState<Section>("about");
  const lastActiveRef = useRef<Section>("about");

  useEffect(() => {
    setMounted(true);
  }, []);

  // rAF-throttled scroll spy (only runs client-side)
  useEffect(() => {
    let ticking = false;

    const computeActive = () => {
      const y = window.scrollY + 160;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top    = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          if (lastActiveRef.current !== id) {
            lastActiveRef.current = id;
            setActiveSection(id);
          }
          return;
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { computeActive(); ticking = false; });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    computeActive();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle avatar 3-D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, [-18, 18], [6, -6]);
  const rotateY = useTransform(sx, [-18, 18], [-6, 6]);

  const onAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    mx.set(Math.max(-18, Math.min(18, (e.clientX - (r.left + r.width  / 2)) / 6)));
    my.set(Math.max(-18, Math.min(18, (e.clientY - (r.top  + r.height / 2)) / 6)));
  };
  const onAvatarLeave = () => { mx.set(0); my.set(0); };

  return (
    <aside className="w-72 h-screen sticky top-0 flex flex-col bg-[#0d0f16] border-r border-white/8 px-6 py-8">
      {/* Subtle inner edge highlight */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-white/5" />

      {/* ── Profile ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          {/* Avatar with 3-D tilt — tilt is purely client, no hydration risk */}
          <motion.div
            onMouseMove={onAvatarMove}
            onMouseLeave={onAvatarLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-14 h-14 rounded-2xl shrink-0"
          >
            <div className="absolute -inset-2 rounded-[18px] bg-gradient-to-r from-teal-500/20 to-cyan-400/20 blur-xl" />
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/12 bg-[#1a1d27]">
              <Image
                src="/profile.webp"
                alt="Faris Zenunović"
                width={120}
                height={120}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="min-w-0">
            <div className="text-white font-semibold leading-tight truncate text-sm">
              Faris Zenunović
            </div>
            <div className="text-xs bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent font-medium mt-0.5">
              SEO Specialist
            </div>
          </div>
        </div>

        {/* Available badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/8 px-3 py-1 text-xs text-teal-300/80">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          Available for projects
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          // ── Before mount: fully static, no dynamic classes, no layoutId ──
          // This output is byte-identical to the SSR render, preventing any
          // hydration mismatch.
          if (!mounted) {
            return (
              <a
                key={item.id}
                href={item.href}
                className="relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500"
              >
                <span className="relative z-10 text-gray-600">
                  <Icon size={15} />
                </span>
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          }

          // ── After mount: full animated version with active state ──────────
          const active = activeSection === item.id;

          return (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200",
                active ? "text-white" : "text-gray-500 hover:text-gray-200",
              ].join(" ")}
            >
              {/* Sliding active background pill */}
              {active && (
                <motion.div
                  layoutId="navActiveBg"
                  className="absolute inset-0 rounded-xl bg-teal-500/10 border border-teal-500/20"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                />
              )}

              {/* Icon */}
              <span
                className={[
                  "relative z-10 transition-colors",
                  active ? "text-teal-400" : "text-gray-600 group-hover:text-gray-400",
                ].join(" ")}
              >
                <Icon size={15} />
              </span>

              {/* Label */}
              <span className="relative z-10">{item.label}</span>

              {/* Active left-edge indicator bar */}
              {active && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-cyan-300"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                />
              )}

              {/* Hover sheen */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/8 blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-[380px] transition-all duration-700" />
              </span>
            </motion.a>
          );
        })}
      </nav>

      {/* ── CTA button ──────────────────────────────────────────────────── */}
      <div className="pt-5 mt-5 border-t border-white/8">
        <motion.a
          href="#contact"
          whileHover={{ y: -2, scale: 1.015 }}
          whileTap={{ scale: 0.975 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="relative block w-full rounded-xl px-5 py-3.5 text-center text-sm font-semibold text-[#0f1117]
                     bg-gradient-to-r from-teal-500 to-cyan-400
                     shadow-[0_12px_40px_-14px_rgba(20,184,166,0.65)]
                     hover:shadow-[0_16px_50px_-14px_rgba(20,184,166,0.85)] transition-shadow"
        >
          Get In Touch
        </motion.a>
      </div>
    </aside>
  );
}
