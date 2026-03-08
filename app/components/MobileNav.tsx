"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-5 bg-[#0d0f16]/80 border-b border-white/8">
        <span className="text-sm font-semibold text-white">Faris Zenunović</span>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/4 text-gray-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Off-canvas drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 z-50 h-full w-72"
              initial={{ x: -320 }}
              animate={{ x: 0   }}
              exit={{    x: -320 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <Sidebar />

              {/* Close button overlay */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={15} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
