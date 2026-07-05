"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/data/site";
import { SectionReveal, StaggerReveal, staggerItem } from "@/components/ui/section-reveal";

export function MissionAbout() {
  return (
    <section id="mission" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Centered intro paragraph */}
        <SectionReveal>
          <div className="text-center">
            <p className="mx-auto max-w-3xl text-[22px] font-medium leading-[1.6] text-white/80 sm:text-[28px]">
              Creative AI enthusiast and engineering student focused on{" "}
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-white/60">
                exploring ideas
              </span>{" "}
              by turning them into clean, intelligent products.{" "}
              <span className="text-white/35">
                I love experimenting at the intersection of AI and engineering,
                while building systems that solve meaningful real-world problems.
              </span>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export function Drives() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Centered heading with pill */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <div className="mb-5 flex justify-center">
              <span className="section-pill">Value</span>
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-ink sm:text-[48px]">
              Why Work With Me?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-label-secondary">
              Backed by curiosity, driven by execution.
            </p>
          </div>
        </SectionReveal>

        <StaggerReveal className="grid gap-4 md:grid-cols-3">
          {site.drives.principles.map((item) => {
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="bento-card flex flex-col items-center text-center justify-center"
              >
                <div className="relative mb-6 size-28 sm:size-32 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                  <Image
                    src={item.avatar}
                    alt={item.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[24px] font-bold text-ink">
                  {item.title.split(" ")[0]}{" "}
                  <span className="text-accent-cyan">{item.title.split(" ").slice(1).join(" ")}.</span>
                </h3>
                <p className="mt-4 ios-body text-label-secondary">{item.text}</p>
              </motion.div>
            );
          })}

          {/* Extra bento cards from about data */}
          <motion.div variants={staggerItem} className="bento-card md:col-span-2">
            <h3 className="text-[20px] font-bold text-ink">Builder Profile</h3>
            <p className="mt-3 ios-body text-label-secondary">
              {site.about.paragraphs[0]}
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="bento-card">
            <h3 className="text-[20px] font-bold text-ink">
              Focus Areas
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.currentMission.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/60"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </StaggerReveal>
      </div>
    </section>
  );
}
