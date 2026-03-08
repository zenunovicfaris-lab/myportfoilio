"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LOGOS = [
  { file: "adventuregamers.png", name: "Adventure Gamers" },
  { file: "bitcoinist.png", name: "Bitcoinist" },
  { file: "clickoutmedia.png", name: "ClickOut Media" },
  { file: "cryptonews.png", name: "CryptoNews" },
  { file: "esports.png", name: "Esports" },
  { file: "healthstatus.png", name: "HealthStatus" },
  { file: "htmq.png", name: "HTMQ" },
  { file: "icobench.png", name: "ICOBench" },
  { file: "imperia.png", name: "Imperia" },
  { file: "newsbtc.png", name: "NewsBTC" },
  { file: "uvezi.png", name: "Uvezi" },
  { file: "videogamer.png", name: "VideoGamer" },
  { file: "99bitcoins.png", name: "99Bitcoins" },
];

export default function HeroLogoStrip() {
  return (
    <>
      <style>{`
        @keyframes heroMarquee {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }

        .hero-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0,0,0);
          animation: heroMarquee 32s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track { animation: none; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.55,
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="mt-12 w-full"
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 text-center mb-5 select-none">
          Platforms I&apos;ve worked with
        </p>

        {/* Masked container (soft edge fade without overlay boxes) */}
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Track: two identical groups => seamless loop */}
          <div className="hero-marquee-track">
            <div className="flex items-center gap-12 pr-12">
              {LOGOS.map((logo) => (
                <div
                  key={logo.file}
                  className="shrink-0 flex items-center justify-center bg-transparent"
                >
                  <Image
                    src={`/logos/${logo.file}`}
                    alt={logo.name}
                    width={140}
                    height={40}
                    unoptimized
                    draggable={false}
                    className="h-9 w-auto object-contain select-none bg-transparent
                               opacity-70 grayscale
                               hover:opacity-100 hover:grayscale-0
                               transition-[filter,opacity,transform] duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-12 pr-12" aria-hidden="true">
              {LOGOS.map((logo) => (
                <div
                  key={`dup-${logo.file}`}
                  className="shrink-0 flex items-center justify-center bg-transparent"
                >
                  <Image
                    src={`/logos/${logo.file}`}
                    alt={logo.name}
                    width={140}
                    height={40}
                    unoptimized
                    draggable={false}
                    className="h-9 w-auto object-contain select-none bg-transparent
                               opacity-70 grayscale
                               hover:opacity-100 hover:grayscale-0
                               transition-[filter,opacity,transform] duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
