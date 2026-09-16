// Componentry UI Interactive Showcase Sandbox for Ayush Animesh Barik Portfolio
import gsap from 'gsap';

// ==========================================
// 1. ANNOTATED TEXT ENGINE (Hand-drawn SVG)
// ==========================================
function createRandom(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shake(rand, amount) {
  return (rand() - 0.5) * 2 * amount;
}

function round(val) {
  return Math.round(val * 100) / 100;
}

function trace(points, close = false) {
  if (!points.length) return '';
  const [first, ...rest] = points;
  let d = `M${round(first.x)},${round(first.y)}`;
  rest.forEach((anchor, index) => {
    const next = rest[index + 1];
    if (!next) {
      d += ` L${round(anchor.x)},${round(anchor.y)}`;
      return;
    }
    d += ` Q${round(anchor.x)},${round(anchor.y)} ${round((anchor.x + next.x) / 2)},${round((anchor.y + next.y) / 2)}`;
  });
  return close ? `${d} Z` : d;
}

export function generateAnnotationPath(type, width, height, seed = 42) {
  const rand = createRandom(seed);
  const pad = 6;
  const w = width;
  const h = height;

  if (type === 'highlight') {
    // A thick gentle highlighter stroke behind text
    const y = h * 0.65;
    const pts = [];
    const steps = 14;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push({
        x: t * w + shake(rand, 1.5),
        y: y + shake(rand, 2) + Math.sin(t * Math.PI) * 2
      });
    }
    return trace(pts);
  }

  if (type === 'underline') {
    // Wobbly hand-drawn underline
    const y = h - 2;
    const pts = [];
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      pts.push({
        x: t * w,
        y: y + shake(rand, 1.8)
      });
    }
    return trace(pts);
  }

  if (type === 'circle') {
    // Hand-drawn sketchy elliptical loop that slightly overlaps at the end
    const cx = w / 2;
    const cy = h / 2;
    const rx = w / 2 + pad;
    const ry = h / 2 + pad;
    const pts = [];
    const steps = 36;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2 + (shake(rand, 0.1));
      const wobbleR = shake(rand, 2.5);
      pts.push({
        x: cx + (rx + wobbleR) * Math.cos(angle),
        y: cy + (ry + wobbleR) * Math.sin(angle)
      });
    }
    return trace(pts, true);
  }

  if (type === 'box') {
    // Hand-drawn sketch rectangle
    const pts = [
      { x: -pad, y: -pad },
      { x: w + pad, y: -pad + shake(rand, 2) },
      { x: w + pad + shake(rand, 2), y: h + pad },
      { x: -pad + shake(rand, 2), y: h + pad + shake(rand, 2) }
    ];
    return trace(pts, true);
  }

  return '';
}

export function initAnnotatedText() {
  const elements = document.querySelectorAll('[data-annotation]');
  elements.forEach((el, idx) => {
    const type = el.dataset.annotation || 'highlight';
    const color = el.dataset.color || '#38bdf8';
    const strokeWidth = type === 'highlight' ? '22' : '3.5';
    const opacity = type === 'highlight' ? '0.45' : '1';

    const w = el.offsetWidth || 120;
    const h = el.offsetHeight || 30;

    // Check if SVG already exists
    let svg = el.querySelector('svg.annotation-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'annotation-svg absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none overflow-visible -z-10');
      el.style.position = 'relative';
      el.style.display = 'inline-block';
      el.appendChild(svg);
    }

    const pathData = generateAnnotationPath(type, w + 8, h + 8, 100 + idx * 77);
    svg.innerHTML = `
      <path d="${pathData}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" 
            stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" 
            class="annotation-path" />
    `;

    const path = svg.querySelector('path');
    if (path) {
      const length = path.getTotalLength() || 200;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      // Animate stroke draw
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.15 * idx
      });
    }
  });
}

