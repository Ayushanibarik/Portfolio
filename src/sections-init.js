import gsap from "gsap";
import { techStackData } from "./data/tech-logos.js";
import { testimonialsData } from "./data/testimonials.js";
import { initGithubGraph } from "./github-graph.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSilkAurora, initMagnetLines, initClosingPlasma } from "./ambient-backgrounds.js";

export function initPortfolioSections() {
  renderTechStack();
  renderTestimonials();
  init3DTiltCards();
  initVelocityScroll();
  initGithubGraph("github-graph-container");
  initMilestonesCounter();
  initAmbientBackgrounds();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);
}

// ==========================================
// AMBIENT BACKGROUND EFFECTS (Lazy-loaded)
// ==========================================
function initAmbientBackgrounds() {
  const cleanups = [];

  // Lazy init: only start WebGL when section scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const id = el.id || el.getAttribute("data-ambient");

      if (id === "endorsements" && !el._ambientInit) {
        el._ambientInit = true;
        const cleanup = initSilkAurora(el, {
          baseColor: "#0a0a0f",
          midColor: "#111320",
          sheenColor: "#c9a87c",
          accentColor: "#4dd8c0",
          speed: 0.6,
          intensity: 0.7,
          grain: 0.6,
          vignette: 1,
          mouseInfluence: 0.8,
        });
        if (cleanup) cleanups.push(cleanup);
      }

      if (id === "experience" && !el._ambientInit) {
        el._ambientInit = true;
        const cleanup = initMagnetLines(el, {
          rows: 12,
          columns: 16,
          lineColor: "rgba(77, 216, 192, 0.10)",
          lineWidth: "1px",
          lineHeight: "22px",
          baseAngle: -45,
        });
        if (cleanup) cleanups.push(cleanup);
      }

      if (id === "contact" && !el._ambientInit) {
        el._ambientInit = true;
        const cleanup = initClosingPlasma(el, {
          colorA: "#0a0a12",
          colorB: "#162035",
          colorC: "#3a5580",
          speed: 0.8,
          turbulence: 1.2,
          mouseInfluence: 0.9,
          grain: 0.8,
          sparkle: 1.2,
          vignette: 1,
          opacity: 0.55,
        });
        if (cleanup) cleanups.push(cleanup);
      }
    });
  }, { threshold: 0.05 });

  // Observe the sections
  ["experience", "endorsements", "contact"].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ==========================================
// 1. SPATIAL 3D PARALLAX TILT CARDS
// ==========================================
function renderTechStack() {
  const container = document.getElementById("tech-stack-container");
  if (!container) return;

  container.innerHTML = techStackData.map((cat, idx) => `
    <div class="card-3d-tilt relative preserve-3d bg-[#1c1f24]/85 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-colors duration-300 rounded-2xl p-6 flex flex-col justify-between group shadow-2xl overflow-hidden cursor-pointer">
      <div class="glare-overlay absolute inset-0 pointer-events-none transition-opacity rounded-2xl z-10"></div>
      <div class="relative z-20">
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 class="text-white text-xl md:text-2xl font-bold tracking-wide">${cat.category}</h3>
          <span class="text-xs uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-cyan-400/20">0${idx + 1}</span>
        </div>
        <p class="text-white/60 text-xs md:text-sm mt-2 mb-6 font-satoshi">${cat.description}</p>
        
        <div class="grid grid-cols-2 gap-3">
          ${cat.skills.map(s => `
            <div class="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.09] hover:border-white/20 transition-all">
              <div class="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                ${s.svg}
              </div>
              <div class="min-w-0">
                <h4 class="text-white text-xs md:text-sm font-medium block truncate font-satoshi">${s.name}</h4>
                <p class="text-white/40 text-[10px] block truncate font-mono">${s.tag}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

export function init3DTiltCards() {
  const cards = document.querySelectorAll(".card-3d-tilt");
  cards.forEach((card) => {
    const glare = card.querySelector(".glare-overlay");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -11;
      const rotateY = ((x - centerX) / centerX) * 11;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        scale: 1.025,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto"
      });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
      if (glare) {
        glare.style.background = "transparent";
      }
    });
  });
}

