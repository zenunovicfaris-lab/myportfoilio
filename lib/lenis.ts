import Lenis from "lenis";

export type LenisInstance = Lenis;

export function createLenis() {
  return new Lenis({
    duration: 1.05,
    smoothWheel: true,
    lerp: 0.085,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1,
  });
}

export function startLenisRaf(lenis: LenisInstance) {
  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return () => cancelAnimationFrame(rafId);
}