// ==========================================
// 2. ORBIT CARD STACK ENGINE (3D Fan-out Deck)
// ==========================================
export function initOrbitCardStack() {
  const container = document.getElementById('orbit-deck-container');
  if (!container) return;

  const cards = container.querySelectorAll('.orbit-card');
  const total = cards.length;
  let activeIndex = Math.floor(total / 2);
  let isHovered = false;

  function updateCards(hovered = isHovered) {
    cards.forEach((card, i) => {
      const offset = i - activeIndex;
      const absOffset = Math.abs(offset);

      let x = 0;
      let y = 0;
      let rot = 0;
      let scale = 1;
      let zIndex = 10 - absOffset;

      if (!hovered) {
        // Collapsed / semi-stacked state
        x = offset * 32;
        y = absOffset * 10;
        rot = offset * 5;
        scale = 1 - absOffset * 0.05;
      } else {
        // Expanded Orbit Fan-Out state
        x = offset * 210; // wide spread across viewport
        y = i === activeIndex ? -42 : absOffset * 8; // active lift
        rot = offset * 3.5;
        scale = i === activeIndex ? 1.08 : 0.94;
        if (i === activeIndex) zIndex = 50;
      }

      gsap.to(card, {
        x: x,
        y: y,
        rotation: rot,
        scale: scale,
        zIndex: zIndex,
        duration: 0.45,
        ease: 'power3.out'
      });

      if (i === activeIndex && hovered) {
        card.classList.add('ring-2', 'ring-cyan-400/60', 'shadow-2xl', 'shadow-cyan-500/20');
      } else {
        card.classList.remove('ring-2', 'ring-cyan-400/60', 'shadow-2xl', 'shadow-cyan-500/20');
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
    activeIndex = Math.floor(total / 2);
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
// 3. CIRCUIT BOARD ENGINE (Airspace Defense)
// ==========================================
export function initCircuitBoard() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.offsetWidth || 800);
  let height = (canvas.height = canvas.parentElement.offsetHeight || 380);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth || 800;
    height = canvas.height = canvas.parentElement.offsetHeight || 380;
  });

  // Nodes for C-UAS & Autonomous Architecture
  const nodes = [
    { id: 'radar', x: width * 0.12, y: height * 0.25, label: 'RF Radar Sensor', color: '#38bdf8' },
    { id: 'vision', x: width * 0.12, y: height * 0.75, label: 'EO/IR Vision (YOLOv8)', color: '#38bdf8' },
    { id: 'fusion', x: width * 0.42, y: height * 0.5, label: 'Kalman Filter Fusion Core', color: '#a855f7' },
    { id: 'c2', x: width * 0.72, y: height * 0.3, label: 'VayuNetra C2 Command', color: '#34d399' },
    { id: 'mitigation', x: width * 0.88, y: height * 0.7, label: 'RF Jammer Neutralizer', color: '#f43f5e' }
  ];

  // Connections with orthogonal routing
  const connections = [
    { from: 0, to: 2, progress: 0, speed: 0.008, color: '#38bdf8' },
    { from: 1, to: 2, progress: 0.5, speed: 0.007, color: '#38bdf8' },
    { from: 2, to: 3, progress: 0.2, speed: 0.01, color: '#a855f7' },
    { from: 3, to: 4, progress: 0.7, speed: 0.009, color: '#34d399' }
  ];

  function getOrthogonalPath(x1, y1, x2, y2) {
    const midX = (x1 + x2) / 2;
    return [
      { x: x1, y: y1 },
      { x: midX, y: y1 },
      { x: midX, y: y2 },
      { x: x2, y: y2 }
    ];
  }

  function getPointAlongPath(pts, t) {
    // Total length
    let d1 = Math.abs(pts[1].x - pts[0].x) + Math.abs(pts[1].y - pts[0].y);
    let d2 = Math.abs(pts[2].x - pts[1].x) + Math.abs(pts[2].y - pts[1].y);
    let d3 = Math.abs(pts[3].x - pts[2].x) + Math.abs(pts[3].y - pts[2].y);
    let total = d1 + d2 + d3;
    let dist = t * total;

    if (dist <= d1) {
      let r = dist / d1;
      return { x: pts[0].x + (pts[1].x - pts[0].x) * r, y: pts[0].y + (pts[1].y - pts[0].y) * r };
    } else if (dist <= d1 + d2) {
      let r = (dist - d1) / d2;
      return { x: pts[1].x + (pts[2].x - pts[1].x) * r, y: pts[1].y + (pts[2].y - pts[1].y) * r };
    } else {
      let r = (dist - d1 - d2) / d3;
      return { x: pts[2].x + (pts[3].x - pts[2].x) * r, y: pts[2].y + (pts[3].y - pts[2].y) * r };
    }
  }

  let animFrame;
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 20; x < width; x += 30) {
      for (let y = 20; y < height; y += 30) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // Draw traces
    connections.forEach((conn) => {
      const n1 = nodes[conn.from];
      const n2 = nodes[conn.to];
      const pts = getOrthogonalPath(n1.x, n1.y, n2.x, n2.y);

      // Base line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
      ctx.lineTo(pts[2].x, pts[2].y);
      ctx.lineTo(pts[3].x, pts[3].y);
      ctx.stroke();

      // Moving Pulse Dot
      conn.progress = (conn.progress + conn.speed) % 1;
      const p = getPointAlongPath(pts, conn.progress);

      // Pulse Glow
      const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, 8);
      grad.addColorStop(0, conn.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Core white dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Nodes
    nodes.forEach((n) => {
      // Outer ring
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.fillStyle = '#141618';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner pulse dot
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 28);
    });

    animFrame = requestAnimationFrame(render);
  }

  render();
}

// ==========================================
// 4. ANIMATED SIGNATURE ENGINE (Footer)
// ==========================================
export function initSignature() {
  const path = document.getElementById('signature-path');
  const btn = document.getElementById('replay-signature-btn');
  if (!path) return;

  function playSignature() {
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.8,
      ease: 'power2.inOut'
    });
  }

  playSignature();

  if (btn) {
    btn.addEventListener('click', playSignature);
  }
}

