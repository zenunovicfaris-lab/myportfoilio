"use client";
import { useEffect, useRef } from "react";

export default function EffectsLayer() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The spotlight follows a mouse; on touch devices or with reduced motion
    // it would only cost work on every pointer event, so skip it there.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    let frame = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        spotlightRef.current?.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlightRef.current?.style.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Grain / noise overlay — static: animating opacity on a full-screen
          layer forces a repaint of the whole viewport every frame */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] z-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==\")",
          }}
        />
      </div>

      {/* Ambient teal / cyan orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {/* Orb 2 – cyan, top-right */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-400/8 animate-orb-2 motion-reduce:animate-none -top-16 -right-16" />
        {/* Orb 3 – teal, bottom-center */}
        <div className="absolute w-[340px] h-[340px] rounded-full bg-teal-400/7 animate-orb-3 motion-reduce:animate-none bottom-0 left-1/2 -translate-x-1/2" />
      </div>

      {/* Cursor spotlight (teal) */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background:
            "radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20,184,166,0.07) 0%, transparent 40%)",
        }}
      />
    </>
  );
}
