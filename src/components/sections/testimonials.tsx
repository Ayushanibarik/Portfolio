"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";

const testimonials = [
  {
    quote: "Ayush exhibits a rare combination of structural systems thinking and aggressive execution bias. His work on PRAMANIKA—applying advanced NLP and validation pipelines to large-scale regulatory compliance sets—proved his capability to take a complex administrative policy problem and build an explainable, production-ready AI system that operates at institutional scale.",
    author: "Dr. Debabrata Singh",
    role: "Research Mentor & Assistant Professor",
    organization: "ITER, SOA University",
  },
  {
    quote: "Working with Ayush at the Innovation & Entrepreneurship Cell (IEC), I've seen first-hand his ability to bring ideas to life. He is not just an engineer but a builder with deep product sense. He takes ownership of ambiguous tasks, coordinates operations seamlessly, and brings a software-first approach to solving real-world challenges.",
    author: "Rajesh Senapati",
    role: "Operations Coordinator",
    organization: "Innovation & Entrepreneurship Cell (IEC)",
  },
  {
    quote: "Ayush is the ultimate hackathon partner. During our builds, he designed the entire agentic coordination system for the SAVE disaster response project, setting up Python backends, GIS mapping, and Twilio voice integrations in a matter of hours. He learns new APIs instantly and writes clean, production-ready code under pressure.",
    author: "Depesh Singh",
    role: "Hackathon Teammate & Full-Stack Developer",
    organization: "GFG Student Chapter",
  },
  {
    quote: "Ayush was incredibly helpful when I was stuck on my personal project. He has a knack for dissecting complex bugs and quickly implementing clean solutions. His deep understanding of systems and willingness to jump in and collaborate not only saved me days of work but also significantly improved the performance of the application.",
    author: "Pratishya Tripathy",
    role: "Senior Developer",
    organization: "ITER, SOA University",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="mb-14 text-center">
            <div className="mb-5 flex justify-center">
              <span className="section-pill">Testimonials</span>
            </div>
            <h2 className="text-[36px] font-bold tracking-tight text-ink sm:text-[48px]">
              Few Kind Words
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-label-secondary">
              Feedback from mentors, peers, and collaborators.
            </p>
          </div>
        </SectionReveal>

        {/* Testimonials Slider */}
        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Scroll Controls */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition hover:bg-white/[0.12] hover:text-white active:scale-95 sm:left-[-40px]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition hover:bg-white/[0.12] hover:text-white active:scale-95 sm:right-[-40px]"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>

          {/* Slider track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-4 pb-6 scrollbar-none"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 28, stiffness: 300, delay: i * 0.08 }}
                className="w-full min-w-[280px] sm:min-w-[400px] md:min-w-[460px] flex-shrink-0 scroll-snap-align border border-white/[0.06] bg-white/[0.02] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between hover:border-white/10 transition duration-300"
              >
                <div>
                  <div className="text-accent/40 mb-5">
                    <Quote size={28} />
                  </div>
                  <p className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-medium italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-[15px] font-bold text-white">{t.author}</p>
                  <p className="text-[12px] text-white/40 font-medium mt-1">
                    {t.role} &bull; <span className="text-accent">{t.organization}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