// ==========================================
// 5. TEXT REPEL PHYSICS (Magnetic Force-field)
// ==========================================
export function initTextRepel() {
  const container = document.getElementById('text-repel-container');
  if (!container) return;

  const letters = container.querySelectorAll('.repel-letter');
  const radius = 120;
  const strength = 45;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    letters.forEach((span) => {
      const lx = span.offsetLeft + span.offsetWidth / 2;
      const ly = span.offsetTop + span.offsetHeight / 2;

      const dx = lx - mx;
      const dy = ly - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius && dist > 0) {
        const force = (1 - dist / radius) * strength;
        const moveX = (dx / dist) * force;
        const moveY = (dy / dist) * force;
        const rot = moveX * 0.4;

        gsap.to(span, {
          x: moveX,
          y: moveY,
          rotation: rot,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(span, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto'
        });
      }
    });
  });

  container.addEventListener('mouseleave', () => {
    letters.forEach((span) => {
      gsap.to(span, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// ==========================================
// 6. VELOCITY SCROLL TICKER
// ==========================================
export function initVelocityScroll() {
  const track = document.getElementById('velocity-track');
  if (!track) return;

  let baseSpeed = 1.2;
  let currentSpeed = baseSpeed;
  let offset = 0;

  window.addEventListener('scroll', () => {
    currentSpeed = baseSpeed + Math.abs(window.scrollY * 0.005);
  });

  function tick() {
    currentSpeed += (baseSpeed - currentSpeed) * 0.05; // smooth back to base
    offset -= currentSpeed;
    if (offset <= -50) offset = 0;
    track.style.transform = `translateX(${offset}%)`;
    requestAnimationFrame(tick);
  }

  tick();
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  initAnnotatedText();
  initOrbitCardStack();
  initCircuitBoard();
  initSignature();
  initTextRepel();
  initVelocityScroll();
});
