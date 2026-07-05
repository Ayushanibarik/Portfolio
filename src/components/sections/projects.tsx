"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, X } from "lucide-react";
import { site, type Project } from "@/data/site";
import { SectionReveal } from "@/components/ui/section-reveal";

function ProjectSheet({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "highlights" | "future">("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.96 }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="relative flex h-[85vh] w-full max-w-3xl flex-col rounded-[26px] border border-white/10 bg-[#0d1117]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition active:scale-95"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Title Block */}
        <div className="pr-12">
          <span className="inline-flex rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
            {project.label}
          </span>
          <h2 className="mt-3 text-[28px] font-bold text-ink sm:text-[36px]">
            {project.name}
          </h2>
          <p className="mt-2 text-[15px] text-label-secondary font-medium leading-relaxed">
            {project.title}
          </p>
          {project.url && (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noreferrer" 
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-[12px] font-bold text-accent hover:bg-accent/10 transition"
            >
              View Live Project <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex border-b border-white/10 pb-px gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(["overview", "tech", "highlights", "future"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-semibold capitalize relative transition-colors ${
                activeTab === tab ? "text-accent" : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto mt-6 pr-1 space-y-6" style={{ scrollbarWidth: "thin" }}>
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-2">The Problem</h4>
                <p className="text-[16px] text-white/80 leading-relaxed font-medium">{project.problem}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-2">The Solution</h4>
                <p className="text-[16px] text-white/80 leading-relaxed font-medium">{project.solution}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-2">System Architecture</h4>
                <p className="text-[15px] text-white/60 leading-relaxed font-medium">{project.architecture}</p>
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-4">Technologies & Stack Used</h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center font-medium text-[14px] text-white/70">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "highlights" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-3">Key Highlights & Impact</h4>
                <ul className="space-y-3">
                  {project.highlights.map((h, index) => (
                    <li key={h} className="flex gap-3 text-[15px] text-white/80 font-medium">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/20 text-accent text-[11px] font-bold">
                        {index + 1}
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-3">Engineering Challenges Solved</h4>
                <ul className="space-y-2 list-disc pl-5 text-[15px] text-white/60 font-medium leading-relaxed">
                  {project.challenges.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "future" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-3">Future Roadmap</h4>
                <ul className="space-y-3">
                  {project.future.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] text-white/80 font-medium">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-orange/20 text-accent-orange text-[11px] font-bold">
                        →
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 mb-3">Lessons Learned</h4>
                <ul className="space-y-2 list-disc pl-5 text-[15px] text-white/60 font-medium leading-relaxed">
                  {project.lessons.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <div className="mb-5 flex justify-center">
              <span className="section-pill">Work</span>
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-ink sm:text-[48px]">
              Featured Work
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-label-secondary">
              My past projects showcasing my expertise.
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Horizontal carousel */}
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition hover:bg-white/[0.12] hover:text-white active:scale-95 sm:left-8"
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition hover:bg-white/[0.12] hover:text-white active:scale-95 sm:right-8"
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-8 pb-4 sm:px-16 lg:px-24"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {site.projects.map((project) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={() => setSelectedProject(project)}
              className="carousel-card cursor-pointer"
            >
              <div className="mb-3 inline-flex rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
                {project.label}
              </div>

              <h3 className="text-[28px] font-bold tracking-tight text-ink">
                {project.name}
              </h3>
              <p className="mt-2 text-[15px] text-label-secondary">
                {project.title}
              </p>

              {/* Tech pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights preview */}
              <div className="mt-6 space-y-2">
                {project.highlights.slice(0, 3).map((h, i) => (
                  <div
                    key={h}
                    className="flex items-center gap-2.5 rounded-ios-sm border border-white/[0.04] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-white/50 line-clamp-1">
                      {h}
                    </span>
                  </div>
                ))}
              </div>

              {/* View more hint */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[13px] font-medium text-accent">
                  View Details <ArrowUpRight size={13} />
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[13px] font-medium text-label-secondary hover:text-ink transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Link <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Slide-up detailed sheet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectSheet
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
