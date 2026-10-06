"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false on the server and during hydration, true on every client render after.
 * Replaces the `useEffect(() => setMounted(true))` pattern without the extra
 * cascading render it triggers.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
