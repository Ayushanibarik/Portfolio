// 3D Interactive Componentry Sandbox for Ayush Animesh Barik
import gsap from 'gsap';

// ==========================================
// 1. LOCKED: ORBIT CARD STACK (3D Interactive Deck)
// ==========================================
export function initOrbitCardStack() {
  const container = document.getElementById('orbit-deck-container');
  if (!container) return;

  const cards = container.querySelectorAll('.orbit-card');
  const total = cards.length;
  let activeIndex = 1;
  let isHovered = false;

  function updateCards(hovered = isHovered) {
    cards.forEach((card, i) => {
      const offset = i - activeIndex;
      const absOffset = Math.abs(offset);

      let x = 0;
      let y = 0;
      let z = 0;
      let rot = 0;
      let scale = 1;
      let zIndex = 10 - absOffset;

      if (!hovered) {
        // Resting stacked state with 3D depth
        x = offset * 36;
        y = absOffset * 10;
        z = -absOffset * 40;
        rot = offset * 5;
        scale = 1 - absOffset * 0.05;
      } else {
        // 3D Orbit Fan-Out state
        x = offset * 220; // wide spread
        y = i === activeIndex ? -45 : absOffset * 8; // active card lifts in 3D
        z = i === activeIndex ? 60 : -absOffset * 20;
        rot = offset * 3.5;
        scale = i === activeIndex ? 1.08 : 0.95;
        if (i === activeIndex) zIndex = 50;
      }

      gsap.to(card, {
        x: x,
        y: y,
        z: z,
        rotation: rot,
        scale: scale,
        zIndex: zIndex,
        duration: 0.5,
        ease: 'power3.out'
      });

      if (i === activeIndex && hovered) {
        card.classList.add('ring-2', 'ring-cyan-400', 'shadow-2xl', 'shadow-cyan-500/25');
      } else {
        card.classList.remove('ring-2', 'ring-cyan-400', 'shadow-2xl', 'shadow-cyan-500/25');
      }
    });
  }

  updateCards(false);

  container.addEventListener('mouseenter', () => {
    isHovered = true;
    updateCards(true);
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    activeIndex = 1;
    updateCards(false);
  });

  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      if (isHovered) {
        activeIndex = i;
        updateCards(true);
      }
    });
  });
}

// ==========================================
// 2. LOCKED: VELOCITY SCROLL TICKER
// ==========================================
export function initVelocityScroll() {
  const track = document.getElementById('velocity-track');
  if (!track) return;

  let baseSpeed = 1.2;
  let currentSpeed = baseSpeed;
  let offset = 0;

  window.addEventListener('scroll', () => {
    currentSpeed = baseSpeed + Math.abs(window.scrollY * 0.006);
  });

  function tick() {
    currentSpeed += (baseSpeed - currentSpeed) * 0.05;
    offset -= currentSpeed;
    if (offset <= -50) offset = 0;
    track.style.transform = `translateX(${offset}%)`;
    requestAnimationFrame(tick);
  }

  tick();
}

// (Wheel Carousel and Split-Flap Display removed per user instruction)

// ==========================================
// 5. NEW 3D: SPATIAL 3D PARALLAX TILT CARDS
// ==========================================
export function init3DTiltCards() {
  const cards = document.querySelectorAll('.card-3d-tilt');
  cards.forEach((card) => {
    const glare = card.querySelector('.glare-overlay');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        scale: 1.03,
        duration: 0.2,
        ease: 'power2.out'
      });

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
      if (glare) {
        glare.style.background = 'transparent';
      }
    });
  });
}

// Run on DOM load
window.addEventListener('DOMContentLoaded', () => {
  initOrbitCardStack();
  initVelocityScroll();
  init3DTiltCards();
});
