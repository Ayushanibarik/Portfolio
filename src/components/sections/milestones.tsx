"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";

const stats = [
  { value: 160, suffix: "K+", label: "Verification Capability", color: "#00E5FF" },
  { value: 8, suffix: ".0", label: "CGPA at ITER, SOA", color: "#00E5FF" },
  { value: 10, suffix: "+", label: "Technologies Mastered", color: "#00E5FF" },
  { value: 5, suffix: "+", label: "Hackathon Finalist", color: "#00E5FF" },
];

function AnimatedCounter({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix: string;
  color: string;
}) {``
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;
    const id = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(id);
      } else {
        setDisplay(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(id);
  }, [isInView, value]);

  return (
    <span ref={ref} style={{ color }}>
      {display}
      {suffix}
    </span>
  );
}

export function Milestones() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mb-14 text-center">
            <div className="mb-5 flex justify-center">
              <span className="section-pill">Hall of Fame</span>
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-ink sm:text-[48px]">
              Milestones & Recognitions
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-label-secondary">
              A journey marked by relentless pursuit of excellence.
              From university accolades to national achievements.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
                delay: i * 0.08,
              }}
              className="stat-card"
            >
              <p className="text-[42px] font-bold leading-none tracking-tight sm:text-[52px]">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
              </p>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
