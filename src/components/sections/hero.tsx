"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { site } from "@/data/site";

const typewriterPhrases = [
  "Intelligent Systems",
  "AI Agents",
  "Real-World Impact",
  "Scalable Products",
  "Smart Solutions",
];

const marqueeRoles = [
  "AI Enthusiast",
  "Full-Stack Developer",
  "Builder",
  "Engineering Student",
  "Entrepreneur",
  "Systems Thinker",
  "Problem Solver",
  "Innovator",
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentPhrase = typewriterPhrases[phraseIndex];

  const tick = useCallback(() => {
    if (!deleting) {
      if (charIndex < currentPhrase.length) {
        setCharIndex((c) => c + 1);
      } else {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setPhraseIndex((p) => (p + 1) % typewriterPhrases.length);
      }
    }
  }, [charIndex, deleting, currentPhrase]);

  useEffect(() => {
    const speed = deleting ? 40 : 80;
    const id = setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [tick, deleting]);

  return (
    <span>
      {currentPhrase.slice(0, charIndex)}
      <span className="typewriter-cursor" />
    </span>
  );
}

function Marquee() {
  const doubled = [...marqueeRoles, ...marqueeRoles];
  return (
    <div className="relative overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((role, i) => (
          <span
            key={`${role}-${i}`}
            className="mx-8 text-[22px] font-medium tracking-wide text-white/20 sm:mx-12 sm:text-[28px]"
            style={{ fontFamily: "monospace" }}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: "calc(var(--menubar-height) + 60px)" }}
    >
      {/* Ambient blue glow rings (like vivekrs.in) */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="pt-8"
        >
          {/* Name pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="section-pill mb-8 flex items-center gap-2.5"
          >
            <div className="relative size-5.5 overflow-hidden rounded-full border border-white/10 bg-white/10 shrink-0">
              <Image
                src="/images/avatar-profile.png"
                alt="Ayush Avatar"
                fill
                sizes="22px"
                className="object-cover"
              />
            </div>
            Hi, I am {site.name}
          </motion.div>

          {/* Typewriter headline */}
          <h1 className="max-w-2xl text-[42px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[56px] lg:text-[64px]">
            I like building{" "}
            <br className="hidden sm:block" />
            <Typewriter />
          </h1>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-lg text-[17px] italic leading-7 text-label-tertiary"
          >
            {site.hero.mission}
          </motion.p>

          {/* Two buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={site.resumePath}
              download
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-ios-md bg-white px-7 py-3 text-[15px] font-semibold text-black shadow-ios-sm transition active:scale-[0.97] hover:bg-white/90"
            >
              Download CV
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-ios-md border border-white/10 bg-white/[0.06] px-7 py-3 text-[15px] font-semibold text-white/80 transition active:scale-[0.97] hover:bg-white/[0.1]"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              Reach Out
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait with ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 28, stiffness: 300, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[400px] lg:ml-auto"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.02]">
            <Image
              src={site.portrait}
              alt={`${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 400px"
              className="object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <Marquee />
    </section>
  );
}
