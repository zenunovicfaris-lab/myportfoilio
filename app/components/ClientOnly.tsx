"use client";

/**
 * ClientOnly
 *
 * Skips SSR entirely for its children. The `fallback` (default: null) is what
 * the server — and the first client render before useEffect fires — outputs,
 * so server HTML and initial client HTML are byte-identical → no hydration
 * mismatch regardless of what the children render.
 *
 * Use this for components that:
 *  - use Framer Motion inline styles (rotateX / rotateY / spring values)
 *  - read `window` / `document` on first render
 *  - contain AnimatePresence with client-only state
 */

import { useEffect, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rendered on server + before mount. Must be layout-stable (same dimensions). */
  fallback?: ReactNode;
}

export default function ClientOnly({ children, fallback = null }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}
