"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ─── Logo data ────────────────────────────────────────────────────────────────
const LOGOS = [
  { name: "NewsBTC",          file: "newsbtc"         },
  { name: "Bitcoinist",       file: "bitcoinist"      },
  { name: "CryptoNews",       file: "cryptonews"      },
  { name: "ClickOut Media",   file: "clickoutmedia"   },
  { name: "Imperia",          file: "imperia"         },
  { name: "HTMQ",             file: "htmq"            },
  { name: "Uvezi",            file: "uvezi"           },
  { name: "HealthStatus",     file: "healthstatus"    },
  { name: "Videogamer",       file: "videogamer"      },
  { name: "Esports Insider",  file: "esports"         },
  { name: "Adventure Gamers", file: "adventuregamers" },
  { name: "ICObench",         file: "icobench"        },
] as const;

// Duplicate so the seamless loop always has enough content
const TRACK = [...LOGOS, ...LOGOS];

// ─────────────────────────────────────────────────────────────────────────────
export default function LogoMarquee() {
  return (
    <section className="relative py-14 overflow-hidden">
      {/* Top separator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-[9px] md:text-[10px] font-semibold tracking-[0.26em] uppercase text-gray-600 mb-10 select-none"
      >
        Trusted by leading brands in iGaming, Crypto &amp; Tech
      </motion.p>

      {/* ── Scrolling track ─────────────────────────────────────────────── */}
      {/*
        Left / right edges fade to #0f1117 via CSS mask so logos dissolve
        cleanly at the viewport boundary - no hard clip.
      */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
        }}
      >
        {/* Outer wrapper - hides overflow, pauses on hover */}
        <div className="flex overflow-hidden [--gap:theme(spacing.14)]">
          {/*
            Inner track is 200% wide (two full sets of logos).
            The CSS animation moves it left by exactly 50% (one set),
            then snaps back to 0 - completely seamless.
          */}
          <div className="flex shrink-0 gap-[var(--gap)] animate-marquee">
            {TRACK.map((logo, i) => (
              <LogoItem key={`${logo.file}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}

// ─── Single logo item ─────────────────────────────────────────────────────────
function LogoItem({ logo }: { logo: (typeof LOGOS)[number] }) {
  return (
    <div className="relative flex-shrink-0 group flex items-center justify-center h-16 md:h-20">
      {/* Glow that appears on hover */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   [background:radial-gradient(120px_circle_at_50%_50%,rgba(20,184,166,0.22),transparent_70%)]
                   blur-sm pointer-events-none"
      />

      <Image
        src={`/logos/${logo.file}.png`}
        alt={logo.name}
        width={220}
        height={80}
        draggable={false}
        className="
          h-10 md:h-14 w-auto max-w-[160px] md:max-w-[200px] object-contain select-none
          grayscale opacity-40
          group-hover:grayscale-0 group-hover:opacity-95
          transition-all duration-500 ease-out
          group-hover:scale-105
          drop-shadow-[0_0_0px_rgba(20,184,166,0)]
          group-hover:drop-shadow-[0_0_16px_rgba(20,184,166,0.5)]
        "
      />
    </div>
  );
}
