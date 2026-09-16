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

// ==========================================
// 3. NEW 3D: WHEEL CAROUSEL (3D Cylindrical Drum Picker)
// ==========================================
export function initWheelCarousel() {
  const container = document.getElementById('wheel-carousel-container');
  const previewImg = document.getElementById('wheel-preview-img');
  const previewTitle = document.getElementById('wheel-preview-title');
  const previewTag = document.getElementById('wheel-preview-tag');
  if (!container) return;

  const items = [
    { label: "PRAMANIKA", tag: "AI Title Verification & Admissibility", image: "/Images/Projects.png" },
    { label: "VAYUNETRA", tag: "Autonomous Airspace C2 & Defense", image: "/Images/goaPolice.png" },
    { label: "JANSEVAK", tag: "Multilingual Citizen Grievance AI", image: "/Images/LandingPicture.png" },
    { label: "ASTRARISE", tag: "Institutional Space & Aerospace Labs", image: "/Images/Astrarise.png" },
    { label: "ZEIGARNIK", tag: "Cognitive Focus & Task Momentum", image: "/Images/Zeigarnik Tumbnail.png" }
  ];

  const total = items.length;
  let currentAngle = 0;
  let targetAngle = 0;
  let isDragging = false;
  let startY = 0;
  let lastY = 0;
  let velocityY = 0;
  const itemAngle = 360 / total;
  const radius = 180; // cylinder radius in px

  const wheelItemsContainer = document.getElementById('wheel-items-container');
  if (!wheelItemsContainer) return;

  wheelItemsContainer.innerHTML = '';
  const itemEls = [];

  items.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'wheel-item absolute left-0 right-0 h-12 flex items-center justify-center cursor-pointer select-none font-display text-2xl md:text-3xl tracking-wider transition-colors';
    el.innerText = item.label;
    el.style.transformOrigin = `50% 50% -${radius}px`;
    el.addEventListener('click', () => {
      targetAngle = -index * itemAngle;
    });
    wheelItemsContainer.appendChild(el);
    itemEls.push(el);
  });

  function getActiveIndex() {
    let normalized = ((-targetAngle / itemAngle) % total + total) % total;
    return Math.round(normalized) % total;
  }

  let activeIdx = 0;
  function updatePreview() {
    const idx = getActiveIndex();
    if (idx !== activeIdx) {
      activeIdx = idx;
      const data = items[activeIdx];
      if (previewTitle) previewTitle.innerText = data.label;
      if (previewTag) previewTag.innerText = data.tag;
      if (previewImg) {
        gsap.to(previewImg, {
          opacity: 0,
          scale: 0.96,
          duration: 0.15,
          onComplete: () => {
            previewImg.src = data.image;
            gsap.to(previewImg, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
          }
        });
      }
    }
  }

  function renderWheel() {
    currentAngle += (targetAngle - currentAngle) * 0.12;

    itemEls.forEach((el, i) => {
      const angle = i * itemAngle + currentAngle;
      const rad = (angle * Math.PI) / 180;
      // Cosine determines distance to viewer
      const depth = Math.cos(rad);
      const opacity = Math.max(0.15, (depth + 1) / 2);
      const isFront = depth > 0.85;

      el.style.transform = `rotateX(${-angle}deg) translateZ(${radius}px)`;
      el.style.opacity = isFront ? 1 : opacity * 0.5;

      if (isFront) {
        el.classList.add('text-cyan-400');
        el.classList.remove('text-zinc-500');
      } else {
        el.classList.remove('text-cyan-400');
        el.classList.add('text-zinc-500');
      }
    });

    updatePreview();
    requestAnimationFrame(renderWheel);
  }

  renderWheel();

  // Mouse Drag / Touch interactions
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startY = e.clientY;
    lastY = e.clientY;
    velocityY = 0;
    container.setPointerCapture(e.pointerId);
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dy = e.clientY - lastY;
    lastY = e.clientY;
    velocityY = dy;
    targetAngle += dy * 0.35;
  });

  container.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    // Inertial snap to nearest item
    targetAngle += velocityY * 1.5;
    targetAngle = Math.round(targetAngle / itemAngle) * itemAngle;
  });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetAngle += e.deltaY * 0.15;
    targetAngle = Math.round(targetAngle / itemAngle) * itemAngle;
  }, { passive: false });
}

// ==========================================
// 4. NEW 3D: SPLIT-FLAP MECHANICAL DISPLAY (3D Mechanical C2 Board)
// ==========================================
export function initSplitFlap() {
  const board = document.getElementById('split-flap-board');
  if (!board) return;

  const lines = [
    { label: "MISSION", val: "AIRSPACE DEFENSE" },
    { label: "C2 CORE", val: "VAYUNETRA 2.0" },
    { label: "ESTIMATOR", val: "KALMAN FUSION" },
    { label: "STATUS", val: "100% OPERATIONAL" }
  ];

  const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%.-+:";

  function buildRow(label, text, width = 18) {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3 py-1.5';

    const lbl = document.createElement('div');
    lbl.className = 'w-24 text-right font-mono text-xs text-zinc-500 tracking-wider uppercase';
    lbl.innerText = label;
    row.appendChild(lbl);

    const flapContainer = document.createElement('div');
    flapContainer.className = 'flex gap-1 [perspective:400px]';

    const padded = text.toUpperCase().padEnd(width, ' ').slice(0, width);

    for (let i = 0; i < width; i++) {
      const char = padded[i];
      const cell = document.createElement('div');
      cell.className = 'flap-cell relative w-6 md:w-7 h-9 md:h-10 bg-[#08090a] rounded border border-white/15 flex items-center justify-center font-mono font-bold text-sm md:text-base text-cyan-300 shadow-md overflow-hidden';
      cell.style.transformStyle = 'preserve-3d';

      cell.innerHTML = `
        <div class="flap-top absolute top-0 left-0 right-0 h-1/2 bg-[#0c0e10] border-b border-black/60 overflow-hidden flex items-start justify-center">
          <span class="translate-y-0.5">${char}</span>
        </div>
        <div class="flap-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[#08090a] overflow-hidden flex items-end justify-center">
          <span class="-translate-y-0.5">${char}</span>
        </div>
        <div class="flap-flipper absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
          <span>${char}</span>
        </div>
      `;

      // Animate flip cascade
      setTimeout(() => {
        gsap.fromTo(cell, 
          { rotateX: -90, opacity: 0.4 }, 
          { rotateX: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
        );
      }, i * 45 + Math.random() * 50);

      flapContainer.appendChild(cell);
    }

    row.appendChild(flapContainer);
    return row;
  }

  function renderBoard() {
    board.innerHTML = '';
    lines.forEach((line) => {
      board.appendChild(buildRow(line.label, line.val));
    });
  }

  renderBoard();

  const triggerBtn = document.getElementById('flap-retrigger-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', renderBoard);
  }
}

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
  initWheelCarousel();
  initSplitFlap();
  init3DTiltCards();
});