// ==========================================
// 2. ORBIT CARD STACK (3D Interactive Deck)
// ==========================================
function renderTestimonials() {
  const container = document.getElementById("testimonials-slider-track");
  if (!container) return;

  container.className = "w-full relative overflow-visible py-4 md:py-8";
  container.innerHTML = `
    <div class="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      <!-- 3D Orbit Deck Stage -->
      <div class="py-8 md:py-12 flex items-center justify-center w-full min-h-[440px] md:min-h-[460px] relative perspective-1000">
        <div id="orbit-deck-container" class="relative w-full max-w-[540px] h-[360px] md:h-[340px] flex items-center justify-center cursor-pointer preserve-3d">
          ${testimonialsData.map((t, idx) => `
            <div 
              data-orbit-index="${idx}"
              class="orbit-card absolute top-0 left-1/2 -translate-x-1/2 w-[92%] sm:w-[480px] md:w-[520px] min-h-[340px] md:min-h-[320px] p-6 sm:p-8 rounded-3xl bg-[#181b20]/95 backdrop-blur-xl border border-white/15 shadow-2xl transition-shadow select-none preserve-3d flex flex-col justify-between group"
            >
              <div>
                <!-- Top Row -->
                <div class="flex items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4 flex-wrap">
                  <div class="flex items-center gap-2.5">
                    <span class="text-cyan-300 font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 font-semibold">
                      ${t.highlight}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-white/40 font-mono text-xs tracking-widest">0${idx + 1} / 0${testimonialsData.length}</span>
                    <svg class="w-5 h-5 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                </div>

                <!-- Testimonial Quote -->
                <p class="text-white/90 text-sm sm:text-base md:text-[1.05rem] leading-relaxed italic font-light tracking-wide font-satoshi">
                  "${t.quote}"
                </p>
              </div>

              <!-- Author & Verification -->
              <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm flex-shrink-0">
                    ${t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 class="text-white text-base md:text-lg font-bold tracking-wide font-satoshi">${t.author}</h4>
                    <p class="text-white/60 text-xs font-satoshi">${t.role} <span class="text-white/40">•</span> <span class="text-white font-medium">${t.organization}</span></p>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 flex-shrink-0">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-white/60 text-[11px] font-mono hidden sm:inline">Verified</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Controls & Indicator Dots -->
      <div class="flex items-center justify-between w-full max-w-[520px] mt-3 px-3">
        <div class="flex items-center gap-2" id="orbit-dots-container">
          ${testimonialsData.map((_, i) => `
            <button 
              data-orbit-dot="${i}" 
              class="orbit-dot h-2 rounded-full transition-all duration-300 cursor-pointer ${i === 0 ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'}"
              aria-label="Go to endorsement ${i + 1}"
            ></button>
          `).join("")}
        </div>
        <div class="flex items-center gap-3">
          <span id="orbit-counter" class="text-xs font-mono text-white/50 tracking-wider">
            01 / 0${testimonialsData.length}
          </span>
          <span class="text-[11px] font-mono text-cyan-400/80 hidden sm:inline">✦ Fan-out Orbit Deck</span>
        </div>
      </div>
    </div>
  `;

  initOrbitCardDeck();
}

function initOrbitCardDeck() {
  const container = document.getElementById("orbit-deck-container");
  if (!container) return;

  const cards = container.querySelectorAll(".orbit-card");
  const dots = document.querySelectorAll(".orbit-dot");
  const counterEl = document.getElementById("orbit-counter");
  const total = cards.length;
  let activeIndex = 0;
  let isHovered = false;

  function updateCards(hovered = isHovered) {
    const isMobile = window.innerWidth < 768;
    const fanSpread = isMobile ? Math.min(window.innerWidth * 0.12, 45) : 130;

    cards.forEach((card, i) => {
      const offset = i - activeIndex;
      const absOffset = Math.abs(offset);

      let x = 0;
      let y = 0;
      let z = 0;
      let rot = 0;
      let scale = 1;
      let zIndex = 20 - absOffset;

      if (!hovered) {
        // Resting stacked state with 3D depth
        x = offset * (isMobile ? 10 : 24);
        y = absOffset * 6;
        z = -absOffset * 35;
        rot = offset * 2.5;
        scale = Math.max(0.85, 1 - absOffset * 0.05);
      } else {
        // 3D Orbit Fan-Out state
        x = offset * fanSpread;
        y = i === activeIndex ? -32 : absOffset * 6;
        z = i === activeIndex ? 60 : -absOffset * 22;
        rot = offset * 2.2;
        scale = i === activeIndex ? 1.04 : 0.95;
        if (i === activeIndex) zIndex = 50;
      }

      gsap.to(card, {
        x: x,
        y: y,
        z: z,
        rotation: rot,
        scale: scale,
        zIndex: zIndex,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      });

      if (i === activeIndex && hovered) {
        card.classList.add("ring-2", "ring-cyan-400", "shadow-2xl", "shadow-cyan-500/25");
      } else {
        card.classList.remove("ring-2", "ring-cyan-400", "shadow-2xl", "shadow-cyan-500/25");
      }
    });

    if (counterEl) {
      counterEl.textContent = `0${activeIndex + 1} / 0${total}`;
    }

    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.className = "orbit-dot h-2 rounded-full transition-all duration-300 cursor-pointer w-8 bg-cyan-400";
      } else {
        dot.className = "orbit-dot h-2 rounded-full transition-all duration-300 cursor-pointer w-2 bg-white/20 hover:bg-white/40";
      }
    });
  }

  updateCards(false);

  container.addEventListener("mouseenter", () => {
    isHovered = true;
    updateCards(true);
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
    updateCards(false);
  });

  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      if (isHovered) {
        activeIndex = i;
        updateCards(true);
      }
    });
    card.addEventListener("click", () => {
      activeIndex = i;
      isHovered = true;
      updateCards(true);
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-orbit-dot"), 10);
      activeIndex = idx;
      updateCards(isHovered);
    });
  });

  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + total) % total;
      updateCards(isHovered);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % total;
      updateCards(isHovered);
    });
  }

  // Swipe support on mobile
  let touchStartX = 0;
  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  container.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      activeIndex = (activeIndex + 1) % total;
      updateCards(true);
    } else if (touchEndX - touchStartX > 45) {
      activeIndex = (activeIndex - 1 + total) % total;
      updateCards(true);
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    updateCards(isHovered);
  });
}

// ==========================================
// 3. VELOCITY SCROLL KINETIC TICKER
// ==========================================
export function initVelocityScroll() {
  const track = document.getElementById("velocity-track");
  if (!track) return;

  let baseSpeed = 0.8;
  let currentSpeed = baseSpeed;
  let offset = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const deltaY = Math.abs(window.scrollY - lastScrollY);
    currentSpeed = baseSpeed + Math.min(deltaY * 0.08, 10);
    lastScrollY = window.scrollY;
  }, { passive: true });

  function tick() {
    currentSpeed += (baseSpeed - currentSpeed) * 0.05;
    offset -= currentSpeed * 0.06;
    if (offset <= -50) offset = 0;
    track.style.transform = `translateX(${offset}%)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
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
