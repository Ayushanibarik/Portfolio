"use client";

import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { site } from "@/data/site";


export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* iOS-style frosted navigation bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="material-regular border-b border-separator"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6" style={{ height: "var(--ios-nav-height)" }}>
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-ios-sm py-1">
            <span className="grid size-8 place-items-center rounded-ios-xs bg-accent text-[13px] font-bold text-white">
              {site.initials}
            </span>
            <span className="hidden text-[17px] font-semibold text-ink sm:block">
              {site.name}
            </span>
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-ios-sm px-4 py-2 text-[15px] font-medium text-label-secondary transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={site.resumePath}
            className="focus-ring hidden rounded-ios-md bg-accent px-5 py-2 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.97] md:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            className="focus-ring grid size-11 place-items-center rounded-ios-sm text-label-secondary transition hover:text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* iOS-style mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="material-thick border-b border-separator md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
              {[...site.nav, { label: "Resume", href: site.resumePath }].map(
                (item, index) => (
                  <div key={item.href}>
                    {index > 0 && <div className="ios-separator mx-0" />}
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[44px] items-center text-[17px] font-medium text-ink transition hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
