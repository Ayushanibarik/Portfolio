"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/60 px-4 py-20 sm:px-6 lg:px-8">
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-0 left-1/2 z-[-1] h-[300px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl">
        {/* Large thank you callout */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="text-[40px] font-bold tracking-tight text-white sm:text-[64px] lg:text-[72px]"
          >
            Thank you for Visiting.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 28, stiffness: 200, delay: 0.1 }}
            className="mt-8"
          >
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-[16px] font-semibold text-white shadow-ios-md backdrop-blur-md transition-all hover:bg-white/10 active:scale-[0.98] group"
            >
              Connect With Me
              <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-12" />

        {/* Two-column layout */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start mb-12">
          <div>
            <p className="text-[17px] font-medium text-white/80 leading-relaxed max-w-sm">
              {site.footer.line}
            </p>
            <p className="mt-4 text-[13px] tracking-wider uppercase text-white/40 font-semibold">
              Designed in India. Assembled by {site.footer.signature}.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div>
              <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-white/40 mb-3 md:text-right">
                Reach out anytime
              </p>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[15px] font-medium text-white/60 hover:text-white transition-colors"
                >
                  Email
                </a>
                <span className="text-white/20">•</span>
                <a
                  href={`tel:${site.phone}`}
                  className="text-[15px] font-medium text-white/60 hover:text-white transition-colors"
                >
                  Phone
                </a>
                <span className="text-white/20">•</span>
                <a
                  href={site.resumePath}
                  download
                  className="text-[15px] font-medium text-white/60 hover:text-white transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Social Circle Icons */}
            <div className="flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all hover:scale-105"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="text-center md:text-left text-[13px] text-white/30 font-medium">
          &copy; {currentYear} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
