import { techStackData } from "./data/tech-logos.js";
import { testimonialsData } from "./data/testimonials.js";
import { initGithubGraph } from "./github-graph.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initPortfolioSections() {
  renderTechStack();
  renderTestimonials();
  initGithubGraph("github-graph-container");
  initMilestonesCounter();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);
}

function renderTechStack() {
  const container = document.getElementById("tech-stack-container");
  if (!container) return;

  container.innerHTML = techStackData.map((cat, idx) => `
    <div class="bg-[#1c1f24]/85 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group shadow-2xl">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 class="text-white text-xl md:text-2xl font-bold tracking-wide">${cat.category}</h3>
          <span class="text-xs uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/20">0${idx + 1}</span>
        </div>
        <p class="text-white/60 text-xs md:text-sm mt-2 mb-6">${cat.description}</p>
        
        <div class="grid grid-cols-2 gap-3">
          ${cat.skills.map(s => `
            <div class="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.09] hover:border-white/20 transition-all">
              <div class="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                ${s.svg}
              </div>
              <div class="min-w-0">
                <h4 class="text-white text-xs md:text-sm font-medium block truncate">${s.name}</h4>
                <p class="text-white/40 text-[10px] block truncate">${s.tag}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

function renderTestimonials() {
  const container = document.getElementById("testimonials-slider-track");
  if (!container) return;

  container.className = "w-full relative overflow-hidden";
  container.innerHTML = `
    <div class="relative w-full max-w-5xl mx-auto">
      <!-- Carousel Viewport -->
      <div id="testimonial-carousel-viewport" class="overflow-hidden w-full rounded-3xl cursor-grab active:cursor-grabbing">
        <div id="testimonial-slides-track" class="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          ${testimonialsData.map((t, idx) => `
            <div class="w-full flex-shrink-0">
              <div class="bg-[#1c1f24]/95 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 rounded-3xl p-7 sm:p-10 md:p-12 lg:p-14 shadow-2xl flex flex-col justify-between min-h-[360px] md:min-h-[320px]">
                <div>
                  <!-- Top Row: Badge, Organization & Quote Icon -->
                  <div class="flex items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-white/10 mb-5 sm:mb-6 flex-wrap">
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <span class="text-zinc-200 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20 font-semibold">
                        ${t.highlight}
                      </span>
                      <span class="text-white/40 text-xs font-mono hidden sm:inline">•</span>
                      <span class="text-white/80 text-xs font-satoshi font-medium tracking-normal">${t.organization}</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-white/40 font-mono text-xs tracking-widest">0${idx + 1} / 0${testimonialsData.length}</span>
                      <svg class="w-7 h-7 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </div>
                  </div>

                  <!-- Testimonial Quote -->
                  <p class="text-white/95 text-base sm:text-lg md:text-xl lg:text-[1.35rem] leading-relaxed md:leading-[1.7] italic font-light tracking-wide">
                    "${t.quote}"
                  </p>
                </div>

                <!-- Bottom Row: Author details & verification status -->
                <div class="pt-5 sm:pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono font-bold text-sm flex-shrink-0">
                      ${t.author.charAt(0)}
                    </div>
                    <div>
                      <h3 class="text-white text-lg md:text-xl font-bold tracking-wide">${t.author}</h3>
                      <p class="text-white/60 text-xs md:text-sm">${t.role} <span class="text-white/40">•</span> <span class="text-white font-medium font-satoshi">${t.organization}</span></p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-white/60 text-xs font-satoshi font-medium tracking-normal">Endorsement Verified</span>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Controls & Progress Dots -->
      <div class="flex items-center justify-between mt-6 px-2">
        <!-- Dots Indicator -->
        <div class="flex items-center gap-2" id="testimonial-dots-container">
          ${testimonialsData.map((_, i) => `
            <button 
              data-slide-index="${i}" 
              class="testimonial-dot h-2 rounded-full transition-all duration-300 cursor-pointer ${i === 0 ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}"
              aria-label="Go to slide ${i + 1}"
            ></button>
          `).join("")}
        </div>

        <!-- Slide Counter & Next/Prev Controls -->
        <div class="flex items-center gap-4">
          <span id="testimonial-slide-counter" class="text-xs font-mono text-white/50 tracking-wider">
            01 / 0${testimonialsData.length}
          </span>
          <div class="flex items-center gap-2">
            <button
              id="testimonial-card-prev"
              aria-label="Previous testimonial"
              class="w-10 h-10 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              id="testimonial-card-next"
              aria-label="Next testimonial"
              class="w-10 h-10 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // State management
  let currentIndex = 0;
  const totalSlides = testimonialsData.length;
  const slidesTrack = document.getElementById("testimonial-slides-track");
  const counterEl = document.getElementById("testimonial-slide-counter");
  const dots = document.querySelectorAll(".testimonial-dot");
  const viewport = document.getElementById("testimonial-carousel-viewport");

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    if (slidesTrack) {
      slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (counterEl) {
      counterEl.textContent = `0${currentIndex + 1} / 0${totalSlides}`;
    }

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.className = "testimonial-dot h-2 rounded-full transition-all duration-300 cursor-pointer w-8 bg-white";
      } else {
        dot.className = "testimonial-dot h-2 rounded-full transition-all duration-300 cursor-pointer w-2 bg-white/20 hover:bg-white/40";
      }
    });
  }

  // Header and Card button handlers
  const prevBtns = [document.getElementById("testimonial-prev"), document.getElementById("testimonial-card-prev")];
  const nextBtns = [document.getElementById("testimonial-next"), document.getElementById("testimonial-card-next")];

  prevBtns.forEach(btn => {
    if (btn) btn.addEventListener("click", () => goToSlide(currentIndex - 1));
  });
  nextBtns.forEach(btn => {
    if (btn) btn.addEventListener("click", () => goToSlide(currentIndex + 1));
  });

  // Dots click handler
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-slide-index"), 10);
      goToSlide(idx);
    });
  });

  // Mouse wheel scroll to advance gently
  let isWheelThrottled = false;
  if (viewport) {
    viewport.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
        if (isWheelThrottled) return;
        if (e.deltaY > 25 || e.deltaX > 25) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
        isWheelThrottled = true;
        setTimeout(() => { isWheelThrottled = false; }, 650);
      }
    }, { passive: true });

    // Touch / Swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    viewport.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToSlide(currentIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentIndex - 1);
      }
    }, { passive: true });
  }
}

function initMilestonesCounter() {
  const counterElements = document.querySelectorAll(".milestone-counter");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        let current = 0;
        const duration = 1500;
        const step = Math.max(1, Math.floor(target / (duration / 25)));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.innerText = target + "+";
            clearInterval(timer);
          } else {
            el.innerText = current + "+";
          }
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}
