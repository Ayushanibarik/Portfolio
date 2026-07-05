"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionReveal } from "@/components/ui/section-reveal";

export function Journey() {
  const JourneyIcon = site.visualSystem.sectionIcons.journey;

  return (
    <section id="journey" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            eyebrow="Building journey"
            title="A timeline of increasing ambition"
            icon={JourneyIcon}
          />
        </SectionReveal>

        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-separator-opaque md:left-1/2" />

          <div className="space-y-6">
            {site.timeline.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  damping: 28,
                  stiffness: 300,
                  delay: index * 0.06,
                }}
                className="relative grid gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0"
              >
                <div
                  className={
                    index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                  }
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2.5 grid size-8 place-items-center rounded-full border border-separator-opaque bg-canvas md:left-1/2 md:-translate-x-1/2">
                    <span className="size-2.5 rounded-full bg-accent" />
                  </div>

                  <div className="rounded-ios-lg border border-separator-opaque bg-canvas-elevated p-5 shadow-ios-sm transition-shadow hover:shadow-ios-md">
                    <p className="ios-caption1 font-semibold uppercase tracking-[0.06em] text-accent">
                      {item.year}
                    </p>
                    <p className="mt-3 ios-callout font-medium text-label-secondary">
                      {item.text}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
